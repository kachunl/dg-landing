import Header from "@/components/header"
import RippleBackground from "@/components/ripple-background"
import WorkSection from "@/components/work-section"
import AboutSection from "@/components/about-section"
import Footer from "@/components/footer"

export default function HomePage() {
    return (
        <main className="studio-page">
            <Header />
            <RippleBackground />
            <AboutSection />
            <WorkSection />
            <Footer />
        </main>
    )
}