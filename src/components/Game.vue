<template>
  <section class="Game">
    <v-container>
      <v-row align="center" style="height: 70vh">
        <v-col align="center">
          <!-- The image and name of the person you have to give gift, with a little css christmas animation -->
          <div class="animation-wrapper">
            <v-row>
              <v-col align="center">
                <span
                  class="animation"
                  v-for="i in 15"
                  :key="'i' + i"
                ></span> </v-col
            ></v-row>

            <v-row>
              <v-col align="center">
                <v-progress-circular
                  v-if="loading"
                  indeterminate
                  size="100"
                  class="my-12"
                  style="transition: all 325ms ease"
                  color="green"
                ></v-progress-circular>
                <v-avatar
                  v-if="!loading"
                  size="100"
                  style="transition: all 325ms ease; margin-top: 10px"
                >
                  <v-img :src="this.assigned[0].receiver.photo"
                    ><template v-slot:placeholder>
                      <v-sheet>
                        <v-skeleton-loader type="card-avatar" />
                      </v-sheet> </template
                  ></v-img>
                </v-avatar>
              </v-col>
            </v-row>
            <v-card
              class="px-4 my-4"
              style="background-color: rgba(0, 0, 0, 0)"
              flat
              v-if="this.assigned[0]"
            >
              <div>
                <h3>{{ $t("secretSantaText1") }}</h3>
              </div>
              <h1>
                <b
                  >{{ this.assigned[0].receiver.fullname
                  }}{{ $t("secretSantaTextS") }}</b
                >
              </h1>
              <div>
                <h3>{{ $t("secretSantaText2") }}</h3>
              </div>
            </v-card>

            <v-row>
              <v-col align="center">
                <span class="animation" v-for="j in 15" :key="'j' + j"></span>
              </v-col>
            </v-row>
          </div>

          <!-- List of participants -->
          <v-card flat max-width="600" class="my-4">
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header
                  color="secondary"
                  style="
                    text-align: center;
                    text-transform: uppercase;
                    color: white;
                    padding-left: 50px;
                    border-radius:5px;
                  "
                >
                  <h3>{{ $t("groupList") }}</h3>
                </v-expansion-panel-header>
                <v-expansion-panel-content class="my-2">
                  <v-row align="center">
                    <v-col cols="1" align="center"> <b>1</b> </v-col>
                    <v-col cols="3" md="2">
                      <v-avatar color="red">
                        <v-icon dark> mdi-account-circle </v-icon>
                      </v-avatar>
                    </v-col>
                    <v-col cols="7" align="left">
                      <div class="text-no-wrap">
                        <b> {{ this.fullName }} </b>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row
                    v-for="(person, index) in this.group"
                    :key="index"
                    align="center"
                  >
                    <v-col cols="1" align="left">
                      <div class="text-no-wrap">
                        <b>{{ index + 2 }}</b>
                      </div>
                    </v-col>
                    <v-col cols="3" md="2">
                      <v-avatar>
                        <img
                          :src="person.picture.thumbnail"
                          :alt="person.name.first"
                        />
                      </v-avatar>
                    </v-col>
                    <v-col cols="7" align="left">
                      <div class="text-no-wrap">
                        <b> {{ person.name.first }} {{ person.name.last }} </b>
                      </div>
                      <!--div class="text-no-wrap"> {{ person.login.username }} </div-->
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <v-expansion-panels v-if="!isLoggedIn" class="my-2">
              <v-expansion-panel>
                <v-expansion-panel-header
                  color="secondary"
                  style="
                    text-align: center;
                    text-transform: uppercase;
                    color: white;
                    padding-left: 50px;
                    border-radius:5px;
                  "
                >
                  <h3>{{ $t("saveList") }}</h3>
                </v-expansion-panel-header>
                <v-expansion-panel-content class="my-2">
                  <v-card class="px-4">
                    <v-card-text>
                      <v-form
                        ref="registerForm"
                        v-model="validRegister"
                        lazy-validation
                      >
                      <v-row>
                        <v-col>
                          <h4>{{ $t("registerText") }}</h4>
                        </v-col>
                      </v-row>
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              v-model="email"
                              :rules="emailRules"
                              label="E-mail"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              v-model="password"
                              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                              :rules="[rules.required, rules.min]"
                              :type="show1 ? 'text' : 'password'"
                              name="input-10-1"
                              label="Password"
                              hint="At least 8 characters"
                              counter
                              @click:append="show1 = !show1"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              block
                              v-model="verify"
                              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                              :rules="[rules.required, passwordMatch]"
                              :type="show1 ? 'text' : 'password'"
                              name="input-10-1"
                              label="Confirm Password"
                              counter
                              @click:append="show1 = !show1"
                            ></v-text-field>
                          </v-col>
                          <v-spacer></v-spacer>
                          <v-col
                            cols="12"
                            align="center"
                          >
                            <v-btn
                              :disabled="!validRegister"
                              color="success"
                              @click="register"
                              ><i v-if="registerIsLoading" class="fa fa-spinner fa-spin" />{{ $t("register") }}</v-btn
                            >
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-card-text>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <v-btn v-if="isLoggedIn"
              color="secondary"
              block
              style="margin-top: 10px"
              @click="save">
              <h3>{{ $t("saveList") }}</h3>
            </v-btn>
            <v-btn
              color="secondary"
              block
              style="margin-top: 10px"
              @click="logout"
            >
              <h3>{{ $t("logout") }}</h3>
            </v-btn>
          </v-card>

          <!-- Logout -->
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import i18n from "@/i18n";

