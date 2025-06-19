"use client"

import { useState } from "react"
import { X } from "lucide-react"
import styles from "@/styles/cookie-settings-modal.module.css"

export default function CookieSettingsModal({ isOpen, onClose, onSave }) {
    const [settings, setSettings] = useState({
        essential: true,
        marketing: false,
        functional: false,
        analytics: false,
    })

    const handleToggle = (type) => {
        if (type === "essential") return

        setSettings((prev) => ({
            ...prev,
            [type]: !prev[type],
        }))
    }

    const handleSave = () => {
        onSave(settings)
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>Advanced Cookie Settings</h2>

                    <button onClick={onClose} className={styles.closeButton} aria-label="Close modal">
                        <X className={styles.closeIcon} />
                    </button>
                </div>

                <div className={styles.modalBody}>
                    <div className={styles.cookieSection}>
                        <div className={styles.cookieHeader}>
                            <h3 className={styles.cookieTitle}>Essential Cookies</h3>

                            <div className={`${styles.toggle} ${styles.toggleDisabled}`}>
                                <div className={`${styles.toggleSlider} ${settings.essential ? styles.toggleActive : ""}`}></div>
                            </div>
                        </div>

                        <p className={styles.cookieDescription}>
                            These cookies enable core functionality such as security, verification of identity and network management.
                            These cookies can't be disabled.
                        </p>
                    </div>

                    <div className={styles.cookieSection}>
                        <div className={styles.cookieHeader}>
                            <h3 className={styles.cookieTitle}>Enable Marketing Cookies</h3>

                            <div
                                className={`${styles.toggle} ${settings.marketing ? styles.toggleActive : ""}`}
                                onClick={() => handleToggle("marketing")}
                            >
                                <div className={styles.toggleSlider}></div>
                            </div>
                        </div>

                        <p className={styles.cookieDescription}>
                            These cookies are used to track advertising effectiveness to provide a more relevant service and deliver
                            better ads to suit your interests.
                        </p>
                    </div>

                    <div className={styles.cookieSection}>
                        <div className={styles.cookieHeader}>
                            <h3 className={styles.cookieTitle}>Enable Functional Cookies</h3>

                            <div
                                className={`${styles.toggle} ${settings.functional ? styles.toggleActive : ""}`}
                                onClick={() => handleToggle("functional")}
                            >
                                <div className={styles.toggleSlider}></div>
                            </div>
                        </div>

                        <p className={styles.cookieDescription}>
                            These cookies collect data to remember choices users make to improve and give a more personalised
                            experience.
                        </p>
                    </div>

                    <div className={styles.cookieSection}>
                        <div className={styles.cookieHeader}>
                            <h3 className={styles.cookieTitle}>Enable Analytics Cookies</h3>
                            
                            <div
                                className={`${styles.toggle} ${settings.analytics ? styles.toggleActive : ""}`}
                                onClick={() => handleToggle("analytics")}
                            >
                                <div className={styles.toggleSlider}></div>
                            </div>
                        </div>

                        <p className={styles.cookieDescription}>
                            These cookies help us to understand how visitors interact with our website, discover errors and provide a
                            better overall analytics.
                        </p>
                    </div>
                </div>

                <div className={styles.modalFooter}>
                    <button onClick={handleSave} className={styles.saveButton}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}