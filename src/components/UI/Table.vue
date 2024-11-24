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
                <h2>Тут пусто!</h2>
            </template>
        </v-data-table>
        <Modal :text="modalText" v-model:dialog="isDialogOpen" @answer="handleAnswer" />
        <ElementModal v-model:dialog="isElementModalOpen" :element-id="elementToEditId" :key-word="elementToEditKey"
            :value-word="elementToEditValue" @submit-form="handleEditElement" />
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, defineProps, defineEmits } from 'vue'
import Modal from './Modal.vue';
import ElementModal from './Module/ElementModal.vue';
const emit = defineEmits();

// секция модалки
const modalText = ref("Вы уверены, что хотите удалить объект?")
const isDialogOpen = ref(false)
const itemToDelete = ref(null)
const elementId = ref(null)

const deleteItem = (item) => {
    itemToDelete.value = item
    isDialogOpen.value = true
    elementId.value = item.id
}

const handleAnswer = (answer) => {
    if (answer) {
        // Удаляем элемент
        console.log("Типа удалили компонент")
        console.log(elementId.value)
        emit('delete-item', elementId.value)
    }
    isDialogOpen.value = false
    console.log("Типа нет")
}
// секция

// Секция модалки редактирования
const isElementModalOpen = ref(false)
const elementToEditId = ref(0)
const elementToEditKey = ref('')
const elementToEditValue = ref('')
const editItem = (item) => {
    elementToEditId.value = item.id;
    elementToEditKey.value = item.key;
    elementToEditValue.value = item.value;
    isElementModalOpen.value = true;
};
const handleEditElement = (data) => {
    if (data) {
        const model = {
            key: data.key,
            value: data.value,
            elementId: data.elementId
        }
        emit('edit-item', model)
    }
}

// Секция

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

// watch(dialog, (val) => {
//     if (!val) close()
// })

// watch(dialogDelete, (val) => {
//     if (!val) closeDelete()
// })

// TODO
const initialize = () => {
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

h2 {
    font-weight: 400;
}

.table {
    border-radius: 20px;
}
</style>