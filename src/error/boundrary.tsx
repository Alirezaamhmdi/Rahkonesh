import React from "react";

class ErrorBoundary extends React.Component {
    state = {
      hasError : false
    }
    children = ''
    constructor(props : React.Component) {
      super(props);
      this.state = { hasError: false };
      
    }
  
    static getDerivedStateFromError(error : Error) {
      console.log(error)
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
      console.log(error , info )

      this.setState({ hasError: true })
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return(<div>
          <h2>HAS ERROR : </h2>
          <h6>please wait or refresh the page</h6>
        </div>)
      }
  
      return this.children ;
    }
  }
  export default ErrorBoundary;