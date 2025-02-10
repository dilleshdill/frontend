import axios from 'axios'
import React, { useState } from 'react'

const AddBook = () => {
    const [bookName,setBookName] = useState('')
    const [discription,setDiscription] = useState('')
    const [bookUrl,setBookUrl] = useState('')
    const [rating,setRating] = useState('')
    const [price,setPrice] = useState('')
    const [author,setAuthor] = useState('')
    const [date,setDate] = useState('')
    const toAddBook = async (event) =>{
        event.preventDefault()
        try{
            const response = await axios.post("http://localhost:5002/admin/add-book", {
                book_name: bookName, 
                discription, 
                book_url: bookUrl, 
                rating, 
                price, 
                author, 
                date
            },
            { withCredentials: true }
        );
            alert("book added successfully")
        }catch(error){
            alert(" Book is already present")
            console.log(error)
        }
    }
  return (
    <div className="flex items-center justify-center p-12">
    <div className="mx-auto w-full max-w-[550px] bg-white">
        <form onSubmit={toAddBook}>
            <div className="mb-5">
                <label for="name" className="mb-3 block text-base font-medium text-[#07074D]">
                    Book Name
                </label>
                <input type="text" name="name" id="name" placeholder="Full Name" onChange={(e)=>setBookName(e.target.value)}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
            </div>
            <div className="mb-5">
                <label for="phone" className="mb-3 block text-base font-medium text-[#07074D]">
                    Author
                </label>
                <input type="text" name="phone" id="phone" placeholder="Enter your phone number" onChange={(e)=>setAuthor(e.target.value)}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
            </div>
            <div className="mb-5">
                <label for="email" className="mb-3 block text-base font-medium text-[#07074D]">
                    Discription
                </label>
                <input type="text" name="email" id="email" placeholder="Enter your email" onChange={(e)=>setDiscription(e.target.value)}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
            </div>
            <div className="-mx-3 flex flex-wrap">
                <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                        <label for="date" className="mb-3 block text-base font-medium text-[#07074D]">
                            Published Date
                        </label>
                        <input type="date" name="date" id="date" onChange={(e)=>setDate(e.target.value)}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                        <label for="time" className="mb-3 block text-base font-medium text-[#07074D]">
                            Price
                        </label>
                        <input 
                            type="number" 
                            onChange={(e)=>setPrice(e.target.value)}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" 
                            min="0" 
                            step="50" 
                            placeholder="Enter price" 
                        />
                    </div>
                </div>
            </div>

            <div className="mb-5 pt-3">
                <div className="-mx-3 flex flex-wrap">
                    <div className="w-full px-3 sm:w-1/2">
                        <div className="mb-5">
                            <label for="date" className="mb-3 block text-base font-medium text-[#07074D]">
                                Rating
                            </label>
                            <input type="number" name="date" id="date" onChange={(e)=>setRating(e.target.value)}
                                min="0"
                                max="5"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                    </div>
                    <div className="w-full px-3 sm:w-1/2">
                        <div className="mb-5">
                            <label for="date" className="mb-3 block text-base font-medium text-[#07074D]">
                                Url
                            </label>
                            <input type="text" name="date" id="date" onChange={(e)=>setBookUrl(e.target.value)}
                                
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <button type='submit'
                    className="hover:shadow-form w-full rounded-md !bg-gray-800 py-3 px-8 text-center text-base font-semibold text-white outline-none">
                    Add Book
                </button>
            </div>
        </form>
    </div>
</div>
  )
}
export default AddBook;
