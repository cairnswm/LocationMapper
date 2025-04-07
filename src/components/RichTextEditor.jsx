import React, { useEffect, useState, useRef } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import { Button, ButtonGroup } from 'react-bootstrap'
import { FaHeading, FaBold, FaItalic, FaUnderline, FaListUl, FaListOl, FaAdjust } from 'react-icons/fa'

function RichTextEditor({ value, onChange }) {
  const defaultTextColor = '#3388ff'
  const [localColor, setLocalColor] = useState(defaultTextColor)
  const colorInputRef = useRef(null)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color.configure({ types: ['textStyle'] })
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    }
  })

  useEffect(() => {
    if (!editor) return

    const updateColor = () => {
      const attrs = editor.getAttributes('textStyle')
      const curColor = attrs && attrs.color ? attrs.color : defaultTextColor
      setLocalColor(curColor)
    }

    updateColor()
    editor.on('selectionUpdate', updateColor)
    return () => {
      editor.off('selectionUpdate', updateColor)
    }
  }, [editor])

  if (!editor) return null

  // Opens the native color picker popup.
  // Note: The positioning of the native color picker is determined by the browser and OS,
  // and cannot be controlled via CSS or JavaScript.
  const openNativeColorPicker = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click()
    }
  }

  const handleColorChange = (e) => {
    const color = e.target.value
    setLocalColor(color)
    editor.chain().focus().setColor(color).run()
  }

  return (
    <div>
      <div className="d-flex flex-wrap gap-2 mb-2 align-items-end">
        <ButtonGroup>
          <Button variant="outline-secondary" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} title="H1">
            <FaHeading />
          </Button>
        </ButtonGroup>
        <ButtonGroup className="me-2">
          <Button variant="outline-secondary" onClick={() => editor.chain().focus().toggleBold().run()} title="Bold">
            <FaBold />
          </Button>
          <Button variant="outline-secondary" onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic">
            <FaItalic />
          </Button>
          <Button variant="outline-secondary" onClick={() => editor.chain().focus().toggleUnderline().run()} title="Underline">
            <FaUnderline />
          </Button>
        </ButtonGroup>
        <ButtonGroup className="me-2">
          <Button variant="outline-secondary" onClick={openNativeColorPicker} title="Text Color">
            <FaAdjust />
          </Button>
          {/* Hidden input to invoke native color picker
              Note: The native color picker popup position is controlled by the browser and cannot be programmatically repositioned. */}
          <input
            type="color"
            ref={colorInputRef}
            value={localColor}
            onChange={handleColorChange}
            style={{ display: 'none' }}
          />
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="outline-secondary" onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bullet List">
            <FaListUl />
          </Button>
          <Button variant="outline-secondary" onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Ordered List">
            <FaListOl />
          </Button>
        </ButtonGroup>
      </div>
      <div style={{ border: '1px solid #ced4da', borderRadius: '0.25rem', padding: '8px', minHeight: '200px' }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}

export default RichTextEditor
