import React from 'react';
import { WorkspaceId, Task, User } from '../types';

interface GenericWorkspaceViewProps {
  workspaceId: WorkspaceId;
  tasks: Task[];
  currentUser: User;
  onSelectTask: (task: Task) => void;
  onOpenNewTask: () => void;
  onNavigateHome: () => void;
  onToggleTaskComplete: (taskId: string) => void;
}

export const GenericWorkspaceView: React.FC<GenericWorkspaceViewProps> = ({
  workspaceId,
  tasks,
  currentUser,
  onSelectTask,
  onOpenNewTask,
  onNavigateHome,
  onToggleTaskComplete
}) => {
  const getMeta = () => {
    switch (workspaceId) {
      case 'my-work':
        return {
          title: 'My Work & Execution Board',
          badge: 'Bank (Lead PM)',
          description: 'Tasks and deliverables assigned directly to you for immediate focus.',
          filter: (t: Task) => t.owner.name.toLowerCase().includes('bank')
        };
      case 'inbox':
        return {
          title: 'Clinical Review Inbox',
          badge: 'Doctor Verification Gateways',
          description: 'Deliverables awaiting medical protocol verification, contraindications check, or CMO sign-off.',
          filter: (t: Task) => t.status === 'Waiting Approval' || t.status === 'Review'
        };
      case 'notifications':
        return {
          title: 'Audit Feeds & Activity Logs',
          badge: 'Live Stream',
          description: 'Real-time timeline of clinical protocol changes, comments, and approvals.',
          filter: () => true
        };
      case 'marketing-2026':
      case 'workspace-campaign':
        return {
          title: 'Marketing & Campaign 2026',
          badge: 'High-Conversion Funnels',
          description: 'Sylfirm X, RedTouch Pro, and Vitaran aesthetic campaigns for CBD luxury clientele.',
          filter: (t: Task) => t.workspace === 'Marketing'
        };
      case 'clinic-operations':
      case 'workspace-operations':
        return {
          title: 'Clinic Operations & Laser Suite',
          badge: 'Sterilization & Machine Calibration',
          description: 'Equipment maintenance, doctor consultation schedules, and treatment room certification.',
          filter: (t: Task) => t.workspace === 'Operations' || t.subWorkspace.includes('Operations')
        };
      case 'workspace-sales':
        return {
          title: 'Sales & Patient Follow-up Operations',
          badge: 'LINE CRM Automation',
          description: 'Day 3 post-procedure erythema check and Day 14 hydration follow-up workflows.',
          filter: (t: Task) => t.workspace === 'Sales'
        };
      case 'workspace-management':
        return {
          title: 'Management & Board Governance',
          badge: 'Q3/Q4 Financials',
          description: 'Executive committee approvals, multi-branch scaling, and medical advisory board agendas.',
          filter: () => true
        };
      default:
        return {
          title: 'Operational Workspace',
          badge: 'Reva OS',
          description: 'Clinical workflows and task triage.',
          filter: () => true
        };
    }
  };

  const meta = getMeta();
  const relevantTasks = tasks.filter(meta.filter);

  return (
    <div className="flex flex-col w-full pb-12">
      {/* Header */}
      <div className="flex items-start justify-between pb-4 pt-2 border-b border-[#c6c6cd]/20 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#0b1c30] tracking-tight">{meta.title}</h1>
            <span className="px-2 py-0.5 rounded-full bg-[#dce9ff] text-xs font-semibold text-[#0b1c30]">
              {meta.badge}
            </span>
          </div>
          <p className="text-xs text-[#45464d] mt-1">{meta.description}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-1 px-3 py-1.5 rounded bg-white text-xs font-semibold text-[#0b1c30] border border-[#c6c6cd]/30 hover:bg-[#eff4ff]"
          >
            <span className="material-symbols-outlined text-[16px]">grid_view</span>
            <span>Dashboard</span>
          </button>
          <button
            onClick={onOpenNewTask}
            className="flex items-center gap-1 px-3.5 py-1.5 rounded bg-black text-white text-xs font-semibold hover:bg-neutral-800"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* Task table */}
      <div className="bg-white rounded-xl shadow-sm border border-[#c6c6cd]/20 overflow-hidden">
        <div className="px-4 py-3 bg-[#eff4ff] border-b border-[#c6c6cd]/20 flex items-center justify-between text-xs font-semibold text-[#0b1c30]">
          <span>Deliverables ({relevantTasks.length})</span>
          <span className="text-[#45464d]">Click any row to open doctor review panel</span>
        </div>

        <div className="divide-y divide-[#c6c6cd]/10 text-xs">
          {relevantTasks.length === 0 ? (
            <div className="p-8 text-center text-[#76777d]">
              No active tasks found in this view.
            </div>
          ) : (
            relevantTasks.map((t) => (
              <div
                key={t.id}
                onClick={() => onSelectTask(t)}
                className="flex items-center justify-between p-3.5 hover:bg-[#eff4ff] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <input
                    type="checkbox"
                    checked={t.status === 'Done'}
                    onChange={(e) => {
                      e.stopPropagation();
                      onToggleTaskComplete(t.id);
                    }}
                    className="w-4 h-4 rounded accent-black cursor-pointer shrink-0"
                  />
                  <div className="flex flex-col min-w-0 pr-4">
                    <span className={`font-semibold text-sm truncate ${t.status === 'Done' ? 'line-through text-[#76777d]' : 'text-[#0b1c30]'}`}>
                      {t.title}
                    </span>
                    <span className="text-[11px] text-[#45464d] truncate">
                      {t.subtitle}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    t.priority === 'URGENT' || t.priority === 'HIGH' ? 'bg-[#ffdad6] text-[#93000a]' : 'bg-[#e5eeff] text-[#45464d]'
                  }`}>
                    {t.priority}
                  </span>
                  <span className="text-xs text-[#0b1c30] font-tabular hidden sm:inline">
                    {t.dueDate}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded text-xs font-semibold ${
                    t.status === 'Working'
                      ? 'bg-[#86f2e4] text-[#006f66]'
                      : t.status === 'Review'
                      ? 'bg-[#07006c] text-white'
                      : t.status === 'Waiting Approval'
                      ? 'bg-[#dce9ff] text-[#0b1c30]'
                      : 'bg-[#e5eeff] text-[#45464d]'
                  }`}>
                    {t.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
