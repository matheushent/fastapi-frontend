import { mutations } from './mutations';
import { getters } from './getters';
import { actions } from './actions';
import { JobScriptState } from './state';

const defaultState: JobScriptState = {
  jobscripts: [],
};

export const jobscriptModule = {
  state: defaultState,
  mutations,
  actions,
  getters,
};
