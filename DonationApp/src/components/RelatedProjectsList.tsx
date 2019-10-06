/**
 * created by musta at 10/6/2019
 */

import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Image, ListItem } from 'react-native-elements';
import { Project } from '../types';
import { injectIntl, IntlShape } from 'react-intl';
import Collapsible from 'react-native-collapsible';

interface Props {
  projects: Project[];
  intl: IntlShape;
  listTitle: any;
  moreComponent: any;
}

interface State {
  collapsed: boolean;
}

class RelatedProjectsList extends Component<Props, State> {
  state = {
    collapsed: true,
  };

  render() {
    return (
      <View style={{ marginVertical: 10, flex: 1 }}>
        <Text onPress={() => this.setState(prevState => ({ collapsed: !prevState.collapsed }))} style={[styles.text, styles.listTitle]}>{this.props.listTitle}</Text>
        <Collapsible collapsed={this.state.collapsed}>
          <FlatList
            data={this.props.projects}
            renderItem={({ item }) => {
              return <ListItem
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
        </Collapsible>

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
