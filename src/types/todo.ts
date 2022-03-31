interface ITodo {
  id: string
  name: string
  description: string
  status: boolean
  createdAt?: string
  updatedAt?: string
}

type TodoResponse = {
  todos: Array<ITodo>
}

export type { ITodo, TodoResponse }
