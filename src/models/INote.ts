export interface INote{
    id:string,
    name:string,
    description?:string,
    done:boolean,
    tagsID:string[]
}