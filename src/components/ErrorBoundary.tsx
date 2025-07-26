import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4 text-coral-warm">
              Something went wrong
            </h2>
            <p className="text-gray-300 mb-6">
              The Pacific Future game encountered an unexpected error.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-[#003f7f] text-white rounded-lg hover:bg-[#0056b3] transition-colors"
            >
              Reload Game
            </button>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-4 text-left text-xs text-gray-400">
                <summary>Error Details (Dev Mode)</summary>
                <pre className="mt-2 overflow-auto">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;