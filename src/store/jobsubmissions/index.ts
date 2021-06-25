import { mutations } from './mutations';
import { getters } from './getters';
import { actions } from './actions';
import { JobSubmissionState } from './state';

const defaultState: JobSubmissionState = {
  jobsubmissions: [],
};

export const jobsubmissionModule = {
  state: defaultState,
  mutations,
  actions,
  getters,
};
