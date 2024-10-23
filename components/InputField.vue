<script lang="ts">
export default {
  name: "InputField",
  props: ['label', 'inputType', 'placeholder', 'labelClass', 'fieldClass', 'modelValue']
}
</script>
<template>
  <div class="w-full flex flex-col">
    <label :class="labelClass" :for="label" class="text-md">{{ label }}</label>
    <input :placeholder="placeholder" :type="inputType" class="w-full p-2 rounded-lg" :class="fieldClass" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
  </div>
</template>

