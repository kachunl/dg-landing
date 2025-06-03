"use client"

import { useEffect, useRef, useCallback } from "react"

export default function RippleBackground() {
    const containerRef = useRef(null)
    const canvasRef = useRef(null)
    const imageRef = useRef(null)
    const animationRef = useRef(null)
    const pushEffectsRef = useRef([])
    const lastMouseTime = useRef(0)

    const throttleMouseMove = useCallback((callback, delay) => {
        return (e) => {
            const now = Date.now()

            if (now - lastMouseTime.current >= delay) {
                lastMouseTime.current = now
                callback(e)
            }
        }
    }, [])

    useEffect(() => {
        if (!containerRef.current) return

        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d", { 
            alpha: false,
            desynchronized: true 
        })
        const image = new Image()
        
        let sourceImageData = null
        let canvasImageData = null
        
        const resizeCanvas = () => {
            // fixed canvas size based on viewport
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            canvas.style.width = "100%"
            canvas.style.height = "100%"
            
            // setup image data after resize
            if (image.complete && image.naturalWidth > 0 && image.naturalHeight > 0) {
                setupSourceImage()
            }
        }

        const setupSourceImage = () => {
            if (canvas.width <= 0 || canvas.height <= 0 || !image.naturalWidth || !image.naturalHeight) {
                return
            }
            
            const tempCanvas = document.createElement("canvas")
            tempCanvas.width = canvas.width
            tempCanvas.height = canvas.height
            const tempCtx = tempCanvas.getContext("2d")
            
            if (!tempCtx) return
            
            // scale to cover entire canvas
            const canvasRatio = canvas.width / canvas.height
            const imageRatio = image.naturalWidth / image.naturalHeight
            
            let drawWidth, drawHeight, offsetX, offsetY
            
            if (imageRatio > canvasRatio) {
                // fit to height
                drawHeight = canvas.height
                drawWidth = drawHeight * imageRatio
                offsetX = (canvas.width - drawWidth) / 2
                offsetY = 0
            } 
            
            else {
                // fit to width
                drawWidth = canvas.width
                drawHeight = drawWidth / imageRatio
                offsetX = 0
                offsetY = (canvas.height - drawHeight) / 2
            }

            try {
                tempCtx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight)
                sourceImageData = tempCtx.getImageData(0, 0, canvas.width, canvas.height)
                canvasImageData = ctx.createImageData(canvas.width, canvas.height)
            } 
            
            catch (error) {
                console.warn("Failed to setup source image:", error)
            }
        }

        const drawStaticImage = () => {
            if (!sourceImageData) return
            ctx.putImageData(sourceImageData, 0, 0)
        }

        const handleMouseMove = throttleMouseMove((e) => {
            pushEffectsRef.current.push({
                x: e.clientX,
                y: e.clientY,
                strength: 0.8,
                radius: 200,
                decay: 0.95
            })

            if (pushEffectsRef.current.length > 3) {
                pushEffectsRef.current.shift()
            }
        }, 50)

        const drawDistortedImage = () => {
            if (!sourceImageData || !canvasImageData) return

            const sourceData = sourceImageData.data
            const destData = canvasImageData.data
            const width = canvas.width
            const height = canvas.height

            const step = 2
            
            for (let y = 0; y < height; y += step) {
                for (let x = 0; x < width; x += step) {
                    let sourceX = x
                    let sourceY = y

                    for (const push of pushEffectsRef.current) {
                        const dx = x - push.x
                        const dy = y - push.y
                        const distanceSquared = dx * dx + dy * dy
                        const radiusSquared = push.radius * push.radius

                        if (distanceSquared < radiusSquared && distanceSquared > 0) {
                            const distance = Math.sqrt(distanceSquared)
                            const normalizedDistance = distance / push.radius
                            
                            // smoother falloff to reduce abrupt changes
                            const falloff = Math.cos(normalizedDistance * Math.PI * 0.5)
                            const pushStrength = push.strength * falloff
                            const pushDistance = pushStrength * 12
                            
                            const normalizedDx = dx / distance
                            const normalizedDy = dy / distance

                            sourceX += normalizedDx * pushDistance
                            sourceY += normalizedDy * pushDistance
                        }
                    }

                    sourceX = Math.max(0, Math.min(width - 1, Math.round(sourceX)))
                    sourceY = Math.max(0, Math.min(height - 1, Math.round(sourceY)))

                    const sourceIndex = (sourceY * width + sourceX) * 4

                    // fill 2x2 block
                    for (let dy = 0; dy < step && y + dy < height; dy++) {
                        for (let dx = 0; dx < step && x + dx < width; dx++) {
                            const destIndex = ((y + dy) * width + (x + dx)) * 4

                            destData[destIndex] = sourceData[sourceIndex]
                            destData[destIndex + 1] = sourceData[sourceIndex + 1]
                            destData[destIndex + 2] = sourceData[sourceIndex + 2]
                            destData[destIndex + 3] = sourceData[sourceIndex + 3]
                        }
                    }
                }
            }

            ctx.putImageData(canvasImageData, 0, 0)
        }

        const animate = () => {
            pushEffectsRef.current = pushEffectsRef.current.filter((push) => {
                push.strength *= push.decay
                return push.strength > 0.12
            })

            if (pushEffectsRef.current.length > 0) {
                drawDistortedImage()
            } 
            
            else {
                drawStaticImage()
            }
            
            animationRef.current = requestAnimationFrame(animate)
        }

        const handleImageLoad = () => {
            if (image.naturalWidth > 0 && image.naturalHeight > 0) {
                resizeCanvas()
                setupSourceImage()
                drawStaticImage()
                animate()
            }
        }

        // setup
        canvas.className = "ripple-canvas-bg"
        canvas.style.position = "absolute"
        canvas.style.top = "0"
        canvas.style.left = "0"
        canvas.style.width = "100%"
        canvas.style.height = "100%"
        canvas.style.objectFit = "cover"
        
        image.src = "/digigoat-hero.png"
        image.alt = "DIGIGOAT Hero"
        image.crossOrigin = "anonymous"
        image.style.display = "none"

        // event listeners
        image.onload = handleImageLoad
        if (image.complete) {
            handleImageLoad()
        }

        window.addEventListener("resize", resizeCanvas)
        document.addEventListener("mousemove", handleMouseMove, { passive: true })

        // add to container
        containerRef.current.appendChild(canvas)

        // store refs
        canvasRef.current = canvas
        imageRef.current = image

        // cleanup
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
            window.removeEventListener("resize", resizeCanvas)
            document.removeEventListener("mousemove", handleMouseMove)
        }
    }, [throttleMouseMove])

    return (
        <div 
            ref={containerRef} 
            className="ripple-background"
            style={{
                position: "relative",
                width: "100%",
                height: "100vh",
                overflow: "hidden"
            }}
        />
    )
}