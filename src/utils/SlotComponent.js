import { isVueComponent } from './helpers'
import {h} from "vue";

export default {
    name: 'BSlotComponent',
    props: {
        component: {
            type: Object,
            required: true
        },
        name: {
            type: String,
            default: 'default'
        },
        props: {
            type: Object
        },
        tag: {
            type: String,
            default: 'div'
        },
    },
    methods: {
        refresh() {
            this.$forceUpdate()
        }
    },
    created() {
        if (isVueComponent(this.component)) {
            this.component.$on(this.event, this.refresh)
        }
    },
    beforeDestroy() {
        if (isVueComponent(this.component)) {
            this.component.$off(this.event, this.refresh)
        }
    },
    render() {
        const slot = (this.component).$slots[this.name](this.props)
        return h(this.tag, {}, slot)
    }
}
