<template>
  <div class="modal fade" :id="id" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            {{ type == "buy" ? "Buy" : "Sell" }} how many shares?
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form class="form-floating">
            <input
              type="number"
              :class="['form-control', validationClass]"
              v-model="sharesInput"
            />
            <div class="invalid-feedback">
              Please provide a number greater than 0{{
                type == "sell" ? " and less than or equal to " + sharesOwned : ""
              }}.
            </div>
            <label>Shares of {{ symbol }}</label>
          </form>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-outline-success"
            data-bs-dismiss="modal"
            :disabled="!validSharesInput"
            @click="
              $emit('confirmShares', parseFloat(sharesInput));
              sharesInput = null;
            "
          >
            <i class="bi bi-check2"></i> Confirm
          </button>
          <button
            class="btn btn-outline-danger"
            :data-bs-target="previousModal"
            :data-bs-toggle="[previousModal ? 'modal' : null]"
            data-bs-dismiss="modal"
            @click="sharesInput = null"
          >
            <i class="bi bi-x"></i> Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "shares-input-modal",
  props: {
    id: String,
    type: {
      type: String,
      default: "buy",
      validator: (value) => ["buy", "sell"].includes(value),
    },
    symbol: String,
    sharesOwned: Number,
    previousModal: String,
  },
  emits: ["confirmShares"],
  data() {
    return {
      sharesInput: null,
      validationClass: null,
    };
  },
  watch: {
    sharesInput() {
      if (this.validSharesInput) this.validationClass = "is-valid";
      else if (this.validSharesInput === undefined) this.validationClass = null;
      else this.validationClass = "is-invalid";
    },
  },
  computed: {
    validSharesInput() {
      if (this.type === "sell" && this.sharesInput > this.sharesOwned)
        return false;
      else if (this.sharesInput > 0) return true;
      else if (this.sharesInput == null) return undefined;
      return false;
    },
  },
};
</script>
