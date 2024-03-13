import axios from "axios"
import { load } from "cheerio"
import { existsSync, mkdirSync, rmdirSync } from "fs"
import { logInfo } from "logger"
import { characters } from "../../utils/dummy/characters"
import { downloadImage } from "./download"


const PUBLIC_DIR = `../../../public`
const CHARACTERS_URL = "https://gcdatabase.com/characters"
const OUT_DIR = `${PUBLIC_DIR}/images/characters`

export const downloadImages = async () => {
    if (existsSync(OUT_DIR)) rmdirSync(OUT_DIR, { recursive: true })
    mkdirSync(OUT_DIR)

    const { data: text } = await axios.get(CHARACTERS_URL)

    const $ = load(text)

    const imgs = $("img")
        .map((_, el) => {
            const img = $(el).find("img")

            return {
                name: img?.attr("alt") ?? "",
                src: img?.attr("src") ?? "",
            }
        })
        .get()
        .filter(({ name, src }) => (console.log({ name, src }), name && src))

    imgs.forEach((img, i) => {
        if (!img.src || !img.name) return

        const isCharacter = true

        logInfo(`Downloading: ${isCharacter} => ${img.name}`)

        downloadImage(
            img.src,
            `${OUT_DIR}/${
                isCharacter
                    ? characters.find((l) => l.name === img.name)
                          ?.slug ?? img.name
                    : img.name
            }.png`,
        )
    })

    logInfo("Downloaded roster images!")
}

downloadImages()