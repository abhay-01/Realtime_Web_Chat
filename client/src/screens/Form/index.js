import React from 'react'
import Input from '../../components/Input'

export default function Index({
  isSignIn= true
})


{
  
  return (
    <div className='bg-primary w-[400px] h-[600px] shadow-lg rounded-lg flex flex-col justify-center items-center'>
      <div className='text-4xl font-bold'>
        Welcome {isSignIn ? 'Back!' : ''}
      </div>
      <div className='text-xl font-light'>
        {
          isSignIn ? 'Sign in to continue' : 'Sign up to get started'
        }
      </div>
      <Input isSignIn = {isSignIn}/>
      <div>
        {
          isSignIn ? 'New to our platform?' : 'Already have an account?'
        }

        <span className='cursor-pointer text-[blue] underline ml-1'>
          {
            isSignIn ? 'Sign up' : 'Sign in'
          }
        </span>
      </div>

    </div>
  )
}
