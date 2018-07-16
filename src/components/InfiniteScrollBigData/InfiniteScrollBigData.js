import React, { Component } from 'react';
import PropTypes from 'prop-types';
import lodashThrottle from 'lodash/throttle';
import styles from './InfiniteScrollBigData.scss';


// export supported variable parameters
export const INTERVAL_SECONDS_20 = 20;
export const INTERVAL_SECONDS_HOUR = 60 * 60;

// constants
const TS_START = 1500348260;
const TS_END = 1503031520;
const ITEMS_PER_ROW_DESKTOP = 3;
const IMG_HEIGHT_PX = 168;
const IMG_MARGIN_PX = 5;
const ROW_HEIGHT_PX = IMG_HEIGHT_PX + IMG_MARGIN_PX * 2;

// shows start and end row index
const DEBUG = false;

class InfiniteScrollBigData extends Component {
  static propTypes = {
    intervalSeconds: PropTypes.number.isRequired,
  }

  constructor( props ) {
    super(props);
    this.state = {
      startRowIndex: null,
      endRowIndex: null,
      rows: null,
    };
    this.rangeTS = ( TS_END - TS_START ) / props.intervalSeconds;
    this.maxRows = Math.ceil( this.rangeTS / 3 );
    this.containerHeight = this.maxRows * ROW_HEIGHT_PX;

    // calculate `rangeLengthPercentage` such that total # of DOM nodes is kept small, less than 20
    let rangePercent = 0.10;
    let numRows = (this.rangeTS * rangePercent) / 3;
    while ( numRows > 20 ) {
      rangePercent = rangePercent / 2; // eslint-disable-line
      numRows = (this.rangeTS * rangePercent) / 3;
    }
    this.rangeLengthPercentage = rangePercent;
  }

  componentDidMount() {
    this.throttledScroll = lodashThrottle(this.handleWindowScroll, 100);
    window.addEventListener('scroll', this.throttledScroll);
    this.handleWindowScroll();
  }

  componentWillUnmount() {
    if ( this.throttledScroll ) {
      window.removeEventListener('scroll', this.throttledScroll);
    }
  }

  getRowRange = ( offsetTopPercentage ) => {
    // Get item range
    let startItemIndex = Math.floor( this.rangeTS * offsetTopPercentage);
    let endItemIndex = Math.floor( this.rangeTS * (offsetTopPercentage + this.rangeLengthPercentage) );
    const itemRange = endItemIndex - startItemIndex;

    const startItemIndexNormalized = Math.floor(startItemIndex - (itemRange / 2));
    startItemIndex = Math.max(startItemIndexNormalized, 0);
    const endItemIndexNormalized = Math.floor(endItemIndex - (itemRange / 2));
    endItemIndex = Math.max(endItemIndexNormalized, 0);

    // At the start, our normalized startItemIndex is negative.
    // Add the negative difference to our endIndex, to maintain a consistent range
    if ( startItemIndexNormalized < 0 ) {
      endItemIndex += Math.abs(startItemIndexNormalized);
    }

    // At the end, ensure our end does not exceed the max value
    if ( endItemIndex >= this.rangeTS ) {
      endItemIndex = this.rangeTS;
    }

    // Get row range
    const startRowIndex = (startItemIndex - (startItemIndex % ITEMS_PER_ROW_DESKTOP)) / ITEMS_PER_ROW_DESKTOP;
    const endRowIndex = (endItemIndex - (endItemIndex % ITEMS_PER_ROW_DESKTOP)) / ITEMS_PER_ROW_DESKTOP;
    return [ startRowIndex, endRowIndex ];
  }

  handleWindowScroll = () => {
    const { intervalSeconds } = this.props;
    const htmlNode = document.body.parentNode;

    // scrollbar hasn't loaded yet
    if ( (htmlNode.scrollHeight - htmlNode.clientHeight) === 0 ) return;

    const offsetTopPercentage = (htmlNode.scrollTop) / (htmlNode.scrollHeight - htmlNode.clientHeight );
    const [ startRowIndex, endRowIndex ] = this.getRowRange(offsetTopPercentage);

    const rowIndexesChanged = (
      startRowIndex !== this.state.startRowIndex ||
      endRowIndex !== this.state.endRowIndex
    );
    if ( rowIndexesChanged ) {
      const timeStampOffset = TS_START + (startRowIndex * ITEMS_PER_ROW_DESKTOP * intervalSeconds);
      const rowNum = endRowIndex - startRowIndex;

      // populate rows
      const rows = [];
      for ( let i = 0; i < rowNum; i++ ) {
        const row = [
          timeStampOffset + (intervalSeconds * ITEMS_PER_ROW_DESKTOP * i),
          timeStampOffset + ((intervalSeconds * ITEMS_PER_ROW_DESKTOP * i) + intervalSeconds),
          timeStampOffset + ((intervalSeconds * ITEMS_PER_ROW_DESKTOP * i) + (intervalSeconds * 2)),
        ];
        rows.push( row );
      }

      this.setState({
        startRowIndex,
        endRowIndex,
        rows,
      });
    }
  }

  render() {
    const {
      startRowIndex,
      endRowIndex,
      rows,
    } = this.state;

    const activeContainerOffset = startRowIndex * ROW_HEIGHT_PX;
    const activeContainerHeight = (endRowIndex - startRowIndex) * ROW_HEIGHT_PX;

    return (
      <div
        className={styles.container}
        style={{
          height: `${this.containerHeight - 26}px`,
          position: 'relative',
        }}
      >
        { DEBUG &&
          <div style={{ position: 'fixed', top: '56px', right: '10px' }} >
            { JSON.stringify({
              startRowIndex,
              endRowIndex,
            }, null, 4) }
          </div>
        }
        <div style={{
          position: 'absolute',
          height: `${activeContainerHeight}px`,
          top: `${activeContainerOffset}px`,
          left: 0,
          right: 0,
        }}
        >
          { rows && rows.map(( timeStampArr, index ) => (
            <div key={index} className={ styles.row } >
              { timeStampArr.map(( timeStamp ) => (
                <div
                  key={timeStamp}
                  className={ styles.col }
                  style={{
                    backgroundImage: `url("https://hiring.verkada.com/thumbs/${timeStamp}.jpg")`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    height: `${IMG_HEIGHT_PX}px`,
                    margin: `${IMG_MARGIN_PX}px`,
                  }}
                  src={`https://hiring.verkada.com/thumbs/${timeStamp}.jpg`}
                />
              )) }
            </div>
          )) }
        </div>
      </div>
    );
  }
}

export default InfiniteScrollBigData;
