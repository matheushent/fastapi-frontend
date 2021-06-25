import { api } from '@/api';
import { ActionContext } from 'vuex';
import { IApplicationUpdate, IJobScriptUpdate } from '@/interfaces';
import { State } from '../state';
import { JobScriptState } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { commitSetJobScripts, commitSetJobScript } from './mutations';
import { dispatchCheckApiError } from '../main/actions';
import { commitAddNotification, commitRemoveNotification } from '../main/mutations';

type MainContext = ActionContext<JobScriptState, State>;

export const actions = {
    async actionGetJobScripts(context: MainContext) {
        try {
            const response = await api.getJobScripts(context.rootState.main.token);
            if (response) {
                commitSetJobScripts(context, response.data);
            }
        } catch (error) {
            await dispatchCheckApiError(context, error);
            commitAddNotification(context, { content: 'You don\'t have permission to view job scripts',
                                  color: 'failure'});
        }
    },
    async actionUpdateJobScript(context: MainContext, payload: { id: number, jobscript: IJobScriptUpdate }) {
        try {
            const loadingNotification = { content: 'saving', showProgress: true };
            commitAddNotification(context, loadingNotification);
            const response = (await Promise.all([
                api.updateJobScript(context.rootState.main.token, payload.id, payload.jobscript),
                await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
            ]))[0];
            commitSetJobScript(context, response.data);
            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, { content: 'JobScript successfully updated', color: 'success' });
        } catch (error) {
            await dispatchCheckApiError(context, error);
            commitAddNotification(context, { content: 'You don\'t have permission to edit job scripts',
                                  color: 'failure'});
        }
    },
    async actionDeleteJobScript(context: MainContext, payload: {id: string}) {
        try {
            const response = await api.deleteJobScript(context.rootState.main.token, payload);
        } catch (error) {
            await dispatchCheckApiError(context, error);
            commitAddNotification(context, { content: 'You don\'t have permission to delete job scripts',
                                  color: 'failure'});
        }
    },
};

const { dispatch } = getStoreAccessors<JobScriptState, State>('');

export const dispatchGetJobScripts = dispatch(actions.actionGetJobScripts);
export const dispatchUpdateJobScript = dispatch(actions.actionUpdateJobScript);
export const dispatchDeleteJobScript = dispatch(actions.actionDeleteJobScript);
