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
                <div className='w-[75%] bg-secondary h-[10%] mt-12 rounded-full flex px-14 items-center mb-0.5 shadow-md'>
                    <div>
                        <img src="https://a0.anyrgb.com/pngimg/1140/162/user-profile-login-avatar-heroes-user-blue-icons-circle-symbol-logo.png" alt="logo" width={50} height={50} />
                    </div>
                    <div className='ml-5 mr-auto'>
                        <h2 className='text-lg mx-4'>Adam</h2>
                        <p className='text-sm text-gray-600 mx-4'>online</p>
                    </div>
                    <div className='ml-auto cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-phone-outgoing" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="black" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" /><path d="M15 9l5 -5" /><path d="M16 4l4 0l0 4" /></svg>
                    </div>
                </div>
                
                <div className='h-[75%] overflow-y-scroll w-full'>
                    <div className='p-14 w-full'>
                        <div className='max-w-[40%] bg-secondary rounded-b-xl rounded-tr-xl mt-5 p-1'>
                            Lorem ipsum dolor sit amet consectetur adipi. Lorem ipsum dolor sit amet consectetur adipi

                        </div>

                        <div className='max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto mt-5 p-1 text-white'>
                            Lorem ipsum dolor sit amet consectetur adipi Lorem ipsum dolor sit amet consectetur adipi
                        </div>

                        <div className='max-w-[40%] bg-secondary rounded-b-xl rounded-tr-xl mt-5 p-1'>
                            Lorem ipsum dolor sit amet consectetur adipi. Lorem ipsum dolor sit amet consectetur adipi

                        </div>

                        <div className='max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto mt-5 p-1 text-white'>
                            Lorem ipsum dolor sit amet consectetur adipi Lorem ipsum dolor sit amet consectetur adipi
                        </div>

                        <div className='max-w-[40%] bg-secondary rounded-b-xl rounded-tr-xl mt-5 p-1'>
                            Lorem ipsum dolor sit amet consectetur adipi. Lorem ipsum dolor sit amet consectetur adipi
                        </div>

                        <div className='max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto mt-5 p-1 text-white'>
                            Lorem ipsum dolor sit amet consectetur adipi Lorem ipsum dolor sit amet consectetur adipi
                        </div>

                    </div>
                </div>
                <div className='w-full p-6 flex items-center'>
                <input type="text" placeholder='Type a message...' className='w-[80%] p-4 border-0 rounded-full focus:ring-0 focus:outline-0 shadow-md bg-light' />
                <div className='p-4 mx-3 cursor-pointer bg-light rounded-full'>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-send" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 14l11 -11" /><path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" /></svg>
                </div>

                <div className='cursor-pointer bg-light rounded-full'>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M9 12h6" /><path d="M12 9v6" /></svg>
                </div>
            </div>

            </div>
            


            <div className='w-[25%] h-screen '></div>

        </div>
    )
}
