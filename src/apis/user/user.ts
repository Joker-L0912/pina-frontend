import { getApi, postApi } from '@/utils/request';

export interface LoginRequestData {
  /** admin 或 editor */
  username: string;
  /** 密码 */
  password: string;
}

/**
 *
 * PinaUser
 */
export interface UserInfoResponse {
  /**
   * 删除标志（0代表存在 2代表删除）
   */
  delFlag?: string;
  /**
   * 用户邮箱
   */
  email?: string;
  /**
   * 用户ID
   */
  id?: number;
  /**
   * 密码
   */
  password?: string;
  /**
   * 手机号码
   */
  phonenumber?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 用户性别（0男 1女 2未知）
   */
  sex?: string;
  /**
   * 帐号状态（0正常 1停用）
   */
  status?: string;
  /**
   * 用户昵称
   */
  username: string;
}

/** 获取用户详情 */
export function getUserInfoApi() {
  return getApi<UserInfoResponse>('user/me');
}

export function loginApi(params: LoginRequestData) {
  return postApi<string>('user/session', params, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
}

export function getUserByName(param: string) {
  return getApi<UserInfoResponse[]>('/user', { name: param });
}
