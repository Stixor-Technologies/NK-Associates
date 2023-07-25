'use client'
import React, {FC} from 'react'

interface PropertyDetailProps {
  params: {
    id: string;
  };
}

const PropertyDetail: FC<PropertyDetailProps> = ({params: {id}}) => {
  console.log(id)
  return (
    <div>Detail</div>
  )
}

export default PropertyDetail