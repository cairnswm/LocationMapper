import { useMapEvents } from 'react-leaflet'

// Component to update parent's map center on moveend
export function MapUpdater({ onChange }) {
  useMapEvents({
    moveend: (e) => {
      const map = e.target
      const center = map.getCenter()
      onChange([center.lat, center.lng])
    }
  })
  return null
}

// MapEvents for "mark" mode to capture clicks when regionMode is "mark"
export function MapClickHandler({ onMapClick, regionMode, onContextMenu }) {
  useMapEvents({
    click(e) {
      if (regionMode === 'mark') {
        onMapClick(e)
      }
    },
  })
  return null
}
