
<template>
  <a-layout-header class="header" :style="{ background: `#f2f4f7` }">
    <a-menu mode="horizontal" :style="{ background: `#f2f4f7`, display: 'flex', flexDirection: 'center', justifyContent: 'space-between' }">
      <div :style="{ display: 'flex', gap: '50px' }">
        <a-menu-item @click="createNewNotes()">
          <a-tooltip placement="topRight">
            <template #title>
              <span>Create a note</span>
            </template>
            <FormOutlined :style="{ fontSize: `20px` }" />
          </a-tooltip>
        </a-menu-item>
        <a-menu-item @click="removeNote()">
          <a-tooltip placement="topRight">
            <template>
              <span>Delete a note</span>
            </template>
            <DeleteOutlined :style="{ fontSize: `20px` }" />
          </a-tooltip>
        </a-menu-item>
      </div>
      <a-menu-item @click="handleLogout()">
        <a-tooltip placement="topRight">
          <template>
            <span>Logout</span>
          </template>
          <LogoutOutlined :style="{ fontSize: `20px` }" />
        </a-tooltip>
      </a-menu-item>
    </a-menu>
  </a-layout-header>
</template>

<script lang="ts">
import {handleLogout, userSession} from "@/services/authService"
import { DeleteOutlined, FormOutlined, LogoutOutlined } from "@ant-design/icons-vue"
import {defineComponent} from "vue"
import {addNote, allNotes, deleteNote, fetchNotes, targetedNote} from "@/services/noteService"
import { Note } from "@/types/interface"

export default defineComponent({
  name: "NoteHeader",
  components: {
    LogoutOutlined,
    FormOutlined,
    DeleteOutlined,
  },
  async setup() {
    await fetchNotes()
    async function createNewNotes() {
      if(userSession?.value === null) {
        alert("Please log in again")
        return
      }
      try {
        const note = await addNote({ title: 'Check list', content: 'content', user_id: userSession.value.user?.id })
        if (!note) {
          return
        }
        allNotes.value = [note, ...allNotes.value]
      } catch (e) {
        console.error('Unknown error when adding note', e)
      }
    }
    async function removeNote() {
      if(userSession?.value === null) {
        alert("Please log in again")
        return
      }
      if(!targetedNote) {
        return
      }
      try {
        await deleteNote(targetedNote.value?.id)
        allNotes.value = allNotes.value.filter(note => note.id !== targetedNote.value?.id)
      } catch (e) {
        console.error('Unknown error when adding note', e)
      }
    }
    return {
      handleLogout,
      createNewNotes,
      removeNote,
    }
  }
})
</script>
<style scoped></style>
