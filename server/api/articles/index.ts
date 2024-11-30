import { Article } from "~/server/models/Article";
import { ObjectId } from "mongodb";

export default defineEventHandler(async (event) => {
    const { method } = event.node.req;
    const db = await connectToDatabase();
    const articlesCollection = db.collection("articles");
    if(method === 'GET'){
        const articles = await articlesCollection.find({title: { $exists: true, $ne: '' }}).toArray();
        const path = event.node.req.url;
        const queryString = path?.split('?')[1]; 
        const urlParams = new URLSearchParams(queryString);
        const category = urlParams.get('category'); // 这里 category 是可选的，可能为 null
        if(category){
            return {
                success: true,
                data:articles.filter(article => article.categories.includes(category)),
            };
        }
        const query = urlParams.get('query');
        if(query){
            return {
                success: true,
                data:articles.filter(article => article.title.toLowerCase().includes(query.toLowerCase()) || article.categories.includes(query)),
            };
        }
        return {
            success: true,
            data:articles,
        };
    }else if(method === 'POST'){
        const body = await readBody(event);
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
    }else if(method === 'PUT'){
        const body = await readBody(event);
        body._id = ObjectId.createFromHexString(body._id);
        await articlesCollection.updateOne({_id: body._id}, {$set: body});
        return {
            success: true,
            data:body,
        };
    }
    throw createError({
        statusCode: 405,
        statusMessage: "Method not allowed",
    });
});