export const Shape = ['RECTANGLE', 'CIRCLE', 'PARALLELOGRAM'] as const


export interface BaseNode {
    id: string
    name: string
    type: typeof Shape[number]
    description: string
    relations: BaseNode[]
}

export interface Bounds {
    height: number
    width: number
}