import { defineStore } from 'pinia'
import { useNuxtApp } from '#app'
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

export const useTodoStore = defineStore('todo', () => {
  const cancelledList = ref([])
  const unmarkedList = ref([])
  const doneList = ref([])
  
  const getList = async () => {
    const { $axios } = useNuxtApp()
    
    try {
      const response = await $axios.get('/todo')
      cancelledList.value = response.data.data.filter((x: TodoItem) => x.status === 'Cancelled')
      unmarkedList.value = response.data.data.filter((x: TodoItem) => x.status === 'Unmarked')
      doneList.value = response.data.data.filter((x: TodoItem) => x.status === 'Done')

    } catch (err: any) {
      cancelledList.value = []
      unmarkedList.value = []
      doneList.value = []
      // toast.error(JSON.stringify(err?.response?.data.message))
    }
  }

  const addTodo = async (todo: { subject: string, description: string }): Promise<void> => {
    const { $axios } = useNuxtApp()

    try {
      const response = await $axios.post('/todo/', {
        subject: todo.subject,
        description: todo.description
      })
  
      if (response.status === 201) {
        toast.success(response.data.message)
        getList()
        return Promise.resolve()
      }
    } catch (err) {
      toast.error(JSON.stringify(err))
      return Promise.reject(err)
    }
  }

  const updateTodo = async (todo: TodoItem): Promise<void> => {
    const { $axios } = useNuxtApp()
  
    try {
      const response = await $axios.put('/todo/' + todo.id, {
        subject: todo.subject,
        description: todo.description
      })
  
      if (response.status === 201) {
        toast.success(response.data.message)
        getList()
        return Promise.resolve()
      }
    } catch (err) {
      toast.error(JSON.stringify(err))
      return Promise.reject(err)
    }
  }

  const updateMark = async (todo: TodoItem, status: string) => {
    const { $axios } = useNuxtApp()

    try {
      const response = await $axios.patch('/todo/' + todo.id, {
        status
      })

      if(response.status == 201) {
        toast.success(response.data.message)
      }

    } catch(err) {
      toast.error(JSON.stringify(err))
    }
  }

  const deleteTodo = async (id: string): Promise<void> => {
    const { $axios } = useNuxtApp()
    try {
      const response = await $axios.delete('/todo/' + id)

      if(response.status == 201) {
        toast.success(response.data.message)
        return Promise.resolve()
      }

    } catch(err) {
      toast.error(JSON.stringify(err))
      return Promise.reject(err)
    }
  }

  return { cancelledList, unmarkedList, doneList, getList, addTodo, updateMark, updateTodo, deleteTodo }
})