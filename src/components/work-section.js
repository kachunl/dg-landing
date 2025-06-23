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
            title: "G-Natural",
            image: "/projects/gnatural.png",
            tags: ["BRAND STRATEGY", "E-COMMERCE DEVELOPMENT", "SEO", "UI & UX DESIGN"],
            link: "https://www.g-natural.com"
        },
        {
            title: "Enshrined",
            image: "/projects/enshrined.png",
            tags: ["DIGITAL MARKETING", "SEO", "UI & UX DESIGN", "CONTENT CREATION", "SOCIAL MEDIA MANAGEMENT"],
            link: "https://www.enshrined.ca"
        },
        {
            title: "Global IT Star",
            image: "/projects/globalitstar.png",
            tags: ["DIGITAL MARKETING", "SEO", "UI & UX DESIGN"],
            link: "https://www.globalitstar.com/"
        },
        {
            title: "Ballet Nights",
            image: "/projects/bn.png",
            tags: ["WEBSITE DEVELOPMENT", "UI & UX DESIGN", "BACKEND AUTOMATIONS", "CONTENT CREATION", "ANALYTICS & REPORTING"],
            link: "https://www.balletnights.com/"
        },
        {
            title: "Fundamentally Dance",
            image: "/projects/fd.png",
            tags: ["WEBSITE DEVELOPMENT", "BACKEND AUTOMATIONS", "ANALYTICS & REPORTING"],
            link: "https://www.fundamentallydance.com/"
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

    const maxIndex = Math.max(0, projects.length - visibleProjects)

    const goToPrevious = () => {
        setCurrentIndex((prev) => Math.max(0, prev - 1))
    }

    const goToNext = () => {
        setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
    }

    const handleProjectClick = (link) => {
        if (link) {
            window.open(link, "_blank", "noopener,noreferrer")
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
                        transform: `translateX(calc(-${currentIndex * 100}% / ${projects.length} * ${visibleProjects}))`,
                        }}
                    >
                        {projects.map((project, index) => (
                            // <div key={index} className={styles.projectCard}>
                            <div 
                                key={index} 
                                className={styles.projectCard}
                                onClick={() => handleProjectClick(project.link)}
                                style={{ cursor: project.link ? "pointer" : "default" }}
                                role={project.link ? "button" : undefined}
                                tabIndex={project.link ? 0 : undefined}
                                onKeyDown={(e) => {
                                    if (project.link && (e.key === "Enter" || e.key === " ")) {
                                        e.preventDefault()
                                        handleProjectClick(project.link)
                                    }
                                }}
                                aria-label={project.link ? `View ${project.title} project` : undefined}
                            >    
                                
                                <div className={styles.projectHeader}>
                                    <h3 className={styles.projectTitle}>{project.title}</h3>
                                </div>

                                <div className={styles.projectImage}>
                                    <img src={project.image || "/placeholder.png"} alt={project.title} />

                                    {/* <Image 
                                        src={project.image || `${basePath}/placeholder.png`} 
                                        alt={project.title}
                                        width={400}
                                        height={300}
                                        className={styles.projectImageElement}
                                    /> */}

                                    <div className={styles.projectHoverOverlay}>
                                        <div className={styles.projectTags}>
                                            {project.tags.map((tag, tagIndex) => (
                                                <span key={tagIndex} className={styles.projectTag}>
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}