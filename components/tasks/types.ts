export interface Task {
  id: string;
  title: string;
  description: string;
  scientificBenefit: string;
  hasCounter?: boolean;
  counterTarget?: number;
  counterUnit?: string;
}

export interface Category {
  title: string;
  description: string;
  color: string;
  tasks: Task[];
}

export interface TaskItemProps {
  task: Task;
  categoryColor: string;
} 