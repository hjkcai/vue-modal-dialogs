<template>
  <el-dialog title="Login" :value="true" :show-close="false" @close="cancel">
    <el-form>
      <el-form-item label="Username">
        <el-input v-model="username"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input type="password" v-model="password"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="cancel">Cancel</el-button>
      <el-button type="primary" @click="login">Login</el-button>
    </span>
  </el-dialog>
</template>

<script>
  function delay () {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 200))
  }

  export default {
    data: () => ({
      username: '',
      password: ''
    }),
    methods: {
      cancel () {
        this.$emit('close', false)
      },
      async login () {
        // emulate an ajax delay
        // you can do real ajax here
        await delay()

        // show nested dialogs
        if (this.username === 'admin' && this.password === 'admin') {
          await this.$dialogs.show('msgbox', 'Login successfully', 'Welcome')
          this.$emit('close', true)
        } else {
          await this.$dialogs.show('msgbox', 'Wrong username or password', 'Sorry')
        }
      }
    }
  }
</script>
