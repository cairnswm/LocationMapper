import React from "react";
import { Marker, Polygon, Tooltip } from "react-leaflet";
import { getPinIcon } from "../utils/icons";

export function MapPin({ feature, onPinClick, onPinDragEnd, onContextMenu }) {
  return (
    <Marker
      key={feature.id}
      position={feature.coords}
      icon={getPinIcon(feature.color)}
      draggable
      eventHandlers={{
        click: () => onPinClick(feature),
        dragend: (e) => onPinDragEnd(feature.id, e),
        contextmenu: (e) => {
          e.originalEvent.preventDefault();
          console.log("Right click event on Pin", feature);
          if (onContextMenu) {
            const { clientX, clientY } = e.originalEvent;
            onContextMenu({
              x: clientX,
              y: clientY,
              latlng: e.latlng, // Use the original event's latlng
              feature: feature,
            });
          }
        },
      }}
    >
      <Tooltip direction="top" offset={[0, -20]} opacity={1}>
        {feature.name || "Unnamed Pin"}
      </Tooltip>
    </Marker>
  );
}

export function MapRegion({ feature, onRegionClick, onContextMenu }) {
  return (
    <Polygon
      key={feature.id}
      positions={feature.coords}
      pathOptions={{ color: feature.color, fillColor: feature.color }}
      eventHandlers={{
        click: () => onRegionClick(feature),
        contextmenu: (e) => {
          e.originalEvent.preventDefault();
          console.log("Right click event on Region", feature);
          if (onContextMenu) {
            const { clientX, clientY } = e.originalEvent;
            onContextMenu({
              x: clientX,
              y: clientY,
              latlng: e.latlng, 
              feature: feature,
            });
          }
        },
      }}
    >
      <Tooltip direction="center" opacity={1}>
        {feature.name || "Unnamed Region"}
      </Tooltip>
    </Polygon>
  );
}
