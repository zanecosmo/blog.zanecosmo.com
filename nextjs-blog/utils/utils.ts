import { Post, Topic } from "../types";

export const fetchTopics = async (): Promise<Topic[]> => {
  const projectId = "w3yaovoz";
  const dataset = "production";
  const query = encodeURIComponent('*[_type == "topic"]{ tag }');

  const URL = `https://${projectId}.api.sanity.io/v2021-10-21/data/query/${dataset}?query=${query}`;

  const response = await fetch(URL);
  const data = await response.json();

  return data.result;
};

interface fetchPostsParams {
  topic: string,
  searchQuery: string
};

export const fetchPosts = async (searchQuery: string): Promise<Post[]> => {
  const projectId = "w3yaovoz";
  const dataset = "production";

  // console.log(searchQuery)

  // break query into individual strings
  // title contains searchQuery || body contins earch query || topic tags contain search query

  const query = encodeURIComponent(searchQuery
    ? `*[_type == "post"]
        | score(title match "${searchQuery}", article match "${searchQuery}")
        | order(_score desc)
        [ _score > 0 ]
        { title, slug, "imageUrl": article_image.asset->url, date_posted, last_updated }
        `
    : `*[_type == "post"]
        | order(date_posted desc)
        { title, slug, "imageUrl": article_image.asset->url, date_posted, last_updated }`
  );

  let URL = `https://${projectId}.api.sanity.io/v2021-10-21/data/query/${dataset}?query=${query}`;

  const response = await fetch(URL)
  const data = await response.json();

  return data.result;
}