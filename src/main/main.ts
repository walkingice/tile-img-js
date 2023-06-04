import * as NodeUrl from 'node:url';
import { TileImage } from './TileImage';

// npm run build_ts && npm run main src/test/assets/ /tmp/output/
const args = process.argv.slice(2)
const srcDirPath = args[0]
const dstDirPath = args[1]

const srcDirUrl: NodeUrl.URL = NodeUrl.pathToFileURL(srcDirPath)
const dstDirUrl: NodeUrl.URL = NodeUrl.pathToFileURL(dstDirPath)
TileImage.handleDir(srcDirUrl, dstDirUrl)