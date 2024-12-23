import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
 const [isOpen, setIsOpen] = useState(false);

 return (
   <nav className="bg-[#F8FAFC] shadow-md">
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       <div className="flex justify-between h-16">
       <div className="flex">
            <Link to="/" className="flex items-center px-2 py-2 text-[#121212]">
                <img src="/todo.svg" alt="Logo" className="h-8 w-auto" />
            </Link>
        </div>
         

         <div className="hidden md:flex items-center">
           <Link to="/" className="px-3 py-2 text-[#121212] hover:text-gray-600">To Do</Link>
           <Link to="/about" className="px-3 py-2 text-[#121212] hover:text-gray-600">About</Link>
         </div>


         <div className="md:hidden flex items-center">
           <button
             onClick={() => setIsOpen(!isOpen)}
             className="text-[#121212] hover:text-gray-600"
           >
             <svg
               className="h-6 w-6"
               fill="none"
               strokeLinecap="round"
               strokeLinejoin="round"
               strokeWidth="2"
               viewBox="0 0 24 24"
               stroke="currentColor"
             >
               {isOpen ? (
                 <path d="M6 18L18 6M6 6l12 12" />
               ) : (
                 <path d="M4 6h16M4 12h16M4 18h16" />
               )}
             </svg>
           </button>
         </div>
       </div>
     </div>


     {isOpen && (
       <div className="md:hidden">
         <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
           <Link
             to="/"
             className="block px-3 py-2 text-[#121212] hover:text-gray-600"
             onClick={() => setIsOpen(false)}
           >
             To Do
           </Link>
           <Link
             to="/about"
             className="block px-3 py-2 text-[#121212] hover:text-gray-600"
             onClick={() => setIsOpen(false)}
           >
             About
           </Link>
         </div>
       </div>
     )}
   </nav>
 );
};