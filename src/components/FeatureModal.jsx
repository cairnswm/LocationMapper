import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import RichTextEditor from './RichTextEditor'

function FeatureModal({ show, onHide, feature, updateFeature, onEditPoints }) {
  const [name, setName] = useState(feature?.name || '')
  const [text, setText] = useState(feature?.text || '')
  const [color, setColor] = useState(feature?.color || '#3388ff')
  const [images, setImages] = useState(feature?.images || [])

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
    <Modal show={show} onHide={onHide} size="lg">
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{feature.type === 'pin' ? 'Edit Pin' : 'Edit Region'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <RichTextEditor value={text} onChange={setText} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Color</Form.Label>
            <Form.Control
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Images</Form.Label>
            <div className="d-flex flex-wrap gap-2 mb-2">
              {images.map((img, index) => (
                <div key={index} className="position-relative" style={{ width: '150px' }}>
                  <img
                    src={img}
                    alt={`Feature ${index + 1}`}
                    className="img-thumbnail"
                    style={{ width: '100%', height: '100px', objectFit: 'cover' }}
                  />
                  <Button
                    variant="danger"
                    size="sm"
                    className="position-absolute top-0 end-0"
                    onClick={() => removeImage(index)}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </Form.Group>

          {feature.type === 'region' && onEditPoints && (
            <Button variant="secondary" onClick={() => onEditPoints(feature)} className="mb-3">
              Edit Region Points
            </Button>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default FeatureModal
