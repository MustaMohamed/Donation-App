import React, { Component } from 'react';
import { Container, Dropdown, Header, Icon, Menu, Responsive, Segment, Visibility } from 'semantic-ui-react';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { TranslationConstants } from '../constants';
import { Languages } from '../types';

interface Props {
  intl: IntlShape;
}

interface State {
  fixed: boolean;
}

class DesktopContainer extends Component<Props, State> {
  state = {
    fixed: false,
  };

  hideFixedMenu = () => this.setState({ fixed: false });

  showFixedMenu = () => this.setState({ fixed: true });

  getWidth = (): number => {
    const isSSR = typeof window === undefined;

    return (isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth) as number;
  };

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <Responsive getWidth={this.getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : undefined}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='small'
            >
              <Container>
                <Menu.Item as='a' active><FormattedMessage id={TranslationConstants.NavigationHome}/></Menu.Item>
                <Menu.Item as='a'><FormattedMessage id={TranslationConstants.NavigationDonations}/></Menu.Item>
                <Menu.Item as='a'><FormattedMessage id={TranslationConstants.NavigationExecution}/></Menu.Item>
                <Menu.Item as='a'><FormattedMessage id={TranslationConstants.NavigationCompleted}/></Menu.Item>
                <Menu.Item position='right'>
                  <Header size={'tiny'} inverted>
                    <Icon name='world'/>
                    <Header.Content>
                      <Dropdown
                        inline
                        options={[
                          { key: 1, text: 'Arabic', value: Languages.Ar, active: this.props.intl.locale === Languages.Ar },
                          { key: 2, text: 'English', value: Languages.En, active: this.props.intl.locale === Languages.En },
                        ]}
                        defaultValue={Languages.En}
                      />
                    </Header.Content>
                  </Header>
                </Menu.Item>
              </Container>
            </Menu>
          </Segment>
        </Visibility>
        {children}
      </Responsive>
    );
  }
}

export default injectIntl(DesktopContainer);