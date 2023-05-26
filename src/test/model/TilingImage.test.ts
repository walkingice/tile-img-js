import { TiledRect } from "../../main/model/TiledRect"
import { TilingImage } from "../../main/model/TilingImage"
import * as NodeUrl from 'node:url'
import { Rect } from "../../main/graphics/Rect"
import { TilingImageSource } from "../../main/model/TilingImageSource"
import { ImgMetadata } from "../../main/model/ImgMetadata"

test('Verify TilingImage constructore', () => {
    const destination: NodeUrl.URL = NodeUrl.pathToFileURL("/foo/bar")
    const withTwoRects: TiledRect = new TiledRect(
        Rect.fromSize(100, 100),
        [Rect.fromSize(10, 10), Rect.fromSize(10, 10)]
    )
    const oneSource: Array<TilingImageSource> = [
        new TilingImageSource(new ImgMetadata(100, 100), NodeUrl.pathToFileURL("/img1")),
        new TilingImageSource(new ImgMetadata(100, 100), NodeUrl.pathToFileURL("/img2"))
    ]
    const tilingImage = new TilingImage(destination, withTwoRects, oneSource)
    expect(tilingImage.destination).not.toBe(null)
    expect(tilingImage.sources).not.toBe(null)
    expect(tilingImage.tiledRect.rects.length).toBe(2)
});

test('Verify TilingImage constructore failed with wrong size', () => {
    const destination: NodeUrl.URL = NodeUrl.pathToFileURL("/foo/bar")
    const withTwoRects: TiledRect = new TiledRect(
        Rect.fromSize(100, 100),
        [Rect.fromSize(10, 10), Rect.fromSize(10, 10)]
    )
    const oneSource: Array<TilingImageSource> = [
        new TilingImageSource(new ImgMetadata(100, 100), NodeUrl.pathToFileURL("/img1"))
    ]
    expect(() => new TilingImage(destination, withTwoRects, oneSource))
        .toThrowError(/^size mismatch/)
});
