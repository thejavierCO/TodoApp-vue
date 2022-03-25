<template>
  <div :id="id">
    <span>{{ title }}</span>
    <span>{{ description }}</span>
    <span>{{ state ? "+" : "" }}</span>
  </div>
</template>

<script>
export default {
  name:"Button",
  props:{
    id:Number,
    title:String,
    description:String,
    state:Boolean
  },
  emits:[
    "deleteTask",
    "complateTask"
  ]
}
</script>