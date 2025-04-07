import L from 'leaflet'

// Function to generate custom map pin icon using SVG
export const getPinIcon = (color) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="${color}" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="5" fill="white"></circle>
    </svg>
  `
  return L.divIcon({
    html: `<div style="transform: translate(0, 0);">${svg}</div>`,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 16], // Center of the icon
    popupAnchor: [0, -16],
    tooltipAnchor: [0, -8]
  })
}

// Function to generate a plus icon for marking region points
export const getMarkIcon = () => {
  return L.divIcon({
    html: `<div style="font-size:20px; color:red; line-height:20px;">+</div>`,
    className: '',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  })
}
