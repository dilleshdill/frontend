import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaIndianRupeeSign, FaStar, FaRegStar } from "react-icons/fa6";
import { MdOutlineFavoriteBorder, MdFavorite } from "react-icons/md";
import { Link } from "react-router-dom";

const ViewBooks = () => {
    const [books, setBooks] = useState([]);
    const [likedBooks, setLikedBooks] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchBooksAndFavorites = async () => {
            try {
                const booksResponse = await axios.get("http://localhost:5002/admin/book");
                setBooks(booksResponse.data);

                const email = localStorage.getItem("email");
                if (email) {
                    const favResponse = await axios.get(`http://localhost:5002/favorite?email=${email}`);
                    setLikedBooks(favResponse.data);
                }
            } catch (error) {
                console.error("Error fetching books or favorites:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooksAndFavorites();
    }, []);

    const toAddFavorite = async (book, event) => {
        event.stopPropagation(); 
        try {
            const email = localStorage.getItem("email");
            if (!email) {
                alert("Please log in to add favorites.");
                return;
            }

            const response = await axios.post("http://localhost:5002/favorite", {
                email,
                book_name: book.book_name,
                book_url: book.book_url,
                price: book.price,
            });

            if (response.status === 200) {
                alert("Added to Favorite");
                setLikedBooks(prev => [...prev, book]);  
            } else if (response.status === 201) {
                alert("Removed from Favorite");
                setLikedBooks(prev => prev.filter(item => item.book_name !== book.book_name)); 
            }
        } catch (error) {
            console.error("Error adding/removing favorite:", error);
            alert("Error updating favorite.");
        }
    };

    if (loading) {
        return <div>Loading...</div>;  
    }

    return (
        <div className="p-10 w-full">
            <h2 className="text-2xl font-bold mb-4">Book List</h2>
            <div className="flex flex-wrap justify-start">
                {books.map((book) => (
                    <div key={book._id} className="w-full md:w-[30%] lg:w-[18%] mb-6 mr-6"> 
                        <div className="relative flex flex-col rounded-lg border border-gray-100 bg-white shadow-md">
                            
                            <Link to={`/books/${book._id}`} className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
                                <img
                                    className="object-cover w-full h-full"
                                    src={book.book_url || "https://via.placeholder.com/150"}
                                    alt={book.book_name}
                                />
                            </Link>

                            <div
                                className="h-[30px] w-[30px] bg-white flex items-center justify-center rounded-2xl absolute z-50 left-50 top-5 cursor-pointer"
                                onClick={(event) => toAddFavorite(book, event)}
                            >
                                {likedBooks.find(item => item.book_name === book.book_name) ? (
                                    <MdFavorite className="text-xl text-red-500" />
                                ) : (
                                    <MdOutlineFavoriteBorder className="text-xl" />
                                )}
                            </div>

                            <div className="mt-4 px-5 pb-5">
                                <h5 className="text-xl font-bold tracking-tight text-slate-900">
                                    {book.book_name}
                                </h5>
                                <p className="text-sm text-gray-600 pt-1">Author: {book.author}</p>

                                <div className="flex justify-between items-center pt-2">
                                    <div className="flex items-center">
                                        <FaIndianRupeeSign className="text-xl font-bold text-slate-900" />
                                        <span className="text-xl font-bold text-slate-900 ml-1">
                                            {book.price}
                                        </span>
                                    </div>

                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, index) =>
                                            index < book.rating ? (
                                                <FaStar key={index} className="text-yellow-500 h-5 w-5" />
                                            ) : (
                                                <FaRegStar key={index} className="text-yellow-500 h-5 w-5" />
                                            )
                                        )}
                                        <span className="ml-2 rounded bg-yellow-500 px-2.5 py-0.5 text-xs font-semibold">
                                            {book.rating}.0
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end">
                                    <button className="hover:!bg-gray-600 !border-gray-500 !text-gray-500 hover:!text-white !pt-1 !pb-1 !mt-2">
                                        Buy
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewBooks;
