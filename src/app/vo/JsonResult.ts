export class JsonResult<T> {
    data?: T;
    success: boolean;
    info?: string;
    total?: number;
    result?: string;
}