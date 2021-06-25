import { IJobScript } from '@/interfaces';
import { JobScriptState } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';

export const mutations = {
    setJobScripts(state: JobScriptState, payload: IJobScript[]) {
        state.jobscripts = payload;
    },
    setJobScript(state: JobScriptState, payload: IJobScript) {
        const jobscripts = state.jobscripts.filter((jobscript: IJobScript) => jobscript.id !== payload.id);
        jobscripts.push(payload);
        state.jobscripts = jobscripts;
    },
};

const { commit } = getStoreAccessors<JobScriptState, State>('');

export const commitSetJobScript = commit(mutations.setJobScript);
export const commitSetJobScripts = commit(mutations.setJobScripts);
