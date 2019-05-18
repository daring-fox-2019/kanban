<template>
  <v-flex sm5>
    <v-form @submit.prevent="submit" v-model="form.valid" class="pa-5">
      <v-text-field
        v-model="form.title"
        :rules="form.titleRules"
        label="Title"
        outline
        required
      ></v-text-field>
      <v-textarea
        v-model="form.description"
        rows="3"
        outline
        name="description"
        label="Description"
      ></v-textarea>
      <v-text-field
        v-model="form.pic"
        label="PIC"
        outline
      ></v-text-field>
      <v-text-field
        v-model="form.point"
        label="Point"
        outline
      ></v-text-field>
      <v-layout justify-end row>
        <v-btn type="submit" color="brown">Submit <v-icon>send</v-icon></v-btn>
      </v-layout>
    </v-form>
  </v-flex>
</template>

<style scoped>
  form {
    background: rgba(255, 255, 255, 0.7);
    border-radius: 10px;
  }
</style>

<script>
import db from '@/api/firebase';
import Swal from 'sweetalert2';

export default {
  name: 'kanbanForm',
  data() {
    return {
      form: {
        valid: false,
        title: '',
        titleRules: [
          v => !!v || 'Title is required',
        ],
        text: '',
        pic: '',
        point: 0,
      },
    };
  },
  methods: {
    submit() {
      const { title, description, pic } = this.form;
      const point = Number(this.form.point);
      const createdAt = new Date();
      const status = 'BackLog';

      db
        .collection('tasks')
        .add({
          title, description, point, pic, createdAt, status,
        })
        // eslint-disable-next-line
        .then((docRef) => {
          Swal.fire({
            position: 'top',
            type: 'success',
            title: 'Todo added to backlog',
            showConfirmButton: false,
            timer: 1500,
          });
          // console.log('Document written with ID: ', docRef.id);
          this.reset();
          this.$emit('toggleShow');
        })
        .catch((err) => {
          Swal.fire({
            position: 'top',
            type: 'error',
            title: 'Oww it happened from us :(',
            showConfirmButton: false,
            timer: 1500,
          });
          console.error('Error addding document:', err);
        });
    },
    reset() {
      // Reset our form values
      this.form.title = '';
      this.form.description = '';
      this.form.point = 0;
      this.form.pic = '';
    },
  },
};
</script>
