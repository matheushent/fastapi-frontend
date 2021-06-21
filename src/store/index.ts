import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';

import { mainModule } from './main';
import { State } from './state';
import { adminModule } from './admin';
import { applicationModule } from './applications';
import { permissionModule } from './permissions';

Vue.use(Vuex);

const storeOptions: StoreOptions<State> = {
  modules: {
    main: mainModule,
    admin: adminModule,
    application: applicationModule,
    permission: permissionModule,
  },
};

export const store = new Vuex.Store<State>(storeOptions);

export default store;
