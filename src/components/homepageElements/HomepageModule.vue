<template>
  <div class="main">
    <div class="user-container" @click="openProfile">
      <div class="avatar">
        <img :src="getImage(avatar)" alt="User Avatar" />
      </div>
      <button class="username">{{ userName }}</button>
    </div>
    <div class="tag-container">
      <button
        class="tag"
        v-for="tag in tags"
        :key="tag.id"
        @click="setTagToSearch(tag)"
      >
        #{{ tag }}
      </button>
    </div>
    <div class="body-container">
      <div class="body" @click="openModule">
        <h3>{{ replaceBody() }}</h3>
      </div>
    </div>
    <div class="activity-container">
      <LikeDislikeButton
        :userId="userId"
        :moduleId="moduleId"
        :likeType="likeType"
        :likeCount="likeCount"
        :dislikeCount="dislikeCount"
      />
      <CommentButton
        :comment-count="commentCount"
        :link="'module/' + moduleId"
      />
      <LinkButton :link="'module/' + moduleId" />
    </div>
  </div>
</template>

<script setup>
  import router from '@/router/router';
  import LikeDislikeButton from '@/components/UI/buttons/LikeDislikeButton.vue';
  import CommentButton from '@/components/UI/buttons/CommentButton.vue';
  import LinkButton from '@/components/UI/buttons/LinkButton.vue';

  // Временно
  // const userName = 'hinode'
  // const tags = ['tag1', 'tag2', 'билибкпап']
  // const body = ref("Список термоядерных объектов блабла бкпоаывопалвпщлоавщпдавп")
  // const likeCount = 22
  // const dislikeCount = 1
  // const likeType = 1
  //#region


  const props = defineProps({
    userName: String,
    userId: Number,
    avatar: String,
    tags: Array,
    body: String,
    moduleId: Number,
    likeCount: Number,
    dislikeCount: Number,
    likeType: Number,
    commentCount: Number,
  });

  const replaceBody = () => {
    return props.body.length > 40
      ? props.body.slice(0, 40) + '...'
      : props.body;
  };

  const getImage = (img) => {
    return 'data:image/png;base64, ' + img;
  };

  const openProfile = () => {
    router.push(`/profile/${props.userName}`);
  };

  const setTagToSearch = (tag) => {
    // TODO
  };

  const openModule = () => {
    router.push(`/module/${props.moduleId}`);
  };

  // onMounted(() => {
  //   replaceBody();
  // })
</script>

<style scoped>
  .main {
    width: 270px;
    height: 350px;
    background-color: #202127;
    border-radius: 30px;
    border: 1px #32333d solid;
    transition: border 0.4s ease-in-out;
    padding-top: 25px;
    padding-bottom: 25px;
    padding-left: 15px;
    padding-right: 15px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    font-weight: 600;
    color: #6d6f83;
  }

  .main:hover {
    border: 1px #d459ff solid;
    transition: 0.4s ease-in-out;
  }

  .user-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .tag-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }

  .body-container {
    display: flex;
    width: 100%;
    height: 140px;
  }

  .activity-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .body {
    width: 100%;
    display: flex;
    padding: 10px;
    background-color: #191a1f;
    transition: 0.3s ease;
    border-radius: 15px;
    align-items: center;
    justify-content: center;
    font-size: 20px;
  }

  .body:hover {
    background-color: #1b1c22;
    transition: 0.3s ease;
    cursor: pointer;
  }

  .tag {
    width: 70px;
    border: 1px solid #57596a;
    transition: 0.3s ease;
    color: #57596a;
    border-radius: 10px;
    overflow: hidden;
    padding-left: 5px;
    padding-right: 5px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tag:hover {
    border: 1px solid #6d6f83;
    color: #6d6f83;
    transition: 0.3s ease;
    cursor: pointer;
  }

  .username {
    color: #57596a;
    font-size: 18px;
    transition: 0.3s ease;
  }

  .username:hover {
    color: #6d6f83;
    transition: 0.3s ease;
  }

  .avatar:hover img {
    box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.4);
    transition: 0.3s ease;
  }

  .avatar img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    transition: 0.2s ease;
    cursor: pointer;
  }
</style>
