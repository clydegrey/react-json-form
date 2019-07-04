import React from 'react';
import defaultState from './FetchEx/defaultState';
import axios from 'axios';
import reducer1 from './FetchEx/reducer1';

class AppFetchRenderProp extends React.Component {
  state = defaultState;

  axiosSource = null;

  tryToCancel() {
    if (this.axiosSource) {
      this.axiosSource.cancel();
    }
  }

  dispatch(action) {
    this.setState(prevState => reducer1(prevState, action));
  }

  fetch = () => {
    this.tryToCancel();
    this.axiosSource = axios.CancelToken.source();
    axios
      .get(this.props.url, {
        cancelToken: this.axiosSource.token
      })
      .then(response => {
        this.dispatch({ type: 'fetched', payload: response.data });
      })
      .catch(error => {
        this.dispatch({ type: 'error', payload: error });
      });
  };

  componentDidMount() {
    this.fetch();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.url !== this.props.url) {
      this.fetch();
    }
  }

  componentWillUnmount() {
    this.tryToCancel();
  }

  render() {
    return this.props.children(this.state);
  }
}

export default AppFetchRenderProp;
