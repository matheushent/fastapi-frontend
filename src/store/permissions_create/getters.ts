import { PermissionCreateState } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';

export const getters = {
    adminPermissionsCreate: (state: PermissionCreateState) => state.permissionsCreate,
    adminOnePermissionCreate: (state: PermissionCreateState) => (permissionId: number) => {
        const filteredPermissions = state.permissionsCreate
        .filter((permissionCreate) => permissionCreate.id === permissionId);
        if (filteredPermissions.length > 0) {
            return { ...filteredPermissions[0] };
        }
    },
};

const { read } = getStoreAccessors<PermissionCreateState, State>('');

export const readAdminOnePermissionCreate = read(getters.adminOnePermissionCreate);
export const readAdminPermissionsCreate = read(getters.adminPermissionsCreate);
