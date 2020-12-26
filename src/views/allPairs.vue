<template>
  <section>
    <v-container>
      <v-row align="center">
        <v-col align="center">
          <v-card flat class="px-2 py-2" max-width="600" style="background-color:rgba(0,0,0,0);">
            <v-row class="py-1" v-for="pair in this.assigned" :key="pair.giver">
              <v-col cols="5">
               <b> {{ pair.giver }} </b>
              </v-col>
              <v-col cols="2">
                <v-icon>mdi-arrow-right</v-icon>
              </v-col>
              <v-col cols="5">
               <b> {{ pair.receiver.fullname }} </b>
              </v-col>
              <v-divider></v-divider>
            </v-row>
            <v-row>
              <v-col>
                <v-btn block color="secondary" @click="goBack">
                  {{ $t("goBack") }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AllPairs",
  methods: {
    goBack() {
      this.$router.push("/game");
    },
  },
  computed: {
    ...mapGetters(["assigned"]),
  },
};
</script>

<style>
</style>