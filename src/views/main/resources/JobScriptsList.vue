<template>
  <div>
    <v-toolbar light>
      <v-toolbar-title>
        Manage JobScripts
      </v-toolbar-title>
    </v-toolbar>
    <v-data-table :headers="headers" :items="jobscripts">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.job_script_name }}</td>
        <td>{{ props.item.job_script_owner_id }}</td>
        <td>{{ props.item.application_id }}</td>
        <td class="justify-center layout px-0">
          <v-tooltip top>
            <span>Edit</span>
            <v-btn slot="activator" flat :to="{name: 'main-resources-job-scripts-edit', params: {id: props.item.id}}">
              <v-icon>edit</v-icon>
            </v-btn>
          </v-tooltip>
          <v-tooltip top>
            <span>Delete</span>
            <v-btn slot="activator" flat @click="deleteJobScript(props.item.id)">
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
import { IJobScript } from '@/interfaces';
import { readResourcesJobScripts } from '@/store/jobscripts/getters';
import { dispatchGetJobScripts, dispatchDeleteJobScript } from '@/store/jobscripts/actions';

@Component
export default class JobScriptsList extends Vue {
  public headers = [
    {
      text: 'ID',
      sortable: true,
      value: 'id',
      align: 'left',
    },
    {
      text: 'JobScript Name',
      sortable: true,
      value: 'job_script_name',
      align: 'left',
    },
    {
      text: 'JobScript Owner ID',
      sortable: true,
      value: 'job_script_owner_id',
      align: 'left',
    },
    {
      text: 'Application ID',
      sortable: true,
      value: 'application_id',
      align: 'left',
    },
    {
      text: 'Actions',
      sortable: false,
      value: 'id',
      align: 'center',
    },
  ];
  get applications() {
    return readResourcesJobScripts(this.$store);
  }

  public async mounted() {
    await dispatchGetJobScripts(this.$store);
  }

  public async deleteJobScript(id) {
    const payload = {id};
    await dispatchDeleteJobScript(this.$store, payload);
    this.$router.go(0);
  }
}
</script>
