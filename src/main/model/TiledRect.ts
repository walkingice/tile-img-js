import { Rect } from "../graphics/Rect";

/**
 * A data strcuture to present several tiled rectangles.
 */
export class TiledRect {

    public readonly container: Rect
    public readonly rects: Rect[]

    constructor(container: Rect, rects: Rect[]) {
        this.container = container
        this.rects = rects
    }
}