// supported extension
export enum Extensions {
    PNG = "png"
}

export class ImageType {
    static appendExtension(fileName: string) {
        return `${fileName}.${Extensions.PNG}`
    }
}
