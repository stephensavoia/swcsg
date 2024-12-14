#!/usr/bin/env node

import sharp from 'sharp'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

async function resizeImage({
  fileName,
  fileExtension,
  filePath,
  outputDir,
  w,
  h,
}) {
  if (!w) {
    console.error('no width specified... skipping resize')
    return
  }

  const suffix = h ? `${w}-${h}` : w
  const outputFileName = `${fileName}-${suffix}.${fileExtension}`
  const outputFilePath = path.join(outputDir, outputFileName)

  try {
    await fs.access(outputFilePath)
    console.log(`found: ${outputFileName}`)
    return
  } catch (err) { /* pass */ }

  await sharp(filePath)
    .resize(w, h, {
      kernel: sharp.kernel.nearest,
      fit: 'contain',
      position: 'right top',
    })
    .toFile(outputFilePath)

  console.log(`created: ${outputFileName}`)
}

async function run() {
  const ARGS_COUNT = 2
  const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.avif']
  const RESIZE_WIDTHS = [2024, 1600, 800]

  if (process.argv.length < (2 + ARGS_COUNT)) {
    console.error('Expected args: input dir, output dir.')
    process.exit(1)
  }

  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)))
  const inputDir = path.resolve(root, '../', process.argv[2])
  const outputDir = process.argv[3]

  try {
    await fs.access(inputDir)
  } catch (err) {
    console.error('Input dir does not exist.')
    process.exit(1)
  }

  console.log(`Resizing images in: ${inputDir}\n`)

  try {
    await fs.access(outputDir)
  } catch (err) {
    console.log('Creating output dir...\n')
    await fs.mkdir(outputDir)
  }

  const files = await fs.readdir(inputDir)

  const imageFiles = files.filter((file) =>
    IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase())
  )

  try {
    await Promise.all(imageFiles.map(async (imageFile) => {
      const filePath = path.join(inputDir, imageFile)
      const stats = await fs.stat(filePath)

      if (stats.isFile()) {
        const [fileName, fileExtension] = imageFile.split('.')

        console.log(`resizing: ${imageFile}`)

        await Promise.all(RESIZE_WIDTHS.map((w) =>
          resizeImage({
            fileName,
            fileExtension,
            filePath,
            outputDir,
            w,
          }),
        ))
      }
    }))
  } catch (err) {
    console.error('Failed to resize images :(', err)
    process.exit(1)
  }

  console.log('\ndone!')
}

await run()
