import { User } from "@/types/user";
import { Ubuntu } from "next/font/google";
import React from "react";

const ubuntu = Ubuntu({
  weight: "400",
  subsets: ["latin"],
});
//
interface Props {
  pageOwnerUser: User;
}
//
export default function SecondCol({ pageOwnerUser }: Props) {
  return (
    <>
      <div
        id="about"
        className={`z-10 relative w-[100%] mt-1 p-8 rounded-[2px] text-center tracking-[1.5px] text-[white] text-sm`}
      >
        <span className="inline-flex text-[11px] tracking-[1px] uppercase mr-0 mt-[1px] px-4 mb-[18px] rounded-[3px] text-[black] bg-[white]">
          About
        </span>
        {pageOwnerUser?.profileDetails?.aboutMe && (
          <span className="block rounded-[10px]">{pageOwnerUser.profileDetails.aboutMe}</span>
        )}
      </div>
      <div className="ml-[90px] text-center border-t-[white] border-t w-[300px]"></div>
      <div
        id="details"
        className={`z-10 w-[100%] mt-1 p-8 rounded-[2px] text-center tracking-[1.5px] text-[white] text-sm`}
      >
        <span className="inline-flex text-[11px] tracking-[1px] uppercase px-4 mr-0 mb-[18px] rounded-[3px] text-[black] bg-[white]">
          Details
        </span>
        <table className={`${ubuntu.className} m-auto`}>
          <tbody>
            <tr>
              <td>Members</td>
              <td>1</td>
            </tr>
            <tr>
              <td>Unplugged</td>
              <td>No</td>
            </tr>
            <tr>
              <td>Covers</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>Originals</td>
              <td>Yes</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="ml-[90px] text-center border-t-[white] border-t w-[300px]"></div>
      <div
        id="genres"
        className={`z-10 w-[90%] mt-1 p-8 ml-6 rounded-[2px] text-center tracking-[1.5px] text-[white] text-sm`}
      >
        <span className="inline-flex text-[11px] tracking-[1px] uppercase mr-0 mt-[1px] px-4 mb-[16px] rounded-[3px] text-[black] bg-[white]">
          Genres
        </span>
        <div>
          {pageOwnerUser?.profileDetails?.genre &&
            pageOwnerUser.profileDetails.genre.map((tag) => (
              <span className="inline-flex m-1.5 py-2 px-4 rounded-[30px] bg-[black]" key={tag}>
                {tag}
              </span>
            ))}
        </div>
      </div>
    </>
  );
}
