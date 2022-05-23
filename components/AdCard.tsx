import React from 'react'
import { signIn, useSession } from 'next-auth/react'

const product = {
  name: 'Application UI Icon Pack',
  version: { name: '1.0', date: 'June 5, 2021', datetime: '2021-06-05' },
  price: '$220',
  description:
    'The Application UI Icon Pack comes with over 200 icons in 3 styles: outline, filled, and branded. This playful icon pack is tailored for complex application user interfaces with a friendly and legible look.',
  highlights: [
    '200+ SVG icons in 3 unique styles',
    'Compatible with Figma, Sketch, and Adobe XD',
    'Drawn on 24 x 24 pixel grid',
  ],
  imageSrc:
    'https://tailwindui.com/img/ecommerce-images/product-page-05-product-01.jpg',
  imageAlt:
    'Sample of 30 icons with friendly and fun details in outline, filled, and brand color styles.',
}

export default function LoginCard() {
  return (
    <div className="border border-stone-900 bg-white sm:mx-auto sm:w-full sm:max-w-md sm:overflow-hidden sm:rounded-lg">
      <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg bg-gray-100">
        <img
          src={product.imageSrc}
          alt={product.imageAlt}
          className="object-cover object-center"
        />
      </div>
    </div>
  )
}
