import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Polygon } from "react-leaflet";
import { Button, Container, Row, Col } from "react-bootstrap";
import L from "leaflet";
import FeatureModal from "./FeatureModal";
import { MapPin, MapRegion } from "./MapFeatures";
import { MapUpdater, MapClickHandler } from "./MapEvents";
import { getMarkIcon } from "../utils/icons";
import { useFeaturesContext } from "../context/FeaturesContext";
import { MapContextMenu } from "./MapContextMenu";

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
    editingRegionId, // Include editingRegionId
    addPin,
    updateFeature,
    addRegionPointCenter,
    startMarkRegion,
    handleMapClick,
    updateMarkPosition,
    removeMarkPoint,
    finishRegion,
    handleEditPoints,
    finishEditingRegion,
    handlePinDragEnd,
    openModal,
    closeModal,
    startRegionAtPoint,
  } = useFeaturesContext();

  const handleAddPin = () => {
    addPin(mapCenter);
  };

  const handleContextMenu = ({ x, y, latlng }) => {
    setContextMenu({ x, y, latlng });
  };

  const handleAddPinFromContext = () => {
    addPin([contextMenu.latlng.lat, contextMenu.latlng.lng]);
    setContextMenu(null);
  };

  const handleAddRegionFromContext = () => {
    startRegionAtPoint([contextMenu.latlng.lat, contextMenu.latlng.lng]);
    setContextMenu(null);
  };

  const handleFinishRegionFromContext = () => {
    finishRegion();
    setContextMenu(null);
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  return (
    <Container fluid style={{ height: "100%" }}>
      <Row className="p-2">
        <Col>
          <Button variant="primary" onClick={handleAddPin}>
            Add Pin
          </Button>{" "}
          <Button
            variant="secondary"
            onClick={() => addRegionPointCenter(mapCenter)}
          >
            {addingRegion && regionMode === "center"
              ? "Add Region Point (Center)"
              : "Add Region (Center)"}
          </Button>{" "}
          <Button variant="secondary" onClick={startMarkRegion}>
            Mark Region (Click)
          </Button>{" "}
          {addingRegion && regionMode === "mark" && (
            <Button variant="success" onClick={finishRegion}>
              Done
            </Button>
          )}
          {addingRegion && regionMode === "edit" && (
            <Button variant="success" onClick={finishEditingRegion}>
              Done Editing
            </Button>
          )}
        </Col>
      </Row>
      <Row style={{ height: "calc(100% - 56px)" }}>
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
          {features.map((feature) => {
            if (feature.type === "pin") {
              return (
                <MapPin
                  key={feature.id}
                  feature={feature}
                  onPinClick={openModal}
                  onPinDragEnd={handlePinDragEnd}
                />
              );
            } else if (feature.type === "region") {
              if (feature.id !== editingRegionId) {
                return (
                  <MapRegion
                    key={feature.id}
                    feature={feature}
                    onRegionClick={openModal}
                  />
                );
              }
            }
            return null;
          })}
          {(addingRegion &&
            (regionMode === "mark" || regionMode === "edit") &&
            newRegionCoords?.length > 0) ? (
            <>
              <Polygon
                positions={newRegionCoords}
                pathOptions={{ color: "#3388ff", dashArray: "5, 5" }}
              />
              {newRegionCoords.map((pos, idx) => (
                <Marker
                  key={idx}
                  position={pos}
                  icon={getMarkIcon()}
                  draggable
                  eventHandlers={{
                    dragend: (e) => updateMarkPosition(idx, e),
                    contextmenu: (e) => removeMarkPoint(idx, e),
                  }}
                />
              ))}
            </>
          ) : null}
          {addingRegion &&
            regionMode === "center" &&
            newRegionCoords.length > 0 && (
              <Polygon
                positions={newRegionCoords}
                pathOptions={{ color: "#3388ff", dashArray: "5, 5" }}
              />
            )}
        </MapContainer>
      </Row>
      {activeFeature && (
        <FeatureModal
          show={showModal}
          onHide={closeModal}
          feature={activeFeature}
          updateFeature={updateFeature}
          onEditPoints={
            activeFeature.type === "region" ? handleEditPoints : undefined
          }
        />
      )}
      {contextMenu && (
        <MapContextMenu
          position={{ x: contextMenu.x, y: contextMenu.y }}
          onAddPin={handleAddPinFromContext}
          onAddRegion={handleAddRegionFromContext}
          onFinishRegion={handleFinishRegionFromContext}
          isEditingRegion={
            addingRegion && regionMode === "mark" && newRegionCoords.length >= 3
          }
          onClose={closeContextMenu}
        />
      )}
    </Container>
  );
}

export default MapView;
