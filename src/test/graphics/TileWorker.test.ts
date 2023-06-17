import { Point } from "../../main/graphics/Point";
import { Rect } from "../../main/graphics/Rect";
import { Test as TestObj, TileWorker } from "../../main/graphics/TileWorker";

test('Verify TileWorker.findSuggestLocation 1', () => {
    let container = new Rect(0, 0, 100, 50)
    let rects = [
        new Rect(0, 0, 50, 50), // r0
        new Rect(50, 0, 50, 50), // r1
        new Rect(0, 50, 50, 50), // r2
    ]
    let targetPoint = TileWorker.findSuggestLocation(
        container,
        rects,
        [
            new Point(0, 50),
            new Point(50, 0),
            new Point(50, 50),
            new Point(100, 0),
            new Point(100, 50),
            new Point(0, 100),
            new Point(50, 100),
        ],
        new Rect(0, 0, 50, 50) // rNew
    )
    // +--------+--------+
    // |        |        |
    // |   r0   |   r1   |
    // |        |        |
    // +--------+--------+
    // |        |        |
    // |   r2   |  rNew  |
    // |        |        |
    // +--------+--------+
    expect(targetPoint).toEqual(new Point(50, 50))
});


test('Verify TileWorker.findSuggestLocation 2', () => {
    let container = new Rect(0, 0, 100, 50)
    let rects = [
        new Rect(0, 0, 50, 50), // r0
        new Rect(50, 0, 50, 20), // r1
    ]
    let targetPoint = TileWorker.findSuggestLocation(
        container,
        rects,
        [
            new Point(0, 50),
            new Point(50, 0),
            new Point(50, 50),
            new Point(100, 0),
            new Point(50, 20),
            new Point(100, 20),
        ],
        new Rect(0, 0, 5, 5) // rNew
    )

    // +--------+--------+
    // |        |   r1   |
    // |   r0   +--+-----|
    // |        +--+ rNew
    // +--------+
    expect(targetPoint).toEqual(new Point(50, 20))
});

test('Verify TileWorker.findSuggestLocation 3', () => {
    let container = new Rect(0, 0, 100, 50)
    let rects = [
        new Rect(0, 0, 50, 50), // r0
        new Rect(50, 0, 50, 50), // r2
    ]
    let targetPoint = TileWorker.findSuggestLocation(
        container,
        rects,
        [
            new Point(0, 50),
            new Point(100, 0),
        ],
        new Rect(0, 0, 5, 5) // rNew
    )

    // +--------+--------+
    // |        |        |
    // |   r0   |   r1   |
    // |        |        |
    // +--+-----+--------+
    // +--+ rNew
    expect(targetPoint).toEqual(new Point(0, 50))
});

test('Verify TileWorker.findSuggestLocation 4', () => {
    let container = new Rect(0, 0, 100, 100)
    let rects = [
        new Rect(0, 0, 50, 50), // r0
        new Rect(50, 0, 50, 50), // r1
        new Rect(0, 50, 50, 50), // r2
        new Rect(50, 50, 50, 50), // r3
    ]
    let targetPoint = TileWorker.findSuggestLocation(
        container,
        rects,
        [
            new Point(50, 0),
            new Point(50, 50),
            new Point(0, 50),
            new Point(100, 0),
            new Point(100, 50),
            new Point(0, 100),
            new Point(50, 100),
        ],
        new Rect(0, 0, 50, 50) // rNew
    )

    // +--------+--------+--------+
    // |        |        |        |
    // |   r0   |   r1   |  rNew  |
    // |        |        |        |
    // +--------+--------+--------+
    // |        |        |
    // |   r2   |   r4   |
    // |        |        |
    // +--------+--------+
    expect(targetPoint).toEqual(new Point(100, 0))
});

test('Verify TileWorker.tileRects with valid Rects 1', () => {
    const tiled = TileWorker.tileRects([
        Rect.fromSize(100, 100),
        Rect.fromSize(100, 100),
        Rect.fromSize(100, 100),
        Rect.fromSize(100, 100),
    ])
    // +--------+--------+
    // |        |        |
    // |   r0   |   r1   |
    // |        |        |
    // +--------+--------+
    // |        |        |
    // |   r2   |   r4   |
    // |        |        |
    // +--------+--------+
    expect(tiled.rects.length).toBe(4);
    expect(tiled.container.width).toBe(200);
    expect(tiled.container.height).toBe(200);
    expect(tiled.rects[0]).toEqual(new Rect(0, 0, 100, 100));
    expect(tiled.rects[1]).toEqual(new Rect(100, 0, 100, 100));
    expect(tiled.rects[2]).toEqual(new Rect(0, 100, 100, 100));
    expect(tiled.rects[3]).toEqual(new Rect(100, 100, 100, 100));
});

