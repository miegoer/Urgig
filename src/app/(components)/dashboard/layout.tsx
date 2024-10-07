import SideNav from '@/app/ui/dashboard/sidenav';
import QuickStats from '@/app/ui/dashboard/quickstats';
import Notifications from '@/app/ui/dashboard/notifications';
import Messages from '@/app/ui/dashboard/messages';
import './layout.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gridTemplateRows: 'auto' }}>
      <SideNav />
      <div id="dashboard-top-content">
        <QuickStats/>
      </div>
      <div id="dashboard-bottom-content">
        <Notifications/>
        <Messages/>
      </div>
    </div>
  );
}

      {/* <div className="flex flex-col col-[col-start_2_/_span_8] row-[2_/_span_9] justify-center"> */}