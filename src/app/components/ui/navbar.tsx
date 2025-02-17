import React from 'react';
import Link from 'next/link';


const Navbar = () => {
   return (
       <div className='p-8'>
           <nav className='p-8'>
               <ul className='py-8 bg-black fixed top-0 right-0 left-0 flex justify-center'>
                   <li className='px-8 transition delay-50 duration-200 ease-in-out hover:-translate-y-.5 hover:scale-110 hover:underline decoration-dashed'><Link href="/admin/dashboard/">Home</Link></li>
                   <li className='px-8 transition delay-50 duration-200 ease-in-out hover:-translate-y-.5 hover:scale-110 hover:underline decoration-dashed'><Link href="/admin/about/">About</Link></li>
                   <li className='px-8 transition delay-50 duration-200 ease-in-out hover:-translate-y-.5 hover:scale-110 hover:underline decoration-dashed'><Link href="/admin/contact/">Contact</Link></li>
                   <li className='px-8 transition delay-50 duration-200 ease-in-out hover:-translate-y-.5 hover:scale-110 hover:underline decoration-dashed'><Link href="/admin/products/">Products</Link></li>
               </ul>
           </nav></div>


   )
}


export default Navbar;