<template>
  <div style="float:left; width: 140px;">
  {{whichDay}}<br/><br/>
  <div>{{whichDate}}</div><br/>
  <span v-if="!events">
    <a href="javascript:void(0);" @click="viewEvent(index, 'add')">Add</a>
  </span>
  <span v-else>
    <a href="javascript:void(0);" @click="viewEvent(index, 'view')">View</a>
    <a href="javascript:void(0);" @click="viewEvent(index, 'edit')">Edit</a>
    <a href="javascript:void(0);" @click="deleteEvent(index)">Del</a>
  </span>
  </div>
</template>

<script>
export default {
  name: 'ListOfDate',
  props: {
    days: {required: true, type: Object, default: () => {}},
    viewEvent: {required: true, type: Function},
    index: {required: true, type: Number, default: 0},
    deleteEvent: {required: true, type: Function}
  },
  computed: {
    whichDate () {
      return this.days && this.days.formatedDate || '';
    },
    whichDay () {
      return this.days && this.days.day || '';
    },
    eventDate () {
      return this.days && this.days.date || '';
    },
    events () {
      return this.days && this.days.events || '';
    }
  }
}
</script>
