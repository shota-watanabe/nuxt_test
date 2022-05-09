<template>
  <div>
    <NuxtChild
    :books="books"
    @add-book-list="addBook"
    @update-book-info="updateBookInfo"
    />
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
  created() {
    if (localStorage.getItem(STORAGE_KEY)) {
      try {
        this.books = JSON.parse(localStorage.getItem(STORAGE_KEY))
      } catch (e) {
        // localStorage.removeItem(STORAGE_KEY)
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
      this.saveBooks();
      // 最後に追加したidのコード
      // -1は後ろから取得。[0]は後ろから0番目（一番うしろ）
      // console.log(this.books.slice(-1)[0].id)
      this.goToEditPage(this.books.slice(-1)[0].id)
    },
    removeBook(x) {
      this.books.splice(x, 1)
      this.saveBooks()
    },
    saveBooks() {
      const parsed = JSON.stringify(this.books)
      localStorage.setItem(STORAGE_KEY, parsed)
    },
    updateBookInfo(e){
      const updateInfo = {
        id: e.id,
        readDate: e.readDate,
        memo: e.memo,
        title: this.books[e.id].title,
        image: this.books[e.id].image,
        description: this.books[e.id].description
      }
      // 指定したidから1番目のオブジェクトをupdateInfoに置き換える
      this.books.splice(e.id, 1, updateInfo)
      this.saveBooks()
      // 保存したタイミングでindexに移動
      this.$router.push('/book')
    },
    goToEditPage(id){
      // ページ切り替え（ビュールーターの機能）
      this.$router.push(`/book/edit/${id}`)
    }
  },
}
</script>

<style></style>
