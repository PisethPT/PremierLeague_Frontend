<script setup>
import { ref } from 'vue';
import { User, Lock } from '@element-plus/icons-vue'
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const registerUrl = ref('/register');

// Create Element Plus Form Model
const loginForm = ref({
    email: '',
    password: '',
});

// Validation Rules
const rules = {
    email: [
        { required: true, message: 'Please enter your email', trigger: 'blur' },
    ],
    password: [
        { required: true, message: 'Please enter your password', trigger: 'blur' },
    ],
};

const loginFormRef = ref();

function onLogin()
{
    loginFormRef.value.validate((valid) =>
    {
        if (valid)
        {
            authStore.login(loginForm.value.email, loginForm.value.password);
        } else
        {
            console.log('❌ Validation failed');
            return false;
        }
    });
}
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#28002b] to-[#330d36]">
        <div class="bg-white/90 rounded-md shadow-2xl p-8 w-full max-w-md">
            <div class="text-center mb-6">
                <img src="/src/assets/pl-main-logo.png" alt="EPL Logo" class="mx-auto h-16 mb-4" />
                <h1
                    class="text-3xl font-bold bg-gradient-to-r from-[#37003c] to-[#1e0021] bg-clip-text text-transparent">
                    English Premier League Login
                </h1>

            </div>

            <el-form :model="loginForm" :rules="rules" ref="loginFormRef" label-position="top">
                <el-form-item label="Email" prop="email">
                    <el-input type="email" v-model="loginForm.email" placeholder="Enter your email" size="large"
                        :prefix-icon="User" clearable></el-input>
                </el-form-item>

                <el-form-item label="Password" prop="password">
                    <el-input v-model="loginForm.password" type="password" placeholder="Enter your password"
                        size="large" :prefix-icon="Lock" autocomplete="off" clearable></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button size="large" class="w-full mt-4 !bg-purple-900 !text-white hover:bg-green-700"
                        @click="onLogin">
                        Log In
                    </el-button>
                </el-form-item>
            </el-form>
            <div class="flex justify-center">
                <span class="text-center self-center">Do you have account ? click <el-link :href="registerUrl"
                        type="primary" :underline="false"> Register</el-link></span>
            </div>
        </div>
    </div>
</template>
