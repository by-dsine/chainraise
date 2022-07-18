import { Carousel } from 'flowbite-react';
import Image from 'next/image';

export const HeroCarousel = () => {
   return (
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
         <Carousel>
            <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
               <Image width="32" height="32" src="/logomark.png" />
            </div>
            <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
               Slide 2
            </div>
            <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
               Slide 3
            </div>
         </Carousel>
      </div>
   );
};
