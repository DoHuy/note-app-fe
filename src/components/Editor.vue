<script setup lang="ts">
import { QuillEditor } from "@vueup/vue-quill"
import { computed, defineComponent, ref } from "vue"
import { allNotes, targetedNote, updateNote } from "@/services/noteService"

async function handleChange(event: any) {
  const textAreaElm = <HTMLInputElement>(document.getElementById('editor'))
  if(targetedNote && targetedNote.value && textAreaElm) {
    let textAreaContent = textAreaElm.value.split("\n")
    targetedNote.value.title = textAreaContent[0]
    textAreaContent.shift()
    targetedNote.value.content = textAreaContent.join("\n")
    try {
        //supabase not support broadcast directly data to postgres database
        await updateNote({...targetedNote.value, updated_at: new Date()})
        const index = allNotes.value.findIndex( note => note.id === targetedNote.value?.id)
        allNotes.value[index] = targetedNote.value
      } catch (e) {
        console.error('Unknown error when updating note', e)
      }
  }
}

const textAreaContent = computed(() => targetedNote && targetedNote.value ? `${targetedNote.value.title}\n${targetedNote.value.content}` : "")


defineComponent({
  components: {
    QuillEditor,
    targetedNote,
  },
  setup() {
    return {
      targetedNote,

    }
  },
})
</script>

<template>
  <a-layout-content :style="{ background: '#fff' }">
      <a-textarea  id="editor" @change="handleChange($event)" v-model:value="textAreaContent" placeholder="Basic usage" :rows="4" :style="{ width: '100%', height: '100%', fontSize: '25px' }" />
  </a-layout-content>
</template>
