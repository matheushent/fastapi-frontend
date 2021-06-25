import { JobSubmissionState } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';

export const getters = {
    resourceJobSubmissions: (state: JobSubmissionState) => state.jobsubmissions,
    resourceOneJobSubmission: (state: JobSubmissionState) => (jobSubmissionId: number) => {
        const filteredJobSubmissions = state.jobsubmissions
        .filter((jobsubmission) => jobsubmission.id === jobSubmissionId);
        if (filteredJobSubmissions.length > 0) {
            return { ...filteredJobSubmissions[0] };
        }
    },
};

const { read } = getStoreAccessors<JobSubmissionState, State>('');

export const readResourceOneJobSubmission = read(getters.resourceOneJobSubmission);
export const readResourcesJobSubmissions = read(getters.resourceJobSubmissions);
