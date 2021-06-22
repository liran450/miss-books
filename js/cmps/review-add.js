import { bookService } from "../services/book-service.js"
import { eventBus } from "../services/event-bus-service.js"
import { utilService } from "../services/util-service.js"

export default {
    template: `
<section >
<h2>Review book</h2>
    <hr/>
    <form @submit.prevent="addReview">
        <label for="fullName">Full name:</label>
        <input ref="name" id="fullName" v-model="bookReview.fullName" type="text"> | 
        <br/>
        <select name="rating" id="">
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
        </select> |
        <br/>
        <label for="readAt">Read at:</label> 
        <input id="readAt" type="date" v-model="bookReview.readAt"> |
        <br/>
        <label for="reviewField">Book review:</label> 
        <br/>
        <textarea class="textArea" id="reviewField" name="revieField" rows="4" cols="50" v-model="bookReview.review">
        </textarea>
        <br>
        <button class="review-btn">Post review</button>
    </form>
</section>
    `,
    created() {
        // this.bookReview.readAt = 1/1/2001
        const { bookId } = this.$route.params
            bookService.getBookById(bookId)
            .then(book => this.bookToEdit=book)
    },
    mounted() {
        this.$refs.name.focus()
    },
    data() {
        return {
            bookReview: {
                id: utilService.makeId(),
                fullName: 'Book reader',
                readAt: new Date().toISOString().substr(0, 10),
                review: ''
            },
            bookToEdit: null
        }
    },
    methods: {
        addReview() {
            var key = 'bookReviews'
            var bookReview = {...this.bookReview}
            var book = this.bookToEdit
            if (this.bookReview.fullName === '' ||
                this.bookReview.review === '') return
                if (!book[key]) {
                    book[key] = []
                }
                book[key].push(bookReview)
                bookService.saveBook(book)
                .then(newBook=> {
                    const msg = {
                        txt: `Thanks for reviewing ${newBook.title}`,
                        type: 'success',
                        link: `/book/${newBook.id}`
                    }
                    eventBus.$emit('review', msg )
                    this.bookToEdit = newBook 
                    this.$emit('reviewed')})
                    .catch(err =>{ 
                        console.log(err)
                        const msg = {
                            txt: 'Error, please try again',
                            type: 'error'
                        };
                        eventBus.$emit('review', msg)
                    })
                this.bookReview.id = utilService.makeId()                
        },
    },
    computed: {

    }
}