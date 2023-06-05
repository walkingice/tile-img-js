import * as NodeFs from 'node:fs';
import * as NodeUrl from 'node:url';
import * as PngJs from 'pngjs';
import { ImgMetadata } from "../model/ImgMetadata";

/**
 * A class to parse metadata from given URL of image file.
 */
export class MetadataReader {
    static getMetadata(fileUrl: NodeUrl.URL): Promise<ImgMetadata> {
        const path = NodeUrl.fileURLToPath(fileUrl)
        const fsStream = NodeFs.createReadStream(path)
        const pngStream = new PngJs.PNG({ filterType: 4 })
        return new Promise((resolve, reject) => {
            fsStream
                .on('error', (e) => {
                    console.error(e)
                    reject(e)
                })
                .pipe(pngStream)
                .on('error', (e) => {
                    console.error(e)
                })
                .on('metadata', (metadata) => {
                    const meta = new ImgMetadata(
                        metadata.width,
                        metadata.height
                    )
                    resolve(meta)
                })
                .on('error', (e) => {
                    console.error(e)
                })
        })
    }
}