import { MouseEvent, useState } from 'react'
import styles from './View.module.css'

export const View: React.FC = () => {
  const [cirlces, setCircles] = useState<{x: number, y: number}[]>([])
  const [rects, setRects] = useState<{x: number, y: number}[]>([])
  const [tool, setTool] = useState<'circle' | 'rect'>('circle')

  const handleClick = (e: MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.x
    const y = e.clientY - rect.y

    switch (tool) {
      case 'circle':
        setCircles((circles) => {
          return [...circles, {
            x: x,
            y: y,
          }]
        })
        break
      case 'rect':
        setRects((rects) => {
          return [...rects, {
            x: x,
            y: y,
          }]
        })
        break
      // case 'line':
      // case 'path':
      // case 'polygon':
      // case 'polyline':
    }
    
  }

  return (
    <>
    <button onClick={() => setTool('circle')}>Circle</button>
    <button onClick={() => setTool('rect')}>Rect</button>
    <svg
      className={styles.svg}
      width={500}
      height={500}
      onClick={handleClick}
    >
      {cirlces.map(({ x, y }, i) =>
        <circle cx={x} cy={y} r={10} key={i}/>)}
      {rects.map(({ x, y }, i) =>
        <rect x={x} y={y} width={20} height={20} key={i}/>)}
    </svg>
    </>
  )
}