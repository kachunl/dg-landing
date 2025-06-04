import { ArrowUpRight } from "lucide-react"
import styles from "@/styles/footer.module.css"

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerInner}>
                <div className={styles.footerContainer}>
                    <div className={styles.footerContent}>

                        <div className={styles.footerLeft}>
                            <div className={styles.footerLinks}>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
                                    LINKEDIN
                                    <ArrowUpRight className={styles.footerArrow} />
                                </a>

                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
                                    INSTAGRAM
                                    <ArrowUpRight className={styles.footerArrow} />
                                </a>

                                <a href="mailto:ezramavani@thedigigoat.com" className={styles.footerLink}>
                                    EMAIL
                                    <ArrowUpRight className={styles.footerArrow} />
                                </a>
                            </div>

                            <div className={styles.footerAcknowledgment}>
                                <p>
                                    DIGIGOAT is a wnjdkajbawfkjawnf.
                                </p>
                            </div>
                        </div>

                        <div className={styles.footerRight}>
                            <div className={styles.footerContactInfo}>
                                <div className={styles.contactItem}>
                                    <span className={styles.contactLabel}>EMAIL</span>
                                    <span className={styles.contactValue}>ezramavani@thedigigoat.com</span>
                                </div>

                                <div className={styles.contactItem}>
                                    <span className={styles.contactLabel}>PHONE</span>
                                    <span className={styles.contactValue}>+60 123-4567</span>
                                </div>
                            </div>

                            <div className={styles.footerAddress}>42 Puncak Street, Ampang, KL 43000</div>
                        </div>

                    </div>
                </div>
            </div>
        </footer>
    )
}