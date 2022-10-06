<template>
  <a-layout-sider width="400px">
    <div v-for="(note, index) in allNotes" :key="index">
      <div @click="handleClickToCard(note)" class="floating-card">
        <div v-if="targetedNote !== null && targetedNote.id === note.id">
          <a-card hoverable :title="targetedNote.title">
            <p class="floating-card-ellipsis">{{computedTargetedNoteContent}}</p>
          </a-card>
        </div>
        <div v-else>
          <a-card hoverable :title="note.title">
            <p class="floating-card-ellipsis">{{  `${moment(note.created_at).format("HH:mm A").toString()} ${note.content}` }}</p>
          </a-card>
        </div>
      </div>
    </div>
  </a-layout-sider>
</template>

<script setup lang="ts">
import { computed, defineComponent } from "vue"
import { allNotes, targetedNote } from "@/services/noteService";
import { Note } from "@/types/interface";
import moment from 'moment'

const handleClickToCard = (note: Note) => {
      if (!note) {
        return
      }
      targetedNote.value = { ...note }
}

const computedTargetedNoteContent = computed(() => `${moment(targetedNote.value?.created_at).format("HH:mm A").toString()} ${targetedNote.value?.content}`)

defineComponent({
  name: "LeftSideBar",
  setup() {
    return {
      allNotes,
      targetedNote,
    }
  }
})
</script>

<style lang="css">
.floating-card-ellipsis{
  white-space: nowrap; 
  width: auto !important; 
  overflow: hidden !important;
  text-overflow: ellipsis; 
}
</style>
