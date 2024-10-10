import './dashboard-ui.css';
import Review from '@/public/review-notification.png';
import Request from '@/public/request-notification.png';
import Complete from '@/public/complete-notification.png';
import Image from "next/image";
import Tip from '@/public/tip-notification.png';

const notificationsMock = [
  { text: "Bob Meowington just sent you a booking request", time: "10m", type: "request" },
  { text: "Fluffer the Booker just left you a tip", time: "1h", type: "tip" },
  { text: "Fluffer the Booker just paid you", time: "1h", type: "payment" },
  { text: "Paws the Pub Owner just left you a review", time: "4h", type: "review" },
  { text: "Paws the Pub Owner just paid you", time: "5h", type: "payment" },
];

const notifications = notificationsMock;

export default function Notifications() {
    return (
        <div className="w-[300px] shadow-[0px_0px_0px_#272525] ml-[30px] mr-[18px] mt-5 mb-0 p-5 rounded-[20px] bg-[#252531]">
            <span className="block text-[11px] tracking-[1px] uppercase ml-2.5 mr-0 mt-[3px] mb-[18px]">Notifications</span>
            {notifications.map((notification) => {
                const src = notification.type === 'review' 
                    ? Review 
                    : notification.type === 'tip' 
                    ? Tip 
                    : notification.type === 'request' 
                    ? Request 
                    : Complete;
                return (
                    <div className='text-[10px] flex flex-row items-center leading-[1.3] shadow-[0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)] text-center mb-2.5 pl-[5px] pr-[7px] pt-1.5 pb-3 rounded-[15px] tracking-[1px]' key={notification.text}>
                    <Image src={src} className="mr-3" height={35} alt="mock user profile photo" />
                    {notification.text}
                    </div>
                );
                })}
        </div>
    )
}