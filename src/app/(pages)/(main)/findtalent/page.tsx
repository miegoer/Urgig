"use client";

import TalentSearch from "@/app/(components)/ui/findtalent/search";
import ArtistListItem from "@/app/(components)/ui/findtalent/artistListItem";
import { useEffect, useState } from "react";
import { User } from "@/types/user";

export default function FindTalent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [artists, setArtists] = useState<User[]>([]);
  const [filteredSearch, setFilteredSearch] = useState<User[]>([]);
  

  useEffect(() => {
    const fetchData = async (): Promise<Event[] | void> => {
      fetch("/api/users/artists")
        .then((res) => res.json())
        .then((res) => {
          setArtists(res);
        })
        .catch((error) => console.log(error));
    };
    fetchData();
  }, []);



  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gridTemplateRows: "auto 1fr",
      }}
    >
      <div
        style={{ gridColumn: "1 / span 2" }}
        className="w-[270px] mx-[30px] relative"
      >
        <div className="z-20 absolute w-full">
          <TalentSearch
            artists={artists}
            setFilteredSearch={setFilteredSearch}
          />
        </div>
      </div>

      <div
        style={{ gridColumn: "3 / span 8", gridRow: "2 / span 5 " }}
        className={`h-[600px] mt-[10px] overflow-y-auto w-[700px]
                    [&::-webkit-scrollbar]:w-0
                    [&::-webkit-scrollbar-track]:rounded-full
                    [&::-webkit-scrollbar-track]:bg-black-100
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-thumb]:bg-[#332960]
                    dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                    dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500`}
      >
        {filteredSearch.length === 0 ? (
          <>
            {artists.map((artist) => (
              <ArtistListItem key={artist._id} artist={artist} />
            ))}
          </>
        ) : (
          <>
            {filteredSearch.map((artist) => (
              <ArtistListItem key={artist._id} artist={artist} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
