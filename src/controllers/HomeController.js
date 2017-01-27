import {Controller}                 from 'arva-js/core/Controller.js';
import {HomeView}                   from '../views/HomeView.js';
import {Note, Notes}                from '../models/HomeModel.js'

export class HomeController extends Controller {
	// constructor() {
	// 	this.message = new Message('initial')
	// 	this.message.on('value', () => {
	// 		console.log( 'hello' )
	// 	})
	// }

	        // this.message.on('value', () => {
        //     console.log(`initial`);
        // });

	// constructor( options = {} ){
 //    	super( options )
 //    	console.log('hereee')
 //        this.note = new Note('Initial', 'Him');
 //    }
	// Trial(){
	// 	console.log('it workssss')
	// }

    Index(){

    	let notes = new Notes();
        if(!this.homeView) {
            this.homeView = new HomeView({
            	welcomeName: 'world',
            	Trial () {
            		console.log('it worksss')
            	}
            });
            // console.log(notes)
   //      	notes.on('child_added', (note) => {
   //  			console.log(note);
   //  			// console.log(typeof(notes));
			// })
			// notes.on('ready', () => {
			// 	for ( let note of notes ) {
			// 		console.log(note.text);	
			// 		console.log(note.id);
			// 	}
			// })


	     //    constructor( ){
		    // 	super( )
		    //     this.note = new Note('Initial message');
		    //     this.note.text = `let's try thisss`
		    // }
		}
        return this.homeView;
    }
}