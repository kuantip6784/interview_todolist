export interface IAuth {
    username: string
    password: string
}

export interface ITodolist {
    _id: string;
    title: string;
    description: string
}
export type ITodolistType = ITodolist[];