<script setup>
import { ref } from 'vue'
import { User, Lock, Message, Male, Female } from '@element-plus/icons-vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

// Register Form Model
const registerForm = ref({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: null
})

// Gender options
const genderOptions = [
    { id: 0, name: 'Male', icon: Male },
    { id: 1, name: 'Female', icon: Female }
]

// Validation Rules
const rules = {
    firstName: [{ required: true, message: 'Please enter first name', trigger: 'blur' }],
    lastName: [{ required: true, message: 'Please enter last name', trigger: 'blur' }],
    email: [{ required: true, message: 'Please enter email', trigger: 'blur' }],
    password: [{ required: true, message: 'Please enter password', trigger: 'blur' }],
    gender: [{ required: true, message: 'Please select gender', trigger: 'change' }]
}

const registerFormRef = ref()

async function onRegister()
{
    registerFormRef.value.validate(async (valid) =>
    {
        if (valid)
        {
            await authStore.register(registerForm.value);
        }
    });
}
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#56015e] to-[#1e0021]">
        <div class="bg-white/90 rounded-md shadow-2xl p-8 w-full max-w-lg">
            <div class="text-center mb-6">
                <img src="/src/assets/pl-main-logo.png" alt="EPL Logo" class="mx-auto h-16 mb-4" />
                <h1
                    class="text-3xl font-bold bg-gradient-to-r from-[#56015e] to-[#1e0021] bg-clip-text text-transparent">
                    Register Account
                </h1>
            </div>

            <el-form :model="registerForm" :rules="rules" ref="registerFormRef" label-position="top">
                <el-form-item label="First Name" prop="firstName">
                    <el-input v-model="registerForm.firstName" placeholder="Enter first name" size="large"
                        :prefix-icon="User" clearable />
                </el-form-item>

                <el-form-item label="Last Name" prop="lastName">
                    <el-input v-model="registerForm.lastName" placeholder="Enter last name" size="large"
                        :prefix-icon="User" clearable />
                </el-form-item>

                <el-form-item label="Email" prop="email">
                    <el-input v-model="registerForm.email" type="email" placeholder="Enter email" size="large"
                        :prefix-icon="Message" clearable />
                </el-form-item>

                <el-form-item label="Password" prop="password">
                    <el-input v-model="registerForm.password" type="password" placeholder="Enter password" size="large"
                        :prefix-icon="Lock" autocomplete="off" clearable />
                </el-form-item>

                <el-form-item label="Gender" prop="gender">
                    <el-select v-model="registerForm.gender" placeholder="Select gender" size="large" class="w-full">
                        <el-option v-for="option in genderOptions" :key="option.id" :label="option.name"
                            :value="option.id">
                            <div class="flex items-center gap-2">
                                <component :is="option.icon" class="w-4 h-4 text-gray-700" />
                                <span>{{ option.name }}</span>
                            </div>
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button size="large" class="w-full mt-4 !bg-purple-900 !text-white hover:bg-green-700"
                        @click="onRegister">
                        Register
                    </el-button>
                </el-form-item>
            </el-form>

            <div class="flex justify-center mt-2">
                <span class="text-center self-center">
                    Already have an account? click
                    <el-link href="/" type="primary" :underline="false"> Login</el-link>
                </span>
            </div>
        </div>
    </div>
</template>
