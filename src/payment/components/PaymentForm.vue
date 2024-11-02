<template>
  <div class="payment-form-container">
    <h2>Enter Your Payment Details</h2>
    <form @submit.prevent="handlePayment">
      <div class="card-element">
        <label for="cardNumber">Card Number:</label>
        <input type="text" v-model="cardNumber" placeholder="Enter card number" />

        <label for="expiry">Expiry Date:</label>
        <input type="text" v-model="expiry" placeholder="MM/YY" />

        <label for="cvc">CVC:</label>
        <input type="text" v-model="cvc" placeholder="CVC" />
      </div>
      <button type="submit" class="btn">Pay Now</button>
      <div v-if="error" class="error-message">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      cardNumber: '',
      expiry: '',
      cvc: '',
      error: null
    };
  },
  methods: {
    async handlePayment() {
      try {
        const amount = 50;

        const response = await axios.post('http://localhost:4242/process-payment', {
          cardNumber: this.cardNumber,
          amount
        });

        if (response.data.success) {
          alert("¡Pago realizado con éxito!");
          this.$router.push('/login'); // Redirige al login después del pago
        } else {
          this.error = response.data.error;
        }
      } catch (err) {
        console.error("Payment error:", err);
        this.error = "Payment failed. Please try again.";
      }
    }
  }
};
</script>

<style scoped>
.payment-form-container {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin: auto;
  text-align: center;
}

.card-element {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

.error-message {
  color: red;
  margin-top: 1rem;
}

.btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #4caf50;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
