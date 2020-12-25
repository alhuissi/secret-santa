
import Vue from "vue";
import Vuex from "vuex";
import { firebaseAuth, db, firestorage } from "../config/firebaseConfig";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLoggedIn: firebaseAuth().currentUser != null,
        user: firebaseAuth().currentUser,
        userInfo: null,
        fullName: 'full name',
        email: 'email@example.com',
        photo: 'mdi-account-circle',
        nParticipants: 10,
        group: [],
        assigned: [],
    },
    mutations: {
        AUTH_STATUS_CHANGE(state) {
            state.isLoggedIn = firebaseAuth().currentUser != null;
            state.user = firebaseAuth().currentUser;
        },
        AUTH_INFO(state) {
            let docRef = db.collection("users").doc(firebaseAuth().currentUser.uid);
            docRef
                .get()
                .then(function (doc) {
                    if (doc.exists) {
                        state.fullName = doc.data().fullName;
                        state.email = doc.data().email;
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                })
                .catch(function (error) {
                    console.log("Error getting document:", error);
                });
            state.userInfo = db.collection("users").doc(firebaseAuth().currentUser.uid);
        },
        CHANGE_NPARTICIPANTS(state, n) {
            state.nParticipants = n;
        },
        CHANGE_FULLNAME(state, fullName) {
            state.fullName = fullName;
        },
        CHANGE_EMAIL(state, email) {
            state.email = email;
        },
        CHANGE_PHOTO(state, photo) {
            state.photo = photo;
        },
        SET_GROUP(state, group) {
            state.group = group;
        },
        GET_GROUP(state) {
            let docRef = db.collection("groups").doc(firebaseAuth().currentUser.uid);
            docRef
                .get()
                .then(function (doc) {
                    if (doc.exists) {
                        state.group = doc.data().group;
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                })
                .catch(function (error) {
                    console.log("Error getting document:", error);
                });
        },
        GET_ASSIGNED(state) {
            let docRef = db.collection("assigned").doc(firebaseAuth().currentUser.uid);
            docRef
                .get()
                .then(function (doc) {
                    if (doc.exists) {
                        state.assigned = doc.data().assigned;
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                })
                .catch(function (error) {
                    console.log("Error getting document:", error);
                });
        },
        ASSIGN_GIFT(state, assigned) {
            state.assigned = assigned;
        }
    },
    actions: {
        registerByEmail(_, { email, password }) {
            return firebaseAuth().createUserWithEmailAndPassword(email, password);
        },
        registerUserFirestore(_, { email, fullName }) {
            const id = firebaseAuth().currentUser.uid;
            return db
                .collection("users")
                .doc(id)
                .set({
                    fullName: fullName,
                    email: email,
                    id: id,
                });
        },
        loginWithEmail(_, { email, password }) {
            return firebaseAuth().signInWithEmailAndPassword(email, password);
        },
        logoutFirebase() {
            return firebaseAuth().signOut();
        },
        uploadPhoto() {
            return firestorage();
        },
        setNParticipants({ commit }, n) {
            commit("CHANGE_NPARTICIPANTS", n);
        },
        setFullName({ commit }, fullName) {
            commit("CHANGE_FULLNAME", fullName);
        },
        setEmail({ commit }, email) {
            commit("CHANGE_EMAIL", email);
        },
        setPhoto({ commit }, photo) {
            commit("CHANGE_PHOTO", photo);
        },
        saveGroup(){
            const id = firebaseAuth().currentUser.uid;
            //let group = this.state.assigned;
            return db
                .collection("groups")
                .doc(id)
                .set({
                    savedBy: this.state.fullName,
                    savedByEmail: this.state.email,
                    savedById: id,
                    group: this.state.group
                });
        },
        saveAssigned(){
            const id = firebaseAuth().currentUser.uid;
            //let group = this.state.assigned;
            return db
                .collection("assigned")
                .doc(id)
                .set({
                    savedBy: this.state.fullName,
                    savedByEmail: this.state.email,
                    savedById: id,
                    assigned: this.state.assigned
                });
        },
        getSavedGroup({ commit }){
            commit("GET_GROUP");
        },
        getSavedAssignedGroup({ commit }){
            commit("GET_ASSIGNED");
        },
        async makeGroup({ commit }, n) {
            await axios
                .get("https://randomuser.me/api/?results=" + n, {
                    headers: { "Access-Control-Allow-Origin": "*" },
                    responseType: 'json',
                })
                .then((response) => (commit("SET_GROUP", response.data.results)));
        },
        assignGift({ commit }, shuffled) {
            let assigned = [];
            // To assign gifts, we insert the user into the first position of a new array that includes the rest of the group already shuffled,
            // and we assign every person to the next one in the shuffled array.
            assigned[0] = { 'giver': this.state.fullName, 'receiver': { 'fullname': shuffled[0].name.first + ' ' + shuffled[0].name.last, 'email': shuffled[0].email, "photo": shuffled[0].picture.medium } }
            for (let i = 1; i < shuffled.length; i++) {
                assigned[i] = { 'giver': shuffled[i - 1].name.first + ' ' + shuffled[i - 1].name.last, 'receiver': { 'fullname': shuffled[i].name.first + ' ' + shuffled[i].name.last, 'email': shuffled[i].email, "photo": shuffled[i].picture.medium } }
            }
            // Finally, we assign the last person of the shuffled array to the user, so that there's no duplicates.
            assigned[shuffled.length] = { 'giver': shuffled[shuffled.length - 1].name.first + ' ' + shuffled[shuffled.length - 1].name.last, 'receiver': { 'fullname': this.state.fullName, 'email': this.state.email, "photo": this.state.photo } }
            commit("ASSIGN_GIFT", assigned);
        }
    },
    getters: {
        user: (state) => {
            return state.user;
        },
        fullName: (state) => {
            return state.fullName;
        },
        email: (state) => {
            return state.email;
        },
        photo: (state) => {
            return state.photo;
        },
        isLoggedIn: (state) => {
            return state.isLoggedIn;
        },
        nParticipants: (state) => {
            return state.nParticipants;
        },
        group: (state) => {
            return state.group;
        },
        assigned: (state) => {
            return state.assigned;
        },
    }
});