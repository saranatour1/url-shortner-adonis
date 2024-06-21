/// <reference path="../../adonisrc.ts" />
<script setup lang="ts">
  import { ref } from "vue"
  import User from '../../../app/models/user';

  defineProps<{user?: User}>()
  const x = ref(0)
</script>

<template>
  this is the main dashboard {{ user?.fullName || 'wee' }}

</template>