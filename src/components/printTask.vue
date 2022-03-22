<script>
export default {
  name:"systemPrint",
  data(){
    return {
      data:this.db.db
    }
  },
  events:{
    update({target:{db}},comp){
      comp.data = db;
    }
  }
}
</script>

<template>
  <div>
    <ul>
      <span>{{data.length}}</span>
      <li v-for="(item , index) in data">
        <span v-show="item.state">[complete]</span>
        {{ item.title }} - {{ item.description }} - {{ index+1 }}
      </li>
    </ul>
  </div>
</template>