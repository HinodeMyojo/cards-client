<template>
    <div class="profile-container">
        <div class="search-main">
            <h3>Быстрый поиск</h3>
            <SearchAutocomplete />
        </div>
        <div class="statistic-m*ain"></div>
        <div class="last-activity-main"></div>
        <div class="trend-main"></div>
    </div>
</template>

<script setup>
import SearchAutocomplete from '@/components/UI/SearchAutocomplete.vue';

</script>

<style scoped>
.profile-main {
    display: flex;
    flex: 1;
}

.search-main {
    width: 100%;
    height: 150px;
    background-color: #202127;
    border-radius: 15px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 15px;
}


.SearchAutocomplete input {

    width: 100%;
}

h3 {
    font-weight: 300;
}
</style>