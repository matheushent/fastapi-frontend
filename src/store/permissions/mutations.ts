import { IPermission } from '@/interfaces';
import { PermissionState } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';

export const mutations = {
    setPermissions(state: PermissionState, payload: IPermission[]) {
        state.permissions = payload;
    },
    setPermission(state: PermissionState, payload: IPermission) {
        const permissions = state.permissions.filter((permission: IPermission) => permission.id !== payload.id);
        permissions.push(payload);
        state.permissions = permissions;
    },
};

const { commit } = getStoreAccessors<PermissionState, State>('');

export const commitSetPermission = commit(mutations.setPermission);
export const commitSetPermissions = commit(mutations.setPermissions);
