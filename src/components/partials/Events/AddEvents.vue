<template>
   <div>
      Start Date:
      <el-date-picker
        v-model="startDate"
        type="date"
        :clearable="false"
        @change="handleChange($event, 'start', 'date')"
        :readonly="canAbleToEditDate"
        :disabled="canAbleToEditDetails"
        :value-format="format"></el-date-picker>
      <span v-if="validationError && !startDate" style="color:red">Required</span>
      Time:
      <el-time-select
         arrow-control
         v-model="startTime"
         placeholder="HH:MM"
         :picker-options="{
         start: '00:00',
         step: '00:15',
         end: '23:59'
         }"
         @change="handleChange($event, 'start', 'time')"
         :disabled="canAbleToEditDetails"
         :reaonly="true"><br/>
      </el-time-select>
      <span v-if="validationError && !startTime" style="color:red">Required</span>
      <br/><br/>
      End Date:
      <el-date-picker
         v-model="endDate"
         type="date"
         :clearable="false"
         @change="handleChange($event, 'end', 'start')"
         :disabled="canAbleToEditDetails"
         :readonly="true"
         :value-format="format"></el-date-picker>
      <span v-if="validationError && !endDate" style="color:red">Required</span>
      Time:
      <el-time-select
         arrow-control
         v-model="endTime"
         :clearable="false"
         placeholder="HH:MM"
         :picker-options="{
         start: '00:00',
         step: '00:15',
         end: '23:59'
         }"
         @change="handleChange($event, 'end', 'time')"
         :disabled="canAbleToEditDetails"
         :reaonly="true">
      </el-time-select>
      <span v-if="validationError && !endTime" style="color:red">Required</span>
      <br/><br/>
      Event Title:
      <el-input
         :placeholder="placeholder"
         :value="eventTitle"
         :type="type"
         @input="handleChange($event, 'event', 'title')"
         :disabled="canAbleToEditDetails">
      </el-input>
      <span v-if="validationError && !eventTitle" style="color:red">Required</span>
      <br/><br/>
      Event Description:
      <el-input
         :placeholder="placeholder"
         :value="eventDescription"
         :type="type"
         @input="handleChange($event, 'event', 'description')"
         :disabled="canAbleToEditDetails">
      </el-input> <br/><br/>
      <div style="float:right;" v-if="mode !== 'view'"><a href="javascript:void(0)" @click="saveEvent(mode)">Save</a></div>
   </div>
</template>

<script>

export default {
  name: 'AddEvents',
  data () {
    return {
      endTime: this.selectedEndTime,
      format: 'yyyy-MM-dd',
      placeholder: 'Add Event',
      type: 'text',
      value: '',
      startDate: this.selectedStartDate,
      endDate: this.selectedEndDate,
      startTime: this.selectedStartTime
    }
  },
  watch: {
    'selectedStartDate': function (date) {
      this.startDate = date;
    },
    'selectedEndDate': function (date) {
      this.endDate = date;
    },
    'selectedStartTime': function (time) {
      this.startTime = time;
    },
    'selectedEndTime': function (time) {
      this.endTime = time;
    }
  },
  computed:{
    canAbleToEditDate () {
      return (this.mode === 'add' || this.mode === 'view') ? true: false;
    },
    canAbleToEditDetails () {
      return (this.mode === 'view') ? true: false;
    }
  },
  props: {
    handleEventData: {required: true, type: Function},
    selectedStartDate: {required: true, type: String, default: ''},
    selectedEndDate: {required: true, type: String, default: ''},
    selectedStartTime: {required: true, type: String, default: ''},
    selectedEndTime: {required: true, type: String, default: ''},
    eventTitle: {required: true, type: String, default: ''},
    eventDescription: {required: true, type: String, default: ''},
    mode: {required: true, type: String, default: ''},
    saveEvent: {required: true, type: Function},
    validationError: {required: true, type: Boolean, default: false}
  },
  methods: {
    handleChange (event, parent, child) {
      let value = event;
      this.handleEventData({
        value: value,
        parent,
        child
      });
    }
  }
}
</script>
