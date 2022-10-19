import { Color } from "./color";
import { Status } from "./status";

/**
 * interface of ToDo item 
 */
export interface ToDo {
    name: string,
    status: Status,
    onHoldReason: string,
    color: Color,
    /*TODO: Need to add unique identifier*/
}