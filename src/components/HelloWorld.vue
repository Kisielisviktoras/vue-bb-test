<template>
  <div class="hello">
    <div>
      <Element></Element>
    </div>
  </div>
</template>

<script>

import Element from "./Element";
export default {
  name: 'HelloWorld',
  components: {Element},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
