/**
 * created by musta at 9/24/2019
 */

import React, { PureComponent } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { ApplicationState } from '../redux-store/store';
import { connect } from 'react-redux';
import { changeActiveCategoryAction, getProjectCategoriesAction } from '../redux-store/actions';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { AppState, Category } from '../types';
import { colorConstants, navigationConstants, translationConstants } from '../constants';
import { NavigationDrawerProp } from 'react-navigation-drawer';
import { NavigationParams, NavigationState } from 'react-navigation';

interface Props {
  navigation: NavigationDrawerProp<NavigationState, NavigationParams>;
  intl: IntlShape;
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
  }

  async componentDidMount() {
    await this.props.getProjectCategories();
  }

  navigateToSettings = () => {
    this.props.navigation.navigate(navigationConstants.SCREEN_SETTINGS);
  };

  _onCategoryItemPress = (category) => {
    this.props.changeActiveCategory && this.props.changeActiveCategory(category);
    this.props.navigation.closeDrawer();
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={this.navigateToSettings} style={styles.item}>
          <Text style={styles.label}><FormattedMessage id={translationConstants.SETTINGS}/></Text>
          <Icon containerStyle={{ marginBottom: 10 }} name={'md-options'} type={'ionicon'} size={22}/>
        </TouchableOpacity>
        {this.props.categories.categoriesList && this.props.categories.categoriesList.map(item =>
          <TouchableOpacity key={item.id}
                            onPress={() => this._onCategoryItemPress(item)}
                            style={[styles.item, item.id === this.props.categories.activeCategory.id && styles.activeItem]}>
            <Text style={[styles.label, item.id === this.props.categories.activeCategory.id && styles.activeLabel]}>{item.name}</Text>
            <Icon containerStyle={{ marginBottom: 10 }} name={'language'} type={'material'} size={22}/>
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
    backgroundColor: colorConstants.PRIMARY_WHITE,
    alignItems: 'flex-start',
    padding: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    width: '100%',
    alignItems: 'center',
    borderBottomColor: colorConstants.PRIMARY_BLACK,
    borderBottomWidth: 1,
  },
  activeItem: {
    borderBottomColor: colorConstants.PRIMARY_GRAY,
    borderBottomWidth: 3,
  },
  label: {
    textAlign: 'left',
    fontSize: 16,
    marginBottom: 10,
    color: colorConstants.PRIMARY_BLACK,
  },
  activeLabel: {
    // color: colorConstants.PRIMARY_GRAY,
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
  getProjectCategories: getProjectCategoriesAction,
  changeActiveCategory: changeActiveCategoryAction,
})(injectIntl(DrawerContent));
