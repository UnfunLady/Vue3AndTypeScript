<template>
  <div>
    <!-- vue3的keepAlive -->
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent} from "vue";

export default defineComponent({


});
</script>
