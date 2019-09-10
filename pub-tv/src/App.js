import React from 'react';
import axios from 'axios';
import './App.css';
import Intro from './views/Intro';
import Grid from './views/Grid';
import Slideshow from './views/Slideshow';

class App extends React.Component {
  constructor() {
    super();

    this.onIntroEnded = this.onIntroEnded.bind(this);
    this.onGridTimeout = this.onGridTimeout.bind(this);
    this.onSlideshowTimeout = this.onSlideshowTimeout.bind(this);

    this.state = {
      mode: 0,
      gridContent: []
    };
  }


  onIntroEnded() {
    if (this.state.mode === 0) {
      axios.get('/api/content')
        .then(res => {
          this.setState({gridContent: res.data, mode: 1}, () => {
            setTimeout(() => {
              this.onGridTimeout();
            }, 20000);
          });
        });
    }
  }

  onGridTimeout() {
    if (this.state.mode === 1) {
      this.setState({mode: 2});
    }
  }

  onSlideshowTimeout() {
    if (this.state.mode === 2) {
      this.setState({mode: 0});
    }
  }

  renderView() {
    if (this.state.mode === 0) {
      return <Intro onIntroEnded={this.onIntroEnded}/>
    } else if (this.state.mode === 1) {
      return <Grid contentArray={this.state.gridContent}/>
    } else if (this.state.mode === 2) {
      return <Slideshow contentArray={this.state.gridContent} onSlideshowEnd={this.onSlideshowTimeout}/>
    }
  }

  render() {
    return (
      <div className="App">
        <div className="AppContainer">
          {this.renderView()}
        </div>
      </div>
    );
  }
}

export default App;
