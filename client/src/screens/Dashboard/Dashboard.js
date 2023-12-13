import React, { useState, useEffect } from 'react'
import {io} from 'socket.io-client';

export default function Dashboard() {
    const img = "https://inst.eecs.berkeley.edu/~cs194-26/fa17/upload/files/proj4/cs194-26-adq/asianguy.jpg";

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user:details')))
    const [conversation, setConversation] = useState([]);
    const [messages, setMessages] = useState({});
    const [typeMessage, setTypeMessage] = useState('');
    const [people, setPeople] = useState([]);
    const [socket, setSocket] = useState([null]);



    useEffect(() => {
        setSocket(io('http://localhost:8080'));
    },[]);
    useEffect(() => {
        const fetchConversations = async () => {
            const user = JSON.parse(localStorage.getItem('user:details'));
            try {
                const response = await fetch('http://localhost:8000/api/conversation/' + user._id);
                const result = await response.json();
                console.log("result-->", result);
                setConversation(result);
            }
            catch (err) {
                console.log(err);
            }
        }

        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/users', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'GET'
                });
                const result = await response.json();
                setPeople(result);
            } catch (err) {
                console.log("error-->", err);
            }
        }

        fetchConversations();
        fetchUsers();
    }, []);

    console.log("peoples-->", people);

    const fetchMessages = async (conversationId, receiver) => {
        try {
            const response = await fetch(`http://localhost:8000/api/message/${conversationId}?senderId=${user._id}&&receiverId=${receiver?.receiverId}}}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            setMessages({ messages: result, receiver, conversationId });
            console.log("Conversation Id's-->", result);

        } catch (err) {
            console.log("error-->", err);
        }
    }

    const sendMessage = async () => {

     console.log("all parameters", messages?.conversationId, user?._id, typeMessage, messages?.receiver?.receiverId);
        try {
            const response = await fetch('http://localhost:8000/api/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    conversationId: messages?.conversationId,
                    senderId: user?._id,
                    message: typeMessage,
                    receiverId: messages?.receiver?.receiverId
                })
            });

            const result = await response.json();
            setTypeMessage('');


        } catch (err) {
            console.log("error-->", err);
        }
    };



    console.log("user-->", user);
    console.log("conversation-->", messages)
    // console.log("sender-->",messages[0].senderId);

    return (
        <div className='w-screen flex'>

            <div className='w-[25%] h-screen bg-secondary'>
                <div className='flex items-center my-8 mx-14'>
                    <div className='p- [2px] rounded-full border border-primary bg-primary'>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqTCPThgrx-XH0fFjponEDjLLrksQ_EyMR4w&usqp=CAU" alt="logo" width={50} height={50} className='rounded-full border border-primary bg-primary' />

                    </div>
                    <div className='ml-8'>
                        <h2 className='text-xl'>Welcome, {user?.fullName}</h2>
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
                            conversation.length > 0 &&
                            conversation.map(({ conversationId, user }) => {
                                return (
                                    <div className='flex ml-2 items-center my-8 border-b py-3 border-b-gray-400 '>
                                        <div className='cursor-pointer flex items-center' onClick={() =>
                                            fetchMessages(conversationId, user)}>
                                            <div className='p- [2px] rounded-full border border-primary bg-primary'>
                                                <img src={img} alt="logo" width={35} height={20} className='h-[45px] w-[40px] rounded-full border border-primary bg-primary' />

                                            </div>
                                            <div className='ml-6'>
                                                <h2 className='text-lg font-semibold'>{user?.fullName}</h2>
                                                <p className='text-sm font-light text-gray-600'>{user?.email}</p>
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
                {

                    messages?.receiver?.fullName &&
                    <div className='w-[75%] bg-secondary h-[10%] mt-12 rounded-full flex px-14 items-center mb-0.5 shadow-md'>
                        <div>
                            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww" alt="logo" width={50} height={50} className='h-[50px] w-[48px] rounded-full border border-primary bg-primary' />
                        </div>
                        <div className='ml-5 mr-auto'>


                            <h2 className='text-xl font-semibold'>  {messages?.receiver?.fullName}</h2>


                            <p className='text-sm text-gray-600 mx-1'>online</p>
                        </div>
                        <div className='ml-auto cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-phone-outgoing" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="black" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" /><path d="M15 9l5 -5" /><path d="M16 4l4 0l0 4" /></svg>
                        </div>
                    </div>

                }

                <div className='h-[75%] overflow-y-scroll w-full'>
                    <div className='p-14 w-full'>

                        {
                            messages?.messages?.length > 0 ?
                                messages.messages.map(({ message, id }) => {
                                    if (user._id === id) {

                                        return (

                                            <div className='max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto mt-5 p-1 text-white'>
                                                {message}
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div className='max-w-[40%] bg-secondary rounded-b-xl rounded-tr-xl mt-5 p-1'>
                                                {message}
                                            </div>
                                        )
                                    }

                                }) :
                                <div className='text-center text-lg font-semibold mt-24'>
                                    No Messages or Conversation Selected
                                </div>

                        }

                    </div>
                </div>

                {
                    messages?.receiver?.fullName &&
                    <div className='w-full p-6 flex items-center'>
                        <input type="text" placeholder='Type a message...' className='w-[80%] p-4 border-0 rounded-full 
                    focus:ring-0 focus:outline-0 shadow-md bg-light'
                            value={typeMessage}
                            onChange={(e) => {
                                setTypeMessage(e.target.value);
                                console.log("typeMessage-->", typeMessage);
                            }
                            }
                        />
                        <div className={`p-4 mx-3 cursor-pointer bg-light rounded-full ${!typeMessage && 'pointer-events-none'} `} onClick={() => {
                            sendMessage();
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-send" width="24" height="24"
                                viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                                stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 14l11 -11" />
                                <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" /></svg>
                        </div>

                        <div className={`cursor-pointer bg-light rounded-full ${!typeMessage && 'pointer-events-none'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-plus" width="24" height="24"
                                viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                                stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                                <path d="M9 12h6" /><path d="M12 9v6" /></svg>
                        </div>
                    </div>

                }


            </div>


            {/*Div for users and sender profile */}
            <div className='w-[25%] h-screen bg-light px-9 py-14'>
                <div className='text-primary text-lg font-semibold'>
                    People
                </div>

                {
                    people.length > 0 &&
                    people.map(({ userId, user }) => {
                        if(userId !== JSON.parse(localStorage.getItem('user:details'))._id){

                        return (

                            <div className='flex ml-2 items-center my-8 border-b py-3 border-b-gray-400 '>
                                <div className='cursor-pointer flex items-center' onClick={() =>
                                    fetchMessages('new', user)}>
                                    <div className='p- [2px] rounded-full border border-primary bg-primary'>
                                        <img src={img} alt="logo" width={35} height={20} className='h-[45px] w-[40px] rounded-full border border-primary bg-primary' />

                                    </div>
                                    <div className='ml-6'>
                                        <h2 className='text-lg font-semibold'>{user?.fullName}</h2>
                                        <p className='text-sm font-light text-gray-600'>{user?.email}</p>
                                    </div>
                                </div>
                            </div>
                        )
                                }      
                    })

                }

            </div>
        </div>
    )
}
