<template>
  <div>
    <v-toolbar light>
      <v-toolbar-title>
        Manage Permissions
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" to="/main/admin/permissions/create">Create Permission</v-btn>
    </v-toolbar>
    <v-data-table :headers="headers" :items="permissions">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.resource_name }}</td>
        <td>{{ props.item.acl }}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Store } from 'vuex';
import { IPermission } from '@/interfaces';
import { readAdminPermissions } from '@/store/permissions/getters';
import { dispatchGetPermissions } from '@/store/permissions/actions';

@Component
export default class AdminPermissions extends Vue {
  public headers = [
    {
      text: 'Resource Name',
      sortable: true,
      value: 'resource_name',
      align: 'left',
    },
    {
      text: 'ACL',
      sortable: true,
      value: 'acl',
      align: 'left',
    },
  ];
  get permissions() {
    return readAdminPermissions(this.$store);
  }

  public async mounted() {
    await dispatchGetPermissions(this.$store);
  }
}
</script>
