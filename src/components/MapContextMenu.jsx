import React from "react";
import { useFeaturesContext } from "../context/FeaturesContext";

export function MapContextMenu({
  position,
  onAddPin,
  onAddRegion,
  onFinishRegion,
  isEditingRegion,
  onClose,
  feature,
}) {
  const { handleEditPoints, editingRegionId, finishEditingRegion } =
    useFeaturesContext();
  if (!position) return null;

  const menuStyle = {
    position: "fixed",
    top: position.y,
    left: position.x,
    zIndex: 1000,
    backgroundColor: "white",
    borderRadius: "4px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    padding: "4px 0",
  };

  const menuItemStyle = {
    padding: "8px 16px",
    cursor: "pointer",
    display: "block",
    width: "100%",
    border: "none",
    textAlign: "left",
    backgroundColor: "transparent",
    fontSize: "14px",
  };

  const handleItemHover = (e) => {
    e.target.style.backgroundColor = "#f0f0f0";
  };

  const handleItemLeave = (e) => {
    e.target.style.backgroundColor = "transparent";
  };

  return (
    <>
      <div style={menuStyle}>
        {feature && (
          <div style={{ padding: "8px 16px", fontSize: "14px" }}>
            <strong>{feature.name || "Unnamed Feature"}</strong>
            <p>{feature.description}</p>
          </div>
        )}
        {!isEditingRegion && (
          <>
            <button
              style={menuItemStyle}
              onMouseEnter={handleItemHover}
              onMouseLeave={handleItemLeave}
              onClick={onAddPin}
            >
              Add Pin Here
            </button>
            <button
              style={menuItemStyle}
              onMouseEnter={handleItemHover}
              onMouseLeave={handleItemLeave}
              onClick={onAddRegion}
            >
              Start Region Here
            </button>
          </>
        )}
        {isEditingRegion && (
          <button
            style={{
              ...menuItemStyle,
              color: "#198754",
              fontWeight: "bold",
            }}
            onMouseEnter={handleItemHover}
            onMouseLeave={handleItemLeave}
            onClick={onFinishRegion}
          >
            Finish Region
          </button>
        )}
        {feature?.type === "region" && (
          <button
            style={menuItemStyle}
            onMouseEnter={handleItemHover}
            onMouseLeave={handleItemLeave}
            onClick={() => {
              handleEditPoints(feature);
              onClose();
            }}
          >
            Edit Region
          </button>
        )}
        {!feature && editingRegionId && (
          <button
            style={menuItemStyle}
            onMouseEnter={handleItemHover}
            onMouseLeave={handleItemLeave}
            onClick={() => {
              finishEditingRegion();
              onClose();
            }}
          >
            Done Editing
          </button>
        )}
      </div>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999,
        }}
        onClick={onClose}
      />
    </>
  );
}
