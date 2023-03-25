
import { TypedObject } from "@portabletext/types";

export interface Topic { tag: string };

export interface Post {
  title: string,
  slug: string,
  author: string,
  date_posted: Date | undefined,
  last_updated: Date | undefined,
  topics: string[],
  imageUrl: string,
  article: TypedObject | TypedObject[]
};