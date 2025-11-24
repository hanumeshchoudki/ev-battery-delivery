"use client"

import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface LiveTrackingMapProps {
  userLocation: { lat: number; lng: number } | null
  driverLocation: { lat: number; lng: number }
  driverName: string
}

export function LiveTrackingMap({ userLocation, driverLocation, driverName }: LiveTrackingMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const userMarkerRef = useRef<L.Marker | null>(null)
  const driverMarkerRef = useRef<L.Marker | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return

    // Initialize map only once
    if (!mapInstanceRef.current) {
      const map = L.map(mapRef.current).setView([37.7749, -122.4194], 13)

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map)

      mapInstanceRef.current = map
      setIsLoaded(true)
    }

    return () => {
      // Cleanup on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!mapInstanceRef.current || !isLoaded) return

    const map = mapInstanceRef.current

    // Create custom icons
    const userIcon = L.divIcon({
      className: 'custom-user-marker',
      html: `
        <div style="position: relative;">
          <div style="width: 32px; height: 32px; background: #10b981; border-radius: 50%; border: 4px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; animation: pulse 2s infinite;">
            <div style="width: 12px; height: 12px; background: white; border-radius: 50%;"></div>
          </div>
          <div style="position: absolute; top: -48px; left: 50%; transform: translateX(-50%); background: #059669; color: white; padding: 6px 12px; border-radius: 8px; white-space: nowrap; font-size: 12px; font-weight: 600; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">
            Your Location
          </div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    })

    const driverIcon = L.divIcon({
      className: 'custom-driver-marker',
      html: `
        <div style="position: relative;">
          <div style="width: 40px; height: 40px; background: #3b82f6; border-radius: 50%; border: 4px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path>
              <circle cx="7" cy="17" r="2"></circle>
              <path d="M9 17h6"></path>
              <circle cx="17" cy="17" r="2"></circle>
            </svg>
          </div>
          <div style="position: absolute; top: -48px; left: 50%; transform: translateX(-50%); background: #2563eb; color: white; padding: 6px 12px; border-radius: 8px; white-space: nowrap; font-size: 12px; font-weight: 600; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">
            ${driverName}
          </div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    })

    // Update or create user marker
    if (userLocation) {
      if (userMarkerRef.current) {
        userMarkerRef.current.setLatLng([userLocation.lat, userLocation.lng])
      } else {
        userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], {
          icon: userIcon,
        }).addTo(map)
      }
    }

    // Update or create driver marker
    if (driverMarkerRef.current) {
      driverMarkerRef.current.setLatLng([driverLocation.lat, driverLocation.lng])
    } else {
      driverMarkerRef.current = L.marker([driverLocation.lat, driverLocation.lng], {
        icon: driverIcon,
      }).addTo(map)
    }

    // Fit bounds to show both markers
    if (userLocation) {
      const bounds = L.latLngBounds([
        [userLocation.lat, userLocation.lng],
        [driverLocation.lat, driverLocation.lng],
      ])
      map.fitBounds(bounds, { padding: [50, 50] })
    } else {
      map.setView([driverLocation.lat, driverLocation.lng], 13)
    }
  }, [userLocation, driverLocation, driverName, isLoaded])

  return (
    <div className="relative w-full h-80 rounded-lg overflow-hidden">
      <div ref={mapRef} className="w-full h-full" />
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
        .custom-user-marker, .custom-driver-marker {
          background: transparent !important;
          border: none !important;
        }
        .leaflet-popup-content-wrapper {
          background: rgba(30, 41, 59, 0.95);
          color: white;
          border-radius: 8px;
        }
        .leaflet-popup-tip {
          background: rgba(30, 41, 59, 0.95);
        }
      `}</style>
    </div>
  )
}
