/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable unused-imports/no-unused-imports */
import React, { useState } from 'react'
import { useRouter } from 'next/router'

import { FiLogOut, FiArrowRight } from 'react-icons/fi'
import { RxTextAlignJustify, RxCross2 } from 'react-icons/rx'

const Navbar = () => {
  const router = useRouter()

  return (
    <nav
      className={`fixed top-0 z-50 flex items-center justify-between w-full px-4 py-5 bg-transparent`}>
      <div className="w-[95vw] flex flex-wrap items-center justify-between p-3 mx-auto bg-[#2C3639] bg-opacity-40 border-2 border-[#2C3639] rounded-lg shadow-lg">
        <span
          className={`self-center text-lg font-semibold whitespace-nowrap text-white text-opacity-75
          
        `}>
          UMPATAN <span className="text-yellow-300">HERDY</span>
        </span>

        <div className="flex items-center md:order-2">
          <button className="flex items-center justify-center z-[1000] w-10 h-10 text-gray-500 rounded-md dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:outline-none focus:text-gray-700 dark:focus:text-gray-400"></button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
