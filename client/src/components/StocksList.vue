<template>
  <div class="list-group list-group-flush">
    <button
      type="button"
      class="list-group-item list-group-item-action"
      v-for="(symbol, index) in symbols"
      :key="index"
      @click="$emit('selectStock', symbol)"
    >
      {{ symbol }}
    </button>
  </div>
</template>

<script>
export default {
  name: "stocks-list",
  props: {
    symbols: {
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