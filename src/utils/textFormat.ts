export function capitalise(text: string) {
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function splitByCapitalizationAndJoin(str: string) {
  // Split the string at each uppercase letter, except for the first character if it's uppercase.
  const parts = str.split(/(?=[A-Z])/);

  // Join the parts with a space to get a single string.
  return parts.join(" ");
}
