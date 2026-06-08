import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
};

export function RichTextEditor({ value, onChange, error }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: `prose prose-sm max-w-none w-full rounded-b-lg border border-t-0 px-3 py-4 transition-colors focus:outline-none min-h-[150px] ${
          error
            ? "border-red-400 bg-red-50 focus:border-red-400"
            : "border-gray-200 bg-white focus:border-gray-300"
        }`,
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="rich-text-editor">
      <div
        className={`flex flex-wrap gap-2 rounded-t-lg border px-3 py-2 transition-colors ${
          error ? "border-red-400 bg-red-100" : "border-gray-200 bg-gray-50"
        }`}
      >
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`rounded px-2 py-1 text-sm font-bold ${
            editor.isActive("bold")
              ? "bg-gray-200 text-gray-900"
              : "text-gray-600 hover:bg-gray-200"
          }`}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`rounded px-2 py-1 text-sm italic ${
            editor.isActive("italic")
              ? "bg-gray-200 text-gray-900"
              : "text-gray-600 hover:bg-gray-200"
          }`}
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`rounded px-2 py-1 text-sm line-through ${
            editor.isActive("strike")
              ? "bg-gray-200 text-gray-900"
              : "text-gray-600 hover:bg-gray-200"
          }`}
        >
          S
        </button>
        <div className="mx-1 my-1 w-px bg-gray-300" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`rounded px-2 py-1 text-sm font-bold ${
            editor.isActive("heading", { level: 2 })
              ? "bg-gray-200 text-gray-900"
              : "text-gray-600 hover:bg-gray-200"
          }`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`rounded px-2 py-1 text-sm font-bold ${
            editor.isActive("heading", { level: 3 })
              ? "bg-gray-200 text-gray-900"
              : "text-gray-600 hover:bg-gray-200"
          }`}
        >
          H3
        </button>
        <div className="mx-1 my-1 w-px bg-gray-300" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`rounded px-2 py-1 text-sm ${
            editor.isActive("bulletList")
              ? "bg-gray-200 text-gray-900"
              : "text-gray-600 hover:bg-gray-200"
          }`}
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`rounded px-2 py-1 text-sm ${
            editor.isActive("orderedList")
              ? "bg-gray-200 text-gray-900"
              : "text-gray-600 hover:bg-gray-200"
          }`}
        >
          1. List
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
