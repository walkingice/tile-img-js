import * as NodePath from 'node:path'
import { Extensions } from '../image/ImageType'
/**
 * A class to check file path.
 */
export class FileChecker {
    static isSupported(filePath: string): boolean {
        const baseName = NodePath.basename(filePath).toLocaleLowerCase()
        for (let ext in Extensions) {
            if (baseName.endsWith(Extensions[ext])) {
                return true
            }
        }
        return false
    }
}