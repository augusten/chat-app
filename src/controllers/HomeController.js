import { Controller }               from 'arva-js/core/Controller.js';
import { DataBoundScrollView }      from 'arva-js/components/DataBoundScrollView.js';
import { HomeView }                 from '../views/HomeView.js';
import { Note, Notes }              from '../models/HomeModel.js';

import LinkedListViewSequence       from 'famous-flex/LinkedListViewSequence';
import ListLayout                   from 'famous-flex/layouts/ListLayout.js';
import Surface                      from 'famous/core/Surface.js';
import Engine                       from 'famous/core/Engine.js';
import FlexibleLayout               from 'famous/views/FlexibleLayout.js';



export class HomeController extends Controller {

    Index( ) {

    	// grab messages from Firebase
    	var notes = new Notes();

    	if( !this.homeView ) {

	        this.homeView = new HomeView( {
	        	welcomeName: 'world'
	        } );

			// create a flexible layout
    		var mainContext = Engine.createContext( );
    		var flexLayout = new FlexibleLayout( {
    			direction: 1,
    			ratios: [2, 10, 1, 3]
    		} );
    		// initialize layout surfaces
    		var surfaces = [];
    		flexLayout.sequenceFrom( surfaces )

    		// inner layout for the input + button
    		var innerLayout = new FlexibleLayout({
    			direction: 0,
    			ratios: [9, 1]
    		});
    		var innerSurfaces = [];
    		innerLayout.sequenceFrom( innerSurfaces )

			// populate inner surface first and then the surfaces
    		innerSurfaces.push(
	    		this.homeView.inputName,
		    	this.homeView.inputButton,
    		)

    		surfaces.push(
    			this.homeView.message,  
    			this.homeView.scrollView, 
    			new Surface({}),
    			this.homeView.input 
    		)

    		// change the placeholder surface to the inner one
    		surfaces[2] = innerLayout

    		mainContext.add( flexLayout ); 


    		// send message when enter is pressed
	        this.homeView.input.on( 'keypress', ( event ) => {
	        	if (event.keyCode === 13) {
					event.preventDefault( )
					notes.add( {text: this.homeView.input.getValue(), author: this.homeView.inputName.getValue( ) })
					this.homeView.input.value = ''
				}
	        })

	        // send message when button is pressed
	        this.homeView.inputButton.on( 'click', ( event ) => {	        	
				event.preventDefault( )
				notes.add( {text: this.homeView.input.getValue(), author: this.homeView.inputName.getValue( ) })
				this.homeView.input.value = ''
	        })
	        // console.log( this.homeView.scrollView._calcScrollHeight() )
	        // console.log( this.homeView.scrollView._debug )
	        // console.log( this.homeView.scrollView.layoutCount )
	        // console.log( this.homeView.scrollView )

	    }
	    return this.homeView;
    }
}