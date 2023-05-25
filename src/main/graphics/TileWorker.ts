import { TiledRect } from "../model/TiledRect";
import { Rect } from "./Rect";

/**
 * A class to implements algorithm for tiling rectangles.
 */
export class TileWorker {

    /**
     * Use very simple way to tile rectangles. Currently only arrange given rectangles from left
     * to right, horizontally.
     *
     * @param rects rectangles to be tiled
     * @returns tiled result
     */
    static tileRects(rects: Rect[]): TiledRect {
        if (!sanityRects(rects)) {
            return null
        }
        const width = rects.reduce(
            (saved: number, currentRect: Rect) => saved + currentRect.width,
            0
        )
        const height = rects.reduce(
            (saved: number, currentRect: Rect) =>
                (saved > currentRect.height) ? saved : currentRect.height,
            0
        )
        const container = Rect.fromSize(width, height)

        const arranged: Rect[] = []
        rects.reduce(
            (previousRight: number, currentRect: Rect) => {
                arranged.push(new Rect(previousRight, 0, currentRect.width, currentRect.height))
                // next rect X = current.Right = current.X + current.Width
                return previousRight + currentRect.width
            },
            0
        )
        return new TiledRect(container, arranged)
    }
}

function sanityRects(rects: Rect[]): boolean {
    if (rects.length == 0) {
        console.warn("Given 0 retangles, no idea how to tile")
        return false
    }

    const notAtOriginal = rects.filter((r) => r.x != 0 || r.y != 0)
    if (notAtOriginal.length != 0) {
        notAtOriginal.forEach((r) => console.warn(`rectangle not at original, but at [${r.x}, ${r.y}]`))
        return false
    }

    return true
}

// expose functions for testing.
export const Test = {
    sanityRects,
}
