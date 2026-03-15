import { AlertCircle } from 'lucide-react';

export default function BlogError({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <AlertCircle className="w-10 h-10 text-[var(--muted-2)] mb-4" />
      <p className="text-[15px] font-medium text-[var(--ink)] mb-2">Something went wrong</p>
      <p className="text-[13px] text-[var(--muted)] mb-6 max-w-sm">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="btn btn-secondary text-[12px]"
        >
          Try again
        </button>
      )}
    </div>
  );
}
