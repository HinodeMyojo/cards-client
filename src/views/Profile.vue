<template>
    <div class="profile-container">
        <div class="profile-sidebar">
            <ProfileSideBar />
        </div>
        <div class="profile-main"></div>
    </div>
</template>

<script setup>
</script>

<style scoped>
.profile-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
}

.profile-sidebar {
    display: flex;
    flex: 0.4;
}

.profile-main {
    display: flex;
    flex: 0.6;
}
</style>