import MainNavLinks from './navlinks';

export default function Nav() {
  return (
    <div className="bg-[#292346] col-start-1 col-end-[-1] row-[1] flex flex-row items-center p-[6px_55px] m-[13px_0_16px_-20px] shadow-[0px_3px_8px_#191922] h-[50px] grow justify-around">
        <MainNavLinks/>
    </div>
  );
}