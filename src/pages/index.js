import { NextPage } from 'next'

import { useState, useEffect } from 'react'
import { Meta } from '@/Layouts/Meta'
import { Main } from '@/components/Templates/Main'
import { ChatD } from '@/components/Chats/ChatD'
import { AppConfig } from '@/Utils/AppConfig'

import { initializeApp } from 'firebase/app'
import { getDatabase, ref, get, set, onValue } from 'firebase/database'

import { BiMessageAdd } from 'react-icons/bi'
import { MdOutlineCloseFullscreen } from 'react-icons/md'
import { MdOutlineExitToApp } from 'react-icons/md'

import { BsChatFill } from 'react-icons/bs'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Index = () => {
  const [modal, setModal] = useState()
  const [modalChat, setModalChat] = useState(false)

  const [user, setUser] = useState('Anonymous')
  const [message, setMessage] = useState()
  const [pastMessage, setPastMessage] = useState([])

  const notif = () => {
    toast.success('Umpatan berhasil terkirim!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    })
  }

  const firebaseConfig = {
    apiKey: 'AIzaSyD4fh7kKbO394ZWGmzl2t-gNph_hVU6lH4',
    authDomain: 'myqanda-f55be.firebaseapp.com',
    databaseURL:
      'https://myqanda-f55be-default-rtdb.asia-southeast1.firebasedatabase.app',

    projectId: 'myqanda-f55be',
    storageBucket: 'myqanda-f55be.appspot.com',
    messagingSenderId: '62521548012',
    appId: '1:62521548012:web:011f3bf6220ba9905559c9',
    measurementId: 'G-BBTB6G0NYZ',
  }

  const app = initializeApp(firebaseConfig)
  const db = getDatabase(app)

  const date = new Date()
  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()
  let currentDate = `${day}-0${month}-${year}`

  const sendUmpatan = e => {
    e.preventDefault()
    set(ref(db, `umpatan/${Date.now()}`), {
      id: Math.random(),
      user: user,
      message,
      date: currentDate,
    })
    setUser('')
    setMessage('')
    notif()
    setTimeout(() => {
      setModal(false)
    }, 300)
  }

  useEffect(() => {
    onValue(ref(db, 'umpatan'), snapshot => {
      const data = snapshot.val()
      const pastMsg = []
      for (const id in data) {
        pastMsg.push({ id, ...data[id] })
      }
      setPastMessage(pastMsg)
    })
  }, [])

  const closeButton = () => {
    return (
      <button
        onClick={() => {
          setModalChat(true)
          if (modalChat === true) {
            setModalChat(false)
          }
        }}
        className="flex flex-row items-center">
        <MdOutlineExitToApp className="w-8 h-8" />
        Exit
      </button>
    )
  }

  const myModal = () => {
    return (
      <div className="bg-[#2C3639] bg-opacity-90 w-full max-w-xl fixed top-0 right-0 z-[1000] rounded-bl-md">
        <MdOutlineCloseFullscreen
          onClick={() => {
            setModal(false)
          }}
          className="h-11 w-11 cursor-pointer fixed top-[2rem] right-[2.3rem] bg-slate-800 text-white p-1 border-2 border-white rounded-full"
        />
        <div className="flex flex-col justify-start space-y-8 items-start p-5">
          <h1 className="text-2xl font-bold text-white mt-[0.34rem] rounded-md border-2 border-white p-2 mb-3">
            KIRIM UMPATAN
          </h1>

          <form onSubmit={sendUmpatan}>
            <label for="chat" className="sr-only">
              Your message
            </label>
            <div className="flex items-center px-3 py-2 rounded-lg bg-neutral-100 dark:bg-gray-700">
              <div className="flex flex-row items-center space-x-2">
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-base font-bold text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md ">
                    @
                  </span>
                  <input
                    onChange={e => {
                      setUser(e.target.value)
                    }}
                    value={user}
                    type="text"
                    className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="anonymous"
                  />
                </div>
              </div>
              <textarea
                onChange={e => {
                  setMessage(e.target.value)
                }}
                value={message}
                rows="1"
                className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your message..."
                required></textarea>
              <button
                type="submit"
                className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 rotate-90"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
                <span className="sr-only">Send message</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <Main>
      <Meta
        title={`${AppConfig.title} | Umpatan`}
        description={AppConfig.description}
      />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {modal && myModal()}
      {modalChat ? <ChatD status={modalChat} button={closeButton()} /> : ''}

      <BiMessageAdd
        onClick={() => {
          setModal(true)
        }}
        className="w-10 h-10 fixed top-[2.1rem] right-[2.4rem] z-[999] cursor-pointer"
      />
      <div className="fixed bottom-3 right-6 bg-slate-50 p-3 border-2 border-slate-800  rounded-full cursor-pointer">
        <BsChatFill
          onClick={() => {
            setModalChat(true)
            if (modalChat === true) {
              setModalChat(false)
            }
          }}
          className="w-10 h-10"
        />
      </div>
      <div
        style={{
          height: '98vh',
          width: '98vw',
        }}
        className="w-full mx-auto mt-2 rounded-md bg-[#DCD7C9] border-2 border-slate-800 overflow-y-scroll">
        <div className="flex flex-row flex-wrap justify-center items-center space-x-1 space-y-1 px-10 py-2 pt-[6rem] text-white">
          {pastMessage?.map(data => (
            <div
              key={data?.id}
              className="border-2 border-slate-600 rounded-md p-2">
              <div className="block min-w-[20rem] md:min-w-[14rem] max-w-sm p-2 bg-[#3F4E4F] bg-opacity-60 border-2 border-[#2C3639] rounded-lg shadow-md transition-all duration-300 blur-[0.5px] hover:blur-none">
                <div className="w-[100%] ...">
                  <div className="whitespace-pre-wrap mb-2 text-base font-bold tracking-tight text-white transition-all duration-300 blur-[2px] hover:blur-none cursor-crosshair">
                    {data?.message}
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <p className="text-sm text-slate-800 font-semibold mt-1 mx-1">
                  {data?.user}
                </p>
                <p className="text-sm font-normal text-white mt-1 mx-1">
                  15-01-2023
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Main>
  )
}

export default Index
