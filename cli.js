const yargs = require("yargs")
const fs = require("fs")
const mkdirp = require("mkdirp")
const cliProgress = require("cli-progress")
const { sampleToPNG } = require("./index.js")

const { argv } = yargs
  .usage("Usage: $0 path/to/dataset.udt.json -o output-masks-dir")
  .option("use-sample-number", {
    describe:
      "Use the number of the sample as the mask filename (sample0001.mask.png, etc.) ",
  })
  .option("crisp", {
    describe: "Remove anti-aliasing around shapes (uses headless chromium)",
  })
  .option("output-dir", {
    alias: "o",
    describe: "Output directory for masks",
  })
  .demandOption(["o"])

const {
  _: [pathToFile],
  outputDir,
  crisp,
  useSampleNumber,
} = argv

async function main() {
  const ds = JSON.parse(fs.readFileSync(pathToFile))

  await mkdirp(outputDir)

  const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)

  for (const [sampleIndex, sample] of ds.samples.entries()) {
    if (sampleIndex >= 1) {
      if (sampleIndex === 1) bar1.start(ds.samples.length, 0)
      bar1.update(sampleIndex)
    }

    const { pngBuffer, fileName } = await sampleToPNG(sample, { crisp })

    fs.writeFileSync(
      `${outputDir}/${
        useSampleNumber
          ? `sample${sampleIndex.toString().padStart(6, "0")}.mask.png`
          : fileName
      }`,
      pngBuffer
    )
  }
  bar1.stop()
  process.exit(0)
}

main()
