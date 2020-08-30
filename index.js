const udtToSVG = require("udt-to-svg")
const { convert } = require("convert-svg-to-png")
const probe = require("probe-image-size")
const fs = require("fs")

async function sampleToPNG(sample) {
  const { width, height } = await probe(sample.imageUrl)
  const svgText = udtToSVG.sampleToSVG(sample, {
    width,
    height,
    showImage: false,
  })
  const pngBuffer = await convert(svgText)
  return {
    pngBuffer,
    fileName: `${sample.imageUrl
      .split("/")
      .slice(-1)[0]
      .split(".")
      .slice(0, -1)
      .join(".")}.mask.png`,
  }
}

module.exports = { sampleToPNG }
