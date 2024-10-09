import SideNav from '@/app/(components)/ui/dashboard/sidenav';
import QuickStats from '@/app/(components)/ui/dashboard/quickstats';
import Notifications from '@/app/(components)/ui/dashboard/notifications';
import Messages from '@/app/(components)/ui/dashboard/messages';
import UserInfo from '@/app/(components)/ui/dashboard/userinfo';
import Upcoming from '@/app/(components)/ui/dashboard/upcoming';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gridTemplateRows: 'auto 1fr' }}>
      <SideNav />
      <div className="col-[col-start_2_/_span_10] row-[2_/_span_10]">
          {children}
      </div>
    </div>
  );
}

      {/* <div className="flex flex-col col-[col-start_2_/_span_8] row-[2_/_span_9] justify-center"> */}