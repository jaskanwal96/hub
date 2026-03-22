import { useStore } from "@/store/flow"
import { Bounds } from "@/types/flow"
import { useState } from "react"

const canvasLimits = {
    height: 2000,
    width: 2000
}


export default function App() {
    const state = useStore()
    const [limits, setLimit] = useState<Bounds>()
    setLimit(canvasLimits)
    return (
        <div className="flow-container">Flow</div>
    )
}