/// <reference types="vite/client" />

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>
    export default component
}

declare module 'polygon-clipping' {
    export type Ring = [number, number][]
    export type Poly = Ring[]
    export type MultiPoly = Poly[]
    const polygonClipping: {
        intersection(geom: MultiPoly, ...geoms: MultiPoly[]): MultiPoly
    }
    export default polygonClipping
}
