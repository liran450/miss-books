import appHeader from "./cmps/book-header.js";
// import homePage from './pages/book-home.js';
import userMsg from './cmps/user-msg.js';
import {router} from './router.js'


// import aboutPage from "./cmps/book-about.js";
// import bookApp from './pages/book-app.js';
// import bookDetails from "./pages/book-details.js";


// const routes = [
//     {
//         path: '/',
//         component: homePage
//     },
//     {
//         path: '/book',
//         component: bookApp
//     },
//     {
//         path: '/about',
//         component: aboutPage
//     },
//     // {
//     //     path: '/car/edit/:carId?',
//     //     component: carEdit
//     // },
//     {
//         path: '/book/:bookId',
//         component: bookDetails
//     },
// ];

// const myRouter = new VueRouter({routes});

const options = {
    el: '#app',
    router,
    template: `
        <section>
            <user-msg></user-msg>
        <app-header/>
            <router-view></router-view>
        </section>
    `,
    components: {
        appHeader,
        // bookApp,
        userMsg
        // appFooter
    }
};

const app = new Vue(options);