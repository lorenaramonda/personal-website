<template>
  <div id="hobbies" v-editable="hobbies" class="hobbies">
    <BaseHeading minor>{{ hobbies.title }}</BaseHeading>
    <ul>
      <li v-for="hobby in hobbies.items" :key="hobby.name" v-editable="hobby">
        <NuxtImg
          v-if="hobby.icon"
          v-tooltip="hobby.name"
          provider="storyblok"
          :src="hobby.icon.filename"
          :title="hobby.name"
          width="512"
          height="512"
          :alt="hobby.name"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import BaseHeading from '@/components/BaseHeading'

export default {
  name: 'HobbiesList',
  components: {
    BaseHeading,
  },
  props: {
    hobbies: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.hobbies {
  margin-top: 2em;
  text-align: center;
  ul {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    li {
      margin: 0 2.8rem 1.2rem 0;
      img {
        max-width: 60px;
        height: auto;
      }
    }
  }
}
</style>
