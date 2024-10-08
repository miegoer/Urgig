import { Message } from "@/types/message";

const mockMessages: Message[] = [
  {
    _id: "msg1",
    senderId: "organizer1",
    receiverId: "artist1",
    content: "Hey John, we'd love to have you perform at our Summer Vibes Festival!",
    createdAt: new Date("2024-02-10T10:30:00Z"),
    viewedByReceiver: true,
  },
  {
    _id: "msg2",
    senderId: "artist1",
    receiverId: "organizer1",
    content: "Thanks for the offer! I'm interested. Can you share more details?",
    createdAt: new Date("2024-02-10T11:00:00Z"),
    viewedByReceiver: true,
  },
  {
    _id: "msg3",
    senderId: "organizer2",
    receiverId: "artist1",
    content: "Hi John, we're organizing Rock Out Loud and we'd love to feature you.",
    createdAt: new Date("2024-03-05T09:15:00Z"),
    viewedByReceiver: true,
  },
  {
    _id: "msg4",
    senderId: "artist1",
    receiverId: "organizer2",
    content: "Hey, sounds great! What dates are you planning the event?",
    createdAt: new Date("2024-03-05T09:30:00Z"),
    viewedByReceiver: true,
  },
  {
    _id: "msg5",
    senderId: "organizer3",
    receiverId: "artist1",
    content: "Hey John, can you confirm your availability for Indie Nights on June 15th?",
    createdAt: new Date("2024-03-20T12:00:00Z"),
    viewedByReceiver: false,
  },
  {
    _id: "msg6",
    senderId: "artist1",
    receiverId: "organizer3",
    content: "I'm available on that date. Looking forward to it!",
    createdAt: new Date("2024-03-20T13:00:00Z"),
    viewedByReceiver: true,
  },
  {
    _id: "msg7",
    senderId: "organizer1",
    receiverId: "artist1",
    content: "We'd like to confirm your set time for Summer Vibes. Does 8 PM work for you?",
    createdAt: new Date("2024-05-10T14:45:00Z"),
    viewedByReceiver: false,
  },
  {
    _id: "msg8",
    senderId: "artist1",
    receiverId: "organizer1",
    content: "8 PM sounds perfect. Let's do it!",
    createdAt: new Date("2024-05-10T15:10:00Z"),
    viewedByReceiver: true,
  },
  {
    _id: "msg9",
    senderId: "organizer2",
    receiverId: "artist1",
    content: "Could you send us your tech rider for Rock Out Loud?",
    createdAt: new Date("2024-06-01T08:30:00Z"),
    viewedByReceiver: false,
  },
  {
    _id: "msg10",
    senderId: "artist1",
    receiverId: "organizer2",
    content: "Sure thing! I'll email it over by the end of the day.",
    createdAt: new Date("2024-06-01T08:45:00Z"),
    viewedByReceiver: true,
  },
  {
    _id: "msg11",
    senderId: "organizer3",
    receiverId: "artist1",
    content: "We're excited to have you headline at Indie Nights!",
    createdAt: new Date("2024-06-10T09:00:00Z"),
    viewedByReceiver: true,
  },
  {
    _id: "msg12",
    senderId: "artist1",
    receiverId: "organizer3",
    content: "I'm excited too! It's going to be an amazing night!",
    createdAt: new Date("2024-06-10T09:15:00Z"),
    viewedByReceiver: true,
  },
];

export default mockMessages;
