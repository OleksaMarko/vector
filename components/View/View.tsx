import { MouseEvent, useState } from 'react'
import styles from './View.module.css'

export const View: React.FC = () => {
  const [cirlces, setCircles] = useState<{x: number, y: number}[]>([])

  const handleClick = (e: MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.x
    const y = e.clientY - rect.y

    setCircles((circles) => {
      return [...circles, {
        x: x,
        y: y,
      }]
    })
  }

  return (
    <svg
      className={styles.svg}
      width={500}
      height={500}
      onClick={handleClick}
    >
      {cirlces.map(({ x, y }, i) =>
        <circle cx={x} cy={y} r={10} key={i}/>)}
    </svg>
  )
}