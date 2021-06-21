import { mutations } from './mutations';
import { getters } from './getters';
import { actions } from './actions';
import { PermissionState } from './state';

const defaultState: PermissionState = {
  permissions: [],
};

export const permissionModule = {
  state: defaultState,
  mutations,
  actions,
  getters,
};

