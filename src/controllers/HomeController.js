import {Controller}                 from 'arva-js/core/Controller.js';
import {HomeView}                   from '../views/HomeView.js';
import {Note, Notes}                from '../models/HomeModel.js'
import LinkedListViewSequence       from 'famous-flex/LinkedListViewSequence';


var viewSequence = new LinkedListViewSequence();

export class HomeController extends Controller {

    Index(){

    	var afterInitialRefreshTimerId;
    	// grab messages from Firebase
    	let notes = new Notes();
    	
        this.homeView = new HomeView({
        	welcomeName: 'world'
        });
        
   //      notes.on('value', function(notesSnapshot) {
   //  		notesSnapshot.forEach(function(noteSnapshot) {
			//         console.log(noteSnapshot.text);
			//         // console.log(noteSnapshot.getText);
			//     });
			// });

        this.homeView.input.on( 'keypress', ( event ) => {
        	if (event.keyCode === 13) {
				// once enter is pressed, send message
				event.preventDefault()
				notes.add( {text: this.homeView.input.getValue(), author: this.homeView.inputName.getValue() })
				this.homeView.input.setValue( '' )
			}
        })

        console.log (this.homeView.scrollView.getOffset());
	

        return this.homeView;
    }
}