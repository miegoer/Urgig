import NavBarP from "../../ui/navBarP";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBarP/>
      {children}
    </>
  );
}
