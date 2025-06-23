"use client"

import { useState, useRef, useEffect } from "react"
import { Eye, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import styles from "@/styles/work.module.css"

export default function WorkSection() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [visibleProjects, setVisibleProjects] = useState(3)
    const carouselRef = useRef(null)

    const projects = [
        {
            title: "Ballet Nights",
            image: "/projects/bn.png",
            tags: ["WEBSITE DEVELOPMENT", "UI & UX DESIGN", "BACKEND AUTOMATIONS", "CONTENT CREATION", "ANALYTICS & REPORTING"],
            link: "https://www.balletnights.com/"
        },
        {
            title: "Enshrined",
            image: "/projects/enshrined.png",
            tags: ["DIGITAL MARKETING", "SEO", "UI & UX DESIGN", "CONTENT CREATION", "SOCIAL MEDIA MANAGEMENT"],
            link: "https://www.enshrined.ca"
        },
        {
            title: "G-Natural",
            image: "/projects/gnatural.png",
            tags: ["BRAND STRATEGY", "E-COMMERCE DEVELOPMENT", "SEO", "UI & UX DESIGN"],
            link: "https://www.g-natural.com"
        },
        {
            title: "Fundamentally Dance",
            image: "/projects/fd.png",
            tags: ["WEBSITE DEVELOPMENT", "BACKEND AUTOMATIONS", "ANALYTICS & REPORTING"],
            link: "https://www.fundamentallydance.com/"
        },
        {
            title: "Sunoracle Games",
            image: "/projects/sog.png",
            tags: [],
            link: "https://www.sunoraclegames.com/"
        },
        {
            title: "The Other Collection",
            image: "/projects/toc.png",
            tags: [],
            link: "https://www.theothercollections.com/"
        }
    ]

    // update visible projects count based on screen size
    useEffect(() => {
        const updateVisibleProjects = () => {
            if (window.innerWidth <= 768) {
                setVisibleProjects(1)
            } 
            else {
                setVisibleProjects(3)
            }
        }

        // set initial value
        updateVisibleProjects()

        // add resize listener
        window.addEventListener("resize", updateVisibleProjects)
        return () => window.removeEventListener("resize", updateVisibleProjects)
    }, [])

    // reset currentIndex when visibleProjects changes to prevent overflow
    useEffect(() => {
        const maxIndex = Math.max(0, projects.length - visibleProjects)

        if (currentIndex > maxIndex) {
            setCurrentIndex(maxIndex)
        }
    }, [visibleProjects, currentIndex, projects.length])

    const maxIndex = Math.max(0, projects.length - visibleProjects)

    const goToPrevious = () => {
        setCurrentIndex((prev) => Math.max(0, prev - 1))
    }

    const goToNext = () => {
        setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
    }

    const handleProjectClick = (e, link) => {
        e.stopPropagation()

        if (link) {
            window.open(link, "_blank", "noopener,noreferrer")
        }
    }

    // calculate transform based on screen size
    const getTransform = () => {
        if (visibleProjects === 1) {
            return `translateX(-${currentIndex * 100}%)`
        }
        
        else {
            return `translateX(calc(-${currentIndex * 100}% / ${projects.length} * ${visibleProjects}))`
        }
    }

    return (
        <section id="work" className={styles.workSection}>
            <div className={styles.sectionContainer}>
                <div className={styles.sectionHeader}>
                    <div className={styles.sectionTitleRow}>

                        <div className={styles.titleWithIcon}>
                            <Eye className={styles.sectionIcon} />

                            <h2 className={styles.sectionTitle}>
                                <span className={styles.desktopTitle}>OUR PORTFOLIO</span>
                                <span className={styles.mobileTitle}>OUR PORTFOLIO</span>
                            </h2>
                        </div>

                    </div>

                    <div className={styles.carouselControls}>
                        <button
                            onClick={goToPrevious}
                            disabled={currentIndex === 0}
                            className={styles.carouselArrow}
                            aria-label="Previous projects"
                        >
                            <ChevronLeft className={styles.arrowIcon} />
                        </button>

                        <button
                            onClick={goToNext}
                            disabled={currentIndex === maxIndex}
                            className={styles.carouselArrow}
                            aria-label="Next projects"
                        >
                            <ChevronRight className={styles.arrowIcon} />
                        </button>
                        
                    </div>
                </div>

                <div className={styles.projectsCarousel} ref={carouselRef}>
                    <div
                        className={styles.projectsTrack}
                        style={{
                            transform: getTransform(),
                        }}
                    >
                        {projects.map((project, index) => (
                            <div key={index} className={styles.projectCard}> 
                                
                                <div 
                                    className={styles.projectImage}
                                    onClick={(e) => handleProjectClick(e, project.link)}
                                    style={{ cursor: project.link ? "pointer" : "default" }}
                                    role={project.link ? "button" : undefined}
                                    tabIndex={project.link ? 0 : undefined}
                                    onKeyDown={(e) => {
                                        if (project.link && (e.key === "Enter" || e.key === " ")) {
                                            e.preventDefault()
                                            handleProjectClick(e, project.link)
                                        }
                                    }}
                                    aria-label={project.link ? `View ${project.title} project` : undefined}
                                >                                       
                                    <img src={project.image || "/placeholder.png"} alt={project.title} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}