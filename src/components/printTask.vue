<script>
export default {
  name:"systemPrint",
  data(){
    return {
      data:this.db.db
    }
  },
  events(){
    return {
      update({target},comp){
        comp.data = target.db;
      }
    }
  }
}
</script>

<template>
  <div>
    <ul>
      <li v-for="(item , index) in data" v-bind:key="index">
        <span v-show="item.state">[</span>
        <span :id="index">
        {{ item.title }} - {{ item.description }}
        </span>
        <span v-show="item.state">]</span>
      </li>
    </ul>
  </div>
</template>