"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Check, ChevronDown } from "lucide-react";

export type SelectOption = { value: string; label: string; hint?: string };

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
};

/**
 * Styled replacement for <select>: a button that opens a listbox.
 * Keyboard: Enter/Space/ArrowDown open, arrows move, Home/End jump, typing a letter jumps, Enter selects, Esc closes.
 */
export function Select({ label, value, onChange, options, placeholder = "Select", name, required, disabled }: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrap = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const hidden = useRef<HTMLInputElement>(null);
  const id = useId();
  const selected = options.find((o) => o.value === value);

  // Close when clicking outside
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  // Keep the highlighted option in view
  useEffect(() => {
    if (!open) return;
    list.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  // Let native form validation see the current value
  useEffect(() => {
    hidden.current?.setCustomValidity(required && !value ? "Please choose an option from the list" : "");
  }, [required, value, label]);

  const openList = () => {
    if (disabled) return;
    const i = options.findIndex((o) => o.value === value);
    setActive(i >= 0 ? i : 0);
    setOpen(true);
  };
  const choose = (i: number) => {
    const o = options[i];
    if (!o) return;
    onChange(o.value);
    setOpen(false);
    button.current?.focus();
  };

  const onKey = (e: KeyboardEvent) => {
    if (disabled) return;
    if (!open) {
      if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        openList();
      }
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(options.length - 1);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      choose(active);
    } else if (e.key === "Tab") {
      setOpen(false);
    } else if (e.key.length === 1) {
      const k = e.key.toLowerCase();
      const start = active + 1;
      const order = [...options.slice(start), ...options.slice(0, start)];
      const hit = order.find((o) => o.label.toLowerCase().startsWith(k) || o.hint?.toLowerCase().startsWith(k));
      if (hit) setActive(options.indexOf(hit));
    }
  };

  return (
    <div
      ref={wrap}
      className="relative grid gap-2"
      onBlur={(e) => {
        // Close when keyboard focus moves to another field
        if (open && !wrap.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <span id={`${id}-label`} className="text-[0.9rem] font-medium text-ink">
        {label}
      </span>
      {name ? <input ref={hidden} type="text" name={name} value={value} required={required} onChange={() => {}} tabIndex={-1} aria-hidden className="pointer-events-none absolute bottom-0 left-4 h-px w-px opacity-0" /> : null}
      <button
        ref={button}
        type="button"
        disabled={disabled}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${id}-label ${id}-value`}
        aria-controls={`${id}-list`}
        aria-activedescendant={open ? `${id}-opt-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKey}
        className={`flex w-full items-center justify-between gap-3 rounded-2xl border bg-white/70 px-5 py-4 text-left text-[1rem] outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
          open ? "border-ink bg-white" : "border-line hover:border-ink/40 focus-visible:border-ink focus-visible:bg-white"
        }`}
      >
        <span id={`${id}-value`} className={`truncate ${selected ? "text-ink" : "text-fog"}`}>
          {selected ? (
            <>
              {selected.hint ? <span className="mr-2 font-medium tabular-nums text-mute">{selected.hint}</span> : null}
              {selected.label}
            </>
          ) : (
            placeholder
          )}
        </span>
        <ChevronDown aria-hidden className={`h-4 w-4 shrink-0 text-mute transition-transform duration-300 ${open ? "rotate-180" : ""}`} strokeWidth={2} />
      </button>

      {open ? (
          <ul
            ref={list}
            id={`${id}-list`}
            role="listbox"
            aria-labelledby={`${id}-label`}
            data-lenis-prevent
            className="dropdown-in absolute inset-x-0 top-full z-30 mt-2 max-h-[min(22rem,55vh)] origin-top overflow-y-auto overscroll-contain rounded-2xl border border-line bg-white p-1.5 shadow-[0_24px_48px_-18px_rgba(13,14,15,0.35)]"
          >
            {options.map((o, i) => {
              const isSel = o.value === value;
              const isAct = i === active;
              return (
                <li
                  key={o.value}
                  id={`${id}-opt-${i}`}
                  data-index={i}
                  role="option"
                  aria-selected={isSel}
                  onMouseEnter={() => setActive(i)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => choose(i)}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl px-3.5 py-2.5 text-[0.98rem] transition-colors ${isAct ? "bg-paper-2" : ""} ${isSel ? "font-medium text-ink" : "text-ink/85"}`}
                >
                  {o.hint ? <span className={`w-[4.6rem] shrink-0 text-[0.85rem] font-medium tabular-nums ${isSel ? "text-amber" : "text-fog"}`}>{o.hint}</span> : null}
                  <span className="flex-1">{o.label}</span>
                  {isSel ? <Check aria-hidden className="h-4 w-4 shrink-0 text-amber" strokeWidth={2.4} /> : null}
                </li>
              );
            })}
          </ul>
        ) : null}
    </div>
  );
}
