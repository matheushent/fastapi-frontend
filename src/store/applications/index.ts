import { mutations } from './mutations';
import { getters } from './getters';
import { actions } from './actions';
import { ApplicationState } from './state';

const defaultState: ApplicationState = {
  applications: [],
};

export const applicationModule = {
  state: defaultState,
  mutations,
  actions,
  getters,
};
