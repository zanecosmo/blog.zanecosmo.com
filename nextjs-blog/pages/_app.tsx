import React, { FC, useEffect, useState } from "react";
import Link from "next/link";
import { fetchPosts, fetchTopics } from "../utils/utils";
import { Post, Topic } from "../types";
import { SearchBar } from "../components/search-bar";
import { useRouter } from "next/router";
import "../styles/globals.css";

interface AppProps {
  Component: FC,
  pageProps: any
};

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const [ topics, setTopics ] = useState<Topic[]>([]);
  const [ areTopicsVisible, setAreTopicsVisible ] = useState(false);
  const [ searchBarState, setSearchBarState ] = useState("");
  const [ query, setQuery ] = useState("");
  const [ posts, setPosts ] = useState<Post[]>([]);
  const router = useRouter();

  const searchPosts = (): void => setQuery(searchBarState);

  useEffect(() => void (async () => setTopics(await fetchTopics()))(), []);
  useEffect(() => void (async () => setPosts(await fetchPosts(query)))(), [query]);

  const setState = (searchBarState: string, queryState: string) => {
    setSearchBarState(searchBarState);
    setQuery(queryState);
    setAreTopicsVisible(false)
    router.push("/");
  };

  const buttonStyle = "hover:underline hover:underline-offset-2 hover:decoration-1";

  return (
    <div className="font-Montserrat">

      <header className="fixed w-screen bg-black text-white">
        <nav className="h-12 text-sm space-x-6 flex items-center">
          <span className="ml-4 font-bold text-lg">blog.zanecosmo</span>

          <button type="button" onClick={ () => setState("", "") } className={ buttonStyle }>Home</button>

          <button type="button" onClick={ () => setAreTopicsVisible(!areTopicsVisible) } className={ buttonStyle }>Categories</button>

          <SearchBar { ...{ searchBarState, setSearchBarState, searchPosts } } />
        </nav>
        <nav className={ `border-t border-t-white border-solid ${areTopicsVisible ? "" : "hidden"}` }>
          {
            topics.length === 0
              ? <div>LOADING...</div>
              : (
                  <div>
                    { topics.map((topic, index) => (
                      <button className="m-2 mr-0 px-2 py-1 border"
                        key={ index }
                        type="button"
                        onClick={ () => setState("", topic.tag) }
                      >
                        { topic.tag }
                      </button>
                    )) }
                  </div>
                )
          }
        </nav>
      </header>

      <div className="pt-12">
        <Component { ...pageProps } posts={ posts } isHome={ router.asPath === "/"} />
      </div>

      {/* <footer>FOOTER</footer> */}

    </div>
  );
};

export default App;