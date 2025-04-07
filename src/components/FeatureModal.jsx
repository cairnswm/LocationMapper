import React, { useState, useEffect } from 'react'
import RichTextEditor from './RichTextEditor'
import { useFeaturesContext } from "../context/FeaturesContext";
import FullscreenImageModal from './FullscreenImageModal';
import { FaTrash } from 'react-icons/fa';

function FeatureModal({ show, onHide, feature, updateFeature }) {
  const { handleEditPoints } = useFeaturesContext();
  const [name, setName] = useState(feature?.name || '')
  const [text, setText] = useState(feature?.text || '')
  const [color, setColor] = useState(feature?.color || '#3388ff')
  const [images, setImages] = useState(feature?.images || [])
  const [fullscreenImage, setFullscreenImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault()
    updateFeature({
      ...feature,
      name,
      text,
      color,
      images
    })
    onHide()
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImages([...images, reader.result])
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleImageClick = (img) => {
    setFullscreenImage(img);
  };

  const closeFullscreenImage = () => {
    setFullscreenImage(null);
  };

  useEffect(() => {
    if (feature) {
      setName(feature.name || '')
      setText(feature.text || '')
      setColor(feature.color || '#3388ff')
      setImages(feature.images || [])
    }
  }, [feature])

  if (!feature) return null

  return (
    <>
      <FullscreenImageModal image={fullscreenImage} onClose={closeFullscreenImage} />

      {/* Existing Modal */}
      <div
        className={`fixed inset-0 z-[1000] flex items-center justify-center ${
          show ? 'block' : 'hidden'
        }`}
        style={{zIndex: 1000, maxWidth: "90vw", marginLeft: "auto", marginRight: "auto"}}
      >
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={onHide}
          style={{ zIndex: 999 }}
        ></div>
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl relative"
        style={{ zIndex: 1001 }}>
          <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h2 className="text-lg font-semibold">
                {feature.type === 'pin' ? 'Edit Pin' : 'Edit Region'}
              </h2>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700"
                onClick={onHide}
              >
                ×
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <RichTextEditor value={text} onChange={setText} />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Color</label>
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-16 h-10 p-0 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Images</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className="relative w-36 h-24 border rounded overflow-hidden"
                    >
                      <img
                        src={img}
                        alt={`Feature ${index + 1}`}
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => handleImageClick(img)}
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                        onClick={() => removeImage(index)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300 file:text-sm file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                />
              </div>

              {feature.type === 'region' && (
                <button
                  type="button"
                  onClick={() => handleEditPoints(feature)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded"
                >
                  Edit Region Points
                </button>
              )}
            </div>
            <div className="flex justify-end items-center px-4 py-3 border-t">
              <button
                type="button"
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                onClick={onHide}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default FeatureModal
