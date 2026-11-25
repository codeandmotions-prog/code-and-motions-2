'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { IconCheck, IconChevronRight, IconClose, IconFlask } from '@/components/icons';

export type PickerLab = { id: string; name: string; email: string };

const MAX_SHOWN = 60;

/**
 * "Which lab?" for the audit page: type to search by lab name or e-mail, arrow keys and Enter to choose. It fills a hidden
 * field and submits the surrounding filter form, so every other filter stays as it is. Without JavaScript the hidden
 * field simply keeps the current lab.
 */
export function LabPicker({ labs, value, name = 'lab' }: { labs: PickerLab[]; value: string; name?: string }) {
  const listId = useId();
  const root = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);
  const hidden = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [active, setActive] = useState(0);

  const current = labs.find((lab) => lab.id === value) ?? null;

  const matches = useMemo(() => {
    const needle = text.trim().toLowerCase();
    const found = needle ? labs.filter((lab) => lab.name.toLowerCase().includes(needle) || lab.email.toLowerCase().includes(needle)) : labs;
    return found.slice(0, MAX_SHOWN);
  }, [labs, text]);

  // The list is "All labs" followed by the matches.
  const options = useMemo(() => [{ id: '', name: 'All labs', email: '' }, ...matches], [matches]);

  useEffect(() => {
    if (!open) return;
    const onDown = (event: MouseEvent) => {
      if (root.current && !root.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  function choose(id: string) {
    setOpen(false);
    setText('');
    if (id === value) return;
    if (hidden.current) {
      hidden.current.value = id;
      hidden.current.form?.requestSubmit();
    }
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setOpen(true);
      setActive((i) => Math.min(options.length - 1, i + 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    } else if (event.key === 'Enter' && open) {
      event.preventDefault();
      choose(options[Math.min(active, options.length - 1)]?.id ?? '');
    } else if (event.key === 'Escape') {
      if (open) event.stopPropagation();
      setOpen(false);
    }
  }

  const activeId = open ? `${listId}-${Math.min(active, options.length - 1)}` : undefined;

  return (
    <div ref={root} className="relative">
      <input ref={hidden} type="hidden" name={name} defaultValue={value} />
      <div className="relative">
        <IconFlask size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-faint" />
        <input
          ref={field}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={activeId}
          aria-label="Lab"
          autoComplete="off"
          spellCheck={false}
          value={open ? text : (current?.name ?? '')}
          placeholder={open ? 'Search labs…' : 'All labs'}
          onFocus={() => {
            setText('');
            setActive(0);
            setOpen(true);
          }}
          onClick={() => setOpen(true)}
          onChange={(event) => {
            setText(event.target.value);
            setActive(0);
            setOpen(true);
          }}
          onKeyDown={onKeyDown}
          className="input pl-10 pr-10"
        />
        {current ? (
          <button
            type="button"
            onClick={() => choose('')}
            aria-label="Show all labs"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-muted transition-colors hover:bg-canvas hover:text-ink"
          >
            <IconClose size={14} />
          </button>
        ) : (
          <IconChevronRight size={15} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-faint" />
        )}
      </div>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label="Labs"
          className="absolute left-0 right-0 z-30 mt-2 max-h-72 overflow-y-auto rounded-2xl bg-white p-1.5 shadow-pop ring-1 ring-line"
        >
          {options.map((option, index) => {
            const selected = option.id === value;
            return (
              <li
                key={option.id || 'all'}
                id={`${listId}-${index}`}
                role="option"
                aria-selected={selected}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => choose(option.id)}
                onMouseMove={() => setActive(index)}
                className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm ${
                  index === active ? 'bg-lime-soft' : ''
                }`}
              >
                <span className="min-w-0">
                  <span className={`block truncate ${option.id === '' ? 'font-semibold' : 'font-medium'} text-ink`}>{option.name}</span>
                  {option.email && <span className="block truncate text-xs font-normal text-muted">{option.email}</span>}
                </span>
                {selected && <IconCheck size={15} className="shrink-0 text-ink" />}
              </li>
            );
          })}
          {matches.length === 0 && <li className="px-3 py-3 text-sm font-normal text-muted">No lab matches “{text.trim()}”.</li>}
          {matches.length === MAX_SHOWN && <li className="px-3 py-2 text-xs font-normal text-muted">Showing the first {MAX_SHOWN}. Type to narrow the list.</li>}
        </ul>
      )}
    </div>
  );
}
