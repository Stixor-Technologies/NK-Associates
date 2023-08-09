import React from 'react'
import Image from 'next/image'
import ArrowDown from "../../public/assets/icons/arrow-down.svg"

const SearchBar = () => {
  return (
    <div>
        <button className="bg-nk-white rounded-l-xl">
            <span>
                Property Type
            </span>
            <div>
                <span>
                    Any
                </span>
                <Image src={ArrowDown} width={35} height={35} alt='arrow-down' />
            </div>
        </button>
    </div>
  )
}

export default SearchBar