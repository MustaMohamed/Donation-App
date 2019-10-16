import { requestFactory } from '../utils';
import { Pagination, Project, ProjectsWithPagination } from '../types';
import { apiConstants } from '../constants';

export const getDonationProjects = async (localLang: string, pageNumber?: number): Promise<ProjectsWithPagination> => {
  try {
    const { data } = await requestFactory.get(apiConstants.PROJECTS_BY_STATUS, {
      status: apiConstants.PROJECTS_STATUS_DONATION,
      locale: localLang,
      page: pageNumber,
    });
    const projects = mapResponseToProjectList(data.data);
    const pagination = mapResponseToPagination(data.meta);
    return { projects, pagination };
  } catch (e) {
    throw new Error('Check Your Internet Connection!' + e.errorMessage);
  }
};

export const getExecutionProjects = async (localLang: string, pageNumber?: number): Promise<ProjectsWithPagination> => {
  try {
    const { data } = await requestFactory.get(apiConstants.PROJECTS_BY_STATUS, {
      status: apiConstants.PROJECT_STATUS_EXECUTION,
      locale: localLang,
      page: pageNumber,
    });
    const projects = mapResponseToProjectList(data.data);
    const pagination = mapResponseToPagination(data.meta);
    return { projects, pagination };
  } catch (e) {
    throw new Error('Check Your Internet Connection!' + e.errorMessage);
  }
};

export const getDoneProjects = async (localLang: string, pageNumber?: number): Promise<ProjectsWithPagination> => {
  try {
    const { data } = await requestFactory.get(apiConstants.PROJECTS_BY_STATUS, {
      status: apiConstants.PROJECT_STATUS_FINISHED,
      locale: localLang,
      page: pageNumber,
    });
    const projects = mapResponseToProjectList(data.data);
    const pagination = mapResponseToPagination(data.meta);
    return { projects, pagination };
  } catch (e) {
    throw new Error('Check Your Internet Connection!' + e.errorMessage);
  }
};

export const getAllProjects = async (): Promise<any> => {
  return requestFactory.all([getDonationProjects(), getExecutionProjects(), getDoneProjects()]);
};

export const getRelatedProjects = async (relatedToType: string, relatedToId: number, localLang: string, pageNumber?: number): Promise<any> => {
  try {
    const { data } = await requestFactory.get(apiConstants.RELATED_PROJECTS, {
      [relatedToType]: relatedToId,
      locale: localLang,
      page: pageNumber,
    });
    const projects = mapResponseToProjectList(data.data);
    const pagination = mapResponseToPagination(data.meta);
    return { projects, pagination };
  } catch (e) {
    throw new Error('Check Your Internet Connection!' + e.errorMessage);
  }
};

export const getProjectCategories = async (localLang: string) => {
  // TODO: add get categories request
  return [{ name: 'A', id: 1 }, { name: 'B', id: 2 }, { name: 'C', id: 3 }];
  try {
    const { data } = await requestFactory.get(apiConstants.RELATED_PROJECTS, {
      locale: localLang,
    });
    const categories = data.data.map(item => ({ name: item.name, id: item.id }));
    return { categories };
  } catch (e) {
    throw new Error('Check Your Internet Connection!' + e.errorMessage);
  }
};

export const donateForProject = async (donationData): Promise<any> => {
  const res = await requestFactory.post(apiConstants.DONATE, donationData);
  const { message } = res.data;
  return message;
};

const mapResponseToProjectList = (data): Project[] => {
  return data.map((item): Project => ({
    id: item.id,
    name: item.name,
    description: item.description,
    cause: item.cause,
    cost: item.cost,
    collectedDonation: item.collected,
    isCostCollectedDone: item.cost <= item.collected,
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
    image: item.cover_photo || 'https://placekitten.com/640/360',
    gallery: ['https://placekitten.com/640/360', 'https://placekitten.com/640/360', 'https://placekitten.com/640/360'],
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

export default {
  getDonationProjects,
  getExecutionProjects,
  getDoneProjects,
  getRelatedProjects,
  getAllProjects,
  donateForProject,
  getProjectCategories,
};