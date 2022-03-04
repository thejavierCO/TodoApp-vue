<template>
  <form action="#" @submit.prevent="submit">
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