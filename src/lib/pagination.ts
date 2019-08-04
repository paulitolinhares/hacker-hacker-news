import { ArticleState } from "../state/types";

export function getCurrentPageArticles(
  articles: ArticleState[],
  page = 0
): ArticleState[] {
  const PAGE_SIZE = 24;
  const start = page * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  return articles.slice(start, end);
}
