"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary3D extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#005792",
            fontFamily: "var(--font-poppins)",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h2>Oops! Terjadi kesalahan</h2>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: "10px 20px",
                background: "#005792",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                marginTop: "20px",
              }}
            >
              Reload Halaman
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
