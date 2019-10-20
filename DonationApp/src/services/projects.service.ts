import { requestFactory } from '../utils';
import { Pagination, Project, ProjectsWithPagination } from '../types';
import { apiConstants } from '../constants';

export const getDonationProjects = async (localLang: string, categoryId?: number, pageNumber?: number): Promise<ProjectsWithPagination> => {
  try {
    const res = await requestFactory.get(apiConstants.PROJECTS_BY_STATUS, {
      status: apiConstants.PROJECTS_STATUS_DONATION,
      category_id: categoryId,
      locale: localLang,
      page: pageNumber,
    });
    if (res) {
      const { data: responseData } = res;
      const { data, meta } = responseData;
      const projects = mapResponseToProjectList(data);
      const pagination = mapResponseToPagination(meta);
      return { projects, pagination };
    } else {
      throw new Error('Unexpected Error, Check Your Internet Connection or communicate with support!');
    }
  } catch (e) {
    console.log(e);
    throw new Error('Check Your Internet Connection! ' + e.data);
  }
};

export const getExecutionProjects = async (localLang: string, categoryId?: number, pageNumber?: number): Promise<ProjectsWithPagination> => {
  try {
    console.log('category Id => ', categoryId);
    const res = await requestFactory.get(apiConstants.PROJECTS_BY_STATUS, {
      status: apiConstants.PROJECT_STATUS_EXECUTION,
      category_id: categoryId,
      locale: localLang,
      page: pageNumber,
    });
    if (res) {
      const { data: responseData } = res;
      const { data, meta } = responseData;
      const projects = mapResponseToProjectList(data);
      const pagination = mapResponseToPagination(meta);
      return { projects, pagination };
    } else {
      throw new Error('Unexpected Error, Check Your Internet Connection or communicate with support!');
    }
  } catch (e) {
    console.log(e);
    throw new Error('Check Your Internet Connection! ' + e.data || e.message);
  }
};

export const getDoneProjects = async (localLang: string, categoryId?: number, pageNumber?: number): Promise<ProjectsWithPagination> => {
  try {
    const res = await requestFactory.get(apiConstants.PROJECTS_BY_STATUS, {
      status: apiConstants.PROJECT_STATUS_FINISHED,
      category_id: categoryId,
      locale: localLang,
      page: pageNumber,
    });
    if (res) {
      const { data: responseData } = res;
      const { data, meta } = responseData;
      const projects = mapResponseToProjectList(data);
      const pagination = mapResponseToPagination(meta);
      return { projects, pagination };
    } else {
      throw new Error('Unexpected Error, Check Your Internet Connection or communicate with support!');
    }
  } catch (e) {
    console.log(e);
    throw new Error('Check Your Internet Connection! ' + e.data);
  }
};

export const getProjectById = async (projectId: number, localLang: string): Promise<any> => {
  try {
    const res = await requestFactory.get(`${apiConstants.PROJECT_BY_ID}/${projectId}`, {
      locale: localLang,
    });
    console.log(res);
    const { data } = res;
    const projects = mapResponseToProjectList(data.data);
    return projects[0];
  } catch (e) {
    console.log(e);
    throw new Error('Check Your Internet Connection! ' + e.data);
  }
};

export const getAllProjects = async (): Promise<any> => {
  // return requestFactory.all([getDonationProjects(), getExecutionProjects(), getDoneProjects()]);
};

export const getRelatedProjects = async (relatedToType: string, relatedToId: number, localLang: string, pageNumber?: number): Promise<any> => {
  try {
    const res = await requestFactory.get(apiConstants.RELATED_PROJECTS, {
      [relatedToType]: relatedToId,
      locale: localLang,
      page: pageNumber,
    });
    if (res) {
      const { data: responseData } = res;
      const { data, meta } = responseData;
      const projects = mapResponseToProjectList(data);
      const pagination = mapResponseToPagination(meta);
      return { projects, pagination };
    } else {
      throw new Error('Unexpected Error, Check Your Internet Connection or communicate with support!');
    }
  } catch (e) {
    console.log(e);
    throw new Error('Check Your Internet Connection! ' + e.data);
  }
};

export const getProjectCategories = async (localLang: string) => {
  try {
    const res = await requestFactory.get(apiConstants.CATEGORIES, {
      locale: localLang,
    });
    if (res) {
      const { data: responseData } = res;
      const { data } = responseData;
      const categories = data.map(item => ({ name: item.name, id: item.id }));
      return categories;
    } else {
      throw new Error('Unexpected Error, Check Your Internet Connection or communicate with support!');
    }
  } catch (e) {
    console.log('from categories ! ', e);
    throw new Error('Check Your Internet Connection! ' + e.data);
  }
};

export const donateForProject = async (donationData): Promise<any> => {
  try {
    const res = await requestFactory.post(apiConstants.DONATE, donationData);
    console.log(res);
    const { data } = res;
    const { message } = data;
    return message;
  } catch (e) {
    console.log(e);
    throw new Error('Check Your Internet Connection! ' + e.data);
  }
};

const mapResponseToProjectList = (data): Project[] => {
  return data ? data.map((item): Project => ({
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
  })) : [];
};

const mapResponseToPagination = (meta): Pagination => {
  return meta ? {
    count: meta.pagination.count,
    page: meta.pagination.current_page,
    countPerPage: meta.pagination.per_page,
    totalCount: meta.pagination.total,
    totalPages: meta.pagination.total_pages,
  } : null;
};

export default {
  getDonationProjects,
  getExecutionProjects,
  getDoneProjects,
  getRelatedProjects,
  getAllProjects,
  donateForProject,
  getProjectCategories,
  getProjectById,
};