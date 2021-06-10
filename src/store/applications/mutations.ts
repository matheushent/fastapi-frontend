import { IApplication } from '@/interfaces';
import { ApplicationState } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';

export const mutations = {
    setApplications(state: ApplicationState, payload: IApplication[]) {
        state.applications = payload;
    },
    setApplication(state: ApplicationState, payload: IApplication) {
        const applications = state.applications.filter((application: IApplication) => application.id !== payload.id);
        applications.push(payload);
        state.applications = applications;
    },
};

const { commit } = getStoreAccessors<ApplicationState, State>('');

export const commitSetApplication = commit(mutations.setApplication);
export const commitSetApplications = commit(mutations.setApplications);
