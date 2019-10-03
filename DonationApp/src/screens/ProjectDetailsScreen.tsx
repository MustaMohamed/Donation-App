/**
 * created by musta at 9/22/2019
 */

import React, { PureComponent } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NavigationParams, NavigationState } from 'react-navigation';
import { Project, RelatedProjectsType } from '../types';
import { injectIntl, IntlShape } from 'react-intl';
import { colorConstants, navigationConstants, translationConstants } from '../constants';
import { Button, Image } from 'react-native-elements';
import { NavigationStackProp } from 'react-navigation-stack';
import { ProjectDetails } from '../components';

interface Props {
  navigation: NavigationStackProp<NavigationState, NavigationParams>;
  intl: IntlShape;
}

interface State {
  project: Project
}

class ProjectDetailsScreen extends PureComponent<Props, State> {
  state = {
    project: {
      village: {
        id: 1,
        name: 'dummy',
      },
    } as Project,
  };
  static navigationOptions = ({ screenProps, navigation }) => {
    const project = navigation.getParam(navigationConstants.SCREEN_PARAM_PROJECT);
    return {
      title: project.name,
      titleStyle: { textTransform: 'capitalize' },
    };
  };

  componentDidMount(): void {
    const project = this.props.navigation.getParam(navigationConstants.SCREEN_PARAM_PROJECT);
    this.setState({ project });
  }

  _onRelatedProjectsActionPress = () => {
    this.props.navigation.push(navigationConstants.SCREEN_RELATED_PROJECTS, {
      [navigationConstants.SCREEN_PARAM_PROJECT]: this.state.project,
      [navigationConstants.SCREEN_PARAM_RELATED_PROJECT_TYPE]: RelatedProjectsType.Category,
    });
  };

  _onPrevProjectsActionPress = () => {
    this.props.navigation.push(navigationConstants.SCREEN_RELATED_PROJECTS, {
      [navigationConstants.SCREEN_PARAM_PROJECT]: this.state.project,
      [navigationConstants.SCREEN_PARAM_RELATED_PROJECT_TYPE]: RelatedProjectsType.Village,
    });
  };

  _onDonateActionPress = () => {
    this.props.navigation.push(navigationConstants.SCREEN_DONATE_FORM, {
      [navigationConstants.SCREEN_PARAM_PROJECT]: this.state.project,
    });
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
        <ScrollView>
          <Image source={{ uri: this.state.project.image }} containerStyle={styles.image}/>
          <Text style={styles.projectTitle}>{this.state.project.name}</Text>

          {/* <Carousel
            ref={(c) => {
              this._carousel = c;
            }}
            data={this.state.project.gallery}
            renderItem={this._renderGalleryItem}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={Dimensions.get('window').width / 1.2}
            loop
          />*/}
          {this.state.project && <ProjectDetails project={this.state.project}/>}
          <View style={styles.actionsView}>
            <Button buttonStyle={styles.actionBtn}
                    titleStyle={styles.actionBtnText}
                    title={this.props.intl.formatMessage({
                      id: translationConstants.PROJECT_ACTION_TEXT_VILLAGE_PREV_PROJECTS,
                    })} onPress={this._onPrevProjectsActionPress}/>
            <Button buttonStyle={styles.actionBtn}
                    titleStyle={styles.actionBtnText}
                    title={this.props.intl.formatMessage({
                      id: translationConstants.PROJECT_ACTION_TEXT_PREV_PROJECT_WORK,
                    })} onPress={this._onRelatedProjectsActionPress}/>
          </View>
          <View style={styles.donateView}>
            <Button buttonStyle={styles.donateBtn}
                    titleStyle={styles.actionBtnText}
                    title={this.props.intl.formatMessage({
                      id: translationConstants.DONATE,
                    })} onPress={this._onDonateActionPress}/>
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
    paddingHorizontal: 15,
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
  fundText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colorConstants.PRIMARY_BLACK,
    margin: 10,
    textTransform: 'capitalize',
  },
  costText: {
    textAlign: 'right',
    marginBottom: 10,
  },
});

export default injectIntl(ProjectDetailsScreen);
