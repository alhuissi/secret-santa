<template>
  <section>
    <v-container>
      <v-row align="center" style="height:70vh;padding-top:6vh;">
        <v-col cols="12" align="center">
          <v-card
            style="
              background-color: rgba(0, 0, 0, 0);
              font-size: calc(11px + 0.6vw);
              max-width: 600px;
            "
            class="py-2"
            flat>
            <h3>{{ $t("welcomeMessage") }}</h3>
          </v-card>
          <v-card
            style="background-color: rgba(255, 255, 255, 0.9)"
            class="px-4"
            max-width="400">
            <v-card-text>
              <v-form ref="loginForm" v-model="validFullname" lazy-validation>
                <v-row>
                  <v-col cols="12" align="center">
                    <v-text-field
                      v-model="fullNameEntered"
                      :rules="[rules.required, rules.min]"
                      :label="fullNameLabel"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" align="left">
                    {{ $t("nParticipants") }}:
                  </v-col>
                  <v-col cols="12" align="center">
                    <v-slider
                      v-model="computedParticipants"
                      max="20"
                      min="2"
                      thumb-label="always"
                      required
                      style="margin-top: 10px"
                    ></v-slider>
                  </v-col>
                  <v-col class="d-flex" cols="12" align="center">
                    <v-btn
                      :disabled="!validFullname"
                      x-large
                      block
                      color="secondary"
                      @click="login">
                      {{ $t("generate") }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
            <br />
          <v-card flat style="background-color: rgba(255, 255, 255, 0)">
            <v-label> {{ $t("alreadyRegistered") }} </v-label> <br />
            <v-btn text @click="openLogin" class="hover"> {{ $t("loginHere") }} </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import i18n from "@/i18n";

export default {
  data: () => ({
    validFullname: true,
    fullNameEntered: null,
    rules: {
      required: (value) => !!value || i18n.t("required"),
      min: (v) => (v && v.length >= 3) || i18n.t("min3Chars"),
    },
  }),
  metaInfo: {
    titleTemplate: "%s | Login",
  },
  methods: {
    ...mapActions(["setNParticipants", "setFullName"]),
    login() {
      if (this.$refs.loginForm.validate()) {
        this.$store.dispatch("setFullName", this.fullNameEntered);
        console.log("Loggged in as: " + this.fullNameEntered);
        this.$router.push("/game");
      } else {
        this.$swal(i18n.t("errorLogin"));
      }
    },
    openLogin(){
      this.$router.push("/loginWithEmail");
    }
  },
  computed: {
    ...mapGetters(["nParticipants"]),
    computedParticipants: {
      get: function () {
        return this.nParticipants;
      },
      set: function (newValue) {
        this.$store.dispatch("setNParticipants", newValue);
      },
    },
    fullNameLabel() {
      return i18n.t("fullName");
    },
  },
};
</script>


<style scoped>

</style>