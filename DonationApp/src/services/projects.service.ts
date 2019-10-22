import { requestFactory } from '../utils';
import { Pagination, Project, ProjectsWithPagination } from '../types';
import { apiConstants } from '../constants';

export default class ProjectsService {
  public static async getDonationProjects(localLang: string, categoryId?: number, pageNumber?: number): Promise<ProjectsWithPagination> {
    const request = requestFactory.get(apiConstants.PROJECTS_BY_STATUS, {
      status: apiConstants.PROJECTS_STATUS_DONATION,
      category_id: categoryId,
      locale: localLang,
      page: pageNumber,
    });
    return await ProjectsService._controlProjectsRequest(request);
  }

  public static async getExecutionProjects(localLang: string, categoryId?: number, pageNumber?: number): Promise<ProjectsWithPagination> {
    const request = requestFactory.get(apiConstants.PROJECTS_BY_STATUS, {
      status: apiConstants.PROJECT_STATUS_EXECUTION,
      category_id: categoryId,
      locale: localLang,
      page: pageNumber,
    });
    return await ProjectsService._controlProjectsRequest(request);
  }

  public static async getFinishedProjects(localLang: string, categoryId?: number, pageNumber?: number): Promise<ProjectsWithPagination> {
    const request = requestFactory.get(apiConstants.PROJECTS_BY_STATUS, {
      status: apiConstants.PROJECT_STATUS_FINISHED,
      category_id: categoryId,
      locale: localLang,
      page: pageNumber,
    });
    return await ProjectsService._controlProjectsRequest(request);
  }

  public static async getProjectById(projectId: number, localLang: string): Promise<Project> {
    try {
      const res = await requestFactory.get(`${apiConstants.PROJECT_BY_ID}/${projectId}`, {
        locale: localLang,
      });
      if (res) {
        const { data: responseData } = res;
        const { data, meta } = responseData;
        const projects = ProjectsService.mapResponseToProjectList(data);
        return projects[0];
      } else {
        throw new Error('Unexpected Error, Check Your Internet Connection or communicate with support!');
      }
    } catch (e) {
      throw new Error('Check Your Internet Connection! ' + e.data);
    }
  }

  public static async getRelatedProjects(relatedToType: string, relatedToId: number, localLang: string, pageNumber?: number): Promise<ProjectsWithPagination> {
    const request = requestFactory.get(apiConstants.RELATED_PROJECTS, {
      [relatedToType]: relatedToId,
      locale: localLang,
      page: pageNumber,
    });
    return await ProjectsService._controlProjectsRequest(request);
  }

  public static async getProjectCategories(localLang: string) {
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
      throw new Error('Check Your Internet Connection! ' + e.data || e.message);
    }
  }

  public static async donateForProject(donationData): Promise<string> {
    try {
      const res = await requestFactory.post(apiConstants.DONATE, donationData);
      if (res) {
        const { data: responseData } = res;
        const { data, meta } = responseData;
        const { message } = data;
        return message;
      } else {
        throw new Error('Unexpected Error, Check Your Internet Connection or communicate with support!');
      }
    } catch (e) {
      throw new Error('Check Your Internet Connection! ' + e.data || e.message);
    }
  };

  private static async _controlProjectsRequest(request?) {
    try {
      const res = await request;
      if (res) {
        const { data: responseData } = res;
        const { data, meta } = responseData;
        const projects = ProjectsService.mapResponseToProjectList(data);
        const pagination = ProjectsService.mapResponseToPagination(meta);
        return { projects, pagination };
      } else {
        throw new Error('Unexpected Error, Check Your Internet Connection or communicate with support!');
      }
    } catch (e) {
      throw new Error('Check Your Internet Connection! ' + e.data || e.message);
    }
  }

  private static mapResponseToProjectList(data): Project[] {
    return data ? data.map((item): Project => ({
      id: item.id,
      name: item.name,
      description: item.description,
      country: item.country || 'مصر',
      cause: item.cause,
      cost: item.cost,
      collectedDonation: item.collected,
      isCostCollectedDone: item.cost <= item.collected,
      isExecutionDone: !!item.end_at,
      village: {
        id: item.village_id,
        name: item.village || 'Cairo',
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
  }

  private static mapResponseToPagination = (meta): Pagination => {
    return meta ? {
      count: meta.pagination.count,
      page: meta.pagination.current_page,
      countPerPage: meta.pagination.per_page,
      totalCount: meta.pagination.total,
      totalPages: meta.pagination.total_pages,
    } : null;
  };
}