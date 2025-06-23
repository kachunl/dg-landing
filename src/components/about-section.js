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

                    DIGIGOAT is a <span className={styles.underlined}>results-driven</span> marketing agency specialising in strategic marketing for niche sectors such as ballet productions, field-service IT providers, indie video game studios, osteotherapists and eco-conscious products.

                    {/* <br /><br />

                    We support brands through data-driven strategies, hands off execution and impactful messaging.
                    
                    <br /><br />

                    From strategies to your screens, we combine creativity, data, and performance to turn ideas into measurable success. */}

                </div>
            </div>
        </section>
    )
}