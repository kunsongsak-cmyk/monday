import { Task, OKRItem, TeamMemberCapacity, RoadblockAlert, User } from '../types';

export const CURRENT_USER: User = {
  id: 'user-bank',
  name: 'Bank',
  role: 'Product Lead',
  badge: 'PM',
  initials: 'B',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuSNGo21k-kA1LKoOdTk0dK1pXlTvg2X7iAYhf5gfUrgEc7BK9ecx2WwD_RMjYK1t2_YKWdEcLxEYC6Wq28xA-jxoFeT96RcLJF26rTfYhj-ivyL4RDQgC5px7gceSq3R3qiAPj-WgTpiJc_KRMsJdfpY7BlcH3Wg5hxwSa_osgKJrrMbp8I3Mejw0fTFyBU053Lsx2WVBMG1qazVOQhLAP-hS3b3S5RX_1GKM42XZTw935dqJ2jWANA'
};

export const DR_KORN: User = {
  id: 'user-korn',
  name: 'Dr. Korn',
  role: 'Medical Advisor / Dermatologist',
  badge: 'MD',
  initials: 'K',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3NBjdOkJoGLQ_6uWOrS9seI0w6jZoeiP1q5IH0nMho7sbYSbMJ4npTLgtjxvHhg-z-Nbd276Xx2mo5q4DmOkrm_rlME_5a_5xcuafP3xZ1-ppM5cdt9P2-rEiHBC5pYIUF5aJCty-v_uQhcrn0XuWMx7i7MntPks_kQdjBKfYE8zxAKGj0z-B8OeswtLX0JLJir5uGSzbz24Iz0fM3DhVDt0iSEXrHNq7uxsm9OwW8zZJ4-7GRM2ecQ'
};

export const MAY_WRITER: User = {
  id: 'user-may',
  name: 'May',
  role: 'Medical Writer',
  badge: 'MW',
  initials: 'M',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQOfbIUpR7Io4VqDLVbZsvi2xfSLXq_kui-LNHkyHnZ9paq4sl9vHErmXgbTFHM0Sfq4njCcK96H6sz8-cilHK99zoXx5h9SxkM7WKYmYt0DCB0uEg9LHOy-Q8jXB_5WroAnTEDSts6BbjRF4N6nq-mT-YW7qWUlC7854Hm4nXLHGH7PmEuSN6sGokzjCW4SSh71-2DAUq9xhluYBaXV_kOQDbHb17R6vBIejWnklF9yOQL4oUe63AEA'
};

export const BEAM_MEDIA: User = {
  id: 'user-beam',
  name: 'Beam',
  role: 'Art & Media Lead',
  badge: 'AM',
  initials: 'B'
};

