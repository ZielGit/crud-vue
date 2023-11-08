import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        accessToken: null, // Inicialmente, el accessToken está vacío
        user: null, // Información del usuario
        roles: [], // Roles del usuario
        permissions: [], // Permisos del usuario
    }),
    actions: {
        setAccessToken(token) {
            this.accessToken = token;
        },
        setUser(user) {
            this.user = user;
        },
            setRoles(roles) {
            this.roles = roles;
        },
        setPermissions(permissions) {
            this.permissions = permissions;
        },
        clearAccessToken() {
            this.accessToken = null;
            this.user = null;
            this.roles = [];
            this.permissions = [];
        },
    },
});