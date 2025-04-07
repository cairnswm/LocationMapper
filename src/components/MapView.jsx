import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import FeatureModal from "./FeatureModal";
import { MapUpdater, MapClickHandler } from "./MapEvents";
import { useFeaturesContext } from "../context/FeaturesContext";
import { MapContextMenu } from "./MapContextMenu";
import MarkerDisplay from "./MarkerDisplay";
import HeaderButtons from "./HeaderButtons";

// Default marker icon fix for leaflet
import "leaflet/dist/leaflet.css";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

function MapView() {
  const [mapCenter, setMapCenter] = useState([-25.935, 27.18]);
  const [contextMenu, setContextMenu] = useState(null);
  const {
    features,
    activeFeature,
    showModal,
    addingRegion,
    regionMode,
    newRegionCoords,
    editingRegionId,
    addPin,
    updateFeature,
    handleMapClick,
    finishRegion,
    closeModal,
    startRegionAtPoint,
  } = useFeaturesContext();

  const handleContextMenu = ({ x, y, latlng, feature }) => {
    setContextMenu({ x, y, latlng, feature });
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  return (
    <div className="h-full flex flex-col">
      <HeaderButtons mapCenter={mapCenter} />
      <div className="flex-grow" style={{ height: "calc(100% - 56px)" }}>
        <MapContainer
          center={mapCenter}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <MapUpdater onChange={setMapCenter} />
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapClickHandler
            onMapClick={handleMapClick}
            regionMode={regionMode}
            onContextMenu={handleContextMenu}
          />
          <MarkerDisplay
            features={features}
            editingRegionId={editingRegionId}
            addingRegion={addingRegion}
            regionMode={regionMode}
            newRegionCoords={newRegionCoords}
            onContextMenu={handleContextMenu}
          />
        </MapContainer>
      </div>
      {activeFeature && (
        <FeatureModal
          show={showModal}
          onHide={closeModal}
          feature={activeFeature}
          updateFeature={updateFeature}
        />
      )}
      {contextMenu && (
        <MapContextMenu
          position={{ x: contextMenu.x, y: contextMenu.y }}
          onAddPin={() => {
            addPin([contextMenu.latlng.lat, contextMenu.latlng.lng]);
            closeContextMenu();
          }}
          onAddRegion={() => {
            startRegionAtPoint([contextMenu.latlng.lat, contextMenu.latlng.lng]);
            closeContextMenu();
          }}
          onFinishRegion={() => {
            finishRegion();
            closeContextMenu();
          }}
          isEditingRegion={
            addingRegion && regionMode === "mark" && newRegionCoords.length >= 3
          }
          onClose={closeContextMenu}
          onEditRegion={(feature) => {
            updateFeature={feature}
            closeContextMenu();
          }}
          feature={contextMenu.feature} 
        />
      )}
    </div>
  );
}

export default MapView;
