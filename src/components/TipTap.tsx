"use client"
import Blockquote from '@tiptap/extension-blockquote'
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Text from '@tiptap/extension-text'
import Paragraph from '@tiptap/extension-paragraph'
import Document from '@tiptap/extension-document'
import { useEffect, useState } from 'react'

export default function TipTap({ value = '', onChange, placeholder = 'Start typing...', error }) {
    const [isMounted, setIsMounted] = useState(false)
    
    const editor = useEditor({
        extensions:[ 
            StarterKit,
            Document,
            Paragraph,
            Text,
            Blockquote.configure({
                HTMLAttributes: { class: "border-l-4 border-gray-500 bg-gray-100 p-2 ml-3 " },
            })
        ],
        content: value,
        editorProps: {
            attributes: {
                class : 'focus:outline-none min-h-[200px] [&>*:first-child]:mt-0'
            }
        },
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML()
            onChange?.(html)
        }
    })

    // Update editor content when value prop changes
    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value)
        }
    }, [value, editor])

    // Handle client-side mounting
    useEffect(() => {
        setIsMounted(true)
    }, [])

    // Don't render until mounted on client
    if (!isMounted) {
        return (
            <div className="flex flex-col gap-1">
                <label className="font-medium text-gray-800">Course Description</label>
                <div className="border border-gray-300 rounded-md p-4 mb-30">
                    <div className="control-group mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                            <div className="border border-gray-300 p-2 bg-gray-50 rounded-md text-gray-700 text-sm opacity-50">
                                Loading editor...
                            </div>
                        </div>
                    </div>
                    <div className="min-h-[120px] bg-white p-4 border border-gray-200 rounded-md opacity-50 flex items-center justify-center">
                        <span className="text-gray-500">Loading editor...</span>
                    </div>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
        )
    }

    if (!editor) return null;

    return(
        <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-800">Course Description</label>
            <div className="border border-gray-300 rounded-md p-4 w-full">
                <div className="control-group mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                        <button 
                            type="button"
                            className={`border border-gray-300 p-2 bg-gray-50 rounded-md cursor-pointer text-gray-700 text-sm ${
                                editor.isActive('bold') ? 'bg-blue-100 border-blue-300' : ''
                            }`}
                            onClick={() => editor.chain().focus().toggleBold().run()}
                        >
                            Bold
                        </button>
                        <button 
                            type="button"
                            className={`border border-gray-300 p-2 bg-gray-50 rounded-md cursor-pointer text-gray-700 text-sm ${
                                editor.isActive('heading', { level: 2 }) ? 'bg-blue-100 border-blue-300' : ''
                            }`}
                            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        >
                            H2
                        </button>
                        <button 
                            type="button"
                            className={`border border-gray-300 p-2 bg-gray-50 rounded-md cursor-pointer text-gray-700 text-sm ${
                                editor.isActive('bulletList') ? 'bg-blue-100 border-blue-300' : ''
                            }`}
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                        >
                            Bl
                        </button>
                        <button 
                            type="button"
                            className={`border border-gray-300 p-2 bg-gray-50 rounded-md cursor-pointer text-gray-700 text-sm ${
                                editor.isActive('orderedList') ? 'bg-blue-100 border-blue-300' : ''
                            }`}
                            onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        >
                            Ol
                        </button>
                        <button 
                            type="button"
                            className={`border border-gray-300 p-2 bg-gray-50 rounded-md cursor-pointer text-gray-700 text-sm ${
                                editor.isActive('blockquote') ? 'bg-blue-100 border-blue-300' : ''
                            }`}
                            onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        >
                            Quote
                        </button>             
                    </div>
                </div>
                <EditorContent 
                    editor={editor} 
                    tabIndex={0} 
                    className="prose min-h-[120px] p-4 border bg-gray-50 border-gray-200 focus-within:border-gray-500 transition-colors duration-200 rounded-md outline-none focus:border-gray-500"
                />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    )
}