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

                    <div className={styles.aboutTextLeft}>
                        <p>
                            DIGIGOAT is a <span className={styles.underlined}>marketing</span> agency based in
                            Milan, Italy.
                        </p>
                    </div>

                    <div className={styles.aboutTextRight}>
                        <p>
                            We specialise in 
                        </p>
                    </div>

                </div>
            </div>
        </section>
    )
}