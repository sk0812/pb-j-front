export interface ImpactCardProps {
  title: string;
  color: string;
  yourImpact: string;
  ourImpact: string;
  emoji: string;
}

export interface HeaderProps {
  onViewStreaks?: () => void;
} 