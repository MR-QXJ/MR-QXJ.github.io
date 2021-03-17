<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <svg-icon icon-name="cherry" />
    </div>
    <router-view />
  </div>
</template>

<script>
import { Decrypt } from 'common/aex'

export default {
  created() {
    const userAex = this.$util.getCookie(CONST.USER_LOCAL)
    //AEX解密
    const user = JSON.parse(Decrypt(userAex) || '{}')
    console.log(userAex, user)
    // this.$util.setCookie(CONST.USER_LOCAL, Encrypt(JSON.stringify(userInfo))) //登陆时对cookie AES加密
  }
}
</script>
<style lang="scss"></style>
