import React from 'react';
import PropTypes from 'prop-types';
import introVideo from '../assets/NatureScenes_TV.m4v';

class Intro extends React.Component {
  render() {
    return (
      <div className="Intro">
        <video autoPlay="autoplay" muted onEnded={this.props.onIntroEnded}>
          <source src={introVideo} type="video/mp4" />
        </video>
      </div>
    );
  }
}

Intro.propTypes = {
  onIntroEnded: PropTypes.func.isRequired
};

export default Intro;
