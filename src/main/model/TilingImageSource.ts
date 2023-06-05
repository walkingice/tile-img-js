import * as NodeUrl from 'node:url';
import { ImgMetadata } from "./ImgMetadata";

/**
 * A data structure to provide necessary information for tiling a image source.
 */
export class TilingImageSource {
    public readonly metadata: ImgMetadata
    public readonly fileUrl: NodeUrl.URL

    constructor(metadata: ImgMetadata, fileUrl: NodeUrl.URL) {
        this.metadata = metadata
        this.fileUrl = fileUrl
    }
}
