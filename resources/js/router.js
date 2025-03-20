import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Products from '@/views/Products.vue';
import ProductForm from '@/views/ProductForm.vue';

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/products', component: Products, meta: { requiresAuth: true } },
    { path: '/create', component: ProductForm, meta: { requiresAuth: true } },
    { path: '/edit/:id', component: ProductForm, meta: { requiresAuth: true } }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Redirect unauthenticated users
router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('token');
    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login');
    } else {
        next();
    }
});

export default router;
