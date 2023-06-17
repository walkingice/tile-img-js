import { TiledRect } from "../model/TiledRect";
import { Point } from "./Point";
import { Rect } from "./Rect";

class Candidate {
    readonly point: Point
    readonly increasedArea: number
    readonly edgeDelta: number

    constructor(point: Point, increased: number, delta: number) {
        this.point = point
        this.increasedArea = increased
        this.edgeDelta = delta
    }
}

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
        let container = new Rect(0, 0, 0, 0)
        const notArranged: Array<Rect> = Rect.sortByArea(rects)
        const arranged: Array<Rect> = []
        const firstRect = notArranged.shift()
        arranged.push(firstRect)

        let anchors: Array<Point> = [
            new Point(firstRect.x + firstRect.width, 0),
            new Point(firstRect.x + firstRect.width, firstRect.y + firstRect.height),
            new Point(0, firstRect.y + firstRect.height),
        ]
        while (notArranged.length != 0) {
            let currentRect = notArranged.shift()
            let suggestedLocation = this.findSuggestLocation(container, arranged, anchors, currentRect)
            if (suggestedLocation != null) {
                let newArranged = currentRect.asAt(suggestedLocation.x, suggestedLocation.y)
                arranged.push(newArranged)

                container = Rect.createContainer(container, newArranged)

                // update points for next rect
                if (notArranged.length != 0) {
                    let newTopRight = new Point(newArranged.x + newArranged.width, newArranged.y)
                    let newBottomLeft = new Point(newArranged.x, newArranged.y + newArranged.height)
                    let newBottomRight = new Point(newArranged.x + newArranged.width, newArranged.y + newArranged.height)
                    anchors.push(newTopRight)
                    anchors.push(newBottomLeft)
                    anchors = Point.refine(anchors, newBottomRight)
                }
            }
        }

        // the function caller excepts get new Rectangles with same ordering and different (x, y)
        // because the function caller has other Array of file urls.
        // different ordering cause problem.
        //
        // returns rects array with original ordering(as given rects)
        // TODO: this is not good. need improvement.
        const sameOrdered = Array<Rect>()
        for (let originalR of rects) {
            for (let i = 0; i < arranged.length; i++) {
                let r = arranged[i]
                if (r.width == originalR.width && r.height == originalR.height) {
                    arranged.splice(i, 1)
                    sameOrdered.push(r)
                    break
                }
            }
        }

        return new TiledRect(container, sameOrdered)
    }

    /**
     * To find a point for new Rectt hat keeps container as smaller as possible
     * after adding new Rect.
     * @param container existing container that contains arranged Rects
     * @param arranged Rects that already properply arragned
     * @param testPoints possible point to be tested for newRect
     * @param newRect a Rect that will be added into arranged
     * @returns a suggested Point for newRect
     */
    static findSuggestLocation(
        container: Rect,
        arranged: Array<Rect>,
        testPoints: Array<Point>,
        newRect: Rect,
    ): Point {
        // find candidate points that can put newRect without overlapping
        const usablePoints: Array<Point> = []
        for (let point of testPoints) {
            let testRect = newRect.asAt(point.x, point.y)
            if (!testRect.isAnyOverlapped(arranged)) {
                usablePoints.push(point)
            }
        }

        const candidates: Array<Candidate> = usablePoints.map(p => {
            const rect = newRect.asAt(p.x, p.y)
            const newContainer = Rect.createContainer(container, rect)
            const areaDelta = newContainer.area() - container.area()
            const increasedArea = areaDelta > 0 ? areaDelta : 0
            const edgeDelta = Math.abs(newContainer.right() - container.right())
                + Math.abs(newContainer.bottom() - container.bottom())
            return new Candidate(p, increasedArea, edgeDelta)
        })

        const sorted = candidates.sort((cA: Candidate, cB: Candidate) => {
            if (cA.increasedArea == 0 && cB.increasedArea == 0) {
                return cA.point.isCloserToOriginThan(cB.point) ? -1 : 1
            }
            if (cA.increasedArea == 0 || cB.increasedArea == 0) {
                return cA.increasedArea - cB.increasedArea
            }

            if (cA.edgeDelta == cB.edgeDelta) {
                let aDistance = cA.point.getPowRadius()
                let bDistance = cB.point.getPowRadius()
                if (aDistance == bDistance) {
                    if (cA.point.x == cB.point.x) {
                        return cA.point.y - cB.point.y
                    } else {
                        // I want horizontal first
                        return cB.point.x - cA.point.x
                    }
                } else {
                    return aDistance - bDistance
                }
            }

            return cA.edgeDelta - cB.edgeDelta
        })

        const first = sorted.shift()
        if (first != null) {
            return first.point
        }
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
