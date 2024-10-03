import React, { useState } from 'react'

const SefirotTreeOfLife = () => {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null)

  const width = 300
  const height = 400
  const nodeRadius = 16
  const lineThickness = 4

  // Calculate positions with precise spacing
  const topY = 30
  const bottomY = 370
  const middleY = (topY + bottomY) / 2
  const spacing = (bottomY - topY) / 8

  const sefirotPositions = [
    { x: 150, y: topY }, // Keter (1)
    { x: 75, y: topY + spacing }, // Chochmah (2)
    { x: 225, y: topY + spacing }, // Binah (3)
    { x: 75, y: middleY - spacing }, // Chesed (4)
    { x: 225, y: middleY - spacing }, // Gevurah (5)
    { x: 150, y: middleY }, // Tiferet (6)
    { x: 75, y: middleY + spacing }, // Netzach (7)
    { x: 225, y: middleY + spacing }, // Hod (8)
    { x: 150, y: middleY + 2 * spacing }, // Yesod (9)
    { x: 150, y: bottomY }, // Malchut (10)
  ]

  const paths = [
    [0, 1],
    [0, 2],
    [0, 5],
    [1, 2],
    [1, 3],
    [1, 5],
    [2, 4],
    [2, 5],
    [3, 4],
    [3, 5],
    [3, 6],
    [4, 5],
    [4, 7],
    [5, 6],
    [5, 7],
    [5, 8],
    [6, 7],
    [6, 8],
    [7, 8],
    [8, 9],
  ]

  return (
    <div className="w-full max-w-[300px] mx-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
      >
        <defs>
          <filter
            id="shadow-1"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="1"
              floodOpacity="0.05"
            />
          </filter>
        </defs>

        {/* Draw paths */}
        {paths.map(([start, end], index) => (
          <line
            key={`path-${index}`}
            x1={sefirotPositions[start].x}
            y1={sefirotPositions[start].y}
            x2={sefirotPositions[end].x}
            y2={sefirotPositions[end].y}
            stroke="rgb(243 244 246)"
            strokeWidth={lineThickness}
            strokeLinecap="round"
          />
        ))}

        {/* Draw nodes */}
        {sefirotPositions.map((node, index) => (
          <g key={index}>
            <circle
              cx={node.x}
              cy={node.y}
              r={nodeRadius}
              fill="rgb(229 231 235)"
              filter="url(#shadow-1)"
              onMouseEnter={() => setHoveredNode(index)}
              onMouseLeave={() => setHoveredNode(null)}
              className="transition-all duration-300 cursor-pointer"
            />
            <text
              x={node.x}
              y={node.y}
              fontSize={nodeRadius * 0.75}
              textAnchor="middle"
              dominantBaseline="central"
              fill="rgb(17 24 39)"
              className="pointer-events-none"
            >
              {index + 1}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

export default SefirotTreeOfLife
