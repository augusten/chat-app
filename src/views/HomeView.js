import Surface               from 'famous/core/Surface.js';
import Engine               from 'famous/core/Engine.js';
import InputSurface          from 'famous/surfaces/InputSurface.js';
import TextareaSurface       from 'famous/surfaces/TextareaSurface.js';
import GridLayout            from 'famous/views/GridLayout.js';
// import SubmitInputSurface    from 'famous/surfaces/SubmitInputSurface.js';
import {View}                from 'arva-js/core/View.js';
import {layout, event}       from 'arva-js/layout/Decorators.js';
import {SingleLineTextInput} from 'arva-js/components/inputs/SingleLineTextInput.js';
import AnimationController   from 'famous-flex/AnimationController.js';
import {DataBoundScrollView} from 'arva-js/components/DataBoundScrollView.js';
import CollectionLayout      from 'famous-flex/layouts/CollectionLayout.js';
import {Note, Notes}         from '../models/HomeModel.js'
import Utility               from 'famous/utilities/Utility.js'


// export class ViewWithGrid extends View {
// 	mainContext = Engine.createContext();
// 	surfaces = []

// 	grid = new GridLayout({
// 		dimensions: [1, 3]
// 	}).sequenceFrom( surfaces )
// }

export class ViewWithTop extends View {
	// create greeting

	/* The size of this surface is 300x25 px */
    @layout.dock.top(44, 0, 10)

    /* Listen for mouseover events to show the other Surface */
    @event.on('mouseover', function(){ console.log( 'hello' )})


    /* Define an animation on creation */
    @layout.animate({
        animation: AnimationController.Animation.Slide.Down,
        transition: {duration: 200}
    })
   /* Initialize the surface itself */
    message = new Surface({
        /* The content of the surface */
        content: `hello ${this.options.welcomeName}`,
        /* CSS properties */
        properties: {
            textAlign: 'center',
            color: 'slategray'
        }
    });
}

export class ViewWithScroll extends ViewWithTop {

	// creates the scroll view of messages
    @layout.size(600, 150)
    @layout.stick.center()
    @layout.translate(0, -100, 0)

    scrollView = new DataBoundScrollView({
    	mouseMove: true,
    	scrollToNewChild: true,
	    layout: CollectionLayout,
	    layoutOptions: {
	        itemSize: [undefined, undefined]
	    },
	    itemTemplate: note => 
	    	new Surface({ content: `${note.text}`}),
	    dataStore: new Notes(),
		chatScrolling: true
    })
	constructor ( options = {} ) {
    	super( options )
    }
}

export class HomeView extends ViewWithScroll {

	// creates the input fields

	// author input
	/* The size of this surface is 300x25 px */
	@layout.stick.bottom()
	@layout.translate(0, -80, 0)
    @layout.size(500, 35)

    inputName = new SingleLineTextInput( { placeholder: "name" } )

	/* The size of this surface is 300x25 px */
	@layout.dock.bottom()
	@layout.translate(0, -5, 0)
    @layout.size(500, 70)
    @layout.stick.center()
    // @layout.animate({
    // 	waitFor: 'scrollView',
    //     animation: AnimationController.Animation.FadedZoom,
    //     transition: {duration: 1000}
    // })
    @event.on('keydown', function(e) {
    	if (e.keyCode === 13) {
    		// once enter is pressed, send message
    		e.preventDefault()
    		this.options.sendMessage( e.target.value )
    	}
    })
    input = new TextareaSurface( { 
    	placeholder: "message",
    	wrap: "hard",
    	size: true
    	 } )
}
