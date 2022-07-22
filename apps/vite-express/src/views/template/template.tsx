import { defineComponent, PropType, SetupContext } from 'vue'
import { useTemplate } from './hooks/useTemplate'

export default defineComponent({
    name: 'views-component',
    components: {},
    props: {
        count: {
            type: Number as PropType<number>,
            default: 0,
        }
    },
    emits: ['update:count'],
    setup (props, context: SetupContext<Array<'update:count'>>) {
        const { execFunction } = useTemplate(props, context)
        return () => (
            <button style={{ border: '2px solid red', borderRadius: '4px' }} onClick={() => { execFunction() }}>click me</button>
        )
    }
})