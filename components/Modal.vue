<template>
  <div v-if="modelValue" class="w-full h-screen fixed flex flex-col justify-center items-center">
    <div class="w-full md:w-2/3 lg:w-1/3 flex justify-center items-center z-20">
      <div class="w-full h-fit bg-white rounded-lg p-4">
        <div class="w-full my-2">
          <h2 class="text-center text-2xl">{{ type }} Task</h2>
        </div>
        <div v-if="type !== 'Delete'" class="w-full">
          <div class="w-full my-2">
            <InputField labelClass="text-black" fieldClass="bg-gray-200" inputType="text" placeholder="Subject"
              label="Subject" v-model="subject" />
          </div>
          <div class="w-full my-2">
            <InputField labelClass="text-black" fieldClass="bg-gray-200" inputType="text" placeholder="Description"
              label="Description" v-model="description" />
          </div>
          <div class="w-full mt-12 my-4 bottom-0">
            <Button text="Save" @click.prevent="saveTask" />
          </div>
        </div>
        <div v-else class="w-full min-h-24 flex flex-col justify-center items-center">
          <h5 class="text-xl my-5">Are you sure?</h5>
          <div class="my-3 w-full flex">
            <div class="mr-1 w-1/2">
              <button class="p-2 bg-red-400 rounded-lg text-white w-full" @click.prevent="showModal">Cancel</button>
            </div>
            <div class="w-1/2">
              <button class="p-2 bg-teal-500 rounded-lg text-white w-full" @click.prevent="saveTask">Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-black/[.7] w-full h-full absolute z-10" @click="showModal"></div>
  </div>
</template>

<script lang="ts">
import InputField from './InputField.vue'
import Button from './Button.vue'
import { useTodoStore } from '~/stores/todo'
import { useToast } from 'vue-toastification'
const toast = useToast()

interface TodoItem {
  activityNumber: string;
  description: string;
  id: number;
  status: string;
  subject: string;
  user: number;
}

export default {
  name: 'Modal',
  components: {
    InputField
  },
  data() {
    return {
      subject: '',
      description: ''
    }
  },
  watch: {
    item: {
      handler(val: TodoItem) {
        if (val) {
          this.subject = val.subject || ''
          this.description = val.description || ''
        }
      },
      immediate: true
    }
  },
  props: ['modelValue', 'type', 'item'],
  emits: ['update:modelValue'],
  methods: {
    showModal() {
      this.$emit('update:modelValue', !this.modelValue)
      this.subject = ''
      this.description = ''
    },
    saveTask () {
      const todoStore = useTodoStore()
      if(this.type == 'Edit') {
        const item: TodoItem = {
          id: this.item.id,
          activityNumber: this.item.activityNumber,
          subject: this.subject,
          description: this.description,
          status: this.item.status,
          user: this.item.user
        }
        todoStore.updateTodo(item)
        .then(() => {
          this.showModal()
        })
      } else if(this.type == 'Add') {
        if(this.subject === '' || this.description === '') toast.error('Fields must be filled.')
        todoStore.addTodo({
          subject: this.subject,
          description: this.description
        })
        .then(() => {
          this.showModal()
        })
      } else if(this.type == 'Delete') {
        console.log(this.item)
        todoStore.deleteTodo(this.item.id)
        .then(() => {
          this.showModal()
          todoStore.getList()
        })
      }
    }
  }
}
</script>

<style scoped></style>