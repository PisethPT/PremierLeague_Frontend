<script setup>
import { ref, watch, onMounted } from 'vue';
import { Search, UploadFilled } from '@element-plus/icons-vue';
import { useIssueStore } from '@/stores';

const issues = ref([]);
const ISSUE_FILE_DIR = ref('');
const drawer = ref(false);
const query = ref('');
const label = ref('');
const description = ref('');
const fileList = ref([]);

function cancelClick()
{
    drawer.value = false
}
function confirmClick()
{
    drawer.value = false
}

const isAdding = ref(false)
const optionName = ref('')

const checkAll = ref(false)
const indeterminate = ref(false)
const value = ref([])
const cities = ref([
    {
        value: '1',
        label: 'bug',
    },
    {
        value: '2',
        label: 'documentation',
    },
    {
        value: '3',
        label: 'duplicate',
    },
    {
        value: '4',
        label: 'enhancement',
    },
    {
        value: '5',
        label: 'good first issue',
    },
    {
        value: '6',
        label: 'help wanted',
    },
    {
        value: '7',
        label: 'invalid',
    },
    {
        value: '8',
        label: 'question',
    },
    {
        value: '9',
        label: 'wontfix',
    },
]);

watch(value, (val) =>
{
    if (val.length === 0)
    {
        checkAll.value = false
        indeterminate.value = false
    } else if (val.length === cities.value.length)
    {
        checkAll.value = true
        indeterminate.value = false
    } else
    {
        indeterminate.value = true
    }
});


onMounted(async () =>
{
    const issueStore = useIssueStore();
    await issueStore.fetchIssues();
    issues.value = issueStore.issues;
    ISSUE_FILE_DIR.value = issueStore.ISSUE_FILE_DIR;
});

const handleCheckAll = (val) =>
{
    indeterminate.value = false
    if (val)
    {
        value.value = cities.value.map((_) => _.value)
    } else
    {
        value.value = []
    }
}

function handleFileChange(uploadFile, uploadFiles)
{
    fileList.value = uploadFiles.map(file =>
    {
        if (file.raw) file.url = URL.createObjectURL(file.raw)
        return file
    })
}

const onAddOption = () =>
{
    isAdding.value = true
}

const onConfirm = () =>
{
    if (optionName.value)
    {
        cities.value.push({
            label: optionName.value,
            value: optionName.value,
        })
        clear()
    }
}

const clear = () =>
{
    optionName.value = ''
    isAdding.value = false
}

</script>

<template>
    <div class="m-5 flex justify-center flex-col items-center">
        <div class="flex justify-justify-between items-center gap-3 w-full mb-5" style="max-width: 1200px">
            <el-input v-model="query" class="w-fit" placeholder="is:issue" clearable>
                <template #append>
                    <el-button :icon="Search" />
                </template>
            </el-input>
            <el-select v-model="value" multiple clearable collapse-tags placeholder="Labels"
                popper-class="custom-header" :max-collapse-tags="1" style="width: 200px">
                <template #header>
                    <el-checkbox v-model="checkAll" :indeterminate="indeterminate" @change="handleCheckAll">
                        All
                    </el-checkbox>
                </template>
                <el-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-button type="success" @click="drawer = true">
                New issue
            </el-button>
        </div>
        <!-- Timeline -->
        <el-timeline v-for="issue in issues" :key="issue.id" style="max-width: 1200px">
            <el-timeline-item :timestamp="issue.createdAt" placement="top">
                <el-card class="relative z-10">
                    <div class="absolute px-2 py-0.5 rounded-bl-sm w-auto right-0 top-0 text-sm text-white text-center opacity-30"
                        :style="{ backgroundColor: issue.label.color }">
                        {{ issue.label.name }}</div>
                    <h4 class="text-lg font-semibold">{{ issue.title }}</h4>
                    <p>{{ issue.creatorBy }} committed {{ issue.createdAt }}</p>
                    <p class="mt-2 text-sm text-gray-500 break-words"
                        v-html="issue.description ? issue.description.replace(/\\n/g, '<br />') : ''">
                    </p>
                    <div class="mt-4 grid grid-cols-1 xl:grid-cols-2 gap-4 w-full">
                        <img v-for="filePath in issue.filePaths" :key="filePath" :src="ISSUE_FILE_DIR + filePath"
                            alt="logo" class="w-full h-auto rounded-lg" />
                    </div>
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </div>

    <el-drawer v-model="drawer">
        <template #header>
            <h4>Create new issue</h4>
        </template>
        <template #default>
            <div class="px-2">
                <el-form label-width="80px">
                    <el-form-item label="Title" label-position="top">
                        <el-input v-model="label" placeholder="Title" />
                    </el-form-item>
                    <el-form-item label="Description" label-position="top">
                        <el-input v-model="description" type="textarea" maxlength="4000" show-word-limit
                            :autosize="{ minRows: 15, maxRows: 24 }"
                            placeholder="Type your description here...\n\nExample:\n1. First task\n2. Second task\n3. ..." />
                    </el-form-item>
                    <el-form-item label="Labels" label-position="left">
                        <el-select v-model="value" placeholder="No labels" popper-class="custom-header" class="w-fit"
                            multiple>
                            <el-option v-for="item in cities" :key="item.value" :label="item.label"
                                :value="item.value" />
                            <template #footer>
                                <el-button v-if="!isAdding" text bg size="small" @click="onAddOption">
                                    Add an option
                                </el-button>
                                <template v-else>
                                    <el-input v-model="optionName" class="option-input" placeholder="input option name"
                                        size="small" />
                                    <el-button type="primary" size="small" @click="onConfirm">
                                        confirm
                                    </el-button>
                                    <el-button size="small" @click="clear">cancel</el-button>
                                </template>
                            </template>
                        </el-select>
                    </el-form-item>
                    <el-form-item label-position="top">
                        <el-upload :file-list="fileList" :on-change="handleFileChange" class="w-full" drag
                            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple>
                            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                            <div class="el-upload__text">
                                Drop file here or <em>click to upload</em>
                            </div>
                            <template #tip>
                                <div class="el-upload__tip">
                                    jpg/png files with a size less than 500kb
                                </div>
                            </template>
                        </el-upload>
                    </el-form-item>

                </el-form>
            </div>
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="cancelClick">Cancel</el-button>
                <el-button type="success" @click="confirmClick">Create</el-button>
            </div>
        </template>
    </el-drawer>
</template>

<style scoped>
.option-input {
    width: 100%;
    margin-bottom: 8px;
}
</style>