import Header from "@/components/header"
import RippleBackground from "@/components/ripple-background"
import ScrollingBanner from "@/components/scrolling-banner"
import WorkSection from "@/components/work-section"
import AboutSection from "@/components/about-section"
import Footer from "@/components/footer"

export default function HomePage() {
    return (
        <main className="studio-page">
            <Header />
            <RippleBackground />
            <ScrollingBanner />
            <AboutSection />
            <WorkSection />
            <Footer />
        </main>
    )
}