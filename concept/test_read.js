const fs = require('fs')
const pngjs = require('pngjs')

const pipeline = require('node:stream').promises.pipeline

const srcDir = "concept/assets"
const dstDir = "concept/dist"

const filesPath = [
    `${srcDir}/img_1.png`,
    `${srcDir}/img_2.png`,
    `${srcDir}/img_3.png`,
    `${srcDir}/img_4.png`,
]

function readMeatadata(fileName) {
    let fsStream = fs.createReadStream(fileName)
    let pngStream = new pngjs.PNG({ filterType: 4 })
    return new Promise((resolve, reject) => {
        fsStream.pipe(pngStream)
            .on('metadata', (metadata) => {
                resolve({ fileName, metadata })
            })
    })
}

async function read(relativeFilePath) {
    const promises = relativeFilePath.map(path => readMeatadata(path))
    const results = await Promise.all(promises)
    results.forEach((result) => {
        console.log(`${result.fileName}, ${JSON.stringify(result.metadata)}`)
    });
}
// read(filesPath)

function writePng(relativeFilePath) {
    const outStream = fs.createWriteStream(relativeFilePath)
    const width = 256
    const height = 256
    const png = new pngjs.PNG({ width, height })
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            let idx = (width * j + i) * 4
            png.data[idx + 0] = 0xFF // R
            png.data[idx + 1] = 0xFF // G
            png.data[idx + 2] = 0x33 // B
            png.data[idx + 3] = 0xFF // A
        }
    }
    png.pack().pipe(outStream)
}
// writePng(`${dstDir}/output.png`)

function parsePng(srcPath) {
    const fsStream = fs.createReadStream(srcPath)
    const pngStream = new pngjs.PNG()
    return new Promise((resolve, reject) => {
        fsStream.pipe(pngStream)
            .on('parsed', (data) => {
                resolve(pngStream)
            })
    })
}

async function copyBit(dstPng, srcPath, x, y) {
    const parsed = await parsePng(srcPath)
    parsed.bitblt(dstPng, 0, 0, parsed.width, parsed.height, x, y)
}

async function tile(inputPathA, inputPathB, outputPath) {
    const width = 256 * 2
    const height = 256
    const outputPng = new pngjs.PNG({ width, height })
    await copyBit(outputPng, inputPathA, 0, 0)
    await copyBit(outputPng, inputPathB, 255, 0)
    outputPng.pack().pipe(fs.createWriteStream(outputPath))
}

tile(filesPath[0], filesPath[1], `${dstDir}/output.png`)