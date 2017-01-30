import Surface                 from 'famous/core/Surface.js';
import InputSurface            from 'famous/surfaces/InputSurface.js';
import TextareaSurface         from 'famous/surfaces/TextareaSurface.js';
import ListLayout              from 'famous-flex/layouts/ListLayout.js';
import AnimationController     from 'famous-flex/AnimationController.js';
import { View }                from 'arva-js/core/View.js';
import { layout, event }       from 'arva-js/layout/Decorators.js';
import { SingleLineTextInput } from 'arva-js/components/inputs/SingleLineTextInput.js';
import { DataBoundScrollView } from 'arva-js/components/DataBoundScrollView.js';
import { Note, Notes }         from '../models/HomeModel.js'



export class ViewWithTop extends View {
	// create greeting

	/* The size of this surface is 300x25 px */
    @layout.dock.top(44, 0, 10)

    /* Define an animation on creation */
    @layout.animate( {
    	hide: true,
        animation: AnimationController.Animation.Slide.Down,
        transition: { duration: 200 }
    })
   /* Initialize the surface itself */
    message = new Surface({
        /* The content of the surface */
        content: `hello ${this.options.welcomeName}`,
        /* CSS properties */
        properties: {
            textAlign: 'center',
            color: 'black',
            'fontFamily': 'monospace',
            'fontSize': '22px',
        }
    });
}

export class ViewWithScroll extends ViewWithTop {
	
	// set background color
	@layout.fullSize( )
    background = new Surface({ properties: {backgroundColor: 'white' }});

	// creates the scroll view of messages
    scrollView = new DataBoundScrollView ( {
    	flow: true,

	    layout: ListLayout,
	    layoutOptions: { 
	    	spacing: 10,
	    	margins: [0, 15, 10, 15], 
	    },
	    useContainer: true,
	    container: { // options passed to the ContainerSurface
	        properties: {
	            overflow: 'hidden'
	        }
	    },
	    itemTemplate: note =>
	    	new Surface({ 
	    		content: `${note.author} writes: <br><br> ${note.text}`,
	    		size: [ true, true ],
	    		// margin: '50px',
	    		properties: {
	    			'min-width': '250px',
	    			'border': "1px solid grey",
	    			'border-radius': "12px", 
	    			'padding-left': '15px',
	    			'padding-right': '15px',
	    			'padding-top': '7px',
	    			'padding-bottom': '7px',
	    			'textAlign': 'justify',
	    			'fontFamily': 'monospace',
                	'fontSize': '12px',
                	'fontWeight': 'lighter' }
	    	}),
	    dataStore: new Notes(),
		chatScrolling: true,
		alignment: 1,
		mouseMove: true,
        debug: true,
    })
	constructor ( options = { } ) {
    	super( options )
    }
}

export class HomeView extends ViewWithScroll {

	// CREATE INPUT FIELDS

   	@layout.size( undefined, undefined )

    inputName = new InputSurface( { 
    	placeholder: "name",
   		properties: {
   			'fontFamily': 'monospace',
     		'fontSize': '16px' 
     	}
     })

	@layout.size( undefined, undefined )
    input = new TextareaSurface( { 
    	placeholder: "message",
   		properties: {
   			'fontFamily': 'monospace',
     		'fontSize': '16px' 
     	}
    } )
}
