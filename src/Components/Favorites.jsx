import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCircleMinus } from "react-icons/fa6";

const Favorite = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const email = localStorage.getItem("email");
            try {
                if (email) {
                    const response = await axios.get(`http://localhost:5002/favorite?email=${email}`);
                    setCart(response.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const removeItem = async (book_name) => {
        const email = localStorage.getItem("email");
        try {
            const response = await axios.post("http://localhost:5002/favorite/remove", { book_name, email });
            if (response.status === 200) {
                setCart(cart.filter((item) => item.book_name !== book_name));
            }
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    const setIncrement = async (book_name) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.book_name === book_name
                    ? { ...item, count: item.count + 1 }
                    : item
            )
        );

        const email = localStorage.getItem("email");
        const updatedItem = cart.find(item => item.book_name === book_name);

        try {
            const response = await axios.post("http://localhost:5002/favorite/increment", {
                book_name,
                email,
                count: updatedItem.count + 1
            });
            if (response.status === 200) {
                const updatedItem = response.data.favorites.find(item => item.book_name === book_name);
                setCart(cart.map(item => item.book_name === book_name ? updatedItem : item));
            }
        } catch (error) {
            console.error("Error incrementing item:", error);
        }
    };

    const setDecrement = async (book_name) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.book_name === book_name && item.count > 1
                    ? { ...item, count: item.count - 1 }
                    : item
            )
        );

        const email = localStorage.getItem("email");
        const updatedItem = cart.find(item => item.book_name === book_name);

        if (updatedItem.count > 1) {
            try {
                const response = await axios.post("http://localhost:5002/favorite/increment", {
                    book_name,
                    email,
                    count: updatedItem.count - 1
                });
                if (response.status === 200) {
                    const updatedItem = response.data.favorites.find(item => item.book_name === book_name);
                    setCart(cart.map(item => item.book_name === book_name ? updatedItem : item));
                }
            } catch (error) {
                console.error("Error decrementing item:", error);
            }
        }
    };

    const subtotal = cart.reduce((total, item) => total + item.price * item.count, 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    return (
        <div className="w-full h-full bg-white bg-opacity-90 fixed top-0 overflow-y-auto p-5">
            <div className="flex flex-col lg:flex-row min-h-screen">
                {/* Left Section - Cart Items */}
                <div className="lg:w-3/4 w-full bg-white p-5">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 pb-5 text-center lg:text-left">
                        Favorites ({cart.length})
                    </h2>
                    {cart.map((item) => (
                        <div key={item.id} className="flex flex-col lg:flex-row bg-gray-100 mb-5 rounded-lg p-5 shadow-sm">
                            <img src={item.book_url} alt={item.book_name} className="w-32 h-32 lg:w-40 lg:h-40 object-cover rounded-md mx-auto lg:mx-0" />
                            <div className="ml-4 flex-1 text-center lg:text-left">
                                <h3 className="text-lg font-bold text-gray-800">{item.book_name}</h3>
                                <p className="text-gray-600">Price: ₹{item.price}</p>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <button
                                        onClick={() => setDecrement(item.book_name)}
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            width: "40px",
                                            height: "40px",
                                            borderRadius: "50%",
                                            backgroundColor: "gray",
                                            color: "white",
                                            outline: "none",
                                            border: "none",
                                            cursor: "pointer"
                                        }}
                                        onMouseOver={(e) => (e.target.style.backgroundColor = "#6b7280")}
                                        onMouseOut={(e) => (e.target.style.backgroundColor = "gray")}
                                    >
                                        <FaCircleMinus style={{ color: "black", height: "20px", width: "20px" }} />
                                    </button>
                                    <span style={{ fontSize: "2rem", fontWeight: "bold", margin: "0 16px" }}>
                                        {item.count}
                                    </span>
                                    <button
                                        onClick={() => setIncrement(item.book_name)}
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            width: "40px",
                                            height: "40px",
                                            borderRadius: "50%",
                                            backgroundColor: "#6366f1",
                                            color: "white",
                                            outline: "none",
                                            border: "none",
                                            cursor: "pointer"
                                        }}
                                        onMouseOver={(e) => (e.target.style.backgroundColor = "#4f46e5")}
                                        onMouseOut={(e) => (e.target.style.backgroundColor = "#6366f1")}
                                    >
                                        <svg
                                            style={{ width: "24px", height: "24px" }}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 6v12M6 12h12"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>
                                <div className="flex items-center justify-center lg:justify-end pr-5 mt-2">
                                    <button onClick={() => removeItem(item.book_name)} className="text-red-500">Remove</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Section - Summary */}
                <div className="lg:w-1/4 w-full mt-10 lg:mt-20 bg-gray-100 p-6 rounded-lg">
                    <div className="sticky top-0 p-5 bg-gray-100 md:h-[80vh] flex flex-col justify-between rounded-lg">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800">Summary</h2>
                            <div className="mt-15">
                                <div className="flex justify-between">
                                    <p className="text-gray-800">Subtotal:</p>
                                    <p>₹{subtotal.toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-gray-800">Tax:</p>
                                    <p>₹{tax.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between">
                                <p className="text-2xl font-bold text-gray-800">Total:</p>
                                <p>₹{total.toFixed(2)}</p>
                            </div>
                            <button className="w-full py-2 mt-4 !bg-gray-800 text-white">Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Favorite;
