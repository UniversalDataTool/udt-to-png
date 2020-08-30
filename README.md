<p align="center">
<kbd><img src="https://user-images.githubusercontent.com/1910070/91663210-7ddf7c80-eab5-11ea-92d1-a5a55cc65e88.gif" /></kbd>
</p>

# UDT to PNG
</hr>

> Currently, this is just for NodeJS, but porting it to the browser should be
> possible if there's a way to convert an SVG to a PNG in-browser. PRs welcome!

Converts UDT image files into PNGs, suitable for use in machine learning tasks.

## Usage

```
Usage: udt-to-png path/to/dataset.udt.json -o output-masks-dir

Options:
  --help               Show help                                       [boolean]
  --version            Show version number                             [boolean]
  --use-sample-number  Use the number of the sample as the mask filename
                       (sample0001.mask.png, etc.)
  --output-dir, -o     Output directory for masks                     [required]
```
