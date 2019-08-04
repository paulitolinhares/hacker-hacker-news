const baseUrl = "https://hacker-news.firebaseio.com/v0";

const getTopStories = (fetch: any) => {
  return async function getTopStoriesInjected(): Promise<number[]> {
    const url = `${baseUrl}/topstories.json`;
    const ids = await fetch(url).then((res: Response) => res.json());
    return ids;
  };
};

const getArticle = (fetch: any) => {
  return async function getArticleInjected(id: number): Promise<any> {
    const url = `${baseUrl}/item/${id}.json`;
    const article = await fetch(url).then((res: Response) => res.json());
    return article;
  };
};

export const apiFactory = (fetch: any) => ({
  getTopStories: getTopStories(fetch),
  getArticle: getArticle(fetch)
});

export default apiFactory(window.fetch);
