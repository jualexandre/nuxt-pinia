<template>
  <div>
    <h2 class="text-white text-2xl text-center my-8">Cart</h2>

    <div class="card text-xl" v-if="cartStore.cart.length">
      <!-- Product List -->
      <div v-for="product in cartStore.cart" class="flex gap-8 items-center">
        <img :src="product.img" :alt="product.title" />
        <p class="text-white">{{ product.title }}</p>
        <!-- Product Quantity -->
        <ProductQuantity :product="product" />
        <p class="text-secondary">{{ product.price * product.quantity }} coins</p>

        <!-- Delete -->
        <button class="ml-auto" @click="cartStore.removeFromCart(product)">
          <span class="material-icons-outlined text-white">delete</span>
        </button>
      </div>

      <!-- Total Price -->
      <div class="text-right pt-4 mt-4 border-t-2">
        <p class="text-white">
          Total amount to pay: <span class="text-secondary">{{ cartStore.total }} coins</span>
        </p>
      </div>
    </div>

    <div v-else>
      <p class="text-white">There are no items in your basket.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductQuantity from '~/components/ProductQuantity.vue'
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
</script>

<style scoped></style>
