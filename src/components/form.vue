<template>
  <form action="#" @submit.prevent="save" id="data">
    <slot></slot>
  </form>
</template>

<script>
export default {
  name:"Form",
  props:{
    submit:Function
  },
  methods:{
    save(evt){
      this.$emit("saveTask",evt)
    }
  }
}
</script>