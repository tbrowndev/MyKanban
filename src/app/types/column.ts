import { Color } from "./color";
import { Status } from "./status";
import { ToDo } from "./todo";

/**
 * interface of column todo items are in 
 */
export interface Column {
    status: Status,
    color: Color,
    items: ToDo[],
}