export const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1842',
    title: 'Vitaran Under Eye Article',
    subtitle: 'Polynucleotide injection clinical copy review',
    workspace: 'Marketing',
    subWorkspace: 'SEO Content',
    group: 'SEPTEMBER 2026',
    priority: 'HIGH',
    status: 'Working',
    dueDate: 'Sep 25 (Today)',
    isDueToday: true,
    timeline: 'Sep 22 → Sep 25',
    owner: CURRENT_USER,
    doctorReviewer: {
      ...DR_KORN,
      statusNote: 'Dr. Korn Pending'
    },
    medicalReviewStatus: 'Dr. Korn Pending',
    commentsCount: 4,
    scope: 'Draft comprehensive SEO article targeting high-intent keywords: ฟิลเลอร์ใต้ตา Vitaran, PN polynucleotide under eye review. Highlight clinic clinical case studies, injection safety standards, certified practitioners, and comparative analysis versus standard hyaluronic acid dermal fillers.',
    targetKeywords: ['ฟิลเลอร์ใต้ตา Vitaran', 'PN polynucleotide under eye review', 'คลินิกความงาม อโศก', 'Polynucleotide meso'],
    approvalFlow: {
      stage1: { title: 'Content Draft', status: 'completed', note: 'Approved by May' },
      stage2: { title: 'Medical Review', status: 'in_progress', note: 'In Review with Dr. Korn' },
      stage3: { title: 'CMO Sign-off', status: 'pending', note: 'Pending' }
    },
    subtasks: [
      { id: 'sub-1', title: 'Keyword research & SERP intent analysis', completed: true, owner: 'Bank' },
      { id: 'sub-2', title: 'First draft medical copy written', completed: true, owner: 'May' },
      { id: 'sub-3', title: 'Medical & Doctor protocol clinical verification', completed: false, owner: 'Dr. Korn', isDoctor: true },
      { id: 'sub-4', title: 'Final graphic artwork layout & website publish', completed: false, owner: 'Beam' }
    ],
    assets: [
      { id: 'asset-1', name: 'Vitaran-clinical-study-2026.pdf', size: '2.4 MB', tag: 'Certified', type: 'pdf' },
      { id: 'asset-2', name: 'hero-vitaran-before-after.jpg', size: '1.1 MB', tag: 'High-res', type: 'image' }
    ],
    auditLogs: [
      {
        id: 'log-1',
        author: 'May (Medical Writer)',
        role: 'Medical Writer',
        avatar: MAY_WRITER.avatar,
        initials: 'M',
        time: '10:24 AM',
        text: "Draft completed and cross-referenced with Dr. Korn's clinical notes. Please inspect section 4 on injection safety depth."
      },
      {
        id: 'log-2',
        author: 'Bank (Product Lead)',
        role: 'Product Lead',
        avatar: CURRENT_USER.avatar,
        initials: 'B',
        time: '11:02 AM',
        text: '@May updated keyword density and added direct call-to-action booking links to the Under Eye Treatment scheduling funnel.'
      }
    ]
  },
  {
    id: 'task-1843',
    title: 'Approve RedTouch Campaign Artwork',
    subtitle: 'Key visual banners for collagen photofacials',
    workspace: 'Marketing',
    subWorkspace: 'Marketing Campaign',
    group: 'SEPTEMBER 2026',
    priority: 'URGENT',
    status: 'Waiting Approval',
    dueDate: 'Due Today',
    isDueToday: true,
    timeline: 'Sep 20 → Sep 24',
    owner: BEAM_MEDIA,
    doctorReviewer: {
      ...DR_KORN,
      statusNote: 'CMO Sign-off Required'
    },
    medicalReviewStatus: 'CMO Sign-off',
    commentsCount: 5,
    scope: 'Generate and review high-resolution key visuals targeting CBD luxury demographic. Ensure RedTouch laser wavelength (675 nm) sub-copy is medically compliant.',
    targetKeywords: ['RedTouch Laser', 'Collagen laser Bangkok', 'Reva Laser Suite'],
    approvalFlow: {
      stage1: { title: 'Asset Design', status: 'completed', note: 'Beam finalized v2.4' },
      stage2: { title: 'Medical Review', status: 'completed', note: 'Dr. Korn approved wavelength claims' },
      stage3: { title: 'CMO Sign-off', status: 'in_progress', note: 'Pending budget approval' }
    },
    subtasks: [
      { id: 'sub-201', title: 'Export 9:16 and 1:1 format cuts', completed: true, owner: 'Beam' },
      { id: 'sub-202', title: 'Verify FDA certification watermark', completed: true, owner: 'Dr. Korn', isDoctor: true },
      { id: 'sub-203', title: 'CMO final asset sign-off', completed: false, owner: 'Bank' }
    ],
    assets: [
      { id: 'asset-21', name: 'redtouch-pro-kv-v2.4.jpg', size: '4.8 MB', tag: 'High-res', type: 'image' }
    ],
    auditLogs: [
      {
        id: 'log-21',
        author: 'Beam (Art & Media)',
        role: 'Art & Media',
        initials: 'B',
        time: '09:15 AM',
        text: 'Uploaded v2.4 reflecting the adjusted skin radiance highlight tones.'
      }
    ]
  },
  {
    id: 'task-1844',
    title: 'Review Influencer Brief (Sylfirm X)',
    subtitle: 'Micro-needle RF patient selection guidelines',
    workspace: 'Marketing',
    subWorkspace: 'Campaign',
    group: 'SEPTEMBER 2026',
    priority: 'MEDIUM',
    status: 'Review',
    dueDate: 'Tomorrow (Sep 25)',
    timeline: 'Sep 21 → Sep 25',
    owner: CURRENT_USER,
    doctorReviewer: {
      ...DR_KORN,
      statusNote: 'Dr. Korn Review'
    },
    medicalReviewStatus: 'Dr. Korn Review',
    commentsCount: 3,
    scope: 'Clinical briefing doc for 5 beauty KOLs attending Sylfirm X live demonstration at HQ.',
    targetKeywords: ['Sylfirm X RF', 'Melasma treatment Bangkok'],
    approvalFlow: {
      stage1: { title: 'Brief Outline', status: 'completed', note: 'Completed by Bank' },
      stage2: { title: 'Contraindications Check', status: 'in_progress', note: 'Awaiting Dr. Korn sign-off' },
      stage3: { title: 'KOL Agency Dispatch', status: 'pending', note: 'Pending' }
    },
    subtasks: [
      { id: 'sub-301', title: 'Outline downtime guidelines (24 hrs)', completed: true, owner: 'Bank' },
      { id: 'sub-302', title: 'Add doctor quotation on dual-wave RF', completed: false, owner: 'Dr. Korn', isDoctor: true }
    ],
    assets: [],
    auditLogs: []
  },
  {
    id: 'task-1845',
    title: 'CRM Follow-up SOP Revision',
    subtitle: 'Day 3 & Day 14 post-treatment protocol alignment',
    workspace: 'Sales',
    subWorkspace: 'Sales Operations',
    group: 'SEPTEMBER 2026',
    priority: 'HIGH',
    status: 'Blocked',
    dueDate: 'Overdue (Sep 22)',
    isOverdue: true,
    timeline: 'Sep 18 → Sep 22',
    owner: CURRENT_USER,
    doctorReviewer: {
      ...DR_KORN,
      statusNote: 'Protocol Update Required'
    },
    medicalReviewStatus: 'Blocked by Staffing',
    commentsCount: 6,
    scope: 'Revise CRM LINE automated messages for post-laser erythema triage and Day 14 hydration follow-up checklist.',
    approvalFlow: {
      stage1: { title: 'Draft Protocol', status: 'completed', note: 'Finished' },
      stage2: { title: 'Clinic Lead Sign-off', status: 'in_progress', note: 'Blocked on Branch 2 & 3 feedback' },
      stage3: { title: 'LINE OA Deployment', status: 'pending', note: 'Pending' }
    },
    subtasks: [
      { id: 'sub-401', title: 'Compile branch nurse feedback', completed: true, owner: 'Bank' },
      { id: 'sub-402', title: 'Update automated triage template in CRM', completed: false, owner: 'Bank' }
    ],
    assets: [],
    auditLogs: []
  },
  {
    id: 'task-1846',
    title: 'PN Update 2026 Clinical Protocol',
    subtitle: 'Cross-brand injection depth comparison & storage specs',
    workspace: 'Marketing',
    subWorkspace: 'SEO Content',
    group: 'SEPTEMBER 2026',
    priority: 'MEDIUM',
    status: 'Review',
    dueDate: 'Sep 27',
    timeline: 'Sep 23 → Sep 27',
    owner: MAY_WRITER,
    doctorReviewer: {
      id: 'dr-praew',
      name: 'Dr. Praew',
      role: 'Clinical Lead',
      initials: 'P',
      badge: 'MD',
      statusNote: 'Dr. Praew OK'
    },
    medicalReviewStatus: 'Dr. Praew OK',
    commentsCount: 2,
    scope: 'Update clinical guide on Polynucleotide cold chain storage and needle gauge best practices.',
    approvalFlow: {
      stage1: { title: 'Draft', status: 'completed', note: 'May' },
      stage2: { title: 'Review', status: 'completed', note: 'Dr. Praew verified' },
      stage3: { title: 'Final Publish', status: 'in_progress', note: 'Layouting' }
    },
    subtasks: [
      { id: 'sub-501', title: 'Cold-chain storage temperature data', completed: true, owner: 'May' },
      { id: 'sub-502', title: 'Doctor approval signature', completed: true, owner: 'Dr. Praew', isDoctor: true }
    ],
    assets: [],
    auditLogs: []
  },
  {
    id: 'task-1847',
    title: 'RedTouch Pores & Skin Rejuvenation',
    subtitle: 'Clinical before-after study publication & social cut',
    workspace: 'Marketing',
    subWorkspace: 'SEO Content',
    group: 'SEPTEMBER 2026',
    priority: 'LOW',
    status: 'Done',
    dueDate: 'Sep 22',
    timeline: 'Sep 15 → Sep 22',
    owner: BEAM_MEDIA,
    medicalReviewStatus: 'Completed',
    commentsCount: 1,
    approvalFlow: {
      stage1: { title: 'Draft', status: 'completed', note: 'Complete' },
      stage2: { title: 'Medical Approval', status: 'completed', note: 'Complete' },
      stage3: { title: 'Live on Site', status: 'completed', note: 'Indexed by Google' }
    },
    subtasks: [
      { id: 'sub-601', title: 'Publish article', completed: true, owner: 'Beam' }
    ],
    assets: [],
    auditLogs: []
  },
  {
    id: 'task-1848',
    title: 'Ulthera Prime vs LinearFirm HIFU',
    subtitle: 'Comparative lifting energy depth & patient pain-scale review',
    workspace: 'Marketing',
    subWorkspace: 'SEO Content',
    group: 'SEPTEMBER 2026',
    priority: 'HIGH',
    status: 'Waiting Approval',
    dueDate: 'Sep 30',
    timeline: 'Sep 24 → Sep 30',
    owner: CURRENT_USER,
    medicalReviewStatus: 'Waiting Content',
    commentsCount: 3,
    approvalFlow: {
      stage1: { title: 'Technical Spec Comparison', status: 'completed', note: 'Done' },
      stage2: { title: 'Doctor Review', status: 'in_progress', note: 'Pending' },
      stage3: { title: 'Approval', status: 'pending', note: 'Pending' }
    },
    subtasks: [
      { id: 'sub-701', title: 'Compile transducer energy specs', completed: true, owner: 'Bank' },
      { id: 'sub-702', title: 'Verify transducer pricing comparison', completed: false, owner: 'Bank' }
    ],
    assets: [],
    auditLogs: []
  },
  {
    id: 'task-1849',
    title: 'Exosome Hair Restoration SEO Guide',
    subtitle: 'Follicular activation clinical efficacy writeup',
    workspace: 'Marketing',
    subWorkspace: 'SEO Content',
    group: 'OCTOBER 2026',
    priority: 'MEDIUM',
    status: 'Not Started',
    dueDate: 'Oct 04',
    timeline: 'Oct 01 → Oct 04',
    owner: MAY_WRITER,
    medicalReviewStatus: 'Unassigned',
    commentsCount: 0,
    approvalFlow: {
      stage1: { title: 'Draft', status: 'pending', note: 'Not started' },
      stage2: { title: 'Medical Review', status: 'pending', note: 'Pending' },
      stage3: { title: 'Publish', status: 'pending', note: 'Pending' }
    },
    subtasks: [
      { id: 'sub-801', title: 'Review ASCE+ laboratory trial paper', completed: false, owner: 'May' }
    ],
    assets: [],
    auditLogs: []
  },
  {
    id: 'task-1850',
    title: 'Potenza RF Microneedling Case Study',
    subtitle: 'Acne scar subcision combined treatment protocols',
    workspace: 'Marketing',
    subWorkspace: 'SEO Content',
    group: 'OCTOBER 2026',
    priority: 'HIGH',
    status: 'Working',
    dueDate: 'Oct 08',
    timeline: 'Oct 02 → Oct 08',
    owner: BEAM_MEDIA,
    medicalReviewStatus: 'Dr. Korn Assigned',
    commentsCount: 1,
    approvalFlow: {
      stage1: { title: 'Photo Selection', status: 'completed', note: 'Patient consent signed' },
      stage2: { title: 'Medical Review', status: 'in_progress', note: 'Dr. Korn evaluating depth parameters' },
      stage3: { title: 'Publish', status: 'pending', note: 'Pending' }
    },
    subtasks: [
      { id: 'sub-901', title: 'Filter 4-week follow up photography', completed: true, owner: 'Beam' },
      { id: 'sub-902', title: 'Verify needle insertion depth clinical records', completed: false, owner: 'Dr. Korn', isDoctor: true }
    ],
    assets: [],
    auditLogs: []
  }
];

