import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Properties = () => {
  return (
    <div className=''>
        <div>
           <Link href={"#"} className='rounded-xl'>
             <Image src={'/card_img.svg'} width={400} height={400} alt=''/>
           </Link> 
           <div>
            <span className='text-nk-gray text-sm font-medium bg-white rounded-full py-1 px-3 shadow-lg md:text-xs'>Residential</span>
            <span className='text-nk-gray text-xs font-medium bg-white'>Sale</span>

            </div>  
        </div>
    </div>
  )
}

export default Properties