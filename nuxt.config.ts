import tailwindcss from '@tailwindcss/vite';
import Components from 'unplugin-vue-components/vite';
import MotionResolver from 'motion-v/resolver';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'motion-v/nuxt',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/sitemap',
  ],

  css: ['~/assets/css/tailwind.css'],

  site: {
    url: process.env.SITE_URL,
    name: process.env.SITE_NAME,
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  runtimeConfig: {
    public: {
      siteName: process.env.SITE_NAME,
      phoneNumber: process.env.PHONE_NUMBER,
      deliveryTime: process.env.DELIVERY_TIME,
      workTime: process.env.WORK_TIME,
      address: process.env.ADDRESS,
      email: process.env.EMAIL,
      apiUrl: process.env.API_URL,
    },
  },

  shadcn: {
    prefix: 'ui',
    componentDir: './app/components/ui',
  },

  icon: {
    provider: 'server',
    serverBundle: {
      collections: ['uil', 'mdi', 'bx'],
    },
  },

  colorMode: {
    classSuffix: '',
    preference: 'system',
    storage: 'localStorage',
  },

  vite: {
    plugins: [
      tailwindcss(),
      Components({
        resolvers: [MotionResolver()],
      }),
    ],
  },
});