export const INITIAL_OKRS: OKRItem[] = [
  {
    id: 'okr-1',
    title: 'SEO Content Expansion',
    status: 'ON TRACK',
    supportingOkr: 'Organic Traffic +45%',
    progress: 82,
    note: '41 Published',
    targetLabel: 'Target: 50 Articles',
    currentLabel: '41 Published',
    color: '#006a61'
  },
  {
    id: 'okr-2',
    title: 'September Campaign Launch',
    status: 'AT RISK',
    supportingOkr: 'New Patients +30%',
    progress: 61,
    note: 'Delayed by ad approval',
    targetLabel: 'Target: 250 Inquiries',
    currentLabel: 'Delayed by ad approval',
    color: '#ba1a1a'
  },
  {
    id: 'okr-3',
    title: 'New Website & Booking Engine',
    status: 'ON TRACK',
    supportingOkr: 'Direct Bookings ฿12M',
    progress: 92,
    note: 'Final QA & Stripe Checkouts',
    targetLabel: 'Launch: Sep 28',
    currentLabel: 'Final QA & Stripe Checkouts',
    color: '#006a61'
  },
  {
    id: 'okr-4',
    title: 'Clinic Operations SOP Upgrade',
    status: 'AT RISK',
    supportingOkr: 'Repeat Visit Rate 65%',
    progress: 44,
    note: 'Staff Training Stage 2',
    targetLabel: 'Target: 9 Clinics',
    currentLabel: 'Staff Training Stage 2',
    color: '#76777d'
  }
];

