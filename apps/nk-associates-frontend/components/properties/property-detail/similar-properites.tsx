// 'use client'
import React from 'react'
import PropertyCard from '../property-card';
import { getSimilarProperties } from '../../../utils/api-calls'
import { Property } from '../../../utils/types/types'

async function SimilarProperites() {
    const properties = await getSimilarProperties();
    // const properties: Property[] = data.a
    console.log(properties)

  return (
    <div className="container mx-auto px-4 grid gap-x-7 gap-y-12 overflow-hidden py-6 pb-12 sm:grid-cols-2 md:pb-16 lg:grid-cols-3 xl:grid-cols-4">
    {properties.map((property, index) => (
      <PropertyCard key={index} property={property} />
    ))}
  </div>
  )
}

export default SimilarProperites