import Nav from "@/app/ui/nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
    <div className="grid grid-cols-12">
      <Nav />
      </div >
      <div className="col-start-1 col-span-12] row-start-2 row-span-8 pb-[35px]">
        {children}
      </div>
    </div>
  );
}
