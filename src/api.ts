import axios from 'axios';
import * as FormData from 'form-data';
import { apiUrl } from '@/env';
import {
  IApplication, IApplicationUpdate, IJobScript, IJobScriptUpdate, IJobSubmission, IJobSubmissionUpdate,
  IPermission, IPermissionCreate, IUserProfile, IUserProfileUpdate, IUserProfileCreate,
} from './interfaces';

function authHeaders(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

function authHeadersForm(token: string) {
  return {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
}

export const api = {
  async logInGetToken(username: string, password: string) {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    return axios.post(`${apiUrl}/token/`, params);
  },
  async getMe(token: string) {
    return axios.get<IUserProfile>(`${apiUrl}/user/me`, authHeaders(token));
  },
  async updateMe(token: string, data: IUserProfileUpdate) {
    return axios.put<IUserProfile>(`${apiUrl}/user/me`, data, authHeaders(token));
  },
  async getUsers(token: string) {
    return axios.get<IUserProfile[]>(`${apiUrl}/users/`, authHeaders(token));
  },
  async updateUser(token: string, userId: number, data: IUserProfileUpdate) {
    return axios.put(`${apiUrl}/users/${userId}`, data, authHeaders(token));
  },
  async createUser(token: string, data: IUserProfileCreate) {
    return axios.post(`${apiUrl}/users/`, data, authHeaders(token));
  },
  async passwordRecovery(email: string) {
    return axios.post(`${apiUrl}/api/v1/password-recovery/${email}`);
  },
  async resetPassword(password: string, token: string) {
    return axios.post(`${apiUrl}/api/v1/reset-password/`, {
      new_password: password,
      token,
    });
  },
  async getPermissions(token: string) {
    return axios.get<IPermission[]>(`${apiUrl}/permissions/all`, authHeaders(token));
  },
  async deletePermissions(token: string, payload) {
    return axios.delete(`${apiUrl}/permissions/${payload.id}?permission_query=` + payload.resourceName,
                        authHeaders(token));
  },
  async createPermission(token: string, data: IPermissionCreate) {
    const bodyRequest = new FormData();
    bodyRequest.append('acl', data.action + '|' + data.principal + '|' + data.permission);
    return axios.post(`${apiUrl}/permissions/?permission_query=` + data.resource_name, bodyRequest,
                      authHeaders(token));
  },
  async updateApplication(token: string, applicationId: number, data: IApplicationUpdate) {
    const formData = new FormData();
    for ( const property of Object.keys(data) ) {
      formData.append(property, data[property]);
    }
    return axios.put(`${apiUrl}/applications/${applicationId}`, formData, authHeadersForm(token));
  },
  async getApplications(token: string) {
    return axios.get<IApplication[]>(`${apiUrl}/applications/?all=true`, authHeaders(token));
  },
  async deleteApplication(token: string, payload) {
    return axios.delete(`${apiUrl}/applications/${payload.id}`, authHeaders(token));
  },
  async updateJobScript(token: string, jobScriptId: number, data: IJobScriptUpdate) {
    const formData = new FormData();
    for ( const property of Object.keys(data) ) {
      formData.append(property, data[property]);
    }
    return axios.put(`${apiUrl}/job-scripts/${jobScriptId}`, formData, authHeadersForm(token));
  },
  async getJobScripts(token: string) {
    return axios.get<IJobScript[]>(`${apiUrl}/job-scripts/?all=true`, authHeaders(token));
  },
  async deleteJobScript(token: string, payload) {
    return axios.delete(`${apiUrl}/job-scripts/${payload.id}`, authHeaders(token));
  },
  async updateJobSubmission(token: string, jobSubmissionId: number, data: IJobSubmissionUpdate) {
    const formData = new FormData();
    for ( const property of Object.keys(data) ) {
      formData.append(property, data[property]);
    }
    return axios.put(`${apiUrl}/job-submission/${jobSubmissionId}`, formData, authHeadersForm(token));
  },
  async getJobSubmissions(token: string) {
    return axios.get<IJobSubmission[]>(`${apiUrl}/job-submissions/?all=true`, authHeaders(token));
  },
  async deleteJobSubmission(token: string, payload) {
    return axios.delete(`${apiUrl}/job-submissions/${payload.id}`, authHeaders(token));
  },
};
