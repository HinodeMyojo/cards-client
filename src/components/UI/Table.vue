<template>
    <v-data-table :headers="headers" :items="elements" :sort-by="[{ key: 'calories', order: 'asc' }]">
        <template v-slot:item.actions="{ item }">
            <v-icon class="me-2" size="small" @click="editItem(item)">
                mdi-pencil
            </v-icon>
            <v-icon size="small" @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
    </v-data-table>
</template>

<script setup>
import { ref, computed, watch, onMounted, defineProps } from 'vue'

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

const editItem = (item) => {
    editedIndex.value = desserts.value.indexOf(item)
    editedItem.value = { ...item }
    dialog.value = true
}

const deleteItem = (item) => {
    editedIndex.value = desserts.value.indexOf(item)
    editedItem.value = { ...item }
    dialogDelete.value = true
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