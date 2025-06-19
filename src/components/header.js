"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import styles from "@/styles/header.module.css"

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            setIsScrolled(currentScrollY > 50)

            if (currentScrollY < 100) {
                setIsVisible(true)
            } 
            
            else if (currentScrollY > lastScrollY) {
                setIsVisible(false)
                setIsMobileMenuOpen(false)
            } 
            
            else {
                setIsVisible(true)
            }

            setLastScrollY(currentScrollY)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [lastScrollY])

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden"
        } 
        
        else {
            document.body.style.overflow = ""
        }

        return () => {
            document.body.style.overflow = ""
        }
    }, [isMobileMenuOpen])

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId)
        
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }

        setIsMobileMenuOpen(false)
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    return (
        <header
            className={`${styles.header} ${isScrolled ? styles.scrolled : ""} ${isVisible ? styles.visible : styles.hidden}`}
        >
            <div className={styles.headerContainer}>
                <div className={styles.logo}>
                    <img src="/digigoat-logo-rounded.png" alt="DIGIGOAT" className={styles.logoImage} />
                    {/* <Image src="/digigoat-logo-2.png" alt="DIGIGOAT" className={styles.logoImage} width={200} height={50} /> */}
                </div>

                <nav className={`${styles.nav} ${styles.desktopNav}`}>
                    <button onClick={() => scrollToSection("about")} className={styles.navLink}>
                        Who We Are
                    </button>

                    <button onClick={() => scrollToSection("work")} className={styles.navLink}>
                        What We Do
                    </button>

                    <button onClick={() => scrollToSection("contact")} className={styles.navLink}>
                        {"Let's Chat"}
                    </button>
                </nav>

                <button className={styles.mobileMenuButton} onClick={toggleMobileMenu} aria-label="Toggle menu">
                    {isMobileMenuOpen ? <X className={styles.menuIcon} /> : <Menu className={styles.menuIcon} />}
                </button>

                <nav className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.open : ""}`}>
                    <button onClick={() => scrollToSection("about")} className={styles.mobileNavLink}>
                        Who We Are
                    </button>

                    <button onClick={() => scrollToSection("work")} className={styles.mobileNavLink}>
                        What We Do
                    </button>

                    <button onClick={() => scrollToSection("contact")} className={styles.mobileNavLink}>
                        {"Let's Chat"}
                    </button>
                </nav>

            </div>
        </header>
    )
}