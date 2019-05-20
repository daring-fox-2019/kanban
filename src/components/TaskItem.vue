<template>
  <div
    class="box is-radiusless has-background-light mb24"
    @mouseover="handleMouseEnter"
    @mouseleave="handleMouseLeave">
    <div
      style="position: relative; top: -16px; right: -16px;"
      v-if="isMouseEnter">
      <div class="buttons" style="position: absolute; top: 0; right: 0;">
        <b-button
          type="is-text"
          class="is-radiusless"
          icon-right="close"
          @click="$parent.$emit('click-delete-task', task)"></b-button>
      </div>
    </div>
    <div class="mb32">
      <p class="has-text-weight-semibold has-text-grey">Task</p>
      <div class="is-divider mt0 mb8"></div>
      <p>{{ task.title }}</p>
    </div>
    <div class="mb32">
      <p class="has-text-weight-semibold has-text-grey">Assigned to</p>
      <div class="is-divider mt0 mb8"></div>
      <p>{{ task.assigned_to }}</p>
    </div>
    <div class="buttons mt32">
      <b-button
        :type="`${nextStatus.color}`"
        class="is-fullwidth"
        v-if="isNotDone(task)"
        @click="$parent.$emit('click-update-status', {task, status: nextStatus})">
        <span class="is-capitalized">
          {{ nextStatus.text }}
        </span>
      </b-button>
      <b-button
        :type="`${prevStatus.color}`"
        class="is-fullwidth"
        v-if="isNotBacklog(task)"
        @click="$parent.$emit('click-update-status', {task, status: prevStatus})"
      >
        Move back
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true
    },
    nextStatus: {
      type: Object,
      required: false
    },
    prevStatus: {
      type: Object,
      required: false
    }
  },
  data: function () {
    return {
      isMouseEnter: false
    }
  },
  methods: {
    handleMouseEnter: function () {
      this.isMouseEnter = true
    },
    handleMouseLeave: function () {
      this.isMouseEnter = false
    },
    isNotDone: function (task) {
      return task.status !== 'done'
    },
    isNotBacklog: function (task) {
      return task.status !== 'backlog'
    }
  }
}
</script>

<style>

</style>
