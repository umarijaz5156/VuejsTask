<template>
    <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #f7f7f7; padding: 20px;">
        <div style="width: 100%; max-width: 400px; background: white; padding: 25px; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); border: 1px solid #ddd;">
            <h2 style="text-align: center; font-size: 24px; font-weight: bold; color: #333; margin-bottom: 10px;">Welcome Back</h2>
            <p style="text-align: center; color: gray; margin-bottom: 20px;">Login to access your account</p>

            <div v-if="error" style="color: red; background: #ffe5e5; padding: 10px; text-align: center; border-radius: 5px; margin-bottom: 10px;">
                {{ error }}
            </div>

            <div style="display: flex; flex-direction: column; gap: 15px;">
                <input v-model="email" type="email" placeholder="Email"
                    style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px; font-size: 16px;" />

                <input v-model="password" type="password" placeholder="Password"
                    style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px; font-size: 16px;" />

                <button @click="login"
                    style="width: 100%; background: linear-gradient(to right, #007bff, #0056b3); color: white; padding: 12px; font-size: 16px; border: none; border-radius: 5px; cursor: pointer; transition: 0.3s;">
                    Login
                </button>
            </div>

            <p style="text-align: center; margin-top: 15px; color: gray;">
                Don't have an account?
                <router-link to="/register" style="color: #007bff; font-weight: bold; text-decoration: none;">Sign Up</router-link>
            </p>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return { email: '', password: '', error: '' };
    },
    created() {
        // Check if user is already logged in
        if (localStorage.getItem('token')) {
            this.$router.push('/products');
        }
    },
    methods: {
        async login() {
            this.error = '';
            try {
                let response = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: this.email, password: this.password })
                });

                let data = await response.json();

                if (response.ok) {
                    localStorage.setItem('token', data.token);
                    this.$router.push('/products');
                } else {
                    this.error = data.message || "Login failed!";
                }
            } catch (error) {
                this.error = "Something went wrong!";
                console.error("Login Error:", error);
            }
        }
    }
};
</script>

