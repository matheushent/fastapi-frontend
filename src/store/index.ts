import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';

import { mainModule } from './main';
import { State } from './state';
import { adminModule } from './admin';
import { applicationModule } from './applications';
import { jobscriptModule } from './jobscripts';
import { jobsubmissionModule } from './jobsubmissions';
import { permissionModule } from './permissions';
import { permissionCreateModule } from './permissions_create';

Vue.use(Vuex);

const storeOptions: StoreOptions<State> = {
  modules: {
    main: mainModule,
    admin: adminModule,
    application: applicationModule,
    permission: permissionModule,
    permissionCreate: permissionCreateModule,
    jobscript: jobscriptModule,
    jobsubmission: jobsubmissionModule,
  },
};

export const store = new Vuex.Store<State>(storeOptions);

export default store;
