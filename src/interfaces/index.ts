export interface IUserProfile {
    email: string;
    is_active: boolean;
    is_superuser: boolean;
    full_name: string;
    id: number;
    principals: string;
}

export interface IUserProfileUpdate {
    email?: string;
    full_name?: string;
    password?: string;
    is_active?: boolean;
    is_superuser?: boolean;
    principals?: string;
}

export interface IUserProfileCreate {
    email: string;
    full_name?: string;
    password?: string;
    is_active?: boolean;
    is_superuser?: boolean;
    principals?: string;
}

export interface IApplication {
    application_name: string;
    id: number;
    application_owner_id: number;
    application_description: string;
    application_file: string;
    application_config: string;
}

export interface IApplicationUpdate {
    application_name?: string;
    id?: number;
    application_owner_id?: number;
    application_description?: string;
    application_file?: string;
    application_config?: string;
}

export interface IPermissionCreate {
    resource_name: string;
    id?: number;
    action: string;
    principal: string;
    permission: string;
}

export interface IPermission {
    resource_name: string;
    id: number;
    acl: string;
}
