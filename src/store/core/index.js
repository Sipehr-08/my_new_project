import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

export const state = {
  app: null,
};

const namespaced = true;

export const core = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
