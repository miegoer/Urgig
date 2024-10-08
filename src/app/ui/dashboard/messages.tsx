import './dashboard-ui.css';
import Image from "next/image";
import NerdCat from '@/public/mockUsers/nerdy-cat.jpg';
import WhiteCat from '@/public/mockUsers/white-cat.webp';

const messages = [
    { name: 'Bob Meowington', message: 'Can you perform this Friday night?', status: 'unread', photo: NerdCat, alt: 'Nerdy cat mock user'},
    {name: 'Fluffer the Booker', message: 'Thanks for such a great show!', status: 'read', photo: WhiteCat, alt: 'White cat mock user'},
    { name: 'Paws the Pub Owner', message: "You're the best, Princess Cheeto.", status: 'read', photo: WhiteCat, alt: 'Diva cat mock user'}
  ]

export default function Messages() {
    return (
        <div className="w-[380px] shadow-[0px_0px_0px_#272525] flex ml-2.5 mr-7 mt-5 mb-0 p-5 rounded-[20px] bg-[#252531]">
            <div className="w-[98%]">
            <span className="block text-[11px] tracking-[1px] uppercase ml-2.5 mr-0 mt-[3px] mb-[18px]">Messages</span>
            {messages.map((message) => (
        <div className={`h-[70px] text-[white] text-[11px] flex flex-row mx-0 my-2.5 px-[30px] py-3 rounded-[20px] ${message.status === 'read'? 'message-box-read' :     'message-box-unread' }`}>
            <Image 
                src={message.photo} className="object-cover ml-[-15px] mr-5 rounded-[50%]" alt={message.alt} width={45} height={45} key={message.name}/>
            <div className="flex flex-col w-[90%]">
                <span className="text-[13px] mb-[5px]">{message.name}</span>
                <span className="tracking-[1px]">{message.message}</span>
            </div>
        </div>
            ))}
            </div>
        </div>
    )
}