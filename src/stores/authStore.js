import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        accessToken: null, // Inicialmente, el accessToken está vacío
    }),
    actions: {
        setAccessToken(token) {
            this.accessToken = token;
        },
        clearAccessToken() {
            this.accessToken = null;
        },
    },
});