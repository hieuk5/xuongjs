<script setup>
let url = "http://localhost:3000/api.php/users";
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { RouterLink } from 'vue-router';

const listAccount = ref([]);
onMounted(async () => {
    let response = await axios.get(url);
    listAccount.value = response.data;
})
const handleDelete = async (idAccount) => {
    const check = confirm("Bạn có muốn xóa không?");
    if (check) {
        let response = await axios.delete(url + "/" + idAccount);
        if (response) {
            alert(response.data.message);
            let response2 = await axios.get(url);
            listAccount.value = response2.data;
        }
    }
}
</script>

<template>
    <div class="p-4" style="min-height: 800px;">
        <h1>Quản lý tài khoản</h1>
        <RouterLink to="/admin/add-account" class="btn btn-primary">Add Account</RouterLink>
        <table class="table">
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Note</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(account, index) in listAccount" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ account.name }}</td>
                    <td>{{ account.email }}</td>
                    <td>{{ account.role }}</td>
                    <td>{{ account.note }}</td>
                    <td>
                        <RouterLink :to="`/admin/update-account/${account.id}`" class="btn btn-warning">Sửa
                        </RouterLink>
                        <button @click="handleDelete(account.id)" class="btn btn-danger">Xóa</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>