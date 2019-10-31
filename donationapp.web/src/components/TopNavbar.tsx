import React, { Component } from 'react';
import { Container, Dropdown, Header, Icon, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { TranslationConstants } from '../constants';
import { Languages } from '../types';
import { connect } from 'react-redux';
import { changeCurrentLanguageAction } from '../redux-store/actions';
// @ts-ignore
import styles from '../styles/topnavbar.module.less';

interface Props {
  intl: IntlShape;
  changeCurrentLanguage: typeof changeCurrentLanguageAction;
}

interface State {
  fixed: boolean;
  activeLang: string | Languages;
}

class TopNavbar extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      fixed: false,
      activeLang: props.intl.locale,
    };
    console.log(styles.topNavbar);
  }

  onChangeLanguage = (e: React.SyntheticEvent, { value }: any) => {
    this.setState({ activeLang: value });
    this.props.changeCurrentLanguage(value);
  };

  render() {
    return (
      <div className={styles.topNavbar}>
        <Menu secondary pointing size={'large'}>
          <Container>
            <Menu.Item as={NavLink} to={'/home'} activeClassName={'active'}>
              <FormattedMessage id={TranslationConstants.NavigationHome}/>
            </Menu.Item>
            <Menu.Item as={NavLink} to={'/donation'} activeClassName={'active'}>
              <FormattedMessage id={TranslationConstants.NavigationDonations}/>
            </Menu.Item>
            <Menu.Item as={NavLink} to={'/execution'} activeClassName={'active'}>
              <FormattedMessage id={TranslationConstants.NavigationExecution}/>
            </Menu.Item>
            <Menu.Item as={NavLink} to={'/completed'} activeClassName={'active'}>
              <FormattedMessage id={TranslationConstants.NavigationCompleted}/>
            </Menu.Item>
            <Menu.Item position='right'>
              <Header size={'tiny'}>
                <Icon name='world'/>
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
                            value={this.state.activeLang}
                            onChange={this.onChangeLanguage}/>
                </Header.Content>
              </Header>
            </Menu.Item>
          </Container>
        </Menu>
      </div>
    );
  }
}

export default connect(null, {
  changeCurrentLanguage: changeCurrentLanguageAction,
})(injectIntl(TopNavbar));