<script setup>
let urlProduct = "http://localhost:3000/api.php/products";
let urlCategory = "http://localhost:3000/api.php/categories";
let urlImage = "http://localhost:3000/uploads/product/";
import { RouterLink } from 'vue-router';
import { useRoute } from 'vue-router';
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

const route = useRoute();
const listProduct = ref([]);
const callAPI = async () => {
    try {
        let url = urlProduct + "?idCategory=" + route.params.idCategory;
        let response = await axios.get(url);
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
//watch
watch(
    () => route.params.idCategory, (newIdCategory) => {
        callAPI();
    });


</script>
<template>
    <div class="row main-website">
        <div class="sidebar col-3 offset-1 p-4 m-0">
            <div class="card">
                <div class="card-header">Danh sách danh mục</div>
                <ul class="list-group">
                    <RouterLink class="list-group-item list-group-item-action"
                        v-for="(category, index) in listCategory " :key="index" :to="`/san-pham/${category.id}`" :class="{
                            active: category.id == route.params.idCategory,
                        }">
                        {{ category.name }}
                    </RouterLink>
                </ul>
            </div>
        </div>
        <div class="main col-8 ms-5">
            <div class="d-flex flex-wrap" v-if="listProduct.length > 0">
                <div class="card card-product" v-for="(product, index) in listProduct" :key="index">
                    <img v-if="product.image != null" :src="urlImage + product.image" class="card-img-top"
                        :alt="product.name">
                    <img v-else src="@/assets/images/sp2.webp" :alt="product.name">
                    <div class="card-body">
                        <h5 class="card-title">{{ product.name }}</h5>
                        <p class="text-price">{{ convertPrice(Number(product.price)) }} VNĐ</p>
                        <p class="card-text"> {{ product.description }}</p>
                        <a href="" class="btn btn-primary">Xem chi tiết</a>
                    </div>
                </div>

            </div>
            <div v-else class="alert alert-danger mt-4 " role="alert">
                Không có sản phẩm
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
