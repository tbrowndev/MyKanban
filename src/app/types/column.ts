import { Color } from "./color";
import { Status } from "./status";
import { ToDo } from "./todo";

export interface Column {
    status: Status,
    color: Color,
    items: ToDo[],
}