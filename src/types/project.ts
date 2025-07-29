// 프로젝트에서 사용하는 타입 정의

export type TabType =
  | "소개"
  | "팀 구성"
  | "주요 기능"
  | "담당 역할"
  | "성능 최적화"
  | "문제 해결 사례"
  | "회고"
  | "UI";

export interface TeamMember {
  name: string;
  role: string;
}

export interface Contribution {
  title: string;
  details: string[];
}

export interface Reflection {
  title: string;
  details: string[];
}

export interface Project {
  id: string;
  title: string;
  period: string;
  description: string;
  longDescription: string;
  role: string;
  github: string;
  liveDemo?: string;
  technologies: string[];
  features: string[];
  challenges: string;
  lessons: string;
  team: TeamMember[];
  myContributions: Contribution[];
  reflections: Reflection[];
  thumbnail: string;
}
