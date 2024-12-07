'use client'

// https://www.poliigon.com/textures/free

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

import Grid from '@termsurf/leaf/component/Grid'
import { useDarkMode } from '@termsurf/leaf/hook/useDarkMode'
import COLORS from '@termsurf/leaf/utility/colors'
import clsx from 'clsx'
import { useState } from 'react'
import Section from '~/lib/frontend/components/Section'

export default function Page() {
  return (
    <Section.Environment path="/guides/earth-climate-cycles">
      <Content />
    </Section.Environment>
  )
}

function Content() {
  return (
    <Section>
      <Section.Header>
        <Section.H1>Earth Climate Cycles</Section.H1>
        <Section.P>
          The solar system reasons behind Earth's climate
        </Section.P>
      </Section.Header>
      <Section.Header>
        <Section.H2>Cycle Types</Section.H2>
        <div className="p-16">
          <Grid
            minWidth={156}
            maxWidth={192}
            gap={16}
            maxColumns={3}
            align="center"
          >
            <Section.Box label="tilt" />
            <Section.Box label="wobble" />
            <Section.Box label="pull" />
          </Grid>
        </div>
      </Section.Header>
      <Section.Header>
        <Section.H2>Tilt</Section.H2>
        <Section.P>
          Seasons change more dramatically with higher tilt
        </Section.P>
        <TiltCircle />
      </Section.Header>
      <Section.Block>
        <Section.H2>High Tilt (~24.5&deg;)</Section.H2>
        <Section.List>
          <Section.Item label="Extreme temperatures">
            Outer points closer/further to sun.
          </Section.Item>
          <Section.Item label="Summers are hotter">
            Outer points receive more sunlight. Ice melts more.
          </Section.Item>
          <Section.Item label="Winters are colder">
            Outer points receive less sunlight. Ice freezes more.
          </Section.Item>
          <Section.Item label="Ice melts more">
            Summer melts more ice than winter creates.
          </Section.Item>
          <Section.Item>
            Midpoint stays constant temperature.
          </Section.Item>
        </Section.List>
        <Section.Result color="red">
          Increases global warming
        </Section.Result>
      </Section.Block>
      <Section.Block>
        <Section.H2>Low Tilt (~22.1&deg;)</Section.H2>
        <Section.List>
          <Section.Item label="Milder temperatures">
            Endpoints less extreme relative to sun.
          </Section.Item>
          <Section.Item label="Summers are milder">
            Endpoints receive less sunlight. Ice melts less.
          </Section.Item>
          <Section.Item label="Winters are milder">
            Endpoints still cold enough to accumulate ice.
          </Section.Item>
          <Section.Item label="Ice freezes more">
            Net result is ice accumulates.
          </Section.Item>
          <Section.Item>
            Midpoint stays constant temperature.
          </Section.Item>
        </Section.List>
        <Section.Result color="blue">
          Decreases global warming
        </Section.Result>
      </Section.Block>
      <Section.Block>
        <Section.H2>Tilt Stats</Section.H2>
        <Section.List>
          <Section.Item
            reverse
            label="range"
          >
            ~22.1&deg; to ~24.5&deg;
          </Section.Item>
          <Section.Item
            reverse
            label="current tilt"
          >
            23.4&deg; and decreasing (minimizing extreme temperatures)
          </Section.Item>
          <Section.Item
            reverse
            label="cycle duration"
          >
            ~41,000 years
          </Section.Item>
          <Section.Item
            reverse
            label="time remaining"
          >
            ~10,000 years until reaching minimum
          </Section.Item>
        </Section.List>
      </Section.Block>
      <Section.Header>
        <Section.H2>Wobble</Section.H2>
        <Section.P>Earth's axis wobbles like a spinning top</Section.P>
        <PrecessionScene />
      </Section.Header>
      <Section.Block>
        <Section.H2>Wobble Stats</Section.H2>
        <Section.List>
          <Section.Item
            reverse
            label="cycle duration"
          >
            ~23,000 years
          </Section.Item>
        </Section.List>
      </Section.Block>
      <Section.Header>
        <Section.H2>Pull</Section.H2>
        <Section.P>
          Earth's orbit is pulled by large and small planets
        </Section.P>
        <div className="p-16">
          <Grid
            minWidth={320}
            maxWidth={320}
            gap={16}
            maxColumns={2}
            align="center"
          >
            <Section.Box label="large planet pull" />
            <Section.Box label="small planet pull" />
          </Grid>
        </div>
      </Section.Header>
      <Section.Block>
        <Section.H2>Large Planet Pull</Section.H2>
        <Section.P>
          Caused by orbits of <strong>Jupiter</strong> and{' '}
          <strong>Saturn</strong>
        </Section.P>
        <Section.List>
          <Section.Item
            reverse
            label="cycle duration"
          >
            ~405,000 years
          </Section.Item>
        </Section.List>
      </Section.Block>
      <Section.Block>
        <Section.H2>Small Planet Pull</Section.H2>
        <Section.P>
          Caused by orbits of <strong>Venus</strong> and{' '}
          <strong>Mars</strong>
        </Section.P>
        <Section.List>
          <Section.Item
            reverse
            label="venus cycle duration"
          >
            ~95,000 years
          </Section.Item>
          <Section.Item
            reverse
            label="mars cycle duration"
          >
            ~124,000 years
          </Section.Item>
          <Section.Item
            reverse
            label={`combined "beat" cycle duration`}
          >
            ~100,000 years
          </Section.Item>
        </Section.List>
      </Section.Block>
      <Section.Header>
        <Section.H2>Gases</Section.H2>
        <Section.P>
          Gases naturally cycle and generally warm the earth
        </Section.P>
        <div className="p-16">
          <Grid
            minWidth={180}
            maxWidth={180}
            gap={16}
            maxColumns={3}
            align="center"
          >
            <Section.Box label="carbon dioxide" />
            <Section.Box label="methane" />
            <Section.Box label="nitrous oxide" />
          </Grid>
        </div>
      </Section.Header>
      <Section.Block>
        <Section.H2>Gas Facts</Section.H2>
        <Section.List>
          <Section.Item label="They trap heat">
            Absorb and re-emit infrared radiation from the Earth's
            surface. Prevents heat from escaping to outer space.
          </Section.Item>
          <Section.Item label="Heat melts ice">
            Hotter earth means melting ice.
          </Section.Item>
          <Section.Item label="Reduced reflectivity">
            Less ice means less reflecting of sun's rays from Earth to
            outer space.
          </Section.Item>
          <Section.Item label="Gas release feedback loop">
            Melting ice releases trapped carbon dioxide and methane,
            further increasing heat.
          </Section.Item>
        </Section.List>
      </Section.Block>
      <Section.Block>
        <Section.H2>Carbion Dioxide</Section.H2>
        <Section.List>
          <Section.Item label="Long lifetime">
            Lives in the atmosphere for 100's to 1000's of years.
          </Section.Item>
        </Section.List>
      </Section.Block>
    </Section>
  )
}

