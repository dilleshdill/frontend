import React, { useEffect, useReducer, useState,useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaStar, FaRegStar, FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const data = [
  { id: 1, image: "https://d2g9wbak88g7ch.cloudfront.net/productimages/mainimages/372/9781572245372.jpg" },
  { id: 2, image: "https://d2g9wbak88g7ch.cloudfront.net/productimages/mainimages/372/9781572245372.jpg" },
  { id: 3, image: "https://d2g9wbak88g7ch.cloudfront.net/productimages/mainimages/372/9781572245372.jpg" },
];

const ProductDetails = () => {
  const { _id } = useParams();
  const [book, setBook] = useState(null);
  const [buy, setBuy] = useState(true);
  const [error, setError] = useState(null);
  const [counter, setCounter] = useState(1);
  const [email, setEmail] = useState(null);
  const navigate = useNavigate();
  const [activeIndex,setIndex]=useState(0)
  const sliderRef = useRef(null)

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:3000,
    beforeChange:(oldIndex,newIndex)=>setIndex(newIndex)
  };


  useEffect(() => {
    setEmail(localStorage.getItem("email"));
  }, []);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        if (!email) return;

        const response = await axios.get(`http://localhost:5002/admin/book-details/${_id}`);
        if (response.status === 200) {
          setBook(response.data);

          // Check if book is in favorites
          const cartResponse = await axios.get(`http://localhost:5002/favorite?email=${email}`);
          const updatedItem = cartResponse.data.find((item) => item.book_name === response.data.book_name);

          if (updatedItem) {
            setCounter(updatedItem.count);
            setBuy(false);
          }
        }
      } catch (error) {
        console.error("Error fetching book details:", error);
        setError("Failed to fetch product details. Please try again later.");
      }
    };

    fetchBookDetails();
  }, [_id, email]);

  const modifyFavoriteCount = async (book_name, action) => {
    if (!email) {
      alert("Please log in to modify favorites.");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5002/favorite/${action}`, {
        book_name,
        email,
        count: action === "increment" ? counter + 1 : counter - 1,
      });

      if (response.status === 200) {
        const updatedItem = response.data.favorites.find((item) => item.book_name === book_name);
        setCounter(updatedItem.count);
      }
    } catch (error) {
      console.error(`Error ${action}ing item:`, error);
    }
  };

  const toggleFavorite = async (book) => {
    try {
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
        setBuy(false);
        setCounter(1);
      } else if (response.status === 201) {
        alert("Removed from Favorite");
        setBuy(true);
      }
    } catch (error) {
      console.error("Error updating favorite:", error);
      alert("Error updating favorite.");
    }
  };

  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;
  if (!book) return <div className="text-center p-6">Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen w-screen p-6 flex justify-center">
      <div className="w-full h-[50%] rounded-lg p-6">
        {/* Book Image Section */}
        <div className="flex flex-row md:pl-30">
          {/* Small Preview Images */}
          <div className="flex flex-col space-y-3 w-[6%]">
            {data.map((eachItem,index) => (
              <img key={eachItem.id} src={eachItem.image} alt="Book Cover" className={`w-full rounded-lg shadow-md ${activeIndex===index ? "opacity-100" : 'opacity-20'}`} onClick={
                ()=>{
                  sliderRef.current.slickGoTo(index)
                  setIndex(index)
                }
              }
              />
            ))}
          </div>

          {/* Main Image Slider */}
          <div className="w-[250px] mx-6">
            <Slider  {...settings} ref={sliderRef}>
              {data.map((eachItem) => (
                <div key={eachItem.id} className="flex justify-center w-full">
                  <img
                    src={eachItem.image}
                    alt="Book Cover"
                    className="w-full md:w-[100%] max-w-xs md:max-w-sm rounded-lg shadow-md"
                  />
                </div>
              ))}
            </Slider>
          </div>

          {/* Book Details Section */}
          <div className="flex flex-col w-full md:w-1/2 md:pt-10 md:pl-10 space-y-4 px-4">
            <h2 className="text-2xl md:text-3xl font-bold">{book.book_name}</h2>
            <p className="text-gray-600">Author: {book.author}</p>

            <div className="flex items-center">
              {[...Array(5)].map((_, index) =>
                index < book.rating ? (
                  <FaStar key={index} className="text-yellow-500 h-5 w-5" />
                ) : (
                  <FaRegStar key={index} className="text-yellow-500 h-5 w-5" />
                )
              )}
              <span className="ml-2 bg-yellow-500 px-2.5 py-0.5 text-xs font-semibold rounded">{book.rating}.0</span>
            </div>

            <p className="text-gray-600">Date: {book.date}</p>
            <div>
              <span className="text-2xl font-bold mr-2">${book.price}</span>
            </div>

            {buy ? (
              <button onClick={() => toggleFavorite(book)} className="bg-gray-800 text-white px-6 py-2 rounded">
                Add Favorite
              </button>
            ) : (
              <div>
                <div className="flex items-center space-x-3">
                  <button className="text-gray-600" onClick={() => modifyFavoriteCount(book.book_name, "decrement")}>
                    <FaMinusCircle className="text-3xl" />
                  </button>
                  <span className="text-2xl font-bold pl-2 pr-0">{counter}</span>
                  <button className="text-blue-600" onClick={() => modifyFavoriteCount(book.book_name, "increment")}>
                    <FaPlusCircle className="text-3xl" />
                  </button>
                </div>
                <div className="pt-5 space-x-8 flex">
                  <button onClick={() => navigate("/favorite")} className="bg-gray-800 text-white px-6 py-2 rounded">
                    Buy Now
                  </button>
                  <button onClick={() => toggleFavorite(book)} className="bg-gray-500 text-white px-6 py-2 rounded">
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="pt-8">
          <p className="text-xl pb-3 font-bold">Description:</p>
          <p className="pl-5">{book.discription}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
