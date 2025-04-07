import React from "react";
import { Marker, Polygon, Tooltip } from "react-leaflet";
import { getPinIcon } from "../utils/icons";
import { useContextMenuHandler } from "./useContextMenuHandler";

export function MapPin({ feature, onPinClick, onPinDragEnd, onContextMenu, featureContextHandler }) {
  return (
    <Marker
      key={feature.id}
      position={feature.coords}
      icon={getPinIcon(feature.color)}
      draggable
      eventHandlers={{
        click: () => onPinClick(feature),
        dragend: (e) => onPinDragEnd(feature.id, e),
        contextmenu: (e) => featureContextHandler(e, feature),
      }}
    >
      <Tooltip direction="top" offset={[0, -20]} opacity={1}>
        {feature.name || "Unnamed Pin"}
      </Tooltip>
    </Marker>
  );
}

export function MapRegion({ feature, onRegionClick, onContextMenu, featureContextHandler }) {
  return (
    <Polygon
      key={feature.id}
      positions={feature.coords}
      pathOptions={{ color: feature.color, fillColor: feature.color }}
      eventHandlers={{
        click: () => onRegionClick(feature),
        contextmenu: (e) => featureContextHandler(e, feature),
      }}
    >
      <Tooltip direction="center" opacity={1}>
        {feature.name || "Unnamed Region"}
      </Tooltip>
    </Polygon>
  );
}
