import { ArrowUpRight } from "lucide-react"
import "@/styles/footer.css"

export default function Footer() {
    return (
        <footer id="footer" className="footer">
            <div className="footer-inner">
                <div className="footer-container">

                    <div className="footer-content">
                        <div className="footer-left">
                            <div className="footer-links">
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-link">
                                    LINKEDIN
                                    <ArrowUpRight className="footer-arrow" />
                                </a>

                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-link">
                                    INSTAGRAM
                                    <ArrowUpRight className="footer-arrow" />
                                </a>
                                
                                <a href="mailto:hello@digigoat.com" className="footer-link">
                                    EMAIL
                                    <ArrowUpRight className="footer-arrow" />
                                </a>
                            </div>

                            <div className="footer-acknowledgment">
                                <p>
                                    DIGIGOAT is a Milan based Marketing agency vnaofuwnfawkfjwanfa
                                </p>
                            </div>
                        </div>

                        <div className="footer-right">
                            <div className="footer-contact-info">
                                <div className="contact-item">
                                    <span className="contact-label">EMAIL</span>
                                    <span className="contact-value">ezramavani@digigoat.com</span>
                                </div>

                                <div className="contact-item">
                                    <span className="contact-label">PHONE</span>
                                    <span className="contact-value">+60 123-4567</span>
                                </div>
                            </div>
                            
                            <div className="footer-address">42 Puncak Road, Ampang, KL 56000</div>
                        </div>

                    </div>
                </div>
            </div>
        </footer>
    )
}