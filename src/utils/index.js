/**
 * @function totalPrice - Function to calculate the total price of the products in the cart
 * @param {Array} cartProducts - Array of objects with the products added to the cart
 * @returns {Number} - The total price of the products in the cart
 */

export const totalPrice = (cartProducts) => {
  return cartProducts.reduce((acc, product) => acc + product.price, 0)
}