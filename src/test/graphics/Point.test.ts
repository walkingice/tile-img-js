import { Point } from "../../main/graphics/Point";

test('Verify Point constructor', () => {
    const point = new Point(10, 20)
    expect(point.x).toBe(10);
    expect(point.y).toBe(20);
});

test('Verify Point isSame', () => {
    const pointA = new Point(10, 20)
    const pointB = new Point(10, 20)
    const pointC = new Point(10, 21)
    expect(pointA.isSame(pointB)).toBe(true);
    expect(pointA.isSame(pointC)).toBe(false);
});

test('Verify Point getPowRadius', () => {
    expect((new Point(10, 10)).getPowRadius()).toEqual(200);
    expect((new Point(20, 10)).getPowRadius()).toEqual(500);
});

test('Verify Point isCloserToOriginThan', () => {
    const point = new Point(10, 10)
    expect(point.isCloserToOriginThan(null)).toBe(true);
    expect(point.isCloserToOriginThan(new Point(10, 11))).toBe(true);
    expect(point.isCloserToOriginThan(new Point(10, 9))).toBe(false);
});

test('Verify Point refine function', () => {
    const newPoint = new Point(17, 0)
    const points = [
        new Point(10, 20),
        new Point(10, 20),
        new Point(20, 50),
        new Point(20, 50),
        new Point(50, 20),
        new Point(50, 20),
        new Point(15, 20),
        new Point(15, 20),
    ]
    const refined = Point.refine(points, newPoint)

    // original array should not be changed
    expect(points.length).toBe(8);
    expect(refined).toEqual([
        new Point(10, 20),
        new Point(15, 20),
        new Point(17, 0),
        new Point(20, 50),
        new Point(50, 20),
    ]);
});

