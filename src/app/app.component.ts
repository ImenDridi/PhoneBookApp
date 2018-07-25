import { Component } from '@angular/core';
import { PersonsService } from './services/persons.service';
import { Person } from './models/person';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  // this variable will hold the object of the edited person
  // if there is none that is being edited it'll have the value undefined
  // as you can see the undefined is the initial state too
  private editedPerson: Person = undefined;

  // the term that we search for in the persons data
  private searchTerm: string = '';
  // the name of the field, based on which the persons are ordered
  private orderBy: string = 'lastname';

  constructor(
    // in the following line we instruct the component to use the PersonsService
    // so this way a field is created that will keep the reference to the PersonsService
    private personsService: PersonsService
  ) { ; }

  // this return the list of the persons as we get it
  // from the pserson service.
  // Later in the example we will change this code to
  // implement the filtering and the sorting
  getPersons() {
    return this.personsService.getPersons()
      // at this point we filter the array, that is we keep only the elements
      // of the array that "we like", that pass a test. So the test is written
      // as a function (  it is an arrow function, we call it like that due to
      // the => symbol that looks like an arrow ). This function is called once
      // for every element of the array and each time, that element of the array,
      // is given as an argument (here we named it p). So ...
      .filter((p) => {
        // if the search term is found ...
        if (p.firstname.indexOf(this.searchTerm) > -1 ||  // ... in the first name OR (||)
          p.lastname.indexOf(this.searchTerm) > -1 ||
          p.middlename.indexOf(this.searchTerm) > -1) {  // ... in the last name
          return true;                                // In that case we return true
          // i.e. we "like" the element
          // and we keep it
        }

        // or if the birthdate as a string contains the search term
        // so : if the birthdate exists
        if (p.birthdate &&
          // and when converted to a date (it might be a string) and then as
          // an iso string
          new Date(p.birthdate).toISOString().
            // we keep the 10 first digits (so it is like 2018-01-01) if it
            // contains the search term
            substr(0, 10).indexOf(this.searchTerm) > -1) {

          return true;
        }

        // now let's keep the person phones
        let phones = p.getPhones();

        //////// this is equivalent with the for .. of .. below but is more verbose
        // for (let i = 0; i < phones.length; i++) {
        //   let phone = phones[i];

        // for each phone
        for (let phone of phones) {
          // if the phone contains the searchTerm
          if (phone.indexOf(this.searchTerm) > -1) {
            // then we keep the person
            return true;
          }

        }

        // otherwise return false
        return false;

      }).
      // to sort the resulting array, we use the sort method and we
      // only have to explain - via this arrow function - how do we
      // should compare two persons a & b. This arrow function should
      // return positive if a > b, negative if a < b and 0 if a == b.
      // This is required by the .sort function in order to achieve
      // the sorting.
      sort((a: Person, b: Person) => {
        // if we want to order by firstname...
        if (this.orderBy === 'firstname') {
          if (a.firstname > b.firstname) {
            return 1;
          } else if (a.firstname < b.firstname) {
            return -1;
          } else {
            return 0;
          }
        // if we want to order by lastname...
        } else if (this.orderBy === 'lastname') {
          if (a.lastname > b.lastname) {
            return 1;
          } else if (a.lastname < b.lastname) {
            return -1;
          } else {
            return 0;
          }
        // if we want to order by middlename...
        } else if (this.orderBy === 'middlename') {
          if (a.middlename > b.middlename) {
            return 1;
          } else if (a.middlename < b.middlename) {
            return -1;
          } else {
            return 0;
          }
        // if we want to order by birthdate...
        } else if (this.orderBy === 'birthdate') {
          // we put it here on birthdate but in fact it should exist
          // in all of the cases above.

          // if both a & b are undefined we consider them equal
          if (!a.birthdate && !b.birthdate) {
            return 0;
          }
          // if a (only) is undefined, then it's less than b
          if (!a.birthdate) {
            return -1;
          }
          // if b (only) is undefined, then it's less than a
          if (!b.birthdate) {
            return 1;
          }
          // so return the numeric difference of the dates.
          return (new Date(a.birthdate)).getTime() - (new Date(b.birthdate)).getTime();
        }
      });

      //////// To implement the REVERSE ordering feature you have two options:
      // A.
      // use .reverse() when you want to invert the direction of the sorted array
      // this is the simplest to implement since you just call the method (or not)
      // B.
      // modify the arrow function in the sort method so that it returned the negated result
      // this is more optimized since the elements are directly ordered in the reverse order

    //////// how to filter without the .filter command
    //////// This is an example regarding the filtering based on the firstname only
    //       It is easier to understand but has also some disadvantages
    // let filtered = [];
    // for (let index = 0; index < array.length; index++) {
    //   const element = array[index];
    //   if (element.firstname.indexOf(term) > -1) {
    //     filtered.push(element);
    //   }
    // }
  }

  editPerson(p: Person) {
    // this can be done here with the function, but now in the
    // template it is done directly in the (edit) event handler
    this.editedPerson = p.clone();
  }

  // this method exists so that when a person is stored, it handles
  // the (store) event of the person component.
  storePerson(p: Person) {
    // ask the service to store the person
    this.personsService.storePerson(p);
    // and set the edited person to undefined since we are done with editing
    this.editedPerson = undefined;
  }

  // this method is executed when the user presses the new person button
  createPerson() {
    // a new person is created and it is stored as the edited person
    // so this person is not known to the person service yet. It will be
    // known only when the person is stored.
    this.editedPerson = new Person();
  }
}
