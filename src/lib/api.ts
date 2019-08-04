const baseUrl = "https://hacker-news.firebaseio.com/v0";

const getTopStories = (fetch: any) => {
  return async function getTopStoriesInjected(): Promise<number[]> {
    const url = `${baseUrl}/topstories.json`;
    const ids = await fetch(url).then((res: Response) => res.json());
    return ids;
  };
};

export const apiFactory = (fetch: any) => ({
  getTopStories: getTopStories(fetch)
});

export default apiFactory(window.fetch);
