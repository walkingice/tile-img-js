import * as NodeFs from 'node:fs'
import * as NodeUrl from 'node:url'

export class FileUtil {
    static ensureDirSync(dirUrl: URL) {
        const dirPath: string = NodeUrl.fileURLToPath(dirUrl)
        let stats: NodeFs.Stats = NodeFs.lstatSync(dirPath)
        if (!stats.isDirectory() || NodeFs.accessSync(dirPath, NodeFs.constants.R_OK)) {
            throw new Error(`Not a readable dir: ${dirPath}`)
        }
    }

    static createDirSync(dirUrl: URL) {
        const dirPath: string = NodeUrl.fileURLToPath(dirUrl)
        if (!NodeFs.existsSync(dirPath)) {
            NodeFs.mkdirSync(dirPath, { recursive: true })
        }
    }
}