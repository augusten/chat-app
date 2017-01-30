import { Model }              from 'arva-js/core/Model.js'
import { PrioritisedArray }   from 'arva-js/data/PrioritisedArray.js';

// creating the data model for the chat app

export class Note extends Model {
	get text() {}
	get author() {}
}

export class Notes extends PrioritisedArray {
    constructor() {
        super( Note );
    }
}