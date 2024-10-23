<script lang="ts">
export default {
  name: 'Button',
  props: ['text']
}
</script>
<template>
  <div class="w-full my-2">
    <button class="p-2 w-full rounded-lg bg-green-600 font-semibold text-white hover:bg-green-400">{{ text }}</button>
  </div>
</template>
