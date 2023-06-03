import * as NodeFs from 'fs';
import * as NodeUrl from 'node:url';
import * as NodePath from 'node:path'
import * as PngJs from 'pngjs';
import { TilingImageProvider } from './TilingImageProvider';
import { Rect } from './graphics/Rect';
import { TilingImage } from "./model/TilingImage";
import { TilingImageSource } from './model/TilingImageSource';
import { FileUtil } from './file/FileUtil';

export class TileImage {
    static async handleDir(
        startDirUrl: NodeUrl.URL,
        outputDirUrl: NodeUrl.URL,
    ) {
        const tilingImages: Array<TilingImage> = await TilingImageProvider.readDir(startDirUrl, outputDirUrl)
        for (let tiling of tilingImages) {
            await generateTileImage(tiling)
        }
        return
    }
}

async function generateTileImage(tilingImage: TilingImage): Promise<void> {
    const outputPath: string = NodeUrl.fileURLToPath(tilingImage.destination)
    const outputPng = new PngJs.PNG({
        width: tilingImage.tiledRect.container.width,
        height: tilingImage.tiledRect.container.height
    })
    for (let i = 0; i < tilingImage.sources.length; i++) {
        const src: TilingImageSource = tilingImage.sources[i]
        const srcRect: Rect = tilingImage.tiledRect.rects[i]
        const srcPath: string = NodeUrl.fileURLToPath(src.fileUrl)
        const parsedPng: PngJs.PNG = await parsePngFile(srcPath)
        parsedPng.bitblt(outputPng, 0, 0, parsedPng.width, parsedPng.height, srcRect.x, srcRect.y)
    }

    // ensure output dir exists
    const outputDirPath = NodePath.dirname(outputPath).toLocaleLowerCase()
    FileUtil.createDirSync(NodeUrl.pathToFileURL(outputDirPath))

    const outputStream = NodeFs.createWriteStream(outputPath)
    outputPng.pack().pipe(outputStream)
    return new Promise<void>((resolve, reject) => {
        outputStream
            .on('error', (e) => { reject(e) })
            .on('finish', () => { resolve() })
    })
}

function parsePngFile(srcPath): Promise<PngJs.PNG> {
    const fsStream = NodeFs.createReadStream(srcPath)
    const pngStream = new PngJs.PNG()
    return new Promise((resolve, reject) => {
        fsStream.pipe(pngStream)
            .on('error', (e) => { reject(e) })
            .on('parsed', () => { resolve(pngStream) })
    })
}

// expose functions for testing.
export const Test = {
    generateTileImage
}
