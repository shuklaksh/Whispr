import Image from 'next/image'
import React from 'react'
import { AiOutlineHeart,AiOutlineRetweet } from 'react-icons/ai'
import { BiMessageRounded, BiUpload } from 'react-icons/bi'

function FeedCard() {
  return (
    <div className='border-t border-gray-600 p-5 hover:bg-gray-900 transition-all cursor-pointer'>
      <div className="grid grid-cols-12 gap-3"> 
        <div className="col-span-1">
          <Image 
          src="https://avatars.githubusercontent.com/u/52699472?v=4"
          alt='user-image'
          height={50}
          width={50}
          className='rounded-full'
          />
        </div>
        <div className="col-span-11  ">
          <h5 className='w-full'>Lakshay Shukla</h5>
          <p>Aise apni bahu kon kon kheechta hai bhai ?
          She was uncomfortable at the same time..</p>
          <div className="postBtns flex justify-between mt-5 text-xl text-center w-[90%]">
            <div>
              <BiMessageRounded />
            </div>
            <div>
              <AiOutlineRetweet />
            </div>
            <div>
              <AiOutlineHeart />
            </div>
            <div>
              <BiUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedCard
