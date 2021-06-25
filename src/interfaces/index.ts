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

export interface IJobScript {
    id: number;
    job_script_name: string;
    job_script_description: string;
    job_script_data_as_string: string;
    job_script_owner_id: number;
    application_id: number;
}

export interface IJobScriptUpdate {
    id?: number;
    job_script_name?: string;
    job_script_description?: string;
    job_script_data_as_string?: string;
    job_script_owner_id?: number;
    application_id?: number;
}

export interface IJobSubmission {
    id: number;
    job_submission_name: string;
    job_submission_description: string;
    job_script_id: number;
    job_submission_owner_id: number;
    slurm_job_id: number;
}

export interface IJobSubmissionUpdate {
    id?: number;
    job_submission_name?: string;
    job_submission_description?: string;
    job_script_id?: number;
    job_submission_owner_id?: number;
    slurm_job_id?: number;
}
