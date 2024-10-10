import Image from "next/image";

type ArtistItemProps = {
    name: string;
    photo: string;
    tags: string[];
  };
  
  const ArtistListItem: React.FC<ArtistItemProps> = ({ name, photo, tags }) => {
    return (
      <>
        <div className="shadow-[0px_4px_5px_#191922] flex flex-row rounded-[20px] bg-[#252531] mb-[20px] p-4">
          <Image src={photo} width={100} height={100} key={name} alt="Profile photo" className="rounded-[5px] shadow-[2px_4px_4px_#191922] object-cover" />
          <div className="flex flex-col p-2 w-[250px]">
            <span className="block text-[11px] tracking-[1.5px] uppercase mt-[2px] mb-[10px] text-center">{name}</span>
          </div>
          <div className="flex flex-col border-l-[white] border-l border-solid w-[200px] text-center justify-between py-2 px-4">
            <Image src='/spotify-icon.png' width={25} height={25} alt="spotify icon" />
            <Image src='/youtube-icon.png' width={25} height={25} alt="youtube icon" />
            <Image src='/tiktok-icon.png' width={28} height={28} alt="tiktok icon" />
          </div>
          <div className="flex flex-col border-l-[white] border-l border-solid w-[80px] justify-between py-3 px-5 text-center">
            <Image src='/save-icon.png' width={25} height={25} alt='save icon' />
            <Image src='/share-icon.png' width={25} height={25} alt='share icon' />
          </div>
        </div>
      </>
    );
  };
  
  export default ArtistListItem;
  