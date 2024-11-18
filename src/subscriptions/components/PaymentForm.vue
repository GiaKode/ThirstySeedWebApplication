<template>
  <div class="payment-form-container">
    <h2>Confirm Your Payment</h2>
    <form @submit.prevent="handlePayment">
      <button type="submit" class="btn">Pay Now</button>
      <div v-if="paymentSuccess" class="success-message">¡Pago realizado con éxito!</div>
      <div v-if="error" class="error-message">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import SubscriptionService from "@/subscriptions/services/subscription-service.ts";

export default {
  props: {
    selectedPlan: { type: String, required: true },
  },
  data() {
    return {
      paymentSuccess: false,
      error: null,
    };
  },
  methods: {
    async handlePayment() {
      try {
        const currentUser = await SubscriptionService.getCurrentUser();
        const userId = currentUser?.id;

        // Agregar console.log para verificar el valor de userId
        console.log('User ID:', userId);

        if (!userId) {
          throw new Error("User ID not found. Please log in.");
        }

        // Definir planType y nodeCount basados en el plan seleccionado
        const planDetails = this.selectedPlan === 'premium'
            ? { planType: 'PREMIUM', nodeCount: 12 }  // Usar valores según el plan
            : { planType: 'PLUS', nodeCount: 5 };    // Usar valores según el plan

        // Crear los datos de la suscripción en el formato adecuado
        const subscriptionData = {
          userId: userId,  // Usar el userId obtenido
          planType: planDetails.planType,  // planType (ej. 'PREMIUM' o 'PLUS')
          nodeCount: planDetails.nodeCount, // nodeCount según el plan
          validationCode: 'TSeed-XWPXNDYL',  // Código de validación (puede ser dinámico si es necesario)
        };

        // Mostrar en la consola para verificar la estructura de los datos
        console.log('Subscription Data:', subscriptionData);

        // Usar el servicio para crear la suscripción
        const response = await SubscriptionService.createSubscription(subscriptionData);

        // Verificar respuesta exitosa
        if (response.status === 200) {
          this.paymentSuccess = true;
          this.$emit('success');
        } else {
          this.error = `Pago fallido: ${response.data.message || 'Error desconocido'}`;
        }
      } catch (error) {
        if (error.response) {
          this.error = error.response.data.message || 'Error al procesar el pago.';
        } else if (error.request) {
          this.error = 'No se recibió respuesta del servidor. Verifique su conexión.';
        } else {
          this.error = `Error: ${error.message}`;
        }
      }
    },
  },
};
</script>

<style scoped>
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

.error-message {
  color: red;
  margin-top: 1rem;
}

.success-message {
  color: #28a745;
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
</style>
