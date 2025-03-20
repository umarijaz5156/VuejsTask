import { defineStore } from 'pinia';
import axios from 'axios';

export const useProductStore = defineStore('product', {
    state: () => ({ products: [] }),
    actions: {
        async fetchProducts() {
            let res = await axios.get('/api/products');
            this.products = res.data;
        },
        async addProduct(product) {
            await axios.post('/api/products', product);
            this.fetchProducts();
        },
        async updateProduct(id, product) {
            await axios.put(`/api/products/${id}`, product);
            this.fetchProducts();
        },
        async deleteProduct(id) {
            await axios.delete(`/api/products/${id}`);
            this.fetchProducts();
        }
    }
});
