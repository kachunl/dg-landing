import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script"
import "@/styles/global.css";
import CookieBanner from "@/components/cookie-banner";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "DIGIGOAT",
    description: `Marketing Agency DIGIGOAT is a results-driven marketing agency specialising in website development and social media management.

                  We help brands grow by building high-impact websites and managing digital content that captures attention and drives engagement.

                  From design to delivery, we combine strategy, creativity, and performance to turn ideas into measurable success.`
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <Script
                  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
                  strategy="afterInteractive"
                />
                
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      window.gtag = gtag;
                      gtag('js', new Date());
                      
                      gtag('consent', 'default', {
                        analytics_storage: 'denied',
                        ad_storage: 'denied',
                        functionality_storage: 'denied',
                        wait_for_update: 500,
                      });
                      
                      gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
                    `}
                </Script>
            </head>
                <body className={`${geistSans.variable} ${geistMono.variable}`}>
                    {children}
                    <CookieBanner />
                </body>
        </html>
    );
}