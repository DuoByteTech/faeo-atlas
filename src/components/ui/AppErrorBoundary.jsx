import { Component } from 'react';
export class AppErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error('Faeo Atlas:', error, info);
  }
  render() {
    if (this.state.hasError)
      return (
        <main className="empty-state">
          <h1>Sayfa yüklenemedi</h1>
          <p>Geçici bir sorun oluştu. Sayfayı yeniden yükleyebilirsin.</p>
          <button
            className="app-button app-button--primary"
            onClick={() => window.location.reload()}
          >
            Yeniden dene
          </button>
        </main>
      );
    return this.props.children;
  }
}
