import { useEffect, useRef, useState } from 'react'

// Lerp function for interpolation
const lerp = (start: number, end: number, t: number): number => {
  return start + t * (end - start)
}

function GlyphDrawing() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isHovering, setIsHovering] = useState(false)
  const violet = { r: 124, g: 58, b: 237 }
  const transitionDuration = 300 // 300ms
  let startTime: number | null = null

  // Interpolate colors between black and violet
  const interpolateColor = (
    pixels: Uint8ClampedArray,
    elapsed: number,
    isHovering: boolean,
  ) => {
    const t = Math.min(elapsed / transitionDuration, 1) // Normalized time (0 to 1)
    const reverseT = 1 - t

    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i]
      const g = pixels[i + 1]
      const b = pixels[i + 2]

      // Detect black pixels (adjust tolerance as needed)
      if (r === 0 && g === 0 && b === 0) {
        if (isHovering) {
          pixels[i] = lerp(0, violet.r, t) // Red channel
          pixels[i + 1] = lerp(0, violet.g, t) // Green channel
          pixels[i + 2] = lerp(0, violet.b, t) // Blue channel
        } else {
          // Interpolate back to black
          pixels[i] = lerp(violet.r, 0, reverseT) // Red channel
          pixels[i + 1] = lerp(violet.g, 0, reverseT) // Green channel
          pixels[i + 2] = lerp(violet.b, 0, reverseT) // Blue channel
        }
      }
    }
  }

  const renderFrame = (timestamp: number) => {
    if (!startTime) {
      startTime = timestamp // Set start time on first call
    }
    const elapsed = timestamp - startTime // Elapsed time since start of transition

    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    if (video && ctx && canvas) {
      // Draw video frame to canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      const imageData = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height,
      )
      const pixels = imageData.data

      // Interpolate colors based on hover state
      interpolateColor(pixels, elapsed, isHovering)

      // Put the modified image data back to canvas
      ctx.putImageData(imageData, 0, 0)

      // Continue the animation if hover is still happening, or reverting if not
      if (elapsed < transitionDuration) {
        requestAnimationFrame(renderFrame)
      }
    }
  }

  // Event listeners to handle hover events and color transition
  const handleMouseEnter = () => {
    setIsHovering(true)
    startTime = null // Reset animation start time
    requestAnimationFrame(renderFrame) // Start color transition
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    startTime = null // Reset animation start time
    requestAnimationFrame(renderFrame) // Start color transition
  }

  useEffect(() => {
    const videoElement = videoRef.current
    if (videoElement) {
      // Start video playback once it's ready
      videoElement.play()
    }
  }, [videoRef])

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ width: '600px', height: '400px' }}
    >
      <video
        ref={videoRef}
        width="600"
        height="400"
        muted
        loop
        className="hidden"
      >
        <source
          src="glyph-animation.webm"
          type="video/webm"
        />
      </video>
      <canvas
        ref={canvasRef}
        width="600"
        height="400"
      />
    </div>
  )
}

export default GlyphDrawing
