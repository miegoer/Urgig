
// Double-check format of date and create map for fetched bookings data.

export default function Upcoming () {
    return (
        <div className="w-[320px] shadow-[0px_0px_0px_#272525] mt-5 rounded-[20px] p-5 bg-[#252531]">
            <span className="block text-[11px] tracking-[1px] uppercase ml-2.5 mr-0 mt-[3px] mb-[18px]">Upcoming Events</span>
            <div className="flex flex-row text-[black] mb-[25px] px-5 py-2.5 rounded-[10px] shadow-[0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)]" style={{background: 'linear-gradient(11deg, rgba(255, 103, 43, 1) 0%, rgba(251, 173, 16, 1) 100%)'}}>
                <span className="text-xl w-[26%] mr-6 border-r-[black] border-r border-solid"><span className="text-[35px]">15 </span>OCT</span>
                <div className="flex flex-col text-center w-3/5">
                    <span className="uppercase mx-0 my-1.5">Meowler's Bar</span>
                    <span className="text-sm italic">18:30</span>
                </div>
            </div>
        </div>
    )
}