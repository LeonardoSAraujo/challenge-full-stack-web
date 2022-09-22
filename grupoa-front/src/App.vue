<template>
  <v-app>
    <v-app-bar
      app
      color="white"
      flat
      clipped-left
    >
      <div class="d-flex align-center">
        <v-img
          alt="GrupoA logo"
          class="shrink mr-2"
          contain
          src="./assets/logo.png"
          transition="scale-transition"
          width="120"
        />
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>
    <v-navigation-drawer
     app
     permanent
     clipped
     >
      <v-list-item class="grey">
        <v-list-item-content >
          <v-list-item-title class="text-h6 white--text">
            Módulos Acadêmicos
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list
            dense
            nav
          >
            <v-list-item
              v-for="item in items"
              :key="item.title"
            >
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
    </v-navigation-drawer>
    <v-main>
      <StudentsList/>
    </v-main>
  </v-app>
</template>

<script>
import StudentsList from './components/StudentsList';

export default {
  name: 'App',

  components: {
    StudentsList,
  },

  data: () => ({
    items: [
      {title: "Alunos"}
    ]
  }),
};
</script>
