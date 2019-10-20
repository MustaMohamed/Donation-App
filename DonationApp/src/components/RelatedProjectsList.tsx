/**
 * created by musta at 10/6/2019
 */

import React, { Component } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Image, ListItem } from 'react-native-elements';
import { Project } from '../types';
import { injectIntl, IntlShape } from 'react-intl';
import { List } from 'react-native-paper';

interface Props {
  projects: Project[];
  onItemPress?: Function;
  intl: IntlShape;
  listTitle?: string;
  moreComponent?: any;
}

interface State {
  collapsed: boolean;
}

class RelatedProjectsList extends Component<Props, State> {
  state = {
    collapsed: false,
  };

  _onItemPress = (item: Project) => {
    this.props.onItemPress && this.props.onItemPress(item);
  };

  _toggleCollapse = () => {
    this.setState(prevState => ({ collapsed: !prevState.collapsed }));
  };

  render() {
    return (
      <View style={{ marginVertical: 10, flex: 1 }}>
        {/*<Text onPress={() => {}} style={[styles.text, styles.listTitle]}>{this.props.listTitle}</Text>*/}
        <List.Accordion onPress={this._toggleCollapse} title={this.props.listTitle} expanded={this.state.collapsed}>
          <FlatList
            data={this.props.projects}
            renderItem={({ item }) => {
              return <ListItem
                onPress={() => this._onItemPress(item)}
                title={item.name}
                titleStyle={styles.text}
                subtitle={`$ ${this.props.intl.formatNumber(item.cost)}`}
                subtitleStyle={styles.text}
                leftElement={<View style={{ width: 80, height: 50 }}>
                  <Image containerStyle={{ borderRadius: 10 }} style={{ width: 80, height: 50, borderRadius: 10 }} source={{ uri: item.image }}/>
                </View>}
              />;
            }}
            keyExtractor={item => 'x_' + item.id}
          />
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {this.props.children}
          </View>
        </List.Accordion>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'left',
  },
  listTitle: {
    fontSize: 18,
    marginLeft: 20,
  },
});

export default injectIntl(RelatedProjectsList);
