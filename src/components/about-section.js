import { Asterisk } from "lucide-react"
import "@/styles/about-section.css"

export default function AboutSection() {
    return (
        <section id="about" className="about-section-new">
            <div className="section-container-new">
                <div className="section-header">
                    <div className="title-with-icon">
                        <Asterisk className="section-icon" />

                        <h2 className="section-title-new">WHO WE ARE</h2>
                    </div>
                </div>

                <div className="about-content-new">
                    <div className="about-text-left">
                        <p>
                            DIGIGOAT, Marketing agency based in
                            Milan, Italy.
                        </p>
                    </div>

                    <div className="about-text-right">
                        <p>
                            We specialise in wordpress bla bla bla bla bla bla bla
                        </p>
                    </div>

                </div>
            </div>
        </section>
    )
}