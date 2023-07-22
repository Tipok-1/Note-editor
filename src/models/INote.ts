export interface INote{
    id:number,
    name:string,
    description?:string,
    done:boolean,
    tagsID:number[]
}