export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const db = await connectToDatabase();
  const articlesCollection = db.collection("articles");
  if(method === 'GET'){
    const articles = await articlesCollection.find({}).toArray();
    const path = event.node.req.url;
    const queryString = path?.split('?')[1]; 
    const urlParams = new URLSearchParams(queryString);
    const query = urlParams.get('query');
    if(query){
        const searchTitle = articles.filter(article => article.title.toLowerCase().includes(query.toLowerCase())).map(article => article.title);
        const searchCategories = articles.filter(article => article.categories.some((category: string) => category.includes(query)))
                                      .flatMap(article => article.categories).filter((category: string) => category.includes(query));
        return {
          success: true,
          data: [...new Set([...searchTitle, ...searchCategories])]
        }
    }else{
      return {
        success: true,
        data: []
      }
    }
  }
  throw createError({
    statusCode: 400,
    statusMessage: 'Bad Request',
    message: 'Invalid request'
});
})
