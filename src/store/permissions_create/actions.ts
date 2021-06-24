import { api } from '@/api';
import { ActionContext } from 'vuex';
import { IPermissionCreate } from '@/interfaces';
import { State } from '../state';
import { PermissionCreateState } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { commitSetPermissionsCreate, commitSetPermissionCreate } from './mutations';
import { dispatchCheckApiError } from '../main/actions';
import { commitAddNotification, commitRemoveNotification } from '../main/mutations';

type MainContext = ActionContext<PermissionCreateState, State>;

export const actions = {
    async actionCreatePermission(context: MainContext, payload: IPermissionCreate) {
        try {
            const loadingNotification = { content: 'saving', showProgress: true };
            commitAddNotification(context, loadingNotification);
            const response = (await Promise.all([
                api.createPermission(context.rootState.main.token, payload),
                await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
            ]))[0];
            commitSetPermissionCreate(context, response.data);
            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, { content: 'User successfully created', color: 'success' });
        } catch (error) {
            await dispatchCheckApiError(context, error);
        }
    },
};

const { dispatch } = getStoreAccessors<PermissionCreateState, State>('');

export const dispatchCreatePermission = dispatch(actions.actionCreatePermission);

