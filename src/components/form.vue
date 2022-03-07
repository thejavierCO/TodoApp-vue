<template>
  <form action="#" @submit.prevent="submit" id="InData">
    <slot></slot>
  </form>
</template>

<script>
export default {
  name:"form",
  props:{
    submit:Function
  }
}
</script>