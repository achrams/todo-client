<script setup lang="ts">
import { useToast } from 'vue-toastification'
const { $axios } = useNuxtApp()

const toast = useToast()
const router = useRouter()

const username = ref('')
const password = ref('')
const verify = ref('')
const firstName = ref('')
const lastName = ref('')

const register = async () => {
  if(username.value === '' || password.value === '' || verify.value === '' || firstName.value === '' || lastName.value === '') toast.error('Fields must be filled.')
  try {
    const response = await $axios.post('/user/register', {
      username: username.value,
      password: password.value,
      verifyPassword: verify.value,
      firstName: firstName.value,
      lastName: lastName.value
    })

    if (response.status == 201) {
      toast.success(response.data.message)
      router.push('/login')
    }
  } catch (err) {
    console.log(err)
    toast.error(err?.response?.data?.message)
  }
}

</script>

<template>
  <div class="w-full h-screen flex justify-center bg-gray-800/[.9]">
    <div class="container flex flex-col items-center justify-center p-2">
      <div class="w-2/3 lg:w-1/3">
        <div class="my-4 text-center"><h1 class="text-4xl text-white font-bold">User Registration</h1></div>
        <div class="p-2">
          <InputField labelClass="text-white" fieldClass="bg-white" inputType="text" placeholder="Username"
            label="Username" v-model="username" />
        </div>
        <div class="flex flex-wrap">
          <div class="p-2 w-full md:w-1/2">
            <InputField labelClass="text-white" fieldClass="bg-white" inputType="text" placeholder="First Name"
              label="First Name" v-model="firstName" />
          </div>
          <div class="p-2 w-full md:w-1/2">
            <InputField labelClass="text-white" fieldClass="bg-white" inputType="text" placeholder="Last Name"
              label="Last Name" v-model="lastName" />
          </div>
        </div>
        <div class="flex flex-wrap">
          <div class="p-2 w-full md:w-1/2">
            <InputField labelClass="text-white" fieldClass="bg-white" inputType="password" placeholder="Password"
              label="Password" v-model="password" />
          </div>
          <div class="p-2 w-full md:w-1/2">
            <InputField labelClass="text-white" fieldClass="bg-white" inputType="password" placeholder="Verify Password"
              label="Verify Password" v-model="verify" />
          </div>
        </div>
        <div class="p-2">
          <Button text="Register" @click.prevent="register()" />
        </div>
        <div class="text-blue-500 underline text-center">
          <router-link to="/login">Already have an account</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
