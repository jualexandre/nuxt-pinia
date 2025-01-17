<template>
  <div>
    <h2 class="text-white text-2xl text-center my-8">All Products</h2>

    <div class="grid grid-cols-2 gap-7">
      <div v-for="product in products">
        <ProductCard :product="product" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Fetch products from the API
import type { Product } from '~/interfaces/Product'

const { data: products } = await useFetch<Product[]>('http://localhost:3001/products')
</script>

<style scoped></style>
