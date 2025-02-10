import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSearch = () => {
        if (!searchTerm.trim()) return;
        setLoading(true);
        onSearch(searchTerm);
        setTimeout(() => setLoading(false), 1000); // Simulated API call delay
    };

    return (
        <label className="mx-auto mt-10  relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center  py-2 px-2 rounded-2xl gap-2 shadow-lg focus-within:border-gray-300">
            <input
                id="search-bar"
                type="text"
                placeholder="Your keyword here"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
            />
            <button
                onClick={handleSearch}
                disabled={loading}
                className="w-full md:w-auto px-6 py-3 !bg-black border-black text-white fill-white active:scale-95 duration-100 border overflow-hidden relative rounded-xl transition-all disabled:opacity-70"
            >
                <div className="relative flex items-center justify-center">
                    <span className="text-sm font-semibold whitespace-nowrap">Search</span>
                </div>
            </button>
        </label>
    );
};

export default SearchBar;
