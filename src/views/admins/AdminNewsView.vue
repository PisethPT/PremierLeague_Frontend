<script setup>
import { ref, reactive, defineProps, defineEmits, onMounted, computed, watch } from 'vue';
import { useNewsStore } from '@/stores/newsStore';
import BaseDialogForm from '@/components/BaseDialogForm.vue';
import BaseTable from '@/components/BaseTable.vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import
{
    Plus,
    ZoomIn,
    EditPen,
    Delete,
    Search,
    VideoCameraFilled,
} from '@element-plus/icons-vue'

// ref
const form = reactive({
    id: 0,
    title: '',
    subTitle: '',
    body: '',
    publishedDate: '',
    expireDate: '',
    isActive: false,
    videoLink: '',
    image: '',
});
const newsStore = useNewsStore();
const NEWS_IMAGE_DIR = ref('');
const news = ref([]);
const fileList = ref([]);
const previewVisible = ref(false);
const previewVideoVisible = ref(false);
const dialogImageUrl = ref('');
const videoUrl = ref('');
const videoLoading = ref(false);
const isEmbed = ref(true);
const query = ref('');
const modelValue = ref(false);
const submitLoading = ref(false);
const loading = ref(false);
const width = ref('800px');
const title = ref('Add News Info');

const rules = {
    title: [{ required: true, message: 'Please enter news title', trigger: 'blur' }],
    subTitle: [{ required: true, message: 'Please enter news sub title', trigger: 'blur' }],
    body: [{ required: true, message: 'Please enter news body', trigger: 'blur' }],
    publishedDate: [{ required: true, message: 'Select publish date time', trigger: 'blur' }],
    expireDate: [{ required: true, message: 'Select expire date time', trigger: 'blur' }],
}

const columns = [
    { label: 'Image', prop: 'image', width: 200, slot: 'image', align: 'center' },
    { label: 'Video Link', prop: 'videoLink', width: 200, slot: 'video', align: 'center' },
    { label: 'Active', prop: 'isActive', slot: 'isActive', width: 120, align: 'center', sortable: true },
    { label: 'News Title', prop: 'title', minWidth: 400, sortable: true },
    { label: 'Sub Title', prop: 'subTitle', minWidth: 400, sortable: true },
    { label: 'Body Content', prop: 'body', minWidth: 600, sortable: true },
    { label: 'Published Date', prop: 'publishedDate', slot: 'publishedDate', width: 200, align: 'center', sortable: true },
    { label: 'Expire Date', prop: 'expireDate', slot: 'expireDate', width: 200, align: 'center', sortable: true },
    { label: 'Publisher', prop: 'publisher', width: 200, slot: 'publisher', align: 'center', sortable: true }
]

const emit = defineEmits(['update:modelValue', 'update:form', 'submit']);

watch(() => form, (val) => // form as reactive
{
    //console.log('watching: ', fileList.value, ' value: ', val);
    if (val)
    {
        Object.assign(form, val);
        fileList.value = val.image ? [{
            name: `${val.image}`,
            url: val.image,
            raw: null,
            status: 'success'
        }] : [];

        //console.log('file list: ' + fileList.value);

    }
    emit('update:modelValue', modelValue.value);
    emit('update:form', { ...form });
    emit('submit', { ...form, fileList: fileList.value });
}, { immediate: true, deep: true });

//
onMounted(async () =>
{
    try
    {
        loading.value = true;
        await newsStore.getNews();
        news.value = newsStore.news.news;
        NEWS_IMAGE_DIR.value = newsStore.NEWS_IMAGE_DIR;

    } catch (error)
    {
        console.log('error: ' + error);
        ElMessage.error('Error happened on mounted: ' + error);
    } finally
    {
        loading.value = false;
    }
})

