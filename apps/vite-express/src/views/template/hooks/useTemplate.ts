import { SetupContext, toRefs } from 'vue'

export function useTemplate (props: Record<string, any>, { emit }: SetupContext<Array<'update:count'>>) {
  const { count } = toRefs(props)
  const execFunction = () => {
    console.log('click me!')
  }
  const changeCount = () => {
    emit('update:count', count.value++)
  }
  return {
    execFunction,
    changeCount,
    count,
  }
}
