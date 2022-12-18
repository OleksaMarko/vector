import { MouseEvent, WheelEvent, useState, useRef } from 'react'
import styles from './View.module.css'

const INIT_WIDTH = 500
const INIT_HEIGHT = 500

export const View: React.FC = () => {
  const [cirlces, setCircles] = useState<{ x: number; y: number }[]>([])
  const [rects, setRects] = useState<{ x: number; y: number }[]>([])
  const [tool, setTool] = useState<'circle' | 'rect'>('circle')
  const deltaRef = useRef(0)
  const elRef = useRef<SVGSVGElement>(null)

  const handleClick = (e: MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.x
    const y = e.clientY - rect.y

    switch (tool) {
      case 'circle':
        setCircles((circles) => {
          return [
            ...circles,
            {
              x: x,
              y: y,
            },
          ]
        })
        break
      case 'rect':
        setRects((rects) => {
          return [
            ...rects,
            {
              x: x,
              y: y,
            },
          ]
        })
        break
      // case 'line':
      // case 'path':
      // case 'polygon':
      // case 'polyline':
    }
  }

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault()

    deltaRef.current = Math.max(0, deltaRef.current + e.deltaY)
    if (elRef.current) {
      elRef.current.style.width = `${Math.max(INIT_WIDTH, INIT_WIDTH + deltaRef.current)}px`
      elRef.current.style.height = `${Math.max(INIT_HEIGHT, INIT_HEIGHT + deltaRef.current)}px`
    }
  }

  return (
    <>
      {/*
      <button onClick={() => setTool('circle')}>Circle</button>
      <button onClick={() => setTool('rect')}>Rect</button>
      */}
      <svg
        ref={elRef}
        className={styles.svg}
        width={INIT_WIDTH}
        height={INIT_HEIGHT}
        onClick={handleClick}
        onWheel={handleWheel}
        viewBox="0 0 500 500"
      >
        {cirlces.map(({ x, y }, i) => (
          <circle cx={x} cy={y} r={10} key={i} />
        ))}
        {rects.map(({ x, y }, i) => (
          <rect x={x} y={y} width={20} height={20} key={i} />
        ))}
      </svg>
    </>
  )
}
