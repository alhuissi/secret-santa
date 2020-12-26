<template>
  <section class="Game">
    <v-container>
      <v-row align="center" style="height:70vh">
        <v-col align="center">
          <!-- The image and name of the person you have to give a gift to, with some little christmas lights animationnn -->
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
                <v-avatar
                  size="100"
                  style="transition: all 325ms ease; margin-top: 10px">
                  <v-img :src="this.assigned[0].receiver.picture"
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
          <v-card flat max-width="600" class="my-4">
            <!-- List of participants -->
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header
                  color="secondary"
                  style="
                    text-align: center;
                    text-transform: uppercase;
                    color: white;
                    padding-left: 50px;
                    border-radius: 5px;
                  "
                >
                  <h3>{{ $t("groupList") }}</h3>
                </v-expansion-panel-header>
                <v-expansion-panel-content class="my-2">
                  <v-row align="center">
                    <v-col cols="1" align="center"> <b>1</b> </v-col>
                    <v-col cols="3" md="2">
                      <v-avatar color="grey">
                        <!--v-icon dark> mdi-account-circle </v-icon-->
                        <v-icon
                          v-if="
                            !uploadEnd && !uploading && profilePicture == ''
                          "
                          dark
                          >mdi-account-circle</v-icon
                        >
                        <v-img v-if="uploadEnd" :src="downloadURL" contain>
                          <template v-slot:placeholder>
                            <v-row
                              class="fill-height ma-0"
                              align="center"
                              justify="center"
                            >
                              <v-progress-circular
                                indeterminate
                                color="grey lighten-5"
                              ></v-progress-circular>
                            </v-row>
                          </template>
                        </v-img>
                        <v-img
                          v-if="profilePicture != '' && !uploadEnd"
                          :src="profilePicture"
                          contain
                        >
                          <template v-slot:placeholder>
                            <v-row
                              class="fill-height ma-0"
                              align="center"
                              justify="center"
                            >
                              <v-progress-circular
                                indeterminate
                                color="grey lighten-5"
                              ></v-progress-circular>
                            </v-row>
                          </template>
                        </v-img>
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
            <!-- Save List / Register -->
            <v-expansion-panels v-if="!isLoggedIn" class="my-2">
              <v-expansion-panel>
                <v-expansion-panel-header
                  color="secondary"
                  style="
                    text-align: center;
                    text-transform: uppercase;
                    color: white;
                    padding-left: 50px;
                    border-radius: 5px;
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
                          <v-col cols="12" align="center">
                            <v-btn
                              :disabled="!validRegister"
                              color="success"
                              @click="register"
                              ><i
                                v-if="registerIsLoading"
                                class="fa fa-spinner fa-spin"
                              />{{ $t("register") }}</v-btn
                            >
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-card-text>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <!-- Configuration -->
            <v-expansion-panels v-if="isLoggedIn" class="my-2">
              <v-expansion-panel>
                <v-expansion-panel-header
                  color="secondary"
                  style="
                    text-align: center;
                    text-transform: uppercase;
                    color: white;
                    padding-left: 50px;
                    border-radius: 5px;
                  "
                >
                  <h3>{{ $t("configuration") }}</h3>
                </v-expansion-panel-header>
                <v-expansion-panel-content class="my-4">
                  <v-row align="center">
                    <v-col cols="4">
                      <v-avatar color="grey">
                        <!--v-icon dark> mdi-account-circle </v-icon-->
                        <v-icon
                          v-if="
                            !uploadEnd && !uploading && profilePicture == ''
                          "
                          dark
                          >mdi-account-circle</v-icon
                        >
                        <v-img v-if="uploadEnd" :src="downloadURL" contain>
                          <template v-slot:placeholder>
                            <v-row
                              class="fill-height ma-0"
                              align="center"
                              justify="center"
                            >
                              <v-progress-circular
                                indeterminate
                                color="grey lighten-5"
                              ></v-progress-circular>
                            </v-row>
                          </template>
                        </v-img>
                        <v-img
                          v-if="profilePicture != '' && !uploadEnd"
                          :src="profilePicture"
                          contain
                        >
                          <template v-slot:placeholder>
                            <v-row
                              class="fill-height ma-0"
                              align="center"
                              justify="center"
                            >
                              <v-progress-circular
                                indeterminate
                                color="grey lighten-5"
                              ></v-progress-circular>
                            </v-row>
                          </template>
                        </v-img>
                      </v-avatar>
                    </v-col>
                    <v-col cols="8" align="left">
                      <v-btn
                        color="black"
                        @click.native="selectFile"
                        block
                        dark
                        small
                        outlined
                        v-if="!uploading"
                        ><h4>{{ $t("changePicture") }}</h4>
                      </v-btn>
                      <form ref="form" style="display: none">
                        <input
                          id="files"
                          type="file"
                          name="file"
                          ref="uploadInput"
                          accept="image/*"
                          :multiple="false"
                          @change="detectFiles($event)"
                        />
                      </form>
                      <v-progress-circular
                        v-if="uploading && !uploadEnd"
                        :size="100"
                        :width="15"
                        :rotate="360"
                        :value="progressUpload"
                        color="white"
                        >{{ progressUpload }}%</v-progress-circular
                      >
                      <!--div v-if="!uploadEnd && !uploading">(Max. 500 KB)</div>
                      <div v-if="uploadEnd">
                        No olvides guardar tus cambios
                        <v-btn outlined color="white" @click="deleteImage()"
                            >
                            Cancelar
                            </v-btn>
                      </div-->
                    </v-col>
                  </v-row>
                  <v-divider class="my-6"></v-divider>

                  <v-row align="center">
                    <v-col cols="4">
                      <v-icon size="30">mdi-autorenew</v-icon>
                    </v-col>
                    <v-col cols="8">
                      <v-btn
                        color="black"
                        block
                        dark
                        outlined
                        small
                        @click="createNewGroup"
                      >
                        <h4>{{ $t("createNewGroup") }}</h4>
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-divider class="my-6"></v-divider>

                  <v-row align="center">
                    <v-col cols="4">
                      <v-icon size="30">mdi-shuffle-variant</v-icon>
                    </v-col>
                    <v-col cols="8">
                      <v-btn
                        color="black"
                        block
                        dark
                        outlined
                        small
                        @click="reshuffle"
                      >
                        <h4>{{ $t("shuffleAgain") }}</h4>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <!-- Logout -->
            <v-btn
              color="secondary"
              block
              style="margin-top: 10px"
              @click="logout"
            >
              <h3>{{ $t("logout") }}</h3>
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { firestorage } from "../config/firebaseConfig";
import i18n from "@/i18n";

