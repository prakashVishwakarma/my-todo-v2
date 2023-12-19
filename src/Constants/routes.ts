export const routes = {
    home: '/',
    login: '/login',
    signup: '/signup',
    create: '/create',
    update: (id: string | number) => `/update/${id}`,
}