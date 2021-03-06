/**
 * created by musta at 9/22/2019
 */

import React, { PureComponent } from 'react';
import { Dimensions, ScrollView, StyleSheet, ToastAndroid, View } from 'react-native';
import { NavigationEvents, NavigationParams, NavigationState } from 'react-navigation';
import { Project, ProjectsWithPagination, RelatedProjectsType } from '../types';
import { injectIntl, IntlShape } from 'react-intl';
import { apiConstants, colorConstants, navigationConstants, translationConstants } from '../constants';
import { Badge, Button, Icon, Image, ListItem } from 'react-native-elements';
import { NavigationStackProp } from 'react-navigation-stack';
import { AppText, ProjectDetails, RelatedProjectsList } from '../components';
import { hideUiLoaderAction, showUiLoaderAction } from '../redux-store/actions';
import { connect } from 'react-redux';
import { ProjectsService } from '../services';
import ImagesGallery from '../components/ImagesGallery';

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
    project: null,
    relatedCategoryProjects: [],
    relatedVillageProjects: [],
  };
  static navigationOptions = ({ screenProps, navigation }) => {
    const project = navigation.getParam(navigationConstants.SCREEN_PARAM_PROJECT);
    return {
      title: project.name,
      headerTitle: <AppText style={{ fontSize: 18, textTransform: 'capitalize' }} bold text={project.name}/>,
    };
  };

  async componentDidMount() {
    /* this.props.showUiLoader();
     try {
       await this._getProjectDetails();
     } catch (e) {
       console.log(e);
     } finally {
       this.props.hideUiLoader();
     }*/
  }

  _onRelatedCategoryProjectsActionPress = () => {
    this.props.navigation.push(navigationConstants.SCREEN_RELATED_PROJECTS, {
      [navigationConstants.SCREEN_PARAM_PROJECT]: this.state.project,
      [navigationConstants.SCREEN_PARAM_RELATED_PROJECT_TYPE]: RelatedProjectsType.Category,
    });
  };

  _onRelatedVillageProjectsActionPress = () => {
    this.props.navigation.push(navigationConstants.SCREEN_RELATED_PROJECTS, {
      [navigationConstants.SCREEN_PARAM_PROJECT]: this.state.project,
      [navigationConstants.SCREEN_PARAM_RELATED_PROJECT_TYPE]: RelatedProjectsType.Village,
    });
  };

  _onPrevProjectsActionPress = (project?: Project) => {
    this.props.navigation.push(navigationConstants.SCREEN_PROJECT_DETAILS, {
      [navigationConstants.SCREEN_PARAM_PROJECT]: project ?
        { name: project.name, id: project.id } : { name: this.state.project.name, id: this.state.project.id },
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

  _getProjectDetails = async () => {
    const project: Project = this.props.navigation.getParam(navigationConstants.SCREEN_PARAM_PROJECT);
    const projectDetails = await ProjectsService.getProjectById(project.id, this.props.intl.locale);
    this.setState({ project: projectDetails });
    const relatedVillageType = apiConstants.RELATED_PROJECTS_VILLAGE;
    const relatedCategoryType = apiConstants.RELATED_PROJECTS_CATEGORY;
    const relatedVillageProjects: ProjectsWithPagination =
      await ProjectsService.getRelatedProjects(relatedVillageType, projectDetails.village.id, this.props.intl.locale);
    const relatedCategoryProjects: ProjectsWithPagination =
      await ProjectsService.getRelatedProjects(relatedCategoryType, projectDetails.projectCategory.id, this.props.intl.locale);
    this.setState({
      relatedVillageProjects: relatedVillageProjects.projects.filter((item, idx) => idx < 5),
      relatedCategoryProjects: relatedCategoryProjects.projects.filter((item, idx) => idx < 5),
    });
  };

  _onNavigationDidFocus = async () => {
    this.props.showUiLoader();
    try {
      await this._getProjectDetails();
    } catch (e) {
      ToastAndroid.show(e.message, ToastAndroid.SHORT);
    } finally {
      this.props.hideUiLoader();
    }
  };

  _renderPageHeader = (image, index, onClose) => {
    return (
      <View>
        <ListItem
          title={this.state.project.gallery.images[index].title + this.state.project.gallery.images[index].id}
          titleStyle={{ color: colorConstants.PRIMARY_WHITE }}
          leftIcon={<Icon name={'closecircleo'} type={'antdesign'} onPress={() => onClose()} color={colorConstants.PRIMARY_WHITE}/>}
          containerStyle={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  };
  _renderPageFooter = (image, index, onClose) => {
    return (
      <View>
        <ListItem
          title={this.state.project.gallery.images[index].title + this.state.project.gallery.images[index].id}
          titleStyle={styles.whiteText}
          subtitle={this.state.project.gallery.images[index].description}
          subtitleStyle={styles.whiteText}
          containerStyle={{ backgroundColor: 'transparent' }}
        />
        <AppText style={{ color: colorConstants.PRIMARY_WHITE }}>{this.state.project.gallery.images[index].description}</AppText>
      </View>
    );
  };
  _renderRelatedCountryListRightComponent = (item: Project) => {
    return (
      <AppText style={{ color: colorConstants.PRIMARY_BLACK, fontSize: 12 }}>{`${item.country}, ${item.village.name}`}</AppText>
    );
  };

  _renderRelatedCategoryListRightComponent = (item: Project) => {
    return (
      <AppText style={{ color: colorConstants.PRIMARY_BLACK, fontSize: 12 }}>{`${item.projectCategory.category}`}</AppText>
    );
  };

  render() {
    return (
      <View style={styles.detailsContainer}>
        <NavigationEvents onDidFocus={this._onNavigationDidFocus}/>
        {this.state.project && <ScrollView>
          <Image source={{ uri: this.state.project.image }} containerStyle={styles.image}/>
          <View style={styles.projectTitleView}>
            <AppText bold style={styles.projectTitle}>{this.state.project.name}</AppText>
            {this.state.project.cost && <Badge status="success"
                                               value={`$ ${this.props.intl.formatNumber(this.state.project.cost)}`}
                                               textStyle={styles.badgeText}
                                               badgeStyle={styles.badge}
                                               containerStyle={styles.badgeContainer}/>}
          </View>
          {this.state.project && <ProjectDetails project={this.state.project}/>}
          <View style={styles.actionsView}>
          </View>
          <View>
            {this.state.project.gallery.length && <ImagesGallery images={this.state.project.gallery}
                                                                 renderPageHeader={this._renderPageHeader}
                                                                 renderPageFooter={this._renderPageFooter}
                                                                 gallerySectionTitle={this.props.intl.formatMessage({ id: translationConstants.PROJECT_GALLERY })}/>}
            <RelatedProjectsList projects={this.state.relatedCategoryProjects}
                                 listTitle={this.props.intl.formatMessage({
                                   id: translationConstants.PROJECT_ACTION_TEXT_PREV_PROJECT_WORK,
                                 })}
                                 onItemPress={this._onPrevProjectsActionPress}
              // renderRightTitle={() => this.props.intl.formatMessage({ id: translationConstants.COUNTRY })}
                                 renderRightSubtitle={this._renderRelatedCountryListRightComponent}>
              <Button buttonStyle={styles.actionBtn}
                      titleStyle={styles.actionBtnText}
                      title={<AppText bold text={this.props.intl.formatMessage({
                        id: translationConstants.VIEW_MORE,
                      })}/>} onPress={this._onRelatedCategoryProjectsActionPress}/>
            </RelatedProjectsList>
            <RelatedProjectsList projects={this.state.relatedVillageProjects}
                                 listTitle={this.props.intl.formatMessage({
                                   id: translationConstants.PROJECT_ACTION_TEXT_VILLAGE_PREV_PROJECTS,
                                 })}
                                 onItemPress={this._onPrevProjectsActionPress}
              // renderRightTitle={() => this.props.intl.formatMessage({ id: translationConstants.CATEGORY })}
                                 renderRightSubtitle={this._renderRelatedCategoryListRightComponent}>
              <Button buttonStyle={styles.actionBtn}
                      titleStyle={styles.actionBtnText}
                      title={<AppText bold text={this.props.intl.formatMessage({
                        id: translationConstants.VIEW_MORE,
                      })}/>} onPress={this._onRelatedVillageProjectsActionPress}/>
            </RelatedProjectsList>
          </View>
          <View style={styles.donateView}>
            <Button buttonStyle={styles.donateBtn}
                    titleStyle={styles.actionBtnText}
                    title={<AppText bold text={this.state.project.isCostCollectedDone ? this.props.intl.formatMessage({
                      id: translationConstants.MORE_PROJECTS_WAITING,
                    }) : this.props.intl.formatMessage({
                      id: translationConstants.DONATE,
                    })}/>} onPress={this.state.project.isCostCollectedDone ? this._navigateToHome : this._onDonateActionPress}/>
          </View>
        </ScrollView>}
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
  galleryImage: {
    backgroundColor: 'transparent',
  },
  whiteText: {
    color: colorConstants.PRIMARY_WHITE,
    textAlign: 'left',
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
    color: colorConstants.PRIMARY_WHITE,
  },
  text: {
    textAlign: 'left',
  },
  listItemTitle: {
    fontSize: 16,
    color: colorConstants.PRIMARY_BLACK,
  },
  progress: {
    marginVertical: 10,
  },
  projectTitle: {
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
    fontFamily: 'Tajawal-Regular',
  },
});

export default connect(null, {
  showUiLoader: showUiLoaderAction,
  hideUiLoader: hideUiLoaderAction,
})(injectIntl(ProjectDetailsScreen));
