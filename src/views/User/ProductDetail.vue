<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

let urlProductDetail = "http://localhost:3000/api.php/product-detail";
let urlAddCart = "http://localhost:3000/api.php/cart";
let urlImage = "http://localhost:3000/uploads/product/";

const route = useRoute();
const router = useRouter();
const product = ref({});
const callAPI = async () => {
    try {
        let url = urlProductDetail + "?product_id=" + route.params.id;
        let response = await axios.get(url);
        if (response.data.status) {
            product.value = response.data.products;
        }

    } catch (error) {
        console.log(error);
    }
}

const convertPrice = (number) => {
    return number.toLocaleString("vi-VN");
}

onMounted(() => {
    callAPI();
})

const quantity = ref(1);

const addCart = async () => {
    if (quantity.value >= 1) {
        try {
            let url = urlAddCart + "/" + "?product_id=" + product.value.id + "&quantity=" + quantity.value + "&user_id=" + JSON.parse(localStorage.getItem('userLogin')).id;

            let response = await axios.get(url);
            alert(response.data.message);
            router.push("/gio-hang");
        } catch (error) {
            console.log(error);

        }
    }
}
</script>
<template>
    <div class="row main-website justify-content-center mt-5">
        <div class="col-7">
            <div class="card mb-3 border-0" style="max-width: 600px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img v-if="product.image != null" :src="urlImage + product.image"
                            class="img-fluid rounded-start" alt="...">
                        <img v-else src="@/assets/images/sp1.webp" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">{{ product.name }}</h5>
                            <p class="card-text">Danh mục: {{ product.categoryName }}</p>
                            <p class="text-price">{{ convertPrice(Number(product.price)) }} VNĐ</p>
                            <p class="card-text">{{ product.description }}</p>
                            <p class="card-text">Số lượng: <input type="number" min="0" v-model="quantity"
                                    class="form-control">
                            </p>
                            <button class="btn btn-danger" @click="addCart">Thêm vào giỏ hàng</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="css">
.text-price {
    font-weight: bold;
    color: brown;
}
</style>