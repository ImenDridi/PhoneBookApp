// This interface describes how the data on the server are stored
// In our case it has the same fields as the Person class
export interface iPerson {
    firstname: string,
    lastname: string,
    middlename: string,
    birthdate: Date,
    id: number,
    phones: string[]
}