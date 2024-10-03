import React, { useEffect, useState } from 'react'

const HebrewLettersCircle = () => {
  const [size, setSize] = useState(320)
  const [hoveredLetter, setHoveredLetter] = useState<number | null>(
    null,
  )

  const hebrewLetters = [
    'א',
    'ב',
    'ג',
    'ד',
    'ה',
    'ו',
    'ז',
    'ח',
    'ט',
    'י',
    'כ',
    'ל',
    'מ',
    'נ',
    'ס',
    'ע',
    'פ',
    'צ',
    'ק',
    'ר',
    'ש',
    'ת',
  ]

  useEffect(() => {
    const handleResize = () => {
      const width = Math.min(800, Math.max(320, window.innerWidth))
      setSize(width)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const center = size / 2
  const radius = (size / 2) * 0.8
  const fontSize = Math.max(12, size / 25)
  const circleRadius = Math.max(10, size / 25)
  const strokeWidth = size / 300

  const calculatePosition = (index, total) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    }
  }

  const letterPositions = hebrewLetters.map((_, index) =>
    calculatePosition(index, hebrewLetters.length),
  )

  const renderLines = (highlighted = false) => {
    return letterPositions.map((start, i) =>
      letterPositions.slice(i + 1).map((end, j) => {
        const isHighlighted =
          hoveredLetter === i || hoveredLetter === i + j + 1
        if (highlighted !== isHighlighted) {
          return null
        }
        return (
          <line
            key={`line-${i}-${j}`}
            x1={start.x}
            y1={start.y}
            x2={end.x}
            y2={end.y}
            stroke={
              isHighlighted ? 'rgb(107 114 128)' : 'rgb(229 231 235)'
            }
            strokeWidth={strokeWidth}
            className="transition-all duration-300"
          />
        )
      }),
    )
  }

  return (
    <div className="w-full max-w-[800px] mx-auto">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-auto"
      >
        {/* Draw non-highlighted lines */}
        {renderLines(false)}

        {/* Draw highlighted lines (these will appear on top) */}
        {renderLines(true)}

        {/* Draw circles and letters */}
        {hebrewLetters.map((letter, index) => {
          const { x, y } = letterPositions[index]
          return (
            <g
              key={letter}
              onMouseEnter={() => setHoveredLetter(index)}
              onMouseLeave={() => setHoveredLetter(null)}
              className="cursor-pointer"
            >
              <circle
                cx={x}
                cy={y}
                r={circleRadius}
                fill="rgb(249 250 251)"
                stroke="rgb(229 231 235)"
                strokeWidth={strokeWidth / 2}
                className="transition-all duration-300"
              />
              <text
                x={x}
                y={y}
                fontSize={fontSize}
                fontWeight="bold"
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="Arial, sans-serif"
                fill="rgb(17 24 39)"
              >
                {letter}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default HebrewLettersCircle
