import longText from '../cmps/book-longText.js'
import reviewAdd from '../cmps/review-add.js'
import reviewList from '../cmps/review-list.js'
import { bookService } from '../services/book-service.js'

export default {
    components: {
        longText,
        reviewAdd,
        reviewList
    },
    template: `
    <section v-if="book" class="book-details" :class="isExpensive">
        <router-link to="/book"><button>Back</button></router-link>
        <p>Title: {{book.title}}</p>
        <p>price: {{whichCurrency}}</p>
        <p>{{isOnSale}}</p>
        <long-text :desc="book.description"/>
        <p>Subtitle: {{book.subtitle}}</p>
        <ul>Authors:
            <li v-for="author in book.authors">
                    {{author}}
            </li>
        </ul>
        <p>page lenght: {{book.pageCount}} - {{pageCount}}</p>
        <p>language: {{book.language}}</p>
        <p>Time on shelf: {{publishedDate}}</p>
        <ul>categories:
            <li v-for="categorie in book.categories">
                    {{categorie}}
            </li>
        </ul>
        <div class="book-img-container">
            <img :src="bookImage">
        </div>
        <div class="book-review-container">
            <button @click="onAddReview">Add review</button>
            <review-add v-if="isReviewingNow" @reviewed="loadBook(); doneReviewing()"/>
            <review-list :book="book"/>
        </div>
    </section>
    `,
    created() {
        this.loadBook()
    },
    data() {
        return {
            book: null,
            isReviewing: false
        }
    },
    methods: {
        loadBook() {
            const { bookId } = this.$route.params
            bookService.getBookById(bookId)
                .then(book => this.book = book)
            console.log('loading');
        },
        goBack() {
            this.$emit('back')
        },
        onAddReview() {
            this.isReviewing = true
        },
        doneReviewing() {
            this.isReviewing = false
        }
    },
    computed: {
        isReviewingNow() {
            return this.isReviewing
        },
        publishedDate() {
            // console.log('computed');
            var currDate = new Date().getFullYear()
            var publishedDate = this.book.publishedDate
            var bookAge = currDate - publishedDate
            if (bookAge > 10) return 'Veteran Book'
            if (bookAge < 1) return 'New!'
            return publishedDate
        },
        pageCount() {
            var pages = this.book.pageCount
            if (pages > 500) return 'Long reading'
            if (pages > 200) return ' Decent Reading'
            if (pages < 100) return 'Light Reading'
        },
        isOnSale() {
            if (this.book.listPrice.isOnSale) return 'On Sale!'
        },
        isExpensive() {
            var price = this.book.listPrice.amount
            return { red: price > 150, green: price < 20 }
        },
        bookImage() {
            return this.book.thumbnail
        },
        whichCurrency() {
            var price = this.book.listPrice
            // var price = listPrice;
            return price.amount.toLocaleString('en-us',
                { style: 'currency', currency: price.currencyCode })
        }
    }
}