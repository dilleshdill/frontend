import React, { useState } from "react";
import SearchBar from "./SearchBar";
import UserHeader from "./UserHeader";
import ViewBooks from "./ViewBooks";
import Author from "./author";
import axios from "axios";

const Books = () => {
  const genreFilters = [
    { id: "fiction", label: "Fiction" },
    { id: "non_fiction", label: "Non-Fiction" },
    { id: "mystery", label: "Mystery" },
    { id: "fantasy", label: "Fantasy" },
    { id: "science_fiction", label: "Science Fiction" },
    { id: "romance", label: "Romance" },
    { id: "thriller", label: "Thriller" },
    { id: "horror", label: "Horror" },
    { id: "historical", label: "Historical Fiction" },
    { id: "biography", label: "Biography" },
    { id: "self_help", label: "Self-Help" },
    { id: "young_adult", label: "Young Adult" },
    { id: "children", label: "Children's Literature" },
    { id: "dystopian", label: "Dystopian" },
    { id: "adventure", label: "Adventure" },
    { id: "crime", label: "Crime" },
    { id: "poetry", label: "Poetry" },
    { id: "graphic_novel", label: "Graphic Novel" },
    { id: "philosophy", label: "Philosophy" },
    { id: "spirituality", label: "Spirituality" },
  ];

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchFilter,setSearchFilter] = useState('')

  const handleFilterClick = (filter) => {
    if (selectedFilters.includes(filter.id)) {
      setSelectedFilters((prev) => prev.filter((id) => id !== filter.id));
    } else {
      setSelectedFilters((prev) => [...prev, filter.id]);
    }
  };

  

  return (
    <div className="mt-0 pt-0 md:min-h-[100vh]">
      <UserHeader />
      
      {/* Genre Filter Bar */}
      <div className="flex gap-4 py-4 w-full  overflow-x-auto md:overflow-hidden md:gap-6 scrollbar-hide" style={{overflowX:"auto",width:"100vw",scrollbarWidth:"none",outline:0,border:0}}>
        {genreFilters.map((filter) => (
            <button
            key={filter.id}
            className={`inline-flex items-center justify-center py-2 px-4 text-sm font-medium rounded-full border transition-all duration-200
                ${selectedFilters.includes(filter.id)
                ? 'bg-blue-100 text-blue-700 border-blue-300'
                : 'bg-white text-gray-700 border-gray-300'}
            `}
            onClick={() => handleFilterClick(filter)}
            >
            {filter.label}
            </button>
        ))}
        </div>

      
      <SearchBar />
      
      <ViewBooks />
      
        <Author/>
    </div>
  );
};

export default Books;
