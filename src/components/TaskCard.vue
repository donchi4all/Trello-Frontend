<template>
  <div class="bg-white shadow rounded px-3 pt-3 pb-5 border border-white">
    <div class="flex justify-between">
      <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">
        {{ card.description}}
      </p>

    </div>
    <div class="flex mt-4 justify-between items-center">
      <badge v-if="card.name" :color="badgeColor">{{ card.name }}</badge>
    </div>
  </div>
</template>
<script>
import Badge from "./Badge.vue";
export default {
  components: {
    Badge,
  },
  props: {
    card: {
      name: Object,
      default: () => ({}),
    },
  },
  computed: {
    badgeColor() {
      const mappings = {
        Design: "purple",
        "Feature Request": "teal",
        Backend: "blue",
        QA: "green",
        default: "teal",
      };
      return mappings[this.card.name] || mappings.default;
    },
  },
};
</script>
