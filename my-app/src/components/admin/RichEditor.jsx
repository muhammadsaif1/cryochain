import { useEffect, useRef, useCallback, useState } from "react";

const RichEditor = ({
  value,
  onChange,
  placeholder = "Write your article here…",
}) => {
  const editorRef = useRef(null);
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    strike: false,
    h2: false,
    h3: false,
    blockquote: false,
    ul: false,
    ol: false,
    alignLeft: false,
    alignCenter: false,
    alignRight: false,
    alignJustify: false,
  });

  // Sync controlled value
  useEffect(() => {
    if (editorRef.current && value !== undefined) {
      const current = editorRef.current.innerHTML;
      if (current !== value) {
        editorRef.current.innerHTML = value || "";
      }
    }
  }, [value]);

  const updateActiveFormats = useCallback(() => {
    if (!editorRef.current) return;

    const align = document.queryCommandValue("justify") || "left";

    setActiveFormats({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      strike: document.queryCommandState("strikeThrough"),
      h2: document.queryCommandValue("formatBlock") === "h2",
      h3: document.queryCommandValue("formatBlock") === "h3",
      blockquote: document.queryCommandValue("formatBlock") === "blockquote",
      ul: document.queryCommandState("insertUnorderedList"),
      ol: document.queryCommandState("insertOrderedList"),
      alignLeft: align === "left",
      alignCenter: align === "center",
      alignRight: align === "right",
      alignJustify: align === "justify",
    });
  }, []);

  const handleInput = useCallback(() => {
    if (onChange) onChange(editorRef.current?.innerHTML || "");
    updateActiveFormats();
  }, [onChange, updateActiveFormats]);

  const execCommand = useCallback(
    (cmd, val = null) => {
      editorRef.current?.focus();
      document.execCommand(cmd, false, val);
      handleInput();
    },
    [handleInput],
  );

  // Improved Clear Formatting
  const clearFormatting = useCallback(() => {
    const editor = editorRef.current;
    if (!editor) return;

    editor.focus();

    const selection = window.getSelection();
    if (selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();

    if (selectedText) {
      // If text is selected, replace with plain text
      const plainText = selectedText;
      document.execCommand("insertText", false, plainText);
    } else {
      // Clear entire editor formatting more aggressively
      const html = editor.innerHTML;
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;

      // Remove all inline styles and unwanted tags
      tempDiv.querySelectorAll("*").forEach((el) => {
        el.removeAttribute("style");
        if (
          ["B", "STRONG", "I", "EM", "U", "STRIKE", "S"].includes(el.tagName)
        ) {
          el.outerHTML = el.innerHTML;
        }
      });

      editor.innerHTML = tempDiv.innerHTML;
    }

    document.execCommand("removeFormat", false, null);
    document.execCommand("unlink", false, null);
    handleInput();
  }, [handleInput]);

  // Link
  const insertLink = useCallback(() => {
    const url = prompt("Enter the URL:", "https://");
    if (url) execCommand("createLink", url);
  }, [execCommand]);

  const unlink = useCallback(() => execCommand("unlink"), [execCommand]);

  const TOOLS = [
    {
      label: "B",
      title: "Bold",
      cmd: () => execCommand("bold"),
      activeKey: "bold",
    },
    {
      label: "I",
      title: "Italic",
      cmd: () => execCommand("italic"),
      activeKey: "italic",
    },
    {
      label: "U",
      title: "Underline",
      cmd: () => execCommand("underline"),
      activeKey: "underline",
    },
    {
      label: "S",
      title: "Strikethrough",
      cmd: () => execCommand("strikeThrough"),
      activeKey: "strike",
      style: { textDecoration: "line-through" },
    },

    { type: "separator" },

    {
      label: "H1",
      title: "Heading 1",
      cmd: () => execCommand("formatBlock", "h2"),
      activeKey: "h2",
    },
    {
      label: "H2",
      title: "Heading 2",
      cmd: () => execCommand("formatBlock", "h3"),
      activeKey: "h3",
    },
    {
      label: "P",
      title: "Paragraph",
      cmd: () => execCommand("formatBlock", "p"),
    },

    { type: "separator" },

    {
      label: "UL",
      title: "Bullet List",
      cmd: () => execCommand("insertUnorderedList"),
      activeKey: "ul",
    },
    {
      label: "OL",
      title: "Numbered List",
      cmd: () => execCommand("insertOrderedList"),
      activeKey: "ol",
    },
    {
      label: "‟",
      title: "Blockquote",
      cmd: () => execCommand("formatBlock", "blockquote"),
      activeKey: "blockquote",
    },

    { type: "separator" },

    { label: "🔗", title: "Insert Link", cmd: insertLink },
    { label: "🔗̸", title: "Remove Link", cmd: unlink },

    { type: "separator" },

    // Alignment
    {
      label: "↤",
      title: "Align Left",
      cmd: () => execCommand("justifyLeft"),
      activeKey: "alignLeft",
    },
    {
      label: "↔",
      title: "Align Center",
      cmd: () => execCommand("justifyCenter"),
      activeKey: "alignCenter",
    },
    {
      label: "↦",
      title: "Align Right",
      cmd: () => execCommand("justifyRight"),
      activeKey: "alignRight",
    },
    {
      label: "⇌",
      title: "Justify",
      cmd: () => execCommand("justifyFull"),
      activeKey: "alignJustify",
    },

    { type: "separator" },

    { label: "⟲", title: "Undo", cmd: () => execCommand("undo") },
    { label: "⟳", title: "Redo", cmd: () => execCommand("redo") },
    {
      label: "✕",
      title: "Clear Formatting",
      cmd: clearFormatting,
      isClear: true,
    },
  ];

  return (
    <div className="rte-wrap">
      <div className="rte-toolbar">
        {TOOLS.map((tool, index) => {
          if (tool.type === "separator") {
            return <div key={`sep-${index}`} className="rte-separator" />;
          }

          const isActive = tool.activeKey
            ? activeFormats[tool.activeKey]
            : false;

          return (
            <button
              key={tool.title}
              type="button"
              title={tool.title}
              className={`rte-btn ${isActive ? "rte-btn--active" : ""} ${tool.isClear ? "rte-btn-clear" : ""}`}
              style={tool.style || {}}
              onMouseDown={(e) => {
                e.preventDefault();
                tool.cmd();
              }}
            >
              {tool.label}
            </button>
          );
        })}
      </div>

      <div
        ref={editorRef}
        className="rte-body"
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        data-placeholder={placeholder}
      />
    </div>
  );
};

export default RichEditor;
