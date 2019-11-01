import Vue from 'vue'

export default {
    $dialog(title = null, text = null, buttons = null) {
        let params = {};

        if (typeof title === "object") {
            params = title;
        }

        return new Promise((resolve, reject) => {
            const self = this;

            let dialogButtons = buttons || [
                {
                    title: self.$t('action.cancel'),
                    resolve: false
                },
                {
                    title: self.$t('action.yes'),
                    default: true,
                    resolve: true
                }
            ];

            // Add handler based on "resolve" property in each button
            dialogButtons = dialogButtons.map(b => {
                b.handler = () => {
                    self.$modal.hide('dialog')
                    resolve(b.resolve || false)
                }

                return b
            })

            // Show the dialog
            this.$modal.show('dialog', {
                title: title || self.$t('common.confirm_text'),
                text: text,
                buttons: dialogButtons,
                ...params
            });
        });
    },

    $hasRole(role) {
        return role === this.$store.state.user.role.id;
    },

    $isSuperAdmin() {
        return this.$store.state.auth.currentUser.super_admin;
    },

    $isDefaultLocale() {
        return this.$store.state.auth.currentLocale === null ||
            this.$store.state.auth.currentLocale ===
            this.$store.getters["sites/currentSite"].default_locale_id;
    },

    $getDefaultLocale() {
        return this.$store.getters["sites/currentSite"].default_locale_id;
    },

    $currentLocale() {
        return this.$store.state.auth.currentLocale ||
            this.$store.getters["sites/currentSite"].default_locale_id;
    },

    $hasTranslation(model) {
        return model.locale === this.$currentLocale();
    },

    $isMobile() {
        return window.innerWidth < 768;
    },

    $isDesktop() {
        return window.innerWidth >= 768;
    },

    $generateUUID() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c /
                4).toString(16)
        );
    }
};

export function getValueByPath(obj, path) {
    return path.split(".").reduce((o, i) => o[i], obj);
}
