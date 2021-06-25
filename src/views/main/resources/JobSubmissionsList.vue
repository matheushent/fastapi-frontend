<template>
  <div>
    <v-toolbar light>
      <v-toolbar-title>
        Manage JobSubmissions
      </v-toolbar-title>
    </v-toolbar>
    <v-data-table :headers="headers" :items="jobsubmissions">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.job_submission_name }}</td>
        <td>{{ props.item.job_submission_owner_id }}</td>
        <td>{{ props.item.job_script_id }}</td>
        <td>{{ props.item.slum_job_id }}</td>
        <td class="justify-center layout px-0">
          <v-tooltip top>
            <span>Edit</span>
            <v-btn slot="activator" flat :to="{name: 'main-resources-job-submissions-edit',
              params: {id: props.item.id}}">
              <v-icon>edit</v-icon>
            </v-btn>
          </v-tooltip>
          <v-tooltip top>
            <span>Delete</span>
            <v-btn slot="activator" flat @click="deleteJobSubmission(props.item.id)">
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
import { IJobSubmission } from '@/interfaces';
import { readResourcesJobSubmissions } from '@/store/jobsubmissions/getters';
import { dispatchGetJobSubmissions, dispatchDeleteJobSubmission } from '@/store/jobsubmissions/actions';

@Component
export default class JobSubmissionsList extends Vue {
  public headers = [
    {
      text: 'ID',
      sortable: true,
      value: 'id',
      align: 'left',
    },
    {
      text: 'JobSubmission Name',
      sortable: true,
      value: 'job_submission_name',
      align: 'left',
    },
    {
      text: 'JobSubmission Owner ID',
      sortable: true,
      value: 'job_submission_owner_id',
      align: 'left',
    },
    {
      text: 'JobScript ID',
      sortable: true,
      value: 'job_script_id',
      align: 'left',
    },
    {
      text: 'Slurm Job ID',
      sortable: true,
      value: 'slurm_job_id',
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
    return readResourcesJobSubmissions(this.$store);
  }

  public async mounted() {
    await dispatchGetJobSubmissions(this.$store);
  }

  public async deleteJobSubmission(id) {
    const payload = {id};
    await dispatchDeleteJobSubmission(this.$store, payload);
    this.$router.go(0);
  }
}
</script>
