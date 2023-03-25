import { useRouter } from "next/router";
import React, { Dispatch, FC, SetStateAction } from "react";

interface SeacrhBarProps {
  searchBarState: string,
  setSearchBarState: Dispatch<SetStateAction<string>>,
  searchPosts: () => void
};

export const SearchBar: FC<SeacrhBarProps> = ({ searchBarState, setSearchBarState, searchPosts }) => {
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBarState(e.target.value);
  };

  return (
    <>
      <input value={ searchBarState } onChange={ handleInputChange } />
      <button type="button" onClick={ () => {
        router.push("/");
        searchPosts();
      } }>
        Search Posts
      </button>
    </>
  );
};