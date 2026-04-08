<script setup>
</script>

<template>
    <div class="flex flex-1 flex-col gap-3">
        <div class="grid grid-cols-1 xl:grid-cols-3 gap-3 w-full">
            <div class="flex flex-col gap-2 bg-[#28002b] rounded-md h-fit p-4">
                <span class="text-white text-md font-bold">Appearances</span>
                <span class="text-white text-4xl font-bold">10</span>
            </div>

            <div class="flex flex-col gap-2 bg-[#28002b] rounded-md h-fit p-4">
                <span class="text-white text-md font-bold">Goals</span>
                <span class="text-white text-4xl font-bold">1</span>
            </div>

            <div class="flex flex-col gap-2 bg-[#28002b] rounded-md h-fit p-4">
                <span class="text-white text-md font-bold">Assists</span>
                <span class="text-white text-4xl font-bold">2</span>
            </div>
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-2 gap-3 w-full">
            <div class="grid grid-cols-2 bg-[#28002b] rounded-2xl h-[350px] p-4"></div>
            <div class="grid grid-cols-2 bg-[#28002b] rounded-2xl h-[350px] p-4"></div>
            <div class="grid grid-cols-2 bg-[#28002b] rounded-2xl h-[205px] p-4"></div>
            <div class="grid grid-cols-2 bg-[#28002b] rounded-2xl h-[205px] p-4"></div>
        </div>

        <div class="!bg-[#28002b] rounded-2xl h-[205px] w-full p-4"></div>

    </div>
</template>