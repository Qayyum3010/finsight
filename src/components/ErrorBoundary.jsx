import { Component } from 'react';
import { AlertTriangle } from 'lucide-react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Logged for local debugging; no external error-reporting service wired up (no backend in this project)
    console.error('Dashboard error boundary caught:', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center gap-md py-2xl px-lg text-center min-h-[400px]">
          <div className="w-12 h-12 rounded-full bg-error-container/30 flex items-center justify-center text-error">
            <AlertTriangle size={24} />
          </div>
          <h2 className="font-h3 text-h3 text-on-surface dark:text-on-surface-variant">
            Something went wrong
          </h2>
          <p className="font-body text-body text-on-surface-variant max-w-md">
            This part of the dashboard hit an unexpected error. Try reloading — your data is all
            local mock data, so nothing was lost.
          </p>
          <button
            onClick={this.handleReset}
            className="min-h-[44px] px-lg rounded-lg bg-primary text-on-primary font-label text-label hover:opacity-90 transition-opacity"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
