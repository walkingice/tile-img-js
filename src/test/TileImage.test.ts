import * as NodeFs from 'node:fs'
import * as NodePath from 'node:path'
import * as NodeUrl from 'node:url'
import * as OS from 'os'
import * as PngJs from 'pngjs';
import { Test as TestObj, TileImage } from "../main/TileImage"
import { Rect } from '../main/graphics/Rect'
import { ImgMetadata } from '../main/model/ImgMetadata'
import { TiledRect } from '../main/model/TiledRect'
import { TilingImage } from '../main/model/TilingImage'
import { TilingImageSource } from '../main/model/TilingImageSource'

const tmpDirPrefix: string = 'test-tile-img'
let tmpDir: string
beforeEach(() => { tmpDir = prepareTmpDir() })
afterEach(() => { clearTmpDir(tmpDir) })

test('Verify Prepare tmpDir successfully', async () => {
    expect(tmpDir).not.toBe(null)

    const dstDirUrl = NodeUrl.pathToFileURL(tmpDir)
    expect(dstDirUrl).not.toBe(null)

    const dirPath: string = NodeUrl.fileURLToPath(dstDirUrl)
    let stats: NodeFs.Stats = NodeFs.lstatSync(dirPath)
    expect(stats.isDirectory()).toBe(true)
})

test('Verify TilImage.generateTileImage', async () => {
    // prepare
    const dirPath: string = NodePath.join(tmpDir, "newdir1", "newdir2")
    const outputUrl: NodeUrl.URL = NodeUrl.pathToFileURL(NodePath.join(dirPath, "output.png"))
    const withTwoRects: TiledRect = new TiledRect(
        Rect.fromSize(512, 256),
        [new Rect(0, 0, 256, 256), new Rect(256, 0, 512, 256)]
    )
    const oneSource: Array<TilingImageSource> = [
        new TilingImageSource(new ImgMetadata(256, 256), NodeUrl.pathToFileURL("src/test/assets/group1/img_1.png")),
        new TilingImageSource(new ImgMetadata(256, 256), NodeUrl.pathToFileURL("src/test/assets/group1/img_2.png"))
    ]
    const tilingImage = new TilingImage(outputUrl, withTwoRects, oneSource)

    // run
    await TestObj.generateTileImage(tilingImage)

    // verify file created successfully
    const outputPath: string = NodeUrl.fileURLToPath(outputUrl)
    let stats: NodeFs.Stats = NodeFs.lstatSync(outputPath)
    expect(stats.isFile()).toBe(true)
    // verify file metadata
    const buffer = NodeFs.readFileSync(outputPath)
    const outputPng: PngJs.PNG = PngJs.PNG.sync.read(buffer)
    expect(outputPng.width).toBe(512)
    expect(outputPng.height).toBe(256)
})

test('Verify TilImage.handleDir', async () => {
    // disable console.error, beacuse we already expect it will be invoked in our test
    jest.spyOn(global.console, 'warn').mockImplementation(jest.fn())

    expect(tmpDir).not.toBe(null)

    const srcDirUrl = NodeUrl.pathToFileURL("src/test/assets/")
    const dstDirUrl = NodeUrl.pathToFileURL(tmpDir)

    await TileImage.handleDir(srcDirUrl, dstDirUrl)

    const dirPath: string = NodeUrl.fileURLToPath(dstDirUrl)
    let stats: NodeFs.Stats = NodeFs.lstatSync(dirPath)
    expect(stats.isDirectory()).toBe(true)

    const group1Stats: NodeFs.Stats = NodeFs.lstatSync(NodePath.join(tmpDir, "group1.png"))
    const group2Stats: NodeFs.Stats = NodeFs.lstatSync(NodePath.join(tmpDir, "group2.png"))
    expect(group1Stats.isFile()).toBe(true)
    expect(group2Stats.isFile()).toBe(true)
})

function prepareTmpDir(): string {
    return NodeFs.mkdtempSync(NodePath.join(OS.tmpdir(), tmpDirPrefix));
}
function clearTmpDir(dirPath: string) {
    NodeFs.rmSync(dirPath, { recursive: true })
}

