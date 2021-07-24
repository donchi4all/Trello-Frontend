<template>
  <div class="container">
    <div class="row col-12" v-if="getBoards">
      <div v-for="board in getBoards" :key="board.id" class="col-4 mb-3">
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <router-link
              :to="{ name: 'SingleBoard', params: { id: board.id } }"
              tag="a"
              class="btn btn-primary"
            >
              <i class="fe fe-power"></i> {{ board.name }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="primary py-3 px-3 column-width rounded ml-4">
      <input
        v-model="boardName"
        label="Card Desc"
        type="text"
        class="form-control"
        placeholder=" enter list name"
      />
      <button
        @click="createBoard($event)"
        class="btn btn-primary btn-sm mt-1 board-form-btn"
      >
        Add Board
      </button>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapGetters } = createNamespacedHelpers("board");
export default {
  name: "Board",
  components: {},
  data() {
    return {
      boardName: "",
    };
  },
  methods: {
    ...mapActions({
      dispatchBoard: "getBoards",
      dispatchDeleteBoard: "deleteBoard",
      dispatchCreateBoard: "createBoard",
    }),

    deleteItem(id) {
      if (!confirm("Are you sure you want to delete this beneficiary?")) return;
      this.dispatchDeleteBoard(id).catch((error) => this.onError(error));
    },
    createBoard(event) {
      if (this.boardName.length < 1) alert("Enter Board Name");
      let btn = document.getElementsByClassName("board-form-btn")[0];
      this.disableButtons(event);
      this.dispatchCreateBoard({ name: this.boardName })
        .then(() => {
          this.getBoardsData();
        })
        .catch((error) => this.onError(error));
      this.enableButtons(btn);
    },
    getBoardsData() {
      this.dispatchBoard().catch((error) => this.onError(error));
    },
  },
  computed: {
    ...mapGetters(["getBoards"]),
    ...mapState(["status"]),
  },
  created() {
    this.getBoardsData();
  },
};
</script>

<style scoped></style>
