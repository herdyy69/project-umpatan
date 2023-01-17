import React, { useEffect, useState, useRef } from 'react'
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, get, set, onValue, remove } from 'firebase/database'
import { useRouter } from 'next/router'
import { MdOutlineExitToApp } from 'react-icons/md'
import { AiOutlineUserAdd } from 'react-icons/ai'

const ChatD = ({ status, button }) => {
  const router = useRouter()
  const initUserL = localStorage.getItem('initUser')
  const [initUser, setInitUser] = useState(initUserL ? initUserL : '')
  localStorage.setItem('initUser', initUser)

  const [initUsers, setInitUsers] = useState(initUser ? true : false)

  const [message, setMessage] = useState()
  const [pastMessage, setPastMessage] = useState([])

  const messagesEndRef = useRef(pastMessage)

  const scrollToBottom = () => {
    messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight
  }

  useEffect(scrollToBottom, [])

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

  const sendMessage = e => {
    e.preventDefault()
    set(ref(db, `chats/${Date.now()}`), {
      id: Math.floor(Math.random() * 1000000),
      user: initUser,
      message,
      date: currentDate,
    })
    setMessage('')
  }
  const deleteMessage = id => {
    remove(ref(db, `chats/${id}`))
  }

  useEffect(() => {
    onValue(ref(db, 'chats'), snapshot => {
      const data = snapshot.val()
      const pastMsg = []
      for (const id in data) {
        pastMsg.push({ id, ...data[id] })
      }
      setPastMessage(pastMsg)
    })
  }, [])

  const initialUser = () => {
    return (
      <form className="m-2">
        <label
          for="search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <AiOutlineUserAdd className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            onChange={e => {
              e.PreventDefault
              setInitUser(e.target.value)
            }}
            value={initUser}
            type="text"
            id="userInit"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Username Anda !"
            required
          />
          {initUser ? (
            <button
              onClick={e => {
                e.PreventDefault
                setInitUsers(true)
              }}
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              OKAY!
            </button>
          ) : (
            <button
              disabled
              onClick={e => {
                e.PreventDefault
                setInitUsers(true)
              }}
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Isi dulu !
            </button>
          )}
        </div>
      </form>
    )
  }

  const thisChat = () => {
    return (
      <>
        <div
          ref={messagesEndRef}
          className="w-full min-h-[20rem] max-h-[20rem] overflow-auto bg-white border-2 rounded-md px-2">
          {pastMessage ? (
            pastMessage.map(data => (
              <div
                key={data.id}
                onClick={() => {
                  deleteMessage(data.id)
                }}
                className={` ${
                  data.user === initUser ? 'justify-end' : 'justify-start'
                } flex`}>
                <div className="bg-gray-400 max-w-[16rem] px-3 py-1 rounded-md my-1">
                  <p className="text-xs text-slate-800 font-bold">
                    {data?.user}
                  </p>
                  <p className="text-xs text-slate-800 font-normal break-words mt-1">
                    {data?.message}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center">
              <div className="bg-gray-400 max-w-[16rem] px-3 py-1 rounded-md my-1">
                <p className="text-xs text-slate-800 font-normal break-words mt-1">
                  IM SORRY :|
                </p>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={sendMessage}>
          <label for="message" className="sr-only">
            Your message
          </label>
          <div className="flex items-center px-1 py-2 rounded-lg bg-white mt-2">
            <textarea
              onChange={e => {
                setMessage(e.target.value)
              }}
              value={message}
              id="message"
              rows="1"
              className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 "
              placeholder="Ketik Pesan ..."></textarea>
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
      </>
    )
  }

  return (
    <div className="bg-[#252525] w-full h-full md:max-w-[35rem] max-w-[21.4rem] max-h-[29.5rem] z-[1000] fixed bottom-3 right-5 rounded-md p-1">
      <div className="flex flex-col m-1 mt-1">
        <div className="bg-white w-full rounded-sm p-3">
          <div className="flex flex-row justify-between items-center">
            {button}
            <span className="text-[10px] font-bold">
              Beta <span className="text-[8px] font-normal">Version</span>
            </span>
          </div>
        </div>
        <div className="mt-2">{initUsers ? thisChat() : initialUser()}</div>
      </div>
    </div>
  )
}

export { ChatD }
