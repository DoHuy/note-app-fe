<template>
  <div :style="{ display: 'flex', justifyContent: 'center', marginTop: '300px' }">
    <a-form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" width="200" autocomplete="off">
      <a-form-item label="Email" name="email" :rules="[{ required: true, message: 'Please input your email!' }]">
        <a-input v-model:value="formState.email" />
      </a-form-item>

      <a-form-item label="Password" name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
        <a-input-password v-model:value="formState.password" />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button @click="handleSignup({ email: formState.email, password: formState.password })" type="link" :style="{ marginLeft: '105px' }"
          >Register now</a-button
        >
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button @click="handleLogin({ email: formState.email, password: formState.password })" type="primary" html-type="login">Login</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue"
import { handleLogin, handleSignup } from "@/services/authService"
import {Credentials} from "@/types/interface";

export default defineComponent({
  setup() {
    const formState = reactive<Credentials>({
      email: "",
      password: "",
    })

    return {
      formState,
      handleSignup,
      handleLogin,
    }
  },
})
</script>
