import { createStore } from "vuex";
import axiosClient from "../axios";

const tmpSurvey = [
  {
    id: 100,
    title: "Hello from the other side",
    slug: "hello-from-the-other-side",
    status: "draft",
    image:
      "https://thumbs.dreamstime.com/b/two-cute-golden-retriever-puppies-playing-photo-45116795.jpg",
    description: "My name is An Nguyen and im doing something wasting time",
    create_at: "2023-04-03 18:00:00",
    updated_at: "2023-04-03 18:00:00",
    expire_at: "2023-04-10 18:00:00",
    questions: [
      {
        id: 1,
        type: "select",
        question: "What do u think of te happiness definition?",
        description: null,
        required: true,
        data: {
          options: [
            { uuid: "adadadadadadaddad", text: "Shit" },
            { uuid: "sgsgsgsgsgsg", text: "Aint shit" },
            { uuid: "affqfegfbxxvbsg", text: "Everything" },
            { uuid: "afaefaefafe", text: "Nothing" },
          ],
        },
      },
      {
        id: 2,
        type: "checkbox",
        question: "Select those you want to become:",
        description: "Talking about yourself",
        required: true,
        data: {
          options: [
            { uuid: "rfqrqr", text: "A nerd without pratices" },
            {
              uuid: "qqardqaf",
              text: "A lonely person without someone standby",
            },
            {
              uuid: "fxzcx",
              text: "A person who aint got a decision whenever choosing for dinner",
            },
            { uuid: "fjrjrjr", text: "A leopard 🐆" },
          ],
        },
      },
      {
        id: 3,
        type: "checkbox",
        question:
          "Which of the following criterias are true when telling about you?",
        required: true,
        description: null,
        data: {
          options: [
            { uuid: "agregwsg", text: "Stupid as fuck" },
            { uuid: "Hwsrhwsrh", text: "Stubborn as shit" },
            { uuid: "hwsrhhhbndg", text: "Ugly as hell" },
            { uuid: "qawqsdq", text: "Shy as baby in front of teachers" },
          ],
        },
      },
      {
        id: 4,
        type: "radio",
        question: "The most important thing in your life",
        required: false,
        description: "Your most valuable things in your mind",
        data: {
          options: [
            { uuid: "safafqawoyjk", text: "Money" },
            { uuid: "yiuohifjyg", text: "Food" },
            { uuid: "jkkgukgnm", text: "Your self-esteem" },
            { uuid: "dfbxdbsg", text: "Yourself" },
          ],
        },
      },
      {
        id: 5,
        type: "radio",
        required: false,
        question: "Choose the best 'food' you want to eat right away",
        description: "Decide your dinner",
        data: {
          options: [
            { uuid: "gseftgwef", text: "Eat your past" },
            { uuid: "afafq", text: "Eat your stupid stuffs out" },
            { uuid: "rfweefsaf", text: "Eat your sorry(ies)" },
            {
              uuid: "qawqsdqerfqerfq",
              text: "Eat your time when you use smart phone",
            },
          ],
        },
      },
      {
        id: 6,
        type: "text",
        required: true,
        question: "How is your day in 1 word?",
        description: "How is it going on?",
        data: {},
      },
      {
        id: 7,
        required: false,
        type: "textarea",
        question: "Tell me your melancholy",
        description: "Confession time",
        data: {},
      },
    ],
  },
  {
    id: 200,
    title: "VueJS - The framework that I really like",
    slug: "vuejs-the-framework-that-i-really-like",
    status: "active",
    image:
      "https://thumbs.dreamstime.com/b/two-cute-golden-retriever-puppies-playing-photo-45116795.jpg",
    description: "My name is An Nguyen and im doing something wasting time",
    create_at: "2023-04-03 18:00:00",
    updated_at: "2023-04-03 18:00:00",
    expire_at: "2023-04-10 18:00:00",
    questions: [],
  },
  {
    id: 300,
    title: "True friendship - Does it really exist?",
    slug: "true-friendship-does-it-really-exist",
    status: "active",
    image:
      "https://thumbs.dreamstime.com/b/two-cute-golden-retriever-puppies-playing-photo-45116795.jpg",
    description: "My name is An Nguyen and im doing something wasting time",
    create_at: "2023-04-03 18:00:00",
    updated_at: "2023-04-03 18:00:00",
    expire_at: "2023-04-10 18:00:00",
    questions: [],
  },
  {
    id: 400,
    title: "I messed up myself",
    slug: "i-messed-up-myself",
    status: "active",
    image:
      "https://thumbs.dreamstime.com/b/two-cute-golden-retriever-puppies-playing-photo-45116795.jpg",
    description: "My name is An Nguyen and im doing something wasting time",
    create_at: "2023-04-03 18:00:00",
    updated_at: "2023-04-03 18:00:00",
    expire_at: "2023-04-10 18:00:00",
    questions: [],
  },
];

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN"),
    },
    surveys: [...tmpSurvey],
    questionTypes: ["text", "select", "radio", "checkbox", "textarea"],
  },
  getters: {},
  actions: {
    async register({ commit }, user) {
      const { data } = await axiosClient.post("/register", user);
      commit("setUser", data);
      return data;
    },

    async login({ commit }, user) {
      const { data } = await axiosClient.post("/login", user);
      commit("setUser", data);
      return data;
    },

    async logOut({ commit }) {
      const response = await axiosClient.post("/logout");
      commit("logOut");
      return response;
    },

    async saveSurvey({ commit }, survey) {
      delete survey.image_url;
      let response;
      if (survey.id) {
        response = await axiosClient.put(`/survey/${survey.id}`, survey);
        commit("updateSurvey", response.data);
        return response;
      } else {
        response = await axiosClient.post("/survey", survey);
        commit("saveSurvey", response.data);
        return response;
      }
      return response;
    },
  },
  mutations: {
    logOut: (state) => {
      state.user.data = {};
      state.user.token = null;
      sessionStorage.removeItem("TOKEN");
    },
    setUser: (state, userData) => {
      state.user.token = userData.token;
      state.user.data = userData.user;
      sessionStorage.setItem("TOKEN", userData.token);
    },
    saveSurvey: (state, survey) => {
      state.surveys = [...state.surveys, survey.data];
    },
    updateSurvey: (state, survey) => {
      state.surveys = state.surveys.map((s) => {
        if (s.id === survey.id) {
          return survey.data;
        }
        return s;
      });
    },
  },
  modules: {},
});

export default store;
