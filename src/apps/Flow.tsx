import { useStore } from "@/store/flow"
import { Bounds } from "@/types/flow"
import { useState } from "react"
import styles from "./Flow.module.css"

const canvasLimits = {
    height: 2000,
    width: 2000
}


export default function App() {
    const state = useStore()
    const [bounds, setBounds] = useState<Bounds>(canvasLimits)
    return (
        <div className={styles.container}>
          <div className={styles.canvas} style={{
              "--canvas-width": `${bounds.width}px`,
              "--canvas-height": `${bounds.height}px`,
        } as React.CSSProperties}>

          </div>
        </div>
    )
}