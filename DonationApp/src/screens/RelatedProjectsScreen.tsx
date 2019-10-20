/**
 * created by musta at 9/19/2019
 */

import React, { Component } from 'react';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import { ProjectsList } from '../components';
import { NavigationParams, NavigationState } from 'react-navigation';
import { NavigationStackProp } from 'react-navigation-stack';
import { Language, Project, ProjectFilterType, ProjectsWithPagination, RelatedProjectsType } from '../types';
import { apiConstants, colorConstants, navigationConstants, translationConstants } from '../constants';
import { connect } from 'react-redux';
import { hideUiLoaderAction, showUiLoaderAction } from '../redux-store/actions';
import { projectsService } from '../services';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { injectIntl, IntlShape } from 'react-intl';
import { ApplicationState } from '../redux-store/store';

interface Props {
  navigation: NavigationStackProp<NavigationState, NavigationParams>;
  showUiLoader: typeof showUiLoaderAction;
  hideUiLoader: typeof hideUiLoaderAction;
  language: Language;
  intl: IntlShape;
}

interface State {
  relatedProjects: ProjectsWithPagination;
  selectedProjects: Project[];
  selectedIndex: number;
}

class RelatedProjectsScreen extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      relatedProjects: {},
      selectedProjects: [],
      selectedIndex: 0,
    };
  }

  static navigationOptions = ({ screenProps, navigation }) => {
    const project: Project = navigation.getParam(navigationConstants.SCREEN_PARAM_PROJECT);
    return {
      title: project.name,
    };
  };

  async componentDidMount() {
    this.props.showUiLoader();
    await this._refreshProjectsList();
    this.props.hideUiLoader();
  }

  onProjectItemPress = (item: Project) => {
    // this.props.navigation.setParams({ relatedProject: item });
    this.props.navigation.push(navigationConstants.SCREEN_PROJECT_DETAILS, {
      [navigationConstants.SCREEN_PARAM_PROJECT]: item,
    });
  };

  onProjectsListRefresh = async () => {
    await this._refreshProjectsList();
  };

  onEndReached = async () => {
    const currentPageNumber = this.state.relatedProjects.pagination.page;
    const totalPages = this.state.relatedProjects.pagination.totalPages;
    if (currentPageNumber < totalPages) {
      this.props.showUiLoader();
      await this._refreshProjectsList(currentPageNumber + 1);
      this.props.hideUiLoader();
    }
  };

  _refreshProjectsList = async (pageNumber?: number) => {
    const relatedProjectsType: RelatedProjectsType = this.props.navigation.getParam(navigationConstants.SCREEN_PARAM_RELATED_PROJECT_TYPE);
    const project: Project = this.props.navigation.getParam(navigationConstants.SCREEN_PARAM_PROJECT);

    const relatedType = relatedProjectsType ===
    RelatedProjectsType.Village ? apiConstants.RELATED_PROJECTS_VILLAGE : apiConstants.RELATED_PROJECTS_CATEGORY;
    const relatedId = relatedProjectsType === RelatedProjectsType.Village ? project.village.id : project.projectCategory.id;
    try {
      const relatedProjects: ProjectsWithPagination = await projectsService.getRelatedProjects(relatedType, relatedId, this.props.language.currentLanguage, pageNumber);
      this.setState({ relatedProjects: relatedProjects }, () => this.handleIndexChange(this.state.selectedIndex));
    } catch (e) {
      ToastAndroid.show(e.message, ToastAndroid.SHORT);
    }
  };

  handleIndexChange = index => {
    this.setState({
      ...this.state,
      selectedIndex: index,
      selectedProjects: this.state.relatedProjects.projects.filter(item => {
        return this._evaluateProjectFiltering(item, index);
      }),
    });
  };

  _evaluateProjectFiltering = (item: Project, filterType: number) => {
    if (filterType === ProjectFilterType.Donation) {
      return !item.isCostCollectedDone;
    }
    if (filterType === ProjectFilterType.Execution) {
      return item.isCostCollectedDone;
    }
    if (filterType === ProjectFilterType.Finished) {
      return item.isCostCollectedDone && item.isExecutionDone;
    }
  };

  render() {
    return (
      <View style={styles.relatedProjectsView}>
        <SegmentedControlTab
          values={[
            this.props.intl.formatMessage({ id: translationConstants.SCREEN_DONATION_PROJECTS_TAB_TITLE }),
            this.props.intl.formatMessage({ id: translationConstants.SCREEN_EXECUTION_PROJECTS_TAB_TITLE }),
            this.props.intl.formatMessage({ id: translationConstants.SCREEN_DONE_PROJECTS_TAB_TITLE }),
          ]}
          selectedIndex={this.state.selectedIndex}
          onTabPress={this.handleIndexChange}
          tabsContainerStyle={{ marginHorizontal: 10, marginVertical: 10 }}
          borderRadius={15}
          tabStyle={{ backgroundColor: colorConstants.PRIMARY_GRAY, borderColor: colorConstants.PRIMARY_BLUE }}
          tabTextStyle={{ color: '#E9EFF0' }}
          activeTabStyle={{ backgroundColor: colorConstants.PRIMARY_BLUE }}
        />
        <ProjectsList
          onItemPress={this.onProjectItemPress}
          onListRefresh={this.onProjectsListRefresh}
          onEndReached={this.onEndReached}
          projects={this.state.selectedProjects}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  relatedProjectsView: {
    flex: 1,
    backgroundColor: colorConstants.SECONDARY_WHITE,
  },
});

const mpStateToProps = (state: ApplicationState) => {
  const { app } = state;
  const { language } = app;
  return { language };
};

export default connect(mpStateToProps, {
  showUiLoader: showUiLoaderAction,
  hideUiLoader: hideUiLoaderAction,
})(injectIntl(RelatedProjectsScreen));
