import { ArrowUpRight } from "lucide-react"
import styles from "@/styles/footer.module.css"

export default function Footer() {
    return (
        <footer id="footer" className={styles.footer}>
            <div className={styles.footerInner}>
                <div className={styles.footerContainer}>
                    <div className={styles.footerContent}>

                        <div className={styles.footerLeft}>                        
                            <div className={styles.footerInfo}>
                                <p className={styles.footerCopyright}>
                                    © 2025 DIGIGOAT SYSTEMS SDN BHD
                                </p>
                                
                                <p className={styles.footerServices}>
                                    Web Dev • Social Media • Brand Strategy
                                </p>
                                
                                <div className={styles.footerContactInfo}>
                                    <a href="mailto:ezra@thedigigoat.com" className={styles.footerContactLink}>
                                        ezra@thedigigoat.com
                                    </a>

                                    <span className={styles.footerSeparator}> | </span>
                                    
                                    <a href="tel:+60195703310" className={styles.footerContactLink}>
                                        +60 19570 3310
                                    </a>
                                </div>

                            </div>
                        </div>

                        <div className={styles.footerRight}>
                            <img src="/digigoat-footer-2.png" alt="DIGIGOAT Logo" className={styles.footerLogo} />

                            <div className={styles.footerAddress}>32, Jalan Puncak Setiawangsa 3, Taman Setiawangsa, 54200 Kuala Lumpur, Malaysia</div>
                        </div>

                    </div>
                </div>
            </div>
        </footer>
    )
}