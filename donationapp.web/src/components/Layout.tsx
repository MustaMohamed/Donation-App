import React, { Component } from 'react';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { connect } from 'react-redux';
import { Container, Dropdown, Header, Icon, Menu, Responsive, Sidebar, SidebarPushable } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { TranslationConstants } from '../constants';
import { Languages } from '../types';
import { changeCurrentLanguageAction } from '../redux-store/actions';
import TopNavbar from './TopNavbar';

interface Props {
  intl: IntlShape;
  changeCurrentLanguage: typeof changeCurrentLanguageAction;
}

interface State {
  sidebarOpened: boolean;
  activeLang: string | Languages;
}

class Layout extends Component<Props | any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      sidebarOpened: false,
      activeLang: props.intl.locale,
    };
  }

  getWidth = () => {
    const isSSR = typeof window === 'undefined';
    return (isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth) as number;
  };

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  onChangeLanguage = (e: React.SyntheticEvent, { value }: any) => {
    this.setState({ activeLang: value });
    this.props.changeCurrentLanguage(value);
  };

  render() {
    return (
      <SidebarPushable>
        <Sidebar as={Menu}
                 animation='push'
                 vertical inverted
                 onHide={this.handleSidebarHide}
                 visible={this.state.sidebarOpened}>
          <Menu.Item as={NavLink} onClick={this.handleSidebarHide} to={'/home'} activeClassName={'active'}>
            <FormattedMessage id={TranslationConstants.NavigationHome}/>
          </Menu.Item>
          <Menu.Item as={NavLink} onClick={this.handleSidebarHide} to={'/donation'} activeClassName={'active'}>
            <FormattedMessage id={TranslationConstants.NavigationDonations}/>
          </Menu.Item>
          <Menu.Item as={NavLink} onClick={this.handleSidebarHide} to={'/execution'} activeClassName={'active'}>
            <FormattedMessage id={TranslationConstants.NavigationExecution}/>
          </Menu.Item>
          <Menu.Item as={NavLink} onClick={this.handleSidebarHide} to={'/completed'} activeClassName={'active'}>
            <FormattedMessage id={TranslationConstants.NavigationCompleted}/>
          </Menu.Item>
        </Sidebar>
        <Sidebar.Pusher dimmed={this.state.sidebarOpened}>
          <Responsive getWidth={this.getWidth}
                      minWidth={Responsive.onlyTablet.minWidth}>
            <TopNavbar/>
          </Responsive>
          <Responsive getWidth={this.getWidth}
                      maxWidth={Responsive.onlyMobile.maxWidth}>
            <Container>
              <Menu inverted pointing secondary size='large'>
                <Menu.Item color={'black'} onClick={this.handleToggle}>
                  <Icon name='sidebar' color={'black'}/>
                </Menu.Item>
                <Menu.Item position='right'>
                  <Header size={'small'}>
                    <Icon name='world' size={'small'}/>
                    <Header.Content>
                      <Dropdown inline
                                options={[
                                  {
                                    key: 1,
                                    text: this.props.intl.formatMessage({
                                      id: TranslationConstants.LanguageArabic,
                                    }), value: Languages.Ar, active: this.props.intl.locale === Languages.Ar,
                                  },
                                  {
                                    key: 2, text: this.props.intl.formatMessage({
                                      id: TranslationConstants.LanguageEnglish,
                                    }), value: Languages.En, active: this.props.intl.locale === Languages.En,
                                  },
                                ]}
                                defaultValue={Languages.En}
                                onChange={this.onChangeLanguage}/>
                    </Header.Content>
                  </Header>
                </Menu.Item>
              </Menu>
            </Container>
          </Responsive>
          {this.props.children}
        </Sidebar.Pusher>
      </SidebarPushable>
    );
  }
}

export default connect(null, {
  changeCurrentLanguage: changeCurrentLanguageAction,
})(injectIntl(Layout));