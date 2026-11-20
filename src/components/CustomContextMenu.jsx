import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Copy,
  Scissors,
  ClipboardPaste,
  Printer,
  ExternalLink,
  AppWindow,
  Link2,
  Image as ImageIcon,
  Download,
  TextSelect,
  Check,
  AlertCircle,
  Gamepad2,
} from "lucide-react";

const MENU_MARGIN = 12;

function isEditableElement(el) {
  if (!el || !(el instanceof HTMLElement)) return false;
  if (el.isContentEditable) return true;
  if (el.tagName === "TEXTAREA") return !el.readOnly && !el.disabled;
  if (el.tagName === "INPUT") {
    const nonTextTypes = new Set([
      "button",
      "checkbox",
      "color",
      "file",
      "hidden",
      "image",
      "radio",
      "range",
      "reset",
      "submit",
    ]);
    return !nonTextTypes.has((el.type || "text").toLowerCase()) && !el.readOnly && !el.disabled;
  }
  return false;
}

function getSelectedTextFromTarget(target) {
  if (
    target &&
    (target.tagName === "INPUT" || target.tagName === "TEXTAREA") &&
    typeof target.selectionStart === "number" &&
    typeof target.selectionEnd === "number"
  ) {
    return target.value.slice(target.selectionStart, target.selectionEnd);
  }
  return window.getSelection()?.toString() ?? "";
}

