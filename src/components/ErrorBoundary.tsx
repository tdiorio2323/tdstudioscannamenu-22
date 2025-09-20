import * as React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; resetErrorBoundary: () => void }>;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

const logErrorToService = (error: Error, errorInfo: React.ErrorInfo) => {
  // In development, log to console
  if (import.meta.env.DEV) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  // In production, you could send to an error tracking service
  // Example: Sentry, LogRocket, etc.
};

const DefaultFallback: React.FC<{ error: Error; resetErrorBoundary: () => void }> = ({
  error,
  resetErrorBoundary
}) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
    <div className="max-w-md mx-auto text-center p-8 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
      <p className="text-white/80 mb-6">
        An unexpected error occurred. Please try refreshing the page.
      </p>
      {import.meta.env.DEV && (
        <details className="text-left mb-4">
          <summary className="cursor-pointer text-white/60 text-sm">Error details</summary>
          <pre className="text-xs text-red-300 mt-2 p-2 bg-black/20 rounded overflow-auto">
            {error.message}
          </pre>
        </details>
      )}
      <button
        onClick={resetErrorBoundary}
        className="px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
      >
        Try again
      </button>
    </div>
  </div>
);

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logErrorToService(error, errorInfo);
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      const Fallback = this.props.fallback || DefaultFallback;
      return <Fallback error={this.state.error} resetErrorBoundary={this.resetErrorBoundary} />;
    }

    return this.props.children;
  }
}