import { URL } from 'node:url'

/**
 * A data class to provide information that be used for tiling images.
 */
export class TilingFile {

    /**
     * Use these files as source for tiling image.
     */
    public readonly srcFileUrls: Array<URL> = []

    /**
     * Destination filename(without extension) for writing tiled image.
     */
    public readonly dstFileName: string

    constructor(
        dstFileName: string,
        srcFileUrls: Array<URL>,
    ) {
        this.dstFileName = dstFileName
        this.srcFileUrls = srcFileUrls
    }
}