// computed
const tableData = computed(() =>
{
    return news.value.filter((n) =>
    {
        return (
            n.title.toString().toLowerCase().includes(query.value.toLowerCase()) ||
            n.subTitle.toString().toLowerCase().includes(query.value.toLowerCase()) ||
            n.body.toString().toLowerCase().includes(query.value.toLowerCase()) ||
            n.publishedDate.toString().toLowerCase().includes(query.value.toLowerCase()) ||
            n.expireDate.toString().toLowerCase().includes(query.value.toLowerCase()) ||
            n.isActive.toString().toLowerCase().includes(query.value.toLowerCase())
        )
    })
})

function handleOpenDialog()
{
    title.value = 'Add News Info';
    Object.assign(form, {
        id: 0,
        title: '',
        subTitle: '',
        body: '',
        publishedDate: '',
        expireDate: '',
        isActive: false,
        videoLink: '',
        image: '',
    });
    fileList.value.length = 0;
    dialogImageUrl.value = '';
    previewVideoVisible.value = false;

    modelValue.value = true;
    loading.value = false;
    submitLoading.value = false;
}

function handleEdit(row)
{
    //console.log('Edit id: ' + row.id);
    form.id = row.id;
    form.title = row.title;
    form.subTitle = row.subTitle;
    form.body = row.body;
    form.publishedDate = row.publishedDate;
    form.expireDate = row.expireDate;
    form.isActive = row.isActive;
    form.videoLink = row.videoLink == 'null' ? '' : row.videoLink;
    if (row.image && !row.image.startsWith('http'))
    {
        form.image = NEWS_IMAGE_DIR.value + row.image;
    }

    modelValue.value = true;
    loading.value = false;
}

async function handleDelete(row)
{
    console.log('Delete id: ' + row.id);

    ElMessageBox.confirm(`
        <div class="flex flex-col gap-3">
            <img src="${row.image ? NEWS_IMAGE_DIR.value + row.image : ''}" alt="${row.image}" class="w-2xs object-contain mx-auto"/>    
            <span class="text-center">Do you want to delete this news title <br/><strong class="text-blue-500 text-wrap">${row.title}</strong> ?</span>
        </div>
    `, {
        type: 'warning',
        title: 'Delete News Dialog',
        confirmButtonText: 'Ok',
        cancelButtonText: 'Cancel',
        center: true,
        dangerouslyUseHTMLString: true,
    }).then(async () =>
    {
        try
        {
            const newId = row.id;
            if (!newId)
            {
                ElMessage.error({ type: 'danger', message: 'News not found for delete' });
                return;
            }

            const data = await newsStore.deleteNewsById(newId);
            if (data === 200)
            {
                ElMessage.success('News Delete Successfully');
            } else
            {
                ElMessage.error({ type: 'danger', message: 'Error Delete News: ' + data });
            }

        } catch (error)
        {
            ElMessage.error({
                type: 'danger',
                message: 'Error' + error,
            })
        } finally
        {

        }
    }).catch(() =>
    {
        ElMessage.info({
            type: 'info',
            message: 'Delete News Canceled',
        })
    })
}

