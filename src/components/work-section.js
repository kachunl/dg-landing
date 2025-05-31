"use client"

import { useState, useRef, useEffect } from "react"
import { Eye, ChevronLeft, ChevronRight } from "lucide-react"
import "@/styles/work-section.css"

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
        // always show 3 projects regardless of screen size
            setVisibleProjects(3)
        }

        // set initial value
        updateVisibleProjects()
    }, [])

    const maxIndex = Math.max(0, projects.length - visibleProjects)

    const goToPrevious = () => {
        setCurrentIndex((prev) => Math.max(0, prev - 1))
    }

    const goToNext = () => {
        setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
    }

    return (
        <section id="work" className="work-section-new">
            <div className="section-container-new">
                <div className="section-header">

                    <div className="section-title-row">
                        <div className="title-with-icon">
                            <Eye className="section-icon" />
                            <h2 className="section-title-new">SEE SOME OF OUR WORK</h2>
                        </div>
                    </div>

                    <div className="carousel-controls">
                        <button
                            onClick={goToPrevious}
                            disabled={currentIndex === 0}
                            className="carousel-arrow"
                            aria-label="Previous projects"
                        >
                            <ChevronLeft className="arrow-icon" />
                        </button>
                        
                        <button
                            onClick={goToNext}
                            disabled={currentIndex === maxIndex}
                            className="carousel-arrow"
                            aria-label="Next projects"
                        >
                            <ChevronRight className="arrow-icon" />
                        </button>
                    </div>
                </div>

                <div className="projects-carousel" ref={carouselRef}>
                    <div
                        className="projects-track"
                        style={{
                        transform: `translateX(calc(-${currentIndex * 100}% / ${projects.length} * ${visibleProjects}))`,
                        }}
                    >
                        {projects.map((project, index) => (
                            <div key={index} className="project-card-new">
                                <div className="project-header">
                                    <h3 className="project-title-new">{project.title}</h3>
                                </div>

                                <div className="project-image-new">
                                    <img src={project.image || "/placeholder"} alt={project.title} />
                                    
                                    <div className="project-hover-overlay">
                                        <div className="project-tags">
                                            {project.tags.map((tag, tagIndex) => (
                                                <span key={tagIndex} className="project-tag">
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