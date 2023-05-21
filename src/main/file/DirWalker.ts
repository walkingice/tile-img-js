import * as NodeFs from 'node:fs'
import * as NodePath from 'node:path'
import { URL, fileURLToPath } from 'node:url'
import { ImageType } from '../image/ImageType'
import { FileChecker } from './FileChecker'
import { TilingFile } from './TilingFile'
import { FileUtil } from './FileUtil'

/**
 * An util class to traversal given directory and to return corresponding set of [TilingFile].
 */
export class DirWalker {
    /**
     * A blocking function to walk a directory by searching its child directories. (depth is only 1)
     *
     * Assume you have such files structure
     * <ProjectRoot>
     * └── src
     *     └── test
     *         └── assets
     *             ├── group1
     *             │   ├── img_1.png
     *             │   ├── img_2.png
     *             │   ├── img_3.png
     *             │   ├── img_4.png
     *             │   └── img_5.jpg
     *             └── group2
     *                 ├── img_1.png
     *                 ├── img_2.png
     *                 └── img_3.png
     *
     * Use `url.pathToFileURL("/src/test/assets/")` to build a URL. Path starts from Project root.
     * Then this function use "group1" and "group2" as output files name for tiling images.
     *
     * @param startDirUrl a URL points to the directory that be checked.
     * @returns TilingFile if given directory is usable. Otherwise, returns null.
     */
    static walkDirSync(startDirUrl: URL): Array<TilingFile> {
        FileUtil.ensureDirSync(startDirUrl)
        const dirPath: string = fileURLToPath(startDirUrl)
        const subDirs = NodeFs.readdirSync(dirPath, { withFileTypes: true })
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => dirent.name)
            .map((dirName: string) => { return new URL(dirName, startDirUrl) })
        return subDirs.map(readDirSync)
    }
}

/**
 * For a give URL of directory, use the directory name as Output file name,
 *  and those supported image files in the directory as Source. Returns a TilingFile.
 */
function readDirSync(dirUrl: URL): TilingFile {
    FileUtil.ensureDirSync(dirUrl)
    const dirPath: string = fileURLToPath(dirUrl)
    const supportedFilesUrl = NodeFs.readdirSync(dirPath)
        .filter(verifyFileName)
        .map((fileName: string) => { return new URL(fileName, dirUrl) })
    if (supportedFilesUrl.length > 0) {
        const baseOutputFilename: string = NodePath.basename(dirPath)
        const outputFileName: string = ImageType.appendExtension(baseOutputFilename)
        return new TilingFile(outputFileName, supportedFilesUrl)
    }
    return null
}

function verifyFileName(fileName: string): boolean {
    if (!FileChecker.isSupported(fileName)) {
        console.warn(`Skip not supported file: ${fileName}`)
        return false
    }
    return true
}

// expose functions for testing.
export const Test = {
    readDirSync,
}
