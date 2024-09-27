<template>
  <div class="irrigation-plot-view">
    <div class="header-container">
      <h2>Schedules irrigation</h2>
      <router-link to="/set-irrigation-mode">
        <button class="schedule-btn" @click="scheduleIrrigation">Programar riego</button>
      </router-link>

    </div>
    <div class="line"></div>
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
import irrigationScheduleService from "@/irrigation-management/services/irrigation-schedule.service.js";
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


      irrigationScheduleService.getIrrigationScheduleByPlotId(plotId)
          .then(response => {
            this.nodes = response.nodes;
            this.schedules = response.schedules;
          })
          .catch(error => {
            console.error('Error fetching irrigation schedule:', error);
          });
    },
    scheduleIrrigation() {
      alert('Función para programar riego');

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
  margin-left: 235px;
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
