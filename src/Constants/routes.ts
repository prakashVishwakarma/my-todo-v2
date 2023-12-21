export const routes = { 
    home: '/',
    login: '/login',
    signup: '/signup',
    create: '/google-keep-todo/create',
    update: (id: string | number) => `/google-keep-todo/update/${id}`,
    richTextEditor: {
        home: '/rich-text-editor-todo',
        create: '/rich-text-editor-todo/create',
        read: (id: string | number) => `/rich-text-editor-todo/read/${id}`,
        update: (id: string | number) => `/rich-text-editor-todo/${id}`,
    },
    googleKeepTodo: {
        home: '/google-keep-todo',
        create: '/google-keep-todo/create',
        update: (id: string | number) => `/google-keep-todo/update/${id}`,
        // read: (id: string | number) => `/google-keep-todo/read/${id}`,
    }
}