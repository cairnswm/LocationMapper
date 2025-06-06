import React, { useEffect, useState, useRef } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
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
      <div className="flex flex-wrap gap-2 mb-2 items-end">
        <div className="flex">
          <div className="inline-flex border border-gray-300 rounded-md overflow-hidden">
            <button
              className="px-3 py-2 hover:bg-gray-100 border-r border-gray-300"
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              title="H1"
            >
              <FaHeading />
            </button>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="inline-flex border border-gray-300 rounded-md overflow-hidden">
            <button
              className="px-3 py-2 hover:bg-gray-100 border-r border-gray-300"
              onClick={() => editor.chain().focus().toggleBold().run()}
              title="Bold"
            >
              <FaBold />
            </button>
            <button
              className="px-3 py-2 hover:bg-gray-100 border-r border-gray-300"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              title="Italic"
            >
              <FaItalic />
            </button>
            <button
              className="px-3 py-2 hover:bg-gray-100"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              title="Underline"
            >
              <FaUnderline />
            </button>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="inline-flex border border-gray-300 rounded-md overflow-hidden">
            <button
              className="px-3 py-2 hover:bg-gray-100"
              onClick={openNativeColorPicker}
              title="Text Color"
            >
              <FaAdjust />
            </button>
            {/* Hidden input to invoke native color picker */}
            <input
              type="color"
              ref={colorInputRef}
              value={localColor}
              onChange={handleColorChange}
              className="hidden"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="inline-flex border border-gray-300 rounded-md overflow-hidden">
            <button
              className="px-3 py-2 hover:bg-gray-100 border-r border-gray-300"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              title="Bullet List"
            >
              <FaListUl />
            </button>
            <button
              className="px-3 py-2 hover:bg-gray-100"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              title="Ordered List"
            >
              <FaListOl />
            </button>
          </div>
        </div>
      </div>
      <div className="border border-gray-300 rounded-md p-2 min-h-[200px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}

export default RichTextEditor
