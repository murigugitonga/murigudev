<script setup>
import telegram from '@/assets/icons/icons8-telegram-app.svg'
import greenapp from '@/assets/icons/icons8-whatsapp.svg'
import gmail from '@/assets/icons/icons8-gmail.svg'

import QRCode from 'qrcode'
import { ref, nextTick } from 'vue'

const toastMessage = ref("")
const showQR = ref(false)
const qrImage = ref(null)
const qrTitle = ref("")

const contacts = [
    {
        name: "WhatsApp",
        icon: greenapp,
        alt: "WhatsApp",
        link: "https://wa.me/254792684339?text=Hi!%20I%20am%20interested%20in%20your%20services",
        qr: true
    },
    {
        name: "Telegram",
        icon: telegram,
        alt: "Telegram",
        link: "https://t.me/murigu_gitonga",
        qr: true
    },
    {
        name: "Gmail",
        icon: gmail,
        alt: "Gmail",
        isGmail: true,
        link: "#"
    },
]

function showToast(message) {
    toastMessage.value = message
    setTimeout(() => (toastMessage.value = ""), 2000)
}

async function generateQR(link, title) {
    qrTitle.value = title
    qrImage.value = await QRCode.toDataURL(link, {
        width: 280,
        margin: 2
    })
    showQR.value = true
}

async function handleClick(contact) {
    await nextTick()

    setTimeout(() => {
        const userAgent = navigator.userAgent
        const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(userAgent)

        // QR code for desktop
        if (!isMobile && contact.qr) {
            generateQR(contact.link, `Scan to open ${contact.name} on your phone`)
            return
        }

    
        // WhatsApp & Telegram link handling
        if (!contact.isGmail) {
            window.open(contact.link, "_blank")
            return
        }

        
        // gmail handling
        const email = "gitongacharlie01@gmail.com"
        const subject = "Services Enquiry"
        const body = "Hi! I'd like to know more about your services."

        const mailtoLink =
            `mailto:${email}` +
            `?subject=${encodeURIComponent(subject)}` +
            `&body=${encodeURIComponent(body)}`

        const gmailWebLink =
            `https://mail.google.com/mail/?view=cm&fs=1&to=${email}` +
            `&su=${encodeURIComponent(subject)}` +
            `&body=${encodeURIComponent(body)}`

        if (isMobile) {
            window.location.href = mailtoLink
        } else {
            window.open(gmailWebLink, "_blank")
        }
    }, 200)
}
</script>

<template>
    <div class="flex flex-col space-y-5 font-medium pe-5">

        <!-- Contact -->
        <a 
            v-for="contact in contacts"
            :key="contact.name"
            href="#"
            @click.prevent="() => handleClick(contact)"
            class="flex items-center justify-between p-1.5 transition rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900"
        >
            <div class="flex items-center space-x-3">
                <img :src="contact.icon" :alt="contact.alt" class="w-8 h-8" />
                <span class="font-normal text-[13px] md:text-[15px] dark:text-gray-100">
                    {{ contact.name }}
                </span>
            </div>

            <svg class="w-2 h-5 dark:invert" viewBox="0 0 6 10">
                <path
                    d="M0.0739384 0.960613C0.0266174 0.913679 0 0.84979 0 0.78314C0 0.716491 0.0266174 0.652602 0.0739384 0.605667L0.603858 0.0757478C0.649218 0.0274165 0.712548 0 0.778831 0C0.845114 0 0.908445 0.0274165 0.953805 0.0757478L5.54811 4.67005C5.61844 4.7403 5.658 4.8356 5.65809 4.93501V5.06499C5.658 5.1644 5.61844 5.2597 5.54811 5.32995L0.953805 9.92425C0.908445 9.97258 0.845114 10 0.778831 10C0.712548 10 0.649218 9.97258 0.603858 9.92425L0.0739384 9.39433C0.0266174 9.3474 0 9.28351 0 9.21686C0 9.15021 0.0266174 9.08632 0.0739384 9.03939L4.11333 5L0.0739384 0.960613Z"
                    fill="black"
                />
            </svg>
        </a>

        <!-- TOAST -->
        <transition name="fade">
            <div
                v-if="toastMessage"
                class="absolute top-0 px-4 text-[13px] md:text-[15px] py-2 mb-2 text-sm text-white -translate-x-1/2 bg-gray-900 rounded-lg shadow-lg left-1/2"
            >
                {{ toastMessage }}
            </div>
        </transition>

        <!-- qr modal for desktop-->
        <div 
            v-if="showQR"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            @click="showQR = false"
        >
            <div 
                class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-[330px] text-center space-y-4"
                @click.stop
            >
                <h3 class="text-lg font-semibold dark:text-gray-100">
                    {{ qrTitle }}
                </h3>
                <img :src="qrImage" alt="QR Code" class="mx-auto rounded-lg shadow-md" />

                <button
                    class="px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500"
                    @click="showQR = false"
                >
                    Close
                </button>
            </div>
        </div>
    </div>
</template>
