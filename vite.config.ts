import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // ★★★ この一行を追加/修正 ★★★
  base: '/uranai-app-v2/', 
})