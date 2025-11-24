export interface GeocodingResult {
  display_name: string
  lat: string
  lon: string
  address?: {
    road?: string
    city?: string
    state?: string
    country?: string
    postcode?: string
  }
}

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org'
const USER_AGENT = 'InstantCharge EV Battery Delivery App'

let lastRequestTime = 0
const MIN_REQUEST_INTERVAL = 1000

const rateLimitedFetch = async (url: string): Promise<Response> => {
  const now = Date.now()
  const timeSinceLastRequest = now - lastRequestTime
  
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    await new Promise(resolve => setTimeout(resolve, MIN_REQUEST_INTERVAL - timeSinceLastRequest))
  }
  
  lastRequestTime = Date.now()
  return fetch(url, {
    headers: {
      'User-Agent': USER_AGENT
    }
  })
}

export async function reverseGeocode(
  lat: number,
  lng: number
): Promise<string> {
  try {
    const response = await rateLimitedFetch(
      `${NOMINATIM_BASE_URL}/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
    )
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data: GeocodingResult = await response.json()
    return data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`
  } catch (error) {
    console.error('Reverse geocoding error:', error)
    return `${lat.toFixed(4)}, ${lng.toFixed(4)}`
  }
}

export async function searchAddress(
  query: string,
  limit: number = 5
): Promise<GeocodingResult[]> {
  if (query.length < 3) {
    return []
  }

  try {
    const response = await rateLimitedFetch(
      `${NOMINATIM_BASE_URL}/search?format=json&q=${encodeURIComponent(query)}&limit=${limit}&addressdetails=1`
    )
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data: GeocodingResult[] = await response.json()
    return data
  } catch (error) {
    return []
  }
}

export async function getCurrentPosition(): Promise<{
  latitude: number
  longitude: number
}> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      },
      (error) => {
        reject(error)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    )
  })
}

export async function getCurrentLocationWithAddress(): Promise<{
  address: string
  coordinates: { lat: number; lng: number }
}> {
  const position = await getCurrentPosition()
  const address = await reverseGeocode(position.latitude, position.longitude)
  
  return {
    address,
    coordinates: {
      lat: position.latitude,
      lng: position.longitude,
    },
  }
}