export const INITIAL_TEAM: TeamMemberCapacity[] = [
  {
    id: 'team-bank',
    name: 'Bank',
    role: 'Lead PM',
    avatar: CURRENT_USER.avatar,
    initials: 'B',
    tasksCount: 10,
    capacityPercent: 82,
    statusLabel: '82% (Normal)',
    colorClass: 'bg-[#006a61]'
  },
  {
    id: 'team-may',
    name: 'May',
    role: 'Medical Content',
    initials: 'M',
    avatarBg: 'bg-[#89f5e7] text-[#00201d]',
    tasksCount: 6,
    capacityPercent: 55,
    statusLabel: '55% (Optimal)',
    colorClass: 'bg-[#006f66]'
  },
  {
    id: 'team-beam',
    name: 'Beam',
    role: 'Art & Media',
    initials: 'B',
    avatarBg: 'bg-[#ba1a1a] text-white',
    tasksCount: 12,
    capacityPercent: 98,
    statusLabel: '98% (Overloaded)',
    colorClass: 'bg-[#ba1a1a]',
    isOverloaded: true
  },
  {
    id: 'team-korn',
    name: 'Dr. Korn',
    role: 'Medical Advisor',
    initials: 'K',
    avatarBg: 'bg-[#e1e0ff] text-[#07006c]',
    tasksCount: 4,
    capacityPercent: 35,
    statusLabel: '35% Capacity',
    colorClass: 'bg-[#c6c6cd]',
    isDoctor: true
  }
];

export const INITIAL_ROADBLOCKS: RoadblockAlert[] = [
  {
    id: 'rb-1',
    title: '3 Overdue tasks in Marketing Campaign',
    description: 'Blocking paid ad launch & Meta Pixel budget deployment',
    type: 'campaign',
    actionLabel: 'Resolve',
    badge: '3 Critical Roadblocks'
  },
  {
    id: 'rb-2',
    title: '2 Tasks waiting Dr. Korn medical approval > 48 hrs',
    description: 'Sylfirm X and Vitaran clinical efficacy statement verification',
    type: 'medical',
    actionLabel: 'Nudge Doctor',
    badge: '48h SLA breach'
  },
  {
    id: 'rb-3',
    title: '1 Budget sign-off pending CMO review',
    description: '฿300,000 Meta Ads allocation for Q4 Laser aesthetic launch',
    type: 'budget',
    actionLabel: 'Review',
    badge: 'Budget sign-off'
  }
];
