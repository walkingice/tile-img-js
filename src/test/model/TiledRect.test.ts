import { Rect } from "../../main/graphics/Rect";
import { TiledRect } from "../../main/model/TiledRect";

test('Verify TiledRect constructor', () => {
    const container = Rect.fromSize(500, 100)
    const rect1 = Rect.fromSize(10, 20)
    const rect2 = Rect.fromSize(10, 20)
    const tiled = new TiledRect(container, [rect1, rect2])
    expect(tiled.container).toBe(container);
    expect(tiled.rects[0]).toBe(rect1);
    expect(tiled.rects[1]).toBe(rect2);
});
