import { eventBus } from '../services/event-bus-service.js'


export default {
    template: `
<section v-if="msg" class='user-message' :class="msg.type">
    <button @click="msg = null">X</button>
    <h3>{{msg.txt}}</h3>
    <router-link v-if="msg.link" :to="msg.link">Go to Book</router-link>
</section>
    `,
    data() {
        return {
            msg: null
        }
    },
    created() {
        eventBus.$on('review', this.showMsg)
        eventBus.$on('removeBook', this.showMsg)
        eventBus.$on('removeReview', this.showMsg)
    },
    destroyed() {
        eventBus.$off('review', this.showMsg)
        eventBus.$off('removeBook', this.showMsg)
        eventBus.$off('removeReview', this.showMsg)
    },
    methods: {
        showMsg(msg) {
            this.msg = msg;
            setTimeout(() => {
                this.msg = null;
            }, 3000);
        }
    }
}