import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import Navbar from './Navbar'

const Main = ({ children }) => {
  const router = useRouter()

  return (
    <div className="antialiased text-gray-800">
      {router.pathname !== '/auth/login' &&
        router.pathname !== '/auth/register' && <Navbar />}
      <div className="mx-auto ">{children}</div>
    </div>
  )
}

export { Main }
