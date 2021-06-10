import { ApplicationState } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';

export const getters = {
    resourceApplications: (state: ApplicationState) => state.applications,
    resourceOneApplication: (state: ApplicationState) => (applicationId: number) => {
        const filteredApplications = state.applications.filter((application) => application.id === applicationId);
        if (filteredApplications.length > 0) {
            return { ...filteredApplications[0] };
        }
    },
};

const { read } = getStoreAccessors<ApplicationState, State>('');

export const readResourceOneApplication = read(getters.resourceOneApplication);
export const readResourcesApplications = read(getters.resourceApplications);
