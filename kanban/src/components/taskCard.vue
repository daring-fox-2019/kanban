<template>
<div>
  <div class="card mb-4" style="width: 300px;" >
    <div class="card-body">
      <div class="card col-12 mb-4" v-for="(item, index) in task" :key="index">
        <div class="card-header">{{item.title}}</div>
        <div class="card-body">
            <!-- {{item.id}} -->
          <p>Description : {{item.description}}</p>
          <p>Point: {{item.point}}</p>
          <p>Assigned: {{item.assigned}}</p>
          <p>Status: {{item.status}}</p>
        </div>
        <div id="classFooter" class="card-footer">
          <button class="btn btn-primary" 
          @click.prevent="prev(item.id)" v-show="status !== 'Back-Log'">Prev</button>
          <button class="btn btn-danger"
          @click.prevent="deleteTask(item.id)">Delete</button>
          <button class="btn btn-primary" 
          @click.prevent="next(item.id)" v-show="status !== 'Done'">Next</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import swal from 'vue-sweetalert2'
import { db } from '@/firebase/firebase'
export default {
    name :  'taskCard',
    props : ['task','status'],
    methods: {
        deleteTask(id) {
            this.$swal({
            title: 'Are you sure?',
            text: 'Once deleted, you will not be able to recover this imaginary file!',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
            })
            .then(willDelete => {
                if (willDelete) {
                return db.collection('tasks')
                    .doc(id)
                    .delete();
                }
                return null;
            })
            .then((data) => {
                if (data !== null) {
                this.$swal('Poof! Your imaginary file has been deleted!', {
                    icon: 'success',
                });
                } else {
                this.$swal('Deletion canceled!');
                }
            })
            .catch((error) => {
                console.log('Error deleting file:', error);
            });
        },

        prev(id) {
            const docRef = db.collection('tasks').doc(id);
            console.log(this.status);
            let prevStat;
            if(this.status === 'Back-Log'){
                console.log('masuk');
                prevStat = 'Back-Log'
            }else if(this.status === 'To-Do'){
                prevStat = 'Back-Log'
            }else if(this.status === 'Doing'){
                prevStat = 'To-Do'
            }else{
                prevStat = 'Doing'
            }
            

            return db.runTransaction(transaction => transaction.get(docRef).then((sfDoc) => {
                if (!sfDoc.exists) {
                console.log('Document not exist!');
                }
                transaction.update(docRef, { status: prevStat });
            }))
                .then(() => {
                console.log('Transaction commited');
                })
                .catch((error) => {
                console.log('Transaction error:', error);
                });
            },

        next(id) {
            const docRef = db.collection('tasks').doc(id);

            console.log(this.status);
            let nextStat;
            if(this.status === 'Back-Log'){
                console.log('masuk');
                nextStat = 'To-Do'
            }else if(this.status === 'To-Do'){
                nextStat = 'Doing'
            }else if(this.status === 'Doing'){
                nextStat = 'Done'
            }else{
                nextStat = 'Done'
            }

            return db.runTransaction(transaction => transaction.get(docRef).then((sfDoc) => {
                if (!sfDoc.exists) {
                console.log('Document not exist!');
                }
                transaction.update(docRef, { status: nextStat });
            }))
                .then(() => {
                console.log('Transaction commited');
                })
                .catch((error) => {
                console.log('Transaction error:', error);
                });
            },
  },
    created(){

    }
}
</script>