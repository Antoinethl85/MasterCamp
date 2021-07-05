const Home = window.httpVueLoader('./components/Home.vue')
const Voter = window.httpVueLoader('./components/Voter.vue')
const Creer = window.httpVueLoader('./components/Creer.vue')
const Presentiel = window.httpVueLoader('./components/Presentiel.vue')
const Register = window.httpVueLoader('./components/Register.vue')
const Candidat = window.httpVueLoader('./components/Candidat.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/register', component: Register},
  { path: '/voter', component: Voter},
  { path: '/creer', component: Creer},
  { path: '/presentiel', component: Presentiel},
  { path: '/candidat', component: Candidat}
]

const router = new VueRouter({
  routes
})

var app = new Vue({
  router,
  el: '#app',
  data: {
  },
  async mounted () {
    await axios.get('/api/me')
  },
  methods: {
    async register (newUser) {
      try{
        const res = await axios.post('/api/register', newUser)
        alert(res.data.message)
        if (res.data.register) {
          router.push('/')
        }
        else {
          router.push('/register')
        }
      }
      catch(err) {
        alert(erre.reponse.data.message)
      }
    },
    async presentiel(vote) {
      await axios.post('/api/presentiel', vote)
    },
    async candidat(newCandidat) {
      await axios.post('/api/candidat', newCandidat)
    },
    async creer(newVote) {
      await axios.post('/api/creer', newVote)
    },
  }
})
