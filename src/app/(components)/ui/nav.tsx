import MainNavLinks from './navlinks';

export default function Nav() {
  return (
    <div className="bg-[#20202a] col-start-1 col-end-[-1] row-[1] flex flex-row items-center p-[6px_55px] m-[13px_0_16px_-20px] h-[50px] grow justify-around">
        <MainNavLinks/>
    </div>
  );
}