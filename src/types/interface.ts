export interface Credentials {
  email?: string | undefined
  password?: string | undefined
}

export interface Note {
  id?: number
  user_id?: string
  title: string
  content: string
  created_at?: Date
  updated_at?: Date
}
