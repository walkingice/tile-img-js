import { URL } from 'node:url';
import { ImgMetadata } from "./ImgMetadata";

/**
 * A data structure to provide necessary information for tiling a image source.
 */
export class TilingImageSource {
    public readonly metadata: ImgMetadata
    public readonly fileUrl: URL

    constructor(metadata: ImgMetadata, fileUrl: URL) {
        this.metadata = metadata
        this.fileUrl = fileUrl
    }
}
