import { getApp } from '@/services/app.api';

export const actions = {
  getApp: ({ commit }) => {
    return new Promise((resolve, reject) => {
      getApp()
        .then(res => {
          commit('setApp', res.data);
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
};
