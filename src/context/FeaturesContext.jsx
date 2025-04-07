import React, { createContext, useContext, useState } from "react";
import { initialFeatures, defaultColor } from "../data/initialFeatures";
import { getLocationName } from "../utils/geocoding";

const FeaturesContext = createContext();

export function useFeaturesContext() {
  const context = useContext(FeaturesContext);
  if (!context) {
    throw new Error(
      "useFeaturesContext must be used within a FeaturesProvider"
    );
  }
  return context;
}

export function FeaturesProvider({ children }) {
  const [features, setFeatures] = useState(initialFeatures);
  const [activeFeature, setActiveFeature] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [addingRegion, setAddingRegion] = useState(false);
  const [regionMode, setRegionMode] = useState(null);
  const [newRegionCoords, setNewRegionCoords] = useState([]);
  const [editingRegionId, setEditingRegionId] = useState(null);

  const addPin = async (coords) => {
    // Create pin immediately with temporary name
    const newPin = {
      id: features.length + 1,
      type: "pin",
      coords,
      images: [],
      name: "Loading location name...",
      text: "",
      color: defaultColor,
    };

    // Add the pin to features first
    setFeatures((currentFeatures) => [...currentFeatures, newPin]);

    // Open modal immediately
    openModal(newPin);

    // Fetch location name
    try {
      const locationName = await getLocationName(coords[0], coords[1]);

      // Update pin with fetched name
      const updatedPin = {
        ...newPin,
        name: locationName,
      };

      // Update both the features list and active feature atomically
      setFeatures((currentFeatures) =>
        currentFeatures.map((f) => (f.id === newPin.id ? updatedPin : f))
      );
      setActiveFeature((current) =>
        current?.id === newPin.id ? updatedPin : current
      );
    } catch (error) {
      console.error("Failed to fetch location name:", error);
    }
  };

  const updateFeature = (updatedFeature) => {
    setFeatures(
      features.map((f) => (f.id === updatedFeature.id ? updatedFeature : f))
    );
    setActiveFeature(null);
  };

  const addRegionPointCenter = (mapCenter) => {
    if (!addingRegion) {
      setAddingRegion(true);
      setRegionMode("center");
      setNewRegionCoords([]);
    } else if (regionMode === "center") {
      setNewRegionCoords([...newRegionCoords, mapCenter]);
    }
  };

  const startMarkRegion = () => {
    setAddingRegion(true);
    setRegionMode("mark");
    setNewRegionCoords([]);
  };

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setNewRegionCoords([...newRegionCoords, [lat, lng]]);
  };

  const updateMarkPosition = (index, e) => {
    const { lat, lng } = e.target.getLatLng();
    const updatedCoords = [...newRegionCoords];
    updatedCoords[index] = [lat, lng];
    setNewRegionCoords(updatedCoords);
  };

  const removeMarkPoint = (index, e) => {
    e.originalEvent.preventDefault();
    const updatedCoords = newRegionCoords.filter((_, idx) => idx !== index);
    setNewRegionCoords(updatedCoords);
  };

  const finishRegion = () => {
    if (newRegionCoords.length >= 3) {
      const newRegion = {
        id: features.length + 1,
        type: "region",
        coords: newRegionCoords,
        images: [],
        name: "New Region",
        text: "",
        color: defaultColor,
      };
      setFeatures([...features, newRegion]);
      setAddingRegion(false);
      setRegionMode(null);
      setNewRegionCoords([]);
      openModal(newRegion);
    }
  };

  const handleEditPoints = (region) => {
    console.log("Editing region:", region);
    setAddingRegion(true);
    setRegionMode("edit");
    setNewRegionCoords(region.coords);
    setEditingRegionId(region.id);
    setShowModal(false);
  };

  const finishEditingRegion = () => {
    if (newRegionCoords.length >= 3) {
      const updatedFeatures = features.map((f) =>
        f.id === editingRegionId ? { ...f, coords: newRegionCoords } : f
      );
      setFeatures(updatedFeatures);
      setAddingRegion(false);
      setRegionMode(null);
      setNewRegionCoords([]);
      setEditingRegionId(null);
    }
  };

  const handlePinDragEnd = (id, e) => {
    const { lat, lng } = e.target.getLatLng();
    const updatedFeatures = features.map((f) =>
      f.id === id ? { ...f, coords: [lat, lng] } : f
    );
    setFeatures(updatedFeatures);
  };

  const openModal = (feature) => {
    setActiveFeature(feature);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setActiveFeature(null);
  };

  const startRegionAtPoint = (coords) => {
    setAddingRegion(true);
    setRegionMode("mark");
    setNewRegionCoords([coords]);
  };

  const value = {
    features,
    activeFeature,
    showModal,
    addingRegion,
    regionMode,
    newRegionCoords,
    editingRegionId,
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
  };

  return (
    <FeaturesContext.Provider value={value}>
      {children}
    </FeaturesContext.Provider>
  );
}
