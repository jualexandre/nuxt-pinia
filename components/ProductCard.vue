<template>
  <div class="card flex items-center gap-8">
    <img :src="product.img" :alt="product.title" />
    <div>
      <p class="text-2xl text-secondary">{{ product.title }}</p>
      <p class="text-xl text-gray-50">{{ product.description }}</p>
      <p class="text-lg text-secondary my-3">{{ product.price }} Silver coins</p>
      <button class="btn" @click="addToCart()" :disabled="isPending">
        <span v-show="!isPending">Add to cart</span>
        <span v-show="isPending">Adding...</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/interfaces/Product'
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
const isPending = ref(false)

const { product } = defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true,
  },
})

const addToCart = async () => {
  isPending.value = true
  await cartStore.addToCart(product)
  setTimeout(() => {
    isPending.value = false
  }, 1000)
}
</script>

<style scoped></style>
