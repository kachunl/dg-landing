"use client"

import { useEffect, useRef } from "react"

export default function RippleBackground() {
    const containerRef = useRef(null)
    const animationRef = useRef(null)
    const mousePos = useRef({ x: 0, y: 0 })
    const ripples = useRef([])

    useEffect(() => {
        if (!containerRef.current) return

        // detect mobile device
        const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

        if (isMobile) {
            const mobileDiv = document.createElement("div")
            mobileDiv.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-image: url(/digigoat-hero-mobile.png);
                background-size: cover;
                background-position: center;
            `
            containerRef.current.appendChild(mobileDiv)
            return
        }

        // desktop
        const canvas = document.createElement("canvas")
        const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
        
        if (!gl) {
            console.warn("WebGL not supported, using CSS fallback")
            
            // css fallback
            const fallbackDiv = document.createElement("div")
            fallbackDiv.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-image: url(/digigoat-hero.png);
                background-size: cover;
                background-position: center;
                transition: transform 0.1s ease-out;
            `
            
            const handleMouseMove = (e) => {
                const rect = fallbackDiv.getBoundingClientRect()
                const x = e.clientX - rect.left
                const y = e.clientY - rect.top
                const centerX = rect.width / 2
                const centerY = rect.height / 2
                const deltaX = (x - centerX) / centerX
                const deltaY = (y - centerY) / centerY
                
                const maxTransform = 3
                const translateX = deltaX * maxTransform
                const translateY = deltaY * maxTransform
                
                fallbackDiv.style.transform = `translate(${translateX}px, ${translateY}px) scale(1.005)`
                
                setTimeout(() => {
                    fallbackDiv.style.transform = "translate(0px, 0px) scale(1)"
                }, 200)
            }
            
            fallbackDiv.addEventListener("mousemove", handleMouseMove, { passive: true })
            containerRef.current.appendChild(fallbackDiv)
            return
        }

        canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        `

        const vertexShaderSource = `
            attribute vec2 a_position;
            attribute vec2 a_texCoord;
            varying vec2 v_texCoord;
            
            void main() {
                gl_Position = vec4(a_position, 0.0, 1.0);
                v_texCoord = a_texCoord;
            }
        `

        const fragmentShaderSource = `
            precision mediump float;
            uniform sampler2D u_texture;
            uniform vec2 u_resolution;
            uniform vec2 u_mouse;
            uniform float u_time;
            uniform vec2 u_ripple1;
            uniform vec2 u_ripple2;
            uniform vec2 u_ripple3;
            uniform float u_strength1;
            uniform float u_strength2;
            uniform float u_strength3;
            varying vec2 v_texCoord;
            
            void main() {
                vec2 uv = v_texCoord;
                vec2 pixel = gl_FragCoord.xy / u_resolution.xy;
                
                // calculate distortion from multiple ripples
                vec2 distortion = vec2(0.0);
                
                // ripple 1
                float dist1 = distance(pixel, u_ripple1);
                if (dist1 < 0.3 && u_strength1 > 0.0) {
                    float ripple1 = sin(dist1 * 30.0 - u_time * 8.0) * exp(-dist1 * 8.0) * u_strength1;
                    vec2 normal1 = normalize(pixel - u_ripple1);
                    distortion += normal1 * ripple1 * 0.02;
                }
                
                // ripple 2
                float dist2 = distance(pixel, u_ripple2);
                if (dist2 < 0.3 && u_strength2 > 0.0) {
                    float ripple2 = sin(dist2 * 30.0 - u_time * 8.0) * exp(-dist2 * 8.0) * u_strength2;
                    vec2 normal2 = normalize(pixel - u_ripple2);
                    distortion += normal2 * ripple2 * 0.02;
                }
                
                // ripple 3
                float dist3 = distance(pixel, u_ripple3);
                if (dist3 < 0.3 && u_strength3 > 0.0) {
                    float ripple3 = sin(dist3 * 30.0 - u_time * 8.0) * exp(-dist3 * 8.0) * u_strength3;
                    vec2 normal3 = normalize(pixel - u_ripple3);
                    distortion += normal3 * ripple3 * 0.02;
                }
                
                // apply distortion to uv coordinates
                vec2 distortedUV = uv + distortion;
                
                gl_FragColor = texture2D(u_texture, distortedUV);
            }
        `

        function createShader(gl, type, source) {
            const shader = gl.createShader(type)
            gl.shaderSource(shader, source)
            gl.compileShader(shader)
            
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error("Shader compile error:", gl.getShaderInfoLog(shader))
                gl.deleteShader(shader)
                return null
            }
            
            return shader
        }

        function createProgram(gl, vertexShader, fragmentShader) {
            const program = gl.createProgram()
            gl.attachShader(program, vertexShader)
            gl.attachShader(program, fragmentShader)
            gl.linkProgram(program)
            
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                console.error("Program link error:", gl.getProgramInfoLog(program))
                gl.deleteProgram(program)
                return null
            }
            
            return program
        }

        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
        const program = createProgram(gl, vertexShader, fragmentShader)

        // set up geometry
        const positions = new Float32Array([
            -1, -1,  1, -1,  -1, 1,
            -1, 1,   1, -1,   1, 1
        ])

        const texCoords = new Float32Array([
            0, 1,  1, 1,  0, 0,
            0, 0,  1, 1,  1, 0
        ])

        const positionBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

        const texCoordBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW)

        // get attribute and uniform locations
        const positionLocation = gl.getAttribLocation(program, "a_position")
        const texCoordLocation = gl.getAttribLocation(program, "a_texCoord")
        const resolutionLocation = gl.getUniformLocation(program, "u_resolution")

        const mouseLocation = gl.getUniformLocation(program, "u_mouse")
        const timeLocation = gl.getUniformLocation(program, "u_time")

        const ripple1Location = gl.getUniformLocation(program, "u_ripple1")
        const ripple2Location = gl.getUniformLocation(program, "u_ripple2")
        const ripple3Location = gl.getUniformLocation(program, "u_ripple3")

        const strength1Location = gl.getUniformLocation(program, "u_strength1")
        const strength2Location = gl.getUniformLocation(program, "u_strength2")
        const strength3Location = gl.getUniformLocation(program, "u_strength3")

        let texture
        let startTime = Date.now()

        function loadTexture() {
            texture = gl.createTexture()
            gl.bindTexture(gl.TEXTURE_2D, texture)
            
            // fill with transparent
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]))
            
            const image = new Image()
            image.crossOrigin = "anonymous"
            image.onload = () => {
                console.log('Image loaded successfully')
                gl.bindTexture(gl.TEXTURE_2D, texture)
                
                const tempCanvas = document.createElement("canvas")
                tempCanvas.width = canvas.width
                tempCanvas.height = canvas.height
                const tempCtx = tempCanvas.getContext("2d")
                
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
                
                tempCtx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight)
                
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, tempCanvas)
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
            }
            image.onerror = () => {
                console.error("Failed to load desktop image")
            }

            image.src = "/digigoat-hero.png"
        }

        function resize() {
            const rect = containerRef.current.getBoundingClientRect()
            canvas.width = rect.width
            canvas.height = rect.height
            canvas.style.width = rect.width + "px"
            canvas.style.height = rect.height + "px"
            gl.viewport(0, 0, canvas.width, canvas.height)
        }

        function render() {
            if (!texture) return

            gl.clear(gl.COLOR_BUFFER_BIT)
            gl.useProgram(program)

            // set up position attribute
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
            gl.enableVertexAttribArray(positionLocation)
            gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

            // set up texture coordinate attribute
            gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer)
            gl.enableVertexAttribArray(texCoordLocation)
            gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0)

            // set uniforms
            gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
            gl.uniform2f(mouseLocation, mousePos.current.x / canvas.width, 1.0 - mousePos.current.y / canvas.height)
            gl.uniform1f(timeLocation, (Date.now() - startTime) / 1000)

            // update ripples
            const currentRipples = ripples.current.slice(-3)
            while (currentRipples.length < 3) {
                currentRipples.push({ x: -1, y: -1, strength: 0 })
            }

            gl.uniform2f(ripple1Location, currentRipples[0].x, currentRipples[0].y)
            gl.uniform2f(ripple2Location, currentRipples[1].x, currentRipples[1].y)
            gl.uniform2f(ripple3Location, currentRipples[2].x, currentRipples[2].y)
            gl.uniform1f(strength1Location, currentRipples[0].strength)
            gl.uniform1f(strength2Location, currentRipples[1].strength)
            gl.uniform1f(strength3Location, currentRipples[2].strength)

            // decay ripples
            ripples.current = ripples.current.map(ripple => ({
                ...ripple,
                strength: ripple.strength * 0.95
            })).filter(ripple => ripple.strength > 0.01)

            gl.bindTexture(gl.TEXTURE_2D, texture)
            gl.drawArrays(gl.TRIANGLES, 0, 6)

            animationRef.current = requestAnimationFrame(render)
        }

        function handleMouseMove(e) {
            const rect = canvas.getBoundingClientRect()
            mousePos.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            }

            // add new ripple
            ripples.current.push({
                x: mousePos.current.x / canvas.width,
                y: 1.0 - mousePos.current.y / canvas.height,
                strength: 1.0
            })
        }

        // initialise
        resize()
        loadTexture()
        
        window.addEventListener("resize", resize)
        canvas.addEventListener("mousemove", handleMouseMove, { passive: true })
        
        containerRef.current.appendChild(canvas)

        render()

        return () => {
            window.removeEventListener("resize", resize)
            if (canvas.parentNode) {
                canvas.removeEventListener("mousemove", handleMouseMove)
            }
            
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [])

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