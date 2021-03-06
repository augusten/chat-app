import 'babel-polyfill';
import firebase                     from 'firebase';

import {FirebaseDataSource}         from 'arva-js/data/datasources/FirebaseDataSource.js';
import 'arva-js/utils/hotfixes/IESupport.js';
import {provide}                    from 'arva-js/utils/di/Decorators.js';
import {Injection}                  from 'arva-js/utils/Injection.js';
import {DataSource}                 from 'arva-js/data/DataSource.js';
import {App as ArvaApp}             from 'arva-js/core/App.js';

/* Importing CSS in jspm bundled builds injects them into the DOM automagically */
import './famous.css';
import './fonts.css';

/* Import all controllers we want to use in the app */
import {HomeController}             from './controllers/HomeController.js';

export class App extends ArvaApp {

    /* References to Dependency Injection created App and Controller instances, so they are not garbage collected. */
    static references = {};

    /* The controllers that will be used in the app. */
    static controllers = [HomeController];


    /* Define which DataSource to use */
    static defaultDataSource() {
        /* Firebase initialization */
        firebase.initializeApp({
            apiKey: 'AIzaSyCTe7WOl70Xtb8NMOcEVPhpPDY3DxqeOBU',
            authDomain: 'chatapp-6d60b.firebaseapp.com',
            databaseURL: 'https://chatapp-6d60b.firebaseio.com',
            storageBucket: 'chatapp-6d60b.appspot.com'
        });
        return new FirebaseDataSource('/', {});
    }

    /**
     *  Called before the App is constructed and before the basic components (Router, Famous Context, Controllers,
     *  DataSource) have loaded.
     */
    static initialize(){
        /* Change initial route, view animation or something needed before we start */
        provide( DataSource )( App.defaultDataSource );
        this.start();
    }
    static loaded(){
        /* Instantiate things you need before the router is executed here. For example:
         *
         * this.references.menu = Injection.get(Menu); */
    }

    /**
     * Called by super class after all components (routing, controllers, views, etc.) have been loaded and the
     * app is up and running.
     */
    static done(){
    }
}

document.addEventListener( 'deviceready', App.initialize.bind(App) );