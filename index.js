const udtToSVG = require("udt-to-svg")
const svgToPng = require("svg-mask-render")
const probe = require("probe-image-size")
const fs = require("fs")
const rgba = require("color-rgba")

async function sampleToPNG(sample, options = {}) {
  const { width, height } = await probe(sample.imageUrl)
  let svgText = udtToSVG.sampleToSVG(sample, {
    width,
    height,
    showImage: false,
  })

  const classificationColors = Array.from(
    new Set((sample.annotation || []).map((r) => r.color))
  )
    .map((c) => rgba(c))
    .map(([r, g, b, a]) => [r, g, b, a * 255])
    .concat([[0, 0, 0, 0]])

  console.log({ classificationColors })

  const pngBuffer = await svgToPng(svgText, {
    options: "pngbuffer",
    allowedColors: classificationColors,
  })

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
