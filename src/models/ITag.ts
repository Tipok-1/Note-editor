export interface ITag {
    id: string,
    name: string,
    positionInText: number,
    location: NameOrDescription
}

export enum NameOrDescription {
    NAME = 'name',
    DESCRIPTION = 'description'
}