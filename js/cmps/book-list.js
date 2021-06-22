import bookPreview from '../cmps/book-preview.js'

export default {
    props: ['books'],
    components: {
        bookPreview
    },
    template: `
    <ul class="book-list">
        <li v-for="book in books" :key="book.id" class="book-preview-container">
            <book-preview :book="book" @click.native="log(book.id)"/>
            <div class="actions">
                <button @click="removeBook(book.id)">X</button>
                <!-- <button @click="select(book)">Details</button> -->
                <router-link :to="'/book/'+book.id">Details</router-link>
            </div>
        </li>
    </ul>
    `,
    created() {

    },
    data() {
        return {

        }
    },
    methods: {
        // select(book) {
        //     this.$emit('selected', book)
        // },
        log(bookId) {
            console.log('logging the id', bookId);
        },
        removeBook(id) {
            this.$emit('remove', id)
        }
    },
    computed: {

    }
}