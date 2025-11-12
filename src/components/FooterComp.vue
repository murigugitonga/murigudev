<script setup>
import SocialLink from './SocialLink.vue';

import facebook from '@/assets/icons/icons8-facebook-logo (1).svg'
import twitter from '@/assets/icons/icons8-twitter.svg'
import instagram from '@/assets/icons/icons8-instagram.svg'

import linkedIn from '@/assets/icons/icons8-linkedin.svg'
import gmail from '@/assets/icons/icons8-gmail.svg'
import discord from '@/assets/icons/icons8-discord.svg'
</script>

<template>
    <footer class="block w-full px-2">
        <div class="flex flex-col space-y-3">
            <div class="flex items-center text-[18px] justify-between w-full pb-1 border-b border-black dark:border-green-500 dark:text-gray-200">
                <span>Blog</span>
                <a href="https://medium.com/@gitongacharlie01" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" class="hidden w-10 dark:block" fill="#ffff" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" class="block w-10 dark:hidden" fill="#000" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                </a>
               

            </div>
            <div class="flex justify-between w-full dark:text-gray-200">
                <!--Socials-->
                <nav class="flex flex-col space-y-4">
                    <SocialLink 
                        href="https://www.facebook.com/profile.php?id=100073308548686"
                        :icon="facebook"
                        label="Facebook"
                        tooltip="Check me out on facebook"
                    />
                    <!--Twitter-->
                     <SocialLink 
                        href="https://x.com/Imurigugitonga?t=i-3-KYfZ_dKrTgHLqH3jig&s=08"
                        :icon="twitter"
                        label="X(twitter)"
                        tooltip="Follow me on twitter"
                    />
                    <!--Instagram-->
                    <SocialLink 
                        href="https://www.instagram.com/murigugitonga01?igsh=bGk0dTJncWd1djl1"
                        :icon="instagram"
                        label="Instagram"
                        tooltip="Check out my insta!"
                    />
                </nav>
                <div class="flex items-center justify-center">
                    <img src="@/assets/images/murigu.png" class="h-12 aspect-auto" alt="">
                </div> 
                <nav class="flex flex-col space-y-4 dark:text-gray-200">
                     <SocialLink 
                        href="https://www.linkedin.com/in/charles-gitonga-915bab360?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                        :icon="linkedIn"
                        label="linkedIn"
                        tooltip="Check me out on LinkedIn"
                    />
                    <!--Gmail-->
                    <SocialLink 
                        href="mailto:gitongacharlie01@gmail.com?subject=Website%20Inquiry&body=Hello%2C%0AI%20would%20like%20to%20know%20more%20about%20your%20services."
                        :icon="gmail"
                        label="gmail"
                        tooltip="Send me an gmail"
                    />
                    <!--Discord-->
                     <SocialLink 
                        href="https://discord.gg/qYSk4UsUQ"
                        :icon="discord"
                        label="Discord"
                        tooltip="Check out my discord server"
                    />
                </nav>
            </div>
            <div class="flex justify-center mx-12 border-t border-black dark:border-green-500 border-x rounded-t-xl dark:text-gray-100">
                <div class="flex flex-col items-center py-2 space-y-1 text-xs text-gray-600 dark:text-gray-300">
                    <p>Powered by Vue3, Tailwind and Strapi</p>
                    <p>Murigu Gitonga 2025</p>
                    <p>All Rights Reserved</p>
                </div>
            </div>
        </div>
    </footer>
</template>