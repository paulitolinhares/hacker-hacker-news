import React from "react";
import { storiesOf } from "@storybook/react";
import { Article } from "../models/article";
import ArticleGrid from "../components/presentation/ArticleGrid";

const articleMockup: Article = {
  author: "dhouston",
  title: "My YC app: Dropbox - Throw away your USB drive",
  text:
    "Aw shucks guys ... you make me blush with your compliments. Tell you what, Ill make a deal: I'll keep writing if you keep reading. K?",
  score: 115
};

const articles = Array.from(Array(24).keys()).map(i => ({
  id: i,
  article: articleMockup,
  loading: false,
  expanded: false
}));

storiesOf("ArticleGrid", module).add("with cards", () => (
  <ArticleGrid articles={articles} />
));
