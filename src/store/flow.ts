import { create } from 'zustand'
import { BaseNode } from '@/types/flow'

interface FlowStore {
    nodes: BaseNode[]
    getNode: (nodeId: string) => BaseNode | undefined
    addNode: (node: BaseNode) => void
    removeNode: (nodeId: string) => void
    connectNode: (parentNode: BaseNode, childNode: BaseNode) => void 
}

export const useStore = create<FlowStore>((set, get) => ({
    nodes: [],
    getNode: (nodeId: string) => get().nodes.find(n => n.id === nodeId),
    addNode: (node: BaseNode) => {
      set((state) => ({ nodes: [...state.nodes, node]}))
    },
    removeNode: (nodeId: string) => {
      set((state) => ({nodes: state.nodes.filter(n => n.id !== nodeId)}))
    },
    connectNode: (parentNode, childNode) => {
      set((state) => ({
        nodes: state.nodes.map(n => n.id === parentNode.id ? {
          ...n,
          relations: [...n.relations, childNode]
        }: n)
      }))
    },   
  }
 )
)