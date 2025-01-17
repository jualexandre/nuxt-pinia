<template>
  <div class="flex">
    <button class="btn" @click="cartStore.decrementQuantity(product)">-</button>
    <p class="py-1 px-4 mx-1 rounded-sm text-lg bg-gray-200">{{ product.quantity }}</p>
    <button class="btn" @click="cartStore.incrementQuantity(product)">+</button>
  </div>
</template>

<script setup lang="ts">
import type { ProductWithQuantity } from '~/interfaces/Product'
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()

defineProps({
  product: {
    type: Object as PropType<ProductWithQuantity>,
    required: true,
  },
})
</script>

<style scoped></style>
