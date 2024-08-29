import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usePlayerHook from '../Hooks/usePlayerHook';


const PopupForm = ({isOpen, togglePopup}) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const { createUser } = usePlayerHook();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await createUser(formData);
    console.log(resp);
    localStorage.setItem("player1", JSON.stringify(resp.data))
    togglePopup(); 
    navigate('/home')
  };

  return (
    <div className='bg-[#2D2424]'>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-[#2D2424] p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-gray-300">Login / Register</h2>
            <form onSubmit={handleSubmit} className='space-y-10'>
              <div className="mb-4">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder='username'
                  className='w-full px-2 border-b-2 border-[#EF4C01] bg-[#2D2424] outline-none'
                  required
                />
              </div>

              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='Email (optional)'
                  className='w-full px-2 border-b-2 border-[#EF4C01] bg-[#2D2424] outline-none'
                  required
                />
              </div>

              <div className="mb-4">
                <input 
                    type='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='Password'
                    className='w-full px-2 border-b-2 border-[#EF4C01] bg-[#2D2424] outline-none'
                    required
                />
              </div>

              <div className="flex justify-between">
                <button type="button" onClick={togglePopup} className="bg-gray-500 text-white px-4 py-2 rounded">
                  Close
                </button>
                <button type="submit" className="bg-[#EF4C01] text-white px-4 py-2 rounded">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupForm;
