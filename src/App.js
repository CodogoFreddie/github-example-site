import React, {Component} from 'react';
import {Router} from '@reach/router';
import {ThemeProvider} from 'styled-components';

import Search from './Search';
import Details from './DetailedView';
import theme from './theme';

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Search path="/" />
          <Details path="/detail/:user/:repo" />
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
