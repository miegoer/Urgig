import "@/app/globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

// This should be the front page -- before login and etc.


export default function Home() {
  return (
    <div>
      <h1>MAIN PAGE</h1>
      <Link href="/sign-up">CREATE AN ACCOUNT</Link>
      <br/>
      <Link href="/sign-in"> LOGIN </Link>
    </div>
  );
}

// import clsx from 'clsx';


// export default function navBarA () {
//     const pathname = usePathname();
//     return (
//         <>
//         {links.map((link: MainNavLink) => (
//             <Link key={link.name} href={link.href} className={clsx(
//                 'text-[#dcff58] uppercase text-[12px] mx-[30px] my-[10px] tracking-[3px]',{'text-[#ffc037]': pathname === link.href})}>
//                 {link.name}
//             </Link>
//         ))}
//         </>
//     )
// }
