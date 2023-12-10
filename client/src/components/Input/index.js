import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Index({
  isSignIn
}) {

  const [data, setData] = useState({
    ...(!isSignIn && {
      fullName: ''
    }),

    email: '',
    password: ''
  })

  const navigation = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(isSignIn){
      //signin
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const result = await response.json();


      if (result.token) {
        localStorage.setItem('user:token', result.token)
        localStorage.setItem('user:details', JSON.stringify(result.user))
        navigation('/')
      } else {
        alert("User not found")
      }
    }else{
      //signup
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const result = await response.json();

      if(result.message){
        navigation('/users/signin');
      }else{
        alert(result.error)
      }

    
    }

   
  }


  return (
    <div className='mt-4'>
      <form className='flex flex-col' onSubmit={(e)=> handleSubmit(e)}>

        {
          !isSignIn && (
            <>
              <label className='text-xl font-light'>Full Name</label>
              <input className='mb-4 border-2 border-gray-300 rounded-md px-4 py-2 outline-none focus:border-blue-500 w-[300px]'
                placeholder='Enter full name' name='name' type='text' required
                value={data.fullName} onChange={(e) => setData({ ...data, fullName: e.target.value })} />

            </>
          )
        }

        <label className='text-xl font-light'>Email</label>
        <input className='border-2 border-gray-300 rounded-md px-4 py-2 outline-none focus:border-blue-500 mb-4 w-[300px]'
          placeholder='Enter your email' name='email' type='email' required
          value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />

        <label className='text-xl font-light'>Password</label>
        <input className='mb-4 border-2 border-gray-400 rounded-md px-4 py-2 outline-none focus:border-blue-500'
          placeholder='Enter your password' name='password' type='password' required
          value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button type = "submit" className='bg-blue-500 text-white px-4 py-2 rounded-md mt-2 mb-3 hover:bg-primary-light
        focus:outline-none focus:ring-green-500 hover:text-black'>
          {
            isSignIn ? 'Sign in' : 'Sign up'
          }
          
        </button>

      </form>
    </div>
  )
}
