import { getApi, putApi } from '@/utils/request';
import { CommonRequest, PageResponse } from '@/utils/type';

export interface ProjectData {
  id: number;
  keyword?: string;
  leader: string;
  lesseeId?: number;
  name: string;
  type?: string;
  updateTime?: string;
  createTime?: string;
  description?: string;
}

export function getProject<T extends CommonRequest>(param: T) {
  return getApi<PageResponse<ProjectData>>('project', param);
}

export function getProjectByKey(param: string) {
  return getApi<ProjectData>(`project/${param}`);
}

export function updateProject(id: number, project: ProjectData) {
  return putApi<ProjectData>(`project/${id}`, project, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
}
