import React, { useEffect, useState } from 'react'

const HebrewDoubleLettersHexagons = () => {
  const [size, setSize] = useState(320)
  const [hoveredHexagon, setHoveredHexagon] = useState<number | null>(
    null,
  )

  useEffect(() => {
    const handleResize = () => {
      const width = Math.min(800, Math.max(320, window.innerWidth))
      setSize(width)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const fontSize = 64
  const hexagonRadius = size / 8
  const gap = size / 100
  const centerX = size / 2
  const centerY = size / 2

  const hexagonPoints = (cx, cy) => {
    const points: Array<string> = []
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i
      const x = cx + hexagonRadius * Math.cos(angle)
      const y = cy + hexagonRadius * Math.sin(angle)
      points.push(`${x},${y}`)
    }
    return points.join(' ')
  }

  const hexagonPositions = [
    { x: centerX, y: centerY, letter: 'ת' },
    {
      x: centerX,
      y: centerY - ((hexagonRadius * 2 + gap) * Math.sqrt(3)) / 2,
      letter: 'ב',
    },
    {
      x: centerX + ((hexagonRadius * 2 + gap) * 3) / 4,
      y: centerY - ((hexagonRadius * 2 + gap) * Math.sqrt(3)) / 4,
      letter: 'ג',
    },
    {
      x: centerX + ((hexagonRadius * 2 + gap) * 3) / 4,
      y: centerY + ((hexagonRadius * 2 + gap) * Math.sqrt(3)) / 4,
      letter: 'ד',
    },
    {
      x: centerX,
      y: centerY + ((hexagonRadius * 2 + gap) * Math.sqrt(3)) / 2,
      letter: 'כ',
    },
    {
      x: centerX - ((hexagonRadius * 2 + gap) * 3) / 4,
      y: centerY + ((hexagonRadius * 2 + gap) * Math.sqrt(3)) / 4,
      letter: 'פ',
    },
    {
      x: centerX - ((hexagonRadius * 2 + gap) * 3) / 4,
      y: centerY - ((hexagonRadius * 2 + gap) * Math.sqrt(3)) / 4,
      letter: 'ר',
    },
  ]

  return (
    <div className="w-full max-w-[800px] mx-auto">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${size} ${size}`}
      >
        <defs>
          <filter
            id="shadow-1"
            x="-8%"
            y="-8%"
            width="116%"
            height="116%"
          >
            <feFlood
              flood-color="rgb(0,0,0)"
              flood-opacity="0.05"
              result="shadow"
            />
            <feComposite
              in="shadow"
              in2="SourceAlpha"
              operator="in"
              result="shadow-alpha"
            />
            <feOffset
              dx="0"
              dy="0"
              in="shadow-alpha"
              result="offset-shadow"
            />
            <feGaussianBlur
              stdDeviation="0.5"
              in="offset-shadow"
              result="blurred-shadow"
            />
            <feMerge>
              <feMergeNode in="blurred-shadow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter
            id="shadow-2"
            x="-8%"
            y="-8%"
            width="116%"
            height="116%"
          >
            <feFlood
              flood-color="rgb(0,0,0)"
              flood-opacity="0.05"
              result="shadow1"
            />
            <feComposite
              in="shadow1"
              in2="SourceAlpha"
              operator="in"
              result="shadow1-alpha"
            />
            <feOffset
              dx="0"
              dy="0"
              in="shadow1-alpha"
              result="offset-shadow1"
            />
            <feGaussianBlur
              stdDeviation="1"
              in="offset-shadow1"
              result="blurred-shadow1"
            />
            <feFlood
              flood-color="rgb(0,0,0)"
              flood-opacity="0.06"
              result="shadow2"
            />
            <feComposite
              in="shadow2"
              in2="SourceAlpha"
              operator="in"
              result="shadow2-alpha"
            />
            <feOffset
              dx="0"
              dy="1"
              in="shadow2-alpha"
              result="offset-shadow2"
            />
            <feGaussianBlur
              stdDeviation="1"
              in="offset-shadow2"
              result="blurred-shadow2"
            />
            <feMerge result="merged-shadows">
              <feMergeNode in="blurred-shadow1" />
              <feMergeNode in="blurred-shadow2" />
            </feMerge>
            <feMerge>
              <feMergeNode in="merged-shadows" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {hexagonPositions.map((pos, index) => (
          <g key={index}>
            <polygon
              points={hexagonPoints(pos.x, pos.y)}
              fill="rgb(249 250 251)"
              filter={
                hoveredHexagon === index
                  ? 'url(#shadow-2)'
                  : 'url(#shadow-1)'
              }
              onMouseEnter={() => setHoveredHexagon(index)}
              onMouseLeave={() => setHoveredHexagon(null)}
            />
            <a
              href={`/scripts/hebrew/${pos.letter}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <text
                x={pos.x}
                y={pos.y}
                fontSize={fontSize}
                fontFamily="Arial, sans-serif"
                textAnchor="middle"
                dominantBaseline="central"
                fill={
                  hoveredHexagon === index ? '#7c3aed' : 'rgb(17 24 39)'
                }
                style={{ transition: 'fill 300ms', cursor: 'pointer' }}
              >
                {pos.letter}
              </text>
            </a>
          </g>
        ))}
      </svg>
    </div>
  )
}

export default HebrewDoubleLettersHexagons
