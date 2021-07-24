<template>
  <div>
    <div class="">
      <div class="flex justify-center">
        <div class="min-h-screen flex overflow-x-scroll py-12">
          <div
            v-for="list in getLists"
            :key="list.name"
            class="bg-gray-100 rounded-lg px-3 py-3 column-width rounded mr-4"
          >
            <div>
              <a
                @click="deleteListItem(list.id)"
                href="#"
                class="float-right btn btn-link btn-danger btn-sm"
                >X</a
              >
              <p
                class="
                  text-gray-700
                  font-semibold font-sans
                  tracking-wide
                  text-sm
                "
              >
                {{ list.name }}
              </p>
            </div>

            <draggable
              :list="list.cards"
              :animation="200"
              ghost-class="ghost-card"
              group="cards"
              @add="onAdd($event, list)"
            >
              <task-card
                v-for="card in list.cards"
                :key="card.id"
                :card="card"
                :cardId="card.id"
                :card-listId="card.list_id"
                class="mt-3 cursor-move"
              ></task-card>

              <div class="mt-3" @keyup.esc="editCardId = null">
                <input
                  type="text"
                  @click.stop
                  v-model="cardData.name"
                  label="Card Name"
                  v-if="list.id == editCardId"
                  @keyup.enter="createCard(list.id)"
                  class="form-control"
                  placeholder="Enter card name"
                />

                <input
                  type="text"
                  @click.stop
                  v-model="cardData.description"
                  label="Card Desc"
                  v-if="list.id == editCardId"
                  @keyup.enter="createCard(list.id)"
                  class="form-control"
                  placeholder=" Enter description"
                />
                <button
                  @click="editCardId = list.id"
                  v-else
                  class="btn btn-primary btn-sm mt-1"
                >
                  Add Card
                </button>
              </div>
              <!-- </transition-group> -->
            </draggable>
          </div>
          <div class="primary py-3 px-3 column-width rounded ml-4">
            <input
              @click.stop
              label="Card Desc"
              v-if="boardId == editListId"
              @keyup.enter="createList()"
              v-model="listData.name"
              type="text"
              class="form-control"
              placeholder=" enter list name"
            />
            <button
              @click="editListId = boardId"
              v-else
              class="btn btn-primary btn-sm mt-1"
            >
              Add List
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import TaskCard from "@/components/TaskCard.vue";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "App",
  components: {
    TaskCard,
    draggable,
  },
  data() {
    return {
      boardId: null,
      cards: "",
      cardData: { name: "", description: "" },
      editCardId: "",
      editListId: "",
      listData: { name: "" },
    };
  },
  methods: {
    ...mapActions({
      dispatchList: "list/getLists",
      dispatchDeleteList: "list/deleteList",
      dispatchCreateList: "list/createList",
      dispatchUpdateList: "list/deleteList",
      dispatchCard: "card/getCards",
      dispatchUpdateCard: "card/updateCard",
      dispatchCreateCard: "card/createCard",
    }),

    createList() {
      this.dispatchCreateList({
        boardId: this.boardId,
        params: { name: this.listData.name },
      })
        .then(() => {
          this.listCard();
        })
        .catch((error) => this.onError(error));
      this.editListId = "";
      this.listData = "";
    },
    deleteListItem(listId) {
      if (!confirm("Are you sure you want to delete this beneficiary?")) return;
      this.dispatchDeleteList({
        boardId: this.boardId,
        listId: listId,
      })
        .then(() => {
          this.listCard();
        })
        .catch((error) => this.onError(error));
    },
    createCard(listId) {
      this.editCardId = listId;

      this.dispatchCreateCard({
        boardId: this.boardId,
        listId: listId,
        params: {
          name: this.cardData.name,
          description: this.cardData.description,
        },
      })
        .then(() => {
          this.listCard();
        })
        .catch((error) => this.onError(error));

      this.cardData.name = "";
      this.cardData.description = "";
      this.editCardId = "";
    },
    onAdd(evt, list) {
      console.log(evt);
      let fromListId = evt.item.getAttribute("card-listId");
      let cardId = evt.item.getAttribute("cardId");

      this.dispatchUpdateCard({
        boardId: this.boardId,
        listId: fromListId,
        cardId: cardId,
        params: { list_id: list.id },
      }).catch((error) => this.onError(error));
    },
    listCard() {
      this.dispatchList(this.boardId).catch((error) => this.onError(error));
    },
  },
  computed: {
    ...mapGetters({
      getLists: "list/getLists",
    }),
    ...mapState({
      status: (state) => state.list.status,
    }),
  },
  created() {
    this.boardId = this.$route.params.id;
    console.log(this.boardId);
    if (!this.boardId) alert(" Wronng Route. ID missing");
    this.listCard();
  },
};
</script>

<style scoped>
.column-width {
  min-width: 320px;
  width: 320px;
}
/* Unfortunately @apply cannot be setup in codesandbox,
but you'd use "@apply border opacity-50 border-blue-500 bg-gray-200" here */
.ghost-card {
  opacity: 0.5;
  background: #f7fafc;
  border: 1px solid #4299e1;
}
</style>
