/* This example requires Tailwind CSS v2.0+ */
import { ShareIcon } from '@heroicons/react/outline';
import {
   AnnotationIcon,
   PaperClipIcon,
   PencilIcon,
   HeartIcon,
   TrashIcon,
} from '@heroicons/react/solid';

export default function Toolbar() {
   return (
      <div className="relative pt-1">
         <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300" />
         </div>
         <div className="relative flex justify-center">
            <span className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm">
               <button
                  type="button"
                  className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-400 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
               >
                  <span className="sr-only">Like</span>
                  <HeartIcon className="h-5 w-5" aria-hidden="true" />
               </button>

               <button
                  type="button"
                  className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-400 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
               >
                  <span className="sr-only">Share</span>
                  <ShareIcon className="h-5 w-5" aria-hidden="true" />
               </button>
            </span>
         </div>
      </div>
   );
}
