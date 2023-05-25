import { Rect } from "../../main/graphics/Rect";

test('Verify Rect constructor', () => {
    const rect = new Rect(10, 20, 100, 200)
    expect(rect.x).toBe(10);
    expect(rect.y).toBe(20);
    expect(rect.width).toBe(100);
    expect(rect.height).toBe(200);
});

test('Verify Rect factory method', () => {
    const rect = Rect.fromSize(100, 200)
    expect(rect.x).toBe(0);
    expect(rect.y).toBe(0);
    expect(rect.width).toBe(100);
    expect(rect.height).toBe(200);
});
