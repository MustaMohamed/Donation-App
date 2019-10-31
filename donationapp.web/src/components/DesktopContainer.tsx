import React, { Component } from 'react';
import { injectIntl, IntlShape } from 'react-intl';
import { connect } from 'react-redux';

interface Props {
  intl: IntlShape;
}

interface State {

}

class DesktopContainer extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <h1>Home</h1>
    );
  }
}

export default connect(null, {
})(injectIntl(DesktopContainer));