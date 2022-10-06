import { supabase } from "@/lib/superbase"
import { ref } from "vue"
import {Note} from "@/types/interface";
import moment from 'moment';

const allNotes = ref<Note[]>([])
const targetedNote = ref<Note | null>(null)

const fetchNotes = async () => {
  try {
    const { data: notes, error } = await supabase
      .from("notes")
      .select("*")
      .order("id")

    if (error) {
      console.log("error", error)
      return
    }
    // handle for when no notes are returned
    if (notes === null) {
      allNotes.value = []
      return
    }
    allNotes.value = notes
  } catch (err) {
    console.error("Error retrieving data from db", err)
  }
}

/**
 *  Add a new note to supabase
 */
const addNote = async (note: Note): Promise<null | Note> => {
  try {
    const { data, error } = await supabase
      .from("notes")
      .insert(note)
      .single()

    if (error) {
      alert(error.message)
      console.error("There was an error inserting", error)
      return null
    }
    console.log("created a new note")
    return data
  } catch (err) {
    alert("Error")
    console.error("Unknown problem inserting to db", err)
    return null
  }
}

/**
 * Targets a specific note via its record id and updates the is_completed attribute.
 */
const updateNote = async (note: Note) => {
  try {
    const { error } = await supabase
      .from("notes")
      .update(note)
      .eq("id", note.id)
      .single()

    if (error) {
      alert(error.message)
      console.error("There was an error updating", error)
      return
    }

    console.log("Updated task", note.id)
  } catch (err) {
    alert("Error")
    console.error("Unknown problem updating record", err)
  }
}

/**
 *  Deletes a note via its id
 */
const deleteNote = async (noteId: string) => {
  try {
    await supabase
      .from("notes")
      .delete()
      .eq("id", noteId)
    console.log("deleted todo", noteId)
  } catch (error) {
    console.error("error", error)
  }
}

export { allNotes, targetedNote, content, fetchNotes, addNote, updateNote, deleteNote }

