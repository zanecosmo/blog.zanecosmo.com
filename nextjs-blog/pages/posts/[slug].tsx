import { GetStaticProps } from "next";
import { FC } from "react";
import { PortableText } from "@portabletext/react";
import { Post } from "../../types";

const PostPage: FC<{ post: Post }> = ({ post }) => {
  return (
    <>
      <h1>{ post.title }</h1>
      <p>{ post.author }</p>
      <p>{ post.date_posted ? post.date_posted.toString() : "No Date" }</p>
      { post.topics.map((topic, index) => (
        <span key={ index }>{ index > 0 ? ` | ${topic}` : topic }</span>
      )) }
      <img src={ post.imageUrl } />
      <PortableText value={ post.article } />
    </>
  );
};

export async function getStaticPaths() {
  const projectId = "w3yaovoz";
  const dataset = "production";
  const query = encodeURIComponent('*[_type == "post"]{slug}');

  let URL = `https://${projectId}.api.sanity.io/v2021-10-21/data/query/${dataset}?query=${query}`;

  const response = await fetch(URL)
  const data = await response.json();

  const paths = data.result.map((post: Post) => {
    return { params: { slug: post.slug } }
  });

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const projectId = "w3yaovoz";
  const dataset = "production";
  console.log(context.params?.slug)
  const query = encodeURIComponent(`
    *[_type == "post" && slug == "${context.params?.slug}"]{
      title,
      slug, 
      author,
      "imageUrl": article_image.asset->url,
      date_posted,
      last_updated,
      article,
      "topics": topics[]->tag
    }
  `);

  let URL = `https://${projectId}.api.sanity.io/v2021-10-21/data/query/${dataset}?query=${query}`;

  const response = await fetch(URL)
  const data = await response.json();

  console.log("POOOOOOOOP")
  console.log(data);

  return {
    props: {
      post: data.result[0]
    }
  };
};

export default PostPage;