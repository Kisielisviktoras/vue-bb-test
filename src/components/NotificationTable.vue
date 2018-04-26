<template>
  <div>
    <el-table
      :data="data"
      style="width: 100%"
      height="750"
      :row-class-name="tableRowClassName"
      :border=true>
      <el-table-column
        prop="reason"
        sortable
        label="Reason">
      </el-table-column>
      <el-table-column
        prop="type"
        label="Notification Type">
      </el-table-column>
      <el-table-column
        prop="sender"
        label="Sender">
      </el-table-column>
      <el-table-column
        prop="reciever"
        label="Reciever">
      </el-table-column>
      <el-table-column
        prop="status"
        sortable
        label="Delivery Status">
      </el-table-column>
      <el-table-column
        prop="content"
        label="Notification Content">
        <template slot-scope="scope">
          <el-button
            size="mini" type="primary" round
            @click="preview(scope.$index, scope.row)">Preview
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="sentDate"
        label="Sending Time">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ new Date(scope.row.sentDate).toString() }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Actions">
        <template slot-scope="scope">
          <el-button
            size="mini" type="danger" plain :disabled="scope.row.status === 'SENT'"
            @click="resend(scope.$index, scope.row)">Resend
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentPageChange"
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 40, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableTotal"
      prev-text="Previous"
      next-text="Next">
    </el-pagination>
  </div>
</template>


<script>
  export default {
    name: 'NotificationTable',
    props: {
      notificationReasons: {
        type: Array,
        required: true
      },
      notificationStatuses: {
        type: Array,
        required: true
      },
      notificationTypes: {
        type: Array,
        required: true
      },
      notificationFrom: {
        type: Date,
        required: true
      },
      notificationUntil: {
        type: Date,
        required: true
      }
    },
    data() {
      return {
        data: [],
        currentPage: 1,
        tableTotal: 0,
        pageSize: 10,
      }
    },
    watch: {
      notificationReasons: function () {
        this.reloadContents();
      },
      notificationStatuses: function () {
        this.reloadContents();
      },
      notificationTypes: function () {
        this.reloadContents();
      },
      notificationFrom: function () {
        this.reloadContents();
      },
      notificationUntil: function () {
        this.reloadContents();
      }
    },
    methods: {
      buildSearchObject: function () {
        return {
          notificationReasons: this.notificationReasons,
          notificationStatuses: this.notificationStatuses,
          notificationTypes: this.notificationTypes,
          fromDate: this.notificationFrom,
          untilDate: this.notificationUntil
        }
      },
      loadData(start, end) {
        this.$http.post('http://localhost:8080/api/notification/search/' + start + "/" + end,
          this.buildSearchObject()
        ).then(response => {
          this.data = response.body;
        }, response => {
          console.log("ERRROR" + response);
        });
      },
      reloadContents() {
        this.$http.post('http://localhost:8080/api/notification/total',
          this.buildSearchObject()
        ).then(response => {
          this.tableTotal = response.body;
          this.loadPaged();
        }, response => {
          console.log("ERRROR" + response);
        });
      },
      preview(index, rowData) {
        alert(rowData.content);
      },
      resend(index, rowData) {

      },
      handlePageSizeChange(val) {
        this.pageSize = val;
        this.loadPaged()
      },
      handleCurrentPageChange(val) {
        this.loadPaged()
      },
      getStart() {
        return (this.currentPage - 1) * this.pageSize;
      },
      getEnd() {
        let end = (this.currentPage) * this.pageSize;
        if (end > this.tableTotal) {
          end = this.tableTotal;
        }
        return end;
      },
      loadPaged() {
        if (this.tableTotal > 0) {
          this.loadData(this.getStart(), this.getEnd())
        } else {
          this.data = [];
        }
      },
      tableRowClassName({row, rowIndex}) {
        if (row.status === "SENT") {
          return 'success-row';
        }
        return 'warning-row';
      },
    },
    created() {
      this.reloadContents();
    }
  }
</script>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
