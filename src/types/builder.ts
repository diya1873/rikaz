export interface Section {
  id: string;
  type: string;
  name: string;
  content: Record<string, any>;
  styles?: Record<string, any>;
}

export interface SectionTemplate {
  id: string;
  type: string;
  name: string;
  description: string;
  icon: string;
  defaultContent: Record<string, any>;
  defaultStyles?: Record<string, any>;
  previewImage?: string;
}

export interface BuilderState {
  sections: Section[];
  selectedSectionId: string | null;
}

export interface BuilderConfig {
  title: string;
  description: string;
  sections: Section[];
  createdAt: string;
  updatedAt: string;
}