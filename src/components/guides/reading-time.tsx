"use client"

interface ReadingTimeProps {
  text: string
}

const ReadingTime = ({ text }: ReadingTimeProps) => {

  const wordsPerMinute = 200 // Average reading speed of an adult
  const words = text.split(/\s+/).length // Split by whitespace and count words
  const minutes = Math.ceil(words / wordsPerMinute)

  return (
    <p>
      Estimated reading time: {minutes} min{minutes !== 1 ? "s" : ""}
    </p>
  )
}

export default ReadingTime