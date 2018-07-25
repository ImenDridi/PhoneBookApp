/**
 * Every instance of this class represents a different (in general) person
 */
export class Person {
    private static IDcounter = 0;

    // this is an array of the phones of a person
    private phones: string[] = [];

    // the first, last & middle names are strings by default empty
    // the birthdate is an undefined Date by default
    // the id is a number undefined by default
    // since all persons need an ID so we can compare them, we are
    // going to create an automatic numbering if the id is undefined
    // by using a private static variable
    constructor(
        public firstname: string = '',
        public lastname: string = '',
        public middlename: string = '',
        public birthdate: Date = undefined,
        public id: number = undefined
    ) {
        Person.IDcounter++;
        if (typeof id === 'undefined') {
            this.id = Person.IDcounter;
        }
    }

    // since the phones array is private we can give access to it by this getter method
    public getPhones() { return this.phones; }

    // this method adds a phone in the phones array
    public addPhone(phone: string): boolean {
        // if the phone is not valid do nothing
        if (this.validatePhone(phone) === false) {
            // we are done
            return false;
        }

        // if the phone is already in the list then do nothing
        if ( this.phones.indexOf(phone) > -1 ) {
            // we are done
            return false;
        }

        // just add it to the array
        this.phones.push( phone );

        return true;
    }

    // this method removes a phone t from the phones list
    removePhone(t: string) {
        // where is this phone in the phones array?
        let pos = this.phones.indexOf(t);
        // if it is nowhere
        if (pos === -1) {
            // we dont have to do anything, we are done
            return;
        }
        // now that we know where it is we can splice one element from the array at that position
        this.phones.splice(pos, 1);
    }

    /**
     * this method creates another Person object that has the exact same info as the original one
     * in this case we use it in order to create copies of persons before we edit them
     */
    public clone(): Person {
        // create a new Person with the same first, last middle, birthday and id
        let newPerson = new Person(
            this.firstname,
            this.lastname,
            this.middlename,
            this.birthdate,
            this.id
            // at this point it would be nice as an assignment to add via the ... operator
            // get the rest of the args and assume that they are phones.
        );

        // then the phones are added one by one
        // please note that this way of writting the for-loop (this syntax) is a lot
        // simpler than the typical one which for the same case would be
        //   for(let i=0; i<this.getPhones().length; i++) {
        //     const phone = this.getPhones()[i];
        //     newPerson.addPhone(phone);
        //   }
        // see also: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
        //      and: https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html
        //
        // NOTE! this syntax is exactly the one used in *ngFor
        for(let phone of this.getPhones()) {
        newPerson.addPhone(phone);
        }
        return newPerson;
    }

    /**
     * this method validates a phone number, i.e. it checks if it is acceptable
     */
    public validatePhone(p: string): boolean {
        // if it is not a string then it is not acceptable
        if(typeof p !== 'string') {
            return false;
        }
        // if it is not 10 digits long then it is not acceptable
        if(p.length !== 10) {
            return false;
        }
        // if it does not begin with 2 or 6 (Greek format) then it is not acceptable
        if (p.charAt(0) !== '2' && p.charAt(0) !== '6') {
            return false;
        }
        // otherwise it is acceptable
        return true;
    }
}
