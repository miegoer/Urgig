import NavBarA from "../../ui/navBarA";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBarA/>
      {children}
    </>
  );
}
