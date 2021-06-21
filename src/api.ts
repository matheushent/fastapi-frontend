import axios from 'axios';
import * as FormData from 'form-data';
import { apiUrl } from '@/env';
import { IApplication, IApplicationUpdate, IPermission, IUserProfile, IUserProfileUpdate, IUserProfileCreate } from './interfaces';

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
  async getApplications(token: string) {
    return axios.get<IApplication[]>(`${apiUrl}/applications/`, authHeaders(token));
  },
  async getPermissions(token: string) {
    return axios.get<IPermission[]>(`${apiUrl}/permissions/all`, authHeaders(token));
  },
  async updateApplication(token: string, applicationId: number, data: IApplicationUpdate) {
    const formData = new FormData();
    for ( const property of Object.keys(data) ) {
      formData.append(property, data[property]);
    }
    return axios.put(`${apiUrl}/applications/${applicationId}`, formData, authHeadersForm(token));
  },
};
