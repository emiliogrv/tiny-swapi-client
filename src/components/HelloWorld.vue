<template>
  <section class="container">
    <b-table v-show="!detail"
             :data="people"
             paginated
             :per-page="15"
             :loading="loading"
             default-sort-direction="asc"
             default-sort="name">
      <template slot-scope="props">
        <b-table-column field="name"
                        label="Name"
                        sortable>
          <a href=""
             @click.prevent="detail = props.row"
             v-text="props.row.name" />
        </b-table-column>

        <b-table-column field="species"
                        label="Species"
                        sortable>
          {{ props.row.species }}
        </b-table-column>

        <b-table-column label="Gender">
          <b-tooltip :label="props.row.gender">
            <b-icon :icon="iconGender(props.row.gender)" />
          </b-tooltip>
        </b-table-column>
      </template>

      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon icon="ban"
                      size="is-large">
              </b-icon>
            </p>
            <p>Nothing here.</p>
          </div>
        </section>
      </template>
    </b-table>

    <div v-if="detail"
         key="detail">
      <button class="button"
              @click.prevent="detail = null">Back</button>

      <br>

      <div class="columns">
        <div class="column">
          <p>
            <b>Name:</b> {{ detail.name }}
          </p>
          <p>
            <b>Species:</b> {{ detail.species }}
          </p>
          <p>
            <b>Gender:</b>
            <b-tooltip :label="detail.gender">
              <b-icon :icon="iconGender(detail.gender)" />
            </b-tooltip>
          </p>
          <p>
            <b>Height:</b> {{ detail.height }}
          </p>
          <p>
            <b>Mass:</b> {{ detail.mass }}
          </p>
          <p>
            <b>Hair color:</b> {{ detail.hair_color }}
          </p>
          <p>
            <b>Skin color:</b> {{ detail.skin_color }}
          </p>
          <p>
            <b>Eye color:</b> {{ detail.eye_color }}
          </p>
          <p>
            <b>Birth year:</b> {{ detail.birth_year }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import _ from 'lodash'
import { mapActions } from 'vuex'

export default {
  name: 'HelloWorld',
  data() {
    return {
      loading: false,
      people: [],
      species: [],
      detail: null
    }
  },
  created() {
    this.fetchSpecies()
  },
  methods: {
    ...mapActions('people', {
      indexPeople: 'index'
    }),
    ...mapActions('species', {
      indexSpecies: 'index'
    }),
    fetchPeople() {
      this.indexPeople()
        .then(data => {
          this.loading = false
          _.each(data, item => {
            item.species = (
              _.find(this.species, { url: item.species.pop() }) || { name: 'N/A' }
            ).name
          })

          this.people = data
        })
        .catch(() => (this.loading = false))
    },
    fetchSpecies() {
      this.loading = true

      this.indexSpecies()
        .then(data => {
          this.species = data

          this.fetchPeople()
        })
        .catch(() => (this.loading = false))
    },
    iconGender(gender = 'n/a') {
      switch (gender.toLowerCase()) {
        case 'female':
          return 'venus'

        case 'hermaphrodite':
          return 'venus-mars'

        case 'male':
          return 'mars'

        default:
          return 'question'
      }
    }
  }
}
</script>

<style scoped>
.container {
  min-height: 757px;
}
</style>

