import { defineStore } from 'pinia'
import type { Product, ProductWithQuantity } from '~/interfaces/Product'

export const useCartStore = defineStore('cart', {
  state: (): { cart: ProductWithQuantity[] } => ({
    cart: [] as ProductWithQuantity[],
  }),
  getters: {
    total(): number {
      return this.cart.reduce(
        (total: number, product: ProductWithQuantity) => total + product.price * product.quantity,
        0,
      )
    },
    numberOfProducts(): number {
      return this.cart.reduce(
        (total: number, product: ProductWithQuantity) => total + product.quantity,
        0,
      )
    },
  },
  actions: {
    async getCart(): Promise<void> {
      this.cart = await $fetch('http://localhost:3001/cart')
    },
    async addToCart(product: Product): Promise<void> {
      const existingProduct: ProductWithQuantity | undefined = this.cart.find(
        (p: ProductWithQuantity): boolean => p.id === product.id,
      )

      if (existingProduct) {
        await this.incrementQuantity(existingProduct)
      } else {
        this.cart.push({ ...product, quantity: 1 })
        await $fetch('http://localhost:3001/cart', {
          method: 'POST',
          body: JSON.stringify({ ...product, quantity: 1 }),
        })
      }
    },
    async incrementQuantity(product: ProductWithQuantity) {
      let updatedProduct: ProductWithQuantity = { ...product, quantity: product.quantity }

      this.cart = this.cart.map((p: ProductWithQuantity) => {
        if (p.id === product.id) {
          p.quantity++
          updatedProduct = p
        }
        return p
      })

      await $fetch(`http://localhost:3001/cart/${product.id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedProduct),
      })
    },
    async decrementQuantity(product: ProductWithQuantity) {
      let updatedProduct: ProductWithQuantity = { ...product, quantity: product.quantity }

      this.cart = this.cart.map((p: ProductWithQuantity) => {
        if (p.id === product.id && p.quantity > 1) {
          p.quantity--
          updatedProduct = p
        }
        return p
      })

      await $fetch(`http://localhost:3001/cart/${product.id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedProduct),
      })
    },
    async removeFromCart(product: ProductWithQuantity) {
      this.cart = this.cart.filter((p: ProductWithQuantity) => p.id !== product.id)
      await $fetch(`http://localhost:3001/cart/${product.id}`, { method: 'DELETE' })
    },
  },
})
