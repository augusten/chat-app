import Surface               from 'famous/core/Surface.js';
// import Engine               from 'famous/core/Engine.js';
import InputSurface          from 'famous/surfaces/InputSurface.js';
import TextareaSurface       from 'famous/surfaces/TextareaSurface.js';
import ListLayout            from 'famous-flex/layouts/ListLayout.js';
import AnimationController   from 'famous-flex/AnimationController.js';
// import GridLayout            from 'famous/views/GridLayout.js';
import {View}                from 'arva-js/core/View.js';
import {layout, event}       from 'arva-js/layout/Decorators.js';
import {SingleLineTextInput} from 'arva-js/components/inputs/SingleLineTextInput.js';
import {DataBoundScrollView} from 'arva-js/components/DataBoundScrollView.js';

import {Note, Notes}         from '../models/HomeModel.js'
// import Utility               from 'famous/utilities/Utility.js'

// export class ViewWithGrid extends View {
// 	mainContext = Engine.createContext();
// 	surfaces = []

// 	grid = new GridLayout({
// 		dimensions: [1, 3]
// 	}).sequenceFrom( surfaces )
// }

export class TitleText extends Surface {
    constructor(options) {
        super(combineOptions({
            properties: {
                fontFamily: 'monospace',
                fontSize: '25px'
            }
        }, options));
    }
}

export class NameText extends SingleLineTextInput {
	constructor(options) {
        super(combineOptions({
            properties: {
                fontFamily: 'monospace',
                fontSize: '12px',
                lineHeight:'110%',
                fontWeight: 'lighter',
            }
        }, options));
    }
}

export class MessageText extends TextareaSurface {
	constructor(options) {
        super(combineOptions({
            properties: {
                fontFamily: 'monospace',
                fontSize: '12px',
                lineHeight:'110%',
                fontWeight: 'lighter',
            }
        }, options));
    }
}

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
    @layout.size(400, 150)
    @layout.stick.center()
    @layout.translate(0, -100, 0)
    // @layout.custom( (context) => {
    // 	context.set('scrollView', {
    // 		position: [100, 100]
    // 	})
    // })
    // @ set position to the end

    // @event.once ( 'ready', function() { scrollView.goToLastPage(); })
    scrollView = new DataBoundScrollView ({
    	flow: true,
    	drag: 10,
    	paginated: true,

	    layout: ListLayout,
	    layoutOptions: { 
	    	spacing: 10 
	    },
	    itemTemplate: note => 
	    	new Surface({ 
	    		content: `${note.author} \n\n ${note.text}`,
	    		size: [ undefined, true ],
	    		// margin: '50px',
	    		properties: {
	    			'border': "1px solid grey",
	    			'border-radius': "12px", 
	    			'padding': '15px',
	    			'textAlign': 'justify' }
	    	}),
	    dataStore: new Notes(),
		chatScrolling: true,
		alignment: 1,
		// pullToRefreshHeader: pullToRefreshHeader
    })
	// scrollView.setPosition(200000)
	constructor ( options = {} ) {
    	super( options )
    }
}

export class HomeView extends ViewWithScroll {

	// CREATE INPUT FIELDS

	@layout.stick.bottom()
	@layout.translate(0, -80, 0)
    @layout.size(500, 35)

    inputName = new InputSurface( { placeholder: "name" } )

	@layout.dock.bottom()
	@layout.translate(0, -5, 0)
    @layout.size(500, 70)
    @layout.stick.center()

    // ALTERNATIVE WAY TO DO KEYPRESS ( if sendMessage is a function in controller )

    // @event.on('keydown', function(e) {
    // 	if (e.keyCode === 13) {
    // 		// once enter is pressed, send message
    // 		e.preventDefault()
    // 		this.options.sendMessage( e.target.value )
    // 	}
    // })
    input = new TextareaSurface( { 
    	placeholder: "message",
    	size: true
    	 } )
}
