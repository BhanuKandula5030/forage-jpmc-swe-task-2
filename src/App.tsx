import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],
  showGraph: boolean, // Added the showGraph property to the state 
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      data: [],
      showGraph: false, //Initializing the showGRaph as False
    };
  }

  /**
   * Render Graph react component with state.data parse as property data
   */
  renderGraph() {
    // Rendering the showGraph based on the state
    return this.state.showGraph ? <Graph data={this.state.data} /> : null;
  }

  /**
   * Get new data from server and update the state with the new data
   */
  getDataFromServer() {
    //Using the setInterval to continously fetch the data from the server
    const intervalId = setInterval(() => {
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
        if (serverResponds.length === 0) {
          //Stopping the interval if server didn't return any data
          clearInterval(intervalId);
        } else {
          //Updating the state with new data
          this.setState({ data: [...this.state.data, ...serverResponds] });
        }
      });
    }, 100); 
  }
  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button
            className="btn btn-primary Stream-button"
            onClick={() => {
              this.getDataFromServer();
              this.setState({ showGraph: true }); // Showing the graph when button is clicked
            }}
          >
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
