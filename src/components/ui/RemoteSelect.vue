<template>
  <el-select style="width: 100%"
             :collapse-tags="collapseLimit > 0 && selected.length >= collapseLimit"
             v-model="selected"
             v-on:input="updateValue(lookupName, $event)"
             :multiple="multiple"
             :loading="loading"
             :placeholder="placeholder">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>


<script>
  export default {
    name: 'RemoteSelect',
    props: {
      url: {
        type: String,
        required: true
      },
      lookupName: {
        type: String
      },
      multiple: {
        type: Boolean
      },
      collapseLimit: {
        type: Number,
        default: 0
      },
      placeholder: {
        type: String,
        default: "Select"
      }
    },
    data() {
      return {
        options: [],
        selected: [],
        loading: true
      }
    },
    methods: {
      queryValues() {
        this.loading = true;
        this.$http.get(this.url + '/' + this.lookupName,
        ).then(response => {
          this.options = response.body;
          this.loading = false;
        }, response => {
          console.log("ERRROR" + response);
        });
      },
      updateValue: function (source, values) {
        let event = {source: source, values: values};
        this.$emit('input', event);
      }
    },
    created() {
      this.queryValues();
    }
  }

</script>
