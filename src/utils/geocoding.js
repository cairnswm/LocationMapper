export async function getLocationName(lat, lng) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'LocationMapper/1.0'
        }
      }
    )
    const data = await response.json()
    
    // Try to get the most specific name possible
    const address = data.address
    console.log("address", address)
    return address.leisure || 
           address.attraction || 
           address.natural || 
           address.water || 
           address.park || 
           address.road || 
           address.suburb || 
           address.city || 
           data.display_name.split(',')[0] || 
           'New Location'
  } catch (error) {
    console.error('Error fetching location name:', error)
    return 'New Location'
  }
}
