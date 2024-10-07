import Link from 'next/link';
import MainNavLinks from './navlinks';

export default function MainNav() {
  return (

    <div className="bg-[#20202a] col-start-1 col-end-[-1] row-[1] flex flex-row items-center p-[6px_55px] m-[5px_0_16px_-20px] h-[50px] grow">
        <MainNavLinks/>
    </div>
    
    // <div className="flex h-full flex-col px-3 py-4 md:px-2">
    //   <Link
    //     className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
    //     href="/"
    //   >
    //     <div className="w-32 text-white md:w-40">
    //         Test
    //     </div>
    //   </Link>
    //   <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
    //     NavLinks here
    //     <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
    //     <form>
    //       <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
    //         <div className="hidden md:block">Sign Out</div>
    //       </button>
    //     </form>
    //   </div>
    // </div>
  );
}
