<template>
  <div class="irrigation-plot-view">
    <div class="header-container">
      <h2>Schedules irrigation</h2>
      <button class="schedule-btn" @click="scheduleIrrigation">Programar riego</button>
    </div>
    <div class="line"></div>
    <div class="cards-container">
      <NodeIrrigationSchedulingCard
          v-for="(node, index) in nodes"
          :key="node.id"
          :node="node"
          :schedule="schedules[index]"
          :plotName="plot ? plot.name : ''" >
      </NodeIrrigationSchedulingCard>
    </div>
  </div>
</template>

<script>
import NodeIrrigationSchedulingCard from "@/irrigation-management/components/NodeIrrigationSchedulingCard.vue";
import IrrigationSettingsService from '../services/irrigation-setting-service';
import PlotService from '../services/plot-management-service.ts';

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

      PlotService.get(plotId)
          .then(response => {
            this.plot = response.data;
          })
          .catch(error => {
            console.error('Error fetching plot:', error);
          });

      IrrigationSettingsService.getAll()
          .then(response => {
            this.nodes = response.data;
            this.schedules = response.data;
          })
          .catch(error => {
            console.error('Error fetching irrigation schedules:', error);
          });
    },
    scheduleIrrigation() {
      this.$router.push('/set-irrigation-mode');
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
  padding: 20px;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: flex-start;
}
.schedule-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}
.line {
  width: 100%;
  height: 2px;
  background-color: #2B9846;

}
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1px;
}
</style>