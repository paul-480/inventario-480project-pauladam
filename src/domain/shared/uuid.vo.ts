import {  v7 as uuidv7, validate } from 'uuid';
import { InvalidUUIDerror } from './errors/invalid-uuid.error';

export class Uuid{
    readonly value: string;

    constructor(uuid: string) {
    this.value = uuid;
  }

  public static isValid(uuid:string):boolean{
    return validate(uuid)
  }
  public static ensureIsValidUUID(uuid:string){
    if(!this.isValid(uuid)){
        throw new InvalidUUIDerror
    }
  }
  public static generateUUID(){
    return new Uuid(uuidv7())
  }
}

