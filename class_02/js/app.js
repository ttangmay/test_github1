new Vue({
	el: '#app',
	data: {
		isShowingCart: false,
		filterListing: '',
		products: [
			{ 
				id:1,
				name: 'Macbook Pro (15 inch)',
				description: 'This is Laptop',
				price: 2999,
				inStock: 10,
				image: './images/macbook.jpg',
				type: 'Laptop'
			},
			{ 
				id:2,
				name: 'Iphone X',
				description: 'This is Mobile',
				price: 1000,
				inStock: 12,
				image: './images/iphoneX.png',
				type: 'Mobile'
			},
		],
		cart: {
			items: [],
		}

	},
	methods: {
		addProductToCart: function(product) {
			// console.log(product)
			let cartItem = this.getCartItem(product)
			console.log(cartItem)
			if (cartItem == null) {
			this.cart.items.push({
				product:product,
				quantity:1,
				})
			} else {
				cartItem.quantity++
			}

			product.inStock--
		},
		getCartItem: function(product) {
			for(let i=0 ;i < this.cart.items.length; i++){

				if (this.cart.items[i].product.id === product.id) {
					return this.cart.items[i]
				}
			}
			return null
		},
		increase: function(item){
			item.quantity++
			item.product.inStock--
		},
		decrease: function(item){
			item.quantity--
			item.product.inStock++
			if(item.quantity==0){
				let index = this.cart.items.indexOf(item)
				if (index !== -1) {
					this.cart.items.splice(index,1)
				}
			}

			
		},
	},
	computed: {
		cartTotal: function() {
			let total = 0.0
			this.cart.items.forEach(function(item){
				total += item.quantity * item.product.price
			})
			return total
		},
		filterProducts() {
			return this.products.filter(product=> {
				return product.type.toLowerCase().indexOf(this.filterListing.toLowerCase()) > -1
			})
		},
		cartTaxes() {
			return this.cartTotal*0.07
		}
	},
	filters: {
		currency: function(value) {
			return value.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
		}
	}

})