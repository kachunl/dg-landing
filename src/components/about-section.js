import { Asterisk } from "lucide-react"
import styles from "@/styles/about.module.css"

export default function AboutSection() {
    return (
        <section id="about" className={styles.aboutSection}>
            <div className={styles.sectionContainer}>
                <div className={styles.sectionHeaderAbout}>

                    <div className={styles.titleWithIcon}>
                        <Asterisk className={styles.sectionIcon} />
                        
                        <h2 className={styles.sectionTitle}>WHO WE ARE</h2>
                    </div>

                </div>

                <div className={styles.aboutContent}>

                    {/* <div className={styles.aboutTextLeft}>
                        <p>
                            DIGIGOAT is a <span className={styles.underlined}>marketing</span> agency based in
                            Milan, Italy.
                        </p>
                    </div>

                    <div className={styles.aboutTextRight}>
                        <p>
                            We specialise in 
                        </p>
                    </div> */}

                    DIGIGOAT is a <span className={styles.underlined}>results-driven</span> marketing agency specialising in website development and social media management.

                    <br /><br />

                    We help brands grow by building high-impact websites and managing digital content that captures attention and drives engagement.

                    <br /><br />

                    From design to delivery, we combine strategy, creativity, and performance to turn ideas into measurable success.

                </div>
            </div>
        </section>
    )
}