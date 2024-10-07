import MainNav from "@/app/ui/mainnav";
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
  <>
  <MainNav/>
  <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        Test
    </div>
  </>
  );
}