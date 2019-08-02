import React from "react";
import { storiesOf } from "@storybook/react";
import { Article } from "../types/article";
import ArticleComponent from "../components/presentation/Article";

const articleMockup: Article = {
  author: "dhouston",
  title: "My YC app: Dropbox - Throw away your USB drive",
  text:
    "Aw shucks guys ... you make me blush with your compliments. Tell you what, Ill make a deal: I'll keep writing if you keep reading. K?",
  score: 115
};

storiesOf("Article", module)
  .add("Loading", () => <ArticleComponent article={undefined} loading={true} />)
  .add("with article", () => (
    <ArticleComponent article={articleMockup} loading={false} />
  ));
