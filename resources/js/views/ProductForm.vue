<template>
    <div style="max-width: 400px; margin: 50px auto; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); background: #fff;">
        <h2 style="text-align: center; margin-bottom: 20px;">
            {{ isEdit ? "Edit Product" : "Add Product" }}
        </h2>

            <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
            <router-link to="/products"
                style="background: green; color: white; padding: 8px 12px; text-decoration: none; border-radius: 5px;">
                Products
            </router-link>
        </div>

        <div v-if="errors.general" style="color: red; text-align: center; margin-bottom: 10px;">
            {{ errors.general }}
        </div>

        <form @submit.prevent="saveProduct">
            <!-- Name -->
            <div style="margin-bottom: 15px;">
                <input v-model="product.name" type="text" placeholder="Enter product name"
                    style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px;" />
                <label style="display: block; margin-top: 5px; font-size: 14px; color: #666;">Product Name</label>
                <div v-if="errors.name" style="color: red; font-size: 12px;">{{ errors.name }}</div>
            </div>

            <!-- Description -->
            <div style="margin-bottom: 15px;">
                <textarea v-model="product.description" placeholder="Enter product description"
                    style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px;"></textarea>
                <label style="display: block; margin-top: 5px; font-size: 14px; color: #666;">Description</label>
                <div v-if="errors.description" style="color: red; font-size: 12px;">{{ errors.description }}</div>
            </div>

            <!-- Price -->
            <div style="margin-bottom: 15px;">
                <input v-model="product.price" type="number" placeholder="Enter price"
                    style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px;" />
                <label style="display: block; margin-top: 5px; font-size: 14px; color: #666;">Price ($)</label>
                <div v-if="errors.price" style="color: red; font-size: 12px;">{{ errors.price }}</div>
            </div>

            <!-- Image Upload -->
            <div style="margin-bottom: 15px;">
                <input type="file" @change="handleFileUpload"
                    style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px;" />
                <label style="display: block; margin-top: 5px; font-size: 14px; color: #666;">Product Image</label>
                <div v-if="errors.image" style="color: red; font-size: 12px;">{{ errors.image }}</div>
            </div>

            <!-- Submit Button -->
            <div style="text-align: center;">
                <button type="submit"
                    style="width: 100%; background: blue; color: white; padding: 10px; border: none; border-radius: 5px; cursor: pointer;">
                    {{ isEdit ? "Update Product" : "Save Product" }}
                </button>
            </div>
        </form>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const route = useRoute();
const product = ref({ name: '', description: '', price: 0, image: null });
const isEdit = ref(!!route.params.id);
const errors = ref({}); // Store validation errors

const handleFileUpload = (event) => {
    product.value.image = event.target.files[0];
};

const fetchProduct = async () => {
    if (isEdit.value) {
        try {
            const response = await axios.get(`/api/getProduct/${route.params.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            console.log("Error fetching product", response.data);

            product.value = response.data; // Load existing product data
        } catch (error) {
            console.error("Error fetching product", error);
        }
    }
};

const saveProduct = async () => {
    errors.value = {}; // Reset errors
    let formData = new FormData();
    formData.append('name', product.value.name);
    formData.append('description', product.value.description);
    formData.append('price', product.value.price);
    if (product.value.image instanceof File) {
        formData.append('image', product.value.image);
    }

    try {
        if (isEdit.value) {
            await axios.post(`/api/updateProducts/${route.params.id}?_method=PUT`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data",
                },
            });
        } else {
            await axios.post('/api/products', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data",
                },
            });
        }

        router.push('/products');
    } catch (error) {
        if (error.response && error.response.data.errors) {
            errors.value = error.response.data.errors; // Store validation errors
        } else {
            errors.value.general = "An unexpected error occurred.";
        }
        console.error("Error saving product", error);
    }
};

// Fetch product when component is mounted (only in edit mode)
onMounted(fetchProduct);
</script>

<style>
.error {
    color: red;
    font-size: 14px;
}
</style>
