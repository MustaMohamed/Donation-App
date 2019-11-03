import React, { FC, Fragment } from 'react';
import { CardGroup, Dropdown, Message, Pagination as SUIPagination } from 'semantic-ui-react';
import ProjectCard from './ProjectCard';
import { ICountryFilter, IRangeFilter, Pagination, Project } from '../types';
import { FormattedMessage, useIntl } from 'react-intl';
import { TranslationConstants } from '../constants';

interface Props {
  projects?: Project[];
  pagination?: Pagination;
  countiesFilterOptions?: ICountryFilter[];
  onCountryFilterChange?: Function;
  rangesFilterOptions?: IRangeFilter[];
  onRangeFilterChange?: Function;
  onPageChange?: Function;
}

const ProjectsList: FC<Props> = ({
                                   projects, pagination,
                                   countiesFilterOptions,
                                   onCountryFilterChange,
                                   rangesFilterOptions,
                                   onRangeFilterChange,
                                   onPageChange,
                                 }: Props) => {
  const intl = useIntl();
  return (
    <Fragment>
      {countiesFilterOptions &&
      <Dropdown selection search className={'mr-2 mt-2 mb-4'}
                placeholder={intl.formatMessage({ id: TranslationConstants.ProjectsListFilterCountriesPlaceHolder })}
                noResultsMessage={intl.formatMessage({ id: TranslationConstants.ProjectsListFilterNoResult })}
                onChange={(e, data) => onCountryFilterChange(data)}
                options={countiesFilterOptions.map((item, idx) => ({ key: item.id, text: item.value, value: idx }))}
      />}
      {rangesFilterOptions &&
      <Dropdown selection search className={'ml-2 mt-2 mb-4'}
                onChange={(e, data) => onRangeFilterChange(data)}
                placeholder={intl.formatMessage({ id: TranslationConstants.ProjectsListFilterRangesPlaceHolder })}
                noResultsMessage={intl.formatMessage({ id: TranslationConstants.ProjectsListFilterNoResult })}
                options={rangesFilterOptions.map((item, idx) => ({ key: item.id, text: item.value, value: idx }))}
      />}
      {projects && projects.length ? <CardGroup doubling stackable itemsPerRow={3}>
        {projects.map((item: Project, idx: number) =>
          <ProjectCard key={idx} project={item}/>,
        )}
      </CardGroup> : <Message>
        <Message.Header><FormattedMessage id={TranslationConstants.ProjectsListMessagesNoCardsTitle}/></Message.Header>
        <p>
          <FormattedMessage id={TranslationConstants.ProjectsListMessagesNoCardsBody}/>
        </p>
      </Message>}
      {pagination && pagination.totalPages > 1 && <SUIPagination className={'my-3'}
                                                                 onPageChange={(e, data) => onPageChange(data)}
                                                                 defaultActivePage={1}
                                                                 boundaryRange={3}
                                                                 totalPages={pagination.totalPages || 0}/>}
    </Fragment>
  );
};

export default ProjectsList;