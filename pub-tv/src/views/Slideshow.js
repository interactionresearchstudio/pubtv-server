import React from 'react';
import PropTypes from 'prop-types';
import logo from '../assets/logo.png';

class Slideshow extends React.Component {
  constructor() {
    super();

    this.cycleContent = this.cycleContent.bind(this);

    this.state = {
      constructedContent: [],
      contentIndex: 0,
      intervalId: 0
    };
  }

  componentDidMount() {
    let curatedContent = [];
    // Separate out content
    let photoContent = [];
    let videoContent = [];
    this.props.contentArray.forEach((singleContent) => {
      if (singleContent.endsWith('.mp4')) {
        videoContent.push(singleContent);
      } else if (singleContent.endsWith('.jpg')) {
        photoContent.push(singleContent);
      }
    });
    console.log('Video content: ');
    console.log(videoContent);
    console.log('Image content: ');
    console.log(photoContent);

    // Curate 10 transitions
    for (let i=0; i<10; i++) {
      // Decide if this is a video or a series of images
      // If it's a video, move on.
      // If it's an image, get first image. Then add the remaining 4, checking they all exist.
      let chance = Math.floor(Math.random() * 2);
      if (chance === 0) {
        // Video
        let i = Math.floor(Math.random() * (videoContent.length-1));
        if (videoContent[i]) {
          curatedContent.push(videoContent[i]);
        } else {
          console.log("WARNING: chose video but no videos were found!");
        }
      } else {
        // Photo
        let i = Math.floor(Math.random() * (photoContent.length-1));
        if (photoContent[i].includes('@')) {
          // Add the sequence of photos
          let basePhoto = photoContent[i].substr(0, photoContent[i].indexOf('@'));
          for (let j = 0; j < 5; j++) {
            let currentPhoto = basePhoto + '@' + j + '.jpg';
            if (photoContent.includes(currentPhoto)) {
              curatedContent.push(currentPhoto);
            }
          }
        }
        else {
          curatedContent.push(photoContent[i]);
        }
      }
    }
    this.setState({constructedContent: curatedContent}, () => {
      console.log(this.state.constructedContent);
      this.cycleContent();
    });
  }

  componentWillUnmount() {
    clearTimeout(this.state.intervalId);
  }

  cycleContent() {
    let currentUrl = this.state.constructedContent[this.state.contentIndex];
    let timeoutId = 0;
    console.log('Current URL: ' + currentUrl);
    if (currentUrl.endsWith('.jpg')) {
      console.log('Current URL is an image.');
      if (currentUrl.includes('@')) {
        timeoutId = setTimeout(() => {
          if (this.state.contentIndex >= this.state.constructedContent.length - 1) {
            this.setState({
              contentIndex: 0,
              intervalId: timeoutId
            }, () => {
              console.log('End slideshow!');
              this.props.onSlideshowEnd();
            });
          } else {
            this.setState({
              contentIndex: this.state.contentIndex+1,
              intervalId: timeoutId
            }, () => {
              console.log('Cycling content...');
              this.cycleContent();
            });
          }
        }, 2000);
      } else {
        timeoutId = setTimeout(() => {
          if (this.state.contentIndex >= this.state.constructedContent.length - 1) {
            this.setState({
              contentIndex: 0,
              intervalId: timeoutId
            }, () => {
              console.log('End slideshow!');
              this.props.onSlideshowEnd();
            });
          } else {
            this.setState({
              contentIndex: this.state.contentIndex+1,
              intervalId: timeoutId
            }, () => {
              console.log('Cycling content...');
              this.cycleContent();
            });
          }
        }, 5000);
      }
    } else if (currentUrl.endsWith('.mp4')) {
      timeoutId = setTimeout(() => {
        if (this.state.contentIndex >= this.state.constructedContent.length - 1) {
          this.setState({contentIndex: 0}, () => {
            this.props.onSlideshowEnd();
          });
        } else {
          this.setState({
            contentIndex: this.state.contentIndex+1,
            intervalId: timeoutId
          }, () => {
            this.cycleContent();
          });
        }
      }, 15000);
      this.setState({intervalId: timeoutId});
    }
  }

  renderContent(currentUrl) {
    if (currentUrl) {
      if (currentUrl.endsWith('.jpg')) {
        return(
          <img src={"/content/" + currentUrl}/>
        );
      } else if (currentUrl.endsWith('.mp4')) {
        return(
          <video autoPlay="autoplay" muted>
            <source src={'/content/' + currentUrl} type="video/mp4" />
          </video>
        )
      }
    }
  }

  render() {
    return(
      <div className="Slideshow">
        {this.renderContent(this.state.constructedContent[this.state.contentIndex])}
        <img className="logo" src={logo}/>
      </div>
    );
  }
}

Slideshow.propTypes = {
  contentArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSlideshowEnd: PropTypes.func.isRequired
};

export default Slideshow;
