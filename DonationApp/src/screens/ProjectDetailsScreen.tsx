/**
 * created by musta at 9/22/2019
 */

import React, { PureComponent } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NavigationEvents, NavigationParams, NavigationState } from 'react-navigation';
import { Project, ProjectsWithPagination, RelatedProjectsType } from '../types';
import { injectIntl, IntlShape } from 'react-intl';
import { apiConstants, colorConstants, navigationConstants, translationConstants } from '../constants';
import { Badge, Button, Image } from 'react-native-elements';
import { NavigationStackProp } from 'react-navigation-stack';
import { ProjectDetails, RelatedProjectsList } from '../components';
import { hideUiLoaderAction, showUiLoaderAction } from '../redux-store/actions';
import { connect } from 'react-redux';
import { projectsService } from '../services';

interface Props {
  navigation: NavigationStackProp<NavigationState, NavigationParams>;
  intl: IntlShape;
  showUiLoader: typeof showUiLoaderAction;
  hideUiLoader: typeof hideUiLoaderAction;
}

interface State {
  project: Project;
  relatedCategoryProjects: Project[];
  relatedVillageProjects: Project[];
}

class ProjectDetailsScreen extends PureComponent<Props, State> {
  state = {
    project: {
      village: {
        id: 1,
        name: 'dummy',
      },
    } as Project,
    relatedCategoryProjects: [],
    relatedVillageProjects: [],
  };
  static navigationOptions = ({ screenProps, navigation }) => {
    const project = navigation.getParam(navigationConstants.SCREEN_PARAM_PROJECT);
    return {
      title: project.name,
      titleStyle: { textTransform: 'capitalize' },
    };
  };

  async componentDidMount() {
    this.props.showUiLoader();
    try {
      const project: Project = this.props.navigation.getParam(navigationConstants.SCREEN_PARAM_PROJECT);
      this.setState({ project });
      const relatedVillageType = apiConstants.RELATED_PROJECTS_VILLAGE;
      const relatedCategoryType = apiConstants.RELATED_PROJECTS_CATEGORY;
      const relatedVillageProjects: ProjectsWithPagination = await projectsService.getRelatedProjects(relatedVillageType, project.village.id, this.props.intl.locale);
      const relatedCategoryProjects: ProjectsWithPagination = await projectsService.getRelatedProjects(relatedCategoryType, project.projectCategory.id, this.props.intl.locale);
      this.setState({
        relatedVillageProjects: relatedVillageProjects.projects.filter((item, idx) => idx < 5),
        relatedCategoryProjects: relatedCategoryProjects.projects.filter((item, idx) => idx < 5),
      });
    } catch (e) {
      console.log(e);
    } finally {
      this.props.hideUiLoader();
    }
  }

  _onRelatedProjectsActionPress = () => {
    this.props.navigation.push(navigationConstants.SCREEN_RELATED_PROJECTS, {
      [navigationConstants.SCREEN_PARAM_PROJECT]: this.state.project,
      [navigationConstants.SCREEN_PARAM_RELATED_PROJECT_TYPE]: RelatedProjectsType.Category,
    });
  };

  _onPrevProjectsActionPress = (project?: Project) => {
    this.props.navigation.push(navigationConstants.SCREEN_RELATED_PROJECTS, {
      [navigationConstants.SCREEN_PARAM_PROJECT]: project ? project : this.state.project,
      [navigationConstants.SCREEN_PARAM_RELATED_PROJECT_TYPE]: RelatedProjectsType.Village,
    });
  };

  _onDonateActionPress = () => {
    this.props.navigation.push(navigationConstants.SCREEN_DONATE_FORM, {
      [navigationConstants.SCREEN_PARAM_PROJECT]: this.state.project,
    });
  };

  _navigateToHome = () => {
    this.props.navigation.navigate(navigationConstants.SCREEN_DONATION_PROJECTS);
  };

  _renderGalleryItem({ item, index }) {
    return (
      <Image
        containerStyle={styles.image}
        source={{ uri: item }}
      />
    );
  }

