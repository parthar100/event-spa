/**
 * Vue is a modern JavaScript library for building interactive web interfaces
 * using reactive data binding and reusable components. Vue's API is clean
 * and simple, leaving you to focus on building your next great project.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import Moment from 'moment';
import MomentTimezone from 'moment-timezone';
import { extendMoment } from 'moment-range';
import draggable from 'vuedraggable';
import {
  Input,
  Loading,
  DatePicker,
  Dialog,
  Notification,
  MessageBox,
  TimeSelect
} from 'element-ui';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';

MomentTimezone.tz.setDefault('UTC');
window.moment = extendMoment(Moment);
locale.use(lang);
Vue.use(VueRouter);
Vue.use(Input);
Vue.use(Loading.directive);
Vue.use(DatePicker);
Vue.use(Dialog);
Vue.use(TimeSelect);
Vue.use(draggable);
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$loading = Loading.service;
Vue.prototype.$notify = Notification;

/**
 * We'll register a HTTP interceptor to attach the "CSRF" header to each of
 * the outgoing requests issued by this application. The CSRF middleware
 * included with Laravel will automatically verify the header's value.
 */
Vue.prototype.$http = axios;
Vue.prototype.$http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
Vue.prototype.$http.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET,POST,DELETE,UPDATE,OPTIONS,HEAD,PUT,Access-Control-Allow-Origin';
Vue.prototype.$http.defaults.headers.common['X-CSRF-TOKEN'] = '';
Vue.prototype.$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
