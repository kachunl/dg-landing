"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import styles from "@/styles/cookie-banner.module.css"
import CookieSettingsModal from "./cookie-settings-modal"
import { updateConsent } from "@/lib/gtag"

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false)
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)

    useEffect(() => {
        const cookieConsent = localStorage.getItem("cookieConsent")

        if (!cookieConsent) {
            const timer = setTimeout(() => {
                setIsVisible(true)
            }, 2000)
            
            return () => clearTimeout(timer)
        }
        
        else {
            const savedSettings = localStorage.getItem("cookieSettings")
            
            if (savedSettings) {
                const settings = JSON.parse(savedSettings)
                updateConsent(settings)
            }
        }
    }, [])

    const handleAccept = () => {
        const allAccepted = {
            essential: true,
            marketing: true,
            functional: true,
            analytics: true,
        }

        localStorage.setItem("cookieConsent", "accepted")
        localStorage.setItem("cookieSettings", JSON.stringify(allAccepted))
        
        updateConsent(allAccepted)
        
        setIsVisible(false)
    }

    const handleDecline = () => {
        const onlyEssential = {
            essential: true,
            marketing: false,
            functional: false,
            analytics: false,
        }

        localStorage.setItem("cookieConsent", "declined")
        localStorage.setItem("cookieSettings", JSON.stringify(onlyEssential))
        
        updateConsent(onlyEssential)
        
        setIsVisible(false)
    }

    const handleSettings = () => {
        setIsSettingsOpen(true)
    }

    const handleSettingsSave = (settings) => {
        localStorage.setItem("cookieConsent", "custom")
        localStorage.setItem("cookieSettings", JSON.stringify(settings))
        
        updateConsent(settings)
        
        setIsVisible(false)
    }

    const handleClose = () => {
        setIsVisible(false)
    }

    if (!isVisible) return null

    return (
        <>
            <div className={styles.cookieBanner}>
                <div className={styles.cookieContent}>
                    <div className={styles.cookieText}>
                        <p>
                            We use cookies on our website to see how you interact with it. By accepting, you agree to our use of such
                            cookies.{" "}

                            <a href="/privacy-policy" className={styles.privacyLink}>
                                Privacy Policy
                            </a>
                        </p>
                    </div>

                    <div className={styles.cookieActions}>
                        <button onClick={handleSettings} className={styles.settingsBtn}>
                            Settings
                        </button>

                        <button onClick={handleDecline} className={styles.declineBtn}>
                            Decline All
                        </button>

                        <button onClick={handleAccept} className={styles.acceptBtn}>
                            Accept
                        </button>

                        <button onClick={handleClose} className={styles.closeBtn} aria-label="Close banner">
                            <X className={styles.closeIcon} />
                        </button>
                    </div>
                </div>
            </div>

            <CookieSettingsModal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                onSave={handleSettingsSave}
            />
        </>
    )
}