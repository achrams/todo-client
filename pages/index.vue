<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTodoStore } from '~/stores/todo'
import { useToast } from 'vue-toastification'

const toast = useToast()
import draggable from 'vuedraggable'

const router = useRouter()
const todoStore = useTodoStore()

const showModal = ref(false)
const modalType = ref('Add')
const selected = ref({})

const navTo = (url: string) => {
  router.push(url)
}

const moveTodo = (event: any, type: string) => {
  if(event.added) {
    console.log(type, event.added.element)
    todoStore.updateMark(event.added.element, type)
  }
}

const addTask = () => {
  showModal.value = true
  modalType.value = 'Add'
}

const editTask = (element) => {
  showModal.value = true
  modalType.value = 'Edit'
  selected.value = element
}

const deleteTask = (element) => {
  showModal.value = true
  modalType.value = 'Delete'
  selected.value = element
}

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  navTo('/login')
}

onMounted(() => {
  const token = localStorage.getItem('token')
  if (!token) {
    router.push('/login')
  } else {
    todoStore.getList()
  }
})

useHead({
  title: 'TODO LIST - Home'
})
</script>

<template>
  <div class="w-full h-full lg:h-screen flex flex-col items-center bg-gray-800/[.9]">
    <Modal v-model="showModal" :type="modalType" :item="selected" />
    <div class="w-full bg-black p-2 flex justify-end">
      <button class="bg-none text-white border-2 border-white rounded-lg p-2" @click.prevent="logout">Logout</button>
    </div>
    <div class="container flex flex-col items-center justify-center p-2 my-24">
      <h1 class="text-white uppercase text-5xl my-5">TODO LIST</h1>
      <div class="w-full flex flex-wrap">
        <div class="w-full md:w-1/3 p-2">
          <h2 class="text-center text-3xl text-white my-2">Cancelled</h2>
          <draggable v-model="todoStore.cancelledList" item-key="id" :group="{ name: 'todos', pull: true, put: true }"
            class="p-2 bg-gray-700 min-h-80 rounded-lg" @change="(e) => moveTodo(e, 'Cancelled')">
            <template #item="{ element, index }">
              <div class="bg-white p-2 mx-1 my-2 rounded-lg shadow-md shadow-black h-fit">
                <div class="w-full min-h-12 bg-orange-300 p-2 rounded-t-lg flex items-center cursor-move">
                  <h2 class="text-lg font-semibold">{{ element.subject }}</h2>
                </div>
                <div class="w-full min-h-24 bg-orange-200 p-2 flex flex-wrap items-start rounded-b-lg cursor-move">
                  <h5>{{ element.description }}</h5>
                </div>
              </div>
            </template>
          </draggable>
        </div>
        <div class="w-full md:w-1/3 p-2">
          <h2 class="text-center text-3xl text-white my-2">Unmarked</h2>
          <draggable v-model="todoStore.unmarkedList" item-key="id" :group="{ name: 'todos', pull: true, put: true }"
            class="p-2 bg-gray-700 min-h-80 rounded-lg" @change="(e) => moveTodo(e, 'Unmarked')">
            <template #item="{ element, index }">
              <div class="bg-white p-2 mx-1 my-2 rounded-lg shadow-md shadow-black h-fit">
                <div class="w-full min-h-12 bg-orange-300 p-2 rounded-t-lg flex items-center cursor-move">
                  <h2 class="text-lg font-semibold">{{ element.subject }}</h2>
                </div>
                <div class="w-full min-h-24 bg-orange-200 p-2 flex flex-wrap items-start rounded-b-lg cursor-move">
                  <h5>{{ element.description }}</h5>
                </div>
                <div class="w-full mt-2 flex justify-start">
                  <button class="mr-1 p-2 bg-teal-500 rounded-lg text-white w-20" @click="editTask(element)">Edit</button>
                  <button class="p-2 bg-red-400 rounded-lg text-white w-20" @click="deleteTask(element)">Delete</button>
                </div>
              </div>
            </template>
          </draggable>
        </div>
        <div class="w-full md:w-1/3 p-2">
          <h2 class="text-center text-3xl text-white my-2">Done</h2>
          <draggable v-model="todoStore.doneList" item-key="id" :group="{ name: 'todos', pull: true, put: true }"
            class="p-2 bg-gray-700 min-h-80 rounded-lg" @change="(e) => moveTodo(e, 'Done')">
            <template #item="{ element, index }">
              <div class="bg-white p-2 mx-1 my-2 rounded-lg shadow-md shadow-black h-fit">
                <div class="w-full min-h-12 bg-orange-300 p-2 rounded-t-lg flex items-center cursor-move">
                  <h2 class="text-lg font-semibold">{{ element.subject }}</h2>
                </div>
                <div class="w-full min-h-24 bg-orange-200 p-2 flex flex-wrap items-start rounded-b-lg cursor-move">
                  <h5>{{ element.description }}</h5>
                </div>
              </div>
            </template>
          </draggable>
        </div>
      </div>
      <div class="w-full md:w-1/3 my-8 p-2">
        <button class="mr-1 p-2 bg-teal-500 rounded-lg text-white w-full" @click="addTask">Add Task</button>
      </div>
    </div>
  </div>
</template>
