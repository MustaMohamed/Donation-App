/**
 * created by musta at 9/17/2019
 */

import React, { Component } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { translationConstants } from '../constants';
import { AppState, Languages } from '../types';
import { connect } from 'react-redux';
import { ApplicationState } from '../redux-store/store';
import { changeCurrentLanguageAction } from '../redux-store/actions';
import ProjectCard from '../components/ProjectCard';

interface Props {
  changeAppCurrentLanguage: typeof changeCurrentLanguageAction;
  app: AppState;
  intl: IntlShape;
}

interface State {

}

const projects = [
  { id: 0, title: 'Make new hospital', description: 'Lorem ipsum dolor sit amet.', progress: 0.7 },
  { id: 1, title: 'Make new hospital', description: 'Lorem ipsum dolor sit amet.', progress: 0.5 },
  { id: 2, title: 'Make new hospital', description: 'Lorem ipsum dolor sit amet.', progress: 0.1 },
  { id: 3, title: 'Make new hospital', description: 'Lorem ipsum dolor sit amet.', progress: 0.3 },
  { id: 4, title: 'Make new hospital', description: 'Lorem ipsum dolor sit amet.', progress: 0.8 },
];

class HomeScreen extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = ({ screenProps }) => {
    const title = screenProps.intl.formatMessage({ id: translationConstants.APP_TITLE, defaultMessage: 'Home' });
    return {
      title: title,
    };
  };

  toggleLanguage = () => {
    const nextLanguage = this.props.app.language.currentLanguage === Languages.En ? Languages.Ar : Languages.En;
    this.props.changeAppCurrentLanguage(nextLanguage);
  };

  render() {
    return (
      <View style={[styles.startupContainer]}>
        <Text style={[styles.text]}>
          <FormattedMessage id={translationConstants.HELLO}/>
        </Text>
        <Button title={'change language'} onPress={this.toggleLanguage}/>
        <View style={styles.projectsCardsView}>
          <FlatList
            data={projects}
            renderItem={({ item }) => {
              console.log(item);
              return <ProjectCard project={item}/>;
            }}
            keyExtractor={item => 'x_' + item.id}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => {
  const { app } = state;
  return { app };
};

export default connect(mapStateToProps, {
  changeAppCurrentLanguage: changeCurrentLanguageAction,
})(injectIntl(HomeScreen));


const styles = StyleSheet.create({
  startupContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    // alignItems: 'center',
  },
  text: {
    textAlign: 'left',
  },
  rtlText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  rtlView: {
    // flexDirection: 'row-reverse',
  },
  projectsCardsView: {
    marginBottom: 20, flex: 1, flexDirection: 'column',
  },
});