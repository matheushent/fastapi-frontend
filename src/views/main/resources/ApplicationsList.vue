<template>
  <div>
    <v-toolbar light>
      <v-toolbar-title>
        Manage Applications
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" to="/main/resources/applications/create">Create Application</v-btn>
    </v-toolbar>
    <v-data-table :headers="headers" :items="applications">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.application_name }}</td>
        <td>{{ props.item.application_owner_id }}</td>
        <td class="justify-center layout px-0">
          <v-tooltip top>
            <span>Edit</span>
            <v-btn slot="activator" flat :to="{name: 'main-resources-applications-edit', params: {id: props.item.id}}">
              <v-icon>edit</v-icon>
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
import { IApplication } from '@/interfaces';
import { readResourcesApplications } from '@/store/applications/getters';
import { dispatchGetApplications } from '@/store/applications/actions';

@Component
export default class ApplicationsList extends Vue {
  public headers = [
    {
      text: 'ID',
      sortable: true,
      value: 'id',
      align: 'left',
    },
    {
      text: 'Application Name',
      sortable: true,
      value: 'application_name',
      align: 'left',
    },
    {
      text: 'Application Owner ID',
      sortable: true,
      value: 'application_owner_id',
      align: 'left',
    },
    {
      text: 'Actions',
      value: 'id',
    },
  ];
  get applications() {
    return readResourcesApplications(this.$store);
  }

  public async mounted() {
    await dispatchGetApplications(this.$store);
  }
}
</script>
