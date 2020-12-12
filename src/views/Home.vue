<template>
  <div class="home">
    
  </div>
</template>

<script>
import {getMainData} from 'network/home'

export default {
  name: "Home",
  created() {
    
    getMainData().then(res => {
      console.log(res)
      
    })
  },
  components: {
    
  }
}
</script>

<style lang="scss" scoped>
  
</style>
