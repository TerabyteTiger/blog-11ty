---
title: No-Nonsense Firebase Auth + Firestore in Vue
layout: libdoc_page.liquid
published: true
description: Get Firestore + Auth working. Do not pass Go. Do not collect 200 tutorials.
tags:
    - vue
    - firebase
    - webdev
    - firestore
cover_image: ../../assets/archive/blogImgs/cover-images/no-nonsense-firebase-auth-and-firestore-in-vue-DEV.png
date: "2020-09-09"
twitter_image: ../../assets/archive/blogImgs/twitter-images/no-nonsense-firebase-auth-and-firestore-in-vue-Twitter.png
permalink: "{{ libdocConfig.archiveSlug }}/{{date}}-{{page.fileSlug}}/index.html"
---

Let's add Firebase to our Vue + Vuex App with no nonsense.

> Tip: <kbd>Ctrl</kbd> + <kbd>F</kbd> for "recipe" to find variables to update

## NPM

```bash{codeTitle: "Terminal"}
npm i firebase core-js
```

## Config Files

### Add src/firebase.js:

```js{codeTitle: "src/firebase.js"}
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
// 👆 This example is using Auth + Firestore

var firebaseConfig = {
  // This comes from Google - add your config here
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collections
const usersCollection = db.collection("users");
const recipeCollection = db.collection("recipe");
// 👆 Here you create your Collections you want to use later

// 👇 You export things here | update the variable names
export { db, auth, usersCollection, recipeCollection };
```

### Modify src/main.js

```js{codeTitle: "src/main.js"}
// 👇 Add this to your imports
import { auth } from "./firebase";

// 👇 Wrap your new Vue like this
let app;
auth.onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }

  if (user) {
    store.dispatch("fetchUserProfile", user);
  }
});
```

## Vuex Store

### Template State

```js{codeTitle: "src/store/index.js"}
// 👇 Add these imports
import * as firebase from "../firebase";
import router from "../router/index";

// 👇 Add this outside your store const if it isn't user dependent filtering
firebase.recipeCollection
  // 👆 Replace this with your variable from firebase.js
  .where("public", "==", true)
  // 👆 This filters incoming data
  .onSnapshot((snapshot) => {
    let recipeArray = [];

    snapshot.forEach((doc) => {
      let recipe = doc.data();
      recipe.id = doc.id;

      recipeArray.push(recipe);
    });
    // 👆 Create an array of all docs found.
    store.commit("setRecipes", recipeArray);
  });

// 👇 From here down replaces the export default new Vuex.Store({...}) that Vue adds by default
const store = new Vuex.Store({
  state: {
    userProfile: {},
    recipes: [],
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setRecipes(state, val) {
      state.recipes = val;
    },
  },
  actions: {
    async login({ dispatch }, form) {
      const { user } = await firebase.auth.signInWithEmailAndPassword(
        form.email,
        form.password
      );

      dispatch("fetchUserProfile", user);
    },

    async fetchUserProfile({ commit }, user) {
      const userProfile = await firebase.usersCollection.doc(user.uid).get();

      commit("setUserProfile", userProfile.data());

      if (router.currentRoute.path === "/login") {
        router.push("/");
      }
    },
    async logout({ commit }) {
      await firebase.auth.signOut();

      // clear userProfile and redirect to /login
      commit("setUserProfile", {});
      router.push("/login");
    },

    async createRecipe({ state, commit }, recipe) {
      let now = new Date();

      // 👇 Model your record here
      await firebase.recipeCollection.add({
        createdOn: now,
        userId: firebase.auth.currentUser.uid,
        username: state.userProfile.name,
      });
    },

    async signup({ dispatch }, form) {
      // sign user up
      const { user } = await firebase.auth.createUserWithEmailAndPassword(
        form.email,
        form.password
      );

      // 👇 Add this to your login form as the submit function
      //    login() {
      //      this.$store.dispatch("login", {
      //        email: this.loginForm.email,
      //        password: this.loginForm.password
      //      });
      //    },

      // create user profile object in userCollection
      await firebase.usersCollection.doc(user.uid).set({
        name: form.name,
      });

      dispatch("fetchUserProfile", user);
    },
  },
});

export default store;
```

## V-Router

```js{codeTitle: "src/router/index.js"}
// 👇 Add this to your imports
import { auth } from "../firebase";

// ...

// 👇 An example route that requires user to be authenticated
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
];

// ...

// 👇 Add this just before your export
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);

  if (requiresAuth && !auth.currentUser) {
    // 👇 Direct the user to this path if not logged in
    next("/login");
  } else {
    next();
  }
});
```

## References

These sources helped me get this working the first time:

-   [Building a Real-World Web App With Vue.js and Firebase](https://savvyapps.com/blog/definitive-guide-building-web-app-vuejs-firebase)
-   [Firebase Docs](https://firebase.google.com/docs)
