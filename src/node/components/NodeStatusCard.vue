<template>
  <div class="node-status">
    <img src="https://static.vecteezy.com/system/resources/previews/020/813/640/non_2x/watering-icon-for-your-website-design-logo-app-ui-free-vector.jpg" alt="Water Indicator" class="icon"/>
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
  background-color: #f8f9fa;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin: 10px;
  flex: 1;
}

.node-status p {
  margin: 8px 0;
  font-size: 16px;
}

.icon {
  width: 120px;
  margin-bottom: 5px;
}

.status-correct {
  color: #28a745;
}

.status-error {
  color: #dc3545;
}
</style>
