import * as NodeUrl from 'node:url';
import { TiledRect } from './TiledRect';
import { TilingImageSource } from './TilingImageSource';

/**
 * A data structure to provide necessary information for tiling images.
 */
export class TilingImage {

    public readonly destination: NodeUrl.URL
    public readonly sources: Array<TilingImageSource>
    public readonly tiledRect: TiledRect

    constructor(destination: NodeUrl.URL, tiledRect: TiledRect, sources: Array<TilingImageSource>) {
        this.destination = destination
        this.tiledRect = tiledRect
        this.sources = sources
        if (tiledRect.rects.length != sources.length) {
            throw new Error("size mismatch: source file numbers is different from rectangles numbers")
        }
    }
}