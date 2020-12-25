<template>
  <v-app>
    <!-- Header -->
    <v-app-bar app color="primary" dark>
      <!-- My Logo -->
      <div class="logoContainer">
        <a href="https://www.thedeval.com" target="_blank" alt="Made by The Deval">
          <v-img
            alt="The Deval Logo"
            class="shrink mr-2 logo"
            contain
            :src="logo_src"
            transition="scale-transition"
            width="40"
        /></a>
      </div>

      <div class="neon" style="width:100%;text-align:center;font-size:calc(14px + 0.5vw);">
        <h2>{{ $t("appTitle") }}</h2>
      </div>

      <v-spacer></v-spacer>

      <!-- Language Selection -->
      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark icon v-bind="attrs" v-on="on">
            <v-icon>mdi-translate</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            @click="changeLocale(item.locale)"
            :id="item.locale"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-img
              :alt="item.title"
              class="shrink mr-2"
              contain
              :src="item.src"
              transition="scale-transition"
              width="40"
            />
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- snowflakes animation -->
    <div class="snowflakes" aria-hidden="true">
      <div class="snowflake">❅</div>
      <div class="snowflake">❅</div>
      <div class="snowflake">❆</div>
      <div class="snowflake">❄</div>
      <div class="snowflake">❅</div>
      <div class="snowflake">❆</div>
      <div class="snowflake">❄</div>
      <div class="snowflake">❅</div>
      <div class="snowflake">❆</div>
      <div class="snowflake">❄</div>
    </div>

    <v-main>
      <transition name="fade" mode="out-in">
        <router-view ref="routerViewRef" class="component-container" />
      </transition>
    </v-main>
  </v-app>
</template>

<script>
import i18n from "@/i18n";

export default {
  name: "App",
  data: () => ({
    logo_src: require("../src/assets/logo.png"),
    items: [
      {
        title: i18n.t("english"),
        src: "https://www.countryflags.io/gb/flat/64.png",
        locale: "en",
      },
      {
        title: i18n.t("spanish"),
        src: "https://www.countryflags.io/es/flat/64.png",
        locale: "es",
      },
      {
        title: i18n.t("french"),
        src: "https://www.countryflags.io/fr/flat/64.png",
        locale: "fr",
      },
    ],
  }),
  metaInfo: {
    title: "Secret Santa",
    titleTemplate: "%s ",
    htmlAttrs: {
      lang: "en",
      amp: true,
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        name: "description",
        content: "Secret Santa game made with Vue.",
      },
      {
        property: "og:title",
        content: "Secret Santa",
      },
      { property: "og:site_name", content: "Secret Santa" },
      { property: "og:type", content: "website" },
      { name: "robots", content: "index,follow" },
    ],
  },
  methods: {
    changeLocale(locale) {
      i18n.locale = locale;
    },
    getBrowserLocales(options = {}) {
      const defaultOptions = {
        languageCodeOnly: true,
      };
      const opt = {
        ...defaultOptions,
        ...options,
      };
      const browserLocales =
        navigator.languages === undefined
          ? [navigator.language]
          : navigator.languages;
      if (!browserLocales) {
        return undefined;
      }
      return browserLocales.map((locale) => {
        const trimmedLocale = locale.trim();
        return opt.languageCodeOnly
          ? trimmedLocale.split(/-|_/)[0]
          : trimmedLocale;
      });
    },
  },
};
</script>

<style>
@import "./assets/animations.css";
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-leave-to {
  opacity: 0;
}
.fade-enter,
.fade-leave {
  opacity: 1;
}
.component-container {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-image: linear-gradient(
      to top,
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0.8)
    ),
    url("https://images.unsplash.com/photo-1512389142860-9c449e58a543?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80");
  top: 0;
  left: 0;
}
body {
  font-family: "Poppins";
}

.logo {
  width: 20vw;
  height: 20vh;
  transition: 725ms ease;
}
.logoContainer:hover .logo {
  transition: 725ms ease;
  transform: rotateY(180deg);
}
</style>