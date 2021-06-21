import { PermissionState } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';

export const getters = {
    adminPermissions: (state: PermissionState) => state.permissions,
    adminOnePermission: (state: PermissionState) => (permissionId: number) => {
        const filteredPermissions = state.permissions.filter((permission) => permission.id === permissionId);
        if (filteredPermissions.length > 0) {
            return { ...filteredPermissions[0] };
        }
    },
};

const { read } = getStoreAccessors<PermissionState, State>('');

export const readAdminOnePermission = read(getters.adminOnePermission);
export const readAdminPermissions = read(getters.adminPermissions);
