import { ImageType } from "../../main/image/ImageType";

test('Verify TiledRect constructor', () => {
    expect(ImageType.appendExtension("foo")).toEqual("foo.png");
});
