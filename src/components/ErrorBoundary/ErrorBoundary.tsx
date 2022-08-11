import { Component, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  name?: string;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public render() {
    if (this.state.hasError) {
      return (
        <>
          <h1>
            Sorry.. there was an error in{" "}
            <span className="errorBoundary-Text"> {this.props.name} Page, </span> <br /> Please try
            After some time
          </h1>
          <img src="./img/404.webp" className="errorBoundary-Image" alt="404 error message" />
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
