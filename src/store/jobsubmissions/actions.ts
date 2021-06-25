import { api } from '@/api';
import { ActionContext } from 'vuex';
import { IJobScriptUpdate } from '@/interfaces';
import { State } from '../state';
import { JobSubmissionState } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { commitSetJobSubmissions, commitSetJobSubmission } from './mutations';
import { dispatchCheckApiError } from '../main/actions';
import { commitAddNotification, commitRemoveNotification } from '../main/mutations';

type MainContext = ActionContext<JobSubmissionState, State>;

export const actions = {
    async actionGetJobSubmissions(context: MainContext) {
        try {
            const response = await api.getJobSubmissions(context.rootState.main.token);
            if (response) {
                commitSetJobSubmissions(context, response.data);
            }
        } catch (error) {
            await dispatchCheckApiError(context, error);
            commitAddNotification(context, { content: 'You don\'t have permission to view job submissions',
                                  color: 'failure'});
        }
    },
    async actionUpdateJobSubmission(context: MainContext, payload:
                                    { id: number, jobsubmission: IJobScriptUpdate }) {
        try {
            const loadingNotification = { content: 'saving', showProgress: true };
            commitAddNotification(context, loadingNotification);
            const response = (await Promise.all([
                api.updateJobSubmission(context.rootState.main.token, payload.id, payload.jobsubmission),
                await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
            ]))[0];
            commitSetJobSubmission(context, response.data);
            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, { content: 'JobSubmission successfully updated', color: 'success' });
        } catch (error) {
            await dispatchCheckApiError(context, error);
            commitAddNotification(context, { content: 'You don\'t have permission to edit job submissions',
                                  color: 'failure'});
        }
    },
    async actionDeleteJobSubmission(context: MainContext, payload: {id: string}) {
        try {
            const response = await api.deleteJobSubmission(context.rootState.main.token, payload);
        } catch (error) {
            await dispatchCheckApiError(context, error);
            commitAddNotification(context, { content: 'You don\'t have permission to delete job submissions',
                                  color: 'failure'});
        }
    },
};

const { dispatch } = getStoreAccessors<JobSubmissionState, State>('');

export const dispatchGetJobSubmissions = dispatch(actions.actionGetJobSubmissions);
export const dispatchUpdateJobSubmission = dispatch(actions.actionUpdateJobSubmission);
export const dispatchDeleteJobSubmission = dispatch(actions.actionDeleteJobSubmission);