async function handleSubmit()
{
    submitLoading.value = true;
    try
    {
        if (!fileList.value.length)
        {
            ElMessage.warning('Please select a club crest')
            return
        }

        if (form.id !== 0)
        {
            //console.log('form: ', form, 'fileList: ', fileList.value);
            const data = await newsStore.editNews({ ...form }, fileList.value, form.id);
            if (data === 200)
            {
                ElMessage.success('Edit News Successfully');
                modelValue.value = false;
            } else
            {
                ElMessage.error('Error happened: ' + data);
            }
        } else
        {
            //console.log('form: ', form, 'fileList: ', fileList.value);
            const data = await newsStore.createNews({ ...form }, fileList.value);
            if (data === 201)
            {
                ElMessage.success('Create News Successfully');
                modelValue.value = false;
            } else
            {
                ElMessage.error('Error happened: ' + data);
            }
        }
        emit('update:form', { ...form });
        emit('submit', { ...form.value, fileList: fileList.value });
    } catch (error)
    {
        console.error('Submit error:', error);
        ElMessage.error(error.response?.data?.message || 'Submit failed');
    } finally
    {
        submitLoading.value = false;
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

function handleRemoveFile(file)
{
    const index = fileList.value.indexOf(file)
    if (index !== -1)
    {
        if (file.raw && file.url) URL.revokeObjectURL(file.url)
        fileList.value.splice(index, 1)
    }
}

function handlePreviewFile(file)
{
    dialogImageUrl.value = file.url
    previewVisible.value = true
}

const formatDate = (dateString) =>
{
    const date = new Date(dateString)
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
        'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    return `${weekdays[date.getDay()]}, ${String(date.getDate()).padStart(2, '0')}-${months[date.getMonth()]}-${date.getFullYear()}`
}

// Method to open dialog and load video
async function handlePreviewVideo(url)
{
    previewVideoVisible.value = true;
    videoLoading.value = true;
    try
    {
        videoUrl.value = await formatVideoLink(url);
        console.log('Formatted video URL:', videoUrl.value);
    } catch (error)
    {
        console.error('Error formatting video URL:', error);
        videoUrl.value = '';
    } finally
    {
        videoLoading.value = false;
    }
}

async function formatVideoLink(link)
{
    const ytRegex =
        /(?:https?:\/\/)?(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]+)/;
    const match = link.match(ytRegex);

    if (match && match[1])
    {
        isEmbed.value = true;
        const videoId = match[1];
        return `https://www.youtube.com/embed/${videoId}?autoplay=0`;
    }

    // Fallback for direct video file links
    isEmbed.value = false;
    return link;
}

</script>

<template>
    <!-- dialog -->
    <BaseDialogForm v-model="modelValue" :form="form" :rules="rules" :loading="submitLoading" :width="width"
        :disabled="!fileList.length" :title="title" @update:modelValue="emit('update:modelValue', $event)"
        @update:form="emit('update:form', $event)" @submit="handleSubmit">
        <template #form>
            <el-form-item label="New Title" prop="title">
                <el-input type="textarea" maxlength="200" show-word-limit :rows="2" v-model="form.title" clearable />
            </el-form-item>
            <el-form-item label="Sub Title" prop="subTitle">
                <el-input type="textarea" maxlength="500" show-word-limit :rows="3" v-model="form.subTitle" clearable />
            </el-form-item>
            <el-form-item label="Body" prop="body">
                <el-input type="textarea" maxlength="4000" show-word-limit :autosize="{ minRows: 6, maxRows: 12 }"
                    v-model="form.body" clearable />
            </el-form-item>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <el-form-item label="Publish Date" prop="publishedDate">
                    <el-date-picker v-model="form.publishedDate" clearable />
                </el-form-item>

                <el-form-item label="Expire Date" prop="expireDate">
                    <el-date-picker v-model="form.expireDate" clearable />
                </el-form-item>
            </div>
            <el-form-item label="Video Link"> <el-input v-model="form.videoLink"
                    placeholder="Please input news video link" clearable>
                    <template #prepend>Https://</template>
                </el-input>
            </el-form-item>

            <el-form-item label="Is Active">
                <el-checkbox v-model="form.isActive" />
            </el-form-item>

            <el-form-item label="News Image">
                <el-upload action="#" :auto-upload="false" list-type="picture-card" :limit="1" :file-list="fileList"
                    :on-change="handleFileChange">
                    <el-icon>
                        <Plus />
                    </el-icon>
                    <template #file="{ file }">
                        <img class="el-upload-list__item-thumbnail" :src="file.url" />
                        <span class="el-upload-list__item-actions">
                            <span class="el-upload-list__item-preview" @click="handlePreviewFile(file)">
                                <el-icon>
                                    <ZoomIn />
                                </el-icon>
                            </span>
                            <span class="el-upload-list__item-delete" @click="handleRemoveFile(file)">
                                <el-icon>
                                    <Delete />
                                </el-icon>
                            </span>
                        </span>
                    </template>
                </el-upload>
            </el-form-item>
        </template>
    </BaseDialogForm>

    <!-- table -->
    <BaseTable :table-data="tableData" :columns="columns" :loading="loading" :show-index="true">
        <template #publishedDate="{ row }">
            <span>{{ formatDate(row.publishedDate) }}</span>
        </template>
        <template #expireDate="{ row }">
            <span>{{ formatDate(row.expireDate) }}</span>
        </template>
        <template #isActive="{ row }">
            <div class="flex justify-center item-center w-full">
                <div v-if="row.isActive"
                    class="py-1 px-4 w-fit rounded-full text-xs text-center border-1 bg-green-500 text-white hover:bg-green-400 cursor-pointer">
                    Active
                </div>
                <div v-else
                    class="py-1 px-4 w-fit rounded-full text-xs text-center border-1 bg-gray-500 text-white hover:bg-gray-400 cursor-pointer">
                    Inactive
                </div>
            </div>
        </template>
        <template #image="{ row }">
            <img :src="row.image ? NEWS_IMAGE_DIR + row.image : ''" :alt="row.image"
                class="transition-transform duration-300 hover:scale-125 cursor-pointer" />
        </template>
        <template #video="{ row }">
            <div v-if="row.videoLink && row.videoLink !== 'null'">
                <span @click="handlePreviewVideo(row.videoLink)" class="hover:cursor-pointer hover:text-blue-500">
                    <el-icon size="25" color="primary" class="transition-transform duration-300 hover:scale-125">
                        <VideoCameraFilled />
                    </el-icon></span>
            </div>
            <span v-else>-</span>
        </template>
        <template #publisher="{ row }">
            <span>{{ row.user && row.user.firstName ? row.user.firstName : '' }} {{ row.user && row.user.lastName ?
                row.user.lastName : '' }}</span>
        </template>

        <template #actions>
            <el-table-column label="Actions" width="420" label-class-name="text-center" align="center" fixed="right">
                <template #header>
                    <div class="flex justify-between gap-2">
                        <el-input v-model="query" size="normal" placeholder="Search ..." :prefix-icon="Search"
                            clearable />
                        <el-button type="info" @click="handleOpenDialog" :icon="Plus" plain>Add New</el-button>
                    </div>
                </template>
                <template #default="{ row }">
                    <el-button type="warning" @click="handleEdit(row)" :icon="EditPen" plain
                        class="shadow-sm hover:shadow-md transition-shadow">Edit</el-button>
                    <el-button type="danger" @click="handleDelete(row)" :icon="Delete" plain
                        class="shadow-sm hover:shadow-md transition-shadow">Delete</el-button>
                </template>
            </el-table-column>
        </template>
    </BaseTable>

    <!-- table footer-->
    <div
        class="px-4 py-3 border-t border-gray-200 bg-gray-50 flex flex-col md:flex-row items-center justify-between gap-3">
        <div class="text-sm text-gray-600">
            Showing <span class="font-medium">{{ tableData.length }}</span> disciplinary records
        </div>
        <div class="flex items-center gap-2">
            <span class="text-sm text-gray-600">News:</span>
            <span class="inline-flex items-center gap-1 text-sm font-medium">
                <span class="w-3 h-3 bg-green-600 rounded-full"></span>
                {{ yellowCardCount }} Active
            </span>
            <span class="inline-flex items-center gap-1 text-sm font-medium">
                <span class="w-3 h-3 bg-gray-600 rounded-full"></span>
                {{ redCardCount }} Inactive
            </span>
        </div>
    </div>

    <!-- image preview -->
    <el-dialog v-model="previewVisible" width="500px">
        <img class="w-full" :src="dialogImageUrl" alt="Preview" />
    </el-dialog>

    <!-- video preview -->
    <el-dialog v-model="previewVideoVisible" width="600px" title="Preview Video">
        <div v-if="videoLoading" class="w-full flex justify-center items-center" style="height: 300px;"
            v-loading="true">
        </div>
        <iframe v-else :src="videoUrl" class="w-full" height="340" frameborder="0" allowfullscreen></iframe>
    </el-dialog>

</template>
