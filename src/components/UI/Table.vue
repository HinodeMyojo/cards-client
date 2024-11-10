<template>
    <div class="table">
        <v-data-table :headers="headersWithActions" :items="elements" :sort-by="[{ key: 'calories', order: 'asc' }]">
            <template v-slot:item.actions="{ item }">
                <v-icon class="me-2" size="small" @click="editItem(item)">
                    mdi-pencil
                </v-icon>
                <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
            <template v-slot:no-data>
                <v-btn color="primary" @click="initialize"> Reset </v-btn>
            </template>
        </v-data-table>
        <Modal v-if="isModalVisible" :text="modalText" @yes="handleYes" @no="handleNo" />
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, defineProps } from 'vue'
import Modal from './Modal.vue';
// модалка
const isModalVisible = ref(false)
const modalText = ref('Вы уверены, что хотите удалить элемент?')

// Открытие модалки
const openModal = () => {
    isModalVisible.value = true
}

// Обработчики событий
const handleYes = () => {
    console.log('Вы нажали "Да"')
    isModalVisible.value = false // Закрыть модалку
}

const handleNo = () => {
    console.log('Вы нажали "Нет"')
    isModalVisible.value = false // Закрыть модалку
}


const { headers, elements } = defineProps({
    headers: {
        type: Array,
        required: true
    },
    elements: {
        type: Array,
        required: true
    }
})

const headersWithActions = ref([...headers]);

// После получения пропсов, добавим новый столбец "Actions"
watch([headers, elements], () => {
    if (!headersWithActions.value.some(h => h.key === 'actions')) {
        headersWithActions.value.push({
            Title: 'Actions',
            align: 'center',
            key: 'actions',
            sortable: false
        });
    }
}, { immediate: true });

const dialog = ref(false)
const dialogDelete = ref(false)


const desserts = ref([])
const editedIndex = ref(-1)

const editedItem = ref({
    name: '',
    calories: 0,
    fat: 0,
    carbs: 0,
    protein: 0,
})

const defaultItem = {
    name: '',
    calories: 0,
    fat: 0,
    carbs: 0,
    protein: 0,
}

const formTitle = computed(() =>
    editedIndex.value === -1 ? 'New Item' : 'Edit Item'
)

watch(dialog, (val) => {
    if (!val) close()
})

watch(dialogDelete, (val) => {
    if (!val) closeDelete()
})

// TODO
const initialize = () => {
}

// TODO
const editItem = (item) => {

}

const deleteItem = (item) => {
    modalText.value = `Вы уверены, что хотите удалить элемент: ${item.name}?`
    isModalVisible.value = true
}
const deleteItemConfirm = () => {
    desserts.value.splice(editedIndex.value, 1)
    closeDelete()
}

const close = () => {
    dialog.value = false
    editedItem.value = { ...defaultItem }
    editedIndex.value = -1
}

const closeDelete = () => {
    dialogDelete.value = false
    editedItem.value = { ...defaultItem }
    editedIndex.value = -1
}

const save = () => {
    if (editedIndex.value > -1) {
        Object.assign(desserts.value[editedIndex.value], editedItem.value)
    } else {
        desserts.value.push({ ...editedItem.value })
    }
    close()
}

onMounted(initialize)
</script>
<style scoped>
:root .v-theme--dark {
    background-color: #2B2C34;
}

.table {
    border-radius: 20px;
}
</style>