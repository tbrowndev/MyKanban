import { Color } from "./color";
import { Status } from "./status";

/**
 * interface of ToDo item 
 */
export interface ToDo {
    id: string
    name: string,
    status: Status,
    onHoldReason: string,
    color: Color,
}