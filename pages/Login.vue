<script setup lang="ts">
import { useToast } from 'vue-toastification'
const { $axios } = useNuxtApp()

const toast = useToast()
const router = useRouter()

const username = ref('')
const password = ref('')

const login = async () => {
  if(username.value === '' || password.value === '') toast.error('Fields must be filled.')
  try {
    const response = await $axios.post('/user/login', {
      username: username.value,
      password: password.value
    })

    if (response.status == 201) {
      toast.success(response.data.message)
      const token = response.data.data.token
      const user = response.data.data.user
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      router.push('/')
    }
  } catch (err: any) {
    console.log(err)
    toast.error(err?.response?.data?.message)
  }
}

</script>
<template>
  <div class="w-full h-screen flex justify-center bg-gray-800/[.9]">
    <div class="container flex flex-col items-center justify-center p-2">
      <div class="w-2/3 lg:w-1/3">
        <div class="my-4 text-center">
          <h1 class="text-4xl text-white font-bold">Login Page</h1>
        </div>
        <div class="p-2">
          <InputField labelClass="text-white" fieldClass="bg-white" inputType="text" placeholder="Username"
            label="Username" v-model="username" />
        </div>
        <div class="p-2">
          <InputField labelClass="text-white" fieldClass="bg-white" inputType="password" placeholder="Password"
            label="Password" v-model="password" />
        </div>
        <div class="p-2">
          <Button text="Login" @click.prevent="login()" />
        </div>
        <div class="text-blue-500 underline text-center">
          <router-link to="/register">Create Account</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
