import React from 'react'

function Banner() {
  return (
    <div className='flex justify-between items-center border-y border-black py-10 lg:py-0'>
      <div className='px-10 space-y-5'>
        <h1 className="max-w-xl font-serif text-6xl">
          The next big opportunity should be for <span className='underline decoration-black decoration-4'>everybody</span>.
        </h1>
        <h2>Get started investing today!</h2>
      </div>
      <img className="hidden md:inline-flex h-32 lg:h-full" src="/logomark.png"/> 
    </div>
  )
}

export default Banner
