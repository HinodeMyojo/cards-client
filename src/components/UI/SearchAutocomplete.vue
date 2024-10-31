<template>
    <div class="search-autocomplete" style="border-radius: 10px;">
        <input v-model="searchQuery" type="text" placeholder="Поиск..." @input="filterItems" />
        <ul v-if="filteredItems.length && searchQuery">
            <li v-for="(item, index) in filteredItems" :key="index" @click="selectItem(item)">
                {{ item }}
            </li>
        </ul>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    props: {
        items: {
            type: Array,
            required: true
        }
    },
    setup(props, { emit }) {
        const searchQuery = ref('');
        const filteredItems = ref([]);

        const filterItems = () => {
            filteredItems.value = props.items.filter(item =>
                item.toLowerCase().includes(searchQuery.value.toLowerCase())
            );
        };

        const selectItem = item => {
            searchQuery.value = item;
            filteredItems.value = [];
            emit('select', item); // Emit событие для родительского компонента
        };

        return {
            searchQuery,
            filteredItems,
            filterItems,
            selectItem
        };
    }
};
</script>

<style scoped>
.search-autocomplete {
    position: relative;
    width: 100%;
    max-width: 300px;
    /* background-color: #2B2C34; */
}

input {
    width: 100%;
    padding: 8px;
}

ul {
    position: absolute;
    width: 100%;
    max-height: 150px;
    overflow-y: auto;
    background: white;
    /* border: 1px solid #ccc; */
    border-top: none;
    /* border-radius: 0 0 4px 4px; */
    margin: 0;
    padding: 0;
    list-style: none;
}

li {
    padding: 8px;
    cursor: pointer;
}

li:hover {
    background-color: #f0f0f0;
}
</style>
