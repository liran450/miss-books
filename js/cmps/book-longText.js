export default {
    props: ['desc'],
    components: {

    },
    template: `
    <section class="book-text">
         <p>description: {{textToShow}} <button @click="showMore">show more</button></p>
    </section>
    `,
    created() {
        this.isShowAll = false
    },
    data() {
        return {
            bookText: this.desc,
            isShowAll: false
        }
    },
    methods: {
        showMore() {
            console.log('click');
            this.isShowAll = true
        }
    },
    computed: {
        textToShow() {
           var text = this.desc
        //    console.log(text);
        //    if (text.length > 100) return text.substring(0, 100) + '...'
           
             if (text.length > 100 && !this.isShowAll) return text.substring(0, 100) + '...'
             else if ((text.length > 100 && this.isShowAll)) return text
             else return text
        }
    },
    destroyed() {
        console.log('destroyed');
        this.isShowAll = false
    }
}