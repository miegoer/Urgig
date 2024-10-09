import SideNav from '@/app/(components)/ui/dashboard/sidenav';
import QuickStats from '@/app/(components)/ui/dashboard/quickstats';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[repeat(12,[col-start]_1fr)]">
      <div className="col-[col-start_1_/_span_1] row-[2_/_span_9]">
        <SideNav />
      </div>
      <div className="col-[col-start_2_/_span_9] row-[2_/_span_9]">
          {children}
      </div>
    </div>
  );
}

      {/* <div className="flex flex-col col-[col-start_2_/_span_8] row-[2_/_span_9] justify-center"> */}