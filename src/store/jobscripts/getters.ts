import { JobScriptState } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';

export const getters = {
    resourceJobScript: (state: JobScriptState) => state.jobscripts,
    resourceOneJobScript: (state: JobScriptState) => (jobScriptId: number) => {
        const filteredJobScripts = state.jobscripts.filter((jobscript) => jobscript.id === jobScriptId);
        if (filteredJobScripts.length > 0) {
            return { ...filteredJobScripts[0] };
        }
    },
};

const { read } = getStoreAccessors<JobScriptState, State>('');

export const readResourceOneJobScript = read(getters.resourceOneJobScript);
export const readResourcesJobScripts = read(getters.resourceJobScript);
