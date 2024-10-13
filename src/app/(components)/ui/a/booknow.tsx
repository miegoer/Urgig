import { Ubuntu } from "next/font/google";

interface BookNowProps {
    setOpenBooking: React.Dispatch<React.SetStateAction<boolean>>;
  }

  const ubuntu = Ubuntu({
    weight: "400",
    subsets: ["latin"],
  });

export const BookNow: React.FC<BookNowProps> = ({ setOpenBooking }) => {
  

    return (
        <div className="absolute bg-[#20202A] text-[white] p-8 z-100 rounded-[20px] w-[55%] h-[55%]">
            <h1 className={`${ubuntu.className} text-center text-2xl text-[#ccff69] tracking-[1px]`}>Booking Request</h1>
            <div className="h-[35%]">
                Attach an Event:
            </div>
            <div className="h-[35%]">
                Payment Info:
            </div>

            <div className="flex flex-row justify-between">
                <button className="border border-solid border-[#ccff69] rounded-[20px] py-3 px-8 ml-3 text-[#ccff69]" onClick={() => setOpenBooking(false)}>
                    Back
                </button>
                <button className={`${ubuntu.className} border border-solid border-[#20202A] rounded-[20px] text-[#20202A] bg-[#ccff69] py-3 px-8 mr-3`}>
                    Submit
                </button>
            </div>
    
        </div>
    )
}