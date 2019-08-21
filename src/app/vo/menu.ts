export class Menu {
    id: number;
    name: string;
    path?:string;
    icon?:string;
    expend?: boolean;
    subMenus?: Menu[];
}