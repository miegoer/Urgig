import SideNav from '@/app/ui/dashboard/sidenav';
import QuickStats from '@/app/ui/dashboard/quickstats';
import Notifications from '@/app/ui/dashboard/notifications';
import Messages from '@/app/ui/dashboard/messages';
import UserInfo from '@/app/ui/dashboard/userinfo';
import Upcoming from '@/app/ui/dashboard/upcoming';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gridTemplateRows: 'auto 1fr' }}>
      <SideNav />
      <div className="col-[col-start_2_/_span_10] row-[2_/_span_10] w-[300px]">
          {children}
      </div>
    </div>
  );
}

      {/* <div className="flex flex-col col-[col-start_2_/_span_8] row-[2_/_span_9] justify-center"> */}