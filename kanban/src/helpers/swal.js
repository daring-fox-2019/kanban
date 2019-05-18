import Swal from 'sweetalert2';

export default {
  confirmation() {
    return Swal.fire({
      title: 'Move this task?',
      text: 'You can move this task anytime you want!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, move it!',
    });
  },
  deletion() {
    return Swal.fire({
      title: 'Delete this task?',
      text: "You can't retrieve this data anymore after deleteion!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete it!',
    });
  },
};
