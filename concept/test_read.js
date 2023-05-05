const fs = require('fs')
const pngjs = require('pngjs')

const pipeline = require('node:stream').promises.pipeline

const srcDir = "concept/assets"

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

read(filesPath)
