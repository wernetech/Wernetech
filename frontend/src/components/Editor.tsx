"use client";

import { useEffect, useRef } from "react";
import "quill/dist/quill.snow.css";

interface EditorProps {
  content: string;
  setContent: (html: string) => void;
}

export default function Editor({ content, setContent }: EditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillInstance = useRef<any>(null);

  useEffect(() => {
    async function loadQuill() {
      if (editorRef.current && !quillInstance.current) {
        const Quill = (await import("quill")).default;

        quillInstance.current = new Quill(editorRef.current, {
          theme: "snow",
          placeholder: "Comece a escrever...",
          modules: {
            toolbar: [
              [{ font: [] }, { size: [] }],
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ align: [] }],
              ["link", "image", "blockquote"],
              [{ color: [] }, { background: [] }],
              ["clean"],
            ],
          },
        });

        if (content) {
          quillInstance.current.root.innerHTML = content;
        }

        quillInstance.current.on("text-change", () => {
          const html = quillInstance.current.root.innerHTML;
          setContent(html);
        });
      }
    }

    loadQuill();
  }, [content, setContent]);

  return (
    <div
      ref={editorRef}
      className="bg-white border rounded min-h-[400px] p-4"
    />
  );
}
