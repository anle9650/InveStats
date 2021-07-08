<template>
  <div class="list-group list-group-flush">
    <button
      type="button"
      class="list-group-item list-group-item-action"
      v-for="(stock, index) in stocks"
      :key="index"
      @click="$emit('selectStock', stock)"
    >
      {{ stock }}
    </button>
  </div>
</template>

<script>
export default {
  name: "stocks-list",
  props: {
    stocks: {
      type: Array,
      required: true,
    },
  },
  emits: ['selectStock'],
  data() {
    return {

    };
  },
  created() {},
  watch: {},
  methods: {},
};
</script>