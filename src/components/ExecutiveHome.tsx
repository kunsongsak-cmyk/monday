import React, { useState } from 'react';
import { Task, OKRItem, TeamMemberCapacity, RoadblockAlert, WorkspaceId } from '../types';

interface ExecutiveHomeProps {
  tasks: Task[];
  okrs: OKRItem[];
  team: TeamMemberCapacity[];
  roadblocks: RoadblockAlert[];
  onSelectTask: (task: Task) => void;
  onNavigateWorkspace: (id: WorkspaceId) => void;
  onAddTask: (title: string, workspace: string) => void;
  onOpenLogDecision: () => void;
  onOpenReassign: () => void;
  onNudgeDoctor: () => void;
  onResolveRoadblock: (id: string) => void;
  onToggleTaskComplete: (taskId: string) => void;
}

export const ExecutiveHome: React.FC<ExecutiveHomeProps> = ({
  tasks,
  okrs,
  team,
  roadblocks,
  onSelectTask,
  onNavigateWorkspace,
  onAddTask,
  onOpenLogDecision,
  onOpenReassign,
  onNudgeDoctor,
  onResolveRoadblock,
  onToggleTaskComplete
}) => {
  const [quickTaskTitle, setQuickTaskTitle] = useState('');
  const [filterWorkspace, setFilterWorkspace] = useState<string>('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [exportNotification, setExportNotification] = useState(false);

  // Filter tasks for "My Work" display
  const prioritizedTasks = tasks.slice(0, 4);

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTaskTitle.trim()) return;
    onAddTask(quickTaskTitle.trim(), 'Marketing');
    setQuickTaskTitle('');
  };

  const handleExportOKR = () => {
    const reportContent = `REVA WORK OS - Q3 EXECUTIVE OKR REPORT
Generated: ${new Date().toLocaleDateString()}
Clinic HQ: Reva Aesthetic Clinic HQ

OBJECTIVES & KEY RESULTS:
${okrs.map(o => `- [${o.status}] ${o.title}: ${o.progress}% (${o.supportingOkr}) | ${o.currentLabel}`).join('\n')}

TEAM WORKLOAD:
${team.map(t => `- ${t.name} (${t.role}): ${t.tasksCount} tasks (${t.statusLabel})`).join('\n')}
`;
    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Reva-Clinic-OKR-Report-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setExportNotification(true);
    setTimeout(() => setExportNotification(false), 3000);
  };

  return (
    <div className="flex flex-col w-full pb-8">
      {exportNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0b1c30] text-white px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2 text-xs">
          <span className="material-symbols-outlined text-[16px] text-[#86f2e4]">check_circle</span>
          <span>Executive OKR Report downloaded successfully</span>
        </div>
      )}

      {/* Top Greeting & Contextual Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 pt-3 mb-5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2 py-0.5 rounded-full bg-[#dce9ff] text-[#45464d] text-xs flex items-center gap-1.5 shadow-sm font-tabular">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006a61] animate-pulse"></span>
              Wednesday, 24 September 2026 • Reva Aesthetic Clinic HQ
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#e5eeff] text-[#45464d] text-xs">
              Q3 Executive Cycle
            </span>
          </div>
          <h1 className="text-3xl font-bold text-[#0b1c30] tracking-tight mt-1">
            Good morning, Bank
          </h1>
          <p className="text-sm text-[#45464d]">
            Here is your daily executive briefing across 4 Workspaces: Marketing, Sales, Operations, Management.
          </p>
        </div>

        {/* Quick Operations Command Toolbar */}
        <div className="flex items-center gap-2 relative">
          <div className="relative">
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white text-[#0b1c30] hover:bg-[#e5eeff] shadow-sm transition-colors text-xs font-semibold cursor-pointer border border-[#c6c6cd]/30"
            >
              <span className="material-symbols-outlined text-[16px] text-[#45464d]">tune</span>
              <span>Filter View</span>
            </button>
            {showFilterMenu && (
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-xl border border-[#c6c6cd]/30 py-1 z-30">
                <button
                  onClick={() => { setFilterWorkspace('all'); setShowFilterMenu(false); }}
                  className="w-full text-left px-3 py-1.5 text-xs hover:bg-[#e5eeff] text-[#0b1c30]"
                >
                  All Workspaces
                </button>
                <button
                  onClick={() => { setFilterWorkspace('Marketing'); setShowFilterMenu(false); }}
                  className="w-full text-left px-3 py-1.5 text-xs hover:bg-[#e5eeff] text-[#0b1c30]"
                >
                  Marketing Only
                </button>
                <button
                  onClick={() => { setFilterWorkspace('Sales'); setShowFilterMenu(false); }}
                  className="w-full text-left px-3 py-1.5 text-xs hover:bg-[#e5eeff] text-[#0b1c30]"
                >
                  Sales & Operations
                </button>
              </div>
            )}
          </div>

          <button
            onClick={handleExportOKR}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white text-[#0b1c30] hover:bg-[#e5eeff] shadow-sm transition-colors text-xs font-semibold cursor-pointer border border-[#c6c6cd]/30"
          >
            <span className="material-symbols-outlined text-[16px] text-[#45464d]">file_download</span>
            <span>Export OKR Report</span>
          </button>

          <button
            onClick={onOpenLogDecision}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-black text-white text-xs font-semibold hover:bg-neutral-800 transition-all shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">add_task</span>
            <span>Log Decision</span>
          </button>
        </div>
      </div>

      {/* Quick Action KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {/* Card 1: Due Today */}
        <div 
          onClick={() => onNavigateWorkspace('seo-content')}
          className="group relative bg-white rounded-xl p-3.5 shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden flex flex-col justify-between border border-[#c6c6cd]/20"
          role="button"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#07006c]"></div>
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] text-[#45464d] uppercase tracking-wider font-semibold">Due Today</span>
              <div className="flex items-baseline gap-1 mt-1 font-tabular">
                <span className="text-3xl font-bold text-[#0b1c30]">6</span>
                <span className="text-xs text-[#45464d]">tasks</span>
              </div>
            </div>
            <div className="w-8 h-8 rounded-lg bg-[#dce9ff] flex items-center justify-center text-[#07006c] group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">schedule</span>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between pt-1 border-t border-[#c6c6cd]/10">
            <span className="text-xs text-[#45464d] font-tabular">2 Critical priority</span>
            <span className="px-1.5 py-0.5 rounded bg-[#e5eeff] text-[#07006c] text-[11px] font-semibold">Active Focus</span>
          </div>
        </div>

        {/* Card 2: Overdue */}
        <div 
          onClick={() => onNavigateWorkspace('my-work')}
          className="group relative bg-white rounded-xl p-3.5 shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden flex flex-col justify-between border border-[#c6c6cd]/20"
          role="button"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#ba1a1a]"></div>
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] text-[#ba1a1a] font-semibold uppercase tracking-wider">Overdue</span>
              <div className="flex items-baseline gap-1 mt-1 font-tabular">
                <span className="text-3xl font-bold text-[#ba1a1a]">3</span>
                <span className="text-xs text-[#45464d]">tasks</span>
              </div>
            </div>
            <div className="w-8 h-8 rounded-lg bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a] group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">warning</span>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between pt-1 border-t border-[#c6c6cd]/10">
            <span className="text-xs text-[#ba1a1a] font-medium font-tabular">Needs immediate action</span>
            <span className="px-1.5 py-0.5 rounded bg-[#ffdad6] text-[#93000a] text-[11px] font-semibold">High Risk</span>
          </div>
        </div>

        {/* Card 3: This Week */}
        <div 
          onClick={() => onNavigateWorkspace('seo-content')}
          className="group relative bg-white rounded-xl p-3.5 shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden flex flex-col justify-between border border-[#c6c6cd]/20"
          role="button"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#c6c6cd]"></div>
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] text-[#45464d] uppercase tracking-wider font-semibold">This Week</span>
              <div className="flex items-baseline gap-1 mt-1 font-tabular">
                <span className="text-3xl font-bold text-[#0b1c30]">14</span>
                <span className="text-xs text-[#45464d]">deliverables</span>
              </div>
            </div>
            <div className="w-8 h-8 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#45464d] group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">calendar_view_week</span>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between pt-1 border-t border-[#c6c6cd]/10">
            <span className="text-xs text-[#45464d] font-tabular">8 Completed so far</span>
            <span className="px-1.5 py-0.5 rounded bg-[#eff4ff] text-[#45464d] text-[11px] font-medium">Steady</span>
          </div>
        </div>

        {/* Card 4: Waiting Approval */}
        <div 
          onClick={() => onNavigateWorkspace('inbox')}
          className="group relative bg-white rounded-xl p-3.5 shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden flex flex-col justify-between border border-[#c6c6cd]/20"
          role="button"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#006a61]"></div>
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] text-[#45464d] uppercase tracking-wider font-semibold">Waiting Approval</span>
              <div className="flex items-baseline gap-1 mt-1 font-tabular">
                <span className="text-3xl font-bold text-[#0b1c30]">2</span>
                <span className="text-xs text-[#45464d]">gateways</span>
              </div>
            </div>
            <div className="w-8 h-8 rounded-lg bg-[#86f2e4] flex items-center justify-center text-[#006f66] group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">verified_user</span>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between pt-1 border-t border-[#c6c6cd]/10">
            <span className="text-xs text-[#006a61] font-medium font-tabular">Medical / Doctor Sign-off</span>
            <span className="px-1.5 py-0.5 rounded bg-[#86f2e4] text-[#006f66] text-[11px] font-semibold">Review</span>
          </div>
        </div>
      </div>

      {/* Two-Column Executive Grid (7:5 desktop proportion) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT COLUMN: Main Focus & Tactical Actions (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* 'NEEDS ATTENTION' Executive Alert Banner */}
          <div className="bg-white rounded-xl p-3.5 shadow-sm border border-[#c6c6cd]/20 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-1 text-[#ba1a1a] font-bold text-sm">
                <span className="material-symbols-outlined text-[20px]">error</span>
                <span>Needs Immediate Attention</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] text-xs font-semibold">
                3 Critical Roadblocks
              </span>
            </div>

            <div className="space-y-1.5">
              {/* Alert Item 1 */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#ffdad6]/30 hover:bg-[#ffdad6]/50 transition-colors border border-[#ffdad6]/40">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="material-symbols-outlined text-[#ba1a1a] text-[18px] shrink-0">campaign</span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs text-[#0b1c30] font-semibold truncate">
                      3 Overdue tasks in Marketing Campaign
                    </span>
                    <span className="text-[11px] text-[#ba1a1a] truncate">
                      Blocking paid ad launch & Meta Pixel budget deployment
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => onResolveRoadblock('rb-1')}
                  className="shrink-0 px-2.5 py-1 rounded bg-[#ba1a1a] text-white text-xs font-semibold hover:opacity-90 shadow-sm transition-opacity cursor-pointer"
                >
                  Resolve
                </button>
              </div>

              {/* Alert Item 2 */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#e5eeff] hover:bg-[#dce9ff] transition-colors border border-[#c6c6cd]/20">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="material-symbols-outlined text-[#006a61] text-[18px] shrink-0">medical_services</span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs text-[#0b1c30] font-semibold truncate">
                      2 Tasks waiting Dr. Korn medical approval &gt; 48 hrs
                    </span>
                    <span className="text-[11px] text-[#45464d] truncate">
                      Sylfirm X and Vitaran clinical efficacy statement verification
                    </span>
                  </div>
                </div>
                <button 
                  onClick={onNudgeDoctor}
                  className="shrink-0 px-2.5 py-1 rounded bg-[#d3e4fe] text-[#0b1c30] text-xs font-semibold hover:bg-[#565e74] hover:text-white transition-colors cursor-pointer"
                >
                  Nudge Doctor
                </button>
              </div>

              {/* Alert Item 3 */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#eff4ff] hover:bg-[#e5eeff] transition-colors border border-[#c6c6cd]/20">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="material-symbols-outlined text-[#76777d] text-[18px] shrink-0">payments</span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs text-[#0b1c30] font-semibold truncate">
                      1 Budget sign-off pending CMO review
                    </span>
                    <span className="text-[11px] text-[#45464d] truncate">
                      ฿300,000 Meta Ads allocation for Q4 Laser aesthetic launch
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => onResolveRoadblock('rb-3')}
                  className="shrink-0 px-2.5 py-1 rounded bg-black text-white text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Review
                </button>
              </div>
            </div>
          </div>

          {/* 'MY WORK' Widget Table/List */}
          <div className="bg-white rounded-xl shadow-sm border border-[#c6c6cd]/20 overflow-hidden">
            {/* Header */}
            <div className="px-3.5 py-3 flex items-center justify-between border-b border-[#c6c6cd]/20">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#0b1c30] tracking-tight">
                  My Work & Prioritized Execution
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#e5eeff] text-[#45464d] text-xs font-tabular font-semibold">
                  4 Pending
                </span>
              </div>
              <button
                onClick={() => onNavigateWorkspace('seo-content')}
                className="text-xs text-[#006a61] hover:text-[#006f66] flex items-center gap-1 font-semibold group transition-colors cursor-pointer"
              >
                <span>View all tasks</span>
                <span className="material-symbols-outlined text-[14px] group-hover:translate-x-0.5 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>

            {/* High-density Clinical Task Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#eff4ff] text-[11px] text-[#45464d] uppercase tracking-wider font-semibold border-b border-[#c6c6cd]/20">
                    <th className="py-2 px-3 w-8">
                      <span className="sr-only">Selection</span>
                      <input className="rounded accent-black w-3.5 h-3.5 cursor-pointer" type="checkbox" readOnly />
                    </th>
                    <th className="py-2 px-2">Task Name & Details</th>
                    <th className="py-2 px-2 hidden sm:table-cell">Workspace</th>
                    <th className="py-2 px-2">Priority</th>
                    <th className="py-2 px-2">Due Date</th>
                    <th className="py-2 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c6c6cd]/10 text-xs">
                  {prioritizedTasks.map((t) => (
                    <tr
                      key={t.id}
                      className={`group hover:bg-[#eff4ff] transition-colors cursor-pointer ${
                        t.isOverdue ? 'bg-[#ffdad6]/10' : ''
                      }`}
                    >
                      <td className="py-2.5 px-3">
                        <input
                          type="checkbox"
                          checked={t.status === 'Done'}
                          onChange={(e) => {
                            e.stopPropagation();
                            onToggleTaskComplete(t.id);
                          }}
                          className="rounded accent-black w-3.5 h-3.5 cursor-pointer"
                        />
                      </td>
                      <td 
                        onClick={() => onSelectTask(t)}
                        className="py-2.5 px-2 min-w-[200px]"
                      >
                        <div className="flex flex-col">
                          <span className={`font-semibold text-sm group-hover:text-[#006a61] transition-colors ${
                            t.status === 'Done' ? 'line-through text-[#76777d]' : t.isOverdue ? 'text-[#ba1a1a]' : 'text-[#0b1c30]'
                          }`}>
                            {t.title}
                          </span>
                          <span className="text-[11px] text-[#45464d] truncate">
                            {t.subtitle}
                          </span>
                        </div>
                      </td>
                      <td 
                        onClick={() => onSelectTask(t)}
                        className="py-2.5 px-2 hidden sm:table-cell"
                      >
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#e5eeff] text-[#0b1c30] text-[11px] font-tabular">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#006a61]"></span>
                          {t.subWorkspace}
                        </span>
                      </td>
                      <td 
                        onClick={() => onSelectTask(t)}
                        className="py-2.5 px-2"
                      >
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          t.priority === 'URGENT'
                            ? 'bg-[#ffdad6] text-[#93000a] animate-pulse'
                            : t.priority === 'HIGH'
                            ? 'bg-[#dce9ff] text-[#45464d]'
                            : 'bg-[#eff4ff] text-[#45464d]'
                        }`}>
                          {t.priority}
                        </span>
                      </td>
                      <td 
                        onClick={() => onSelectTask(t)}
                        className="py-2.5 px-2 font-tabular"
                      >
                        <span className={`flex items-center gap-1 font-medium ${
                          t.isOverdue ? 'text-[#ba1a1a] font-semibold' : 'text-[#0b1c30]'
                        }`}>
                          {t.isOverdue && <span className="material-symbols-outlined text-[14px]">error</span>}
                          {t.isDueToday && <span className="material-symbols-outlined text-[14px] text-[#07006c]">schedule</span>}
                          {t.dueDate}
                        </span>
                      </td>
                      <td 
                        onClick={() => onSelectTask(t)}
                        className="py-2.5 px-3 text-right"
                      >
                        <span className={`inline-block px-2.5 py-0.5 rounded text-xs font-semibold ${
                          t.status === 'Working'
                            ? 'bg-[#86f2e4] text-[#006f66]'
                            : t.status === 'Waiting Approval'
                            ? 'bg-[#dce9ff] text-[#0b1c30]'
                            : t.status === 'Blocked'
                            ? 'bg-[#ffdad6] text-[#ba1a1a]'
                            : 'bg-[#e5eeff] text-[#45464d]'
                        }`}>
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Inline Quick Add Row Bar */}
            <form onSubmit={handleQuickAdd} className="p-2 bg-[#eff4ff] border-t border-[#c6c6cd]/20 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#45464d] flex-1">
                <span className="material-symbols-outlined text-[18px]">add_circle_outline</span>
                <input
                  value={quickTaskTitle}
                  onChange={(e) => setQuickTaskTitle(e.target.value)}
                  className="bg-transparent text-xs text-[#0b1c30] placeholder:text-[#76777d] focus:outline-none flex-1"
                  placeholder="Type to create task in SEO or Campaign workspace..."
                  type="text"
                />
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] text-[#76777d] hidden sm:inline">Press Enter to save</span>
                <button
                  type="submit"
                  className="px-2.5 py-1 rounded bg-white text-[#0b1c30] text-xs font-semibold shadow-sm hover:bg-[#e5eeff] border border-[#c6c6cd]/20 cursor-pointer"
                >
                  Add
                </button>
              </div>
            </form>
          </div>

          {/* Operational Mini Photo Spotlight */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Clinical Facility Audit */}
            <div className="bg-white rounded-xl p-3.5 shadow-sm border border-[#c6c6cd]/20 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] text-[#45464d] uppercase tracking-wider font-semibold">
                    Clinical Facility Audit
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#86f2e4] text-[#006f66] text-xs font-semibold">
                    Passed (99.4%)
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#0b1c30]">
                  Main Laser Suite 01 & Recovery Ward
                </h3>
                <p className="text-xs text-[#45464d] mt-1 leading-relaxed">
                  Sterilization verification and Sylfirm X laser calibration verified by Dr. Korn.
                </p>
              </div>
              <div className="mt-3 rounded-lg overflow-hidden h-32 relative bg-[#e5eeff] group cursor-pointer">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Pristine aesthetic medical clinic laser suite with white minimalist clinical architecture"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdbaJfrO3U_oyBVSExVBop3CuZUjR93fOQu-F_pY2S1GS7lac-T8NuO_1DGBZ5eNAWAkI9nA-YqVcusbmyOD_yzFrrk95-0b74gkQjKLFfKj3HA78a17hpKePKfPFBlaaQ85BJlIdZ5w-8qR5qWBiEW9mz0OJkJM7Qa3qdiM6MKn1Io4M3H2IIZULdu6MX7KqsTajrs8vuaKDJfHS_E-XID6go1pDWM4T8eoClnSp9cRQr1MGtQZ3SDA"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden absolute inset-0 bg-[#dce9ff] flex items-center justify-center text-xs text-[#0b1c30] p-4 text-center">
                  Laser Suite Calibration Certified (Sylfirm X & RedTouch)
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-2.5">
                  <span className="text-xs text-white flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[14px] text-[#89f5e7]">check_circle</span>
                    Certified for 14 Treatments Today
                  </span>
                </div>
              </div>
            </div>

            {/* Campaign Visual Asset */}
            <div className="bg-white rounded-xl p-3.5 shadow-sm border border-[#c6c6cd]/20 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] text-[#45464d] uppercase tracking-wider font-semibold">
                    Campaign Visual Asset
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#e1e0ff] text-[#2f2ebe] text-xs font-semibold">
                    Ready for Launch
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#0b1c30]">
                  RedTouch Pro Skin Rejuvenation
                </h3>
                <p className="text-xs text-[#45464d] mt-1 leading-relaxed">
                  Creative studio deliverables for high-income clientele targeting Bangkok CBD.
                </p>
              </div>
              <div className="mt-3 rounded-lg overflow-hidden h-32 relative bg-[#e5eeff] group cursor-pointer">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="High-end beauty dermatological portrait of a female model with radiant crystal-clear skin"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkufhfl24NTcdu9tLtWHfls_kHOMt1SZrG0cemcdmibPwBbtntAFtVMK2OjsVmolw0Eff2QZSDG5T-NNE5S9FnDzdYAYJOH_-jzzhgjY2Ds87DDPuV90kLV7lrXdEV8UFGtHdEkprlqBYDa0TwzB7eEwz-IJMPdgpV045O5EfDOegpCyOciob8n2XAnQ22143lwhIzxUqSF9Hr_r2L3KKxcapiJqwYAVJAn6AZOurjLTARXBshCCxavQ"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden absolute inset-0 bg-[#dce9ff] flex items-center justify-center text-xs text-[#0b1c30] p-4 text-center">
                  Artwork v2.4 Key Visual Studio Cut
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-2.5">
                  <span className="text-xs text-white flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[14px] text-[#e1e0ff]">image</span>
                    Artwork v2.4 • Pending CMO Sign-off
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Management Oversight & OKR (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* PROJECT HEALTH & OKR TRACKER */}
          <div className="bg-white rounded-xl p-3.5 shadow-sm border border-[#c6c6cd]/20">
            <div className="flex items-center justify-between mb-3">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#0b1c30] tracking-tight">
                  Project Health & OKR Tracker
                </span>
                <span className="text-xs text-[#45464d]">
                  Q3 Strategic Objective Milestones
                </span>
              </div>
              <button 
                onClick={handleExportOKR}
                className="p-1 rounded hover:bg-[#e5eeff] text-[#45464d] transition-colors" 
                title="Manage OKRs"
              >
                <span className="material-symbols-outlined text-[18px]">more_vert</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {okrs.map((okr) => (
                <div
                  key={okr.id}
                  className="p-2.5 rounded-lg bg-[#eff4ff] hover:bg-[#e5eeff] transition-colors border border-[#c6c6cd]/20"
                >
                  <div className="flex items-start justify-between gap-1">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs text-[#0b1c30] font-semibold truncate">
                          {okr.title}
                        </span>
                        <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold shrink-0 ${
                          okr.status === 'ON TRACK'
                            ? 'bg-[#86f2e4] text-[#006f66]'
                            : 'bg-[#ffdad6] text-[#ba1a1a]'
                        }`}>
                          {okr.status}
                        </span>
                      </div>
                      <span className="text-xs text-[#45464d] mt-0.5 block truncate">
                        Supporting OKR: <span className="text-[#0b1c30] font-medium">{okr.supportingOkr}</span>
                      </span>
                    </div>
                    <span className={`text-xs font-bold shrink-0 font-tabular ${
                      okr.status === 'ON TRACK' ? 'text-[#006a61]' : 'text-[#ba1a1a]'
                    }`}>
                      {okr.progress}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-[#e5eeff] h-1.5 rounded-full mt-2 overflow-hidden flex">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${okr.progress}%`,
                        backgroundColor: okr.status === 'ON TRACK' ? '#006a61' : okr.progress < 50 ? '#76777d' : '#ba1a1a'
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#76777d] mt-1 font-tabular">
                    <span>{okr.targetLabel}</span>
                    <span>{okr.currentLabel}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TEAM WORKLOAD & CAPACITY */}
          <div className="bg-white rounded-xl p-3.5 shadow-sm border border-[#c6c6cd]/20">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-sm font-bold text-[#0b1c30] tracking-tight">
                  Team Workload & Capacity
                </span>
                <p className="text-xs text-[#45464d]">
                  Real-time task dispersion & bottleneck gauge
                </p>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#e5eeff] text-[#45464d] text-xs font-semibold">
                Sprint 38
              </span>
            </div>

            <div className="space-y-3">
              {team.map((member) => (
                <div
                  key={member.id}
                  className={`p-2 rounded-lg transition-colors ${
                    member.isOverloaded ? 'bg-[#ffdad6]/20 border border-[#ffdad6]' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      {member.avatar ? (
                        <img
                          alt={member.name}
                          className="w-6 h-6 rounded-full object-cover"
                          src={member.avatar}
                        />
                      ) : (
                        <div className={`w-6 h-6 rounded-full ${member.avatarBg || 'bg-[#0b1c30] text-white'} flex items-center justify-center text-[10px] font-bold`}>
                          {member.initials}
                        </div>
                      )}
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs text-[#0b1c30] font-semibold">{member.name}</span>
                        <span className="text-[11px] text-[#45464d]">({member.role})</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-tabular">
                      <span className="text-[#0b1c30] font-semibold">{member.tasksCount} tasks</span>
                      <span className={`font-medium ${
                        member.isOverloaded ? 'text-[#ba1a1a] font-bold' : member.isDoctor ? 'text-[#45464d]' : 'text-[#006a61]'
                      }`}>
                        {member.statusLabel}
                      </span>
                    </div>
                  </div>

                  {/* Capacity Bar */}
                  <div className="w-full bg-[#e5eeff] h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${member.colorClass}`}
                      style={{ width: `${member.capacityPercent}%` }}
                    />
                  </div>

                  {member.isOverloaded && (
                    <div className="mt-1.5 flex items-center justify-between text-xs">
                      <span className="text-[#ba1a1a] flex items-center gap-1 font-medium">
                        <span className="material-symbols-outlined text-[14px]">report_problem</span>
                        Reallocation recommended
                      </span>
                      <button
                        onClick={onOpenReassign}
                        className="text-[#0b1c30] underline font-semibold hover:text-[#ba1a1a] cursor-pointer"
                      >
                        Reassign
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Weekly Operational Velocity Mini-Graph */}
            <div className="mt-3 pt-3 bg-[#eff4ff] rounded-lg p-3 flex flex-col gap-1 border border-[#c6c6cd]/20">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#0b1c30] font-semibold">
                  Weekly Velocity & Throughput
                </span>
                <span className="text-xs text-[#006a61] font-semibold font-tabular">
                  +18% vs Last Sprint
                </span>
              </div>
              <svg className="w-full h-12 text-[#006a61]" preserveAspectRatio="none" viewBox="0 0 200 40">
                <path
                  d="M0 35 Q 25 30, 50 25 T 100 20 T 150 10 T 200 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M0 35 Q 25 30, 50 25 T 100 20 T 150 10 T 200 6 L 200 40 L 0 40 Z"
                  fill="currentColor"
                  fillOpacity="0.12"
                />
              </svg>
              <div className="flex justify-between text-[11px] text-[#76777d] mt-0.5 font-tabular">
                <span>Mon (12)</span>
                <span className="text-[#006a61] font-semibold">Wed (Today: 21)</span>
                <span>Fri (Target: 35)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
