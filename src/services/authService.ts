import { ref } from "vue"
import { supabase } from "@/lib/superbase"
import { Session } from "@supabase/gotrue-js/dist/main/lib/types"
import { Credentials } from "@/types/interface"

const userSession = ref<Session | null>(null)

const handleLogin = async (credentials: Credentials) => {
  try {
    const { error, user } = await supabase.auth.signIn({
      email: credentials.email,
      password: credentials.password,
    })
    if (error) {
      alert("Error logging in: " + error.message)
    }
    // No error throw, but no user detected so send magic link
    if (!error && !user) {
      alert("Check your email for the login link!")
    }
  } catch (error) {
    console.error("Error thrown:", error)
    throw error
  }
}

const handleSignup = async (credentials: Credentials) => {
  try {
    const { email, password } = credentials
    // prompt user if they have not filled populated their credentials
    if (!email || !password) {
      alert("Please provide both your email and password.")
      return
    }
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      alert(error.message)
      console.error(error, error.message)
      return
    }
    alert("Signup successful, confirmation mail should be sent soon!")
  } catch (err) {
    alert("Fatal error signing up")
    console.error("signup error", err)
  }
}

/**
 * Handles logging a user out of a supabase session
 */
const handleLogout = async () => {
  console.log("logging out")
  try {
    const { error } = await supabase.auth.signOut()

    if (error) {
      alert("Error signing out")
      console.error("Error", error)
      return
    }

    alert("You have signed out!")
  } catch (err) {
    alert("Unknown error signing out")
    console.error("Error", err)
  }
}

export { userSession, handleLogin, handleSignup, handleLogout }
