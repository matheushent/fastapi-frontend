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
        <td class="justify-center layout px-0">
          <v-tooltip top>
            <span>Delete</span>
            <v-btn slot="activator" flat @click="deletePermission(props.item.id, props.item.resource_name)">
              <v-icon>delete</v-icon>
            </v-btn>
          </v-tooltip>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Store } from 'vuex';
import { IPermission } from '@/interfaces';
import { readAdminPermissions } from '@/store/permissions/getters';
import { dispatchGetPermissions, dispatchDeletePermissions } from '@/store/permissions/actions';

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
    {
      text: 'Delete',
      align: 'center',
      sortable: false,
    },
  ];
  get permissions() {
    return readAdminPermissions(this.$store);
  }

  public async mounted() {
    await dispatchGetPermissions(this.$store);
  }
  public async deletePermission(id, resourceName) {
    const payload = {id, resourceName};
    await dispatchDeletePermissions(this.$store, payload);
    this.$router.go(0);
  }
}
</script>
