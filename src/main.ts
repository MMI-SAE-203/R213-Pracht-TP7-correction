import { createApp } from 'vue'
import App from './App.vue'
import routes from '~pages'
import { createRouter, createWebHistory } from 'vue-router'
import { plugin, defaultConfig } from '@formkit/vue'
import { generateClasses } from '@formkit/themes'

import './index.css'

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.use(
  plugin,
  defaultConfig({
    config: {
      classes: generateClasses({
        global: {
          form: 'bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4',
          field: 'mb-4',
          label: 'block text-gray-700 text-sm font-bold mb-2',
          input: `shadow appearance-none border rounded w-full py-2 px-3 
            text-gray-700 leading-tight focus:outline-none`,
          error: 'text-red-500 text-xs italic'
        },
        checkbox: {
          wrapper: 'flex items-center',
          input: '$reset mr-2 leading-tight'
        },
        submit: {
          input: `bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4
           rounded focus:outline-none focus:shadow-outline`
        }
      })
    }
  })
)
app.mount('#app')
