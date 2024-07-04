import About from "@/components/about";
import ContactForm from "@/components/contactForm";
import Header from "@/components/header";
import Interests from "@/components/interests";

export default function Home() {
    return (
        <div className="container">
            <Header />
            <About />
            <Interests />
            <ContactForm />
        </div>
    )
}