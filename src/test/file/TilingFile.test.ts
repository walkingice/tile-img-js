import * as NodeUrl from 'node:url';
import { TilingFile } from "../../main/file/TilingFile";

test('Verify TilingFile constructor', () => {
    const tiling: TilingFile = new TilingFile(
        "outputWithoutExtension",
        [
            NodeUrl.pathToFileURL("/src/img1.png"),
            NodeUrl.pathToFileURL("/src/img2.png"),
            NodeUrl.pathToFileURL("/src/img3.png"),
        ],
    )
    expect(tiling.dstFileName).toBe("outputWithoutExtension");
    expect(tiling.srcFileUrls.length).toBe(3);
});