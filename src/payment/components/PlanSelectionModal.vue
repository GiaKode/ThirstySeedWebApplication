<template>
  <div class="modal-overlay" v-if="show">
    <div class="modal-content">
      <h2 v-if="!paymentFormVisible">Select Your Plan</h2>
      <div v-if="!paymentFormVisible" class="plans">
        <div class="plan-card" @click="selectPlan('premium')">
          <h3>PREMIUM</h3>
          <p>Basic irrigation monitoring with limited alerts and up to 5 connected sensors.</p>
          <h2>$7</h2>
          <button class="btn">Choose Premium</button>
        </div>
        <div class="plan-card" @click="selectPlan('plus')">
          <h3>PLUS</h3>
          <p>Advanced irrigation automation, unlimited alerts, and up to 12 connected sensors.</p>
          <h2>$15</h2>
          <button class="btn">Choose Plus</button>
        </div>
      </div>

      <!-- Mostrar el formulario de pago si se selecciona un plan -->
      <div v-if="paymentFormVisible">
        <!-- Pasar el plan seleccionado a PaymentForm -->
        <PaymentForm ref="paymentForm" :selectedPlan="selectedPlan" :userId="userId" />

      </div>

      <button class="close-btn" @click="closeModal">Close</button>
    </div>
  </div>
</template>

<script>
import PaymentForm from './PaymentForm.vue';

export default {
  data() {
    return {
      paymentFormVisible: false,
      selectedPlan: '' // Estado para almacenar el plan seleccionado
    };
  },
  components: {
    PaymentForm
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    userId: { // Recibe el userId desde signup.vue
      type: String,
      required: true
    }
  },
  methods: {
    closeModal() {
      // Verifica si el pago fue exitoso antes de redirigir
      if (this.paymentFormVisible && this.$refs.paymentForm.paymentSuccess) {
        // Redirige al login después de un pago exitoso
        this.$router.push('/login');
      } else {
        // Simplemente cierra el modal si el pago no ha sido realizado
        this.$emit('close');
      }
    },
    async selectPlan(plan) {
      this.selectedPlan = plan;
      this.paymentFormVisible = true;
    },

    async handlePaymentSuccess(code, nodeCount) {
      // Actualizar el usuario con los detalles del plan
      await axios.patch(`http://localhost:3000/users/${this.$parent.userId}`, {
        plan: {
          type: this.selectedPlan,
          code,
          nodeCount
        }
      });

      // Redirigir o cerrar el modal tras el pago exitoso
      this.$emit('close');
    }
  }
};
</script>


<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  text-align: center;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

.plans {
  display: flex;
  justify-content: space-around;
  margin: 2rem 0;

}

.plan-card {
  background-color: #2e7d32;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  width: 40%;
  text-align: center;
  transition: transform 0.3s ease;
}

.plan-card:hover {
  transform: scale(1.05);

}

.btn {
  margin-top: 1rem;
  background-color: #4caf50;
  padding: 0.75rem;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  font-family: 'Poppins', sans-serif;
}

.close-btn {
  margin-top: 1rem;
  background-color: #ff0000;
  padding: 0.75rem;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  font-family: 'Poppins', sans-serif;
}
</style>
