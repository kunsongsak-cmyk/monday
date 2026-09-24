import React, { useState, useEffect } from 'react';
import { Task, WorkspaceId } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: Task[];
  onSelectTask: (task: Task) => void;
  onNavigateWorkspace: (id: WorkspaceId) => void;
  onOpenNewTask: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  tasks,
  onSelectTask,
  onNavigateWorkspace,
  onOpenNewTask
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled externally
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredTasks = tasks.filter(t =>
    t.title.toLowerCase().includes(query.toLowerCase()) ||
    t.subtitle.toLowerCase().includes(query.toLowerCase()) ||
    t.subWorkspace.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-start justify-center pt-20 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full overflow-hidden border border-[#c6c6cd]/30 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center px-4 py-3 border-b border-[#c6c6cd]/20 gap-2">
          <span className="material-symbols-outlined text-[20px] text-[#76777d]">search</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, search tasks, clinical protocols, or navigate..."
            className="flex-1 bg-transparent text-sm text-[#0b1c30] placeholder:text-[#76777d] focus:outline-none"
            autoFocus
          />
          <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-[#e5eeff] text-[#45464d] border border-[#c6c6cd]/30 font-mono">
            ESC
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 text-xs space-y-1">
          {/* Quick Actions */}
          <div className="px-2 py-1 text-[11px] font-semibold text-[#76777d] uppercase tracking-wider">
            Quick Actions
          </div>
          <button
            onClick={() => {
              onClose();
              onOpenNewTask();
            }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#eff4ff] text-left text-[#0b1c30] transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-[#006a61]">add_task</span>
              <span className="font-semibold">Create New Task / Protocol</span>
            </div>
            <span className="text-[10px] text-[#76777d]">Action</span>
          </button>

          {/* Quick Workspaces */}
          <div className="px-2 pt-2 py-1 text-[11px] font-semibold text-[#76777d] uppercase tracking-wider">
            Workspaces
          </div>
          <button
            onClick={() => {
              onClose();
              onNavigateWorkspace('home');
            }}
            className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg hover:bg-[#eff4ff] text-left text-[#0b1c30]"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">grid_view</span>
              <span>Home (Executive Briefing)</span>
            </div>
            <span className="text-[10px] text-[#76777d]">Workspace</span>
          </button>
          <button
            onClick={() => {
              onClose();
              onNavigateWorkspace('seo-content');
            }}
            className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg hover:bg-[#eff4ff] text-left text-[#0b1c30]"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-[#006a61]">table_rows</span>
              <span>SEO Content 2026 Board</span>
            </div>
            <span className="text-[10px] text-[#76777d]">Workspace</span>
          </button>
          <button
            onClick={() => {
              onClose();
              onNavigateWorkspace('clinic-operations');
            }}
            className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg hover:bg-[#eff4ff] text-left text-[#0b1c30]"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-[#006f66]">medical_services</span>
              <span>Clinic Operations & Laser Suite</span>
            </div>
            <span className="text-[10px] text-[#76777d]">Workspace</span>
          </button>

          {/* Tasks search results */}
          <div className="px-2 pt-2 py-1 text-[11px] font-semibold text-[#76777d] uppercase tracking-wider">
            Clinical Tasks ({filteredTasks.length})
          </div>
          {filteredTasks.length === 0 ? (
            <div className="p-4 text-center text-[#76777d]">
              No tasks matching &quot;{query}&quot;
            </div>
          ) : (
            filteredTasks.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  onClose();
                  onSelectTask(t);
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#eff4ff] text-left text-[#0b1c30] transition-colors"
              >
                <div className="flex flex-col min-w-0 pr-2">
                  <span className="font-semibold text-xs truncate">{t.title}</span>
                  <span className="text-[11px] text-[#45464d] truncate">{t.subtitle}</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold shrink-0 ${
                  t.status === 'Working' ? 'bg-[#86f2e4] text-[#006f66]' : 'bg-[#e5eeff] text-[#45464d]'
                }`}>
                  {t.status}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
