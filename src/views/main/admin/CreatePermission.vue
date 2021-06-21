<template>
  <v-container fluid>
    <v-card class="ma-3 pa-3">
      <v-card-title primary-title>
        <div class="headline primary--text">Create Permission</div>
      </v-card-title>
      <v-card-text>
        <template>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-select label="Resource Name" v-model="resource" required :items="resourcesItems"></v-select>
            <v-select label="Action" v-model="action" required :items="actionsItems"></v-select>
            <v-text-field label="Principal" v-model="principal" required></v-text-field>
            <v-select label="Permission" v-model="permission" required :items="permissionsItems"></v-select>
          </v-form>
        </template>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="cancel">Cancel</v-btn>
        <v-btn @click="reset">Reset</v-btn>
        <v-btn @click="submit" :disabled="!valid">
              Save
            </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {
  IUserProfile,
  IUserProfileUpdate,
  IUserProfileCreate,
} from '@/interfaces';
import { dispatchGetUsers, dispatchCreateUser } from '@/store/admin/actions';


@Component
export default class CreatePermission extends Vue {
  public valid = false;
  public resource: string = '';
  public action: string = '';
  public principal: string = '';
  public permission: string = '';
  public actionsItems: string[] = ['Allow', 'Deny'];
  public resourcesItems: string[] = ['Application', 'JobScript', 'JobSubmission'];
  public permissionsItems: string[] = ['Create', 'View', 'Update', 'Delete'];


  public reset() {
    this.$validator.reset();
  }

  public cancel() {
    this.$router.back();
  }

  public async submit() {
      this.$router.push('/main/admin/users');
  }
}
</script>

