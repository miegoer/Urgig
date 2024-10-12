"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { User } from "../../../../../../../types/user";
import Link from "next/link";

export default function Promoter() {
  const { promoterId } = useParams();

  const [promoter, setPromoter] = useState<any>({});
  const [events, setEvents] = useState<any>([]);

  useEffect(() => {
    // Primer fetch para obtener el promotor
    const fetchPromoter = () => {
      fetch(`/api/users/67082b9e4e2febe0103240ff`)
        .then((response) => response.json())
        .then((data) => {
          setPromoter(data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
  
    fetchPromoter();
  }, []); 
  
  useEffect(() => {
    if (promoter && promoter.events) {
      const fetchPromoterEvents = () => {
        const eventsFetched :any= [];
        promoter.events.forEach((eventId : string, index:number) => {
          fetch(`/api/events/${eventId}`)
            .then((response) => response.json())
            .then((eventJSON) => {
              eventsFetched.push(eventJSON);
              if (index === promoter.events.length - 1) {
                setEvents((prevEvents :any) => [...prevEvents, ...eventsFetched]);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        });
      };
  
      fetchPromoterEvents();
    }
  }, [promoter]);

  // useEffect(() => {
  // }, [promoter]);

  return (
    <>
      <div className="flex flex-col justify-center  w-[600px] ml-[30px]">
        <div
          className={`z-10 w-[100%] mt-8 p-5 rounded-[2px] text-center tracking-[1.5px] text-[white] text-sm`}
        >
          Promoter Info
        </div>

        <div className="flex flex-col justify-center ml-[78px] w-[450px] ">
          <div className="border-t w-[300px] h-0 self-center"></div>

          <div className="mt-3 text-xs text-[#a0aec0] space-y-1 text-center">
            <p>{promoter?.companyName}</p>
            <p>{promoter?.email}</p>
            <p>{promoter?.contactNumber}</p>
            <p>{promoter?.location}</p>
          </div>

          <div className="border-t w-[300px] h-0 self-center mt-4"></div>

          <div className="mt-4  text-[white] text-sm space-y-1 text-center tracking-[1.5px] ">
            <p className="text-xs text-[#a0aec0]">Bio: </p>
            <p>"{promoter?.profileDetails?.aboutMe}"</p>
          </div>

          <div className="border-t w-[300px] h-0 self-center mt-4"></div>

          <div className="mt-4  text-[white] text-sm space-y-1 text-center tracking-[1.5px] ">
            <Link href={`promoter?.profileDetails?.selectedVideo`}>
              <p className="text-xs text-[#a0aec0]">
                Check out my work{" "}
                <span className="text-xs text-[#546d8f] underline mt-8">
                  here
                </span>{" "}
              </p>
            </Link>
            <p className="text-xs text-[#a0aec0] mt-8">Events: </p>
            {events.map((event: any) => (
              
              <div key={event._id}>
                
                {event.name && <p className="text-xs text-[#a0aec0] mt-2">{event.name}: </p>}
                {event.link &&<Link href={`${event.link}`}>{event.link}</Link>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// {
//   "_id": "670830001234567890abcdef",
//   "typeOfAccount": "promoter",
//   "email": "events@megapromotions.com",
//   "name": "Mega Promotions Ltd.",
//   "contactNumber": "+18005551234",
//   "dateOfBirth": {
//     "$date": "2000-05-10T00:00:00Z"
//   },
//   "location": "New York, NY",
//   "profileDetails": {
//     "aboutMe": "Mega Promotions is a global event management company that specializes in large-scale concerts and festivals.",
//     "selectedVideo": "https://www.youtube.com/watch?v=exampleVideo1",
//     "socialLinks": [
//       {
//         "twitter": "https://twitter.com/megapromotions",
//         "facebook": "https://www.facebook.com/megapromotions",
//         "youtube": "https://www.youtube.com/@megapromotions",
//         "instagram": "https://www.instagram.com/megapromotions",
//         "_id": {
//           "$oid": "67096fd94bf4d37af458da0d"
//         }
//       }
//     ],
//     "unAvailableDates": [
//       {
//         "$date": "2024-01-01T00:00:00Z"
//       }
//     ],
//     "genre": [
//       "All Genres"
//     ],
//     "_id": {
//       "$oid": "67096fd94bf4d37af458da0c"
//     }
//   },
//   "statistics": {
//     "profileViews": 50000,
//     "offersGot": 150,
//     "offersAcccepted": 130,
//     "income": 1000000,
//     "avgCapacity": 50000,
//     "totalAtendees": 300000,
//     "totalEvents": 50,
//     "_id": {
//       "$oid": "67096fd94bf4d37af458da0e"
//     }
//   },
//   "events": [
//     "67082687765db5728aa99587",
//     "67082687765db5728aa99588",
//     "67082687765db5728aa99589",
//     "67082687765db5728aa99590",
//     "67a40091a32dc78d7584bb41",
//     "67a40091a32dc78d7584bb42",
//     "67a40091a32dc78d7584bb43"
//   ],
//   "__v": 0
// }
