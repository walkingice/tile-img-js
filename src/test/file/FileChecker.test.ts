import { FileChecker } from "../../main/file/FileChecker";
test('Verify png filename is supported by ImgFileChecker', () => {
    expect(FileChecker.isSupported("/path/to/some.png")).toBe(true)
    expect(FileChecker.isSupported("/path/to/some.PNG")).toBe(true)
});

test('Verify jpg filename is not supported by ImgFileChecker', () => {
    expect(FileChecker.isSupported("/path/to/some.jpg")).toBe(false)
});
