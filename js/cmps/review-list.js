import { bookService } from '../services/book-service.js'
import { eventBus } from '../services/event-bus-service.js'
import reviewPreview from './review-preview.js'


export default {
    props:['book'],
    components: {
        reviewPreview
    },
    template: `
<section >
<h1>Book reviews</h1>
<ul class="review-container">
    <li class="review" v-for="review in book.bookReviews">
        <button class="review-btn" @click="remove(review.id)">X</button>
        <review-preview :review="review"></review-preview>
    </li>
</ul>
</section>
    `,
    created() {
    },
    mounted(){
    },
    data() {
        return {
        }
    },
    methods: {
        remove(id) {
            bookService.removeReview(this.book, id)
            .then(() => {
                const msg = {
                    txt: `Review Removed Successfully`,
                    type: 'success',
                }
                eventBus.$emit('removeReview', msg)
            })
            .catch(err => {
                console.log(err)
                const msg = {
                    txt: 'Error, please try again',
                    type: 'error'
                };
                eventBus.$emit('removeReview', msg)
            })
        },
    },
    computed: {

    }
}