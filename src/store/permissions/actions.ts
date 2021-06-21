import { api } from '@/api';
import { ActionContext } from 'vuex';
import { IPermission } from '@/interfaces';
import { State } from '../state';
import { PermissionState } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { commitSetPermissions, commitSetPermission } from './mutations';
import { dispatchCheckApiError } from '../main/actions';
import { commitAddNotification, commitRemoveNotification } from '../main/mutations';

type MainContext = ActionContext<PermissionState, State>;

export const actions = {
    async actionGetPermissions(context: MainContext) {
        try {
            const response = await api.getPermissions(context.rootState.main.token);
            if (response) {
                commitSetPermissions(context, response.data);
            }
        } catch (error) {
            await dispatchCheckApiError(context, error);
        }
    },
};

const { dispatch } = getStoreAccessors<PermissionState, State>('');

export const dispatchGetPermissions = dispatch(actions.actionGetPermissions);
