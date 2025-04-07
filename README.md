# Location Mapper

An interactive React-based mapping application that allows users to create, manage, and visualize location-based data through pins and regions on a map.

## Features

- **Interactive Map Interface**: Built with Leaflet for smooth map interactions
- **Pin Management**:
  - Add pins with automatic location name detection
  - Customize pin colors and descriptions
  - Attach images to pins
  - Drag and drop pins to update locations
- **Region Creation**:
  - Draw regions using two different methods:
    - Center-based: Add points around a center
    - Click-based: Click points to create a polygon
  - Edit region points
  - Customize region colors and descriptions
- **Rich Text Editing**: Format descriptions using TipTap editor
- **Image Support**: Add multiple images to both pins and regions
- **Location Detection**: Automatic location name detection using OpenStreetMap data

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/locationmapper.git
cd locationmapper
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Open [http://localhost:3000](http://localhost:3000) to view the application

## Usage

### Adding Pins
1. Right-click anywhere on the map
2. Select "Add Pin Here"
3. Wait for automatic location name detection
4. Add description and images in the modal

### Creating Regions
1. Choose a creation method:
   - Click "Mark Region" button and click points on the map
   - Click "Add Region" button and add points around a center
2. Right-click and select "Finish Region" when done
3. Add description and images in the modal

### Editing Features
- Click any pin or region to open its edit modal
- Drag pins to new locations
- Click "Edit Region Points" to modify region shapes

## Technologies Used

- React
- Leaflet & react-leaflet for mapping
- Bootstrap for UI components
- TipTap for rich text editing
- OpenStreetMap Nominatim API for geocoding

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
