/**
 * created by musta at 9/19/2019
 */

import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ProjectCard from './ProjectCard';

interface Project {
  id: number;
  title: string;
  description: string;
  total: number;
  done: number;
}

const ProjectsList = ({ projects }: { projects: Project[] }) => {
  return (
    <View style={styles.projectsCardsView}>
      <FlatList
        data={projects}
        renderItem={({ item }) => {
          console.log(item);
          return <ProjectCard project={item}/>;
        }}
        keyExtractor={item => 'x_' + item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  projectsCardsView: {
    marginBottom: 20, flex: 1, flexDirection: 'column',
  },
});

export default ProjectsList;
