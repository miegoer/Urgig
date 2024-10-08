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