<script lang="ts">
import LeftSideBar from "./components/LeftSideBar.vue"
import { defineComponent, Suspense } from "vue"
import "@vueup/vue-quill/dist/vue-quill.snow.css"
import NoteHeader from "@/components/Header.vue"
import Auth from "@/components/Auth.vue"
import Editor from "@/components/Editor.vue"
import { userSession } from "@/services/authService"
export default defineComponent({
  components: {
    LeftSideBar,
    NoteHeader,
    Auth,
    Editor,
    Suspense,
  },
  setup: () => {
    return {
      userSession,
    }
  },
})
</script>

<template>
  <a-layout style="height: 100%;">
    <div v-if="userSession === null">
      <Auth />
    </div>
    <div v-else>
      <Suspense>
        <NoteHeader />
      </Suspense>
      <a-layout>
        <LeftSideBar />
        <Editor />
      </a-layout>
    </div>
  </a-layout>
</template>

<style lang="css">
.ant-layout.ant-layout-has-sider {
  height: 80vh;
}
</style>
