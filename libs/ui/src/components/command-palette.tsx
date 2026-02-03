'use client';

import { useEffect, useState } from 'react';

export function CommandPalette({ commands }: { commands: any[] }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12">
      <div className="fixed inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
      <div className="relative z-50 w-full max-w-xl bg-background rounded-lg shadow-lg overflow-hidden border">
        <div className="p-4 border-b">
          <input
            className="w-full bg-transparent outline-none text-lg"
            placeholder="Type a command or search..."
            autoFocus
          />
        </div>
        <div className="p-2 max-h-[60vh] overflow-y-auto">
          <ul>
            {commands.map((cmd) => (
              <li key={cmd.id}>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-muted rounded flex items-center justify-between group"
                  onClick={() => {
                    cmd.action();
                    setIsOpen(false);
                  }}
                >
                  <span>{cmd.name}</span>
                  <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100">Enter</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-2 border-t bg-muted/50 text-xs text-muted-foreground flex justify-end px-4">
          <span className="mr-2">Esc to close</span>
          <span>↵ to select</span>
        </div>
      </div>
    </div>
  );
}