export default {
  name: "Game",
  data: () => ({
    info: "",
    validRegister: true,
    registerIsLoading: false,
    show1: false,
    email: "",
    password: "",
    verify: "",
    emailRules: [
      v => !!v || "Required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    rules: {
      required: value => !!value || i18n.t("required"),
      min: v => (v && v.length >= 8) || i18n.t("min8Chars")
    }
  }),
  metaInfo: {
    titleTemplate: "%s | Result",
  },
  methods: {
    ...mapActions(["makeGroup", "assignGift", "registerByEmail", "registerUserFirestore", "logoutFirebase", "saveGroup", "saveAssigned"]),
    // Shuffles an array using the Fisher-Yates method
    shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    },
    logout() {
      this.logoutFirebase();
      this.$router.push("/");
    },
    register() {
      if (this.$refs.registerForm.validate()) {
        this.registerIsLoading = true;
        let data = {
          fullName: this.fullName,
          email: this.email,
          password: this.password
        };
        this.registerByEmail(data)
          .then(() => {
            console.log("User registered: " + this.email);
            this.registerUserFirestore(data);
            this.save();
            this.$swal(i18n.t("registerSuccesful"));
          })
          .catch((error) => {
            this.$swal(i18n.t("errorLogin"));
            console.log("Error de registro", error);
          })
          .then(() => {
            this.registerIsLoading = false;
          });
      }else{
        this.$swal(i18n.t("errorLogin"));
      }
    },
    save(){
      this.saveGroup();
      this.saveAssigned();
      this.$swal(i18n.t("groupSaved"));
    }
  },
  async mounted() {
    if(this.isLoggedIn){
      await this.$store.dispatch("getSavedGroup");
      await this.$store.dispatch("getSavedAssignedGroup");
    }else{
      let n = this.nParticipants - 1;
      await this.$store.dispatch("makeGroup", n);
      //console.log(this.group);
      let shuffled = [].concat(this.group);
      shuffled = this.shuffle(shuffled);
      //console.log(shuffled);
      await this.$store.dispatch("assignGift", shuffled);
      //console.log(this.assigned);
      }
  },
  computed: {
    ...mapGetters(["nParticipants", "fullName", "group", "assigned", "isLoggedIn"]),
    loading() {
      if (!this.assigned[0]) {
        return true;
      } else return false;
    },
    passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    }
  },
};
</script>

<style scoped>
@import "../assets/animations.css";

.Game {
  width: 100vw;
  height: 100vh;
}
</style>
