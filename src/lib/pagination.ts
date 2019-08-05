import { ArticleState } from "../state/types";

const PAGE_SIZE = 24;

export function getCurrentPageArticles(
  articles: ArticleState[],
  page = 0
): ArticleState[] {
  const start = page * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  return articles.slice(start, end);
}

export function calcPageCount(listSize: number) {
  return Math.floor(listSize / PAGE_SIZE);
}
