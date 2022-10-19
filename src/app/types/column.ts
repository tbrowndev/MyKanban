import { Color } from "./color";
import { ToDo } from "./todo";

export interface Column {
    color: Color,
    items: ToDo[],
}