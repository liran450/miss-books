import homePage from './pages/book-home.js';

import aboutPage from "./cmps/book-about.js";
import bookApp from './pages/book-app.js';
import bookDetails from "./pages/book-details.js";


const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/book',
        component: bookApp
    },
    {
        path: '/about',
        component: aboutPage
    },
    // {
    //     path: '/car/edit/:carId?',
    //     component: carEdit
    // },
    {
        path: '/book/:bookId',
        component: bookDetails
    },
];

export const router = new VueRouter({ routes });