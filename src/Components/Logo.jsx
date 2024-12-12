import React from 'react'

const Logo = () => {
  return (
    <>
      <div className='text-center py-10 flex justify-center items-center flex-col gap-1'>
        <div className='logo font-extrabold text-green-600 text-3xl flex justify-center items-center' >
          <span class="material-symbols-outlined font-extrabold text-3xl text-white ">
            lock_open
          </span>

          Pass<span className='text-white'>Box</span>

        </div>
        <div className="text-white text-sm pl-1">
          Your Password Manager
        </div>
      </div>
    </>
  )
}

export default Logo