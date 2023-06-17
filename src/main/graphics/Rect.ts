/**
 * A data structure to present a Rectangle.
 */
export class Rect {

    public readonly x: number
    public readonly y: number
    public readonly width: number
    public readonly height: number

    constructor(
        x: number = 0,
        y: number = 0,
        width: number,
        height: number) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }

    static fromSize(width: number, height: number): Rect {
        return new Rect(0, 0, width, height)
    }

    // sort from Large to Small
    static sortByArea(array: Array<Rect>): Array<Rect> {
        const unsorted = [].concat(array)
        const sorted = unsorted.sort((rA, rB) => {
            // larger Rect first
            const areaDiff = rB.width * rB.height - rA.width * rA.height
            if (areaDiff != 0) {
                return areaDiff
            }
            // longer width first
            if (rA.width != rB.width) {
                return rB.width - rA.width
            }
            // longer height first
            if (rA.height != rB.height) {
                return rB.height - rA.height
            }
            // smaller x first
            if (rA.x != rB.x) {
                return rA.x - rB.x
            }
            // smaller y first
            return rA.y - rB.y
        })

        return sorted
    }

    // create new Rect that contains this and that
    static createContainer(rA: Rect, rB: Rect) {
        const left = Math.min(rA.x, rB.x)
        const top = Math.min(rA.y, rB.y)
        const right = Math.max(rA.x + rA.width, rB.x + rB.width)
        const bottom = Math.max(rA.y + rA.height, rB.y + rB.height)
        return new Rect(left, top, right - left, bottom - top)
    }

    area(): number {
        return this.width * this.height
    }

    right(): number {
        return this.x + this.width
    }

    bottom(): number {
        return this.y + this.height
    }

    isOverlapped(other: Rect): Boolean {
        const x1 = Math.max(this.x, other.x)
        const x2 = Math.min(this.x + this.width, other.x + other.width)
        if (x1 >= x2) {
            return false
        }
        const y1 = Math.max(this.y, other.y)
        const y2 = Math.min(this.y + this.height, other.y + other.height)
        if (y1 >= y2) {
            return false
        }
        return true
    }

    isAnyOverlapped(rects: Array<Rect>): Boolean {
        for (let r of rects) {
            if (this.isOverlapped(r)) {
                return true
            }
        }
        return false
    }

    // create new Rect at (x, y) with same size
    asAt(x: number, y: number): Rect {
        return new Rect(x, y, this.width, this.height)
    }

    // create new Rect with (width, height) at same location
    asSized(width: number, height: number): Rect {
        return new Rect(this.x, this.y, width, height)
    }

    clone(): Rect {
        return new Rect(
            this.x,
            this.y,
            this.width,
            this.height
        )
    }
}
