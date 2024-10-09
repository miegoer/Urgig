import Nav from "@/app/(components)/ui/nav";

export default function Layout ({ children }: { children: React.ReactNode }) {

    return (
        <>
        <Nav />
        {children}
        </>
    )
}