  render() {
    return (
      <View style={styles.detailsContainer}>
        <NavigationEvents
          onWillFocus={payload => console.log('will focus', payload)}
          onDidFocus={payload => console.log('did focus', payload)}
          onWillBlur={payload => console.log('will blur', payload)}
          onDidBlur={payload => console.log('did blur', payload)}
        />
        <ScrollView>
          <Image source={{ uri: this.state.project.image }} containerStyle={styles.image}/>
          <View style={styles.projectTitleView}>
            <Text style={styles.projectTitle}>{this.state.project.name}</Text>
            {this.state.project.cost && <Badge status="success"
                                               value={`$ ${this.props.intl.formatNumber(this.state.project.cost)}`}
                                               textStyle={styles.badgeText}
                                               badgeStyle={styles.badge}
                                               containerStyle={styles.badgeContainer}
            />}
          </View>
          {this.state.project && <ProjectDetails project={this.state.project}/>}
          <View style={styles.actionsView}>


          </View>

          <View>
            <RelatedProjectsList
              listTitle={this.props.intl.formatMessage({
                id: translationConstants.PROJECT_ACTION_TEXT_PREV_PROJECT_WORK,
              })}
              projects={this.state.relatedCategoryProjects}
              onItemPress={this._onPrevProjectsActionPress}
              children={<Button buttonStyle={styles.actionBtn}
                                titleStyle={styles.actionBtnText}
                                title={this.props.intl.formatMessage({
                                  id: translationConstants.VIEW_MORE,
                                })} onPress={this._onRelatedProjectsActionPress}/>}
            />

            <RelatedProjectsList
              listTitle={this.props.intl.formatMessage({
                id: translationConstants.PROJECT_ACTION_TEXT_VILLAGE_PREV_PROJECTS,
              })} projects={this.state.relatedVillageProjects}
              children={<Button buttonStyle={styles.actionBtn}
                                titleStyle={styles.actionBtnText}
                                title={this.props.intl.formatMessage({
                                  id: translationConstants.VIEW_MORE,
                                })} onPress={this._onPrevProjectsActionPress}/>}
            />
          </View>
          <View style={styles.donateView}>
            <Button buttonStyle={styles.donateBtn}
                    titleStyle={styles.actionBtnText}
                    title={this.state.project.isCostCollectedDone ? this.props.intl.formatMessage({
                      id: translationConstants.MORE_PROJECTS_WAITING,
                    }) : this.props.intl.formatMessage({
                      id: translationConstants.DONATE,
                    })} onPress={this.state.project.isCostCollectedDone ? this._navigateToHome : this._onDonateActionPress}/>
          </View>
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  listItemStyle: {
    backgroundColor: colorConstants.PRIMARY_WHITE,
  },
  image: {
    height: Dimensions.get('window').height / 3,
    borderRadius: 10,
  },
  actionsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  actionBtn: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: colorConstants.PRIMARY_BLUE,
    borderRadius: 20,
  },
  donateBtn: {
    backgroundColor: colorConstants.PRIMARY_BLUE,
    borderRadius: 20,
  },
  donateView: {
    paddingVertical: 10,
    padding: 10,
  },
  actionBtnText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colorConstants.PRIMARY_WHITE,
  },
  text: {
    textAlign: 'left',
  },
  listItemTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colorConstants.PRIMARY_BLACK,
  },
  progress: {
    marginVertical: 10,
  },
  projectTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colorConstants.PRIMARY_BLACK,
    margin: 10,
    textTransform: 'capitalize',
    width: '70%',
  },
  projectTitleView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  costText: {
    textAlign: 'right',
    marginBottom: 10,
  },
  badge: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: colorConstants.PRIMARY_GREEN,
  },
  badgeContainer: {
    width: '30%',
  },
  badgeText: {
    fontSize: 16,
  },
});

export default connect(null, {
  showUiLoader: showUiLoaderAction,
  hideUiLoader: hideUiLoaderAction,
})(injectIntl(ProjectDetailsScreen));
