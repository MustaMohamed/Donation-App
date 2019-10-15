/**
 * created by musta at 9/24/2019
 */

import React, { PureComponent } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { ApplicationState } from '../redux-store/store';
import { connect } from 'react-redux';
import { changeActiveCategoryAction, changeCurrentLanguageAction, getProjectCategoriesAction } from '../redux-store/actions';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { AppState } from '../types/redux-store';
import { Category, Languages } from '../types';
import { translationConstants } from '../constants';

interface Props {
  intl: IntlShape;
  changeAppCurrentLanguage: typeof changeCurrentLanguageAction;
  getProjectCategories: typeof getProjectCategoriesAction;
  changeActiveCategory: typeof changeActiveCategoryAction;
  app: AppState;
  categories: {
    activeCategory: Category;
    categoriesList: Category[]
  }
}

class DrawerContent extends PureComponent<Props> {

  constructor(props) {
    super(props);
    console.log('content ctor');
  }

  async componentDidMount() {
    await this.props.getProjectCategories();
  }

  onChangeAppLanguage = () => {
    const nextLanguage = this.props.app.language.currentLanguage === Languages.En ? Languages.Ar : Languages.En;
    this.props.changeAppCurrentLanguage(nextLanguage);
  };

  _onCategoryItemPress = (category) => {
    this.props.changeActiveCategory(category)
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={this.onChangeAppLanguage} style={styles.item}>
          <Icon containerStyle={{ marginBottom: 10 }} name={'language'} type={'material'} size={22}/>
          <Text style={styles.label}><FormattedMessage id={translationConstants.APP_LANGUAGE}/></Text>
        </TouchableOpacity>
        {this.props.categories.categoriesList.map(item =>
          <TouchableOpacity key={item.id} onPress={() => this._onCategoryItemPress(item)} style={styles.item}>
            <Icon containerStyle={{ marginBottom: 10 }} name={'language'} type={'material'} size={22}/>
            <Text style={styles.label}>{item.name}</Text>
          </TouchableOpacity>,
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    padding: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    width: '100%',
    alignItems: 'center',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
  label: {
    textAlign: 'left',
    fontSize: 16,
    marginBottom: 10,
    color: 'rgba(0, 0, 0, .87)',
  },
  iconContainer: {
    marginHorizontal: 16,
    width: 24,
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  title: {},
});
const mapStateToProps = (state: ApplicationState) => {
  const { app, projects } = state;
  const { categories } = projects;
  return { app, categories };
};

export default connect(mapStateToProps, {
  changeAppCurrentLanguage: changeCurrentLanguageAction,
  getProjectCategories: getProjectCategoriesAction,
  changeActiveCategory: changeActiveCategoryAction,
}) (injectIntl(DrawerContent));
