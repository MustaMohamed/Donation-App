/**
 * created by musta at 9/19/2019
 */

import React, { PureComponent } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ProjectCard from './ProjectCard';
import { Project } from '../types';


interface Props {
  projects: Project[];
  onItemPress: Function;
  onListRefresh?: Function;
  onEndReached?: Function;
}

interface State {
  refresh: boolean;
}

class ProjectsList extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
    };
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
    const tm = setTimeout(() => {
      this.setState({ refresh: false });
      clearTimeout(tm);
    }, 5000);
    if (this.props.projects !== prevProps.projects) {
      this.setState({ refresh: false });
      clearTimeout(tm);
    }
  }

  _onItemPress = (item) => {
    this.props.onItemPress && this.props.onItemPress(item);
  };

  _onListRefresh = () => {
    this.setState({ refresh: true });
    this.props.onListRefresh && this.props.onListRefresh();
  };

  _onEndReached = () => {
    this.props.onEndReached && this.props.onEndReached();
  };

  render() {
    return (
      <View style={styles.projectsCardsView}>
        <FlatList
          data={this.props.projects}
          renderItem={({ item }) => {
            return <ProjectCard onCardPress={this._onItemPress} project={item}/>;
          }}
          keyExtractor={item => 'x_' + item.id}
          onRefresh={this._onListRefresh}
          refreshing={this.state.refresh}
          onEndReached={this._onEndReached}
          onEndReachedThreshold={0.5}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  projectsCardsView: {
    marginBottom: 0, flex: 1, flexDirection: 'column',
  },
});

export default ProjectsList;
