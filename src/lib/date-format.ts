export const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" })
  }