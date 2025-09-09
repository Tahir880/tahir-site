'use client';
import React from 'react';

type Props = {children: React.ReactNode; name?: string};
type State = {error?: any};

export default class ErrorCatcher extends React.Component<Props, State> {
  state: State = {};
  static getDerivedStateFromError(error: any) {
    return {error};
  }
  componentDidCatch(error: any, info: any) {
    console.error(`[ErrorCatcher:${this.props.name ?? 'unknown'}]`, error, info?.componentStack);
  }
  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            border: '1px solid #333',
            padding: 12,
            borderRadius: 10,
            background: '#120f12',
            margin: '12px 0'
          }}
        >
          <div style={{fontWeight: 700, marginBottom: 6}}>
            Section crashed: {this.props.name ?? 'unknown'}
          </div>
          <pre style={{whiteSpace: 'pre-wrap', overflow: 'auto', margin: 0}}>
{String(this.state.error?.message || this.state.error)}
{'\n'}
{this.state.error?.stack || ''}
          </pre>
        </div>
      );
    }
    return this.props.children as any;
  }
}
