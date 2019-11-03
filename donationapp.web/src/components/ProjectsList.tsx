import React, { FC, Fragment } from 'react';
import { CardGroup, Pagination } from 'semantic-ui-react';
import ProjectCard from './ProjectCard';
import { Project } from '../types';

interface Props {
  projects?: Project[];
}

const ProjectsList: FC<Props> = ({ projects }: Props) => {
  return (
    <Fragment>
      <CardGroup doubling stackable itemsPerRow={3}>
        {projects.map((item: Project, idx: number) =>
          <ProjectCard key={idx} project={item}/>,
        )}
      </CardGroup>
      <Pagination className={'my-3'} defaultActivePage={1} boundaryRange={3} totalPages={5}/>
    </Fragment>
  );
};

export default ProjectsList;