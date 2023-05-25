import { Rect } from "../../main/graphics/Rect";
import { TileWorker } from "../../main/graphics/TileWorker";
import { Test as TestObj } from "../../main/graphics/TileWorker";

test('Verify TileWorker.tileRects with valid Rects', () => {
    const tiled = TileWorker.tileRects([
        Rect.fromSize(100, 100),
        Rect.fromSize(150, 200),
        Rect.fromSize(200, 100),
    ])
    expect(tiled).not.toBe(null);
    expect(tiled.container.width).toBe(450);
    expect(tiled.container.height).toBe(200);
    // +-----+------+--------+
    // | r0  |  r1  |   r2   |
    // +-----|      +--------+
    //       |      |
    //       +------+
    expect(tiled.rects.length).toBe(3);
    expect(tiled.rects[0]).toEqual(new Rect(0, 0, 100, 100));
    expect(tiled.rects[1]).toEqual(new Rect(100, 0, 150, 200));
    expect(tiled.rects[2]).toEqual(new Rect(250, 0, 200, 100));
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
