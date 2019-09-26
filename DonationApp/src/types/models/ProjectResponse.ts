import { Pagination } from './Pagination';
import { Project } from './Project';

export class ProjectResponse {
  projects: Project[];
  pagination: Pagination;
}