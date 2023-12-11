import React from 'react'
import { Navigation } from '../Public'

const Header = () => {
  return (
    <div className="w-full flex h-[40px] flex-none">
      <div style={{backgroundColor: "rgb(255, 189, 189)"}} className="flex items-center justify-center font-extrabold text-white bg-secondary1 w-[300px] flex-none" >
        Hustcare
      </div>
      <Navigation isAdmin={true} />
    </div>
  )
}

export default Header