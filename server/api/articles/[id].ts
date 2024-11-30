import { ObjectId } from "mongodb";

export default defineEventHandler(async (event) => {
    const { method } = event.node.req;
    const { id } = event.context.params as {id:string};
    const db = await connectToDatabase();
    const articlesCollection = db.collection("articles");
    if(method === 'GET'){
        const article = await articlesCollection.findOne({ _id: ObjectId.createFromHexString(id) });
        return {
            success: true,
            data:article,
        };
    }else if(method === 'DELETE'){
        await articlesCollection.deleteOne({ _id: ObjectId.createFromHexString(id) });
        return {
            success: true,
            data: null,
        };
    }
    throw createError({
        statusCode: 405,
        statusMessage: "Method not allowed",
    });
});