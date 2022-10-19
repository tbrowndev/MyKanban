import { Color } from "./color";
import { Status } from "./status";

export interface ToDo {
    name: string,
    status: Status,
    onHoldReason: string,
    color: Color,
}