<template>
  <div>
    <NuxtChild @add-book-list="addBook" />
  </div>
</template>

<script>
const STORAGE_KEY = 'books'

export default {
  data() {
    return {
      books: [],
      newBook: null,
    }
  },
  // ページを読み込んだタイミングで情報を取得
  mounted() {
    if (localStorage.getItem(STORAGE_KEY)) {
      try {
        this.books = JSON.parse(localStorage.getItem(STORAGE_KEY))
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  },
  methods: {
    // 引数eとすることで、子から渡ってくる情報を取得
    addBook(e) {
      this.books.push({
        id: this.books.length, // 配列から何番目か
        title: e.title,
        image: e.image,
        description: e.description,
        readDate: '',
        memo: '',
      })
      this.saveBooks()
    },
    removeBook(x) {
      this.books.splice(x, 1)
      this.saveBooks()
    },
    saveBooks() {
      const parsed = JSON.stringify(this.books)
      localStorage.setItem(STORAGE_KEY, parsed)
    },
  },
}
</script>

<style></style>
