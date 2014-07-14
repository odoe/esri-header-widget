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
  'text!widgets/header/header.tpl.html'
], function(
  declare, lang,
  dom, on, Evented,
  domConstruct, domAttr, domClass, topic,
  _WidgetBase, _TemplatedMixin, a11yclick, template
) {

  return declare([_WidgetBase, _TemplatedMixin, Evented], {

    templateString: template,

    options: {},

    hasDomRef: false,

    loaded: false,

    constructor: function(options, srcNodeRef) {
      // mix in settings and defaults
      this.options = options || {};

      // widget node
      if (srcNodeRef) {
        this.hasDomRef = true;
      }
    },

    postCreate: function() {
      var nodeCollapse;
      if (!this.hasDomRef) {
        domConstruct.place(this.domNode, document.body, 'first');
      }
      if (this.get('appName')) {
        var appName = dom.byId('app-name');
        if (appName) {
          appName.innerHTML = this.get('appName');
        }
      }
      if (this.get('pageTitle')) {
        document.title = this.get('pageTitle');
      }

      nodeCollapse = dom.byId('nav-collapse-container');

      this.own(
        on(dom.byId('nav-toggle'), a11yclick.click, function() {
          domClass.toggle(nodeCollapse, 'collapse nav-open');
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
      this.emit('loaded', true);
    }
  });

});

