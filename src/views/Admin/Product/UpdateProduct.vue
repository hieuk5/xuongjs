<script setup>
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
let urlAPI = "http://localhost:3000/api.php/products";
let urlImage = "http://localhost:3000/uploads/product/";
let urlAPICategory = "http://localhost:3000/api.php/categories";

const router = useRouter();
const route = useRoute();


const name = ref("");
const description = ref("");
const price = ref("");
const category_id = ref("");
const imageOldUrl = ref("");
const image = ref(null);

const nameError = ref("");
const descriptionError = ref("");
const priceError = ref("");
const categoryIdError = ref("");
const imageError = ref("");

let listCategory = ref([]);
const CallAPICate = async () => {
    try {
        const response = await axios.get(urlAPICategory);
        listCategory.value = response.data;
    } catch (error) {
        console.log("CallAPI lỗi");
    }
}

const callAPIProduct = async () => {
    try {
        let response = await axios.get(urlAPI + "/" + route.params.idProduct);
        name.value = response.data.name;
        description.value = response.data.description;
        price.value = response.data.price;
        imageOldUrl.value = response.data.image;
        category_id.value = response.data.category_id;
    } catch (error) {
        console.log("CallAPI lỗi");
    }
}
onMounted(() => {
    CallAPICate();
    callAPIProduct();
})
const handleChange = (event) => {
    const file = event.target.files[0];
    const maxFileSize = 10 * 1024 * 1024;
    if (file.size > maxFileSize) {
        imageError.value = "Kích thước file vượt quá dung lượng 10MB";
        image.value = null;
    }
    image.value = file;
};

const handleSubmit = async () => {
    checkEmty('name');
    checkEmty('description');
    checkEmty('price');
    checkEmty('category_id');

    if (nameError.value == "" && descriptionError.value == "" && priceError.value == "") {
        try {
            let formData = new FormData();
            formData.append("name", name.value);
            formData.append("description", description.value);
            formData.append("price", price.value);
            formData.append("image", image.value);
            formData.append("category_id", category_id.value);
            formData.append("_method", "PUT");

            let response = await axios.post(urlAPI + "/" + route.params.idProduct, formData, {
                headers:
                {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.status === 200) {
                alert("Cập nhật sản phẩm thành công");
                router.push("/admin/product");
            }
        } catch (error) {
            console.log("CallAPI lỗi");
        }
    }
}

const checkEmty = (field) => {
    switch (field) {
        case "name": {
            if (name.value == "") {
                nameError.value = "Không được để trống Name";
            } else nameError.value = "";
            break;
        }
        case "description": {
            if (description.value == "") {
                descriptionError.value = "Không được để trống Description";
            } else descriptionError.value = "";
            break;
        }
        case "price": {
            if (price.value == "") {
                priceError.value = "Không được để trống Price";
            } else priceError.value = "";
            break;
        }
        case "category_id": {
            if (category_id.value == "") {
                categoryIdError.value = "Vui lòng chọn Category";
            } else categoryIdError.value = "";
            break;
        }
        default: {
            break;
        }
    }
}
</script>
<template>
    <div class="p-4" style="min-height: 800px;">
        <h1>Cập nhật sản phẩm</h1>
        <form @submit.prevent="handleSubmit">
            <div class="mb-3">
                <label for="name">Name</label>
                <input type="text" id="name" placeholder="Tên sản phẩm" v-model="name" class="form-control"
                    @keyup="checkEmty('name')">
                <span v-if="nameError != ''" class="text-danger">{{ nameError }}</span>
            </div>
            <div class="mb-3">
                <label for="category">Category</label>
                <select id="category" class="form-control" v-model="category_id">
                    <option value="" hidden>--Chọn danh mục</option>
                    <option v-for="(category, index) in listCategory" :key="index" :value="category.id">
                        {{ category.name }}
                    </option>
                </select>
                <span v-if="categoryIdError != ''" class="text-danger">{{ categoryIdError }}</span>
            </div>
            <div class="mb-3">
                <label for="description">Description</label>
                <input type="text" id="description" placeholder="Mô tả sản phẩm" v-model="description"
                    class="form-control" @keyup="checkEmty('description')">
                <span v-if="descriptionError != ''" class="text-danger">{{ descriptionError }}</span>
            </div>
            <div class="mb-3">
                <label for="price">price</label>
                <input type="text" id="price" placeholder="Giá" v-model="price" class="form-control"
                    @keyup="checkEmty('price')">
                <span v-if="priceError != ''" class="text-danger">{{ priceError }}</span>
            </div>
            <div class="mb-3">
                <label for="image">image</label>
                <div>
                    <img v-if="imageOldUrl != null" :src="urlImage + imageOldUrl" alt="" width="50">
                    <span v-else class="badge text-bg-warning">Không có ảnh</span>
                </div>
                <input type="file" id="image" placeholder="image" class="form-control" accept="image/*"
                    @change="handleChange">
                <span v-if="imageError != ''" class="text-danger">{{ imageError }}</span>
            </div>
            <button class="btn btn-warning">Cập nhật</button>
        </form>
    </div>
</template>