import * as NodeUrl from 'node:url';
import { MetadataReader } from "../../main/image/MetadataReader";
import { ImgMetadata } from "../../main/model/ImgMetadata";

test('Verify MetadataReader', async () => {
    const fileUrl: NodeUrl.URL = NodeUrl.pathToFileURL("src/test/assets/group1/img_1.png")
    const result = await MetadataReader.getMetadata(fileUrl)
    expect(result).toEqual(new ImgMetadata(256, 256));
})

test('Verify MetadataReader with non-existing file', async () => {
    // disable console.error, beacuse we already expect it will be invoked in our test
    jest.spyOn(global.console, 'error').mockImplementation(jest.fn())

    const fileUrl: NodeUrl.URL = NodeUrl.pathToFileURL("not/exist/img_1.png")
    await expect(MetadataReader.getMetadata(fileUrl)).rejects.toThrowError(/^ENOENT.*/g)
})
