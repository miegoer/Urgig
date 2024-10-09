import Nav from "@/app/ui/nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
    <div className="grid grid-cols-12">
      <Nav/>
      <div className="col-[col-start_1_/_span_12] row-[2_/_span_8] pb-[35px]">
        {children}
      </div>
    </div>
  );
}
