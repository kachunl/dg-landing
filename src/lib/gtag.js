export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

// initialise GA4
export const initGA = () => {
    if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || []

        function gtag() {
            window.dataLayer.push(arguments)
        }

        window.gtag = gtag

        gtag("js", new Date())
        gtag("config", GA_MEASUREMENT_ID, {
            page_path: window.location.pathname,
        })
    }
}

// update consent settings
export const updateConsent = (settings) => {
    if (typeof window !== "undefined" && window.gtag) {
        window.gtag("consent", "update", {
            analytics_storage: settings.analytics ? "granted" : "denied",
            ad_storage: settings.marketing ? "granted" : "denied",
            functionality_storage: settings.functional ? "granted" : "denied",
        })
    }
}

// log page views
export const pageview = (url) => {
    if (typeof window !== "undefined" && window.gtag) {
            window.gtag("config", GA_MEASUREMENT_ID, {
            page_path: url,
        })
    }
}

// log custom events
export const event = ({ action, category, label, value }) => {
    if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", action, {
            event_category: category,
            event_label: label,
            value: value,
        })
    }
}