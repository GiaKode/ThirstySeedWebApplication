<template>
  <div class="plot-status-view">
    <!-- Información de la parcela -->
    <div v-if="plot" class="plot-info">
      <img :src="plot.imageUrl" alt="Plot Image" class="plot-image" />
      <p><strong>Plot name:</strong> {{ plot.name }}</p>
      <p><strong>Plot size:</strong> {{ plot.size }} m²</p>
      <p><strong>Installed nodes:</strong> {{ plot.nodes }}</p>
      <p><strong>Last irrigation date:</strong> {{ formatDate(plot.lastIrrigationDate) }}</p>
    </div>

    <!-- Estado de los nodos -->
    <div class="node-status-container" v-if="nodes.length">
      <NodeStatusCard v-for="(node, index) in nodes" :key="index" :node="node" />
    </div>
  </div>
</template>

<script>
import { plotService } from "@/plot/services/plot.service.js";
import { nodeService } from "@/plot/services/node.service.js";
import NodeStatusCard from "@/plot/components/NodeStatusCard.vue";

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
      // Obtener parcela
      plotService.getPlotById(1)
          .then(response => {
            this.plot = response.data;
          })
          .catch(error => {
            console.error('Error fetching plot:', error);
          });

      // Obtener nodos asociados
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
