import Vue from 'vue'
import VueSnip from 'vue-snip'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueHighlightJS from 'vue-highlightjs'
import VueRouter from 'vue-router';
import VueAxios from 'vue-axios';
import axios from 'axios';
import StartPage from './components/StartPage.vue';
import AskQuestionPage from './components/AskQuestionPage.vue';
import QuestionsList from './components/QuestionsList.vue';
import EditQuestionPage from './components/EditQuestionPage.vue';
import QuestionPage from './components/QuestionPage';
import StudentLogin from './components/StudentLogin';
import TeacherLogin from './components/TeacherLogin';
import hljs from 'highlight.js'

Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(VueSnip);
Vue.use(VueHighlightJS);

Vue.config.productionTip = false;

Vue.directive('highlightjs', {
  deep: true,
  bind: function (el, binding) {
    let targets = el.querySelectorAll('code')
    targets.forEach((target) => {
      if (binding.value) {
        target.innerHTML = binding.value
      }
      hljs.highlightBlock(target)
    })
  },
  componentUpdated: function (el, binding) {
    let targets = el.querySelectorAll('code')
    targets.forEach((target) => {
      if (binding.value) {
        target.innerHTML = binding.value
        hljs.highlightBlock(target)
      }
    })
  }
})

const routes = [
  {
    name: 'startpage',
    path: '/',
    component: StartPage,
  },
  {
    name: 'studentLogin',
    path: '/studentLogin',
    component: StudentLogin,
    meta: {
      requiresAuth: false
    }

  },
  {
    name: 'teacherLogin',
    path: '/teacherLogin',
    component: TeacherLogin,
    meta: {
      requiresAuth: false
    }
  },
  {
    name: 'askquestion',
    path: '/askquestion',
    component: AskQuestionPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'questionslist',
    path: '/questionslist',
    component: QuestionsList,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'edit',
    path: '/edit/:id',
    component: EditQuestionPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'question',
    path: '/question/:id',
    component: QuestionPage,
    meta: {
      requiresAuth: true
    }
  },

];

const router = new VueRouter({ mode: 'history', routes: routes });

// Meta Handling
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('user') == null) {
      next({
        name: 'startpage',
        params: { nextUrl: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

new Vue(Vue.util.extend({ router }, App)).$mount('#app');
