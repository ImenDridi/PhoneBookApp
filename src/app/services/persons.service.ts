import { Injectable } from '@angular/core';
import { Person } from '../models/person';
import { HttpClient } from '@angular/common/http';
import { iPerson } from '../models/iPerson';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  // this is the list of the persons that are known to the service.
  // we do not need the data here, we'll get them from the server
  private persons: Person[] = [ ];

  constructor(
    // we need to "inject" the HttpClient so that we can communicate with the server.
    // This is done in exactly the same way the service is injected into a component
    // IMPORTANT! In order to use this client here you should import it from '@angular/common/http'
    // but you should also go to the app.module.ts and import the HttpClientModule
    private http: HttpClient
  ) {

    // since in our scenario we jsut need to get the list from the server
    // we can just get the data in the constructor...
    // So we have been told that: "The data live at URL: assets/persons.json
    // and that you need to use action GET to get them. The format there is
    // an array of iPerson objects"
    // GET method   Format     URL
    //         v      v         v
    this.http.get<iPerson[]>('assets/persons.json').
    // the subscribe performs the request and takes as an argument an arrow function
    // that will be executed when the data arrive from the server
    subscribe(
      // the arrow function takes as an argument a variable that has the format of the server data
      // here it is declared, but it does not have to be since the format is given above.
      (ps: iPerson[]) => {
        // let's empty the persons array
        this.persons = [];
        
        // for each object (iPerson) that has come in the array of iPersons
        for(let p of ps) {
          // let's create a new Person object
          let Pobj = new Person(
            p.firstname,
            p.lastname,
            p.middlename,
            p.birthdate,
            p.id
          );
          // and add to the Person object, all it's phones
          for (let t of p.phones) {
            Pobj.addPhone(t);
          }
          // then push the Person object to the persons array
          this.persons.push(Pobj);
        }
      }
    );

  }

  // since the service is returning the persons list, for many applications/components, we are not
  // giving/returning just a reference to the list, but rather a copy of it. This is exactly what
  // the only line of the method does.
  //
  // please note that the list (array) is protected and none can change it, but the Person objects/
  // /instances that are contained in the array are not protected!
  public getPersons(): Person[] {
    // copy the persons array and give the copy to anyone that called/invoked this method
    return Object.assign([], this.persons);
  }

  // this method adds/stores a person to the persons list
  public storePerson(p: Person) {
    // at first we get the persons one by one
    for (let i = 0; i < this.persons.length; i++) {
      // and for each we check if the id of this person is equal to the id of the given person p
      if ( this.persons[i].id === p.id ) {
        // if the id is the same we must store the new person data in the place of the one we found
        this.persons[i] = p;
        // and we are done!
        return;
      }
    }

    // if it is not found, we just append it to the persons array
    this.persons.push( p );
  }
}
