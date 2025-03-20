<template>
    <div style="max-width: 900px; margin: 30px auto; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); background: #fff;">
        <h2 style="text-align: center; margin-bottom: 20px;">Products</h2>

        <!-- Logout & Add Product Buttons -->
        <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
            <button @click="logout" style="background: red; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer;">Logout</button>
            <router-link to="/create"
                style="background: green; color: white; padding: 8px 12px; text-decoration: none; border-radius: 5px;">
                Add Product
            </router-link>
        </div>

        <!-- No Products Message -->
        <div v-if="products.length === 0" style="text-align: center; color: red; font-weight: bold; margin-bottom: 20px;">
            No products available.
        </div>

        <!-- Product Table -->
        <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: #333; color: white;">
                        <th style="padding: 10px; text-align: left;">#</th>
                        <th style="padding: 10px; text-align: left;">Image</th>
                        <th style="padding: 10px; text-align: left;">Name</th>
                        <th style="padding: 10px; text-align: left;">Price</th>
                        <th style="padding: 10px; text-align: left;">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(product, index) in products" :key="product.id" style="border-bottom: 1px solid #ddd;">
                        <td style="padding: 10px;">{{ index + 1 }}</td>
                        <td style="padding: 10px;">
                            <img :src="getImageUrl(product.image)" alt="Product Image" width="50" height="50"
                                style="border-radius: 5px; object-fit: cover;">
                        </td>
                        <td style="padding: 10px;">{{ product.name }}</td>
                        <td style="padding: 10px;">${{ product.price }}</td>
                        <td style="padding: 10px;">
                            <router-link :to="`/edit/${product.id}`"
                                style="background: orange; color: white; padding: 5px 10px; text-decoration: none; border-radius: 5px;">
                                Edit
                            </router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>


<script>
import axios from "axios";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";

export default {
    setup() {
        const products = ref([]);
        const router = useRouter();

        const fetchProducts = async () => {
            try {
                const response = await axios.get("/api/products", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                products.value = response.data;
            } catch (error) {
                console.error("Error fetching products", error);
            }
        };

        const getImageUrl = (image) => {
    return image ? `/storage/${image}` : "https://via.placeholder.com/150";
};


        const logout = () => {
            localStorage.removeItem("token");
            router.push("/login");
        };

        onMounted(fetchProducts);

        return { products, logout, getImageUrl };
    },
};
</script>

<style>
.product-list {
    list-style: none;
    padding: 0;
}

.product-item {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ddd;
}

.product-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    margin-right: 15px;
}

.product-info {
    flex-grow: 1;
}

.edit-button {
    background-color: #4CAF50;
    color: white;
    padding: 5px 10px;
    text-decoration: none;
    border-radius: 5px;
}

.edit-button:hover {
    background-color: #45a049;
}

.logout-button {
    background-color: #f44336;
    color: white;
    padding: 10px;
    border: none;
    cursor: pointer;
}

.add-button {
    display: inline-block;
    margin: 10px 0;
    background-color: #008CBA;
    color: white;
    padding: 10px;
    text-decoration: none;
    border-radius: 5px;
}

.add-button:hover {
    background-color: #007bb5;
}
</style>
