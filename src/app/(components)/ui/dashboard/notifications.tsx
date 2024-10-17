import "./dashboard-ui.css";
const Review = "/review-notification.png";
const Request = "/request-notification.png";
const Complete = "/complete-notification.png";
import Image from "next/image";
import { useTalkSession } from "@/app/(context)/TalkSessionContext";
import { useNotifications } from "@/app/(context)/NotificationContext";
const Tip = "/tip-notification.png";


const Notifications: React.FC = () => {
  const { userId, userType } = useTalkSession();
  // const { notifications, markAsRead } = useNotifications();

  const promoterNotifications = [
    { text: "Britney Pears left you a review", time: "5h", type: "review" },
    { text: "You paid Bathtub Joe", time: "5h", type: "payment" },
    { text: "You left a tip for Bathtub Joe", time: "5h", type: "tip" }
  ]

  const artistNotifications = [
    { text: "Nightfall Productions paid you", time: "5h", type: "payment" },
    { text: "Nightfall Productions left you a review", time: "5h", type: "review" },
    { text: "Star Promotions sent you a booking request", time: "5h", type: "request" }
  ]

  const PromoterNotifications = () => {
    return (
      <div>
        {promoterNotifications.map((notification) => {
          // Declare the src variable based on notification type
          const src =
            notification.type === 'review'
              ? Review
              : notification.type === 'tip'
              ? Tip
              : notification.type === 'request'
              ? Request
              : Complete;
  
          return (
            <div
              className="text-[10px] flex flex-row items-center leading-[1.3] shadow-[0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)] text-center mb-2.5 pl-[5px] pr-[7px] pt-1.5 pb-3 rounded-[15px] tracking-[1px]"
              key={notification.text} // Use a unique key, like `notification.id`
            >
              <Image
                src={src}
                className="mr-3"
                height={35}
                width={35}
                alt="notification icon"
              />
              {notification.text}
            </div>
          );
        })}
      </div>
    );
  };

  const ArtistNotifications = () => {
    return (
      <div>
        {artistNotifications.map((notification) => {
          // Declare the src variable based on notification type
          const src =
            notification.type === 'review'
              ? Review
              : notification.type === 'tip'
              ? Tip
              : notification.type === 'request'
              ? Request
              : Complete;
  
          return (
            <div
              className="text-[10px] flex flex-row items-center leading-[1.3] shadow-[0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)] mb-2.5 pl-[5px] pr-[7px] pt-1.5 pb-3 rounded-[15px] tracking-[1px]"
              key={notification.text} // Use a unique key, like `notification.id`
            >
              <Image
                src={src}
                className="mr-3"
                height={35}
                width={35}
                alt="notification icon"
              />
              {notification.text}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-[330px] shadow-[0px_0px_0px_#272525] ml-[30px] mr-[30px] mt-5 mb-0 p-5 rounded-[20px] bg-[#292346] overflow-auto">
      <span className="block text-[11px] tracking-[1px] uppercase ml-2.5 mr-0 mt-[3px] mb-[18px]">
        Notifications
      </span>
      {userType === 'promoter' ? <PromoterNotifications/> : null}
      {userType === 'artist' ? <ArtistNotifications/> : null}
    </div>
  );
}

export default Notifications;


     {/* <ul>
        {notifications.length === 0 ? (
          <li>No new notifications</li>
        ) : (
          notifications.map((notif) => (
            <li
              key={notif._id}
              style={{ background: notif.viewedByOwner ? '#f0f0f0' : '#fff' }}
            >
              {notif.content}
              {!notif.viewedByOwner && (
                <button onClick={() => markAsRead(Number(notif._id))}>Mark as read</button>
              )}
            </li>
          ))
        )}
      </ul> */}