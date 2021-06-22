import { bookService } from "../services/book-service.js";
import bookList from "../cmps/book-list.js";
import bookFilter from "../cmps/book-filter.js";
import { eventBus } from "../services/event-bus-service.js";
// import bookDetails from "../pages/book-details.js";

export default {
    components: {
        bookList,
        // bookDetails,
        bookFilter,
    },
    template: `
        <section class="book-app">
            <!-- <car-details v-if="selectedCar" :car="selectedCar" @close="closeDetails" />
            <car-edit /> -->
            <book-filter @filter="setFilter"/>
            <!-- <book-list v-if="!selectedBook" @selected="selectBook" @remove="removeBook" v-bind:books="booksToShow"/> -->
            <book-list @remove="removeBook" v-bind:books="booksToShow"/>
            <!-- <book-details v-if="selectedBook" :book="selectedBook" @back="closeDetails"/> -->
        </section>
    `,
    created() {
        this.loadBooks()
    },
    data() {
        return {
            // books: bookService.query(),
            books: [],
            filterBy: null,
            // selectedBook: null,
        };
    },
    methods: {
        loadBooks() {
            bookService.query()
                .then(books => this.books = books)
        },
        removeBook(id) {
            bookService.remove(id)
                .then(() => {
                    this.loadBooks()
                    const msg = {
                        txt: `Book Removed Successfully`,
                        type: 'success',
                    }
                    eventBus.$emit('removeBook', msg)
                })
                .catch(err => {
                    console.log(err)
                    const msg = {
                        txt: 'Error, please try again',
                        type: 'error'
                    };
                    eventBus.$emit('removeBook', msg)
                })
        },
        // selectBook(book) {
        //     this.selectedBook = book
        // },
        setFilter(filterBy) {
            console.log(filterBy);
            this.filterBy = filterBy;
        },
        // closeDetails() {
        //     this.selectedBook = null;
        // },
    },
    computed: {
        // setFilter() {

        // },
        booksToShow() {
            if (!this.filterBy) return this.books

            const searchStr = this.filterBy.title.toLowerCase();
            var searchMin = this.filterBy.fromPrice
            var searchMax = this.filterBy.toPrice
            if (searchMin === '') searchMin = 0
            if (searchMax === '') searchMax = Infinity
            console.log('min', searchMin);
            console.log('max', searchMax);
            console.log('price', this.books[0].listPrice.amount);
            const booksToShow = this.books.filter(book => {
                return (book.title.toLowerCase().includes(searchStr) && book.listPrice.amount > searchMin && book.listPrice.amount < searchMax)
            })
            console.log(booksToShow);
            return booksToShow
        },
    },

};
