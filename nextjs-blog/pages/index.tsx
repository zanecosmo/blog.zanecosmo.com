import Link from "next/link";
import { Post } from "../types";
import { FC } from "react";

// set page to home
// set posts state to whatever the initial query was from cms
// whenever topic is selected or search is activated in app,
// app queries the cms, and passes new posts state to index, and index displays them

const Home: FC<{ posts: Post[], isHome: boolean }> = ({ posts, isHome }) => {
  return <div>
    { posts && posts.map((post, index) => {
      if (isHome && index === 0) {
        console.log("HOME");
      };

      return <div key={ index }>
        <Link href={ `posts/${post.slug}` }>{ post.title }</Link>
        <p>{ post.date_posted && post.date_posted.toString() }</p>
        <img src={ post.imageUrl } />
      </div>
    }) }
  </div>
};

export default Home;