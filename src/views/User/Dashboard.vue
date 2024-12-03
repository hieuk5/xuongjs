<script setup>
let urlProduct = "http://localhost:3000/api.php/products";
let urlCategory = "http://localhost:3000/api.php/categories";
let urlImage = "http://localhost:3000/uploads/product/";
let urlSearchProduct = "http://localhost:3000/api.php/search-product";
import { RouterLink } from 'vue-router';

import { ref, onMounted } from 'vue';
import axios from 'axios';

const listProduct = ref([]);
const callAPI = async () => {
    try {
        let response = await axios.get(urlProduct);
        listProduct.value = response.data;
    } catch (error) {
        console.log(`Lỗi callAPI ${error}`);
    }
};

const convertPrice = (number) => {
    return number.toLocaleString("vi-VN");
}
const listCategory = ref([]);
const callAPICategory = async () => {
    try {
        let response = await axios.get(urlCategory);
        listCategory.value = response.data;
    } catch (error) {
        console.log(`Lỗi CallAPI ${error}`);
    }

}

onMounted(() => {
    callAPI();
    callAPICategory();
});

const productName = ref('');
const handleSearch = async () => {
    if (productName.value != "") {
        try {
            let data = {
                product_name: productName.value,
            }
            let response = await axios.post(urlSearchProduct, data);
            if (response.data.status == true) {
                productName.value = "";
                listProduct.value = response.data.products;
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        callAPI();
    }
}
</script>
<template>
    <div class="row main-website">
        <div class="sidebar col-3 offset-1 p-4 m-0">
            <div class="card mb-4">
                <div class="card-body d-flex">
                    <input type="text" class="form-control me-2" v-model="productName">
                    <button class="btn btn-success" @click="handleSearch">Search</button>
                </div>
            </div>
            <div class="card">
                <div class="card-header">Danh sách danh mục</div>
                <ul class="list-group">
                    <RouterLink class="list-group-item list-group-item-action"
                        v-for="(category, index) in listCategory " :key="index" :to="`/san-pham/${category.id}`">
                        {{ category.name }}
                    </RouterLink>
                </ul>
            </div>
        </div>
        <div class="main col-8 ms-5">
            <div class="d-flex flex-wrap">
                <div class="card card-product" v-for="(product, index) in listProduct" :key="index">
                    <img v-if="product.image != null" :src="urlImage + product.image" class="card-img-top"
                        :alt="product.name">
                    <img v-else src="@/assets/images/sp2.webp" :alt="product.name">
                    <div class="card-body">
                        <h5 class="card-title">{{ product.name }}</h5>
                        <p class="text-price">{{ convertPrice(Number(product.price)) }} VNĐ</p>
                        <p class="card-text"> {{ product.description }}</p>
                        <RouterLink :to="`san-pham-chi-tiet/${product.id}`" class="btn btn-primary">Xem chi tiết
                        </RouterLink>
                    </div>
                </div>

            </div>

        </div>


    </div>
</template>
<style lang="css" scoped>
.main-website {
    min-height: 800px;
}

.card-product {
    width: 30%;
    margin: 15px;
    margin-top: 20px;
}

.text-price {
    font-weight: bold;
    color: brown;
    margin: 0;
    padding: 0;
}
</style>
