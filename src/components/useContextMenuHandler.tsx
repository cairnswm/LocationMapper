import { useRef, useCallback } from "react";
import L from "leaflet";

export function useContextMenuHandler(onContextMenu: (info: {
  x: number;
  y: number;
  latlng: L.LatLng;
  feature: any;
}) => void) {
  const contextFlag = useRef(false);

  // Call this in your map's useMapEvents
  const mapContextHandler = useCallback((e: L.LeafletMouseEvent) => {
    if (contextFlag.current) {
      contextFlag.current = false; // reset
      return; // skip handling at map level
    }

    e.originalEvent.preventDefault();

    const { clientX, clientY } = e.originalEvent;
    onContextMenu?.({
      x: clientX,
      y: clientY,
      latlng: e.latlng,
      feature: null,
    });
  }, [onContextMenu]);

  // Call this in your Polygon/Marker eventHandlers
  const featureContextHandler = useCallback((e: L.LeafletMouseEvent, feature: any) => {
    contextFlag.current = true;
    e.originalEvent.preventDefault();
    e.originalEvent.stopPropagation();
    L.DomEvent.stopPropagation(e.originalEvent);

    const { clientX, clientY } = e.originalEvent;
    onContextMenu?.({
      x: clientX,
      y: clientY,
      latlng: e.latlng,
      feature,
    });
  }, [onContextMenu]);

  return { mapContextHandler, featureContextHandler };
}
