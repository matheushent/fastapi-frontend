import { IPermissionCreate } from '@/interfaces';
import { PermissionCreateState } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';

export const mutations = {
    setPermissionsCreate(state: PermissionCreateState, payload: IPermissionCreate[]) {
        state.permissionsCreate = payload;
    },
    setPermissionCreate(state: PermissionCreateState, payload: IPermissionCreate) {
        const permissionsCreate = state.permissionsCreate
        .filter((permissionCreate: IPermissionCreate) => permissionCreate.id !== payload.id);
        permissionsCreate.push(payload);
        state.permissionsCreate = permissionsCreate;
    },
};

const { commit } = getStoreAccessors<PermissionCreateState, State>('');

export const commitSetPermissionCreate = commit(mutations.setPermissionCreate);
export const commitSetPermissionsCreate = commit(mutations.setPermissionsCreate);
