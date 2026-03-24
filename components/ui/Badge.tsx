interface BadgeProps {
  text: string
  variant?: 'easy' | 'medium' | 'hard' | 'default'
}

const variantStyles: Record<string, string> = {
  easy: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  medium: 'bg-amber-100 text-amber-700 border-amber-200',
  hard: 'bg-red-100 text-red-700 border-red-200',
  default: 'bg-slate-100 text-slate-700 border-slate-200',
}

export default function Badge({ text, variant = 'default' }: BadgeProps) {
  const style = variantStyles[variant] || variantStyles.default

  return (
    <span className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold ${style}`}>
      {text}
    </span>
  )
}

export function getDifficultyVariant(difficulty: string): BadgeProps['variant'] {
  const map: Record<string, BadgeProps['variant']> = {
    'Dễ': 'easy',
    'Trung bình': 'medium',
    'Khó': 'hard',
  }
  return map[difficulty] || 'default'
}
