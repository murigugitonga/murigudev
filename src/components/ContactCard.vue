<script setup>
import telegram from '@/assets/icons/icons8-telegram-app.svg'
import greenapp from '@/assets/icons/icons8-whatsapp.svg'
import gmail from '@/assets/icons/icons8-gmail.svg'
import { ref, nextTick } from 'vue'

const toastMessage = ref("")

const contacts = [
    {name : "WhatsApp", icon: greenapp, alt:"WhatsApp", link: "https://wa.me/254792684339?text=Hi!%20I%20am%20interested%20in%20your%20services"},
    {name : "Telegram", icon: telegram, alt:"Telegram", link: "https://t.me/murigu_gitonga"},
    {name : "Gmail", icon: gmail, alt:"Gmail", isGmail: true, link: "mailto:gitongacharlie01@gmail.com?subject=Services%20Inquiry&body=Hello%2C%0AI%20would%20like%20to%20know%20more%20about%20your%20services."},
]
function showToast(message){
    toastMessage.value = message;
    setTimeout(() => (
        toastMessage.value = ""
    ), 2000);
}


async function handleClick(contact){
    await nextTick();
    // delay logic slightly to avoid clashing with modal open timing
    setTimeout(() => {
        if (!contact.isGmail) {
        // handle other links
        window.open(contact.link, "_blank")
        return
    }
    const gmailLink = "gitongacharlie01@gmail.com"
    const subject = "Services Enquiry"
    const body = "Hi! I'd like to know more about your services."

    const mailtoLink = `mailto:${gmailLink}?subject=${encodeURIComponent(subject)} &body=${encodeURIComponent(body)}`

    const gmailWebLink = `https://mail.google.com/mail/?view-cm&fs=1&to=${encodeURIComponent(gmailLink)} &subject=${encodeURIComponent(subject)} &body=${encodeURIComponent(body)}`

    const userAgent = navigator.userAgent || window.opera
    const isMobile = /Android | iPhone | iPad | iPod | Opera Mini | IEMobile | WPDesktop/i.test(userAgent)
    const isAndroid = /Android/i.test(userAgent)
    // explicit gmail handling
    if (isMobile) {
        if (isAndroid && userAgent.includes("Chrome")) {
            const gmailIntent = `intent://compose?to=${encodeURIComponent(gmailLink)} #intent;package.com.google.android.gm;scheme=mailto;end`
            try {
                window.location.href= gmailIntent
                //fallback if app not found
                setTimeout(() => {
                    showToast("Gmail app not found, opening default mail app")
                }, 600);
            } catch {
                showToast("Gmail app not found - opening default mail app")
                window.location.href = mailtoLink;
            }
        } else{
            // Non android devices
            window.location.href = mailtoLink
        } 
        } else{
            //desktop devices
            window.open(gmailWebLink, "blank")
        }
    }, 200); //delay modal firing
    
}



</script>
<template>
    <div class="flex flex-col space-y-5 font-medium pe-5">
        <a 
            v-for="contact in contacts" 
            :key="contact.name"
            :href="contact.link"
            target="_blank"
            @click.prevent="()=>handleClick(contact)"
            rel="noopener noreferrer"
            class="flex items-center justify-between p-1.5 transition rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900"
            >
            <div class="flex items-center space-x-3">
                <img :src="contact.icon" :alt="contact.alt" class="w-8 h-8">
                <span class="font-medium text-[13px] md:text-[15px] dark:text-gray-100">{{ contact.name}}</span>
            </div>
            <svg class="w-2 h-5 dark:invert" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.0739384 0.960613C0.0266174 0.913679 0 0.84979 0 0.78314C0 0.716491 0.0266174 0.652602 0.0739384 0.605667L0.603858 0.0757478C0.649218 0.0274165 0.712548 0 0.778831 0C0.845114 0 0.908445 0.0274165 0.953805 0.0757478L5.54811 4.67005C5.61844 4.7403 5.658 4.8356 5.65809 4.93501V5.06499C5.658 5.1644 5.61844 5.2597 5.54811 5.32995L0.953805 9.92425C0.908445 9.97258 0.845114 10 0.778831 10C0.712548 10 0.649218 9.97258 0.603858 9.92425L0.0739384 9.39433C0.0266174 9.3474 0 9.28351 0 9.21686C0 9.15021 0.0266174 9.08632 0.0739384 9.03939L4.11333 5L0.0739384 0.960613Z" fill="black"/>
            </svg>
        </a>
        <!--Toast-->
        <transition name ="fade">
            <div v-if="toastMessage" class="absolute top-0 px-4 text-[13px] md:text-[15px] py-2 mb-2 text-sm text-white -translate-x-1/2 bg-gray-900 rounded-lg shadow-lg left-1/2">
                {{ toastMessage }}
            </div>
        </transition>
    </div>
</template>