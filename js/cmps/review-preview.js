

export default {
    props: ['review'],
    template: `
<section class="review-preview">
    <p>Name: {{review.fullName}}</p>
    <p>Review: {{review.review}}</p>
    <p>Read at: {{review.readAt}}</p>
</section> 
`,
    data() {
        return {

        }
    }
}