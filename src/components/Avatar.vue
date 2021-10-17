<script>
export default {
  name: "TadsAvatar",
  props: {
    large: Boolean,
    invert: Boolean,
    showName: Boolean,
    name: String,
    avatarUrl: String,
    id: String,
  },
  computed: {
    colorType() {
      if (!this.id) return ""

      return ((this.id
          .substr(0, 2)
          .split("")
          .reduce((a, c) => a + c.charCodeAt(0), 0) % 8) + 1);
    }
  }
};
</script>

<template>
  <div class="avatar-container">
    <span v-if="showName && !invert" class="user-avatar-name user-avatar-name--left">
      {{ name }}
    </span>

    <figure v-if="large" class="user-avatar-large">
      <template v-if="avatarUrl">
        <img :src="avatarUrl + '&s=264'" width="132" height="132" />
        <img :src="avatarUrl + '&s=264'" width="132" height="132" />
        <span class="skeleton"></span>
      </template>

      <div v-else class="user-avatar" :class="'user-avatar--type-' + colorType">
        <span v-if="name">{{ name.substr(0, 1).toUpperCase() }}</span>
      </div>
    </figure>

    <figure v-else-if="avatarUrl" class="user-avatar user-avatar--image">
      <img :src="avatarUrl" alt="" />
    </figure>

    <div
      v-else
      class="user-avatar user-avatar--image"
      :class="'user-avatar--type-' + colorType"
    >
      <span v-if="name">
        {{ name.substr(0, 1).toUpperCase() }}
      </span>
    </div>

    <span v-if="showName && invert" class="user-avatar-name user-avatar-name--right">
      {{ name }}
    </span>
  </div>
</template>

<style scoped>
@import "../assets/styles/avatar.css";

.avatar-container {
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 100%;
  height: 100%;
}

.user-avatar--image {
  width: 34px;
  height: 34px;
}

.user-avatar img {
  overflow: hidden;
  border-radius: 5000px;
  display: block;
}

.user-avatar-name {
  color: var(--navy-700);
  font-weight: 500;
}

.user-avatar-name--left {
  margin-right: 0.75rem;
}

.user-avatar-name--right {
  margin-left: 0.75rem;
}

.user-avatar-large {
  position: relative;
  width: 140px;
  height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-avatar-large .user-avatar {
  font-size: 50px;
  border: 4px solid #fff;
}

.user-avatar-large .skeleton {
  display: block;
  position: absolute;
  background: white;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  top: 0;
}

.user-avatar-large img {
  position: absolute;
  border-radius: 50%;
  overflow: hidden;
  transition: all 250ms ease-in-out;
}

.user-avatar-large img:nth-child(1) {
  z-index: 1;
  position: relative;
}

.user-avatar-large img:nth-child(2) {
  top: 15px;
  left: 0;
  right: 0;
  z-index: 0;
  filter: blur(11px);
  opacity: 0.8;
}
</style>
