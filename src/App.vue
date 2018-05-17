<template>
  <div id="app">
    <b-notification v-if="errors.length"
                    type="is-danger"
                    has-icon>
      <p v-for="(error, indexE) in errors"
         :key="indexE"
         v-text="error" />
    </b-notification>

    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Tiny SWAPI client
          </h1>
          <h2 class="subtitle">
            SWAPI people
          </h2>
        </div>
      </div>
    </section>

    <HelloWorld/>

    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <p>
            <strong>Tiny SWAPI client</strong> by
            <a href="https://www.linkedin.com/in/emiliogrv/">Emilio Romero</a>.
            <a href="https://github.com/emiliogrv/tiny-swapi-client">Repo</a>.
          </p>
          <p>
            The source code is licensed
            <a href="http://opensource.org/licenses/mit-license.php"
               target="_blank">MIT</a>. Powered with
            <a href="https://vuejs.org"
               target="_blank">Vue.js</a>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import HelloWorld from './components/HelloWorld'

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  computed: mapState(['errors'])
}
</script>

