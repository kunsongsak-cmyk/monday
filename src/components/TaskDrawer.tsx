import React, { useState } from 'react';
import { Task, TaskStatus, TaskPriority, User } from '../types';

interface TaskDrawerProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateTask: (updated: Task) => void;
  currentUser: User;
}

export const TaskDrawer: React.FC<TaskDrawerProps> = ({
  task,
  isOpen,
  onClose,
  onUpdateTask,
  currentUser
}) => {
  const [commentText, setCommentText] = useState('');
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [isAddingSubtask, setIsAddingSubtask] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isFullPage, setIsFullPage] = useState(false);

  if (!task) return null;

  const completedSubtasksCount = task.subtasks.filter(s => s.completed).length;
  const subtasksTotal = task.subtasks.length;
  const subtaskPercent = subtasksTotal > 0 ? Math.round((completedSubtasksCount / subtasksTotal) * 100) : 0;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + `/boards/seo/items/${task.id}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleToggleSubtask = (subId: string) => {
    const updatedSubtasks = task.subtasks.map(s => 
      s.id === subId ? { ...s, completed: !s.completed } : s
    );
    onUpdateTask({
      ...task,
      subtasks: updatedSubtasks
    });
  };

  const handleAddSubtask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubtaskTitle.trim()) return;
    const newSub = {
      id: `sub-${Date.now()}`,
      title: newSubtaskTitle.trim(),
      completed: false,
      owner: currentUser.name
    };
    onUpdateTask({
      ...task,
      subtasks: [...task.subtasks, newSub]
    });
    setNewSubtaskTitle('');
    setIsAddingSubtask(false);
  };

  const handleAddComment = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      id: `comment-${Date.now()}`,
      author: `${currentUser.name} (${currentUser.role})`,
      role: currentUser.role,
      avatar: currentUser.avatar,
      initials: currentUser.initials,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: commentText.trim()
    };

    onUpdateTask({
      ...task,
      commentsCount: task.commentsCount + 1,
      auditLogs: [...task.auditLogs, newComment]
    });
    setCommentText('');
  };

  const handleStatusChange = (newStatus: TaskStatus) => {
    onUpdateTask({
      ...task,
      status: newStatus
    });
  };

  const handlePriorityChange = (newPriority: TaskPriority) => {
    onUpdateTask({
      ...task,
      priority: newPriority
    });
  };

  const advanceApprovalStage = (stage: 1 | 2 | 3) => {
    const updatedFlow = { ...task.approvalFlow };
    if (stage === 2) {
      if (updatedFlow.stage2.status === 'in_progress') {
        updatedFlow.stage2.status = 'completed';
        updatedFlow.stage2.note = 'Approved by Dr. Korn';
        updatedFlow.stage3.status = 'in_progress';
      } else {
        updatedFlow.stage2.status = 'in_progress';
        updatedFlow.stage2.note = 'In Review with Dr. Korn';
        updatedFlow.stage3.status = 'pending';
      }
    } else if (stage === 3) {
      if (updatedFlow.stage3.status === 'in_progress') {
        updatedFlow.stage3.status = 'completed';
        updatedFlow.stage3.note = 'Signed off by CMO';
      } else {
        updatedFlow.stage3.status = 'in_progress';
        updatedFlow.stage3.note = 'Pending Sign-off';
      }
    }
    onUpdateTask({
      ...task,
      approvalFlow: updatedFlow
    });
  };

  return (
    <>
      {/* Background scrim for drawer */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-black/20 backdrop-blur-[1px] z-40 transition-opacity"
        />
      )}

      <aside
        id="taskDrawer"
        className={`fixed top-14 right-0 bottom-0 ${
          isFullPage ? 'w-[calc(100vw-240px)]' : 'w-[580px]'
        } max-w-[95vw] bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out border-l border-[#c6c6cd]/30 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Sticky Drawer Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-20 px-6 py-3.5 flex flex-col gap-2 border-b border-[#c6c6cd]/20">
          <div className="flex items-center justify-between text-[#45464d]">
            <div className="flex items-center gap-1 text-xs">
              <span>{task.workspace}</span>
              <span className="text-[#76777d]">/</span>
              <span>{task.subWorkspace}</span>
              <span className="text-[#76777d]">/</span>
              <span className="text-[#0b1c30] font-semibold">{task.group}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-[#e5eeff] text-[#45464d] text-xs transition-colors"
                title="Copy item link"
              >
                <span className="material-symbols-outlined text-[14px]">link</span>
                <span>{copiedLink ? 'Copied!' : `/boards/seo/items/${task.id.replace('task-', '')}`}</span>
              </button>
              <button
                onClick={() => setIsFullPage(!isFullPage)}
                className="p-1 rounded hover:bg-[#e5eeff] text-[#45464d]"
                title={isFullPage ? 'Standard view' : 'Open full view'}
              >
                <span className="material-symbols-outlined text-[16px]">
                  {isFullPage ? 'close_fullscreen' : 'open_in_new'}
                </span>
              </button>
              <button
                onClick={onClose}
                className="p-1 rounded hover:bg-[#e5eeff] text-[#45464d]"
                title="Close drawer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
          </div>
          <h2 className="text-xl font-bold text-[#0b1c30] tracking-tight">
            {task.title}
          </h2>
        </div>

        {/* Scrollable Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Metadata Card */}
          <div className="p-3 bg-[#eff4ff] rounded-lg grid grid-cols-2 gap-y-3 gap-x-4 border border-[#c6c6cd]/20">
            {/* Status Selector */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#45464d] font-medium">Status</span>
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(e.target.value as TaskStatus)}
                className="text-xs font-semibold px-2 py-0.5 rounded bg-[#7073ff] text-white border-none focus:outline-none cursor-pointer"
              >
                <option value="Working">Working</option>
                <option value="Review">Review</option>
                <option value="Waiting Approval">Waiting Approval</option>
                <option value="Blocked">Blocked</option>
                <option value="Done">Done</option>
                <option value="Not Started">Not Started</option>
              </select>
            </div>

            {/* Owner */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#45464d] font-medium">Owner</span>
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold">
                  {task.owner.initials}
                </div>
                <span className="text-xs text-[#0b1c30] font-semibold">{task.owner.name} ({task.owner.badge || 'PM'})</span>
              </div>
            </div>

            {/* Priority Selector */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#45464d] font-medium">Priority</span>
              <select
                value={task.priority}
                onChange={(e) => handlePriorityChange(e.target.value as TaskPriority)}
                className="text-xs font-bold px-2 py-0.5 rounded bg-[#ffdad6] text-[#93000a] border-none focus:outline-none cursor-pointer"
              >
                <option value="URGENT">URGENT</option>
                <option value="HIGH">HIGH</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="LOW">LOW</option>
              </select>
            </div>

            {/* Due Date */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#45464d] font-medium">Due Date</span>
              <span className="text-xs text-[#ba1a1a] font-semibold flex items-center gap-1 font-tabular">
                <span className="material-symbols-outlined text-[14px]">alarm</span>
                <span>{task.dueDate}</span>
              </span>
            </div>

            {/* Timeline */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#45464d] font-medium">Timeline</span>
              <span className="text-xs text-[#0b1c30] font-tabular">{task.timeline}</span>
            </div>

            {/* Doctor Reviewer */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#45464d] font-medium">Doctor Reviewer</span>
              <div className="flex items-center gap-1.5">
                {task.doctorReviewer?.avatar ? (
                  <img
                    alt={task.doctorReviewer.name}
                    className="w-5 h-5 rounded-full object-cover"
                    src={task.doctorReviewer.avatar}
                  />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-[#e1e0ff] text-[#07006c] flex items-center justify-center text-[10px] font-bold">
                    K
                  </div>
                )}
                <span className="text-xs text-[#0b1c30] font-semibold">
                  {task.doctorReviewer?.name || 'Dr. Korn'}
                </span>
              </div>
            </div>
          </div>

          {/* Content Scope & Target SEO */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#0b1c30] tracking-tight">
                Content Scope & Target SEO
              </h3>
              <span className="text-xs text-[#45464d]">Markdown supported</span>
            </div>
            <div className="p-3 bg-[#e5eeff] rounded-lg text-xs text-[#0b1c30] space-y-2 leading-relaxed border border-[#c6c6cd]/20">
              <p>
                Draft comprehensive SEO article targeting high-intent keywords:{' '}
                {task.targetKeywords?.map((kw, i) => (
                  <span
                    key={i}
                    className="inline-block mr-1 px-1.5 py-0.5 rounded bg-[#d3e4fe] font-mono text-[11px] font-bold text-[#0b1c30]"
                  >
                    {kw}
                  </span>
                )) || (
                  <>
                    <span className="px-1.5 py-0.5 rounded bg-[#d3e4fe] font-mono text-[11px] font-bold text-[#0b1c30]">
                      ฟิลเลอร์ใต้ตา Vitaran
                    </span>
                    ,{' '}
                    <span className="px-1.5 py-0.5 rounded bg-[#d3e4fe] font-mono text-[11px] font-bold text-[#0b1c30]">
                      PN polynucleotide under eye review
                    </span>
                  </>
                )}
              </p>
              <p className="text-[#45464d]">
                {task.scope || 'Highlight clinic clinical case studies, injection safety standards, certified practitioners, and comparative analysis versus standard hyaluronic acid dermal fillers.'}
              </p>
            </div>
          </div>

          {/* Clinical Approval Flow */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#0b1c30] tracking-tight">
                  Clinical Approval Flow
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#e5eeff] text-xs font-semibold text-[#45464d]">
                  {task.approvalFlow.stage3.status === 'completed'
                    ? 'Completed (3/3)'
                    : task.approvalFlow.stage2.status === 'completed'
                    ? 'Stage 3 of 3'
                    : 'Stage 2 of 3'}
                </span>
              </div>
            </div>

            <div className="p-3 bg-[#eff4ff] rounded-lg flex items-center justify-between border border-[#c6c6cd]/20">
              {/* Stage 1: Content Draft */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#006a61] text-white flex items-center justify-center text-xs font-bold">
                  ✓
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#0b1c30]">
                    {task.approvalFlow.stage1.title}
                  </span>
                  <span className="text-[11px] text-[#45464d]">
                    {task.approvalFlow.stage1.note}
                  </span>
                </div>
              </div>

              <span className="material-symbols-outlined text-[#76777d] text-[16px]">chevron_right</span>

              {/* Stage 2: Medical Review */}
              <div 
                onClick={() => advanceApprovalStage(2)}
                className="flex items-center gap-2 cursor-pointer group"
                title="Click to toggle doctor sign-off"
              >
                <div className={`w-6 h-6 rounded-full ${
                  task.approvalFlow.stage2.status === 'completed' 
                    ? 'bg-[#006a61] text-white' 
                    : 'bg-[#7073ff] text-white animate-pulse'
                } flex items-center justify-center text-xs font-bold`}>
                  {task.approvalFlow.stage2.status === 'completed' ? '✓' : '2'}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#0b1c30] group-hover:text-[#006a61] transition-colors">
                    {task.approvalFlow.stage2.title}
                  </span>
                  <span className={`text-[11px] font-medium ${
                    task.approvalFlow.stage2.status === 'completed' ? 'text-[#006a61]' : 'text-[#ba1a1a]'
                  }`}>
                    {task.approvalFlow.stage2.note}
                  </span>
                </div>
              </div>

              <span className="material-symbols-outlined text-[#76777d] text-[16px]">chevron_right</span>

              {/* Stage 3: CMO Sign-off */}
              <div 
                onClick={() => advanceApprovalStage(3)}
                className={`flex items-center gap-2 cursor-pointer ${
                  task.approvalFlow.stage3.status === 'pending' ? 'opacity-60' : 'opacity-100'
                }`}
                title="Click to sign off"
              >
                <div className={`w-6 h-6 rounded-full ${
                  task.approvalFlow.stage3.status === 'completed'
                    ? 'bg-[#006a61] text-white'
                    : 'bg-[#d3e4fe] text-[#0b1c30]'
                } flex items-center justify-center text-xs font-bold`}>
                  {task.approvalFlow.stage3.status === 'completed' ? '✓' : '3'}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#0b1c30]">
                    {task.approvalFlow.stage3.title}
                  </span>
                  <span className="text-[11px] text-[#45464d]">
                    {task.approvalFlow.stage3.note}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Subtasks & Deliverables */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#0b1c30] tracking-tight">
                  Subtasks & Deliverables
                </h3>
                <span className="text-xs text-[#45464d] font-tabular">
                  {completedSubtasksCount} of {subtasksTotal} completed ({subtaskPercent}%)
                </span>
              </div>
              <button
                onClick={() => setIsAddingSubtask(!isAddingSubtask)}
                className="text-xs text-[#0b1c30] font-semibold hover:underline cursor-pointer"
              >
                + Add subtask
              </button>
            </div>

            {/* Dynamic Progress Bar */}
            <div className="w-full h-1.5 rounded-full bg-[#d3e4fe] overflow-hidden mb-2">
              <div 
                className="bg-[#006a61] h-full rounded-full transition-all duration-300"
                style={{ width: `${subtaskPercent}%` }}
              />
            </div>

            {/* Inline Add Subtask Input */}
            {isAddingSubtask && (
              <form onSubmit={handleAddSubtask} className="flex items-center gap-2 p-2 bg-[#eff4ff] rounded border border-[#c6c6cd]/30 mb-2">
                <input
                  type="text"
                  placeholder="Enter subtask title..."
                  value={newSubtaskTitle}
                  onChange={(e) => setNewSubtaskTitle(e.target.value)}
                  className="flex-1 bg-white px-2 py-1 text-xs text-[#0b1c30] rounded border border-[#c6c6cd]/40 focus:outline-none focus:border-black"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-2.5 py-1 bg-black text-white text-xs font-semibold rounded hover:bg-neutral-800"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingSubtask(false)}
                  className="px-2 py-1 text-xs text-[#45464d] hover:text-black"
                >
                  Cancel
                </button>
              </form>
            )}

            {/* Subtask list */}
            <div className="space-y-1">
              {task.subtasks.map((sub) => (
                <div
                  key={sub.id}
                  className={`flex items-center justify-between p-2 rounded transition-colors ${
                    sub.isDoctor && !sub.completed
                      ? 'bg-[#eff4ff] border border-[#ffdad6]'
                      : 'bg-white hover:bg-[#eff4ff]'
                  }`}
                >
                  <label className="flex items-center gap-2 cursor-pointer flex-1 min-w-0">
                    <input
                      type="checkbox"
                      checked={sub.completed}
                      onChange={() => handleToggleSubtask(sub.id)}
                      className="w-4 h-4 rounded accent-black cursor-pointer shrink-0"
                    />
                    <span className={`text-xs truncate ${
                      sub.completed 
                        ? 'line-through text-[#76777d]' 
                        : sub.isDoctor ? 'text-[#0b1c30] font-medium' : 'text-[#0b1c30]'
                    }`}>
                      {sub.title}
                    </span>
                  </label>
                  <span className={`px-2 py-0.5 rounded text-xs shrink-0 ${
                    sub.isDoctor && !sub.completed
                      ? 'bg-[#ffdad6] text-[#93000a] font-semibold'
                      : 'bg-[#e5eeff] text-[#45464d]'
                  }`}>
                    {sub.owner}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Clinical Assets & Files */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#0b1c30] tracking-tight">
                Clinical Assets & Files
              </h3>
              <button 
                onClick={() => {
                  const name = prompt('File asset name:', 'patient-case-study-v2.pdf');
                  if (name) {
                    onUpdateTask({
                      ...task,
                      assets: [
                        ...task.assets,
                        { id: `asset-${Date.now()}`, name, size: '1.8 MB', tag: 'Uploaded', type: 'pdf' }
                      ]
                    });
                  }
                }}
                className="text-xs text-[#0b1c30] font-semibold hover:underline cursor-pointer"
              >
                Upload
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {task.assets.map((asset) => (
                <div
                  key={asset.id}
                  className="p-2.5 bg-[#eff4ff] rounded-lg flex items-center gap-2.5 border border-[#c6c6cd]/20 hover:bg-[#e5eeff] transition-colors cursor-pointer"
                  onClick={() => alert(`Viewing certified file: ${asset.name} (${asset.size})`)}
                >
                  <div className="w-8 h-8 rounded bg-[#d3e4fe] text-black flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">
                      {asset.type === 'image' ? 'image' : 'picture_as_pdf'}
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-semibold text-[#0b1c30] truncate">
                      {asset.name}
                    </span>
                    <span className="text-[11px] text-[#45464d] font-tabular">
                      {asset.size} • {asset.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity & Clinical Audit Log */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#0b1c30] tracking-tight">
                Activity & Clinical Audit Log
              </h3>
              <span className="text-xs text-[#45464d] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006a61] animate-pulse"></span>
                Real-time sync
              </span>
            </div>

            {/* Comment history list */}
            <div className="space-y-2.5">
              {task.auditLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 bg-[#eff4ff] rounded-lg flex flex-col gap-1.5 border border-[#c6c6cd]/20"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {log.avatar ? (
                        <img
                          alt={log.author}
                          className="w-6 h-6 rounded-full object-cover"
                          src={log.avatar}
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-[#d3e4fe] text-[#0b1c30] flex items-center justify-center text-[10px] font-bold">
                          {log.initials}
                        </div>
                      )}
                      <span className="text-xs font-bold text-[#0b1c30]">
                        {log.author}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#76777d] font-tabular">
                      {log.time}
                    </span>
                  </div>
                  <p className="text-xs text-[#0b1c30] pl-8 leading-relaxed">
                    {log.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Interactive Comment Input Box */}
            <form onSubmit={handleAddComment} className="p-2 bg-[#eff4ff] rounded-lg flex flex-col gap-2 shadow-sm border border-[#c6c6cd]/30">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                    handleAddComment();
                  }
                }}
                className="w-full bg-transparent p-1.5 text-xs text-[#0b1c30] border-none focus:outline-none resize-none placeholder:text-[#76777d]"
                placeholder="Write a comment or clinical note... Press @ to mention staff"
                rows={2}
              />
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1 text-[#76777d]">
                  <button
                    type="button"
                    onClick={() => setCommentText(prev => prev + '@Dr. Korn ')}
                    className="p-1 hover:text-[#0b1c30] rounded hover:bg-[#e5eeff] transition-colors"
                    title="Mention Dr. Korn"
                  >
                    <span className="material-symbols-outlined text-[18px]">alternate_email</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCommentText(prev => prev + ' [Attachment: ClinicalProtocol-2026.pdf] ')}
                    className="p-1 hover:text-[#0b1c30] rounded hover:bg-[#e5eeff] transition-colors"
                    title="Attach file"
                  >
                    <span className="material-symbols-outlined text-[18px]">attach_file</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCommentText(prev => prev + ' ✨ ')}
                    className="p-1 hover:text-[#0b1c30] rounded hover:bg-[#e5eeff] transition-colors"
                    title="Insert emoji"
                  >
                    <span className="material-symbols-outlined text-[18px]">sentiment_satisfied</span>
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="flex items-center gap-1 px-3 py-1 bg-black text-white text-xs font-semibold rounded hover:bg-neutral-800 transition-all shadow-sm disabled:opacity-40 cursor-pointer"
                >
                  <span>Send</span>
                  <span className="material-symbols-outlined text-[14px]">send</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </aside>
    </>
  );
};
