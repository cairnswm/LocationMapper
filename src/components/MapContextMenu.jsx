import React from 'react'

export function MapContextMenu({ position, onAddPin, onAddRegion, onFinishRegion, isEditingRegion, onClose }) {
  if (!position) return null

  const menuStyle = {
    position: 'fixed',
    top: position.y,
    left: position.x,
    zIndex: 1000,
    backgroundColor: 'white',
    borderRadius: '4px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    padding: '4px 0'
  }

  const menuItemStyle = {
    padding: '8px 16px',
    cursor: 'pointer',
    display: 'block',
    width: '100%',
    border: 'none',
    textAlign: 'left',
    backgroundColor: 'transparent',
    fontSize: '14px'
  }

  const handleItemHover = (e) => {
    e.target.style.backgroundColor = '#f0f0f0'
  }

  const handleItemLeave = (e) => {
    e.target.style.backgroundColor = 'transparent'
  }

  return (
    <>
      <div style={menuStyle}>
        {!isEditingRegion ? (
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
        ) : (
          <button
            style={{
              ...menuItemStyle,
              color: '#198754', // Bootstrap success color
              fontWeight: 'bold'
            }}
            onMouseEnter={handleItemHover}
            onMouseLeave={handleItemLeave}
            onClick={onFinishRegion}
          >
            Finish Region
          </button>
        )}
      </div>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999
        }}
        onClick={onClose}
      />
    </>
  )
}
