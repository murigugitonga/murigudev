<script setup>
import SectHeader from '../SectHeader.vue';


</script>
<template>
    <div class="flex flex-col space-y-5">
        <!--heading here-->
        <SectHeader message="Miscellaneous"/>
        <div class="grid grid-cols-1 gap-8 justify-items-start md:justify-items-center text-gray-100 text-lg md:grid-cols-3 bg-[#022533] mx-2 rounded-xl p-3">
            <ul class="flex flex-col space-y-2 text-[15px] md:text-[18px]">
                <li>Responsive web design</li>
                <li>Responsive web development</li>
                <li>REST API development $ consumption</li>
                <li>Payment Gateway integration (learning)</li>
                <li>AI integration with Node (Learning)</li>
                <li>Agile and scrum Methodologies</li>
            </ul>
            <!--contains divider border for smaller screens-->
            <div class="flex items-center w-full">
                <div class="hidden h-full border border-b-2 border-gray-100 md:block"></div>
                <div class="w-full mx-10 border border-b border-gray-300 md:hidden"></div>
            </div>
            
            <ul class="flex flex-col space-y-2 text-[15px] md:text-[18px]">
                <li>Data Entry with Excel</li>
                <li>Bash scripting w/ linux</li>
                <li>IT Support</li>
            </ul>

        </div>
    </div>
</template>