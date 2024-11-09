<template>
    <v-data-table :headers="headers" :items="desserts" :sort-by="[{ key: 'calories', order: 'asc' }]">
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
import { ref, computed, watch, onMounted } from 'vue'

const dialog = ref(false)
const dialogDelete = ref(false)

const headers = [
    {
        title: 'Dessert (100g serving)',
        align: 'start',
        sortable: false,
        key: 'name',
    },
    { title: 'Calories', key: 'calories' },
    { title: 'Fat (g)', key: 'fat' },
    { title: 'Carbs (g)', key: 'carbs' },
    { title: 'Protein (g)', key: 'protein' },
    { title: 'Actions', key: 'actions', sortable: false },
]

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

const initialize = () => {
    desserts.value = [
        { name: 'Frozen Yogurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
        { name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3 },
        { name: 'Eclair', calories: 262, fat: 16.0, carbs: 23, protein: 6.0 },
        { name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
        { name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
        { name: 'Jelly bean', calories: 375, fat: 0.0, carbs: 94, protein: 0.0 },
        { name: 'Lollipop', calories: 392, fat: 0.2, carbs: 98, protein: 0 },
        { name: 'Honeycomb', calories: 408, fat: 3.2, carbs: 87, protein: 6.5 },
        { name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9 },
        { name: 'KitKat', calories: 518, fat: 26.0, carbs: 65, protein: 7 }
    ]
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