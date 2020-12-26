<template>
  <section>
    <v-container>
      <v-row align="center" style="height: 70vh">
        <v-col cols="12" align="center">
          <v-card
            style="
              background-color: rgba(0, 0, 0, 0);
              font-size: calc(12px + 0.6vw);
              max-width: 600px;
            "
            class="py-4"
            flat
          >
            <h3>{{ $t("loginWithEmail") }}</h3>
          </v-card>

          <v-card
            style="background-color: rgba(255, 255, 255, 0.9)"
            class="px-4"
            max-width="400"
          >
            <v-card-text>
              <v-form ref="loginForm" v-model="valid" lazy-validation>
                <v-row>
                  <v-col cols="12" align="center">
                    <v-text-field
                      v-model="email"
                      name="email"
                      type="text"
                      :rules="emailRules"
                      label="Email"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" align="center">
                    <v-text-field
                      v-model="password"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min]"
                      :type="show1 ? 'text' : 'password'"
                      name="input-10-1"
                      label="Password"
                      counter
                      @click:append="show1 = !show1"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col class="d-flex" cols="12" align="center">
                    <v-btn
                      :disabled="!valid"
                      x-large
                      block
                      color="secondary"
                      @click="login"
                    ><i v-if="isLoading" class="fa fa-spinner fa-spin" />
                      {{ $t("login") }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>

          <br />
          <v-card flat style="background-color: rgba(255, 255, 255, 0)">
            <v-btn text @click="goBack"> {{ $t("goBack") }} </v-btn>
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
    valid: true,
    email: "",
    password: "",
    show1: false,
    isLoading: false,
    emailRules: [
      (v) => !!v || i18n.t("required"),
      (v) => /.+@.+\..+/.test(v) || i18n.t("emailInvalid"),
    ],
    rules: {
      required: (value) => !!value || i18n.t("required"),
      min: (v) => (v && v.length >= 8) || i18n.t("min8Chars"),
    },
  }),
  metaInfo: {
    titleTemplate: "%s | Login",
  },
  methods: {
    ...mapActions(["loginWithEmail"]),
    login() {
      if (this.$refs.loginForm.validate()) {
        this.isLoading = true;
        let data = {
          email: this.email,
          password: this.password
        };
        this.loginWithEmail(data)
          .then(() => {
            this.$router.push("/game");
          })
          .catch((error) => {
            this.$swal(error.message);
            console.log(error);
          })
          .then(() => {
            this.isLoading = false;
          });

        //this.$store.dispatch("loginWithEmail", this.fullNameEntered);
        console.log("Loggging in as: " + this.email);

      } else {
        this.$swal(i18n.t("errorLogin"));
      }
    },
    goBack() {
      this.$router.push("/");
    },
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
  },
};
</script>


<style scoped>
</style>