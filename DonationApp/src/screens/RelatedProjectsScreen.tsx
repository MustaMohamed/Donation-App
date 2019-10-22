/**
 * created by musta at 9/19/2019
 */

import React, { Component } from 'react';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import { AppText, ProjectsList } from '../components';
import { NavigationParams, NavigationState } from 'react-navigation';
import { NavigationStackProp } from 'react-navigation-stack';
import { Language, Project, ProjectFilterStatusType, ProjectsWithPagination, RelatedProjectsType } from '../types';
import { apiConstants, colorConstants, navigationConstants, translationConstants } from '../constants';
import { connect } from 'react-redux';
import { hideUiLoaderAction, showUiLoaderAction } from '../redux-store/actions';
import { ProjectsFilterService, ProjectsService } from '../services';
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
      headerTitle: <AppText style={{ fontSize: 18 }} bold text={project.name}/>,
    };
  };

  async componentDidMount() {
    await this._requestProjects();
  }

  /**
   * helper methods
   * */
  private _requestProjects = async () => {
    try {
      this.props.showUiLoader();
      const relatedProjects = await this._getProjects();
      this.setState({ relatedProjects: relatedProjects }, () => this.handleIndexChange(this.state.selectedIndex));
    } catch (e) {
      ToastAndroid.show(e.message, ToastAndroid.SHORT);
    } finally {
      this.props.hideUiLoader();
    }
  };

  private _getProjects = async (pageNumber?: number) => {
    const relatedProjectsType: RelatedProjectsType =
      this.props.navigation.getParam(navigationConstants.SCREEN_PARAM_RELATED_PROJECT_TYPE);
    const project: Project = this.props.navigation.getParam(navigationConstants.SCREEN_PARAM_PROJECT);
    const relatedType = relatedProjectsType === RelatedProjectsType.Village ?
      apiConstants.RELATED_PROJECTS_VILLAGE :
      apiConstants.RELATED_PROJECTS_CATEGORY;
    const relatedId = relatedProjectsType === RelatedProjectsType.Village ?
      project.village.id : project.projectCategory.id;
    const relatedProjects: ProjectsWithPagination = await ProjectsService
      .getRelatedProjects(relatedType, relatedId, this.props.language.currentLanguage, pageNumber);
    return relatedProjects;
  };

  private _evaluateProjectFiltering = (projects: Project[], filterType: ProjectFilterStatusType) => {
    return ProjectsFilterService.applyProjectsStatusFilter(projects, filterType);
  };

  /**
   * events and callbacks
   * */
  onProjectItemPress = (item: Project) => {
    this.props.navigation.push(navigationConstants.SCREEN_PROJECT_DETAILS, {
      [navigationConstants.SCREEN_PARAM_PROJECT]: item,
    });
  };

  onProjectsListRefresh = async () => {
    try {
      const relatedProjects = await this._getProjects();
      this.setState({ relatedProjects: relatedProjects }, () => this.handleIndexChange(this.state.selectedIndex));
    } catch (e) {
      ToastAndroid.show(e.message, ToastAndroid.SHORT);
    }
  };

  onEndReached = async () => {
    const currentPageNumber = this.state.relatedProjects.pagination.page;
    const totalPages = this.state.relatedProjects.pagination.totalPages;
    if (currentPageNumber < totalPages) {
      try {
        this.props.showUiLoader();
        const relatedProjects = await this._getProjects(currentPageNumber + 1);
        this.setState(prevState => ({
          relatedProjects: {
            pagination: relatedProjects.pagination,
            projects: [...prevState.relatedProjects.projects, ...relatedProjects.projects],
          },
        }), () => this.handleIndexChange(this.state.selectedIndex));
      } catch (e) {
        ToastAndroid.show(e.message, ToastAndroid.SHORT);
      } finally {
        this.props.hideUiLoader();
      }
    }
  };

  handleIndexChange = index => {
    this.setState(prevState => ({
      selectedIndex: index,
      selectedProjects: this._evaluateProjectFiltering(prevState.relatedProjects.projects, index),
    }));
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
