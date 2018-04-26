<template>
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <search-filter v-bind:notificationReasonOptions="search.options.notificationReasons"
                     v-bind:notificationStatusOptions="search.options.notificationStatus"
                     v-bind:notificationTypeOptions="search.options.notificationTypes"
                     v-on:searchCriteriaUpdate="updateSearchCriteria($event)">
      </search-filter>
    </el-header>

    <el-main>
      <notification-table v-bind:notificationReasons="search.criteria.notificationReason"
                          v-bind:notificationStatuses="search.criteria.notificationStatus"
                          v-bind:notificationTypes="search.criteria.notificationType"
                          v-bind:notificationFrom="search.criteria.notificationFrom"
                          v-bind:notificationUntil="search.criteria.notificationUntil">
      </notification-table>
    </el-main>
  </el-container>
</template>

<script>
  import SearchFilter from "./SearchFilter";
  import NotificationTable from "./NotificationTable";

  export default {
    name: 'Element',
    components: {NotificationTable, SearchFilter},
    data() {
      return {
        search: {
          criteria: {
            notificationReason: [],
            notificationStatus: [],
            notificationType: [],
            //today
            notificationFrom: new Date(new Date().setHours(0,0,0,0)),
            notificationUntil: new Date(new Date().setHours(23,59,59,0))
          },
          options: {
            notificationReasons: [
              {label: 'Debt reminder', value: 'DebtReminder'},
              {label: 'Payment Reminder', value: 'PaymentReminder'}
            ],
            notificationTypes: [
              {label: 'Email', value: 'EMAIL'},
              {label: 'Sms', value: 'SMS'},
              {label: 'Letter', value: 'LETTER'}
            ],
            notificationStatus: [
              {label: 'Sent', value: 'SENT'},
              {label: 'Failed', value: 'FAILED'}
            ]
          }
        },
      }
    },
    methods: {
      updateSearchCriteria(event) {
        switch (event.source) {
          case "NotificationReason" :
            this.search.criteria.notificationReason = event.values;
            break;
          case "NotificationStatus" :
            this.search.criteria.notificationStatus = event.values;
            break;
          case "NotificationType" :
            this.search.criteria.notificationType = event.values;
            break;
          case "notificationDateRange" :
            this.search.criteria.notificationFrom = event.values[0];
            this.search.criteria.notificationUntil = event.values[1];
            break;
        }
      }
    },
  }
</script>

<style>
  .el-header {
    position: relative;
  }
</style>
