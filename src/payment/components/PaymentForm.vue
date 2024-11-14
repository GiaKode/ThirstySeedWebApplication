<template>
  <div class="payment-form-container">
    <h2>Enter Your Payment Details</h2>
    <form @submit.prevent="handlePayment">
      <!-- Campos del formulario de pago -->
      <div class="card-element">
        <label for="cardNumber">Card Number:</label>
        <input type="text" v-model="cardNumber" placeholder="Enter card number" @input="validateNumericInput('cardNumber')" maxlength="16" />

        <label for="expiry">Expiry Date:</label>
        <input type="text" v-model="expiry" placeholder="MM/YY" @input="formatExpiry" maxlength="5" />

        <label for="cvc">CVC:</label>
        <input type="text" v-model="cvc" placeholder="CVC" @input="validateNumericInput('cvc')" maxlength="3" />
      </div>
      <button type="submit" class="btn">Pay Now</button>
      <div v-if="error" class="error-message">{{ error }}</div>
    </form>

    <!-- Mensaje de éxito de pago en verde -->
    <div v-if="paymentSuccess" class="success-message">
      ¡Pago realizado con éxito!
    </div>

    <!-- Tarjeta para mostrar el código de validación -->
    <div v-if="code" class="code-card">
      <h3>Code for Node Validation</h3>
      <p>{{ code }}</p>
      <button @click="copyCode" class="copy-btn">Copy Code</button>
      <p v-if="copySuccess" class="copy-success">Code copied!</p>
    </div>


  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    selectedPlan: {
      type: String,
      required: true
    },
  userId: { // Recibe el userId desde PlanSelectionModal.vue
      type: String,
      required: true
    }
  },
  data() {
    return {
      cardNumber: '',
      expiry: '',
      cvc: '',
      error: null,
      code: null,
      paymentSuccess: false,
      copySuccess: false
    };
  },
  methods: {
    async handlePayment() {
      if (!this.selectedPlan) {
        this.error = "Por favor selecciona un plan antes de pagar.";
        return;
      }

      try {
        const amount = this.selectedPlan === 'plus' ? 15 : 7;

        const response = await axios.post('http://localhost:4242/process-payment', {
          cardNumber: this.cardNumber,
          amount
        });

        if (response.data.success) {
          this.paymentSuccess = true;
          await this.generateUniqueCode();
          await this.savePurchaseData();
        } else {
          this.error = response.data.error || "Payment failed. Please try again.";
        }
      } catch (err) {
        this.error = "Payment failed. Please try again.";
      }
    },

    async generateUniqueCode() {
      const prefix = "TSeed-";
      let unique = false;

      while (!unique) {
        const randomCode = Array.from({ length: 8 }, () =>
          Math.random().toString(36)[2]
        )
          .join('')
          .toUpperCase();
        const generatedCode = `${prefix}${randomCode}`;

        const response = await axios.get('http://localhost:3000/users');
        const codes = response.data.map((user) => user.code);

        if (!codes.includes(generatedCode)) {
          this.code = generatedCode;
          unique = true;
        }
      }
    },

    async savePurchaseData() {
      const nodeCount = this.selectedPlan === 'premium' ? 5 : 12;

      await axios.patch(`http://localhost:3000/users/${this.userId}`, { // Usa directamente this.userId
        plan: {
          type: this.selectedPlan,
          code: this.code,
          nodeCount
        }
      });
      this.paymentSuccess = true; // Indica que el pago fue exitoso
    },

    copyCode() {
      navigator.clipboard.writeText(this.code).then(() => {
        this.copySuccess = true;
        setTimeout(() => (this.copySuccess = false), 2000);
      });
    },

    validateNumericInput(field) {
      this[field] = this[field].replace(/\D/g, '');
    },

    formatExpiry() {
      if (this.expiry.length === 2 && !this.expiry.includes('/')) {
        this.expiry += '/';
      }
      this.expiry = this.expiry.replace(/[^0-9/]/g, '').slice(0, 5);
    },
  }
};
</script>



<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');


.payment-form-container {
  font-family: 'Poppins', sans-serif;
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

.card-element label {
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.card-element input {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 1rem;
}

.card-element label,
.card-element input,
.error-message,
.success-message,
.btn,
.code-card,
.copy-btn {
  font-family: 'Poppins', sans-serif;
}

.error-message {
  color: red;
  margin-top: 1rem;
}

.success-message {
  color: #28a745; /* Verde para éxito */
  font-weight: bold;
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
  margin-top: 1rem;
}

.code-card {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f1f1f1;
  border-radius: 8px;
  text-align: center;
}

.copy-btn {
  background-color: #4caf50;
  padding: 0.5rem;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 1rem;
  font-family: 'Poppins', sans-serif;
}

.copy-success {
  color: green;
  margin-top: 0.5rem;
}
</style>
