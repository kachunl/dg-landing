"use client"

import { useState } from "react"
import { ArrowUpRight, MessageCircle } from "lucide-react"
import styles from "@/styles/contact.module.css"

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                setSubmitStatus({
                    type: "success",
                    message: "Message sent successfully! I\'ll get back to you soon."
                });

                // reset form
                setFormData({
                    name: "",
                    email: "",
                    subject: "",
                    message: ""
                });
            } 
            
            else {
                setSubmitStatus({
                    type: "error",
                    message: result.error || "Something went wrong. Please try again."
                });
            }
        } 
        
        catch (error) {
            setSubmitStatus({
                type: "error",
                message: "Network error. Please check your connection and try again."
            });
        } 
        
        finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className={styles.contactSection}>
            <div className={styles.sectionContainer}>
                <div className={styles.sectionHeader}>
                    <div className={styles.titleWithIcon}>
                        <MessageCircle className={styles.sectionIcon} />

                        <h2 className={styles.sectionTitle}>GET IN TOUCH</h2>
                    </div>
                </div>

                <div className={styles.contactContent}>
                    <div className={styles.contactInfo}>
                        <p className={styles.contactDescription}>
                            Got an idea? Why wait.
                        </p>

                        <div className={styles.contactDetails}>
                            <a href="mailto:ezra@thedigigoat.com" className={styles.contactLink}>
                                ezra@thedigigoat.com
                            </a>
                            <a href="tel:+60 19570 3310" className={styles.contactLink}>
                                +60 19570 3310
                            </a>
                        </div>
                    </div>

                    <form className={styles.contactForm} onSubmit={handleSubmit}>
                        {submitStatus && (
                            <div className={`${styles.statusMessage} ${
                                submitStatus.type === "success" ? styles.successMessage : styles.errorMessage
                            }`}>
                                {submitStatus.message}
                            </div>
                        )}
                        
                        <div className={styles.formRow}>
                            <input 
                                type="text" 
                                name="name"
                                placeholder="Your Name" 
                                className={styles.formInput}
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                disabled={isSubmitting}
                            />
                            <input 
                                type="email" 
                                name="email"
                                placeholder="Your Email" 
                                className={styles.formInput}
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                disabled={isSubmitting}
                            />
                        </div>

                        <input 
                            type="text" 
                            name="subject"
                            placeholder="Subject" 
                            className={styles.formInput}
                            value={formData.subject}
                            onChange={handleInputChange}
                            required
                            disabled={isSubmitting}
                        />

                        <textarea 
                            name="message"
                            placeholder="Tell us about your project" 
                            className={styles.formTextarea}
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            disabled={isSubmitting}
                        ></textarea>
                       
                        <button 
                            type="submit" 
                            className={styles.formSubmit}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                            <ArrowUpRight className={styles.btnArrow} />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}