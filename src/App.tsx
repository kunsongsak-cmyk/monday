import React, { useState, useEffect } from 'react';
import { WorkspaceId, Task, OKRItem, TeamMemberCapacity, RoadblockAlert } from './types';
import {
  CURRENT_USER,
  INITIAL_TASKS,
  INITIAL_OKRS,
  INITIAL_TEAM,
  INITIAL_ROADBLOCKS,
  DR_KORN,
  MAY_WRITER
} from './data/mockData';

import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ExecutiveHome } from './components/ExecutiveHome';
import { SeoContentBoard } from './components/SeoContentBoard';
import { TaskDrawer } from './components/TaskDrawer';
import { NewTaskModal } from './components/NewTaskModal';
import { CommandPalette } from './components/CommandPalette';
import { LogDecisionModal } from './components/LogDecisionModal';
import { ReassignModal } from './components/ReassignModal';
import { GenericWorkspaceView } from './components/GenericWorkspaceView';

export default function App() {
  const [currentWorkspace, setCurrentWorkspace] = useState<WorkspaceId>('home');
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [okrs, setOkrs] = useState<OKRItem[]>(INITIAL_OKRS);
  const [team, setTeam] = useState<TeamMemberCapacity[]>(INITIAL_TEAM);
  const [roadblocks, setRoadblocks] = useState<RoadblockAlert[]>(INITIAL_ROADBLOCKS);
  
  // Selected task for Drawer
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Modals state
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isLogDecisionOpen, setIsLogDecisionOpen] = useState(false);
  const [isReassignOpen, setIsReassignOpen] = useState(false);
  
  // Search query
  const [searchQuery, setSearchQuery] = useState('');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Keyboard shortcut for ⌘K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handlers for task interactions
  const handleSelectTask = (task: Task) => {
    setSelectedTask(task);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
    if (selectedTask?.id === updatedTask.id) {
      setSelectedTask(updatedTask);
    }
  };

  const handleToggleTaskComplete = (taskId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const nextStatus = t.status === 'Done' ? 'Working' : 'Done';
        return { ...t, status: nextStatus };
      }
      return t;
    }));
    showToast('Task status updated');
  };

  const handleAddNewTask = (newTask: Task) => {
    setTasks(prev => [newTask, ...prev]);
    showToast(`Task "${newTask.title}" created successfully`);
    handleSelectTask(newTask);
  };

  const handleQuickAdd = (title: string, workspace: string) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title,
      subtitle: 'Clinical deliverable added via quick command',
      workspace,
      subWorkspace: 'SEO Content',
      group: 'SEPTEMBER 2026',
      priority: 'HIGH',
      status: 'Working',
      dueDate: 'Due Sep 28',
      timeline: 'Sep 25 → Sep 28',
      owner: CURRENT_USER,
      doctorReviewer: {
        ...DR_KORN,
        statusNote: 'Dr. Korn Pending'
      },
      medicalReviewStatus: 'Dr. Korn Pending',
      commentsCount: 0,
      scope: 'Standard clinical verification guidelines apply.',
      targetKeywords: ['คลินิกความงาม อโศก'],
      approvalFlow: {
        stage1: { title: 'Content Draft', status: 'in_progress', note: 'Bank' },
        stage2: { title: 'Medical Review', status: 'pending', note: 'Dr. Korn' },
        stage3: { title: 'Sign-off', status: 'pending', note: 'Pending' }
      },
      subtasks: [
        { id: `sub-${Date.now()}-1`, title: 'Compile brief & requirements', completed: false, owner: 'Bank' }
      ],
      assets: [],
      auditLogs: []
    };
    setTasks(prev => [newTask, ...prev]);
    showToast(`Added: ${title}`);
  };

  const handleAddTaskToGroup = (title: string, group: 'SEPTEMBER 2026' | 'OCTOBER 2026') => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title,
      subtitle: `${group} pipeline article`,
      workspace: 'Marketing',
      subWorkspace: 'SEO Content',
      group,
      priority: 'MEDIUM',
      status: 'Not Started',
      dueDate: group === 'SEPTEMBER 2026' ? 'Sep 29' : 'Oct 12',
      timeline: group === 'SEPTEMBER 2026' ? 'Sep 26 → Sep 29' : 'Oct 08 → Oct 12',
      owner: MAY_WRITER,
      doctorReviewer: {
        ...DR_KORN,
        statusNote: 'Unassigned'
      },
      medicalReviewStatus: 'Dr. Korn Assigned',
      commentsCount: 0,
      scope: 'SEO content piece for aesthetic clinic website.',
      targetKeywords: [],
      approvalFlow: {
        stage1: { title: 'Content Draft', status: 'pending', note: 'May' },
        stage2: { title: 'Medical Review', status: 'pending', note: 'Pending' },
        stage3: { title: 'Sign-off', status: 'pending', note: 'Pending' }
      },
      subtasks: [],
      assets: [],
      auditLogs: []
    };
    setTasks(prev => [...prev, newTask]);
    showToast(`Added to ${group}: ${title}`);
  };

  const handleResolveRoadblock = (id: string) => {
    setRoadblocks(prev => prev.filter(r => r.id !== id));
    if (id === 'rb-1') {
      showToast('3 Marketing Campaign tasks unblocked & ad budget cleared');
    } else if (id === 'rb-3') {
      showToast('CMO Budget Sign-off approved: ฿300,000 Meta Ads released');
    }
  };

  const handleNudgeDoctor = () => {
    showToast('Urgent WhatsApp & Slack alert dispatched to Dr. Korn (MD)');
  };

  const handleSaveDecision = (decision: { title: string; category: string; impact: string }) => {
    showToast(`Decision recorded: ${decision.title}`);
  };

  const handleReassignSuccess = (fromMemberId: string, toMemberId: string, taskId: string) => {
    const targetMember = team.find(m => m.id === toMemberId);
    if (!targetMember) return;

    // Update tasks
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          owner: {
            id: targetMember.id,
            name: targetMember.name,
            role: targetMember.role,
            initials: targetMember.initials,
            avatar: targetMember.avatar
          }
        };
      }
      return t;
    }));

    // Update team capacity
    setTeam(prev => prev.map(m => {
      if (m.id === 'team-beam') {
        return {
          ...m,
          tasksCount: m.tasksCount - 1,
          capacityPercent: 84,
          statusLabel: '84% (Optimal)',
          isOverloaded: false,
          colorClass: 'bg-[#006a61]'
        };
      }
      if (m.id === toMemberId) {
        return {
          ...m,
          tasksCount: m.tasksCount + 1,
          capacityPercent: Math.min(100, m.capacityPercent + 10),
          statusLabel: `${Math.min(100, m.capacityPercent + 10)}% (Active)`
        };
      }
      return m;
    }));

    showToast(`Task successfully reassigned to ${targetMember.name}`);
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans antialiased selection:bg-[#dce9ff]">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-16 right-6 z-50 bg-[#0b1c30] text-white px-4 py-2.5 rounded-lg shadow-2xl flex items-center gap-2 text-xs animate-in slide-in-from-top-2 duration-200 border border-neutral-700">
          <span className="material-symbols-outlined text-[18px] text-[#86f2e4]">info</span>
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Fixed Left Sidebar */}
      <Sidebar
        currentWorkspace={currentWorkspace}
        onSelectWorkspace={(id) => setCurrentWorkspace(id)}
        currentUser={CURRENT_USER}
        onOpenSearch={() => setIsCommandPaletteOpen(true)}
        onOpenSettings={() => showToast('Settings: Clinic Preferences & Doctor Credentials')}
        onOpenTemplates={() => showToast('Loaded Reva SOP & Aesthetic Protocol Templates')}
        taskCounts={{
          myWork: tasks.filter(t => t.owner.name.toLowerCase().includes('bank')).length,
          inbox: tasks.filter(t => t.status === 'Waiting Approval' || t.status === 'Review').length,
          notifications: 3
        }}
      />

      {/* Fixed Top Header */}
      <Header
        currentWorkspace={currentWorkspace}
        onSelectWorkspace={(id) => setCurrentWorkspace(id)}
        onOpenNewTask={() => setIsNewTaskModalOpen(true)}
        onOpenSearch={() => setIsCommandPaletteOpen(true)}
        onToggleNotifications={() => setCurrentWorkspace('notifications')}
        unreadCount={roadblocks.length}
        user={CURRENT_USER}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="ml-[240px] mt-14 flex-1 p-6 max-w-[1600px] w-[calc(100%-240px)]">
        {currentWorkspace === 'home' ? (
          <ExecutiveHome
            tasks={tasks}
            okrs={okrs}
            team={team}
            roadblocks={roadblocks}
            onSelectTask={handleSelectTask}
            onNavigateWorkspace={(id) => setCurrentWorkspace(id)}
            onAddTask={(title, ws) => handleQuickAdd(title, ws)}
            onOpenLogDecision={() => setIsLogDecisionOpen(true)}
            onOpenReassign={() => setIsReassignOpen(true)}
            onNudgeDoctor={handleNudgeDoctor}
            onResolveRoadblock={handleResolveRoadblock}
            onToggleTaskComplete={handleToggleTaskComplete}
          />
        ) : currentWorkspace === 'seo-content' || currentWorkspace === 'workspace-seo' ? (
          <SeoContentBoard
            tasks={tasks}
            onSelectTask={handleSelectTask}
            onOpenNewTask={() => setIsNewTaskModalOpen(true)}
            onUpdateTask={handleUpdateTask}
            onAddTaskToGroup={handleAddTaskToGroup}
            selectedTaskId={selectedTask?.id}
          />
        ) : (
          <GenericWorkspaceView
            workspaceId={currentWorkspace}
            tasks={tasks}
            currentUser={CURRENT_USER}
            onSelectTask={handleSelectTask}
            onOpenNewTask={() => setIsNewTaskModalOpen(true)}
            onNavigateHome={() => setCurrentWorkspace('home')}
            onToggleTaskComplete={handleToggleTaskComplete}
          />
        )}
      </main>

      {/* Contextual Sliding Task Drawer */}
      <TaskDrawer
        task={selectedTask}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        onUpdateTask={handleUpdateTask}
        currentUser={CURRENT_USER}
      />

      {/* Global Command Palette (⌘K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        tasks={tasks}
        onSelectTask={handleSelectTask}
        onNavigateWorkspace={(id) => setCurrentWorkspace(id)}
        onOpenNewTask={() => setIsNewTaskModalOpen(true)}
      />

      {/* New Task Modal */}
      <NewTaskModal
        isOpen={isNewTaskModalOpen}
        onClose={() => setIsNewTaskModalOpen(false)}
        onAddTask={handleAddNewTask}
        currentUser={CURRENT_USER}
      />

      {/* Log Decision Modal */}
      <LogDecisionModal
        isOpen={isLogDecisionOpen}
        onClose={() => setIsLogDecisionOpen(false)}
        currentUser={CURRENT_USER}
        onSaveDecision={handleSaveDecision}
      />

      {/* Reassign Overloaded Workload Modal */}
      <ReassignModal
        isOpen={isReassignOpen}
        onClose={() => setIsReassignOpen(false)}
        team={team}
        tasks={tasks}
        onReassignSuccess={handleReassignSuccess}
      />
    </div>
  );
}
