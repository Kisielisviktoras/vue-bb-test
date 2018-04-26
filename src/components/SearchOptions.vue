<template>
  <div>
    <el-tree
      :data="treeData"
      show-checkbox
      default-expand-all
      node-key="id"
      ref="tree"
      highlight-current
      :props="defaultProps">
    </el-tree>

    <div class="buttons">
      <el-button @click="getCheckedNodes">get by node</el-button>
      <el-button @click="getCheckedKeys">get by key</el-button>
      <!--<el-button @click="setCheckedNodes">set by node</el-button>-->
      <!--<el-button @click="setCheckedKeys">set by key</el-button>-->
      <el-button @click="resetChecked">reset</el-button>
    </div>
  </div>
</template>


<script>
  export default {
    name: 'SearchTree',
    data() {
      return {
        searchOptions: {
          notificationReasons: [
            { label: 'Payment Reminder', id :'PaymentReminder' },
            { label: 'Debt reminder', id: 'DebtReminder' }
          ],
          notificationTypes: [
            { label: 'Email', id: 'EMAIL' },
            { label: 'Sms', id: 'SMS' },
            { label: 'Letter', id: 'LETTER' }
          ],
          notificationStatus: [
            { label: 'Sent', id: 'SENT' } ,
            { label: 'Failed', id: 'FAILED' }
          ]
        },
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    methods: {
      getCheckedNodes() {
        console.log(this.$refs.tree.getCheckedNodes());
      },
      getCheckedKeys() {
        console.log(this.$refs.tree.getCheckedKeys());
      },
      setCheckedNodes() {
        this.$refs.tree.setCheckedNodes([{
          id: 5,
          label: 'Level two 2-1'
        }, {
          id: 9,
          label: 'Level three 1-1-1'
        }]);
      },
      setCheckedKeys() {
        this.$refs.tree.setCheckedKeys([3]);
      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      }
    },
    created() {
      this.treeData = [{
        id: 1,
        label: 'Notification Reasons',
        children: this.searchOptions.notificationReasons
      }, {
        id: 2,
        label: 'Notification Type',
        children: this.searchOptions.notificationTypes
      }, {
        id: 3,
        label: 'Notification Status',
        children: this.searchOptions.notificationStatus
      }]
      console.log(this.treeData);
    }
  };
</script>
