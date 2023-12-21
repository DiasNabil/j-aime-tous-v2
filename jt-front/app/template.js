
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

export default function template({children}){
    return (
        <>
        <Nav/>
            {children}
        <Footer/>
        </>
    )
}