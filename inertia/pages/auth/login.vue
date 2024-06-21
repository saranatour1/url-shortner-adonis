<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import { Head } from '@inertiajs/vue3'
import { router } from '@inertiajs/vue3'
import { reactive , toRaw } from "vue";

const loginForm = reactive({
  email: '',
  password: '',
})

const handleSubmit =(e:Event) => {
  router.post('/auth/login',toRaw(loginForm))
  console.log(toRaw(loginForm))
}

  console.log('hello from login up')
</script>
<template>
  <Head title="login"/>
  <form class="flex flex-col items-start justify-center" @submit.prevent="handleSubmit">
    <h3>login</h3>
    <label>
      <span> email </span>
      <input v-model="loginForm.email" name="email" type="email">
    </label>

    <label>
      <span> password </span>
      <input v-model="loginForm.password" name="password" type="password">
    </label>

    not a member? <Link href="/auth/signup">signup</Link>
    <button type="submit">
      submit
    </button>
  </form>
</template>