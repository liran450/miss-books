export default {
    props:['book'],
    components: {
        
    },
    template: `
    <div class="book-preview">
        <h3>Title: {{book.title}}</h3>
        <p>Price: {{whichCurrency}}</p>
    </div>
    `,
    created() {

    },
    data() {
        return {
        }
    },
    methods: {
        
    },
    computed: {
        whichCurrency() {
            var price = this.book.listPrice
            return price.amount.toLocaleString('en-us', 
            {style: 'currency', currency: price.currencyCode})
            // if (this.book.listPrice.currencyCode === 'EUR') return `€`
            // if (this.book.listPrice.currencyCode === 'ILS')return '₪'
            // if (this.book.listPrice.currencyCode === 'USD')return ''
        },
    }
}