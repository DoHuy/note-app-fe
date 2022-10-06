import { createApp } from "vue"
import Antd from "ant-design-vue"
import "./style.css"
import App from "./App.vue"
import "ant-design-vue/dist/antd.css"
import { message } from "ant-design-vue"
import { supabase } from "./lib/superbase"
import { userSession } from "./services/authService"

const app = createApp(App)
app.use(Antd).mount("#app")
app.config.globalProperties.$message = message

supabase.auth.onAuthStateChange((event, session) => {
  userSession.value = session
})
