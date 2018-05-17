<template>
  <section class="container">
    <b-table :data="people"
             paginated
             :per-page="15"
             :loading="loading"
             default-sort-direction="asc"
             default-sort="name"
             detailed
             detail-key="name"
             :opened-detailed="defaultOpenedDetails"
             @details-open="(row) => defaultOpenedDetails = [row.name]">
      <template slot-scope="props">
        <b-table-column field="name"
                        label="Name"
                        sortable>
          <a href=""
             @click.prevent="defaultOpenedDetails = [props.row.name]"
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

      <template slot="detail"
                slot-scope="props">
        <div class="columns">
          <div class="column">
            <p>
              <b>Height:</b> {{ props.row.height }}
            </p>
            <p>
              <b>Mass:</b> {{ props.row.mass }}
            </p>
          </div>
          <div class="column">
            <p>
              <b>Hair color:</b> {{ props.row.hair_color }}
            </p>
            <p>
              <b>Skin color:</b> {{ props.row.skin_color }}
            </p>
          </div>
          <div class="column">
            <p>
              <b>Eye color:</b> {{ props.row.eye_color }}
            </p>
            <p>
              <b>Birth year:</b> {{ props.row.birth_year }}
            </p>
          </div>
        </div>
      </template>

      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon icon="ban"
                      size="is-large">
              </b-icon>
            </p>
            <p>Sin datos para mostrar.</p>
          </div>
        </section>
      </template>
    </b-table>
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
      defaultOpenedDetails: []
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
          return 'mars'

        case 'hermaphrodite':
          return 'venus-mars'

        case 'male':
          return 'venus'

        default:
          return 'question'
      }
    }
  }
}
</script>

