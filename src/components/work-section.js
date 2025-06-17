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
            image: "",
            tags: ["BRANDING", "E-COMMERCE", "SEO", "MARKETING"],
        },
        {
            title: "Autonomous Odyssey",
            image: "",
            tags: ["SEO", "DESIGN"],
        },
        {
            title: "Ballet Nights",
            image: "",
            tags: ["BRANDING", "UI/UX", "SOCIAL MEDIA"],
        },
        {
            title: "Enshrined",
            image: "",
            tags: ["Kickstarter", "BRANDING", "WEB DEVELOPMENT", "SEO"],
        },
        {
            title: "Spazio",
            image: "",
            tags: ["SEO", "MARKETING", "SOCIAL MEDIA"],
        },
        {
            title: "Lavinia",
            image: "",
            tags: ["SEO", "MARKETING", "SOCIAL MEDIA"],
        },
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

    return (
        <section id="work" className={styles.workSection}>
            <div className={styles.sectionContainer}>
                <div className={styles.sectionHeader}>
                    <div className={styles.sectionTitleRow}>

                        <div className={styles.titleWithIcon}>
                            <Eye className={styles.sectionIcon} />

                            <h2 className={styles.sectionTitle}>
                                <span className={styles.desktopTitle}>SEE SOME OF OUR WORK</span>
                                <span className={styles.mobileTitle}>OUR WORK</span>
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
                            <div key={index} className={styles.projectCard}>
                                <div className={styles.projectHeader}>
                                    <h3 className={styles.projectTitle}>{project.title}</h3>
                                </div>

                                <div className={styles.projectImage}>
                                    <img src={project.image || "/placeholder"} alt={project.title} />

                                    {/* <Image 
                                        src={project.image || "/placeholder"} 
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