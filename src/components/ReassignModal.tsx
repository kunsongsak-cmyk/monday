import React, { useState } from 'react';
import { TeamMemberCapacity, Task } from '../types';

interface ReassignModalProps {
  isOpen: boolean;
  onClose: () => void;
  team: TeamMemberCapacity[];
  tasks: Task[];
  onReassignSuccess: (fromMemberId: string, toMemberId: string, taskId: string) => void;
}

export const ReassignModal: React.FC<ReassignModalProps> = ({
  isOpen,
  onClose,
  team,
  tasks,
  onReassignSuccess
}) => {
  const beamTasks = tasks.filter(t => t.owner.name.toLowerCase().includes('beam'));
  const [selectedTaskId, setSelectedTaskId] = useState(beamTasks[0]?.id || '');
  const [targetMemberId, setTargetMemberId] = useState('team-may');

  if (!isOpen) return null;

  const handleReassign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTaskId) return;
    onReassignSuccess('team-beam', targetMemberId, selectedTaskId);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-[#c6c6cd]/30 animate-in fade-in zoom-in-95 duration-150">
        <div className="px-5 py-3.5 bg-[#eff4ff] border-b border-[#c6c6cd]/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#ba1a1a]">report_problem</span>
            <h3 className="font-bold text-sm text-[#0b1c30]">Reallocate Team Workload</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-[#dce9ff] text-[#45464d]">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleReassign} className="p-5 space-y-3.5 text-xs">
          <div className="p-3 rounded-lg bg-[#ffdad6]/30 border border-[#ffdad6] text-[#ba1a1a]">
            <span className="font-bold block">Beam (Art & Media) is at 98% Overloaded capacity.</span>
            <span>Reallocating 1–2 deliverables restores Sprint 38 velocity.</span>
          </div>

          <div>
            <label className="block font-semibold text-[#0b1c30] mb-1">Select Task to Reassign</label>
            <select
              value={selectedTaskId}
              onChange={(e) => setSelectedTaskId(e.target.value)}
              className="w-full px-2 py-1.5 rounded border border-[#c6c6cd]/40 focus:outline-none text-xs text-[#0b1c30] bg-white"
            >
              {beamTasks.map(t => (
                <option key={t.id} value={t.id}>
                  {t.title} ({t.priority})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-[#0b1c30] mb-1">Transfer Ownership To</label>
            <select
              value={targetMemberId}
              onChange={(e) => setTargetMemberId(e.target.value)}
              className="w-full px-2 py-1.5 rounded border border-[#c6c6cd]/40 focus:outline-none text-xs text-[#0b1c30] bg-white font-semibold"
            >
              {team.filter(m => m.id !== 'team-beam').map(m => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.role}) — Currently {m.statusLabel}
                </option>
              ))}
            </select>
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
              className="px-4 py-1.5 rounded bg-[#006a61] text-white text-xs font-semibold hover:bg-[#005049] transition-colors shadow-sm"
            >
              Confirm Reallocation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
