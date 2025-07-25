export const fetchPDFThroughProxy = async (url: string): Promise<Uint8Array> => {
  // Use a CORS proxy service
  const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`

  try {
    const response = await fetch(proxyUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch PDF: ${response.statusText}`)
    }

    const arrayBuffer = await response.arrayBuffer()
    return new Uint8Array(arrayBuffer)
  } catch (error) {
    console.error("Error in fetchPDFThroughProxy:", error)
    throw new Error(`Failed to fetch PDF: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}
