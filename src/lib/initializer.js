const options = {
    moduleCache: {
        vue: Vue,
        vueRouter: VueRouter,
        pug: require('pug'),
        stylus: source => Object.assign(stylus(source), {deps: () => []}),
    },
    async getFile(url) {
        const res = await fetch(url);
        if (!res.ok) throw Object.assign(new Error(url + " " + res.statusText), {res});
        return await res.text();
    },
    addStyle(styleStr) {
        const style = document.createElement('style');
        style.textContent = styleStr;
        const ref = document.head.getElementsByTagName('style')[0] || null;
        document.head.insertBefore(style, ref);
    },
    log(type, ...args) {
        console[type](...args);
    },
    compiledCache: {
        set(key, str) {
            for (; ;) {
                try {
                    window.localStorage.setItem(key, str);
                    break;
                } catch (ex) {
                    window.localStorage.removeItem(window.localStorage.key(0));
                }
            }
        },
        get(key) {
            return window.localStorage.getItem(key);
        },
    },
    additionalModuleHandlers: {
        '.json': (source, path, options) => JSON.parse(source),
    }
};
const {loadModule} = window["vue3-sfc-loader"];
window.asyncVue = sfc => Vue.defineAsyncComponent(() => loadModule(sfc + '.vue', options))
window.dynamicVue = com => ({
    name: 'DynamicWrapper',
    template: `<component :is="comp"></component>`,
    computed: {
        comp() {
            const com = this.com;
            return asyncVue(com);
        }
    },
    data() {
        return {com}
    }
})

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        {
            path: '/', component: dynamicVue('app'),
            children: [
                {path: '/', component: dynamicVue('main')},
                {path: '/:page', component: dynamicVue('page')},
            ]
        },

    ],
})
const store = {
    _common: Vue.reactive({title: 'application'}),
    _user: Vue.reactive({name: 'some user', token: ''}),
    common() {
        return Vue.readonly(this._common)
    },
    user() {
        return Vue.readonly(this._user)
    },
    isLogin() {
        return (true && this._user.token) && (this._user.token.length > 0)
    },
    setUserName(u) {
        this._user.name = u
    }
}
window.app = Vue.createApp({});
app.use(router);
app.use(Quasar, {
    config: {
        brand: {
            primary: '#00a300',
        },
    }
})
Quasar.lang.set(Quasar.lang.zhCN)
Quasar.iconSet.set(Quasar.iconSet.svgMdiV5)
app.mount("#app");