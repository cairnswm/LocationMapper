import React from "react";
import { useFeaturesContext } from "../context/FeaturesContext";

function HeaderButtons({ mapCenter }) {
  const {
    addingRegion,
    regionMode,
    addPin,
    addRegionPointCenter,
    startMarkRegion,
    finishRegion,
    finishEditingRegion,
  } = useFeaturesContext();

  return (
    <div className="p-2">
      <button
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
        onClick={() => addPin(mapCenter)}
      >
        Add Pin
      </button>{" "}
      <button
        className={`${
          addingRegion && regionMode === "center"
            ? "bg-secondary-500"
            : "bg-gray-500"
        } text-white font-semibold py-2 px-4 rounded hover:bg-gray-600`}
        onClick={() => addRegionPointCenter(mapCenter)}
      >
        {addingRegion && regionMode === "center"
          ? "Add Region Point (Center)"
          : "Add Region (Center)"}
      </button>{" "}
      <button
        className="bg-gray-500 text-white font-semibold py-2 px-4 rounded hover:bg-gray-600"
        onClick={startMarkRegion}
      >
        Mark Region (Click)
      </button>{" "}
      {addingRegion && regionMode === "mark" && (
        <button
          className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600"
          onClick={finishRegion}
        >
          Done
        </button>
      )}
      {addingRegion && regionMode === "edit" && (
        <button
          className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600"
          onClick={finishEditingRegion}
        >
          Done Editing
        </button>
      )}
    </div>
  );
}

export default HeaderButtons;
