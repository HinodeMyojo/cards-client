<template>
    <div class="profile-container">
        <div class="search-main">
            <h3>Быстрый поиск</h3>
            <SearchAutocomplete />
            <button>Расширенный поиск</button>
        </div>
        <div class="statistic-main">
            <ProgressContainer />
        </div>
        <div class="last-activity-main"></div>
        <div class="trend-main"></div>
    </div>
</template>

<script setup>
import SearchAutocomplete from '@/components/UI/SearchAutocomplete.vue';
import ProgressContainer from '@/components/UI/Progress/ProgressContainer.vue';

</script>

<style scoped>
.profile-container {
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.profile-main {
    display: flex;
    flex: 1;
}

.search-main {
    width: 100%;
    height: 140px;
    background-color: #202127;
    border-radius: 15px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.search-main button {
    display: flex;
    justify-content: end;
}

.search-main button:hover {
    transition: all 0.3s ease-in-out;
    color: white;
}


.SearchAutocomplete input {

    width: 100%;
}

h3 {
    font-weight: 300;
}
</style>