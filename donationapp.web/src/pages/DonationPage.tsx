import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { TranslationConstants } from '../constants';
import { ProjectsList } from '../components';
import { projects } from '../utils';


interface Props {
  intl: IntlShape;
}

interface State {

}

class DonationPage extends Component<Props, State> {
  render() {
    return (
      <Container>
        <Header size={'large'} className={'my-3'}>
          <FormattedMessage id={TranslationConstants.PagesHeaderDonation}/>
        </Header>
        <ProjectsList projects={projects}/>
      </Container>
    );
  }
}

export default injectIntl(DonationPage);