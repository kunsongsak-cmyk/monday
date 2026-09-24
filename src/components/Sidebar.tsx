import React from 'react';
import { WorkspaceId, User } from '../types';

interface SidebarProps {
  currentWorkspace: WorkspaceId;
  onSelectWorkspace: (id: WorkspaceId) => void;
  currentUser: User;
  onOpenSearch: () => void;
  onOpenSettings: () => void;
  onOpenTemplates: () => void;
  taskCounts: {
    myWork: number;
    inbox: number;
    notifications: number;
  };
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentWorkspace,
  onSelectWorkspace,
  currentUser,
  onOpenSearch,
  onOpenSettings,
  onOpenTemplates,
  taskCounts
}) => {
  const [marketingExpanded, setMarketingExpanded] = React.useState(true);
  const [salesExpanded, setSalesExpanded] = React.useState(false);
  const [opsExpanded, setOpsExpanded] = React.useState(false);
  const [mgmtExpanded, setMgmtExpanded] = React.useState(false);

  return (
    <aside className="fixed left-0 top-0 h-full w-[240px] bg-white z-50 flex flex-col justify-between border-r border-[#c6c6cd]/30 select-none">
      <div className="flex flex-col min-h-0">
        {/* Brand header */}
        <div className="h-14 px-3 flex items-center justify-between border-b border-[#c6c6cd]/20">
          <button 
            onClick={() => onSelectWorkspace('home')}
            className="flex items-center gap-2 text-left hover:opacity-85 transition-opacity"
          >
            <img 
              alt="Reva Work Brand Logo" 
              className="h-8 w-auto object-contain" 
              src="https://lh3.googleusercontent.com/aida/AEtjO1Wc1xTkF39QLESY3lpDW4A9ezJZXGRsV0njX-HAJCm1sQC7hiEehkvrMjdqMBOECFqBSLcmJIMzoBHHLRF-t7FiJ1W8Xd_Sc7krSVckSy01LjruO-wmXS9uqCCLZoO0TUrtQVwkXf62nMIXv3XxSeb70Ll2h29qIIAdLRpR0O2COA7N5xdHhtfnI9uZLICVgP87bZibO8b_4CD_yDPud_hL_DAsPC5by35zASNlN1cUtQy1T0r-aoBrKpZa" 
              onError={(e) => {
                // High fidelity fallback badge if blocked
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="hidden w-7 h-7 rounded-lg bg-[#0b1c30] text-white flex items-center justify-center font-bold text-xs">
              R
            </div>
            <span className="font-semibold text-base text-[#0b1c30] tracking-tight">Reva Work OS</span>
          </button>
          <span className="material-symbols-outlined text-[#76777d] cursor-pointer hover:text-[#0b1c30] text-[18px]">
            unfold_more
          </span>
        </div>

        {/* Navigation list */}
        <div className="overflow-y-auto px-2 py-2 space-y-3">
          <nav className="space-y-0.5">
            <button
              onClick={() => onSelectWorkspace('home')}
              className={`w-full flex items-center justify-between px-2 py-1.5 rounded transition-colors text-left text-sm ${
                currentWorkspace === 'home'
                  ? 'bg-[#e5eeff] text-[#0b1c30] font-semibold'
                  : 'text-[#45464d] hover:bg-[#e5eeff] hover:text-[#0b1c30]'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">grid_view</span>
                <span>Home</span>
              </div>
            </button>

            <button
              onClick={() => onSelectWorkspace('my-work')}
              className={`w-full flex items-center justify-between px-2 py-1.5 rounded transition-colors text-left text-sm ${
                currentWorkspace === 'my-work'
                  ? 'bg-[#e5eeff] text-[#0b1c30] font-semibold'
                  : 'text-[#45464d] hover:bg-[#e5eeff] hover:text-[#0b1c30]'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                <span>My Work</span>
              </div>
              <span className="text-xs px-1.5 py-0.5 rounded bg-[#e5eeff] text-[#0b1c30] font-medium font-tabular">
                {taskCounts.myWork}
              </span>
            </button>

            <button
              onClick={() => onSelectWorkspace('inbox')}
              className={`w-full flex items-center justify-between px-2 py-1.5 rounded transition-colors text-left text-sm ${
                currentWorkspace === 'inbox'
                  ? 'bg-[#e5eeff] text-[#0b1c30] font-semibold'
                  : 'text-[#45464d] hover:bg-[#e5eeff] hover:text-[#0b1c30]'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">inbox</span>
                <span>Inbox</span>
              </div>
              <span className="text-xs px-1.5 py-0.5 rounded bg-[#e5eeff] text-[#0b1c30] font-medium font-tabular">
                {taskCounts.inbox}
              </span>
            </button>

            <button
              onClick={() => onSelectWorkspace('notifications')}
              className={`w-full flex items-center justify-between px-2 py-1.5 rounded transition-colors text-left text-sm ${
                currentWorkspace === 'notifications'
                  ? 'bg-[#e5eeff] text-[#0b1c30] font-semibold'
                  : 'text-[#45464d] hover:bg-[#e5eeff] hover:text-[#0b1c30]'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">notifications</span>
                <span>Notifications</span>
              </div>
              <span className="text-xs px-1.5 py-0.5 rounded bg-[#ffdad6] text-[#93000a] font-semibold font-tabular">
                {taskCounts.notifications}
              </span>
            </button>
          </nav>

          {/* Favorites */}
          <div className="pt-1">
            <div className="flex items-center justify-between px-2 py-1 text-[#76777d]">
              <span className="text-[11px] tracking-wider uppercase font-semibold">Favorites</span>
              <button 
                onClick={() => onSelectWorkspace('seo-content')}
                title="Add to favorites"
                className="material-symbols-outlined text-[14px] cursor-pointer hover:text-[#0b1c30]"
              >
                add
              </button>
            </div>
            <div className="mt-0.5 space-y-0.5">
              <button
                onClick={() => onSelectWorkspace('seo-content')}
                className={`w-full flex items-center gap-2 px-2 py-1 rounded text-sm text-left transition-colors ${
                  currentWorkspace === 'seo-content' || currentWorkspace === 'workspace-seo'
                    ? 'bg-[#e5eeff] text-[#0b1c30] font-semibold'
                    : 'text-[#45464d] hover:bg-[#e5eeff] hover:text-[#0b1c30]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#006a61] shrink-0"></span>
                <span className="truncate">SEO Content</span>
              </button>
              <button
                onClick={() => onSelectWorkspace('marketing-2026')}
                className={`w-full flex items-center gap-2 px-2 py-1 rounded text-sm text-left transition-colors ${
                  currentWorkspace === 'marketing-2026'
                    ? 'bg-[#e5eeff] text-[#0b1c30] font-semibold'
                    : 'text-[#45464d] hover:bg-[#e5eeff] hover:text-[#0b1c30]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#07006c] shrink-0"></span>
                <span className="truncate">Marketing 2026</span>
              </button>
              <button
                onClick={() => onSelectWorkspace('clinic-operations')}
                className={`w-full flex items-center gap-2 px-2 py-1 rounded text-sm text-left transition-colors ${
                  currentWorkspace === 'clinic-operations'
                    ? 'bg-[#e5eeff] text-[#0b1c30] font-semibold'
                    : 'text-[#45464d] hover:bg-[#e5eeff] hover:text-[#0b1c30]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#006f66] shrink-0"></span>
                <span className="truncate">Clinic Operations</span>
              </button>
            </div>
          </div>

          {/* Workspaces */}
          <div className="pt-1">
            <div className="flex items-center justify-between px-2 py-1 text-[#76777d]">
              <span className="text-[11px] tracking-wider uppercase font-semibold">Workspaces</span>
              <span className="material-symbols-outlined text-[14px] cursor-pointer hover:text-[#0b1c30]">
                tune
              </span>
            </div>
            <div className="mt-0.5 space-y-0.5">
              {/* Marketing expandable */}
              <div className="space-y-0.5">
                <div 
                  onClick={() => setMarketingExpanded(!marketingExpanded)}
                  className="flex items-center justify-between px-2 py-1 rounded hover:bg-[#e5eeff] text-[#0b1c30] cursor-pointer select-none"
                >
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-[#76777d]">
                      {marketingExpanded ? 'expand_more' : 'chevron_right'}
                    </span>
                    <span className="text-sm font-medium">Marketing</span>
                  </div>
                  <span className="material-symbols-outlined text-[14px] text-[#76777d] opacity-0 hover:opacity-100">
                    more_horiz
                  </span>
                </div>

                {marketingExpanded && (
                  <div className="pl-3 space-y-0.5 border-l border-[#c6c6cd]/30 ml-3">
                    <button
                      onClick={() => onSelectWorkspace('seo-content')}
                      className={`w-full flex items-center gap-1.5 px-2 py-1 rounded text-left text-sm transition-colors ${
                        currentWorkspace === 'seo-content' || currentWorkspace === 'workspace-seo'
                          ? 'bg-[#e5eeff] text-[#0b1c30] font-semibold'
                          : 'text-[#45464d] hover:bg-[#e5eeff] hover:text-[#0b1c30]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[14px] text-[#76777d]">tag</span>
                      <span className="truncate">SEO</span>
                    </button>
                    <button
                      onClick={() => onSelectWorkspace('workspace-social-media')}
                      className={`w-full flex items-center gap-1.5 px-2 py-1 rounded text-left text-sm transition-colors ${
                        currentWorkspace === 'workspace-social-media'
                          ? 'bg-[#e5eeff] text-[#0b1c30] font-semibold'
                          : 'text-[#45464d] hover:bg-[#e5eeff] hover:text-[#0b1c30]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[14px] text-[#76777d]">tag</span>
                      <span className="truncate">Social Media</span>
                    </button>
                    <button
                      onClick={() => onSelectWorkspace('workspace-campaign')}
                      className={`w-full flex items-center gap-1.5 px-2 py-1 rounded text-left text-sm transition-colors ${
                        currentWorkspace === 'workspace-campaign'
                          ? 'bg-[#e5eeff] text-[#0b1c30] font-semibold'
                          : 'text-[#45464d] hover:bg-[#e5eeff] hover:text-[#0b1c30]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[14px] text-[#76777d]">tag</span>
                      <span className="truncate">Campaign</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Sales */}
              <button
                onClick={() => {
                  setSalesExpanded(!salesExpanded);
                  onSelectWorkspace('workspace-sales');
                }}
                className={`w-full flex items-center gap-1 px-2 py-1 rounded text-left text-sm transition-colors ${
                  currentWorkspace === 'workspace-sales'
                    ? 'bg-[#e5eeff] text-[#0b1c30] font-semibold'
                    : 'text-[#45464d] hover:bg-[#e5eeff] hover:text-[#0b1c30]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px] text-[#76777d]">
                  {salesExpanded ? 'expand_more' : 'chevron_right'}
                </span>
                <span className="truncate">Sales</span>
              </button>

              {/* Operations */}
              <button
                onClick={() => {
                  setOpsExpanded(!opsExpanded);
                  onSelectWorkspace('workspace-operations');
                }}
                className={`w-full flex items-center gap-1 px-2 py-1 rounded text-left text-sm transition-colors ${
                  currentWorkspace === 'workspace-operations' || currentWorkspace === 'clinic-operations'
                    ? 'bg-[#e5eeff] text-[#0b1c30] font-semibold'
                    : 'text-[#45464d] hover:bg-[#e5eeff] hover:text-[#0b1c30]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px] text-[#76777d]">
                  {opsExpanded ? 'expand_more' : 'chevron_right'}
                </span>
                <span className="truncate">Operations</span>
              </button>

              {/* Management */}
              <button
                onClick={() => {
                  setMgmtExpanded(!mgmtExpanded);
                  onSelectWorkspace('workspace-management');
                }}
                className={`w-full flex items-center gap-1 px-2 py-1 rounded text-left text-sm transition-colors ${
                  currentWorkspace === 'workspace-management'
                    ? 'bg-[#e5eeff] text-[#0b1c30] font-semibold'
                    : 'text-[#45464d] hover:bg-[#e5eeff] hover:text-[#0b1c30]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px] text-[#76777d]">
                  {mgmtExpanded ? 'expand_more' : 'chevron_right'}
                </span>
                <span className="truncate">Management</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom utility & user footer */}
      <div className="border-t border-[#c6c6cd]/20 p-2 bg-white">
        <div className="space-y-0.5 mb-2">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-2 py-1 rounded text-[#45464d] hover:bg-[#e5eeff] hover:text-[#0b1c30] transition-colors text-sm"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">search</span>
              <span>Search</span>
            </div>
            <kbd className="text-[10px] px-1 rounded bg-[#e5eeff] text-[#45464d] border border-[#c6c6cd]/30 font-mono">
              ⌘K
            </kbd>
          </button>
          <button
            onClick={onOpenTemplates}
            className="w-full flex items-center gap-2 px-2 py-1 rounded text-[#45464d] hover:bg-[#e5eeff] hover:text-[#0b1c30] transition-colors text-sm"
          >
            <span className="material-symbols-outlined text-[16px]">dashboard_customize</span>
            <span>Templates</span>
          </button>
          <button
            onClick={onOpenSettings}
            className="w-full flex items-center gap-2 px-2 py-1 rounded text-[#45464d] hover:bg-[#e5eeff] hover:text-[#0b1c30] transition-colors text-sm"
          >
            <span className="material-symbols-outlined text-[16px]">settings</span>
            <span>Settings</span>
          </button>
        </div>

        {/* Profile Card */}
        <div className="pt-2 border-t border-[#c6c6cd]/20 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            {currentUser.avatar ? (
              <img
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-[#c6c6cd]/30"
                src={currentUser.avatar}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <div className={`${currentUser.avatar ? 'hidden' : ''} w-8 h-8 rounded-full bg-[#0b1c30] text-white flex items-center justify-center font-bold text-xs shrink-0`}>
              {currentUser.initials}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm text-[#0b1c30] font-semibold leading-tight truncate">
                {currentUser.name}
              </span>
              <span className="text-[11px] text-[#45464d] truncate">
                {currentUser.role}
              </span>
            </div>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#dce9ff] text-[#0b1c30] font-semibold">
            {currentUser.badge || 'PM'}
          </span>
        </div>
      </div>
    </aside>
  );
};
