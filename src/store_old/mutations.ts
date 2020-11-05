import { MutationTree } from 'vuex';
import {MutationTypes} from './mutation_types';
import {State} from './state';

export type Mutations<S = State> = {
    [MutationTypes.SET_COUNTER](state: S, payload: number) : void
}

export const mutations: MutationTree<State> & Mutations = {
    [MutationTypes.SET_COUNTER](state: State, payload: number){
        state.counter = payload;
    }
}