import Link from "next/link";
import { Post } from "../types";
import { FC } from "react";
import moment from "moment";

const Home: FC<{ posts: Post[], isHome: boolean }> = ({ posts, isHome }) => {
  return (
    <div className="flex justify-center w-full">
      <div className="flex-col w-4/5">
        { posts && posts.map((post, index) => {
          return (
            <Link key={ index } href={ `posts/${post.slug}` }>
              <div className="m-12 inline-flex hover:bg-gray-100 transition-colors">
              
                <div className="shrink-0  w-64 h-64 overflow-hidden">
                  <img className="" src={ post.imageUrl } />
                </div>
              
                <section className="p-4">

                  <div className="mb-4">
                    {
                      post.topics && post.topics.map((topic, index) => (
                        <span key={ index } className="text-lg italic font-bold">{ index > 0 ? ` - ${topic.tag}` : topic.tag }</span>
                      ))
                    }
                  </div>

                  <p className="mb-2 text-sm text-gray-500 italic">{ post.date_posted && moment(post.date_posted).format("MMMM Do, YYYY") }</p>

                  <h1 className="mb-2 font-bold text-3xl">{ post.title }</h1>

                  <p>somethhing abut the article? idk if i want to have a blurb or if it shoul d just be the title of the post, and maybe some data. o maybel I could ask the author to write a blurb.</p>

                </section>

              </div>
            </Link>       
          );
        }) }
      </div>
    </div>
  );
};

export default Home;