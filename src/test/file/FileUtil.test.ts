import * as NodeFs from 'node:fs';
import * as NodePath from 'node:path';
import * as NodeUrl from 'node:url';
import * as OS from 'os';
import { FileUtil } from '../../main/file/FileUtil';

const tmpDirPrefix: string = 'test-tile-img'
let tmpDir: string
beforeEach(() => { tmpDir = prepareTmpDir() })
afterEach(() => { clearTmpDir(tmpDir) })

test('Verify FileUtil ensureDirSync with existing path', () => {
    const url: NodeUrl.URL = NodeUrl.pathToFileURL("src/test/assets/")
    expect(FileUtil.ensureDirSync(url))
});

test('Verify FileUtil ensureDirSync failed with normal file', () => {
    const normalFileUrl: NodeUrl.URL = NodeUrl.pathToFileURL("package.json")
    expect(() => FileUtil.ensureDirSync(normalFileUrl)).toThrowError(/^Not a readable dir/)
});

test('Verify FileUtil ensureDirSync with non-existing dir', () => {
    const notExistUrl: NodeUrl.URL = NodeUrl.pathToFileURL("path/to/blackhole")
    expect(() => FileUtil.ensureDirSync(notExistUrl)).toThrowError(/^ENOENT.*/g)
});

test('Verify FileUtil createDirSync', () => {
    const dirPath: string = NodePath.join(tmpDir, "newdir1", "newdir2")
    const deepDirUrl: NodeUrl.URL = NodeUrl.pathToFileURL(dirPath)

    FileUtil.createDirSync(deepDirUrl)

    // verify
    FileUtil.ensureDirSync(deepDirUrl)
});

function prepareTmpDir(): string {
    return NodeFs.mkdtempSync(NodePath.join(OS.tmpdir(), tmpDirPrefix));
}
function clearTmpDir(dirPath: string) {
    NodeFs.rmSync(dirPath, { recursive: true })
}

