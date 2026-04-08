<script setup>
import { Refresh } from '@element-plus/icons-vue';
</script>

<template>
    <div class="w-full bg-[#2b0030] rounded-2xl p-6 space-y-6">
        <div>
            <h1 class="text-white text-2xl lg:text-3xl font-semibold">
                Premier League Companion,
                <span class="text-gray-300 font-normal">
                    your personalised AI assistant.
                </span>
            </h1>

            <div class="flex items-center gap-2 mt-2">
                <img src="/src/assets/copilot-icon.png" alt="Copilot" class="w-5 h-5" />
                <span class="text-gray-300 text-sm">Powered by Copilot</span>
            </div>
        </div>

        <div class="flex flex-wrap gap-3">
            <button
                class="px-4 py-2 rounded-full border border-white/20 text-white hover:text-black hover:bg-white transition cursor-pointer">
                What have I missed?
            </button>

            <button
                class="px-4 py-2 rounded-full border border-white/20 text-white hover:text-black hover:bg-white transition cursor-pointer">
                Preview Manchester United's next match
            </button>

            <button
                class="px-4 py-2 rounded-full border border-white/20 text-white hover:text-black hover:bg-white transition cursor-pointer">
                Surprise me!
            </button>

            <button
                class="px-4 py-2 rounded-full border border-white/20 text-white hover:text-black hover:bg-white transition cursor-pointer">
                How can I follow the Premier League?
            </button>

            <button
                class="px-4 py-2 bg-[#37003c] rounded-full border border-white/20 text-white flex items-center gap-2 hover:bg-[#410544] transition cursor-pointer">
                <el-icon>
                    <Refresh class="text-white" />
                </el-icon>
                Refresh
            </button>
        </div>

        <div class="relative max-w-md">
            <input type="text" placeholder="Type your question here"
                class="w-full text-white border border-white/20 placeholder-gray-400 rounded-xl px-12 py-3 outline-none focus:ring focus:ring-purple-500" />
            <img src="/src/assets/copilot-icon.png" class="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6" />
        </div>
    </div>
</template>