function deriveImageFilename(imgEl) {
  const src = imgEl.currentSrc || imgEl.src || "";
  try {
    const url = new URL(src, window.location.href);
    const lastSegment = url.pathname.split("/").filter(Boolean).pop();
    if (lastSegment && /\.[a-z0-9]{2,5}$/i.test(lastSegment)) {
      return lastSegment;
    }
  } catch {
    // ignore URL parse error
  }
  const altSlug = (imgEl.alt || "image")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${altSlug || "image"}.png`;
}

function formatDisplayUrl(rawUrl) {
  try {
    const url = new URL(rawUrl, window.location.href);
    if (url.protocol === "mailto:") {
      return url.pathname;
    }
    const text = `${url.hostname}${url.pathname === "/" ? "" : url.pathname}`;
    return text.length > 36 ? `${text.slice(0, 35)}…` : text;
  } catch {
    return rawUrl.length > 36 ? `${rawUrl.slice(0, 35)}…` : rawUrl;
  }
}

async function copyTextToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

async function imageToPngBlob(imgEl) {
  const src = imgEl.currentSrc || imgEl.src;
  const img = new Image();
  img.crossOrigin = "anonymous";

  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
    img.src = src;
  });

  const width = img.naturalWidth || imgEl.width || 512;
  const height = img.naturalHeight || imgEl.height || 512;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context unavailable");
  ctx.drawImage(img, 0, 0, width, height);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Failed to encode PNG"));
    }, "image/png");
  });
}

function replaceSelectionInInput(el, start, end, replacement) {
  const nextValue = el.value.slice(0, start) + replacement + el.value.slice(end);
  const proto =
    el.tagName === "TEXTAREA"
      ? window.HTMLTextAreaElement.prototype
      : window.HTMLInputElement.prototype;
  const nativeSetter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
  if (nativeSetter) {
    nativeSetter.call(el, nextValue);
  } else {
    el.value = nextValue;
  }
  const cursorPos = start + replacement.length;
  el.focus();
  el.setSelectionRange(cursorPos, cursorPos);
  el.dispatchEvent(new Event("input", { bubbles: true }));
}

// eslint-disable-next-line react/prop-types
export default function CustomContextMenu({ onPlayGlimmerdeep }) {
  const [menuState, setMenuState] = useState(null);
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [toast, setToast] = useState(null);
  const menuRef = useRef(null);
  const toastTimerRef = useRef(null);

  const isMac =
    typeof navigator !== "undefined" &&
    /Mac|iPod|iPhone|iPad/i.test(navigator.platform || navigator.userAgent);
  const modKey = isMac ? "⌘" : "Ctrl+";

  const showToast = useCallback((message, variant = "success") => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setToast({ message, variant, id: Date.now() });
    toastTimerRef.current = setTimeout(() => {
      setToast(null);
    }, 2200);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuState(null);
  }, []);

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();

      const target = e.target instanceof Element ? e.target : null;
      const editableEl = target?.closest(
        'input, textarea, [contenteditable="true"], [contenteditable=""]'
      );
      const isEditable = isEditableElement(editableEl);

      const linkEl = target?.closest("a[href]") || null;
      const imgEl = target?.closest("img") || null;

      const selectedText = getSelectedTextFromTarget(
        isEditable ? editableEl : target
      );

      let inputSelection = null;
      if (
        isEditable &&
        (editableEl.tagName === "INPUT" || editableEl.tagName === "TEXTAREA") &&
        typeof editableEl.selectionStart === "number" &&
        typeof editableEl.selectionEnd === "number"
      ) {
        inputSelection = {
          start: editableEl.selectionStart,
          end: editableEl.selectionEnd,
        };
      }

      let contentEditableRange = null;
      if (isEditable && editableEl.isContentEditable) {
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
          contentEditableRange = sel.getRangeAt(0).cloneRange();
        }
      }

      setPosition({ left: e.clientX, top: e.clientY });
      setMenuState({
        x: e.clientX,
        y: e.clientY,
        selectedText,
        isEditable,
        editableEl: isEditable ? editableEl : null,
        inputSelection,
        contentEditableRange,
        linkUrl: linkEl ? linkEl.href : null,
        imgSrc: imgEl ? imgEl.currentSrc || imgEl.src : null,
        imgEl,
        isHeroAvatar: Boolean(imgEl?.dataset?.heroAvatar === "true"),
      });
    };

    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  useLayoutEffect(() => {
    if (!menuState || !menuRef.current) return;
    const rect = menuRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let left = menuState.x;
    let top = menuState.y;

    if (left + rect.width > vw - MENU_MARGIN) {
      left = Math.max(MENU_MARGIN, vw - rect.width - MENU_MARGIN);
    }
    if (top + rect.height > vh - MENU_MARGIN) {
      top = Math.max(MENU_MARGIN, vh - rect.height - MENU_MARGIN);
    }
    if (left < MENU_MARGIN) left = MENU_MARGIN;
    if (top < MENU_MARGIN) top = MENU_MARGIN;

    setPosition({ left, top });
  }, [menuState]);

  useEffect(() => {
    if (!menuState) return;

    const handlePointerDown = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        closeMenu();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeMenu();
        return;
      }
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const items = Array.from(
          menuRef.current?.querySelectorAll('[role="menuitem"]:not([disabled])') ?? []
        );
        if (items.length === 0) return;
        const currentIdx = items.indexOf(document.activeElement);
        const nextIdx =
          e.key === "ArrowDown"
            ? (currentIdx + 1) % items.length
            : (currentIdx - 1 + items.length) % items.length;
        items[nextIdx]?.focus();
      }
    };

    const handleScrollOrResize = () => {
      closeMenu();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScrollOrResize, { passive: true });
    window.addEventListener("resize", handleScrollOrResize);
    window.addEventListener("blur", handleScrollOrResize);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
      window.removeEventListener("blur", handleScrollOrResize);
    };
  }, [menuState, closeMenu]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const handleCopySelection = async () => {
    if (!menuState?.selectedText) return;
    const text = menuState.selectedText;
    closeMenu();
    try {
      await copyTextToClipboard(text);
      showToast("Copied to clipboard");
    } catch {
      showToast("Unable to copy text", "error");
    }
  };

  const handleCutSelection = async () => {
    if (!menuState?.isEditable || !menuState?.selectedText) return;
    const { editableEl, selectedText, inputSelection, contentEditableRange } = menuState;
    closeMenu();
    try {
      await copyTextToClipboard(selectedText);
      if (
        editableEl &&
        inputSelection &&
        (editableEl.tagName === "INPUT" || editableEl.tagName === "TEXTAREA")
      ) {
        replaceSelectionInInput(
          editableEl,
          inputSelection.start,
          inputSelection.end,
          ""
        );
      } else if (editableEl?.isContentEditable && contentEditableRange) {
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(contentEditableRange);
        contentEditableRange.deleteContents();
        editableEl.dispatchEvent(new Event("input", { bubbles: true }));
      }
      showToast("Cut to clipboard");
    } catch {
      showToast("Unable to cut text", "error");
    }
  };

  const handlePaste = async () => {
    if (!menuState?.isEditable || !menuState?.editableEl) return;
    const { editableEl, inputSelection, contentEditableRange } = menuState;
    closeMenu();
    try {
      if (!navigator.clipboard?.readText) {
        showToast(`Use ${modKey}V to paste`, "error");
        return;
      }
      const clipText = await navigator.clipboard.readText();
      if (
        inputSelection &&
        (editableEl.tagName === "INPUT" || editableEl.tagName === "TEXTAREA")
      ) {
        replaceSelectionInInput(
          editableEl,
          inputSelection.start,
          inputSelection.end,
          clipText
        );
      } else if (editableEl.isContentEditable) {
        editableEl.focus();
        const sel = window.getSelection();
        if (contentEditableRange && sel) {
          sel.removeAllRanges();
          sel.addRange(contentEditableRange);
          contentEditableRange.deleteContents();
          contentEditableRange.insertNode(document.createTextNode(clipText));
          contentEditableRange.collapse(false);
        }
        editableEl.dispatchEvent(new Event("input", { bubbles: true }));
      }
      showToast("Pasted from clipboard");
    } catch {
      showToast(`Clipboard blocked — use ${modKey}V`, "error");
    }
  };

  const handleSelectAll = () => {
    const editableEl = menuState?.editableEl;
    closeMenu();
    if (
      editableEl &&
      (editableEl.tagName === "INPUT" || editableEl.tagName === "TEXTAREA")
    ) {
      editableEl.focus();
      editableEl.select();
      return;
    }
    const sel = window.getSelection();
    if (!sel) return;
    const range = document.createRange();
    range.selectNodeContents(
      editableEl?.isContentEditable ? editableEl : document.body
    );
    sel.removeAllRanges();
    sel.addRange(range);
  };

  const handleOpenLinkNewTab = () => {
    if (!menuState?.linkUrl) return;
    const url = menuState.linkUrl;
    closeMenu();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleOpenLinkNewWindow = () => {
    if (!menuState?.linkUrl) return;
    const url = menuState.linkUrl;
    closeMenu();
    window.open(
      url,
      "_blank",
      "noopener,noreferrer,width=1200,height=800,menubar=yes,toolbar=yes,location=yes"
    );
  };

  const handleCopyLinkAddress = async () => {
    if (!menuState?.linkUrl) return;
    const url = menuState.linkUrl;
    closeMenu();
    try {
      await copyTextToClipboard(url);
      showToast("Link address copied");
    } catch {
      showToast("Unable to copy link", "error");
    }
  };

  const handleOpenImageNewTab = () => {
    if (!menuState?.imgSrc) return;
    const src = menuState.imgSrc;
    closeMenu();
    window.open(src, "_blank", "noopener,noreferrer");
  };

  const handleSaveImage = async () => {
    if (!menuState?.imgSrc || !menuState?.imgEl) return;
    const src = menuState.imgSrc;
    const filename = deriveImageFilename(menuState.imgEl);
    closeMenu();
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
      showToast("Saving image…");
    } catch {
      const a = document.createElement("a");
      a.href = src;
      a.download = filename;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handleCopyImage = async () => {
    if (!menuState?.imgEl) return;
    const imgEl = menuState.imgEl;
    closeMenu();
    try {
      if (!navigator.clipboard?.write || typeof ClipboardItem === "undefined") {
        showToast("Image copy not supported in this browser", "error");
        return;
      }
      const pngBlob = await imageToPngBlob(imgEl);
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": pngBlob }),
      ]);
      showToast("Image copied to clipboard");
    } catch {
      showToast("Unable to copy image", "error");
    }
  };

  const handleCopyImageAddress = async () => {
    if (!menuState?.imgSrc) return;
    const src = menuState.imgSrc;
    closeMenu();
    try {
      await copyTextToClipboard(src);
      showToast("Image address copied");
    } catch {
      showToast("Unable to copy image address", "error");
    }
  };

  const handleBack = () => {
    closeMenu();
    window.history.back();
  };

  const handleForward = () => {
    closeMenu();
    window.history.forward();
  };

  const handleReload = () => {
    closeMenu();
    window.location.reload();
  };

  const handlePrint = () => {
    closeMenu();
    setTimeout(() => window.print(), 60);
  };

  const handlePlayGlimmerdeep = () => {
    closeMenu();
    onPlayGlimmerdeep?.();
  };

  const hasSelection = Boolean(menuState?.selectedText && menuState.selectedText.length > 0);
  const showEditSection = hasSelection || menuState?.isEditable;
  const showLinkSection = Boolean(menuState?.linkUrl);
  const showImageSection = Boolean(menuState?.imgSrc);
  const showHeroEasterEgg = Boolean(menuState?.isHeroAvatar);

  return (
    <>
      <AnimatePresence>
        {menuState && (
          <motion.div
            ref={menuRef}
            role="menu"
            aria-label="Custom context menu"
            initial={{ opacity: 0, scale: 0.94, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ type: "spring", stiffness: 420, damping: 28 }}
            style={{ left: position.left, top: position.top }}
            onContextMenu={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="fixed z-[90] w-64 rounded-2xl bg-white/85 backdrop-blur-2xl border border-white/90 shadow-[0_18px_48px_rgba(15,23,42,0.16)] p-1.5 select-none text-slate-800"
          >
            {/* Navigation strip: Back, Forward, Reload */}
            <div className="grid grid-cols-3 gap-1 p-0.5 mb-1 rounded-xl bg-slate-100/70 border border-white/80">
              <button
                type="button"
                role="menuitem"
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleBack}
                className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-white/90 hover:shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-violet-300/80"
                title="Back"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                type="button"
                role="menuitem"
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleForward}
                className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-white/90 hover:shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-violet-300/80"
                title="Forward"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                <span>Forward</span>
              </button>
              <button
                type="button"
                role="menuitem"
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleReload}
                className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-white/90 hover:shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-violet-300/80"
                title={`Reload (${modKey}R)`}
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Reload</span>
              </button>
            </div>

            {/* Selection / Editable context */}
            {showEditSection && (
              <div className="py-1 border-t border-slate-200/70">
                {menuState.isEditable && (
                  <MenuItem
                    icon={Scissors}
                    label="Cut"
                    shortcut={`${modKey}X`}
                    disabled={!hasSelection}
                    onClick={handleCutSelection}
                  />
                )}
                {hasSelection && (
                  <MenuItem
                    icon={Copy}
                    label="Copy"
                    shortcut={`${modKey}C`}
                    onClick={handleCopySelection}
                  />
                )}
                {menuState.isEditable && (
                  <MenuItem
                    icon={ClipboardPaste}
                    label="Paste"
                    shortcut={`${modKey}V`}
                    onClick={handlePaste}
                  />
                )}
                <MenuItem
                  icon={TextSelect}
                  label="Select all"
                  shortcut={`${modKey}A`}
                  onClick={handleSelectAll}
                />
              </div>
            )}

            {/* Link context */}
            {showLinkSection && (
              <div className="py-1 border-t border-slate-200/70">
                <div className="px-2.5 py-1 flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-violet-600">
                    Link
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 truncate">
                    {formatDisplayUrl(menuState.linkUrl)}
                  </span>
                </div>
                <MenuItem
                  icon={ExternalLink}
                  label="Open link in new tab"
                  onClick={handleOpenLinkNewTab}
                />
                <MenuItem
                  icon={AppWindow}
                  label="Open link in new window"
                  onClick={handleOpenLinkNewWindow}
                />
                <MenuItem
                  icon={Link2}
                  label="Copy link address"
                  onClick={handleCopyLinkAddress}
                />
              </div>
            )}

            {/* Image context */}
            {showImageSection && (
              <div className="py-1 border-t border-slate-200/70">
                <div className="px-2.5 py-1 flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600">
                    Image
                  </span>
                  {menuState.imgEl?.alt && (
                    <span className="text-[10px] text-slate-400 truncate max-w-[140px]">
                      {menuState.imgEl.alt}
                    </span>
                  )}
                </div>
                <MenuItem
                  icon={ImageIcon}
                  label="Open image in new tab"
                  onClick={handleOpenImageNewTab}
                />
                <MenuItem
                  icon={Download}
                  label="Save image"
                  onClick={handleSaveImage}
                />
                <MenuItem
                  icon={Copy}
                  label="Copy image"
                  onClick={handleCopyImage}
                />
                <MenuItem
                  icon={Link2}
                  label="Copy image address"
                  onClick={handleCopyImageAddress}
                />
              </div>
            )}

            {/* Page actions */}
            <div className="pt-1 border-t border-slate-200/70">
              <MenuItem
                icon={Printer}
                label="Print…"
                shortcut={`${modKey}P`}
                onClick={handlePrint}
              />
            </div>

            {showHeroEasterEgg && (
              <div className="pt-1 mt-1 border-t border-slate-200/70">
                <MenuItem
                  icon={Gamepad2}
                  label="Play Glimmerdeep"
                  onClick={handlePlayGlimmerdeep}
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle glassmorphic feedback toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 360, damping: 26 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[95] glass-panel-strong rounded-full px-4 py-2 flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700 pointer-events-none"
            role="status"
            aria-live="polite"
          >
            {toast.variant === "error" ? (
              <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
            ) : (
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            )}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// eslint-disable-next-line react/prop-types
function MenuItem({ icon: Icon, label, shortcut, disabled = false, onClick }) {
  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`w-full flex items-center justify-between gap-3 px-2.5 py-1.5 rounded-xl text-[13px] font-medium transition-all text-left focus:outline-none ${
        disabled
          ? "text-slate-300 cursor-not-allowed"
          : "text-slate-700 hover:text-slate-900 hover:bg-gradient-to-r hover:from-violet-100/75 hover:via-sky-100/70 hover:to-teal-100/60 focus:bg-gradient-to-r focus:from-violet-100/75 focus:via-sky-100/70 focus:to-teal-100/60 active:scale-[0.99]"
      }`}
    >
      <span className="flex items-center gap-2.5 min-w-0">
        <Icon
          className={`w-3.5 h-3.5 shrink-0 ${
            disabled ? "text-slate-300" : "text-slate-500"
          }`}
        />
        <span className="truncate">{label}</span>
      </span>
      {shortcut && (
        <span
          className={`text-[11px] font-mono shrink-0 ${
            disabled ? "text-slate-300" : "text-slate-400"
          }`}
        >
          {shortcut}
        </span>
      )}
    </button>
  );
}
