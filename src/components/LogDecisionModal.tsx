import React, { useState } from 'react';
import { User } from '../types';

interface LogDecisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onSaveDecision: (decision: { title: string; category: string; impact: string }) => void;
}

export const LogDecisionModal: React.FC<LogDecisionModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSaveDecision
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Marketing Budget');
  const [impact, setImpact] = useState('High Impact');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSaveDecision({
      title: title.trim(),
      category,
      impact
    });
    onClose();
    setTitle('');
    setNotes('');
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-[#c6c6cd]/30 animate-in fade-in zoom-in-95 duration-150">
        <div className="px-5 py-3.5 bg-[#eff4ff] border-b border-[#c6c6cd]/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-black">add_task</span>
            <h3 className="font-bold text-sm text-[#0b1c30]">Log Executive Decision</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-[#dce9ff] text-[#45464d]">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-[#0b1c30] mb-1">Decision Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Approve ฿300,000 Meta Ads allocation for Q4 Laser aesthetic launch"
              className="w-full px-3 py-1.5 rounded border border-[#c6c6cd]/40 focus:outline-none focus:border-black text-xs text-[#0b1c30]"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#0b1c30] mb-1">Domain</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-2 py-1.5 rounded border border-[#c6c6cd]/40 focus:outline-none text-xs text-[#0b1c30] bg-white"
              >
                <option value="Marketing Budget">Marketing Budget</option>
                <option value="Medical Protocol">Medical Protocol</option>
                <option value="Clinic Operations">Clinic Operations</option>
                <option value="Vendor Contract">Vendor Contract</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#0b1c30] mb-1">Impact Level</label>
              <select
                value={impact}
                onChange={(e) => setImpact(e.target.value)}
                className="w-full px-2 py-1.5 rounded border border-[#c6c6cd]/40 focus:outline-none text-xs text-[#0b1c30] bg-white font-semibold"
              >
                <option value="High Impact">High Impact</option>
                <option value="Medium Impact">Medium Impact</option>
                <option value="Low Impact">Low Impact</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#0b1c30] mb-1">Clinical / Financial Context</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Rationale, expected ROI, or medical verification notes..."
              className="w-full px-3 py-1.5 rounded border border-[#c6c6cd]/40 focus:outline-none focus:border-black text-xs text-[#0b1c30] resize-none"
            />
          </div>

          <div className="p-2.5 rounded bg-[#eff4ff] border border-[#c6c6cd]/20 flex items-center justify-between text-[11px] text-[#45464d]">
            <span>Signatory: <strong className="text-[#0b1c30]">{currentUser.name} ({currentUser.role})</strong></span>
            <span>Recorded in Audit Trail</span>
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
              Commit Decision
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
