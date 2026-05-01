import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    // no-op, handled by UI fallback
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
          <div className="max-w-md bg-white border border-gray-200 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-900">Something went wrong</h2>
            <p className="text-sm text-gray-600 mt-2">
              Please refresh the page. If the issue persists, try again in a few minutes.
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
