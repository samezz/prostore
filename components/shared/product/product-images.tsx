'use client';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { useState } from 'react';

const ProductImages = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = useState(0);

  return (
    <div className='space-y-4'>
      <Image
        key={current}
        src={images[current]}
        alt='hero image'
        width={1000}
        height={1000}
        loading='eager'
        className='min-h-75 object-cover object-center'
      />
      <div className='flex'>
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            onKeyDown={(e) => e.key === 'Enter' && setCurrent(index)}
            role='button'
            tabIndex={0}
            className={cn(
              'border mr-2 cursor-pointer hover:border-orange-600',
              current === index && 'border-orange-500'
            )}
          >
            <Image
              src={image}
              alt='product thumbnail'
              width={100}
              height={100}
              className='object-cover'
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;