import React, { useState } from 'react';
import { Task, TaskPriority, User } from '../types';
import { DR_KORN, CURRENT_USER } from '../data/mockData';

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: Task) => void;
  currentUser: User;
}

export const NewTaskModal: React.FC<NewTaskModalProps> = ({
  isOpen,
  onClose,
  onAddTask,
  currentUser
}) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [workspace, setWorkspace] = useState('Marketing');
  const [subWorkspace, setSubWorkspace] = useState('SEO Content');
  const [group, setGroup] = useState<'SEPTEMBER 2026' | 'OCTOBER 2026'>('SEPTEMBER 2026');
  const [priority, setPriority] = useState<TaskPriority>('HIGH');
  const [dueDate, setDueDate] = useState('Sep 28');
  const [scope, setScope] = useState('');
  const [keywords, setKeywords] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim() || 'Clinical protocol & content milestone',
      workspace,
      subWorkspace,
      group,
      priority,
      status: 'Working',
      dueDate,
      timeline: `${dueDate} → Next Sprint`,
      owner: currentUser,
      doctorReviewer: {
        ...DR_KORN,
        statusNote: 'Assigned for Verification'
      },
      medicalReviewStatus: 'Dr. Korn Assigned',
      commentsCount: 0,
      scope: scope.trim() || 'Clinical efficacy verification and patient safety standards review.',
      targetKeywords: keywords.split(',').map(s => s.trim()).filter(Boolean),
      approvalFlow: {
        stage1: { title: 'Draft Copy', status: 'in_progress', note: 'Created by ' + currentUser.name },
        stage2: { title: 'Medical Review', status: 'pending', note: 'Dr. Korn Pending' },
        stage3: { title: 'Sign-off', status: 'pending', note: 'Pending' }
      },
      subtasks: [
        { id: `sub-${Date.now()}-1`, title: 'Compile medical data', completed: false, owner: currentUser.name }
      ],
      assets: [],
      auditLogs: [
        {
          id: `log-${Date.now()}`,
          author: `${currentUser.name} (${currentUser.role})`,
          role: currentUser.role,
          avatar: currentUser.avatar,
          initials: currentUser.initials,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `Task initiated in ${workspace} / ${subWorkspace}.`
        }
      ]
    };

    onAddTask(newTask);
    onClose();
    // Reset form
    setTitle('');
    setSubtitle('');
    setScope('');
    setKeywords('');
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-[#c6c6cd]/30 animate-in fade-in zoom-in-95 duration-150">
        <div className="px-5 py-4 bg-[#eff4ff] border-b border-[#c6c6cd]/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#006a61]">add_task</span>
            <h3 className="font-bold text-sm text-[#0b1c30]">Create New Clinical / Marketing Task</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-[#dce9ff] text-[#45464d]">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold text-[#0b1c30] mb-1">Task Name *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Sylfirm X Melasma Clinical Trial Review"
              className="w-full px-3 py-1.5 rounded border border-[#c6c6cd]/40 focus:outline-none focus:border-black text-xs text-[#0b1c30]"
              autoFocus
            />
          </div>

          <div>
            <label className="block font-semibold text-[#0b1c30] mb-1">Subtitle / Clinical Scope</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="e.g. Micro-needle RF patient selection guidelines"
              className="w-full px-3 py-1.5 rounded border border-[#c6c6cd]/40 focus:outline-none focus:border-black text-xs text-[#0b1c30]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#0b1c30] mb-1">Group Timeline</label>
              <select
                value={group}
                onChange={(e) => setGroup(e.target.value as any)}
                className="w-full px-2 py-1.5 rounded border border-[#c6c6cd]/40 focus:outline-none text-xs text-[#0b1c30] bg-white"
              >
                <option value="SEPTEMBER 2026">SEPTEMBER 2026</option>
                <option value="OCTOBER 2026">OCTOBER 2026</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#0b1c30] mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full px-2 py-1.5 rounded border border-[#c6c6cd]/40 focus:outline-none text-xs text-[#0b1c30] bg-white font-semibold"
              >
                <option value="URGENT">URGENT</option>
                <option value="HIGH">HIGH</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="LOW">LOW</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#0b1c30] mb-1">Workspace Target</label>
              <select
                value={subWorkspace}
                onChange={(e) => {
                  setSubWorkspace(e.target.value);
                  if (e.target.value === 'SEO Content' || e.target.value === 'Marketing Campaign') {
                    setWorkspace('Marketing');
                  } else {
                    setWorkspace('Operations');
                  }
                }}
                className="w-full px-2 py-1.5 rounded border border-[#c6c6cd]/40 focus:outline-none text-xs text-[#0b1c30] bg-white"
              >
                <option value="SEO Content">SEO Content</option>
                <option value="Marketing Campaign">Marketing Campaign</option>
                <option value="Clinic Operations">Clinic Operations</option>
                <option value="Sales Operations">Sales Operations</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#0b1c30] mb-1">Due Date</label>
              <input
                type="text"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                placeholder="e.g. Sep 28"
                className="w-full px-3 py-1.5 rounded border border-[#c6c6cd]/40 focus:outline-none focus:border-black text-xs text-[#0b1c30]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#0b1c30] mb-1">Target Keywords (comma separated)</label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="e.g. Sylfirm X RF, Melasma treatment Bangkok"
              className="w-full px-3 py-1.5 rounded border border-[#c6c6cd]/40 focus:outline-none text-xs text-[#0b1c30]"
            />
          </div>

          <div className="pt-3 border-t border-[#c6c6cd]/20 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded text-xs text-[#45464d] hover:bg-[#eff4ff]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded bg-black text-white text-xs font-semibold hover:bg-neutral-800 transition-colors shadow-sm"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
