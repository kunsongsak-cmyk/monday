import React, { useState } from 'react';
import { Task, TaskStatus, TaskPriority } from '../types';

interface SeoContentBoardProps {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
  onOpenNewTask: () => void;
  onUpdateTask: (task: Task) => void;
  onAddTaskToGroup: (title: string, group: 'SEPTEMBER 2026' | 'OCTOBER 2026') => void;
  selectedTaskId?: string;
}

export const SeoContentBoard: React.FC<SeoContentBoardProps> = ({
  tasks,
  onSelectTask,
  onOpenNewTask,
  onUpdateTask,
  onAddTaskToGroup,
  selectedTaskId
}) => {
  const [activeTab, setActiveTab] = useState<'table' | 'kanban' | 'calendar' | 'timeline'>('table');
  const [septExpanded, setSeptExpanded] = useState(true);
  const [octExpanded, setOctExpanded] = useState(true);
  const [septQuickName, setSeptQuickName] = useState('');
  const [octQuickName, setOctQuickName] = useState('');
  const [filterText, setFilterText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [boardDescription, setBoardDescription] = useState('Website SEO content management & medical review workflows');
  const [isEditingDesc, setIsEditingDesc] = useState(false);

  // Filter tasks based on search & status filter
  const filteredTasks = tasks.filter(t => {
    const matchesSearch = !filterText || 
      t.title.toLowerCase().includes(filterText.toLowerCase()) || 
      t.subtitle.toLowerCase().includes(filterText.toLowerCase()) ||
      t.owner.name.toLowerCase().includes(filterText.toLowerCase());

    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const septTasks = filteredTasks.filter(t => t.group === 'SEPTEMBER 2026');
  const octTasks = filteredTasks.filter(t => t.group === 'OCTOBER 2026');

  const handleSeptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!septQuickName.trim()) return;
    onAddTaskToGroup(septQuickName.trim(), 'SEPTEMBER 2026');
    setSeptQuickName('');
  };

  const handleOctSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!octQuickName.trim()) return;
    onAddTaskToGroup(octQuickName.trim(), 'OCTOBER 2026');
    setOctQuickName('');
  };

  const handleStatusChange = (task: Task, newStatus: TaskStatus) => {
    onUpdateTask({
      ...task,
      status: newStatus
    });
  };

  return (
    <div className="flex flex-col w-full">
      {/* Board Header */}
      <div className="flex items-start justify-between pb-3 pt-2">
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded bg-black text-white shrink-0">
              <span className="material-symbols-outlined text-[18px]">view_column</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-bold text-[#0b1c30] tracking-tight">
                SEO CONTENT 2026
              </h1>
              <span className="px-2 py-0.5 rounded bg-[#e5eeff] text-xs text-[#45464d] font-semibold">
                Q3/Q4 Pipeline
              </span>
            </div>
          </div>

          <div className="pl-10 flex items-center gap-1.5 text-xs text-[#45464d]">
            {isEditingDesc ? (
              <input
                type="text"
                value={boardDescription}
                onChange={(e) => setBoardDescription(e.target.value)}
                onBlur={() => setIsEditingDesc(false)}
                onKeyDown={(e) => e.key === 'Enter' && setIsEditingDesc(false)}
                autoFocus
                className="bg-white px-2 py-0.5 rounded border border-[#c6c6cd] text-xs text-[#0b1c30] focus:outline-none"
              />
            ) : (
              <span>{boardDescription}</span>
            )}
            <button
              onClick={() => setIsEditingDesc(!isEditingDesc)}
              className="material-symbols-outlined text-[14px] text-[#76777d] hover:text-[#0b1c30] cursor-pointer"
              title="Edit description"
            >
              edit
            </button>
          </div>
        </div>

        {/* Board Actions & Team Avatars */}
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2 mr-2">
            <img
              className="w-7 h-7 rounded-full object-cover shadow-sm ring-2 ring-white"
              alt="Dr. Korn"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3NBjdOkJoGLQ_6uWOrS9seI0w6jZoeiP1q5IH0nMho7sbYSbMJ4npTLgtjxvHhg-z-Nbd276Xx2mo5q4DmOkrm_rlME_5a_5xcuafP3xZ1-ppM5cdt9P2-rEiHBC5pYIUF5aJCty-v_uQhcrn0XuWMx7i7MntPks_kQdjBKfYE8zxAKGj0z-B8OeswtLX0JLJir5uGSzbz24Iz0fM3DhVDt0iSEXrHNq7uxsm9OwW8zZJ4-7GRM2ecQ"
              title="Dr. Korn (Dermatologist)"
            />
            <img
              className="w-7 h-7 rounded-full object-cover shadow-sm ring-2 ring-white"
              alt="May"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQOfbIUpR7Io4VqDLVbZsvi2xfSLXq_kui-LNHkyHnZ9paq4sl9vHErmXgbTFHM0Sfq4njCcK96H6sz8-cilHK99zoXx5h9SxkM7WKYmYt0DCB0uEg9LHOy-Q8jXB_5WroAnTEDSts6BbjRF4N6nq-mT-YW7qWUlC7854Hm4nXLHGH7PmEuSN6sGokzjCW4SSh71-2DAUq9xhluYBaXV_kOQDbHb17R6vBIejWnklF9yOQL4oUe63AEA"
              title="May (Medical Writer)"
            />
            <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-xs font-semibold shadow-sm ring-2 ring-white">
              +4
            </div>
          </div>

          <button
            onClick={() => alert('Customizing Board: Reordering status triggers, SLA alerts, and medical verification gateways.')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#eff4ff] hover:bg-[#e5eeff] text-[#0b1c30] text-xs font-semibold transition-colors shadow-sm cursor-pointer border border-[#c6c6cd]/30"
          >
            <span className="material-symbols-outlined text-[16px]">tune</span>
            <span>Customize</span>
          </button>

          <button
            onClick={onOpenNewTask}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-black text-white text-xs font-semibold hover:bg-neutral-800 transition-all shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* View Tabs & Filter Toolbar */}
      <div className="flex items-center justify-between pb-2.5 flex-wrap gap-2">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('table')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'table'
                ? 'bg-white text-[#0b1c30] shadow-sm border border-[#c6c6cd]/20'
                : 'text-[#45464d] hover:bg-[#eff4ff]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">table_rows</span>
            <span>Table</span>
          </button>

          <button
            onClick={() => setActiveTab('kanban')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'kanban'
                ? 'bg-white text-[#0b1c30] shadow-sm border border-[#c6c6cd]/20 font-semibold'
                : 'text-[#45464d] hover:bg-[#eff4ff]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">view_kanban</span>
            <span>Kanban</span>
            <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-[#e5eeff] text-[#45464d] text-[10px] font-semibold font-tabular">
              {tasks.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'calendar'
                ? 'bg-white text-[#0b1c30] shadow-sm border border-[#c6c6cd]/20 font-semibold'
                : 'text-[#45464d] hover:bg-[#eff4ff]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">calendar_today</span>
            <span>Calendar</span>
          </button>

          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'timeline'
                ? 'bg-white text-[#0b1c30] shadow-sm border border-[#c6c6cd]/20 font-semibold'
                : 'text-[#45464d] hover:bg-[#eff4ff]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">timeline</span>
            <span>Timeline / Gantt</span>
          </button>

          <button 
            onClick={() => alert('Added new custom clinical view tab: Audit Log Matrix')}
            className="p-1.5 rounded hover:bg-[#eff4ff] text-[#45464d]"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
          </button>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-2">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-2 text-[#76777d] text-[16px]">
              filter_list
            </span>
            <input
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="w-44 pl-7 pr-2 py-1 bg-white rounded text-xs text-[#0b1c30] placeholder:text-[#76777d] shadow-sm focus:outline-none border border-[#c6c6cd]/20"
              placeholder="Filter tasks..."
              type="text"
            />
          </div>

          {/* Status selector */}
          <div className="relative">
            <button
              onClick={() => setShowStatusMenu(!showStatusMenu)}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#eff4ff] text-xs text-[#0b1c30] shadow-sm border border-[#c6c6cd]/20 cursor-pointer"
            >
              <span className="text-[#45464d]">Status:</span>
              <span className="font-semibold">{statusFilter}</span>
              {statusFilter !== 'All' ? (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setStatusFilter('All');
                  }}
                  className="material-symbols-outlined text-[14px] text-[#76777d] hover:text-[#0b1c30]"
                >
                  close
                </span>
              ) : (
                <span className="material-symbols-outlined text-[14px] text-[#76777d]">
                  expand_more
                </span>
              )}
            </button>

            {showStatusMenu && (
              <div className="absolute right-0 mt-1 w-36 bg-white rounded-lg shadow-xl border border-[#c6c6cd]/30 py-1 z-30">
                {['All', 'Working', 'Review', 'Waiting Approval', 'Blocked', 'Done', 'Not Started'].map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      setStatusFilter(st);
                      setShowStatusMenu(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-[#eff4ff] ${
                      statusFilter === st ? 'font-bold text-[#006a61]' : 'text-[#0b1c30]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => {
              alert('Tasks sorted by priority & due date');
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-white text-[#0b1c30] text-xs font-semibold hover:bg-[#eff4ff] shadow-sm transition-colors border border-[#c6c6cd]/20 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">sort</span>
            <span>Sort</span>
          </button>

          <button
            onClick={() => {
              alert('Column visibility toggle');
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-white text-[#0b1c30] text-xs font-semibold hover:bg-[#eff4ff] shadow-sm transition-colors border border-[#c6c6cd]/20 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">visibility_off</span>
            <span>Hide Columns</span>
          </button>
        </div>
      </div>

      {/* Main Board Viewport */}
      {activeTab === 'table' && (
        <div className="flex flex-col gap-4 pb-12">
          {/* GROUP 1: SEPTEMBER 2026 */}
          <div className="bg-white rounded-lg shadow-sm border border-[#c6c6cd]/20 overflow-hidden">
            {/* Group Header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#eff4ff] border-b border-[#c6c6cd]/20">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSeptExpanded(!septExpanded)}
                  className="material-symbols-outlined text-[18px] text-[#0b1c30] hover:text-black transition-transform cursor-pointer"
                >
                  {septExpanded ? 'arrow_drop_down' : 'arrow_right'}
                </button>
                <span className="w-2.5 h-2.5 rounded-full bg-[#7073ff]"></span>
                <span className="text-sm font-bold text-[#0b1c30] tracking-tight">
                  SEPTEMBER 2026
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white text-xs text-[#45464d] font-semibold font-tabular">
                  {septTasks.length} Tasks
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#45464d] font-medium font-tabular">67% Done</span>
                  <div className="w-28 h-2 rounded-full bg-[#d3e4fe] overflow-hidden flex">
                    <div className="bg-[#006a61] h-full" style={{ width: '67%' }}></div>
                    <div className="bg-[#7073ff] h-full" style={{ width: '17%' }}></div>
                    <div className="bg-[#c6c6cd] h-full" style={{ width: '16%' }}></div>
                  </div>
                </div>
                <button 
                  onClick={() => alert('Group Options: Collapse, Sort by Doctor, Export')}
                  className="material-symbols-outlined text-[18px] text-[#76777d] hover:text-[#0b1c30]"
                >
                  more_horiz
                </button>
              </div>
            </div>

            {/* Table */}
            {septExpanded && (
              <div className="overflow-x-auto w-full">
                <div className="min-w-[840px] flex flex-col text-xs">
                  {/* Table Column Bar */}
                  <div className="flex items-center h-8 bg-[#e5eeff] text-[#45464d] text-[11px] uppercase tracking-wider px-3 select-none font-semibold border-b border-[#c6c6cd]/20">
                    <div className="w-8 flex items-center justify-center">
                      <input className="w-3.5 h-3.5 rounded bg-white text-black" type="checkbox" readOnly />
                    </div>
                    <div className="flex-1 min-w-[260px]">Task Name</div>
                    <div className="w-32">Owner</div>
                    <div className="w-32">Status</div>
                    <div className="w-28">Priority</div>
                    <div className="w-28">Due Date</div>
                    <div className="w-36">Medical Review</div>
                    <div className="w-16 text-center">Chat</div>
                  </div>

                  {/* Rows */}
                  {septTasks.map((t) => {
                    const isSelected = selectedTaskId === t.id;
                    return (
                      <div
                        key={t.id}
                        onClick={() => onSelectTask(t)}
                        className={`flex items-center h-10 px-3 cursor-pointer transition-all border-b border-[#c6c6cd]/10 ${
                          isSelected
                            ? 'bg-[#dce9ff] shadow-sm'
                            : 'hover:bg-[#eff4ff] bg-white'
                        }`}
                      >
                        <div 
                          className="w-8 flex items-center justify-center"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <input
                            type="checkbox"
                            checked={t.status === 'Done'}
                            onChange={() => {
                              onUpdateTask({
                                ...t,
                                status: t.status === 'Done' ? 'Working' : 'Done'
                              });
                            }}
                            className="w-3.5 h-3.5 rounded accent-black cursor-pointer"
                          />
                        </div>

                        <div className="flex-1 min-w-[260px] flex items-center gap-2">
                          <span className="material-symbols-outlined text-[16px] text-[#76777d]">
                            drag_indicator
                          </span>
                          <span className={`font-semibold truncate ${
                            isSelected ? 'text-[#0b1c30]' : 'text-[#0b1c30]'
                          }`}>
                            {t.title}
                          </span>
                          {t.id === 'task-1842' && (
                            <span className="px-1.5 py-0.2 rounded bg-black text-white text-[10px] font-bold">
                              ACTIVE
                            </span>
                          )}
                        </div>

                        <div className="w-32 flex items-center gap-1.5">
                          {t.owner.avatar ? (
                            <img
                              alt={t.owner.name}
                              className="w-6 h-6 rounded-full object-cover"
                              src={t.owner.avatar}
                            />
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold">
                              {t.owner.initials}
                            </div>
                          )}
                          <span className="truncate text-[#0b1c30] font-medium">
                            {t.owner.name}
                          </span>
                        </div>

                        <div 
                          className="w-32"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <select
                            value={t.status}
                            onChange={(e) => handleStatusChange(t, e.target.value as TaskStatus)}
                            className={`w-26 px-2 py-0.5 rounded text-xs font-semibold border-none focus:outline-none cursor-pointer ${
                              t.status === 'Working'
                                ? 'bg-[#7073ff] text-white'
                                : t.status === 'Review'
                                ? 'bg-[#07006c] text-white'
                                : t.status === 'Done'
                                ? 'bg-[#006a61] text-white'
                                : t.status === 'Waiting Approval'
                                ? 'bg-[#d3e4fe] text-[#0b1c30]'
                                : 'bg-[#e5eeff] text-[#45464d]'
                            }`}
                          >
                            <option value="Working">Working</option>
                            <option value="Review">Review</option>
                            <option value="Waiting Approval">Waiting</option>
                            <option value="Done">Done</option>
                            <option value="Blocked">Blocked</option>
                          </select>
                        </div>

                        <div className="w-28 flex items-center gap-1 text-xs">
                          <span className={`w-2 h-2 rounded-full ${
                            t.priority === 'URGENT' || t.priority === 'HIGH' ? 'bg-[#ba1a1a]' : 'bg-[#565e74]'
                          }`}></span>
                          <span className={t.priority === 'HIGH' || t.priority === 'URGENT' ? 'font-semibold text-[#ba1a1a]' : 'text-[#45464d]'}>
                            {t.priority}
                          </span>
                        </div>

                        <div className="w-28 font-tabular text-xs">
                          <span className={t.isDueToday ? 'text-[#ba1a1a] font-semibold flex items-center gap-1' : 'text-[#0b1c30]'}>
                            {t.isDueToday && <span className="material-symbols-outlined text-[14px]">event_upcoming</span>}
                            {t.dueDate}
                          </span>
                        </div>

                        <div className="w-36">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium max-w-[130px] truncate ${
                            t.medicalReviewStatus?.includes('OK') || t.medicalReviewStatus === 'Completed'
                              ? 'bg-[#86f2e4] text-[#006f66]'
                              : 'bg-[#e5eeff] text-[#0b1c30]'
                          }`}>
                            <span className="material-symbols-outlined text-[13px] text-[#76777d]">
                              {t.medicalReviewStatus?.includes('OK') || t.medicalReviewStatus === 'Completed' ? 'verified' : 'hourglass_empty'}
                            </span>
                            <span className="truncate">{t.medicalReviewStatus}</span>
                          </span>
                        </div>

                        <div className="w-16 flex items-center justify-center gap-1 text-[#45464d] text-xs font-tabular">
                          <span className="material-symbols-outlined text-[16px]">chat_bubble_outline</span>
                          <span>{t.commentsCount}</span>
                        </div>
                      </div>
                    );
                  })}

                  {/* Inline Add Row */}
                  <form onSubmit={handleSeptSubmit} className="flex items-center h-9 px-3 bg-white hover:bg-[#eff4ff] transition-colors border-t border-[#c6c6cd]/20">
                    <div className="w-8 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[16px] text-[#76777d]">add</span>
                    </div>
                    <input
                      value={septQuickName}
                      onChange={(e) => setSeptQuickName(e.target.value)}
                      className="flex-1 bg-transparent border-none text-[#0b1c30] text-xs focus:outline-none placeholder:text-[#76777d]"
                      placeholder="+ Type new task name and press Enter..."
                      type="text"
                    />
                  </form>
                </div>
              </div>
            )}
          </div>

          {/* GROUP 2: OCTOBER 2026 */}
          <div className="bg-white rounded-lg shadow-sm border border-[#c6c6cd]/20 overflow-hidden">
            {/* Group Header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#eff4ff] border-b border-[#c6c6cd]/20">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setOctExpanded(!octExpanded)}
                  className="material-symbols-outlined text-[18px] text-[#0b1c30] hover:text-black transition-transform cursor-pointer"
                >
                  {octExpanded ? 'arrow_drop_down' : 'arrow_right'}
                </button>
                <span className="w-2.5 h-2.5 rounded-full bg-[#006a61]"></span>
                <span className="text-sm font-bold text-[#0b1c30] tracking-tight">
                  OCTOBER 2026
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white text-xs text-[#45464d] font-semibold font-tabular">
                  {octTasks.length} Tasks
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#45464d] font-medium font-tabular">12% Done</span>
                  <div className="w-28 h-2 rounded-full bg-[#d3e4fe] overflow-hidden flex">
                    <div className="bg-[#006a61] h-full" style={{ width: '12%' }}></div>
                    <div className="bg-[#d3e4fe] h-full" style={{ width: '88%' }}></div>
                  </div>
                </div>
                <button 
                  onClick={() => alert('Group Options: Collapse, Sort by Doctor, Export')}
                  className="material-symbols-outlined text-[18px] text-[#76777d] hover:text-[#0b1c30]"
                >
                  more_horiz
                </button>
              </div>
            </div>

            {/* Table */}
            {octExpanded && (
              <div className="overflow-x-auto w-full">
                <div className="min-w-[840px] flex flex-col text-xs">
                  {octTasks.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => onSelectTask(t)}
                      className="flex items-center h-10 px-3 hover:bg-[#eff4ff] cursor-pointer transition-all border-b border-[#c6c6cd]/10 bg-white"
                    >
                      <div 
                        className="w-8 flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          checked={t.status === 'Done'}
                          onChange={() => {
                            onUpdateTask({
                              ...t,
                              status: t.status === 'Done' ? 'Working' : 'Done'
                            });
                          }}
                          className="w-3.5 h-3.5 rounded accent-black cursor-pointer"
                        />
                      </div>

                      <div className="flex-1 min-w-[260px] flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-[#76777d]">
                          drag_indicator
                        </span>
                        <span className="text-[#0b1c30] font-medium truncate">
                          {t.title}
                        </span>
                      </div>

                      <div className="w-32 flex items-center gap-1.5">
                        {t.owner.avatar ? (
                          <img
                            alt={t.owner.name}
                            className="w-6 h-6 rounded-full object-cover"
                            src={t.owner.avatar}
                          />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-[#d3e4fe] text-[#0b1c30] flex items-center justify-center text-[10px] font-bold">
                            {t.owner.initials}
                          </div>
                        )}
                        <span className="truncate text-[#0b1c30]">{t.owner.name}</span>
                      </div>

                      <div 
                        className="w-32"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <select
                          value={t.status}
                          onChange={(e) => handleStatusChange(t, e.target.value as TaskStatus)}
                          className={`w-26 px-2 py-0.5 rounded text-xs font-semibold border-none focus:outline-none cursor-pointer ${
                            t.status === 'Working'
                              ? 'bg-[#7073ff] text-white'
                              : 'bg-[#e5eeff] text-[#45464d]'
                          }`}
                        >
                          <option value="Not Started">Not Started</option>
                          <option value="Working">Working</option>
                          <option value="Review">Review</option>
                          <option value="Done">Done</option>
                        </select>
                      </div>

                      <div className="w-28 flex items-center gap-1 text-xs">
                        <span className={`w-2 h-2 rounded-full ${
                          t.priority === 'HIGH' ? 'bg-[#ba1a1a]' : 'bg-[#565e74]'
                        }`}></span>
                        <span className={t.priority === 'HIGH' ? 'font-semibold text-[#ba1a1a]' : 'text-[#45464d]'}>
                          {t.priority}
                        </span>
                      </div>

                      <div className="w-28 font-tabular text-xs text-[#0b1c30]">
                        <span>{t.dueDate}</span>
                      </div>

                      <div className="w-36">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#e5eeff] text-[#45464d] text-xs font-medium max-w-[130px] truncate">
                          <span className="material-symbols-outlined text-[13px] text-[#76777d]">
                            {t.medicalReviewStatus === 'Unassigned' ? 'pending' : 'hourglass_empty'}
                          </span>
                          <span className="truncate">{t.medicalReviewStatus}</span>
                        </span>
                      </div>

                      <div className="w-16 flex items-center justify-center gap-1 text-[#45464d] text-xs font-tabular">
                        <span className="material-symbols-outlined text-[16px]">chat_bubble_outline</span>
                        <span>{t.commentsCount}</span>
                      </div>
                    </div>
                  ))}

                  {/* Inline Add Row */}
                  <form onSubmit={handleOctSubmit} className="flex items-center h-9 px-3 bg-white hover:bg-[#eff4ff] transition-colors border-t border-[#c6c6cd]/20">
                    <div className="w-8 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[16px] text-[#76777d]">add</span>
                    </div>
                    <input
                      value={octQuickName}
                      onChange={(e) => setOctQuickName(e.target.value)}
                      className="flex-1 bg-transparent border-none text-[#0b1c30] text-xs focus:outline-none placeholder:text-[#76777d]"
                      placeholder="+ Type new task name and press Enter..."
                      type="text"
                    />
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Kanban View */}
      {activeTab === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-12 overflow-x-auto">
          {(['Not Started', 'Working', 'Review', 'Done'] as TaskStatus[]).map((colStatus) => {
            const colTasks = filteredTasks.filter(t => t.status === colStatus);
            return (
              <div key={colStatus} className="bg-[#eff4ff] rounded-xl p-3 border border-[#c6c6cd]/20 flex flex-col gap-2 min-h-[450px]">
                <div className="flex items-center justify-between pb-2 border-b border-[#c6c6cd]/20">
                  <span className="font-bold text-xs text-[#0b1c30] uppercase tracking-wider">
                    {colStatus}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-white text-xs font-semibold text-[#45464d] font-tabular">
                    {colTasks.length}
                  </span>
                </div>

                <div className="space-y-2 flex-1 overflow-y-auto">
                  {colTasks.map(t => (
                    <div
                      key={t.id}
                      onClick={() => onSelectTask(t)}
                      className="p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-[#c6c6cd]/20 flex flex-col gap-2"
                    >
                      <div className="flex items-start justify-between gap-1">
                        <span className="font-semibold text-xs text-[#0b1c30] line-clamp-2">
                          {t.title}
                        </span>
                        <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold shrink-0 ${
                          t.priority === 'HIGH' || t.priority === 'URGENT' ? 'bg-[#ffdad6] text-[#93000a]' : 'bg-[#e5eeff] text-[#45464d]'
                        }`}>
                          {t.priority}
                        </span>
                      </div>

                      <p className="text-[11px] text-[#45464d] line-clamp-2">
                        {t.subtitle}
                      </p>

                      <div className="flex items-center justify-between pt-1 border-t border-[#c6c6cd]/10 text-xs">
                        <div className="flex items-center gap-1">
                          <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold">
                            {t.owner.initials}
                          </div>
                          <span className="text-[11px] text-[#45464d] truncate max-w-[80px]">
                            {t.owner.name}
                          </span>
                        </div>
                        <span className="text-[11px] text-[#76777d] font-tabular">
                          {t.dueDate}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Timeline / Gantt View */}
      {activeTab === 'timeline' && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#c6c6cd]/20 pb-12 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-[#c6c6cd]/20 pb-3">
            <div>
              <h3 className="font-bold text-sm text-[#0b1c30]">Clinical Content Delivery Timeline</h3>
              <p className="text-xs text-[#45464d]">Gantt scheduling from draft to doctor sign-off & publishing</p>
            </div>
            <span className="px-2.5 py-1 rounded bg-[#e5eeff] text-xs font-semibold text-[#0b1c30]">
              Sep 20 – Oct 15
            </span>
          </div>

          <div className="space-y-3">
            {filteredTasks.map((t, idx) => {
              const leftPercent = (idx * 12) % 65;
              const widthPercent = 25 + ((idx * 7) % 25);
              return (
                <div key={t.id} className="flex items-center gap-3 text-xs">
                  <span className="w-48 truncate font-medium text-[#0b1c30] cursor-pointer hover:underline" onClick={() => onSelectTask(t)}>
                    {t.title}
                  </span>
                  <div className="flex-1 bg-[#eff4ff] h-6 rounded-md relative overflow-hidden flex items-center px-2">
                    <div
                      className={`absolute top-1 bottom-1 rounded flex items-center px-2 text-[10px] text-white font-semibold shadow-sm transition-all ${
                        t.status === 'Done' ? 'bg-[#006a61]' : t.priority === 'HIGH' ? 'bg-[#7073ff]' : 'bg-[#0b1c30]'
                      }`}
                      style={{ left: `${leftPercent}%`, width: `${widthPercent}%` }}
                    >
                      <span className="truncate">{t.timeline}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Calendar View */}
      {activeTab === 'calendar' && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#c6c6cd]/20 pb-12">
          <div className="text-center py-6 text-sm text-[#45464d] flex flex-col items-center gap-2">
            <span className="material-symbols-outlined text-3xl text-[#006a61]">calendar_month</span>
            <span className="font-semibold text-[#0b1c30]">September - October 2026 Treatment Publication Schedule</span>
            <p className="text-xs max-w-md text-center">
              All 12 medical SEO deliverables, laser calibration protocols, and doctor review sessions are synchronized with Reva Clinic's consultation calendar.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
