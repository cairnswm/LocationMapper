import React from "react";
import { Marker, Polygon } from "react-leaflet";
import { MapPin, MapRegion } from "./MapFeatures";
import { getMarkIcon } from "../utils/icons";
import { useFeaturesContext } from "../context/FeaturesContext";

function MarkerDisplay({
  features,
  editingRegionId,
  addingRegion,
  regionMode,
  newRegionCoords,
  onContextMenu
}) {
  const { updateMarkPosition, removeMarkPoint, openModal, handlePinDragEnd } =
    useFeaturesContext();

  return (
    <>
      {features.map((feature) => {
        if (feature.type === "pin") {
          return (
            <MapPin
              key={feature.id}
              feature={feature}
              onPinClick={openModal}
              onPinDragEnd={handlePinDragEnd}
              onContextMenu={onContextMenu}
            />
          );
        } else if (feature.type === "region") {
          if (feature.id !== editingRegionId) {
            return (
              <MapRegion
                key={feature.id}
                feature={feature}
                onRegionClick={openModal}
                onContextMenu={onContextMenu}
              />
            );
          }
        }
        return null;
      })}
      {addingRegion &&
      (regionMode === "mark" ||
        regionMode === "edit" ||
        regionMode === "center") &&
      newRegionCoords?.length > 0 ? (
        <>
          <Polygon
            positions={newRegionCoords}
            pathOptions={{ color: "#3388ff", dashArray: "5, 5" }}
            eventHandlers={{
              click: () => onRegionClick(feature),
              contextmenu: (e) => {
                e.originalEvent.preventDefault();
                console.log("Right click event on Editing Region");
                if (onContextMenu) {
                  const { clientX, clientY } = e.originalEvent;
                  onContextMenu({
                    x: clientX,
                    y: clientY,
                    latlng: e.latlng,
                  });
                }
              },
            }}
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
    </>
  );
}

export default MarkerDisplay;
