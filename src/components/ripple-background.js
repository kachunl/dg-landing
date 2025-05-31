"use client"

import { useEffect, useRef } from "react"

export default function RippleBackground() {
    const containerRef = useRef(null)

    useEffect(() => {
        if (!containerRef.current) return

        const canvas = document.createElement("canvas")
        const image = new Image()
        
        let pushEffects = []
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        const handleMouseMove = (e) => {
            pushEffects.push({
                x: e.clientX,
                y: e.clientY,
                strength: 1.5,
                radius: 120,
            })

            if (pushEffects.length > 8) {
                pushEffects.shift()
            }
        }

        const drawDistortedImage = () => {
            const ctx = canvas.getContext("2d")
            if (!ctx) return

            ctx.clearRect(0, 0, canvas.width, canvas.height)

            const imageData = ctx.createImageData(canvas.width, canvas.height)
            const data = imageData.data

            const scaleX = canvas.width / image.naturalWidth
            const scaleY = canvas.height / image.naturalHeight
            const scale = Math.max(scaleX, scaleY)

            const scaledWidth = image.naturalWidth * scale
            const scaledHeight = image.naturalHeight * scale
            const offsetX = (canvas.width - scaledWidth) / 2
            const offsetY = (canvas.height - scaledHeight) / 2

            const tempCanvas = document.createElement("canvas")
            tempCanvas.width = canvas.width
            tempCanvas.height = canvas.height
            const tempCtx = tempCanvas.getContext("2d")
            if (!tempCtx) return

            tempCtx.drawImage(image, offsetX, offsetY, scaledWidth, scaledHeight)
            const sourceImageData = tempCtx.getImageData(0, 0, canvas.width, canvas.height)

            const step = 2
            for (let y = 0; y < canvas.height; y += step) {
                for (let x = 0; x < canvas.width; x += step) {
                    let sourceX = x
                    let sourceY = y

                    pushEffects.forEach((push) => {
                        const dx = x - push.x
                        const dy = y - push.y
                        const distance = Math.sqrt(dx * dx + dy * dy)

                        if (distance < push.radius && distance > 0) {
                            const pushStrength = push.strength * (1 - distance / push.radius)
                            const angle = Math.atan2(dy, dx)
                            const pushDistance = pushStrength * 25

                            sourceX += Math.cos(angle) * pushDistance
                            sourceY += Math.sin(angle) * pushDistance
                        }
                    })

                    sourceX = Math.max(0, Math.min(canvas.width - 1, Math.round(sourceX)))
                    sourceY = Math.max(0, Math.min(canvas.height - 1, Math.round(sourceY)))

                    for (let dy = 0; dy < step && y + dy < canvas.height; dy++) {
                        for (let dx = 0; dx < step && x + dx < canvas.width; dx++) {
                            const destIndex = ((y + dy) * canvas.width + (x + dx)) * 4
                            const sourceIndex = (sourceY * canvas.width + sourceX) * 4

                            data[destIndex] = sourceImageData.data[sourceIndex]
                            data[destIndex + 1] = sourceImageData.data[sourceIndex + 1]
                            data[destIndex + 2] = sourceImageData.data[sourceIndex + 2]
                            data[destIndex + 3] = sourceImageData.data[sourceIndex + 3]
                        }
                    }
                }
            }

            ctx.putImageData(imageData, 0, 0)
        }

        const animate = () => {
            pushEffects = pushEffects.filter((push) => {
                push.strength *= 0.85
                return push.strength > 0.05
            })

            drawDistortedImage()
            requestAnimationFrame(animate)
        }

        const handleImageLoad = () => {
            resizeCanvas()
            animate()
        }

        // initialise
        canvas.className = "ripple-canvas-bg"
        image.src = "/digigoat-hero.png"
        image.alt = "DIGIGOAT Hero"
        image.crossOrigin = "anonymous"
        image.style.display = "none"

        image.onload = handleImageLoad
        if (image.complete) {
            handleImageLoad()
        }

        document.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("resize", resizeCanvas)

        // add to container
        containerRef.current.appendChild(image)
        containerRef.current.appendChild(canvas)

        // cleanup
        return () => {
            document.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("resize", resizeCanvas)
        }
    }, [])

    return <div ref={containerRef} className="ripple-background"></div>
}