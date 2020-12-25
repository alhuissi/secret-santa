import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: colors.red.accent4,
            secondary: colors.red.lighten1,
            tertiary: colors.red,
            background: colors.green.lighten5,
            accent: colors.indigo.base,
          },
        },
      },
});
