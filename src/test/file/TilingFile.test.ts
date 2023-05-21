import { URL, pathToFileURL } from 'node:url'
import { TilingFile } from "../../main/file/TilingFile";

test('Verify TilingFile constructor', () => {
    const tiling: TilingFile = new TilingFile(
        "outputWithoutExtension",
        [
            pathToFileURL("/src/img1.png"),
            pathToFileURL("/src/img2.png"),
            pathToFileURL("/src/img3.png"),
        ],
    )
    expect(tiling.dstFileName).toBe("outputWithoutExtension");
    expect(tiling.srcFileUrls.length).toBe(3);
});