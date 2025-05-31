"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import "@/styles/header.css"

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            setIsScrolled(currentScrollY > 50)

            if (currentScrollY < 100) {
                setIsVisible(true)
            } 
            
            else if (currentScrollY > lastScrollY) {
                setIsVisible(false)
            } 
            
            else {
                setIsVisible(true)
            }

            setLastScrollY(currentScrollY)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [lastScrollY])

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId)
        
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <header className={`header ${isScrolled ? "scrolled" : ""} ${isVisible ? "visible" : "hidden"}`}>
            <div className="header-container">
                <div className="header-logo">
                    <Image 
                        src="/digigoat-logo-2.png" 
                        alt="DIGIGOAT" 
                        className="header-logo-image"
                        width={160}
                        height={36}
                    />
                </div>
                
                <nav className="header-nav">
                    <button onClick={() => scrollToSection("about")} className="header-nav-link">
                        Who We Are
                    </button>

                    <button onClick={() => scrollToSection("work")} className="header-nav-link">
                        What We Do
                    </button>

                    <button onClick={() => scrollToSection("footer")} className="header-nav-link">
                        Let's Chat
                    </button>
                </nav>

            </div>
        </header>
    )
}