import { api } from '@/api';
import { ActionContext } from 'vuex';
import { IApplicationUpdate } from '@/interfaces';
import { State } from '../state';
import { ApplicationState } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { commitSetApplications, commitSetApplication } from './mutations';
import { dispatchCheckApiError } from '../main/actions';
import { commitAddNotification, commitRemoveNotification } from '../main/mutations';

type MainContext = ActionContext<ApplicationState, State>;

export const actions = {
    async actionGetApplications(context: MainContext) {
        try {
            const response = await api.getApplications(context.rootState.main.token);
            if (response) {
                commitSetApplications(context, response.data);
            }
        } catch (error) {
            await dispatchCheckApiError(context, error);
            commitAddNotification(context, { content: 'You don\'t have permission to view applications',
                                  color: 'failure'});
        }
    },
    async actionUpdateApplication(context: MainContext, payload: { id: number, application: IApplicationUpdate }) {
        try {
            const loadingNotification = { content: 'saving', showProgress: true };
            commitAddNotification(context, loadingNotification);
            const response = (await Promise.all([
                api.updateApplication(context.rootState.main.token, payload.id, payload.application),
                await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
            ]))[0];
            commitSetApplication(context, response.data);
            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, { content: 'Application successfully updated', color: 'success' });
        } catch (error) {
            await dispatchCheckApiError(context, error);
            commitAddNotification(context, { content: 'You don\'t have permission to edit applications',
                                  color: 'failure'});
        }
    },
    async actionDeleteApplication(context: MainContext, payload: {id: string}) {
        try {
            const response = await api.deleteApplication(context.rootState.main.token, payload);
        } catch (error) {
            await dispatchCheckApiError(context, error);
            commitAddNotification(context, { content: 'You don\'t have permission to delete applications',
                                  color: 'failure'});
        }
    },
};

const { dispatch } = getStoreAccessors<ApplicationState, State>('');

export const dispatchGetApplications = dispatch(actions.actionGetApplications);
export const dispatchUpdateApplication = dispatch(actions.actionUpdateApplication);
export const dispatchDeleteApplication = dispatch(actions.actionDeleteApplication);
