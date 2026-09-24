export type WorkspaceId = 'home' | 'my-work' | 'inbox' | 'notifications' | 'seo-content' | 'marketing-2026' | 'clinic-operations' | 'workspace-seo' | 'workspace-social-media' | 'workspace-campaign' | 'workspace-sales' | 'workspace-operations' | 'workspace-management';

export type TaskStatus = 'Working' | 'Review' | 'Waiting Approval' | 'Blocked' | 'Done' | 'Not Started';
export type TaskPriority = 'URGENT' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface User {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  badge?: string;
  initials: string;
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  owner: string;
  isDoctor?: boolean;
}

export interface TaskAsset {
  id: string;
  name: string;
  size: string;
  tag: string;
  type: 'pdf' | 'image' | 'doc';
  url?: string;
}

export interface AuditComment {
  id: string;
  author: string;
  role: string;
  avatar?: string;
  initials: string;
  time: string;
  text: string;
}

export interface Task {
  id: string;
  title: string;
  subtitle: string;
  workspace: string;
  subWorkspace: string;
  group: 'SEPTEMBER 2026' | 'OCTOBER 2026';
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  isDueToday?: boolean;
  isOverdue?: boolean;
  timeline: string;
  owner: User;
  doctorReviewer?: User & { statusNote?: string };
  medicalReviewStatus: string;
  commentsCount: number;
  scope?: string;
  targetKeywords?: string[];
  approvalFlow: {
    stage1: { title: string; status: 'completed' | 'in_progress' | 'pending'; note: string };
    stage2: { title: string; status: 'completed' | 'in_progress' | 'pending'; note: string };
    stage3: { title: string; status: 'completed' | 'in_progress' | 'pending'; note: string };
  };
  subtasks: Subtask[];
  assets: TaskAsset[];
  auditLogs: AuditComment[];
}

export interface OKRItem {
  id: string;
  title: string;
  status: 'ON TRACK' | 'AT RISK' | 'BEHIND';
  supportingOkr: string;
  progress: number;
  note: string;
  targetLabel: string;
  currentLabel: string;
  color: string;
}

export interface TeamMemberCapacity {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  initials: string;
  tasksCount: number;
  capacityPercent: number;
  statusLabel: string;
  colorClass: string;
  isOverloaded?: boolean;
  isDoctor?: boolean;
  avatarBg?: string;
}

export interface RoadblockAlert {
  id: string;
  title: string;
  description: string;
  type: 'campaign' | 'medical' | 'budget';
  actionLabel: string;
  badge: string;
}
