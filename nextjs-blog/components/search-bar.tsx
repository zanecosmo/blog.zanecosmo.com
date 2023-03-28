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

  const buttonStyle = "ml-2 hover:underline hover:underline-offset-2 hover:decoration-1";

  // glass-icon
  // searching state
  // when clicked, searching state turns to true
  // 

  return (
    <div className="flex items-center">
      <input
        value={ searchBarState }
        onChange={ handleInputChange }
        placeholder="Search Posts"
        className="bg-white/25 text-sm text-white p-1 pl-2 border-b border-b-white border-solid focus-visible:outline-none"
      />
      <button type="button" onClick={ () => {
        router.push("/");
        searchPosts();
      } } className={ buttonStyle }>
        <div className="w-4 h-4">
          <svg viewBox="0 0 512 512">
            <path fill="#ffffff" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
        </div>
      </button>
    </div>
  );
};