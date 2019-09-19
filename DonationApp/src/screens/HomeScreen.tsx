/**
 * created by musta at 9/17/2019
 */

import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { translationConstants } from '../constants';
import { AppState, Languages } from '../types';
import { connect } from 'react-redux';
import { ApplicationState } from '../redux-store/store';
import { changeCurrentLanguageAction } from '../redux-store/actions';
import { ProjectsList } from '../components';

interface Props {
  changeAppCurrentLanguage: typeof changeCurrentLanguageAction;
  app: AppState;
  intl: IntlShape;
}

interface State {

}

const projects = [
  {
    id: 0,
    title: 'Make new hospital',
    description: 'Lorem ipsum dolor sit amet.',
    total: 500,
    done: 70,
  },
  {
    id: 1, title: 'Make new hospital',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus, nobis, possimus? Dolor ipsam repudiandae veritatis?',
    total: 500,
    done: 370,
  },
  {
    id: 2, title: 'Make new hospital',
    description: 'Lorem ipsum dolor sit amet.', total: 500,
    done: 30,
  },
  {
    id: 3, title: 'Make new hospital',
    description: 'Lorem ipsum dolor sit amet.',
    total: 500,
    done: 177,
  },
  {
    id: 4, title: 'Make new hospital',
    description: 'Lorem ipsum dolor sit amet.',
    total: 500,
    done: 400,
  },
  {
    id: 5, title: 'Make new hospital',
    description: 'للمهتمين قمنا بوضع نص لوريم إبسوم القياسي والمُستخدم منذ القرن الخامس عشر في الأسفل. وتم أيضاً توفير الأقسام 1.10.32 و 1.10.33 من \"حول أقاصي الخير والشر\" (de Finibus Bonorum et Malorum) لمؤلفه شيشيرون (Cicero) بصيغها الأصلية، مرفقة بالنسخ الإنكليزية لها والتي قام بترجمتها هـ.راكهام (H. Rackham) في عام 1914',
    total: 700,
    done: 400,
  },
  {
    id: 6, title: 'Make new hospital',
    description: 'للمهتمين قمنا بوضع نص لوريم إبسوم القياسي والمُستخدم منذ القرن الخامس عشر في الأسفل. وتم أيضاً توفير الأقسام 1.10.32 و 1.10.33 من \"حول أقاصي الخير والشر\" (de Finibus Bonorum et Malorum) لمؤلفه شيشيرون (Cicero) بصيغها الأصلية، مرفقة بالنسخ الإنكليزية لها والتي قام بترجمتها هـ.راكهام (H. Rackham) في عام 1914',
    total: 150,
    done: 90,
  },
  {
    id: 7, title: 'Make new hospital',
    description: 'Lorem ipsum dolor sit amet.',
    total: 800,
    done: 764,
  },
  {
    id: 8, title: 'Make new hospital',
    description: 'Lorem ipsum dolor sit amet.',
    total: 500,
    done: 356,
  },
  {
    id: 9, title: 'Make new hospital',
    description: 'Lorem ipsum dolor sit amet.',
    total: 500,
    done: 321,
  },

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
        <ProjectsList projects={projects}/>
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

});