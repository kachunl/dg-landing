import { ArrowUpRight, Eye } from "lucide-react"
import "@/styles/work-section.css"

export default function WorkSection() {
    const projects = [
        {
            title: "G-NATURAL",
            image: "/placeholder",
            category: "Pet Store",
        },
        {
            title: "AO",
            image: "/placeholder",
            category: "Kickstarter",
        },
        {
            title: "Enshrined",
            image: "/placeholder",
            category: "Kickstarter",
        },
    ]

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

                    <button className="see-all-btn">
                        SEE ALL WORK
                        <ArrowUpRight className="btn-arrow" />
                    </button>

                </div>

                <div className="projects-grid-new">
                    {projects.map((project, index) => (
                        <div key={index} className="project-card-new">
                            <div className="project-header">
                                <h3 className="project-title-new">{project.title}</h3>
                            </div>

                            <div className="project-image-new">
                                <img src={project.image || "/placeholder"} alt={project.title} />
                                
                                <div className="project-overlay">
                                    <ArrowUpRight className="project-arrow" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}