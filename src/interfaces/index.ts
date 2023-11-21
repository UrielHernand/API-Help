
enum genderType {
    masculino = 'masculino',
    femenino = 'femenino',
    otro = 'no especificado'
}

 type newUserFields  = {
    names : string,
    lastNames : string,
    age : number,
    gender : genderType.femenino | genderType.masculino | genderType.otro,
    email : string,
    password : string,
    phone? : {
        countryCode : number,
        number : number
        iso : string
    } | null,
}

export type {newUserFields, genderType}


