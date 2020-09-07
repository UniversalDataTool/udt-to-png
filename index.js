const udtToSVG = require("udt-to-svg")
const { convert: chromiumSVGToPNG } = require("convert-svg-to-png")
const svg2img = require("svg2img")
const probe = require("probe-image-size")
const fs = require("fs")

async function sampleToPNG(sample, options = {}) {
  const { width, height } = await probe(sample.imageUrl)
  let svgText = udtToSVG.sampleToSVG(sample, {
    width,
    height,
    showImage: false,
  })

  let pngBuffer

  // We can't just use one solution for this because chromium doesn't work in
  // serverless environments, and svg2img doesn't handle crispEdges
  // https://github.com/fuzhenn/node-svg2img/issues/39
  if (options.crisp) {
    pngBuffer = await chromiumSVGToPNG(svgText)
  } else {
    pngBuffer = await new Promise((resolve, reject) => {
      svg2img(svgText, (err, buffer) => {
        if (err) return reject(err)
        resolve(buffer)
      })
    })
  }

  return {
    pngBuffer,
    fileName: `${
      sample.sampleName
        ? sample.sampleName
        : sample.imageUrl
            .split("/")
            .slice(-1)[0]
            .split(".")
            .slice(0, -1)
            .join(".")
    }.mask.png`,
  }
}

module.exports = { sampleToPNG }
