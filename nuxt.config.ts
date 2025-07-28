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
  ],

  css: ['~/assets/css/tailwind.css'],

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  shadcn: {
    prefix: 'ui',
    componentDir: './app/components/ui',
  },

  icon: {
    serverBundle: {
      collections: ['uil', 'mdi'],
    },
  },

  colorMode: {
    classSuffix: '',
    preference: 'system',
    storage: 'cookie',
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
