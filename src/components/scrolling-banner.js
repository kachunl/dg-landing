"use client"

import styles from "@/styles/scrolling-banner.module.css"

export default function ScrollingBanner() {
    const services = [
        "Conversion Optimisation",
        "E-Commerce Development",
        "UI & UX Design",
        "Brand Strategy",
        "Digital Marketing",
        "Search Engine Optimisation",
        "Social Media Management",
        "Content Creation",
        "Analytics & Reporting",
        "Website Development",
        "Backend Automations"
    ]

    return (
        <div className={styles.scrollingBanner}>
            <div className={styles.scrollingContent}>
                
                {/* first set of items */}
                {services.map((service, index) => (
                    <span key={`first-${index}`} className={styles.scrollingItem}>
                        {service}
                    </span>
                ))}
                
                {/* duplicate for loop */}
                {services.map((service, index) => (
                    <span key={`second-${index}`} className={styles.scrollingItem}>
                        {service}
                    </span>
                ))}

            </div>
        </div>
    )
}