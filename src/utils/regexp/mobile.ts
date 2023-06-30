export const matchIsMobile = (navigator: string) => {
  const mobileRegex = /android|blackberry|iphone|ipad|ipod|iemobile|opera mini/gi
  if (mobileRegex.test(navigator)) {
    return true
  }
  return false
}
