const udtToSVG = require("udt-to-svg")
const { convert } = require("convert-svg-to-png")
const probe = require("probe-image-size")
const fs = require("fs")

// const dataset = JSON.parse(
//   require("fs").readFileSync("/home/seve/downloads/FG1_1_rc1.udt.json")
// )

async function sampleToPNG(sample) {
  for (let i = 0; i < dataset.samples.length; i++) {
    // console.log(i, dataset.samples[i].imageUrl)
    const { width, height } = await probe(sample.imageUrl)
    const svgText = udtToSVG.sampleToSVG(sample, {
      width,
      height,
      showImage: false,
    })
    const pngBuffer = await convert(svgText)
    return {
      pngBuffer,
      fileName: `${dataset.samples[i].imageUrl
        .split("/")
        .slice(-1)[0]
        .split(".")
        .slice(0, -1)
        .join(".")}.mask.png`,
    }
  }
}

module.exports = { sampleToPNG }
