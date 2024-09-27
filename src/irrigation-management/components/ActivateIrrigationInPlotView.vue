<template>
  <div class="irrigation-plot-view">
    <h2>Schedules irrigation</h2>
    <div class="cards-container">
      <NodeIrrigationSchedulingCard
          v-for="(node, index) in nodes"
          :key="node.id"
          :node="node"
          :schedule="schedules[index]"
          :plotName="plot ? plot.name : ''" ></NodeIrrigationSchedulingCard>

    </div>
  </div>
</template>

<script>
import NodeIrrigationSchedulingCard from "@/irrigation-management/components/NodeIrrigationSchedulingCard.vue";
import scheduleirrigationService from "@/plot/services/scheduleirrigation.service.js";
import {plotService} from "@/plot/services/plot.service.js";

export default {
  components: {
    NodeIrrigationSchedulingCard,
  },
  data() {
    return {
      nodes: [],
      schedules: [],
      plot: null,
    };
  },
  created() {
    this.fetchNodesAndPlot();
  },
  methods: {
    fetchNodesAndPlot() {
      const plotId = 1;


      plotService.getPlotById(plotId)
          .then(response => {
            this.plot = response.data;
          })
          .catch(error => {
            console.error('Error fetching plot:', error);
          });


      scheduleirrigationService.getIrrigationScheduleByPlotId(plotId)
          .then(response => {
            this.nodes = response.nodes;
            this.schedules = response.schedules;
          })
          .catch(error => {
            console.error('Error fetching irrigation schedule:', error);
          });
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleDateString('en-GB', options);
    }
  }
};
</script>

<style scoped>
.irrigation-plot-view {
  padding: 16px;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
