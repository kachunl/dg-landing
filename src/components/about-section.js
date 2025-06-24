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

                    {/* DIGIGOAT is a <span className={styles.underlined}>results-driven</span> marketing agency specialising in strategic marketing for niche sectors such as ballet productions, field-service IT providers, indie video game studios, osteotherapists and eco-conscious products. */}
                    <p>Digigoat is a marketing agency built for challenge.</p>

                    We specialise in navigating volatile, creative markets, transforming uncertainty into opportunity. From music and video games to dance and even luxury tobacco, we take market friction and turn it into clear, confident decisions. We blend hands-on experience with industry standard tools to deliver results that resonate across sectors.

                    <br /><br />

                    We were born out of the creative sector, so we know that sometimes the rules don’t apply, or just don’t work for your product. We’re a small company, and we plan to keep it that way. We only want to work on exciting products, with hilarious, curious people who want to make something that sticks. 

                    {/* <br /><br />

                    We support brands through data-driven strategies, hands off execution and impactful messaging.
                    
                    <br /><br />

                    From strategies to your screens, we combine creativity, data, and performance to turn ideas into measurable success. */}

                </div>
            </div>
        </section>
    )
}