import React from 'react'
import Image from 'next/image'
import ArrowDown from "../../public/assets/icons/arrow-down.svg"

const SearchBar = () => {
  return (
    <div>
        <button className="bg-nk-white rounded-l-xl   py-4 px-6">
            <span className=" text-nk-gray md:text-lg">
                Property Type
            </span>
            <div className='flex'>
                <span>
                    Any
                </span>
                <Image src={ArrowDown} width={18} height={9} alt='arrow-down' />
            </div>
        </button>
    </div>
  )
}

export default SearchBar