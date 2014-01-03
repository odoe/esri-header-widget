/*global define*/
/*jshint strict:false*/
define([
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/dom',
  'dojo/on',
  'dojo/Evented',
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
  dom, on, Evented,
  domConstruct, domAttr, domClass, topic,
  _WidgetBase, _TemplatedMixin, a11yclick, template
) {
  'use strict';

  function has(target, prop) {
    return prop in target;
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
      var nodeCollapse;
      if (!this.hasDomRef) {
        domConstruct.place(this.domNode, document.body, 'first');
      }
      if (has(this.options, 'appName')) {
        var appName = dom.byId('app-name');
        if (appName) {
          appName.innerHTML = this.options.appName;
        }
      }
      if (has(this.options, 'pageTitle')) {
        document.title = this.options.pageTitle;
      }

      nodeCollapse = dom.byId('nav-collapse-container');

      this.own(
        on(dom.byId('nav-toggle'), a11yclick, function() {
          domClass.toggle(nodeCollapse, 'nav-open');
        })
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

