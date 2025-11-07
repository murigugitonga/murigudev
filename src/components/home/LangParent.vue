<script setup>
import LangCompMain from './LangCompMain.vue'


import figmaIcon from '@/assets/icons/figma-svgrepo-com.svg'
import inksIcon from '@/assets/icons/icons8-inkscape-24.png'
import GIMPIcon from '@/assets/icons/icons8-gimp-48.png'

// import icons
import htmlIcon from '@/assets/icons/html-5-svgrepo-com.svg'
import cssIcon from '@/assets/icons/css-3-svgrepo-com.svg'
import jsIcon from '@/assets/icons/javascript-svgrepo-com.svg'
import tsIcon from '@/assets/icons/icons8-typescript-48 (1).png'

import phpIcon from '@/assets/icons/php.svg'
import pythonIcon from '@/assets/icons/python.svg'
import sqlIcon from '@/assets/icons/mysql-svgrepo-com.svg'

import tailwindIcon from '@/assets/icons/tailwindcss-icon.svg'
import vueIcon from '@/assets/icons/vue-vuejs-javascript-js-framework.svg'
import nodeIcon from '@/assets/icons/nodejs-1-logo-svgrepo-com.svg'
import laraIcon from '@/assets/icons/laravel.svg'
import SectHeader from '../SectHeader.vue'

const designSkills = [
  {name : 'Figma', icon: figmaIcon},
  {name : 'Inkscape', icon: inksIcon},
  {name : 'GIMP', icon: GIMPIcon},
]
const frontendSkills = [
  { name: 'HTML 5', icon: htmlIcon},
  { name: 'CSS 3', icon: cssIcon },
  { name: 'JavaScript', icon: jsIcon },
  { name: 'TypeScript', icon: tsIcon },
]

const backendSkills = [
  { name: 'PHP', icon: phpIcon },
  { name: 'Python', icon: pythonIcon },
  {name: 'MySQL', icon: sqlIcon}
]
const frameworks = [
    {name: 'Tailwind', icon: tailwindIcon},
    {name: 'VueJs', icon: vueIcon},
    {name : 'NodeJs', icon: nodeIcon},
    {name: 'Laravel', icon: laraIcon}
]
</script>

<template>
  
  <section class="flex flex-col space-y-5">
    <SectHeader message="Software Development"/>
    <div class="grid gap-8 px-2 md:grid-cols-2">
      <LangCompMain
        specialty="Graphic & Web Design"
        :skills="designSkills"
      />
      
      <LangCompMain
        specialty="Frontend Development"
        :skills="frontendSkills"
      />
      <LangCompMain
        specialty="Backend Development"
        :skills="backendSkills"
      />
      <LangCompMain
        specialty="Frameworks"
        :skills="frameworks"
      />
    </div>
    </section>
</template>
