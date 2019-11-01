<script>
export default {
  props: {
    showName: Boolean,
    user: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    colorType() {
      const email = this.user.email;

      if (email) {
        return (
          (email
            .substr(0, 2)
            .split("")
            .reduce((a, c) => a + c.charCodeAt(0), 0) %
            8) +
          1
        );
      }

      return "";
    }
  }
};
</script>

<template>
  <div class="container">
    <span v-if="showName" class="user-avatar-name mr-2">
      {{ user.name }}
    </span>

    <figure v-if="$attrs.hasOwnProperty('large')" class="user-avatar-large">
      <template v-if="user.avatar">
        <img :src="user.avatar + '&s=264'" width="132" height="132" />
        <img :src="user.avatar + '&s=264'" width="132" height="132" />
        <span class="skeleton"></span>
      </template>

      <div v-else class="user-avatar" :class="'user-avatar--type-' + colorType">
        <span v-if="user.name">{{ user.name.substr(0, 1).toUpperCase() }}</span>
      </div>
    </figure>

    <figure v-else-if="user.avatar" class="user-avatar user-avatar--image">
      <img :src="user.avatar" alt="" />
    </figure>

    <div
      v-else
      class="user-avatar user-avatar--image"
      :class="'user-avatar--type-' + colorType"
    >
      <span v-if="user.name">{{ user.name.substr(0, 1).toUpperCase() }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/sass/avatar.scss";

.container {
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

.user-avatar-large {
  position: relative;
  width: 140px;
  height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;

  .user-avatar {
    font-size: 50px;
    border: 4px solid #fff;
  }

  .skeleton {
    display: block;
    position: absolute;
    background: white;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    top: 0;
  }

  img {
    position: absolute;
    border-radius: 50%;
    overflow: hidden;
    transition: all 250ms ease-in-out;
  }

  img:nth-child(1) {
    z-index: 1;
    position: relative;
  }

  img:nth-child(2) {
    top: 15px;
    left: 0;
    right: 0;
    z-index: 0;
    filter: blur(11px);
    opacity: 0.8;
  }
}
</style>
