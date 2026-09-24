import React from 'react';
import { WorkspaceId, User } from '../types';

interface HeaderProps {
  currentWorkspace: WorkspaceId;
  onSelectWorkspace: (id: WorkspaceId) => void;
  onOpenNewTask: () => void;
  onOpenSearch: () => void;
  onToggleNotifications: () => void;
  unreadCount: number;
  user: User;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentWorkspace,
  onSelectWorkspace,
  onOpenNewTask,
  onOpenSearch,
  onToggleNotifications,
  unreadCount,
  user,
  searchQuery,
  onSearchChange
}) => {
  // Breadcrumb mapping
  const renderBreadcrumb = () => {
    switch (currentWorkspace) {
      case 'home':
        return (
          <>
            <span className="text-[#0b1c30] font-semibold">Executive Dashboard</span>
            <span className="text-xs px-1.5 py-0.5 rounded bg-[#e5eeff] text-[#45464d] border border-[#c6c6cd]/30">
              Q3 Cycle
            </span>
          </>
        );
      case 'seo-content':
      case 'workspace-seo':
        return (
          <>
            <button 
              onClick={() => onSelectWorkspace('workspace-campaign')}
              className="hover:text-[#0b1c30] transition-colors"
            >
              Marketing
            </button>
            <span className="text-[#76777d]">/</span>
            <span className="text-[#0b1c30] font-semibold">SEO Content 2026</span>
            <span className="text-xs px-1.5 py-0.5 rounded bg-[#e5eeff] text-[#45464d] border border-[#c6c6cd]/30">
              Q1 Execution
            </span>
          </>
        );
      case 'my-work':
        return (
          <>
            <span className="text-[#0b1c30] font-semibold">My Work & Prioritized Execution</span>
            <span className="text-xs px-1.5 py-0.5 rounded bg-[#86f2e4] text-[#006f66] font-semibold">
              Bank (PM)
            </span>
          </>
        );
      case 'inbox':
        return (
          <>
            <span className="text-[#0b1c30] font-semibold">Clinical Review Inbox</span>
            <span className="text-xs px-1.5 py-0.5 rounded bg-[#ffdad6] text-[#93000a] font-semibold">
              3 Pending Sign-offs
            </span>
          </>
        );
      case 'notifications':
        return (
          <>
            <span className="text-[#0b1c30] font-semibold">Notifications & Audit Feeds</span>
          </>
        );
      default:
        return (
          <>
            <button 
              onClick={() => onSelectWorkspace('home')}
              className="hover:text-[#0b1c30] transition-colors capitalize"
            >
              {currentWorkspace.replace('workspace-', '')}
            </button>
            <span className="text-[#76777d]">/</span>
            <span className="text-[#0b1c30] font-semibold">Operations Board</span>
          </>
        );
    }
  };

  return (
    <header className="fixed top-0 left-[240px] right-0 h-14 bg-white/90 backdrop-blur-md border-b border-[#c6c6cd]/20 z-40 px-6 flex items-center justify-between">
      {/* Breadcrumb section */}
      <div className="flex items-center gap-2">
        <nav className="flex items-center gap-1.5 text-[#45464d] text-sm">
          {renderBreadcrumb()}
        </nav>
      </div>

      {/* Action and search section */}
      <div className="flex items-center gap-3">
        {/* Quick search input */}
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-2.5 text-[#76777d] text-[16px]">
            search
          </span>
          <input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onOpenSearch();
              }
            }}
            className="w-64 pl-8 pr-12 py-1 bg-[#eff4ff] text-[#0b1c30] rounded border border-[#c6c6cd]/30 text-xs focus:outline-none focus:border-[#000000] focus:bg-white placeholder:text-[#76777d] transition-colors"
            placeholder="Search tasks, patients, tags..."
            type="text"
          />
          <div className="absolute right-2 flex items-center">
            <kbd 
              onClick={onOpenSearch}
              className="text-[10px] px-1 py-0.5 rounded bg-[#e5eeff] text-[#45464d] border border-[#c6c6cd]/30 font-mono cursor-pointer hover:bg-[#dce9ff]"
            >
              ⌘K
            </kbd>
          </div>
        </div>

        {/* New Task button */}
        <button
          onClick={onOpenNewTask}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-black text-white text-xs font-semibold hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          <span>New Task</span>
        </button>

        {/* Notifications toggle */}
        <button
          onClick={onToggleNotifications}
          className="relative p-1.5 rounded hover:bg-[#e5eeff] text-[#45464d] hover:text-[#0b1c30] transition-colors cursor-pointer"
          title="Notifications"
        >
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#ba1a1a] ring-2 ring-white"></span>
          )}
        </button>

        {/* User avatar */}
        <div className="relative">
          <img
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover cursor-pointer ring-1 ring-[#c6c6cd]/30 hover:opacity-90 transition-opacity"
            src={user.avatar}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <div className="hidden w-8 h-8 rounded-full bg-[#0b1c30] text-white flex items-center justify-center font-bold text-xs ring-1 ring-[#c6c6cd]/30 cursor-pointer">
            {user.initials}
          </div>
        </div>
      </div>
    </header>
  );
};
