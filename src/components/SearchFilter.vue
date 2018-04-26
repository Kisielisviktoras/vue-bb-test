<template>
  <div class="block">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple block">
          <remote-select url="http://localhost:8080/api/lookup"
                         lookup-name="NotificationReason"
                         :multiple=true
                         :collapse-limit=3
                         placeholder="Notification Reason"
                         v-on:input="updateValue($event)">
          </remote-select>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple block">
          <remote-select url="http://localhost:8080/api/lookup"
                         lookup-name="NotificationStatus"
                         :multiple=true
                         placeholder="Notification Status"
                         v-on:input="updateValue($event)">
          </remote-select>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple block">
          <remote-select url="http://localhost:8080/api/lookup"
                         lookup-name="NotificationType"
                         :multiple=true
                         placeholder="Notification Type"
                         v-on:input="updateValue($event)">
          </remote-select>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple block">
          <el-date-picker style="width: 100%"
                          v-model="notificationDateRange"
                          v-on:input="updateValue('notificationDateRange', $event)"
                          type="daterange"
                          :clearable="false"
                          align="right"
                          unlink-panels
                          range-separator="To"
                          start-placeholder="Start date"
                          end-placeholder="End date"
                          :picker-options="pickerOptions" :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style>
  .el-row {
    margin-bottom: 20px;

  &
  :last-child {
    margin-bottom: 0;
  }

  }
  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>

<script>

  import RemoteSelect from "./ui/RemoteSelect";

  export default {
    name: 'SearchFilter',
    components: {RemoteSelect},
    props: {
      notificationReasonOptions: {
        type: Array,
        required: true
      },
      notificationStatusOptions: {
        type: Array,
        required: true
      },
      notificationTypeOptions: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        notificationReasonSelection: [],
        notificationStatusSelection: [],
        notificationTypeSelection: [],
        notificationDateRange: [
          new Date(new Date().setHours(0, 0, 0, 0)),
          new Date(new Date().setHours(23, 59, 59, 0))
        ],
        pickerOptions: {
          shortcuts: [{
            text: 'Last week',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: 'Last month',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: 'Last 3 months',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      }
    },
    methods: {
      updateValue: function (payload) {
        this.$emit('searchCriteriaUpdate', payload);
      }
    }
  }
</script>
