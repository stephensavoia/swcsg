import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

function newComic({
  fileName,
}) {
  return {
    id: fileName,
    description: `Comic #${fileName}`,
  }
}

async function run() {
  const ARGS_COUNT = 2
  const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.avif']

  if (process.argv.length < (2 + ARGS_COUNT)) {
    console.error('Expected args: input dir, comics path.')
    process.exit(1)
  }

  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)))
  const inputDir = path.resolve(root, '../', process.argv[2])
  const comicsPath = path.resolve(root, '../', process.argv[3])

  try {
    await fs.access(inputDir)
  } catch (err) {
    console.error('Input dir does not exist.')
    process.exit(1)
  }

  try {
    await fs.access(comicsPath)
  } catch (err) {
    console.log('Comics path does not exist.')
    process.exit(1)
  }

  console.log(`Populating: ${comicsPath}\n`)

  const files = await fs.readdir(inputDir)

  const imageFiles = files.filter((file) =>
    IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase())
  )

  try {
    const comicsFile = await fs.readFile(comicsPath, 'utf-8')
    let comics = JSON.parse(comicsFile)

    if (!Array.isArray(comics)) {
      console.error('Failed to parse comics JSON file.')
      process.exit(1)
    }

    const comicIds = new Set()

    for (const comic of comics) {
      comicIds.add(comic.id)
    }

    let hasModifiedComics = false

    const imageFileNames = new Set()

    await Promise.all(imageFiles.map(async (imageFile) => {
      const filePath = path.join(inputDir, imageFile)
      const stats = await fs.stat(filePath)

      if (stats.isFile()) {
        const [fileName] = imageFile.split('.')

        imageFileNames.add(fileName)

        if (comicIds.has(fileName)) {
          // console.log(`skipping... ${imageFile}`)
          return
        }

        console.log(`populating: ${imageFile}`)

        comics.push(newComic({ fileName }))

        hasModifiedComics = true
      }
    }))

    comicIds.forEach((comicId) => {
      if (!imageFileNames.has(comicId)) {
        console.log(`deleting: ${comicId} with no associated image`)

        comics = comics.filter((comic) => comic.id !== comicId)

        hasModifiedComics = true
      }
    })

    if (!hasModifiedComics) {
      console.log('nothing to populate!')
      process.exit(0)
    }

    console.log('Sorting comics...')

    // sort by id descending
    comics.sort((a, b) => (
      Number(b.id) - Number(a.id)
    ))

    try {
      await fs.writeFile(comicsPath, JSON.stringify(comics, null, 2), 'utf-8')
    } catch (err) {
      console.error('Failed to write comics file --', err)
      process.exit(1)
    }

    console.log('\ndone!')
  } catch (err) {
    console.error('Failed to populate comics --', err)
    process.exit(1)
  }
}

await run()