export default {
  name: "Game",
  data: () => ({
    info: "",
    progressUpload: 0,
    fileName: "",
    uploadTask: "",
    uploading: false,
    uploadEnd: false,
    downloadURL: "",
    validRegister: true,
    registerIsLoading: false,
    show1: false,
    email: "",
    password: "",
    verify: "",
    emailRules: [
      (v) => !!v || "Required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    rules: {
      required: (value) => !!value || i18n.t("required"),
      min: (v) => (v && v.length >= 8) || i18n.t("min8Chars"),
    },
  }),
  metaInfo: {
    titleTemplate: "%s | Result",
  },
  methods: {
    ...mapActions([
      "makeGroup",
      "assignGift",
      "registerByEmail",
      "registerUserFirestore",
      "logoutFirebase",
      "saveGroup",
      "saveAssigned",
    ]),
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
          password: this.password,
        };
        this.registerByEmail(data)
          .then(() => {
            console.log("User registered: " + this.email);
            this.registerUserFirestore(data);
            this.save();
            this.$swal(i18n.t("registerSuccesful"));
          })
          .catch((error) => {
            this.$swal(error.message);
            console.log("Error de registro", error);
          })
          .then(() => {
            this.registerIsLoading = false;
          });
      } else {
        this.$swal(i18n.t("errorLogin"));
      }
    },
    // Save groups in firestore database
    save() {
      this.saveGroup();
      this.saveAssigned();
      this.$swal(i18n.t("groupSaved"));
    },
    async createNewGroup() {
      const { value: nP } = await this.$swal({
        title: i18n.t("nParticipants"),
        icon: "question",
        showCancelButton: true,
        input: "range",
        inputAttributes: {
          min: 2,
          max: 20,
          step: 1,
        },
        inputValue: 10,
      });
      let n = nP - 1;
      await this.$store.dispatch("makeGroup", n);
      let shuffled = [].concat(this.group);
      shuffled = this.shuffle(shuffled);
      await this.$store.dispatch("assignGift", shuffled);
      this.save();
    },
    async reshuffle() {
      let shuffled = [].concat(this.group);
      shuffled = this.shuffle(shuffled);
      await this.$store.dispatch("assignGift", shuffled);
      this.save();
    },
    selectFile() {
      this.$refs.uploadInput.click();
    },
    detectFiles(e) {
      let fileList = e.target.files || e.dataTransfer.files;
      if (e) {
        let filesize = (fileList[0].size / 1024).toFixed(0);
        // Makes sure the file is less than 1MB
        if (filesize < 1001) {
          this.uploading = true;
          Array.from(Array(fileList.length).keys()).map((x) => {
            this.upload(fileList[x]);
          });
        } else {
          this.$swal("Max. 1MB");
        }
      }
    },
    upload(file) {
      this.fileName = file.name;
      this.uploadTask = firestorage
        .ref(`pictures/` + this.fullName + "/" + `${new Date().getTime()}_${file.name}`)
        .put(file);
      this.uploading = false;
    },
    deleteImage() {
      firestorage
        .ref("pictures/" + this.fullName + "/" + this.fileName)
        .delete()
        .then(() => {
          this.uploading = false;
          this.uploadEnd = false;
          this.downloadURL = "";
        })
        .catch((error) => {
          console.error(`file delete error occured: ${error}`);
        });
      this.$refs.form.reset();
    },
  },
  async mounted() {
    // If the user isn't registered, it creates a new group and combination
    // If the user is logged in (registered), we fetch the saved group from firestore in main.js
    if (!this.isLoggedIn) {
      let n = this.nParticipants - 1;
      await this.$store.dispatch("makeGroup", n);
      let shuffled = [].concat(this.group);
      shuffled = this.shuffle(shuffled);
      await this.$store.dispatch("assignGift", shuffled);
    }
  },
  computed: {
    ...mapGetters([
      "nParticipants",
      "fullName",
      "group",
      "assigned",
      "isLoggedIn",
      "picture",
    ]),
    loading() {
      if (!this.assigned[0]) {
        return true;
      } else return false;
    },
    passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    },
    profilePicture: {
      get: function () {
        return this.picture;
      },
      set: function (newValue) {
        this.picture = newValue;
      },
    },
  },
  watch: {
    uploadTask: function () {
      this.uploadTask.on(
        "state_changed",
        (sp) => {
          this.progressUpload = Math.floor(
            (sp.bytesTransferred / sp.totalBytes) * 100
          );
        },
        null,
        () => {
          this.uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.uploadEnd = true;
            this.downloadURL = downloadURL;
            this.$store.dispatch("setPicture", this.downloadURL); // saves the picture's URL in firestore database
          });
        }
      );
    },
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
