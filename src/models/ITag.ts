export interface ITag {
    id: number,
    name: string,
    positionInText: number,
    location: NameOrDescription
}

export enum NameOrDescription {
    Name = 'name',
    Description = 'description'
}