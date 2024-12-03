<script setup>
import "@/assets/client.css"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { RouterView, useRoute } from 'vue-router';
import Header from '@/components/User/Header.vue';
import Navbar from '@/components/User/Navbar.vue';
import Footer from '@/components/User/Footer.vue';
</script>
<template>
    <div class="container-fluid p-0">

        <Header />

        <Navbar />

        <RouterView />

        <Footer />
    </div>
</template>
<style lang="css" scoped></style>
