import { useStore } from "@/store/flow"
import { Bounds } from "@/types/flow"
import { useEffect, useRef, useState } from "react"
import styles from "./Flow.module.css"

const canvasLimits = {
    height: 2000,
    width: 2000
}

export default function App() {
    const state = useStore()
    const [bounds, setBounds] = useState<Bounds>(canvasLimits)
    const [pan, setPan] = useState({ x: 0, y: 0 })
    const containerRef = useRef<HTMLDivElement>(null)
    const isDragging = useRef(false)
    const dragStart = useRef({ x: 0, y: 0 })
    const panStart = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const el = containerRef.current
        if (!el) return
        const prevent = (e: WheelEvent) => e.preventDefault()
        el.addEventListener('wheel', prevent, { passive: false })
        return () => el.removeEventListener('wheel', prevent)
    }, [])

    const onMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true
        dragStart.current = { x: e.clientX, y: e.clientY }
        panStart.current = { x: pan.x, y: pan.y }
    }

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current) return
        setPan({
            x: panStart.current.x + (e.clientX - dragStart.current.x),
            y: panStart.current.y + (e.clientY - dragStart.current.y),
        })
    }

    const onMouseUp = () => { isDragging.current = false }

    return (
        <div
            ref={containerRef}
            className={styles.container}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
        >
            <div
                className={styles.canvas}
                style={{
                    "--canvas-width": `${bounds.width}px`,
                    "--canvas-height": `${bounds.height}px`,
                    "--pan-x": `${pan.x}px`,
                    "--pan-y": `${pan.y}px`,
                } as React.CSSProperties}
                onMouseDown={onMouseDown}
            />
        </div>
    )
}
