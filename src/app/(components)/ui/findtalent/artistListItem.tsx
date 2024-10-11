import Image from "next/image";
import Link from "next/link";
import { ArtistItemProps } from "@/mockData/artistList";
import { MockArtists } from "@/mockData/artistList";

const socialIcons = [
  {imageurl: '/spotify-icon.png', alt: 'Spotify Icon'}, {imageurl: '/tiktok-icon.png', alt: 'TikTok Icon'}, {imageurl: '/youtube-icon.png', alt: 'YouTube'}
]
  
// Individual artist list item on the find talent page
  
  const ArtistListItem: React.FC<ArtistItemProps> = ({ name, profilePhoto, tags, fanBase, numberOfEvents}) => {
    
    return (
      <>
        <div className="shadow-[0px_4px_5px_#191922] h-[130px] flex flex-row rounded-[20px] bg-[#252531] mb-[20px] p-3">
        <Link key={name} href={`/a/profile/${name}`}>
          <Image src={profilePhoto} width={100} height={100} alt="Profile photo" className="rounded-[5px] shadow-[2px_4px_4px_#191922] object-cover" />
        </Link>
          <div className="flex flex-col p-2 w-[300px]">
            <span className="block text-[11px] tracking-[1.5px] uppercase mt-[1px] mb-[8px] text-center">{name}</span>
            <div className="flex flex-wrap p-2 justify-center">
              {tags.map((tag) => <span className="inline px-2 py-1 mx-[10px] mt-2 text-[10px] bg-[black] text-[#ccff69] rounded-[3px] text-[#ccff69] tracking-[1px] uppercase">{tag}</span>)}
            </div>
          </div>
          <div className="flex flex-row w-[250px] text-center justify-around py-2 px-5 items-center" style={{borderLeft: '1px solid black'}}>
          {socialIcons.map((social, index) => {
            const keyName = Object.keys(fanBase)[index];
              return (
            <div key={index} className="flex flex-col items-center">
            <Image src={social.imageurl} width={29} height={29} alt={social.alt} className="object-contain shadow-[0px_4px_5px_#191922]" />
              <span className="block mt-[10px] tracking-[1px] text-xs">{`${fanBase[keyName]}`}</span>
            </div>)})}
          </div>
          <div className="flex flex-col w-[160px] items-center py-3 px-6 justify-center" style={{borderLeft: '1px solid black'}}>
            <span className="block text-[15px] tracking-[1.5px] uppercase mt-[1px] mb-[3px] text-center">{numberOfEvents}</span>
            <span className="block text-[11px] tracking-[1.5px] uppercase mt-[1px] mb-[8px] text-center">Events</span>
          </div>
          <div className="flex flex-col w-[80px] justify-between py-3 px-5 -mr-5" style={{borderLeft: '1px solid black'}}>
            <Image src='/save-icon.png' width={25} height={25} alt='save icon' />
            <Image src='/share-icon.png' width={25} height={25} alt='share icon' />
          </div>
        </div>
      </>
    );
  };
  
  export default ArtistListItem;
  