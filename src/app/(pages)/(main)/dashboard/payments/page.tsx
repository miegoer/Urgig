import mockUsers from "@/mockData/user"

export default function Payments () {

    return (
    <main className="flex flex-row">
    <div className="w-[28%] shadow-[0px_0px_0px_#272525] mx-[30px] my-0 mt-2 pt-2.5 pb-[20px] px-2.5 rounded-[20px] bg-[#252531]">
        <div className="flex flex-col p-3 justify-center items-center">
            <span className="block text-center text-[11px] tracking-[1px] uppercase mt-[7px] mb-[10px]">Earnings:</span>
            <div className="text-center m-3 tracking-[1px] text-xl">
                {mockUsers[0].statistics.income.toLocaleString('en-US')}
            </div>
        </div>
    </div>
    <div className="w-[35%] shadow-[0px_0px_0px_#272525] mx-[30px] my-0 mt-2 pt-2.5 pb-[20px] px-2.5 rounded-[20px] bg-[#252531]">
        <div className="flex flex-col p-3 justify-center items-center">
            <span className="block text-center text-[11px] tracking-[1px] uppercase mt-[7px] mb-[10px]">History:</span>
            <div className="text-center m-3 tracking-[1px] text-sm py-2 px-5 rounded-[20px]" style={{background: "linear-gradient(5deg, rgba(40,40,40,1) 0%, rgba(80,80,80,1) 100%)"}}>
                28/9 - Paid 1000
            </div>
        </div>
    </div>
    </main>
    )
}