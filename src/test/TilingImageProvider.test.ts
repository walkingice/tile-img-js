import * as NodeUrl from 'node:url';
import { Test as TestObj, TilingImageProvider } from '../main/TilingImageProvider';
import { TilingFile } from '../main/file/TilingFile';
import { Rect } from '../main/graphics/Rect';

test('Verify TilingImageProvider.readDir', async () => {
    // disable console.warn, beacuse we already expect it will be invoked in our test
    jest.spyOn(global.console, 'warn').mockImplementation(jest.fn())

    const startDir: NodeUrl.URL = NodeUrl.pathToFileURL("src/test/assets/")
    const outpuDir: NodeUrl.URL = NodeUrl.pathToFileURL("path/to/output/")
    const results = await TilingImageProvider.readDir(startDir, outpuDir)
    expect(results.length).toEqual(4)
    expect(results[0].destination).toEqual(NodeUrl.pathToFileURL("path/to/output/group1.png"))
    expect(results[1].destination).toEqual(NodeUrl.pathToFileURL("path/to/output/group2.png"))
    expect(results[2].destination).toEqual(NodeUrl.pathToFileURL("path/to/output/group3.png"))
    expect(results[3].destination).toEqual(NodeUrl.pathToFileURL("path/to/output/group4.png"))
})

test('Verify TilingImageProvider.parseTilingFile', async () => {
    const outpuDir: NodeUrl.URL = NodeUrl.pathToFileURL("path/to/output/")
    const tilingFile = new TilingFile(
        "dest.png",
        [
            NodeUrl.pathToFileURL("src/test/assets/group1/img_1.png"),
            NodeUrl.pathToFileURL("src/test/assets/group1/img_2.png"),
            NodeUrl.pathToFileURL("src/test/assets/group1/img_3.png"),
        ]
    )
    const result = await TestObj.parse(outpuDir, tilingFile)
    expect(result).not.toBe(null)
    expect(result.destination).toEqual(NodeUrl.pathToFileURL("path/to/output/dest.png"))
    expect(result.tiledRect.rects.length).toEqual(3)
    expect(result.sources.length).toEqual(3)
    expect(result.sources[0].fileUrl).toEqual(NodeUrl.pathToFileURL("src/test/assets/group1/img_1.png"))
    expect(result.sources[1].fileUrl).toEqual(NodeUrl.pathToFileURL("src/test/assets/group1/img_2.png"))
    expect(result.sources[2].fileUrl).toEqual(NodeUrl.pathToFileURL("src/test/assets/group1/img_3.png"))
    expect(result.sources[0].metadata.width).toEqual(256)
    expect(result.sources[0].metadata.height).toEqual(256)
    expect(result.sources[1].metadata.width).toEqual(256)
    expect(result.sources[1].metadata.height).toEqual(256)
    expect(result.sources[2].metadata.width).toEqual(256)
    expect(result.sources[2].metadata.height).toEqual(256)
    // current simple implementation, only arranges rects in horizontal
    expect(result.tiledRect.rects[0]).toEqual(new Rect(0, 0, 256, 256));
    expect(result.tiledRect.rects[1]).toEqual(new Rect(256, 0, 256, 256));
    expect(result.tiledRect.rects[2]).toEqual(new Rect(0, 256, 256, 256));
    expect(result.tiledRect.container).toEqual(new Rect(0, 0, 512, 512))
})
