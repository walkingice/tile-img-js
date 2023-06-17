export class Point {
    readonly x: number = 0
    readonly y: number = 0
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    isSame(other: Point): boolean {
        return this.x == other.x && this.y == other.y
    }

    getPowRadius(): number {
        return this.x * this.x + this.y * this.y
    }

    isCloserToOriginThan(other: Point): boolean {
        if (other == null) {
            return true
        }
        return this.x * this.x + this.y * this.y < other.x * other.x + other.y * other.y
    }

    // return a new Array that contains points + newPoint, and sort it also remove duplicated
    static refine(points: Array<Point>, newPoint: Point): Array<Point> {
        const full = [newPoint].concat(points)
        // sort by X-axis first, then Y-axis
        const sorted = full.sort((pA, pB) => (pA.x != pB.x) ? (pA.x - pB.x) : (pA.y - pB.y))
        const uniq = []
        sorted.forEach((current) => {
            if (uniq.length == 0) {
                uniq.push(current)
            } else {
                (!uniq.at(-1).isSame(current)) && uniq.push(current)
            }
        })
        return uniq
    }
}
