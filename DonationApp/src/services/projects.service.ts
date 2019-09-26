import { requestFactory } from '../utils';
import { Pagination, Project, ProjectResponse } from '../types';

export const getDonationProjects = async (): Promise<ProjectResponse> => {
  const { data } = await requestFactory.get('projects-by-status', { status: 'donation' });
  const projects = mapResponseToProjectList(data.data);
  const pagination = mapResponseToPagination(data.meta);
  return { projects, pagination };
};

export const getExecutionProjects = async (): Promise<ProjectResponse> => {
  const { data } = await requestFactory.get('projects-by-status', { status: 'execution' });
  const projects = mapResponseToProjectList(data.data);
  const pagination = mapResponseToPagination(data.meta);
  return { projects, pagination };
};

export const getDoneProjects = async (): Promise<ProjectResponse> => {
  const { data } = await requestFactory.get('projects-by-status', { status: 'finished' });
  const projects = mapResponseToProjectList(data.data);
  const pagination = mapResponseToPagination(data.meta);
  return { projects, pagination };
};

export const getAllProjects = async (): Promise<any> => {
  return requestFactory.all([getDonationProjects(), getExecutionProjects(), getDoneProjects()]);
};

const mapResponseToProjectList = (data): Project[] => {
  return data.map((item): Project => ({
    id: item.id,
    name: item.name,
    description: item.description,
    cause: item.cause,
    cost: item.cost,
    collectedDonation: item.collected,
    isCostCollectedDone: item.cost === item.collected,
    isExecutionDone: !!item.end_at,
    village: {
      id: item.village_id,
      name: item.village,
    },
    projectCategory: {
      id: item.project_category_id,
      category: item.project_category,
    },
    startAt: item.start_at,
    endAt: item.end_at,
    expectedEndAt: item.expected_date,
    executionDuration: item.execution_period,
    image: 'https://placekitten.com/640/360',
  }));
};

const mapResponseToPagination = (meta): Pagination => {
  return {
    count: meta.pagination.count,
    page: meta.pagination.current_page,
    countPerPage: meta.pagination.per_page,
    totalCount: meta.pagination.total,
    totalPages: meta.pagination.total_pages,
  };
};