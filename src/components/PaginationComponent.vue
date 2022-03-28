<template>
  <nav class="d-flex justify-content-center" aria-label="Page navigation">
    <ul class="pagination">
      <li class="page-item"
        :class="{'disabled' : !pages?.has_pre}"
        @click.prevent="changePrePage(pages.current_page - 1)">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item"
        :class="{'active': pages.current_page === page}"
        v-for="page in pages?.total_pages" :key="`${page}_${pages?.total_pages}`">
        <a class="page-link" href="#"
          :class="{'cursor-default': pages.current_page === page}"
          @click.prevent="changePage(page)"
        >{{ page }}</a>
      </li>
      <li class="page-item"
        :class="{'disabled': !pages?.has_next}"
        @click.prevent="changeNextPage(pages.current_page + 1)">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['pages'],
  emits: ['page'],
  methods: {
    changePage(page) {
      if (this.pages.current_page !== page) {
        this.$emit('page', page);
      }
    },
    changePrePage(page) {
      if (this.pages.has_pre) {
        this.$emit('page', page);
      }
    },
    changeNextPage(page) {
      if (this.pages.has_next) {
        this.$emit('page', page);
      }
    },
  },
};
</script>
