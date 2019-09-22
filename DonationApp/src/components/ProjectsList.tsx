/**
 * created by musta at 9/19/2019
 */

import React, { PureComponent } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ProjectCard from './ProjectCard';

interface Project {
  id: number;
  title: string;
  description: string;
  total: number;
  done: number;
}

interface Props {
  projects: Project[];
  onItemPress: Function;
}

class ProjectsList extends PureComponent<Props> {
  _onItemPress = (item) => {
    this.props.onItemPress && this.props.onItemPress(item);
  };

  render() {
    return (
      <View style={styles.projectsCardsView}>
        <FlatList
          data={this.props.projects || []}
          renderItem={({ item }) => {
            return <ProjectCard onCardPress={this._onItemPress} project={item}/>;
          }}
          keyExtractor={item => 'x_' + item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  projectsCardsView: {
    marginBottom: 20, flex: 1, flexDirection: 'column',
  },
});

export default ProjectsList;
