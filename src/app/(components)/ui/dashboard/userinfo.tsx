import Image from "next/image";
const PrincessCheeto = "/mockUsers/princess-cheeto.webp";
const DJFrankenstein = "/mockUsers/DJFrankenstein.png";
import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({
  weight: "400",
  subsets: ["latin"],
});

export default function UserInfo() {
  return (
    <div className="w-[460px] shadow-[0px_0px_0px_#272525] rounded-[20px] bg-[#252531] p-6 flex flex-row items-center overflow-x-auto">
      <Image
        src={DJFrankenstein}
        height={80}
        width={80}
        alt="mock profile photo"
        className="h-[120px] w-[120px] object-cover m-2.5 rounded-[50%]"
      />
      <div className="flex flex-col justify-center ml-12">
        <div className={`text-l tracking-[2px] text-center mb-2.5 ${ubuntu.className}`}>
          DJ Frankenstein
        </div>
        <span className="block text-[14px] tracking-[2px] mb-2.5 text-center">10 Connections</span>
        <div
          className={`flex flex-row tracking-[1px] ${ubuntu.className} border-t-[white] border-t border-solid mt-[6px] pt-[14px] justify-around`}
        >
          <span className="block text-[12px] text-[#ffa813] mt-[5px]">EDIT</span>
          <span className="block text-[12px] text-[#dcff58] mt-[5px]">BOOST</span>
        </div>
      </div>
    </div>
  );
}
