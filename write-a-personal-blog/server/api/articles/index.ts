import { Article } from "~/server/models/Article";

export default defineEventHandler(async (event) => {
    const method = event.node.req.method;
    const db = await connectToDatabase();
    const articlesCollection = db.collection("articles");
    if(method === 'GET'){
        const articles = await articlesCollection.find({title: { $exists: true, $ne: '' }}).toArray();
        return {
            success: true,
            data:articles,
        };
    }else if(method === 'POST'){
        const body = await readBody(event);
        //后端拿到的是前端处理过的数据
        const article: Article =  {
            title: body.title,
            content: body.content,
            categories: body.categories,
            created_at: new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }), 
            updated_at: new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })
        }
        await articlesCollection.insertOne(article);
        return {
            success: true,
            data:article,
        };
    }
    throw createError({
        statusCode: 405,
        statusMessage: "Method not allowed",
    });
});