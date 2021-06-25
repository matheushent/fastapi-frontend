<template>
  <v-container fluid>
    <v-card class="ma-3 pa-3">
      <v-card-title primary-title>
        <div class="headline primary--text">Edit JobSubmission</div>
      </v-card-title>
      <v-card-text>
        <template>
          <v-form
            v-model="valid"
            ref="form"
            lazy-validation
          >
            <v-text-field
              label="Application Name"
              v-model="applicationName"
              required
            ></v-text-field>
            <v-text-field
              label="Application Description"
              v-model="applicationDescription"
            ></v-text-field>
          </v-form>
        </template>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="cancel">Cancel</v-btn>
        <v-btn @click="reset">Reset</v-btn>
        <v-btn
          @click="submit"
          :disabled="!valid"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IApplication, IApplicationUpdate } from '@/interfaces';
import { dispatchGetApplications, dispatchUpdateApplication } from '@/store/applications/actions';
import { readResourceOneApplication } from '@/store/applications/getters';

@Component
export default class EditApplication extends Vue {
  public valid = true;
  public applicationName: string = '';
  public applicationDescription: string = '';

  public async mounted() {
    await dispatchGetApplications(this.$store);
    this.reset();
  }

  public reset() {
    this.applicationName = '';
    this.applicationDescription = '';
    this.$validator.reset();
    if (this.application) {
      this.applicationName = this.application.application_name;
      this.applicationDescription = this.application.application_description;
    }
  }

  public cancel() {
    this.$router.back();
  }

  public async submit() {
    if (await this.$validator.validateAll()) {
      const updatedApplication: IApplicationUpdate = {};
      if (this.applicationName) {
        updatedApplication.application_name = this.applicationName;
      }
      if (this.applicationDescription) {
        updatedApplication.application_description = this.applicationDescription;
      }
      await dispatchUpdateApplication(this.$store, { id: this.application!.id, application: updatedApplication });
      this.$router.push('/main/resources/applications');
    }
  }

  get application() {
    return readResourceOneApplication(this.$store)(+this.$router.currentRoute.params.id);
  }
}
</script>
