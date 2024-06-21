<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import { Head } from '@inertiajs/vue3'
import { router } from '@inertiajs/vue3'
import { reactive , toRaw } from "vue";

const registerForm = reactive({
  fullName: '',
  email: '',
  password: '',
})

const handleSubmit =(e:Event) => {
  router.post('/auth/signup',toRaw(registerForm))
  console.log(toRaw(registerForm))
}

  console.log('hello from sign up')
</script>
<template>
  <Head title="signup"/>
  <form class="flex flex-col items-start justify-center" @submit.prevent="handleSubmit">
    <h3>Sign up </h3>
    <label>
      <span>Full name</span>
      <input v-model="registerForm.fullName" name="fullName" type="text">
    </label>

    <label>
      <span> email </span>
      <input v-model="registerForm.email" name="email" type="email">
    </label>

    <label>
      <span> password </span>
      <input v-model="registerForm.password" name="password" type="password">
    </label>

    alrady a member? <Link href="/auth/login">login</Link>
    <button type="submit">
      submit
    </button>
  </form>
</template>