/*global define*/
/*jshint strict:false*/
define([
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/on',
  'dojo/Evented',
  'dojo/query',
  'dojo/dom-construct',
  'dojo/dom-attr',
  'dojo/dom-class',
  'dojo/topic',
  // Dijit stuff
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dijit/a11yclick',
  // template
  'text!widgets/header/header.tpl.html',
  'dojo/NodeList-dom'
], function(
  declare, lang,
  on, Evented, query,
  domConstruct, domAttr, domClass, topic,
  _WidgetBase, _TemplatedMixin, a11yclick, template
) {
  'use strict';

  function has(target, prop) {
    return prop in target;
  }

  function toggleNav() {
    query('.collapse').toggleClass('nav-open');
  }

  return declare([_WidgetBase, _TemplatedMixin, Evented], {

    templateString: template,

    options: {},

    hasDomRef: false,

    loaded: false,

    constructor: function(options, srcRefNode) {

      // mix in settings and defaults
      declare.safeMixin(this.options, options);

      // widget node
      if (srcRefNode) {
        this.domNode = srcRefNode;
        this.hasDomRef = true;
      }
    },

    postCreate: function() {
      if (!this.hasDomRef) {
        domConstruct.place(this.domNode, document.body, 'first');
      }
      if (has(this.options, 'appName')) {
        var appName = document.getElementById('app-name');
        if (appName) {
          appName.innerHTML = this.options.appName;
        }
      }
      if (has(this.options, 'pageTitle')) {
        document.title = this.options.pageTitle;
      }

      this.own(
        on(query('.navbar-toggle'), a11yclick, toggleNav)
      );
    },

    // start widget
    startup: function() {
      this._init();
    },

    // private functions
    _init: function() {
      this.set('loaded', true);
    }
  });

});

