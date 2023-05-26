import * as NodeUrl from 'node:url'
import { DirWalker } from './file/DirWalker'
import { TilingFile } from './file/TilingFile'
import { Rect } from './graphics/Rect'
import { TileWorker } from './graphics/TileWorker'
import { MetadataReader } from './image/MetadataReader'
import { TilingImage } from './model/TilingImage'
import { TilingImageSource } from './model/TilingImageSource'
import { NodeUtil } from './util/NodeUtil'

export class TilingImageProvider {

    static async readDir(
        startDirUrl: NodeUrl.URL,
        outputDirUrl: NodeUrl.URL,
    ): Promise<Array<TilingImage>> {
        const tilingFiles: Array<TilingFile> = DirWalker.walkDirSync(startDirUrl)
        const results: Array<TilingImage> = []
        for (let i = 0; i < tilingFiles.length; i++) {
            let src = tilingFiles[i]
            let result = await parseTilingFile(outputDirUrl, src)
            results.push(result)
        }
        return results
    }
}

// Give output dir and input files, returns all necessary information for creating tiled image.
async function parseTilingFile(outputDir: NodeUrl.URL, tilingFile: TilingFile): Promise<TilingImage> {
    // read metadata for all images
    const metadata = []
    for (let i = 0; i < tilingFile.srcFileUrls.length; i++) {
        let srcUrl = tilingFile.srcFileUrls[i]
        let m = await MetadataReader.getMetadata(srcUrl)
        metadata.push(m)
    }
    // create source information by preparing TilingImageSource
    const sources: Array<TilingImageSource> = []
    for (let i = 0; i < metadata.length; i++) {
        sources.push(new TilingImageSource(metadata[i], tilingFile.srcFileUrls[i]))
    }

    // creates Rects and calculate tiled Rect
    const srcRects = metadata.map(m => Rect.fromSize(m.width, m.height))
    const tiledRect = TileWorker.tileRects(srcRects)

    const destinationUrl: NodeUrl.URL = NodeUtil.appendFileName(outputDir, tilingFile.dstFileName)
    const tilingImage = new TilingImage(destinationUrl, tiledRect, sources)
    return tilingImage
}

// expose functions for testing.
export const Test = {
    parse: parseTilingFile,
}
