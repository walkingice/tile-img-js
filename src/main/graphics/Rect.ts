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
}