const TiltCircle = () => {
  const [showFirstLine, setShowFirstLine] = useState(true)
  const radius = 128 // 256/2 for the radius
  const lineExtension = 32
  const centerX = 192 // Padding from edges
  const centerY = 192
  const isDark = useDarkMode() === 'dark'

  // Angles relative to vertical
  const angle1 = (90 + 22.1) * (Math.PI / 180)
  const angle2 = (90 + 24.5) * (Math.PI / 180)

  // Calculate line endpoints using trigonometry, including extension
  const getLineEndpoints = angle => {
    const extendedRadius = radius + lineExtension
    const x1 = centerX + extendedRadius * Math.cos(angle)
    const y1 = centerY + extendedRadius * Math.sin(angle)
    const x2 = centerX - extendedRadius * Math.cos(angle)
    const y2 = centerY - extendedRadius * Math.sin(angle)
    return { x1, y1, x2, y2 }
  }

  const line1 = getLineEndpoints(angle1)
  const line2 = getLineEndpoints(angle2)

  const handleCircleClick = () => {
    setShowFirstLine(!showFirstLine)
  }

  return (
    <div className="w-full flex justify-center">
      <svg
        viewBox="0 0 384 424"
        width={384}
      >
        <defs>
          <style type="text/css">
            {`@import
            url('https://fonts.googleapis.com/css?family=Noto+Sans+Monoo:wght@400;600;700&display=swap');

          .text {
            font-family: 'Noto Sans Mono', monospace;
          }
        `}
          </style>
        </defs>
        {/* Circle */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill={
            isDark ? COLORS.tailwind.zinc700 : COLORS.tailwind.zinc200
          }
          className={clsx('cursor-pointer')}
          onClick={handleCircleClick}
        />

        {/* Lines */}
        {showFirstLine ? (
          <>
            <line
              x1={line1.x1}
              y1={line1.y1}
              x2={line1.x2}
              y2={line1.y2}
              stroke={
                isDark
                  ? COLORS.tailwind.zinc400
                  : COLORS.tailwind.zinc600
              }
              strokeWidth="8"
              strokeLinecap="round"
            />
            <text
              x={centerX}
              y={centerY + radius + 40}
              fontSize="16"
              fill={
                isDark
                  ? COLORS.tailwind.zinc400
                  : COLORS.tailwind.zinc600
              }
              textAnchor="middle"
              dominantBaseline="middle"
              className="text"
              fontWeight={600}
            >
              22.1°
            </text>
          </>
        ) : (
          <>
            <line
              x1={line2.x1}
              y1={line2.y1}
              x2={line2.x2}
              y2={line2.y2}
              stroke={
                isDark
                  ? COLORS.tailwind.zinc400
                  : COLORS.tailwind.zinc600
              }
              strokeWidth="8"
              strokeLinecap="round"
            />
            <text
              x={centerX}
              y={centerY + radius + 40}
              fontSize="16"
              fill={
                isDark
                  ? COLORS.tailwind.zinc400
                  : COLORS.tailwind.zinc600
              }
              textAnchor="middle"
              dominantBaseline="middle"
              className="text"
              fontWeight={600}
            >
              24.5°
            </text>
          </>
        )}
      </svg>
    </div>
  )
}

function EarthPrecession() {
  const axisRef = useRef<THREE.Mesh>(null) // For the rotating cylinder
  const sphereRef = useRef<THREE.Mesh>(null) // For the rotating sphere
  const isDark = useDarkMode() === 'dark'
  const texture = new THREE.TextureLoader().load(
    '/earthcloudmaptrans.jpg',
  ) // Replace with your texture file path
  const rotationSpeed = Math.PI / 2.3 // Angular velocity for one full rotation in 2 seconds

  useFrame((_, delta) => {
    if (axisRef.current) {
      // Precession: Rotate cylinder around the sphere's center
      axisRef.current.rotation.y += delta * rotationSpeed // Complete 1 cycle in 2 seconds
      axisRef.current.rotation.z = THREE.MathUtils.degToRad(24.5) // Precession tilt
    }

    if (sphereRef.current) {
      // Rotate sphere independently
      sphereRef.current.rotation.y += delta * rotationSpeed // Complete 1 cycle in 2 seconds
    }
  })

  return (
    <group>
      {/* Sphere */}
      <mesh
        ref={sphereRef}
        position={[0, 0, 0]}
      >
        <sphereGeometry args={[1.28, 64, 64]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* Rotating Cylinder */}
      <mesh ref={axisRef}>
        <cylinderGeometry args={[0.035, 0.035, 3.6, 32]} />{' '}
        {/* Passes through sphere */}
        <meshStandardMaterial
          color={
            isDark ? COLORS.tailwind.zinc200 : COLORS.tailwind.zinc800
          }
        />
      </mesh>
    </group>
  )
}

function PrecessionScene() {
  const containerWidth = 800 // Fixed container width
  const containerHeight = 450 // Aspect ratio 16:9
  const cameraDistance = 5 // Camera distance for close view

  return (
    <div
      style={{
        width: `100%`,
        margin: '0 auto',
      }}
    >
      <Canvas
        camera={{
          position: [0, 0, cameraDistance],
          fov: 45,
          near: 0.1,
          far: 1000,
        }}
        style={{
          // width: `${containerWidth}px`,
          height: `${containerHeight}px`,
        }}
      >
        <ambientLight intensity={0.5} />
        <spotLight
          intensity={0.5}
          angle={0.2}
          penumbra={1}
          position={[10, 15, 10]}
        />
        <directionalLight
          position={[10, 10, 10]}
          intensity={1}
        />

        <EarthPrecession />
      </Canvas>
    </div>
  )
}
