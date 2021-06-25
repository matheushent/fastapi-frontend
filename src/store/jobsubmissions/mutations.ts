import { IJobSubmission } from '@/interfaces';
import { JobSubmissionState } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';

export const mutations = {
    setJobSubmissions(state: JobSubmissionState, payload: IJobSubmission[]) {
        state.jobsubmissions = payload;
    },
    setJobSubmission(state: JobSubmissionState, payload: IJobSubmission) {
        const jobsubmissions = state.jobsubmissions.filter((jobsubmission: IJobSubmission) =>
                                                           jobsubmission.id !== payload.id);
        jobsubmissions.push(payload);
        state.jobsubmissions = jobsubmissions;
    },
};

const { commit } = getStoreAccessors<JobSubmissionState, State>('');

export const commitSetJobSubmission = commit(mutations.setJobSubmission);
export const commitSetJobSubmissions = commit(mutations.setJobSubmissions);
