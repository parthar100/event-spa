<template>
  <div class="container">
   <div class="calendar-base">
      <div class="year">Event Calendar For This Week</div>
      <div class="triangle-left"></div>
      <div class="triangle-right"></div>
      <hr class="month-line" />
      <div class="num-dates">
         <div class="first-week">
         <list-of-date v-for="(days, index) in currentWeekList"
          :key="index"
          :days="days"
          :viewEvent="viewEvent"
          :index="index"
          :deleteEvent="deleteEvent"></list-of-date>
         </div>
         <div>
         <draggable
            v-model="eventForDrag"
            element="ul"
            @end="moveEvents">
            <event-for-drag v-for="(events, index) in currentWeekList"
            :key="index"
            :index="index"
            :events="events"
            ></event-for-drag>
            </draggable>
         </div>
      </div>
   </div>
   <el-dialog
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose"
      :show-close="closeModal"
      :close-on-click-modal="closeModal"
      :close-on-press-escape="closeModal">
    <add-events
      :handleEventData="handleEventData"
      :selectedStartDate="selectedStartDate"
      :selectedEndDate="selectedEndDate"
      :selectedStartTime="selectedStartTime"
      :selectedEndTime="selectedEndTime"
      :eventTitle="eventTitle"
      :eventDescription="eventDescription"
      :mode="mode"
      :saveEvent="saveEvent"
      :validationError="validationError"></add-events>
    </el-dialog>
   </div>
</template>
<style src="../../../assets/css/events/event.css"></style>
<script>
import {getCurrentWeek, validateEventData} from '@/store/modules/Event/helpers';
const ListOfDate = () => import('@/components/partials/Events/ListOfDate');
const AddEvents = () => import('@/components/partials/Events/AddEvents');
const EventForDrag = () => import('@/components/partials/Events/EventForDrag');
import EventStore from '@/store/modules/Event';
import { addStoreModule } from '@/utils/Functions';
import { mapGetters } from 'vuex';
import Draggable from 'vuedraggable';

export default {
  name: 'Events',
  beforeCreate () {
    addStoreModule.call(this, 'EventStore', EventStore);
  },
  data () {
    return {
      dialogVisible: false,
      selectedEventIndex: 0,
      mode: '',
      validationError: false,
      closeModal: false,
      eventForDrag: [],
      dateChanged: false
    };
  },
  mounted () {
    this.eventForDrag = this.getEventList();
  },
  components: {
    ListOfDate,
    AddEvents,
    Draggable,
    EventForDrag
  },
  computed: {
    ...mapGetters({
      eventDetails: 'getEventDetails',
      eventSaved: 'getEventSaved'
    }),
    currentWeekList () {
      return this.eventDetails || [];
    },
    getDetailsEvent () {
      return this.eventDetails && this.eventDetails[this.selectedEventIndex] || {};
    },
    selectedStartDate () {
      return this.getDetailsEvent &&
      this.getDetailsEvent.events &&
      this.getDetailsEvent.events.start &&
      this.getDetailsEvent.events.start.date || '';
    },
    selectedEndDate () {
      return this.getDetailsEvent &&
      this.getDetailsEvent.events &&
      this.getDetailsEvent.events.end &&
      this.getDetailsEvent.events.end.date || '';
    },
    selectedStartTime () {
      return this.getDetailsEvent &&
      this.getDetailsEvent.events &&
      this.getDetailsEvent.events.start &&
      this.getDetailsEvent.events.start.time || '';
    },
    selectedEndTime () {
      return this.getDetailsEvent &&
      this.getDetailsEvent.events &&
      this.getDetailsEvent.events.end &&
      this.getDetailsEvent.events.end.time || '';
    },
    eventTitle () {
      return this.getDetailsEvent &&
      this.getDetailsEvent.events &&
      this.getDetailsEvent.events.event &&
      this.getDetailsEvent.events.event.title || '';
    },
    eventDescription () {
      return this.getDetailsEvent &&
      this.getDetailsEvent.events &&
      this.getDetailsEvent.events.event &&
      this.getDetailsEvent.events.event.description || '';
    }
  },
  methods: {
    viewEvent (index, mode) {
      this.closeModal = false;
      if (mode === 'view') {
        this.closeModal = true;
      }
      this.selectedEventIndex = index
      this.mode = mode;
      this.$store.dispatch('viewEvent', {
        index: index,
        data: this.getDetailsEvent
      }).then(() => {
        this.validationError = false;
        this.dialofToggle();
      });
    },
    handleClose () {
      this.dialofToggle();
    },
    dialofToggle () {
      this.dialogVisible = !this.dialogVisible;
    },
    getEventList () {
      this.$store.dispatch('eventCalendar', {
        data: getCurrentWeek()
      });
    },
    handleEventData (data) {
      this.dateChanged = data.child === 'date' ? true : false;
      this.$store.dispatch('setEventStore', {
        events: data,
        index: this.selectedEventIndex
      });
    },
    saveEvent (mode) {
      let eventData = this.getDetailsEvent.events;
      this.validationError = true;
      if (validateEventData(eventData)) {
        this.$alert('Some of the required fields are missing', 'Error', {
          confirmButtonText: 'OK',
        });
        return false;
      }
      this.$store.dispatch('saveEvent', {
        data: this.getDetailsEvent.events,
        index: this.selectedEventIndex,
        mode,
        dateChanged: this.dateChanged
      }).then(() => {
        let msg = 'Event has been saved successfully';
        let type = 'Success';
        if (this.eventSaved) {
          this.dateChanged = false;
          this.validationError = false;
          this.dialofToggle();
        } else {
          msg = 'Selected date is not belongs to your calendar. Please choose some other date';
          type = 'Error';
        }
        this.$alert(msg, type, {
          confirmButtonText: 'OK',
        });
      });
    },
    deleteEvent (index) {
      this.$confirm('Are you sure you want to delete this event?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('deleteEvent', {
          index
        });
      }).catch(() => {
        console.log('Do Nothing');
      });
    },
    moveEvents (evt) {
      let newIndex = evt.newIndex;
      let oldIndex = evt.oldIndex;
      this.$store.dispatch('moveEvents', {
        newIndex,
        oldIndex
      });
    }
  }
}
</script>
