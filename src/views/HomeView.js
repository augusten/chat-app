import Surface               from 'famous/core/Surface.js';
import InputSurface          from 'famous/surfaces/InputSurface.js';
import SubmitInputSurface    from 'famous/surfaces/SubmitInputSurface.js';
import {View}                from 'arva-js/core/View.js';
import {layout, event}       from 'arva-js/layout/Decorators.js';
import {SingleLineTextInput} from 'arva-js/components/inputs/SingleLineTextInput.js';
import AnimationController   from 'famous-flex/AnimationController.js';
import {DataBoundScrollView} from 'arva-js/components/DataBoundScrollView.js';
import CollectionLayout      from 'famous-flex/layouts/CollectionLayout.js';
import {Note, Notes}         from '../models/HomeModel.js'
import Utility               from 'famous/utilities/Utility.js'


// export class ViewWithTopBar extends View {
//     /* Dock to the top with a 44px height */
//     @layout.dock.top(44, 0, 10)
//     /* Define an animation on creation */
//     @layout.animate({
//         animation: AnimationController.Animation.Slide.Down,
//         transition: {duration: 100}
//     })
//     /* Initialize the surface itself */
//     topBar = new Surface({
//         /* CSS properties */
//         properties: {
//             backgroundColor: 'teal'
//         }
//     });
// }

export class ViewWithScroll extends View {
	/* The size of this surface is 300x25 px */
 //    @layout.size(300, 25)
 //    /* Place it in the midddle of the view */
 //    @layout.stick.center()
 //    /* Listen for click events to show the other Surface */
 //    @event.on('click', function(){this.showRenderable('answer');})
 //    /* Define an animation on creation */
 //    @layout.animate({
 //        animation: AnimationController.Animation.Fade,
 //        transition: {duration: 1000}
 //    })
 //   /* Initialize the surface itself */
 //    message = new Surface({
 //        /* The content of the surface */
 //        content: `hello ${this.options.welcomeName}`,
 //        /* CSS properties */
 //        properties: {
 //            textAlign: 'center',
 //            color: 'slategray'
 //        }
 //    });


 //    @layout.size(300, 25)
 //    /* Translate 100px below our main message */
 //    @layout.translate(0, 25, 0)
 //    @layout.animate({
 //        /* Hide initially */
 //        showInitially: false,
 //        /* Slide to the left in form the right */
 //        animation: AnimationController.Animation.Slide.Left,
 //        transition: {duration: 500}
 //    })
 //    @layout.stick.center()
 //    answer = new Surface({content: 'Yes?', properties: {textAlign: 'center'}});

 //    /* The size of this surface is 300x25 px */
 //    @layout.size(300, 35)
 //    @layout.translate(0, 100, 0)
 //    /* Place it in the midddle of the view */
 //    @layout.stick.center()
 //    @layout.animate({
 //        animation: AnimationController.Animation.FadedZoom,
 //        transition: {duration: 1000}
 //    })
 //    input = new InputSurface({type: "text"})
 //    .setPlaceholder("type something")
 //    // .getValue()
 //    // .on('click', () => {

 //    // })
    
	// @layout.size(50, 25)
 //    @layout.translate(0, 125, 0)
 //    /* Place it in the midddle of the view */
 //    @layout.stick.center()
 //    @event.on('click', function(){this.options.Trial()})
 //    submitInput = new SubmitInputSurface({value: "send"})

    @layout.size(600, 150)
    @layout.stick.center()

    scrollView = new DataBoundScrollView({
    	mouseMove: true,
    	scrollToNewChild: true,
	    layout: CollectionLayout,
	    layoutOptions: {
	        itemSize: [undefined, 30]
	    },
	    itemTemplate: note => 
	    	new Surface({ content: `Message: ${note.text}`}),
	    dataStore: new Notes(),
		chatScrolling: true
    })
}

export class HomeView extends ViewWithScroll {
	    /* The size of this surface is 300x25 px */
	@layout.dock.bottom()
	@layout.dockPadding(15)
	// @layout.dock.fill()
	// @flow.stateStep('nonFilled', layout.dock.none(), layout.size(100, 100))
    @layout.size(500, 35)
    // @layout.translate(0, 300, 0)
    /* Place it in the midddle of the view */
    @layout.stick.center()
    // @layout.animate({
    //     animation: AnimationController.Animation.FadedZoom,
    //     transition: {duration: 1000}
    // })
    input = new SingleLineTextInput({})
    	.setPlaceholder("type something")
    // .getValue()
    // .on('click', () => {

    // })
}




// export class HomeInput extends SingleLineTextInput {
//     // @layout.size(50, 25)
//     // @layout.stick.left()
//     // message = new Surface({content: `Hello ${this.options.welcomeName}`});

//     constructor(options = {}){
//         super(options);
//     }
// }
