import { toast as sonnerToast } from 'sonner'
import type { ReactNode, MouseEvent } from 'react'

type ToastVariant = 'default' | 'destructive'

interface ToastActionElement {
  altText: string
  className?: string
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  children: ReactNode
}

interface ToastProps {
  variant?: ToastVariant
  description: ReactNode
  action?: ReactNode
}

export function useToast() {
  return {
    toast: (props: ToastProps) => {
      const { description, action, variant } = props
      return sonnerToast(description as string, {
        ...(action ? { action } : {}),
        ...(variant === 'destructive' ? { className: 'destructive' } : {}),
      })
    },
  }
}
