import { Rect } from "../../main/graphics/Rect";

test('Verify Rect constructor', () => {
    const rect = new Rect(10, 20, 100, 200)
    expect(rect.x).toBe(10);
    expect(rect.y).toBe(20);
    expect(rect.width).toBe(100);
    expect(rect.height).toBe(200);
});

test('Verify Rect basic operator', () => {
    const rect = new Rect(10, 20, 100, 200)
    expect(rect.right()).toBe(110);
    expect(rect.bottom()).toBe(220);
    expect(rect.area()).toBe(20000);
});

test('Verify Rect factory method', () => {
    const rect = Rect.fromSize(100, 200)
    expect(rect.x).toBe(0);
    expect(rect.y).toBe(0);
    expect(rect.width).toBe(100);
    expect(rect.height).toBe(200);
});

test('Verify Rect.isIntersect', () => {
    // RectA contains RectB
    expect((new Rect(10, 10, 100, 100)).isOverlapped(new Rect(20, 20, 30, 30))).toBe(true);
    expect((new Rect(-1000, -1000, 100, 100)).isOverlapped(new Rect(-990, -990, 30, 30))).toBe(true);

    // RectA partially intersect RectB
    expect((new Rect(50, 50, 100, 100)).isOverlapped(new Rect(20, 20, 100, 100))).toBe(true);
    expect((new Rect(50, 50, 100, 100)).isOverlapped(new Rect(20, 70, 100, 100))).toBe(true);
    expect((new Rect(50, 50, 100, 100)).isOverlapped(new Rect(70, 20, 100, 100))).toBe(true);
    expect((new Rect(50, 50, 100, 100)).isOverlapped(new Rect(70, 70, 100, 100))).toBe(true);

    expect((new Rect(10, 10, 50, 50)).isOverlapped(new Rect(100, 100, 100, 100))).toBe(false);
    // one edge is same. But we don't regard it as "overlap"
    expect((new Rect(50, 50, 50, 50)).isOverlapped(new Rect(100, 80, 10, 10))).toBe(false);
    expect((new Rect(50, 50, 50, 50)).isOverlapped(new Rect(0, 0, 50, 100))).toBe(false);
});

test('Verify Rect.isAnyOverlapped', () => {
    const rect = new Rect(10, 10, 100, 400)
    const rects = [
        new Rect(0, 0, 50, 50),
        new Rect(100, 0, 50, 50),
        new Rect(0, 100, 50, 50),
        new Rect(100, 100, 50, 50),
    ]
    expect((new Rect(25, 25, 50, 50)).isAnyOverlapped(rects)).toBe(true);
    expect((new Rect(90, 90, 50, 50)).isAnyOverlapped(rects)).toBe(true);

    expect((new Rect(50, 50, 50, 50)).isAnyOverlapped(rects)).toBe(false);
    expect((new Rect(60, 60, 10, 10)).isAnyOverlapped(rects)).toBe(false);
    expect((new Rect(1000, 1000, 10, 10)).isAnyOverlapped(rects)).toBe(false);
});

test('Verify Rect.asAt', () => {
    const rect = new Rect(10, 10, 100, 400)
    const newRect = rect.asAt(200, 300)
    expect(newRect.x).toBe(200)
    expect(newRect.y).toBe(300)
    expect(newRect.width).toBe(100)
    expect(newRect.height).toBe(400)
});

test('Verify Rect.asSized', () => {
    const rect = new Rect(10, 10, 100, 400)
    const newRect = rect.asSized(200, 300)
    expect(newRect.x).toBe(10)
    expect(newRect.y).toBe(10)
    expect(newRect.width).toBe(200)
    expect(newRect.height).toBe(300)
});

test('Verify Rect.createContainer', () => {
    const rect = new Rect(10, 10, 100, 100)
    expect(Rect.createContainer(rect, new Rect(20, 20, 100, 100)))
        .toEqual(new Rect(10, 10, 110, 110))
    expect(Rect.createContainer(rect, new Rect(200, 200, 100, 100)))
        .toEqual(new Rect(10, 10, 290, 290))
    expect(Rect.createContainer(rect, new Rect(5, 5, 100, 100)))
        .toEqual(new Rect(5, 5, 105, 105))
});

test('Verify Rect.sortByArea 1', () => {
    const rects = [
        new Rect(10, 10, 10, 10),
        new Rect(10, 10, 10, 20),
        new Rect(10, 10, 300, 10),
        new Rect(10, 10, 30, 10),
        new Rect(10, 10, 10, 1),
    ]
    const sorted = Rect.sortByArea(rects)
    expect(sorted).toEqual([
        new Rect(10, 10, 300, 10),
        new Rect(10, 10, 30, 10),
        new Rect(10, 10, 10, 20),
        new Rect(10, 10, 10, 10),
        new Rect(10, 10, 10, 1),
    ])
});

test('Verify Rect.sortByArea 2', () => {
    const rects = [
        Rect.fromSize(200, 100),
        Rect.fromSize(50, 50),
        Rect.fromSize(200, 50),
        Rect.fromSize(100, 100),
    ]
    const sorted = Rect.sortByArea(rects)
    expect(sorted).toEqual([
        Rect.fromSize(200, 100),
        Rect.fromSize(200, 50),
        Rect.fromSize(100, 100),
        Rect.fromSize(50, 50),
    ])
});