test('Verify TileWorker.tileRects with valid Rects 2', () => {
    const tiled = TileWorker.tileRects([
        Rect.fromSize(100, 100),
        Rect.fromSize(100, 100),
        Rect.fromSize(100, 100),
        Rect.fromSize(100, 100),
        Rect.fromSize(100, 100),
    ])
    // +--------+--------+--------+
    // |        |        |        |
    // |   r0   |   r1   |   r4   |
    // |        |        |        |
    // +--------+--------+--------+
    // |        |        |
    // |   r2   |   r3   |
    // |        |        |
    // +--------+--------+

    expect(tiled.rects.length).toBe(5);
    expect(tiled.container.width).toBe(300);
    expect(tiled.container.height).toBe(200);
    expect(tiled.rects[0]).toEqual(new Rect(0, 0, 100, 100));
    expect(tiled.rects[1]).toEqual(new Rect(100, 0, 100, 100));
    expect(tiled.rects[2]).toEqual(new Rect(0, 100, 100, 100));
    expect(tiled.rects[3]).toEqual(new Rect(100, 100, 100, 100));
    expect(tiled.rects[4]).toEqual(new Rect(200, 0, 100, 100));
});

test('Verify TileWorker.tileRects with valid Rects 3', () => {
    const tiled = TileWorker.tileRects([
        Rect.fromSize(100, 100),
        Rect.fromSize(100, 100),
        Rect.fromSize(100, 100),
    ])
    // +--------+--------+
    // |        |        |
    // |   r0   |   r1   |
    // |        |        |
    // +--------+--------+
    // |        |
    // |   r2   |
    // |        |
    // +--------+
    expect(tiled.rects.length).toBe(3);
    expect(tiled.container.width).toBe(200);
    expect(tiled.container.height).toBe(200);
    expect(tiled.rects[0]).toEqual(new Rect(0, 0, 100, 100));
    expect(tiled.rects[1]).toEqual(new Rect(100, 0, 100, 100));
    expect(tiled.rects[2]).toEqual(new Rect(0, 100, 100, 100));
});

test('Verify TileWorker.tileRects with valid Rects 4', () => {
    const tiled = TileWorker.tileRects([
        Rect.fromSize(100, 100), // r0
        Rect.fromSize(100, 100), // r1
        Rect.fromSize(50, 50), // r2
        Rect.fromSize(100, 100), // r3
    ])
    // +--------+--------+
    // |        |        |
    // |   r0   |   r1   |
    // |        |        |
    // +--------+----+---+
    // |        | r2 |
    // |   r3   +----+
    // |        |
    // +--------+
    expect(tiled.rects.length).toBe(4);
    expect(tiled.container.width).toBe(200);
    expect(tiled.container.height).toBe(200);
    expect(tiled.rects[0]).toEqual(new Rect(0, 0, 100, 100));
    expect(tiled.rects[1]).toEqual(new Rect(100, 0, 100, 100));
    expect(tiled.rects[2]).toEqual(new Rect(100, 100, 50, 50));
    expect(tiled.rects[3]).toEqual(new Rect(0, 100, 100, 100));
});

test('Verify TileWorker.tileRects with valid Rects 5', () => {
    const tiled = TileWorker.tileRects([
        Rect.fromSize(200, 50), // r0
        Rect.fromSize(100, 100), // r1
        Rect.fromSize(200, 100), // r2
        Rect.fromSize(50, 50), // r3
    ])
    // +-----------------+
    // |                 |
    // |       r2        |
    // |                 |
    // +-----------------+
    // |       r0        |
    // +-------------+---+
    // |        | r3 |
    // |   r1   |----+
    // |        |
    // +--------+
    expect(tiled.rects.length).toBe(4);
    expect(tiled.container.width).toBe(200);
    expect(tiled.container.height).toBe(250);
    expect(tiled.rects[0]).toEqual(new Rect(0, 100, 200, 50));
    expect(tiled.rects[1]).toEqual(new Rect(0, 150, 100, 100));
    expect(tiled.rects[2]).toEqual(new Rect(0, 0, 200, 100));
    expect(tiled.rects[3]).toEqual(new Rect(100, 150, 50, 50));
});

test('Verify TileWorker sanityRects with valid Rects', () => {
    // disable console.warn, beacuse we already expect it will be invoked in our test
    jest.spyOn(global.console, 'warn').mockImplementation(jest.fn())

    const rects = [
        Rect.fromSize(100, 100),
        Rect.fromSize(100, 200),
        Rect.fromSize(200, 100),
    ]
    expect(TestObj.sanityRects(rects)).toBe(true);
});

test('Verify TileWorker sanityRects with empty Rect', () => {
    // disable console.warn, beacuse we already expect it will be invoked in our test
    jest.spyOn(global.console, 'warn').mockImplementation(jest.fn())
    expect(TestObj.sanityRects([])).toBe(false);
});

test('Verify TileWorker sanityRects with one invalid Rect', () => {
    // disable console.warn, beacuse we already expect it will be invoked in our test
    jest.spyOn(global.console, 'warn').mockImplementation(jest.fn())

    const rects = [
        new Rect(0, 0, 500, 100),
        new Rect(0, 1, 500, 100)
    ]
    expect(TestObj.sanityRects(rects)).toBe(false);
});
