<template>
  <div class="node-status">
    <img class="node-icon" src="@/assets/logo.svg" alt="Water Indicator" />
    <p><strong>Location:</strong> {{ node.location }}</p>
    <p><strong>Moisture:</strong> {{ node.moisture }}%</p>
    <p><strong>Indicator:</strong> Water</p>
    <p :class="node.statusClass"><strong>Node status:</strong> {{ node.status }}</p>
  </div>
</template>

<script>
export default {
  name: "NodeStatusCard",
  props: {
    node: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.node-status {
  background-color: #fff;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.node-status p {
  margin: 10px 0;
  font-size: 14px;
}

.node-icon {
  width: 40px;
  margin-bottom: 10px;
}

.status-correct {
  color: #28a745;
}

.status-error {
  color: #dc3545;
}
</style>
