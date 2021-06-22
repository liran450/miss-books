export default {
    template:`
    <header class="app-header">
        <div class="logo">
            <h3>Miss Books</h3>
        </div>
        <nav class="header-navigation">
            <router-link to="/">Home</router-link> |
            <router-link to="/book">Books</router-link> |
            <router-link to="/about">About</router-link>
        </nav>
    </header>
    
    `,
}