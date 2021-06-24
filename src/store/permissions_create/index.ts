import { mutations } from './mutations';
import { getters } from './getters';
import { actions } from './actions';
import { PermissionCreateState } from './state';

const defaultState: PermissionCreateState = {
  permissionsCreate: [],
};

export const permissionCreateModule = {
  state: defaultState,
  mutations,
  actions,
  getters,
};
