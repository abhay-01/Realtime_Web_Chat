import React from 'react'

export default function Dashboard() {
    const chats = [
        {
            name: "John Doe",
            status: "online",
            img: "https://a0.anyrgb.com/pngimg/1140/162/user-profile-login-avatar-heroes-user-blue-icons-circle-symbol-logo.png"
        },
        {
            name: 'Adam Smith',
            status: 'offline',
            img: "https://a0.anyrgb.com/pngimg/1140/162/user-profile-login-avatar-heroes-user-blue-icons-circle-symbol-logo.png"
        },
        {
            name: 'Jenny Craig',
            status: 'online',
            img: "https://a0.anyrgb.com/pngimg/1140/162/user-profile-login-avatar-heroes-user-blue-icons-circle-symbol-logo.png"
        },

        {
            name: 'Michael Thomas',
            status: 'online',
            img: "https://a0.anyrgb.com/pngimg/1140/162/user-profile-login-avatar-heroes-user-blue-icons-circle-symbol-logo.png"
        },
        {
            name: 'Ethan Hunt',
            status: 'offline',
            img: "https://a0.anyrgb.com/pngimg/1140/162/user-profile-login-avatar-heroes-user-blue-icons-circle-symbol-logo.png"
        },
    ]
    return (
        <div className='w-screen flex'>

            <div className='w-[25%] h-screen  bg-secondary'>
                <div className='flex items-center my-8 mx-14'>
                    <div className='p- [2px] rounded-full border border-primary bg-primary'>
                        <img src="https://a0.anyrgb.com/pngimg/1140/162/user-profile-login-avatar-heroes-user-blue-icons-circle-symbol-logo.png" alt="logo" width={50} height={50} />

                    </div>
                    <div className='ml-8'>
                        <h2 className='text-xl'>Welcome, User</h2>
                        <p className='text-lg font-light'>My Account</p>
                    </div>
                </div>
                <hr className='border border-black' />
                <div className='mx-10 mt-5'>
                    <div className='font-bold'>
                        Messages
                    </div>
                    <div>
                        {
                            chats.map(({ name, status, img }) => {
                                return (
                                    <div className='flex ml-2 items-center my-8 border-b py-3 border-b-gray-400 '>
                                        <div className='cursor-pointer flex items-center'>
                                            <div className='p- [2px] rounded-full border border-primary bg-primary'>
                                                <img src={img} alt="logo" width={35} height={40} />

                                            </div>
                                            <div className='ml-6'>
                                                <h2 className='text-lg font-semibold'>{name}</h2>
                                                <p className='text-sm font-light text-gray-600'>{status}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className='w-[50%] h-screen bg-white flex items-center flex-col'>
                <div className='w-[75%] bg-secondary h-[10%] mt-12 rounded-full flex px-14 items-center'>
                    <div>
                        <img src="https://a0.anyrgb.com/pngimg/1140/162/user-profile-login-avatar-heroes-user-blue-icons-circle-symbol-logo.png" alt="logo" width={50} height={50} />
                    </div>
                    <div>
                        <h2 className='text-lg mx-4'>Adam</h2>
                        <p className='text-sm text-gray-600 mx-4'>online</p>
                    </div>
                </div>


            </div>
            <div className='w-[25%] h-screen '></div>

        </div>
    )
}
