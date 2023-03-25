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

  return (
    <div>

      <nav>
        <button type="button" onClick={ () => setState("", "") } className="text-3xl text-green-600 p-2">Home</button>

        <button type="button" onClick={ () => setAreTopicsVisible(!areTopicsVisible) }>Categories</button>

        <SearchBar { ...{ searchBarState, setSearchBarState, searchPosts } } />
      </nav>

      {
        areTopicsVisible && (
          <div>
            {
              topics.length === 0
                ? <div>LOADING...</div>
                : (
                    <div>
                      { topics.map((topic, index) => (
                        <button
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
          </div>
        )
      }

      <div>
        <Component { ...pageProps } posts={ posts } isHome={ router.asPath === "/"} />
      </div>

      <footer>FOOTER</footer>

    </div>
  );
};

export default App;