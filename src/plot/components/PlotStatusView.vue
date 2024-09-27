<template>
  <div class="plot-status-view">
    <div v-if="plot" class="plot-info">
      <img :src="plot.imageUrl" alt="Plot Image" class="plot-image" />
      <div class="plot-details">
        <p><strong>Plot name:</strong> <span class="highlight">{{ plot.name }}</span></p>
        <p><strong>Plot size:</strong> <span class="highlight">{{ plot.size }} m²</span></p>
        <p><strong>Installed nodes:</strong> <span class="highlight">{{ plot.nodes }}</span></p>
        <p><strong>Last irrigation date:</strong> <span class="highlight">{{ formatDate(plot.lastIrrigationDate) }}</span></p>
      </div>
      <button class="irrigation-button">Schedule irrigation</button>
    </div>

    <div class="node-status-container" v-if="nodes.length">
      <h3>Node status</h3>
      <div class="node-status-line"></div>
      <div class="node-cards">
        <NodeStatusCard v-for="(node, index) in nodes" :key="index" :node="node" />
      </div>
      <p class="error-message">One or more nodes in your plot have an error. Contact support.</p>
      <button class="support-button">Contact support</button>
    </div>
  </div>
</template>

<script>
import { plotService } from "@/plot/services/plot.service.js";
import { nodeService} from "@/node/sevices/node.service.js";
import NodeStatusCard from "@/node/components/NodeStatusCard.vue";

export default {
  name: 'PlotStatusView',
  components: {
    NodeStatusCard
  },
  data() {
    return {
      plot: null,
      nodes: []
    };
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleDateString('en-GB', options);
    },
    fetchPlotAndNodes() {
      plotService.getPlotById(1)
          .then(response => {
            this.plot = response.data;
          })
          .catch(error => {
            console.error('Error fetching plot:', error);
          });

      nodeService.getNodesByPlotId(1)
          .then(response => {
            this.nodes = response.data;
          })
          .catch(error => {
            console.error('Error fetching nodes:', error);
          });
    }
  },
  mounted() {
    this.fetchPlotAndNodes();
  }
};
</script>

<style scoped>

.plot-status-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f4f8;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-left: 20px;
}

.plot-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.plot-image {
  width: 200px;
  height: auto;
  border-radius: 10px;
  margin-right: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.plot-details {
  background-color: #e9f5f9;
  padding: 15px;
  border-radius: 10px;
  margin-right: 20px;
}

.highlight {
  background-color: #d5f3e3;
  padding: 5px 10px;
  border-radius: 5px;
}

.irrigation-button, .support-button {
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.support-button {
  background-color: #dc3545;
}
.node-status-container h3 {
  color: #2B9846;
  text-align: center;
}
.node-status-container {
  width: 100%;
  text-align: center;
}
.node-status-line {
  border-bottom: 2px solid #2B9846;
  width: 100%;
  margin: 10px 0;
}
.node-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.error-message {
  color: #dc3545;
  margin-top: 20px;
  font-weight: bold;
}
</style>
