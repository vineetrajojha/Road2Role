// components/ui/GlowButton.tsx
import { cn } from '@/lib/utils'

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

export function GlowButton({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children,
  ...props 
}: GlowButtonProps) {
  return (
    <button
      className={cn(
        'relative inline-flex items-center gap-2 rounded-full font-medium transition-all duration-300',
        'before:absolute before:inset-0 before:rounded-full before:transition-opacity before:duration-300',
        variant === 'primary' && [
          'bg-[var(--blue-vivid)] text-white',
          'hover:bg-[var(--blue-glow)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]',
          'active:scale-[0.97]',
        ],
        variant === 'ghost' && [
          'border border-[var(--border-default)] text-[var(--text-secondary)]',
          'hover:border-[var(--blue-vivid)] hover:text-[var(--text-primary)]',
          'hover:bg-[var(--blue-subtle)]',
        ],
        size === 'sm' && 'px-4 py-2 text-sm',
        size === 'md' && 'px-6 py-3 text-base',
        size === 'lg' && 'px-8 py-4 text-lg',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
