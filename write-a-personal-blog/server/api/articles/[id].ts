import { ObjectId } from "mongodb";

export default defineEventHandler(async (event) => {
    const method = event.node.req.method;
    const { id } = event.context.params as Record<string, string>;
    const db = await connectToDatabase();
    const articlesCollection = db.collection("articles");
    if(method === 'GET'){
        const article = await articlesCollection.findOne({ _id: ObjectId.createFromHexString(id) });
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