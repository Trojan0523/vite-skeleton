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
    const { execFunction, changeCount } = useTemplate(props, context)
    return () => (
      <button style={{ border: '2px solid green', borderRadius: '4px' }} onClick={() => { execFunction(); changeCount() }}>click me</button>
    )
  }
})
