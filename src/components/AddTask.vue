<template>
      <v-card>
        <v-layout class='title' blue-grey darken-2 white--text pa-3>
            Add New Task
            <v-spacer></v-spacer>
            <v-icon dark @click="$emit('close')">
                close
            </v-icon>
        </v-layout>
            <v-form @submit.prevent="addTask" ref='addForm' v-model='valid'>
                <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                    <v-flex xs12>
                        <v-text-field label="Title" hint="Task Title" v-model="task.title" :rules="titleRules" required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-textarea
                            v-model="task.description"
                            auto-grow
                            box
                            label="Description"
                        ></v-textarea>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field :rules="pointRules" label="Point" v-model="task.point" required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field label="Assigned To" hint="Person responsible" v-model="task.assigned_to" required></v-text-field>
                    </v-flex>
                    </v-layout>
                </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="$emit('closeForm')">Close</v-btn>
                    <v-btn color="blue darken-1" flat type='submit'>Save</v-btn>
                </v-card-actions>
            </v-form>
      </v-card>
</template>

<script>
export default {
    props: ['close','task'],
    data() {
        return {
            valid: false,
            titleRules: [
                v => !!v || 'Title is required'
            ],
            pointRules: [
                v => !!v || 'point is required',
                v => /^[0-9]+$/.test(v) || 'point must be a number'
            ],
        }
    },
    methods: {
        closeForm() {
            this.$refs.addForm.reset()
            this.$emit('close')
        },
        addTask() {
            if(this.$refs.addForm.validate()) {
                this.$emit('save')
                this.closeForm()
            }
        }
    }
}
</script>

<style scoped>
.title {
    font-size: 10px;
    border-bottom: 1px solid rgb(235, 235, 235);
}

</style>
