import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Spinner} from 'react-bootstrap';

class Grid extends React.Component {
  constructor() {
    super();

    this.changeSingleContent = this.changeSingleContent.bind(this);

    this.state = {
      constructedContent: [],
      intervalId: 0
    }
  }

  componentDidMount() {
    console.log("Grid component mounted!");
    console.log(this.props.contentArray);
    let initialContent = [];
    if (this.props.contentArray.length > 0) {
      // Add content
      for (let i=0; i < 9; i++) {
        let c = this.props.contentArray[Math.floor(Math.random() * (this.props.contentArray.length - 1))];
        console.log('pushed ' + c);
        initialContent.push(c);
      }

      // Replace one with a spinner
      let spinnerIndex = Math.floor(Math.random() * (initialContent.length-1));
      initialContent[spinnerIndex] = 'spinner';

      // Replace two with green content
      for (let i=0; i<2; i++) {
        let index = Math.floor(Math.random() * (initialContent.length-1));
        initialContent[index] = 'green';
      }

      // Set state
      this.setState({constructedContent: initialContent}, () => {
        console.log('Finished setting initial content.');
      });
    }

    let id = setInterval(() => {
      this.changeSingleContent();
    }, 1000);
    // Set up interval, every second change random bit of content
    this.setState({intervalId: id});
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  changeSingleContent() {
    let changedContent = this.state.constructedContent;
    let index = Math.floor(Math.random() * (changedContent.length-1));

    let chance = Math.floor(Math.random() * 7);
    if (chance < 5) {
      let newContentIndex = Math.floor(Math.random() * (this.props.contentArray.length-1));
      changedContent[index] = this.props.contentArray[newContentIndex];
    } else if (chance === 5) {
      changedContent[index] = 'spinner';
    } else if (chance === 6) {
      changedContent[index] = 'green';
    }

    this.setState({constructedContent: changedContent});
  }

  renderSingleContent(contentUrl) {
    if (contentUrl.endsWith('.jpg')) {
      console.log('Render ' + contentUrl);
      return(
        <img src={'/content/' + contentUrl}/>
      );
    } else if (contentUrl.endsWith('.mp4')) {
      return(
        <video autoPlay="autoplay" muted>
          <source src={'/content/' + contentUrl} type="video/mp4" />
        </video>
      );
    } else if (contentUrl === 'spinner') {
      return(
        <div className="spinner"><div className="spinner-inner"><Spinner animation="border" variant="light"></Spinner></div></div>
      );
    } else if (contentUrl === 'green') {
      return(
        <div className="green"></div>
      );
    } else {
      return(
        <div className="green"></div>
      );
    }
  }

  renderContent(content) {
    const numberOfRows = Math.ceil(content.length / 3);
    console.log('Number of rows: ' + numberOfRows);
    const key = 0;

    return(
      <div>
        {Array(numberOfRows).fill().map((_, rowIndex) => (
          <Row key={rowIndex}>
            {
              content.slice(rowIndex * 3, (rowIndex *3) + 3).map((singleContent, colKey) => (
                <Col key={colKey}>
                  {this.renderSingleContent(singleContent)}
                </Col>
              ))
            }
          </Row>
        ))}
      </div>

    );
  }

  render() {
    return(
      <div className="Grid">
        {this.renderContent(this.state.constructedContent)}
      </div>
    );
  }
}

Grid.propTypes = {
  contentArray: PropTypes.arrayOf(PropTypes.string),
}

export default Grid;
