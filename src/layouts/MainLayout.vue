<template>
  <q-layout>
    <q-header elevated class="text-center flex flex-center">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="drawerState = !drawerState"
        />

        <q-toolbar-title class="items-center ">
          Attendance Tracker 2020
        </q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawerState"
      show-if-above
      overlay
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :width="250"
      :breakpoint="400"
      bordered
      content-class="bg-grey-3"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item :active="isActive('')" clickable v-ripple to="/">
            <q-item-section avatar>
              <q-icon
                name="leaderboard"
                :color="isActive('') ? 'deep-orange-13' : 'primary'"
              />
            </q-item-section>

            <q-item-section class="non-selectable">
              Reports
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            ex
            :active="isActive('Manageemployees')"
            to="/Manageemployees"
          >
            <q-item-section avatar>
              <q-icon
                name="watch"
                :color="
                  isActive('Manageemployees') ? 'deep-orange-13' : 'primary'
                "
              />
            </q-item-section>

            <q-item-section class="non-selectable">
              Manage Employees
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            :active="isActive('terminal')"
            to="/terminal"
          >
            <q-item-section avatar>
              <q-icon
                name="fingerprint"
                :color="isActive('terminal') ? 'deep-orange-13' : 'primary'"
              />
            </q-item-section>

            <q-item-section class="non-selectable">
              Terminal
            </q-item-section>
          </q-item>

          <q-item
            :active="isActive('settings')"
            clickable
            v-ripple
            to="/settings"
          >
            <q-item-section avatar>
              <q-icon
                name="settings"
                :color="isActive('settings') ? 'deep-orange-13' : 'primary'"
              />
            </q-item-section>

            <q-item-section class="non-selectable">
              Settings
            </q-item-section>
          </q-item>

          <q-separator color="primary" />

          <q-item :active="isActive('about')" clickable v-ripple to="/about">
            <q-item-section avatar>
              <q-icon
                name="info"
                :color="isActive('about') ? 'deep-orange-13' : 'primary'"
              />
            </q-item-section>

            <q-item-section class="non-selectable">
              About
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container v-touch-swipe="state">
      <transition
        leave-active-class="animated fadeOut slower"
        enter-active-class="animated fadeIn slower"
      >
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  components: {},
  data() {
    return {
      drawerState: false,
      miniState: true
    };
  },
  methods: {
    isActive(route = "") {
      //console.log(this.$route.path);
      return this.$route.path === `/${route}`;
    },
    state(e) {
      // console.log(e);
      if (e.direction === "right") this.drawerState = true;
      else if (e.direction === "left") this.drawerState = false;
    }
  }
};
</script>
