'use client'

import React, { useState } from 'react';

function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add form submission logic here
    };

    return (
        <div className="bg-[#ffe47b] h-1/2 flex flex-col items-center justify-center p-14">
            <h1>Contact Us</h1>
            <form 
                onSubmit={handleSubmit} 
                className="bg-[#f9f6f1] p-8 rounded-md w-full max-w-md flex flex-col gap-6"
            >
                <div className="flex flex-col">
                    <label htmlFor="name" className="text-[#333333] font-semibold mb-2">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="p-2 border border-[#333333] rounded-md"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="email" className="text-[#333333] font-semibold mb-2">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="p-2 border border-[#333333] rounded-md"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="message" className="text-[#333333] font-semibold mb-2">Message:</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="p-2 border border-[#333333] rounded-md"
                    />
                </div>
                <button 
                    type="submit" 
                    className="bg-[#333333] text-[#f9f6f1] p-3 rounded-md font-semibold hover:bg-[#555555] transition"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default ContactPage;
