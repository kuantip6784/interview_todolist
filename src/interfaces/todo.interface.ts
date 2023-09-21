
export interface ITodolist {
    _id: string;
    title: string;
    description: string
    updatedAt: string
    createdAt: string
}
export type ITodolistType = ITodolist[];

export interface IPropsModal{
    item?: any;
    onNewLoading: () => void;
}