import api from 'services'
import useSWR from 'swr/immutable'

const GetAllTodoList = (key?: string) => {
  const fetcher = () => api.getAll()
//   eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, error } = useSWR(key, fetcher)

  return {
    data: data?.data,
    error,
  }
}
export default GetAllTodoList