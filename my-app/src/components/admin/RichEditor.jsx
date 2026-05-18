import { useEffect, useRef, useCallback, useState } from "react";

const FONT_SIZES = [
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "24px",
  "28px",
  "32px",
];
const FONT_FAMILIES = [
  "Default",
  "Arial",
  "Georgia",
  "Times New Roman",
  "Courier New",
  "Trebuchet MS",
];
const TEXT_COLORS = [
  "#000000",
  "#374151",
  "#6B7280",
  "#EF4444",
  "#F97316",
  "#EAB308",
  "#22C55E",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#ffffff",
];
const HIGHLIGHT_COLORS = [
  "#FEF08A",
  "#BBF7D0",
  "#BAE6FD",
  "#FBCFE8",
  "#E9D5FF",
  "#FED7AA",
  "#transparent",
];

const RichEditor = ({
  value,
  onChange,
  placeholder = "Write your article here…",
}) => {
  const editorRef = useRef(null);
  const colorPickerRef = useRef(null);
  const highlightPickerRef = useRef(null);

  const [activeFormats, setActiveFormats] = useState({});
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);
  const [fontSize, setFontSize] = useState("16px");
  const [fontFamily, setFontFamily] = useState("Default");
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  // Sync controlled value only on mount or external change
  const lastValue = useRef(value);
  useEffect(() => {
    if (
      editorRef.current &&
      value !== undefined &&
      value !== lastValue.current
    ) {
      editorRef.current.innerHTML = value || "";
      lastValue.current = value;
    }
  }, [value]);

  const updateCounts = useCallback((text) => {
    const plain = text
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    setCharCount(plain.length);
    setWordCount(
      plain.length === 0 ? 0 : plain.split(" ").filter(Boolean).length,
    );
  }, []);

  const updateActiveFormats = useCallback(() => {
    if (!editorRef.current) return;
    try {
      setActiveFormats({
        bold: document.queryCommandState("bold"),
        italic: document.queryCommandState("italic"),
        underline: document.queryCommandState("underline"),
        strike: document.queryCommandState("strikeThrough"),
        ul: document.queryCommandState("insertUnorderedList"),
        ol: document.queryCommandState("insertOrderedList"),
        h1: document.queryCommandValue("formatBlock") === "h1",
        h2: document.queryCommandValue("formatBlock") === "h2",
        h3: document.queryCommandValue("formatBlock") === "h3",
        blockquote: document.queryCommandValue("formatBlock") === "blockquote",
        alignLeft: document.queryCommandState("justifyLeft"),
        alignCenter: document.queryCommandState("justifyCenter"),
        alignRight: document.queryCommandState("justifyRight"),
        alignJustify: document.queryCommandState("justifyFull"),
      });
    } catch (_) {}
  }, []);

  const handleInput = useCallback(() => {
    const html = editorRef.current?.innerHTML || "";
    lastValue.current = html;
    onChange?.(html);
    updateActiveFormats();
    updateCounts(html);
  }, [onChange, updateActiveFormats, updateCounts]);

  const exec = useCallback(
    (cmd, val = null) => {
      editorRef.current?.focus();
      try {
        document.execCommand(cmd, false, val);
      } catch (_) {}
      handleInput();
    },
    [handleInput],
  );

  // ── Reliable formatBlock toggle ──
  const toggleBlock = useCallback(
    (tag) => {
      editorRef.current?.focus();
      const current = document.queryCommandValue("formatBlock");
      // If already that block, revert to paragraph
      document.execCommand("formatBlock", false, current === tag ? "p" : tag);
      handleInput();
    },
    [handleInput],
  );

  // ── Clear ALL formatting — robust version ──
  const clearFormatting = useCallback(() => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.focus();

    const selection = window.getSelection();

    // If something is selected — strip inline formats from selection
    if (selection && selection.rangeCount > 0 && !selection.isCollapsed) {
      document.execCommand("removeFormat", false, null);
      document.execCommand("unlink", false, null);
      // Also reset block to paragraph
      document.execCommand("formatBlock", false, "p");
      handleInput();
      return;
    }

    // Nothing selected — strip everything from the entire editor
    const plain = editor.innerText; // raw text, no tags
    editor.innerHTML = "";

    // Re-insert as plain paragraphs split by newlines
    const lines = plain.split(/\n+/).filter(Boolean);
    if (lines.length === 0) {
      editor.innerHTML = "<p><br></p>";
    } else {
      editor.innerHTML = lines.map((l) => `<p>${l}</p>`).join("");
    }

    // Move cursor to end
    const range = document.createRange();
    range.selectNodeContents(editor);
    range.collapse(false);
    selection?.removeAllRanges();
    selection?.addRange(range);

    handleInput();
  }, [handleInput]);

  // ── Font size ──
  const applyFontSize = useCallback(
    (size) => {
      setFontSize(size);
      editorRef.current?.focus();
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) return;
      const range = selection.getRangeAt(0);
      const span = document.createElement("span");
      span.style.fontSize = size;
      try {
        range.surroundContents(span);
      } catch {
        const fragment = range.extractContents();
        span.appendChild(fragment);
        range.insertNode(span);
      }
      handleInput();
    },
    [handleInput],
  );

  // ── Font family ──
  const applyFontFamily = useCallback(
    (family) => {
      setFontFamily(family);
      if (family === "Default") {
        exec("fontName", "inherit");
      } else {
        exec("fontName", family);
      }
    },
    [exec],
  );

  // ── Text color ──
  const applyColor = useCallback(
    (color) => {
      exec("foreColor", color);
      setShowColorPicker(false);
    },
    [exec],
  );

  // ── Highlight ──
  const applyHighlight = useCallback(
    (color) => {
      if (color === "#transparent") {
        exec("hiliteColor", "transparent");
      } else {
        exec("hiliteColor", color);
      }
      setShowHighlightPicker(false);
    },
    [exec],
  );

  // ── Insert HR ──
  const insertHR = useCallback(() => {
    exec("insertHorizontalRule");
  }, [exec]);

  // ── Insert image by URL ──
  const insertImage = useCallback(() => {
    const url = prompt("Image URL:", "https://");
    if (url) exec("insertImage", url);
  }, [exec]);

  // ── Insert link ──
  const insertLink = useCallback(() => {
    const url = prompt("URL:", "https://");
    if (url) exec("createLink", url);
  }, [exec]);

  // ── Indent ──
  const indent = useCallback(() => exec("indent"), [exec]);
  const outdent = useCallback(() => exec("outdent"), [exec]);

  // Close pickers on outside click
  useEffect(() => {
    const handler = (e) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(e.target))
        setShowColorPicker(false);
      if (
        highlightPickerRef.current &&
        !highlightPickerRef.current.contains(e.target)
      )
        setShowHighlightPicker(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const btn = (isActive, isClear) =>
    `rte-btn${isActive ? " rte-btn--active" : ""}${isClear ? " rte-btn--clear" : ""}`;

  return (
    <div className="rte-wrap">
      {/* ── Toolbar ── */}
      <div className="rte-toolbar">
        {/* Font family */}
        <select
          className="rte-select"
          value={fontFamily}
          onChange={(e) => applyFontFamily(e.target.value)}
          title="Font Family"
        >
          {FONT_FAMILIES.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>

        {/* Font size */}
        <select
          className="rte-select rte-select--sm"
          value={fontSize}
          onChange={(e) => applyFontSize(e.target.value)}
          title="Font Size"
        >
          {FONT_SIZES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <div className="rte-sep" />

        {/* Inline styles */}
        <button
          type="button"
          title="Bold (Ctrl+B)"
          className={btn(activeFormats.bold)}
          onMouseDown={(e) => {
            e.preventDefault();
            exec("bold");
          }}
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          title="Italic (Ctrl+I)"
          className={btn(activeFormats.italic)}
          onMouseDown={(e) => {
            e.preventDefault();
            exec("italic");
          }}
        >
          <em>I</em>
        </button>
        <button
          type="button"
          title="Underline (Ctrl+U)"
          className={btn(activeFormats.underline)}
          onMouseDown={(e) => {
            e.preventDefault();
            exec("underline");
          }}
        >
          <u>U</u>
        </button>
        <button
          type="button"
          title="Strikethrough"
          className={btn(activeFormats.strike)}
          onMouseDown={(e) => {
            e.preventDefault();
            exec("strikeThrough");
          }}
          style={{ textDecoration: "line-through" }}
        >
          S
        </button>

        <div className="rte-sep" />

        {/* Block styles */}
        <button
          type="button"
          title="Heading 1"
          className={btn(activeFormats.h1)}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlock("h1");
          }}
        >
          H1
        </button>
        <button
          type="button"
          title="Heading 2"
          className={btn(activeFormats.h2)}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlock("h2");
          }}
        >
          H2
        </button>
        <button
          type="button"
          title="Heading 3"
          className={btn(activeFormats.h3)}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlock("h3");
          }}
        >
          H3
        </button>
        <button
          type="button"
          title="Paragraph"
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlock("p");
          }}
          className="rte-btn"
        >
          P
        </button>
        <button
          type="button"
          title="Blockquote"
          className={btn(activeFormats.blockquote)}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlock("blockquote");
          }}
        >
          ❝
        </button>

        <div className="rte-sep" />

        {/* Lists + indent */}
        <button
          type="button"
          title="Bullet List"
          className={btn(activeFormats.ul)}
          onMouseDown={(e) => {
            e.preventDefault();
            exec("insertUnorderedList");
          }}
        >
          UL
        </button>
        <button
          type="button"
          title="Numbered List"
          className={btn(activeFormats.ol)}
          onMouseDown={(e) => {
            e.preventDefault();
            exec("insertOrderedList");
          }}
        >
          OL
        </button>
        <button
          type="button"
          title="Indent"
          className="rte-btn"
          onMouseDown={(e) => {
            e.preventDefault();
            indent();
          }}
        >
          →
        </button>
        <button
          type="button"
          title="Outdent"
          className="rte-btn"
          onMouseDown={(e) => {
            e.preventDefault();
            outdent();
          }}
        >
          ←
        </button>

        <div className="rte-sep" />

        {/* Alignment */}
        <button
          type="button"
          title="Align Left"
          className={btn(activeFormats.alignLeft)}
          onMouseDown={(e) => {
            e.preventDefault();
            exec("justifyLeft");
          }}
        >
          ⬱
        </button>
        <button
          type="button"
          title="Align Center"
          className={btn(activeFormats.alignCenter)}
          onMouseDown={(e) => {
            e.preventDefault();
            exec("justifyCenter");
          }}
        >
          ☰
        </button>
        <button
          type="button"
          title="Align Right"
          className={btn(activeFormats.alignRight)}
          onMouseDown={(e) => {
            e.preventDefault();
            exec("justifyRight");
          }}
        >
          ⬰
        </button>
        <button
          type="button"
          title="Justify"
          className={btn(activeFormats.alignJustify)}
          onMouseDown={(e) => {
            e.preventDefault();
            exec("justifyFull");
          }}
        >
          ⇔
        </button>

        <div className="rte-sep" />

        {/* Color pickers */}
        <div className="rte-picker-wrap" ref={colorPickerRef}>
          <button
            type="button"
            title="Text Color"
            className="rte-btn rte-btn--color"
            onMouseDown={(e) => {
              e.preventDefault();
              setShowColorPicker((v) => !v);
              setShowHighlightPicker(false);
            }}
          >
            <span>A</span>
            <span className="rte-color-bar" style={{ background: "#3B82F6" }} />
          </button>
          {showColorPicker && (
            <div className="rte-color-popup">
              {TEXT_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  className="rte-swatch"
                  style={{
                    background: c,
                    border: c === "#ffffff" ? "1px solid #ccc" : "none",
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    applyColor(c);
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="rte-picker-wrap" ref={highlightPickerRef}>
          <button
            type="button"
            title="Highlight"
            className="rte-btn rte-btn--color"
            onMouseDown={(e) => {
              e.preventDefault();
              setShowHighlightPicker((v) => !v);
              setShowColorPicker(false);
            }}
          >
            <span>H</span>
            <span className="rte-color-bar" style={{ background: "#FEF08A" }} />
          </button>
          {showHighlightPicker && (
            <div className="rte-color-popup">
              {HIGHLIGHT_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  className="rte-swatch"
                  style={{
                    background: c === "#transparent" ? "white" : c,
                    border: "1px solid #ccc",
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    applyHighlight(c);
                  }}
                  title={c === "#transparent" ? "Remove highlight" : c}
                >
                  {c === "#transparent" ? "✕" : ""}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="rte-sep" />

        {/* Insert */}
        <button
          type="button"
          title="Insert Link"
          className="rte-btn"
          onMouseDown={(e) => {
            e.preventDefault();
            insertLink();
          }}
        >
          🔗
        </button>
        <button
          type="button"
          title="Remove Link"
          className="rte-btn"
          onMouseDown={(e) => {
            e.preventDefault();
            exec("unlink");
          }}
        >
          ✂
        </button>
        <button
          type="button"
          title="Insert Image"
          className="rte-btn"
          onMouseDown={(e) => {
            e.preventDefault();
            insertImage();
          }}
        >
          🖼
        </button>
        <button
          type="button"
          title="Horizontal Rule"
          className="rte-btn"
          onMouseDown={(e) => {
            e.preventDefault();
            insertHR();
          }}
        >
          ―
        </button>

        <div className="rte-sep" />

        {/* History + clear */}
        <button
          type="button"
          title="Undo (Ctrl+Z)"
          className="rte-btn"
          onMouseDown={(e) => {
            e.preventDefault();
            exec("undo");
          }}
        >
          ↩
        </button>
        <button
          type="button"
          title="Redo (Ctrl+Y)"
          className="rte-btn"
          onMouseDown={(e) => {
            e.preventDefault();
            exec("redo");
          }}
        >
          ↪
        </button>
        <button
          type="button"
          title="Clear All Formatting"
          className={btn(false, true)}
          onMouseDown={(e) => {
            e.preventDefault();
            clearFormatting();
          }}
        >
          ✕ Clear
        </button>
      </div>

      {/* ── Editor body ── */}
      <div
        ref={editorRef}
        className="rte-body"
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onKeyUp={updateActiveFormats}
        onMouseUp={updateActiveFormats}
        onSelect={updateActiveFormats}
        data-placeholder={placeholder}
      />

      {/* ── Status bar ── */}
      <div className="rte-statusbar">
        <span>{wordCount} words</span>
        <span>{charCount} characters</span>
      </div>
    </div>
  );
};

export default RichEditor;
