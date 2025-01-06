<template>
  <div class="main">
    <div class="container">
      <div class="profile">
        <div class="profile-image">
          <div id="sideBarAvatar" class="sideBarAvatar" @click="handleAvatarClick">
            <img v-if="avatarSrc" :src="avatarSrc" alt="User Avatar" />
            <p v-else>Загрузка аватара...</p>
          </div>
        </div>
        <div class="profile-info">
          <div id="userName" class="userName">{{ storedUserName }}</div>
        </div>
      </div>
      <hr />
      <div class="search">
        <SearchAutocomplete @input="LoadUserModules" />
      </div>
      <hr />
      <div class="tree">
        <div v-if="items.length > 0" class="moduleItems">
          <ModuleItem v-for="item in items" :key="item.id" :title="item.title" :id="item.id"
            @click="moduleClick(item.id)">
            {{ item.title }}
          </ModuleItem>
        </div>
        <div v-else class="moduleItems">
          <p>Тут пока ничего нет!</p>
          <p>Добьте или создайте модули!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SearchAutocomplete from '@/components/UI/SearchAutocomplete.vue';
import api from '@/plugins/axios';
import router from '@/router/router.js';
import ModuleItem from '@/components/UI/ModuleItem.vue';
import { HttpStatusCode } from 'axios';

const storedUserName = ref('Пользователь');
const avatarSrc = ref('');

const items = ref([]);

const handleAvatarClick = () => {
  router.push(`/${storedUserName.value}`)
}


const moduleClick = (id) => {
  router.push(`/module/${id}`)
}

const LoadUserData = async () => {
  const userName = localStorage.getItem('userName');
  const storedAvatar = localStorage.getItem('userAvatar');

  if (userName) storedUserName.value = userName;
  if (storedAvatar) {
    avatarSrc.value = storedAvatar;
  } else {
    try {
      const response = await api.get(`/user/whoami`);
      const base64Avatar = `data:image/png;base64,${response.data.avatar}`;
      avatarSrc.value = base64Avatar;
      storedUserName.value = response.data.userName;
      localStorage.setItem('userAvatar', base64Avatar);
      localStorage.setItem('userName', response.data.userName);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }
};

const LoadUserModules = async (searchText) => {
  console.log(searchText);
  items.value = [];
  try {
    const queryText = searchText?.trim() || null;
    const response = await api.get('/module/used-modules', {
      params: {
        textSearch: queryText,
      },
    });
    console.log(response);
    if (response.status == HttpStatusCode.Ok) {
      console.log(response.data);
      items.value.push(...response.data);
    }
  }
  catch (error) {
    console.error('Error loading user data:', error);
  }
}

// Upd 01.06.2025
const props = defineProps({
  isAuth: {
    type: Boolean,
    default: false
  },
  userName: {
    type: String
  },
  userAvatar: {
    type: String
  }
})


onMounted(() => {
  console.log(props.isAuth);
  if (props.isAuth) {
    LoadUserData();
    LoadUserModules();
  }
  else {
    storedUserName.value = props.userName;
    avatarSrc.value = props.userAvatar;
  }

});
</script>

<style scoped>
.search {
  border-radius: 10px;
}

.main {
  display: flex;
  border-radius: 25px;
  width: 100%;
  min-height: 400px;
  background-color: #202127;
}

hr {
  height: 2px;
  background-color: #272A2F;
  border: none;
  margin: 10px 0;
}

.moduleItems {
  background-color: #202127;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.moduleItems p {
  background-color: #202127;
}

.container {
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 15px;
  background-color: #202127;
}

.profile {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 30px;
  margin-bottom: 5px;
  background-color: transparent;
}

.sideBarAvatar {
  background-color: #202127;
  display: flex;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  min-height: 160px;
  min-width: 160px;
}

.sideBarAvatar img {
  border-radius: 100%;
  width: 160px;
  height: 160px;
  object-fit: cover;
  border: 4px solid #808080;
}

.profile-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-top: 15px;
  margin-bottom: 15px;
  font-size: large;
  background-color: transparent;
}

.userName {
  font-weight: 500;
  background-color: transparent;
}
</style>
