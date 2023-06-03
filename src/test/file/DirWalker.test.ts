import * as NodeFs from 'node:fs';
import * as NodeUrl from 'node:url';
import { DirWalker, Test as TestObj } from "../../main/file/DirWalker";

test('Verify DirWalker walkDirSync with existing path', () => {
    // disable console.warn, beacuse we already expect it will be invoked in our test
    jest.spyOn(global.console, 'warn').mockImplementation(jest.fn())

    const url: NodeUrl.URL = NodeUrl.pathToFileURL("src/test/assets/")

    // Run
    const tilingFiles = DirWalker.walkDirSync(url)

    // Verify
    expect(tilingFiles).not.toBeNull()
    expect(tilingFiles.length).toBe(2)
    expect(tilingFiles[0].dstFileName).toBe("group1.png")
    expect(tilingFiles[0].srcFileUrls.length).toBe(4)
    expect(tilingFiles[1].dstFileName).toBe("group2.png")
    expect(tilingFiles[1].srcFileUrls.length).toBe(3)
    expect(tilingFiles[0].srcFileUrls[0]).toEqual(NodeUrl.pathToFileURL("src/test/assets/group1/img_1.png"))
});

test('Verify DirWalker handleDirBlock failed with normal file', () => {
    const normalFileUrl: NodeUrl.URL = NodeUrl.pathToFileURL("package.json")
    expect(() => DirWalker.walkDirSync(normalFileUrl)).toThrowError(/^Not a readable dir/)
});

test('Verify DirWalker handleDirBlock with non-existing dir', () => {
    const notExistUrl: NodeUrl.URL = NodeUrl.pathToFileURL("path/to/blackhole")
    expect(() => DirWalker.walkDirSync(notExistUrl)).toThrowError(/^ENOENT.*/g)
});

test('Verify DirWalker readDirSync with existing path', () => {
    // disable console.warn, beacuse we already expect it will be invoked in our test
    jest.spyOn(global.console, 'warn').mockImplementation(jest.fn())

    const url: NodeUrl.URL = NodeUrl.pathToFileURL("src/test/assets/group1")

    // Pre-check. There are 5 files under that dir, and one is JPG (not supported yet)
    const fullDirPath: string = NodeUrl.fileURLToPath(url)
    const allFiles = NodeFs.readdirSync(fullDirPath)
    expect(allFiles.length).toBe(5)

    // Run
    const tilingFile = TestObj.readDirSync(url)

    // Verify
    expect(tilingFile).not.toBeNull()
    expect(tilingFile.dstFileName).toBe("group1.png")
    expect(tilingFile.srcFileUrls.length).toBe(4)
    expect(tilingFile.srcFileUrls[0]).toEqual(NodeUrl.pathToFileURL("src/test/assets/group1/img_1.png"))
});

test('Verify DirWalker readDirSync with existing path', () => {
    const url: NodeUrl.URL = NodeUrl.pathToFileURL("src/test/assets/")
    const tilingFile = TestObj.readDirSync(url)
    // Current implementation does not look deeper directory
    // so it should return null for the give dir.
    expect(tilingFile).toBeNull()
});
