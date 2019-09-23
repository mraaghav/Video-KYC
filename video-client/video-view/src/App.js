import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CssBaseline from "@material-ui/core/CssBaseline";

import VideoComponent from './VideoComponent';
import './App.css';

class App extends React.Component {
  render() {
    return (
        <div className="App">
          <MuiThemeProvider>
            <CssBaseline>
              <VideoComponent />
              </CssBaseline>
          </MuiThemeProvider>
        </div>
      );
    }
}

export default App;
