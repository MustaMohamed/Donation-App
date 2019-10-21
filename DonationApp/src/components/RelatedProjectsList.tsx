/**
 * created by musta at 10/6/2019
 */

import React, { Component, ReactElement } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Project } from '../types';
import { injectIntl, IntlShape } from 'react-intl';
import { List } from 'react-native-paper';
import { colorConstants } from '../constants';
import { Progress } from './ProgressBar';

interface Props {
  projects: Project[];
  onItemPress?: Function;
  renderRightComponent?: Function;
  renderRightTitle?: Function;
  renderRightSubtitle?: Function;
  rightTitle?: any;
  rightSubtitle?: any;
  intl: IntlShape;
  listTitle?: string;
  moreComponent?: any;
}

interface State {
  isCollapsed: boolean;
}

class RelatedProjectsList extends Component<Props, State> {
  state = {
    isCollapsed: false,
  };

  _onItemPress = (item: Project) => {
    this.props.onItemPress && this.props.onItemPress(item);
  };

  _toggleCollapse = () => {
    this.setState(prevState => ({ isCollapsed: !prevState.isCollapsed }));
  };

  _renderRightComponent = (item) => {
    return this.props.renderRightComponent ? this.props.renderRightComponent(item) : null;
  };

  _renderRightTitle = (item): string | ReactElement => {
    return this.props.renderRightTitle && this.props.renderRightTitle(item);
  };

  _renderRightSubtitle = (item): string | ReactElement => {
    return this.props.renderRightSubtitle && this.props.renderRightSubtitle(item);
  };

  render() {
    return (
      <View style={styles.container}>
        <List.Accordion onPress={this._toggleCollapse} title={this.props.listTitle} expanded={this.state.isCollapsed}>
          <FlatList
            data={this.props.projects}
            renderItem={({ item }) => {
              return <ListItem
                onPress={() => this._onItemPress(item)}
                title={item.name}
                titleStyle={styles.text}
                subtitle={<View>
                  <Text style={styles.text}>{`$ ${this.props.intl.formatNumber(item.cost)}`}</Text>
                  <Progress isRTL
                            style={styles.progress}
                            color={colorConstants.PRIMARY_BLUE}
                            lineWidth={8}
                            percent={Math.min(item.collectedDonation / item.cost * 100, 100)}
                            showInfo={false}
                            type={'line'}/>
                </View>}
                subtitleStyle={styles.text}
                rightTitle={this._renderRightTitle(item)}
                rightSubtitle={this._renderRightSubtitle(item)}
                rightElement={this._renderRightComponent(item)}
                leftElement={<Image style={styles.listItemImage}
                                    source={{ uri: item.image }}/>}
              />;
            }}
            keyExtractor={item => 'x_' + item.id}
          />
          <View style={styles.childrenContainer}>
            {this.props.children}
          </View>
        </List.Accordion>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10, flex: 1,
  },
  childrenContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
  },
  text: {
    textAlign: 'left',
  },
  listTitle: {
    fontSize: 18,
    marginLeft: 20,
  },
  progress: {
    marginVertical: 10,
    width: '70%',
  },
  listItemImage: {
    width: 90, height: 55, borderRadius: 5,
  },
  listItemImageContainer: {
    borderRadius: 10,
  },
});

export default injectIntl(RelatedProjectsList);
