var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

/*!
 * jQuery JavaScript Library v1.3.2
 * http://jquery.com/
 *
 * Copyright (c) 2009 John Resig
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.jquery.com/License
 *
 * Date: 2009-02-19 17:34:21 -0500 (Thu, 19 Feb 2009)
 * Revision: 6246
 */
(function(){

var 
	// Will speed up references to window, and allows munging its name.
	window = this,
	// Will speed up references to undefined, and allows munging its name.
	undefined,
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,
	// Map over the $ in case of overwrite
	_$ = window.$,

	jQuery = window.jQuery = window.$ = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context );
	},

	// A simple way to check for HTML strings or ID strings
	// (both of which we optimize for)
	quickExpr = /^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,
	// Is it a simple selector
	isSimple = /^.[^:#\[\.,]*$/;

jQuery.fn = jQuery.prototype = {
	init: function( selector, context ) {
		// Make sure that a selection was provided
		selector = selector || document;

		// Handle $(DOMElement)
		if ( selector.nodeType ) {
			this[0] = selector;
			this.length = 1;
			this.context = selector;
			return this;
		}
		// Handle HTML strings
		if ( typeof selector === "string" ) {
			// Are we dealing with HTML string or an ID?
			var match = quickExpr.exec( selector );

			// Verify a match, and that no context was specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] )
					selector = jQuery.clean( [ match[1] ], context );

				// HANDLE: $("#id")
				else {
					var elem = document.getElementById( match[3] );

					// Handle the case where IE and Opera return items
					// by name instead of ID
					if ( elem && elem.id != match[3] )
						return jQuery().find( selector );

					// Otherwise, we inject the element directly into the jQuery object
					var ret = jQuery( elem || [] );
					ret.context = document;
					ret.selector = selector;
					return ret;
				}

			// HANDLE: $(expr, [context])
			// (which is just equivalent to: $(content).find(expr)
			} else
				return jQuery( context ).find( selector );

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) )
			return jQuery( document ).ready( selector );

		// Make sure that old selector state is passed along
		if ( selector.selector && selector.context ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return this.setArray(jQuery.isArray( selector ) ?
			selector :
			jQuery.makeArray(selector));
	},

	// Start with an empty selector
	selector: "",

	// The current version of jQuery being used
	jquery: "1.3.2",

	// The number of elements contained in the matched element set
	size: function() {
		return this.length;
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num === undefined ?

			// Return a 'clean' array
			Array.prototype.slice.call( this ) :

			// Return just the object
			this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems, name, selector ) {
		// Build a new jQuery matched element set
		var ret = jQuery( elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		ret.context = this.context;

		if ( name === "find" )
			ret.selector = this.selector + (this.selector ? " " : "") + selector;
		else if ( name )
			ret.selector = this.selector + "." + name + "(" + selector + ")";

		// Return the newly-formed element set
		return ret;
	},

	// Force the current matched set of elements to become
	// the specified array of elements (destroying the stack in the process)
	// You should use pushStack() in order to do this, but maintain the stack
	setArray: function( elems ) {
		// Resetting the length to 0, then using the native Array push
		// is a super-fast way to populate an object with array-like properties
		this.length = 0;
		Array.prototype.push.apply( this, elems );

		return this;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {
		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem && elem.jquery ? elem[0] : elem
		, this );
	},

	attr: function( name, value, type ) {
		var options = name;

		// Look for the case where we're accessing a style value
		if ( typeof name === "string" )
			if ( value === undefined )
				return this[0] && jQuery[ type || "attr" ]( this[0], name );

			else {
				options = {};
				options[ name ] = value;
			}

		// Check to see if we're setting style values
		return this.each(function(i){
			// Set all the styles
			for ( name in options )
				jQuery.attr(
					type ?
						this.style :
						this,
					name, jQuery.prop( this, options[ name ], type, i, name )
				);
		});
	},

	css: function( key, value ) {
		// ignore negative width and height values
		if ( (key == 'width' || key == 'height') && parseFloat(value) < 0 )
			value = undefined;
		return this.attr( key, value, "curCSS" );
	},

	text: function( text ) {
		if ( typeof text !== "object" && text != null )
			return this.empty().append( (this[0] && this[0].ownerDocument || document).createTextNode( text ) );

		var ret = "";

		jQuery.each( text || this, function(){
			jQuery.each( this.childNodes, function(){
				if ( this.nodeType != 8 )
					ret += this.nodeType != 1 ?
						this.nodeValue :
						jQuery.fn.text( [ this ] );
			});
		});

		return ret;
	},

	wrapAll: function( html ) {
		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).clone();

			if ( this[0].parentNode )
				wrap.insertBefore( this[0] );

			wrap.map(function(){
				var elem = this;

				while ( elem.firstChild )
					elem = elem.firstChild;

				return elem;
			}).append(this);
		}

		return this;
	},

	wrapInner: function( html ) {
		return this.each(function(){
			jQuery( this ).contents().wrapAll( html );
		});
	},

	wrap: function( html ) {
		return this.each(function(){
			jQuery( this ).wrapAll( html );
		});
	},

	append: function() {
		return this.domManip(arguments, true, function(elem){
			if (this.nodeType == 1)
				this.appendChild( elem );
		});
	},

	prepend: function() {
		return this.domManip(arguments, true, function(elem){
			if (this.nodeType == 1)
				this.insertBefore( elem, this.firstChild );
		});
	},

	before: function() {
		return this.domManip(arguments, false, function(elem){
			this.parentNode.insertBefore( elem, this );
		});
	},

	after: function() {
		return this.domManip(arguments, false, function(elem){
			this.parentNode.insertBefore( elem, this.nextSibling );
		});
	},

	end: function() {
		return this.prevObject || jQuery( [] );
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: [].push,
	sort: [].sort,
	splice: [].splice,

	find: function( selector ) {
		if ( this.length === 1 ) {
			var ret = this.pushStack( [], "find", selector );
			ret.length = 0;
			jQuery.find( selector, this[0], ret );
			return ret;
		} else {
			return this.pushStack( jQuery.unique(jQuery.map(this, function(elem){
				return jQuery.find( selector, elem );
			})), "find", selector );
		}
	},

	clone: function( events ) {
		// Do the clone
		var ret = this.map(function(){
			if ( !jQuery.support.noCloneEvent && !jQuery.isXMLDoc(this) ) {
				// IE copies events bound via attachEvent when
				// using cloneNode. Calling detachEvent on the
				// clone will also remove the events from the orignal
				// In order to get around this, we use innerHTML.
				// Unfortunately, this means some modifications to
				// attributes in IE that are actually only stored
				// as properties will not be copied (such as the
				// the name attribute on an input).
				var html = this.outerHTML;
				if ( !html ) {
					var div = this.ownerDocument.createElement("div");
					div.appendChild( this.cloneNode(true) );
					html = div.innerHTML;
				}

				return jQuery.clean([html.replace(/ jQuery\d+="(?:\d+|null)"/g, "").replace(/^\s*/, "")])[0];
			} else
				return this.cloneNode(true);
		});

		// Copy the events from the original to the clone
		if ( events === true ) {
			var orig = this.find("*").andSelf(), i = 0;

			ret.find("*").andSelf().each(function(){
				if ( this.nodeName !== orig[i].nodeName )
					return;

				var events = jQuery.data( orig[i], "events" );

				for ( var type in events ) {
					for ( var handler in events[ type ] ) {
						jQuery.event.add( this, type, events[ type ][ handler ], events[ type ][ handler ].data );
					}
				}

				i++;
			});
		}

		// Return the cloned set
		return ret;
	},

	filter: function( selector ) {
		return this.pushStack(
			jQuery.isFunction( selector ) &&
			jQuery.grep(this, function(elem, i){
				return selector.call( elem, i );
			}) ||

			jQuery.multiFilter( selector, jQuery.grep(this, function(elem){
				return elem.nodeType === 1;
			}) ), "filter", selector );
	},

	closest: function( selector ) {
		var pos = jQuery.expr.match.POS.test( selector ) ? jQuery(selector) : null,
			closer = 0;

		return this.map(function(){
			var cur = this;
			while ( cur && cur.ownerDocument ) {
				if ( pos ? pos.index(cur) > -1 : jQuery(cur).is(selector) ) {
					jQuery.data(cur, "closest", closer);
					return cur;
				}
				cur = cur.parentNode;
				closer++;
			}
		});
	},

	not: function( selector ) {
		if ( typeof selector === "string" )
			// test special case where just one selector is passed in
			if ( isSimple.test( selector ) )
				return this.pushStack( jQuery.multiFilter( selector, this, true ), "not", selector );
			else
				selector = jQuery.multiFilter( selector, this );

		var isArrayLike = selector.length && selector[selector.length - 1] !== undefined && !selector.nodeType;
		return this.filter(function() {
			return isArrayLike ? jQuery.inArray( this, selector ) < 0 : this != selector;
		});
	},

	add: function( selector ) {
		return this.pushStack( jQuery.unique( jQuery.merge(
			this.get(),
			typeof selector === "string" ?
				jQuery( selector ) :
				jQuery.makeArray( selector )
		)));
	},

	is: function( selector ) {
		return !!selector && jQuery.multiFilter( selector, this ).length > 0;
	},

	hasClass: function( selector ) {
		return !!selector && this.is( "." + selector );
	},

	val: function( value ) {
		if ( value === undefined ) {			
			var elem = this[0];

			if ( elem ) {
				if( jQuery.nodeName( elem, 'option' ) )
					return (elem.attributes.value || {}).specified ? elem.value : elem.text;
				
				// We need to handle select boxes special
				if ( jQuery.nodeName( elem, "select" ) ) {
					var index = elem.selectedIndex,
						values = [],
						options = elem.options,
						one = elem.type == "select-one";

					// Nothing was selected
					if ( index < 0 )
						return null;

					// Loop through all the selected options
					for ( var i = one ? index : 0, max = one ? index + 1 : options.length; i < max; i++ ) {
						var option = options[ i ];

						if ( option.selected ) {
							// Get the specifc value for the option
							value = jQuery(option).val();

							// We don't need an array for one selects
							if ( one )
								return value;

							// Multi-Selects return an array
							values.push( value );
						}
					}

					return values;				
				}

				// Everything else, we just grab the value
				return (elem.value || "").replace(/\r/g, "");

			}

			return undefined;
		}

		if ( typeof value === "number" )
			value += '';

		return this.each(function(){
			if ( this.nodeType != 1 )
				return;

			if ( jQuery.isArray(value) && /radio|checkbox/.test( this.type ) )
				this.checked = (jQuery.inArray(this.value, value) >= 0 ||
					jQuery.inArray(this.name, value) >= 0);

			else if ( jQuery.nodeName( this, "select" ) ) {
				var values = jQuery.makeArray(value);

				jQuery( "option", this ).each(function(){
					this.selected = (jQuery.inArray( this.value, values ) >= 0 ||
						jQuery.inArray( this.text, values ) >= 0);
				});

				if ( !values.length )
					this.selectedIndex = -1;

			} else
				this.value = value;
		});
	},

	html: function( value ) {
		return value === undefined ?
			(this[0] ?
				this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g, "") :
				null) :
			this.empty().append( value );
	},

	replaceWith: function( value ) {
		return this.after( value ).remove();
	},

	eq: function( i ) {
		return this.slice( i, +i + 1 );
	},

	slice: function() {
		return this.pushStack( Array.prototype.slice.apply( this, arguments ),
			"slice", Array.prototype.slice.call(arguments).join(",") );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function(elem, i){
			return callback.call( elem, i, elem );
		}));
	},

	andSelf: function() {
		return this.add( this.prevObject );
	},

	domManip: function( args, table, callback ) {
		if ( this[0] ) {
			var fragment = (this[0].ownerDocument || this[0]).createDocumentFragment(),
				scripts = jQuery.clean( args, (this[0].ownerDocument || this[0]), fragment ),
				first = fragment.firstChild;

			if ( first )
				for ( var i = 0, l = this.length; i < l; i++ )
					callback.call( root(this[i], first), this.length > 1 || i > 0 ?
							fragment.cloneNode(true) : fragment );
		
			if ( scripts )
				jQuery.each( scripts, evalScript );
		}

		return this;
		
		function root( elem, cur ) {
			return table && jQuery.nodeName(elem, "table") && jQuery.nodeName(cur, "tr") ?
				(elem.getElementsByTagName("tbody")[0] ||
				elem.appendChild(elem.ownerDocument.createElement("tbody"))) :
				elem;
		}
	}
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

function evalScript( i, elem ) {
	if ( elem.src )
		jQuery.ajax({
			url: elem.src,
			async: false,
			dataType: "script"
		});

	else
		jQuery.globalEval( elem.text || elem.textContent || elem.innerHTML || "" );

	if ( elem.parentNode )
		elem.parentNode.removeChild( elem );
}

function now(){
	return +new Date;
}

jQuery.extend = jQuery.fn.extend = function() {
	// copy reference to target object
	var target = arguments[0] || {}, i = 1, length = arguments.length, deep = false, options;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) )
		target = {};

	// extend jQuery itself if only one argument is passed
	if ( length == i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ )
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null )
			// Extend the base object
			for ( var name in options ) {
				var src = target[ name ], copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy )
					continue;

				// Recurse if we're merging object values
				if ( deep && copy && typeof copy === "object" && !copy.nodeType )
					target[ name ] = jQuery.extend( deep, 
						// Never move original objects, clone them
						src || ( copy.length != null ? [ ] : { } )
					, copy );

				// Don't bring in undefined values
				else if ( copy !== undefined )
					target[ name ] = copy;

			}

	// Return the modified object
	return target;
};

// exclude the following css properties to add px
var	exclude = /z-?index|font-?weight|opacity|zoom|line-?height/i,
	// cache defaultView
	defaultView = document.defaultView || {},
	toString = Object.prototype.toString;

jQuery.extend({
	noConflict: function( deep ) {
		window.$ = _$;

		if ( deep )
			window.jQuery = _jQuery;

		return jQuery;
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return toString.call(obj) === "[object Function]";
	},

	isArray: function( obj ) {
		return toString.call(obj) === "[object Array]";
	},

	// check if an element is in a (or is an) XML document
	isXMLDoc: function( elem ) {
		return elem.nodeType === 9 && elem.documentElement.nodeName !== "HTML" ||
			!!elem.ownerDocument && jQuery.isXMLDoc( elem.ownerDocument );
	},

	// Evalulates a script in a global context
	globalEval: function( data ) {
		if ( data && /\S/.test(data) ) {
			// Inspired by code by Andrea Giammarchi
			// http://webreflection.blogspot.com/2007/08/global-scope-evaluation-and-dom.html
			var head = document.getElementsByTagName("head")[0] || document.documentElement,
				script = document.createElement("script");

			script.type = "text/javascript";
			if ( jQuery.support.scriptEval )
				script.appendChild( document.createTextNode( data ) );
			else
				script.text = data;

			// Use insertBefore instead of appendChild  to circumvent an IE6 bug.
			// This arises when a base node is used (#2709).
			head.insertBefore( script, head.firstChild );
			head.removeChild( script );
		}
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toUpperCase() == name.toUpperCase();
	},

	// args is for internal usage only
	each: function( object, callback, args ) {
		var name, i = 0, length = object.length;

		if ( args ) {
			if ( length === undefined ) {
				for ( name in object )
					if ( callback.apply( object[ name ], args ) === false )
						break;
			} else
				for ( ; i < length; )
					if ( callback.apply( object[ i++ ], args ) === false )
						break;

		// A special, fast, case for the most common use of each
		} else {
			if ( length === undefined ) {
				for ( name in object )
					if ( callback.call( object[ name ], name, object[ name ] ) === false )
						break;
			} else
				for ( var value = object[0];
					i < length && callback.call( value, i, value ) !== false; value = object[++i] ){}
		}

		return object;
	},

	prop: function( elem, value, type, i, name ) {
		// Handle executable functions
		if ( jQuery.isFunction( value ) )
			value = value.call( elem, i );

		// Handle passing in a number to a CSS property
		return typeof value === "number" && type == "curCSS" && !exclude.test( name ) ?
			value + "px" :
			value;
	},

	className: {
		// internal only, use addClass("class")
		add: function( elem, classNames ) {
			jQuery.each((classNames || "").split(/\s+/), function(i, className){
				if ( elem.nodeType == 1 && !jQuery.className.has( elem.className, className ) )
					elem.className += (elem.className ? " " : "") + className;
			});
		},

		// internal only, use removeClass("class")
		remove: function( elem, classNames ) {
			if (elem.nodeType == 1)
				elem.className = classNames !== undefined ?
					jQuery.grep(elem.className.split(/\s+/), function(className){
						return !jQuery.className.has( classNames, className );
					}).join(" ") :
					"";
		},

		// internal only, use hasClass("class")
		has: function( elem, className ) {
			return elem && jQuery.inArray( className, (elem.className || elem).toString().split(/\s+/) ) > -1;
		}
	},

	// A method for quickly swapping in/out CSS properties to get correct calculations
	swap: function( elem, options, callback ) {
		var old = {};
		// Remember the old values, and insert the new ones
		for ( var name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		callback.call( elem );

		// Revert the old values
		for ( var name in options )
			elem.style[ name ] = old[ name ];
	},

	css: function( elem, name, force, extra ) {
		if ( name == "width" || name == "height" ) {
			var val, props = { position: "absolute", visibility: "hidden", display:"block" }, which = name == "width" ? [ "Left", "Right" ] : [ "Top", "Bottom" ];

			function getWH() {
				val = name == "width" ? elem.offsetWidth : elem.offsetHeight;

				if ( extra === "border" )
					return;

				jQuery.each( which, function() {
					if ( !extra )
						val -= parseFloat(jQuery.curCSS( elem, "padding" + this, true)) || 0;
					if ( extra === "margin" )
						val += parseFloat(jQuery.curCSS( elem, "margin" + this, true)) || 0;
					else
						val -= parseFloat(jQuery.curCSS( elem, "border" + this + "Width", true)) || 0;
				});
			}

			if ( elem.offsetWidth !== 0 )
				getWH();
			else
				jQuery.swap( elem, props, getWH );

			return Math.max(0, Math.round(val));
		}

		return jQuery.curCSS( elem, name, force );
	},

	curCSS: function( elem, name, force ) {
		var ret, style = elem.style;

		// We need to handle opacity special in IE
		if ( name == "opacity" && !jQuery.support.opacity ) {
			ret = jQuery.attr( style, "opacity" );

			return ret == "" ?
				"1" :
				ret;
		}

		// Make sure we're using the right name for getting the float value
		if ( name.match( /float/i ) )
			name = styleFloat;

		if ( !force && style && style[ name ] )
			ret = style[ name ];

		else if ( defaultView.getComputedStyle ) {

			// Only "float" is needed here
			if ( name.match( /float/i ) )
				name = "float";

			name = name.replace( /([A-Z])/g, "-$1" ).toLowerCase();

			var computedStyle = defaultView.getComputedStyle( elem, null );

			if ( computedStyle )
				ret = computedStyle.getPropertyValue( name );

			// We should always get a number back from opacity
			if ( name == "opacity" && ret == "" )
				ret = "1";

		} else if ( elem.currentStyle ) {
			var camelCase = name.replace(/\-(\w)/g, function(all, letter){
				return letter.toUpperCase();
			});

			ret = elem.currentStyle[ name ] || elem.currentStyle[ camelCase ];

			// From the awesome hack by Dean Edwards
			// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

			// If we're not dealing with a regular pixel number
			// but a number that has a weird ending, we need to convert it to pixels
			if ( !/^\d+(px)?$/i.test( ret ) && /^\d/.test( ret ) ) {
				// Remember the original values
				var left = style.left, rsLeft = elem.runtimeStyle.left;

				// Put in the new values to get a computed value out
				elem.runtimeStyle.left = elem.currentStyle.left;
				style.left = ret || 0;
				ret = style.pixelLeft + "px";

				// Revert the changed values
				style.left = left;
				elem.runtimeStyle.left = rsLeft;
			}
		}

		return ret;
	},

	clean: function( elems, context, fragment ) {
		context = context || document;

		// !context.createElement fails in IE with an error but returns typeof 'object'
		if ( typeof context.createElement === "undefined" )
			context = context.ownerDocument || context[0] && context[0].ownerDocument || document;

		// If a single string is passed in and it's a single tag
		// just do a createElement and skip the rest
		if ( !fragment && elems.length === 1 && typeof elems[0] === "string" ) {
			var match = /^<(\w+)\s*\/?>$/.exec(elems[0]);
			if ( match )
				return [ context.createElement( match[1] ) ];
		}

		var ret = [], scripts = [], div = context.createElement("div");

		jQuery.each(elems, function(i, elem){
			if ( typeof elem === "number" )
				elem += '';

			if ( !elem )
				return;

			// Convert html string into DOM nodes
			if ( typeof elem === "string" ) {
				// Fix "XHTML"-style tags in all browsers
				elem = elem.replace(/(<(\w+)[^>]*?)\/>/g, function(all, front, tag){
					return tag.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i) ?
						all :
						front + "></" + tag + ">";
				});

				// Trim whitespace, otherwise indexOf won't work as expected
				var tags = elem.replace(/^\s+/, "").substring(0, 10).toLowerCase();

				var wrap =
					// option or optgroup
					!tags.indexOf("<opt") &&
					[ 1, "<select multiple='multiple'>", "</select>" ] ||

					!tags.indexOf("<leg") &&
					[ 1, "<fieldset>", "</fieldset>" ] ||

					tags.match(/^<(thead|tbody|tfoot|colg|cap)/) &&
					[ 1, "<table>", "</table>" ] ||

					!tags.indexOf("<tr") &&
					[ 2, "<table><tbody>", "</tbody></table>" ] ||

				 	// <thead> matched above
					(!tags.indexOf("<td") || !tags.indexOf("<th")) &&
					[ 3, "<table><tbody><tr>", "</tr></tbody></table>" ] ||

					!tags.indexOf("<col") &&
					[ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ] ||

					// IE can't serialize <link> and <script> tags normally
					!jQuery.support.htmlSerialize &&
					[ 1, "div<div>", "</div>" ] ||

					[ 0, "", "" ];

				// Go to html and back, then peel off extra wrappers
				div.innerHTML = wrap[1] + elem + wrap[2];

				// Move to the right depth
				while ( wrap[0]-- )
					div = div.lastChild;

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !jQuery.support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					var hasBody = /<tbody/i.test(elem),
						tbody = !tags.indexOf("<table") && !hasBody ?
							div.firstChild && div.firstChild.childNodes :

						// String was a bare <thead> or <tfoot>
						wrap[1] == "<table>" && !hasBody ?
							div.childNodes :
							[];

					for ( var j = tbody.length - 1; j >= 0 ; --j )
						if ( jQuery.nodeName( tbody[ j ], "tbody" ) && !tbody[ j ].childNodes.length )
							tbody[ j ].parentNode.removeChild( tbody[ j ] );

					}

				// IE completely kills leading whitespace when innerHTML is used
				if ( !jQuery.support.leadingWhitespace && /^\s/.test( elem ) )
					div.insertBefore( context.createTextNode( elem.match(/^\s*/)[0] ), div.firstChild );
				
				elem = jQuery.makeArray( div.childNodes );
			}

			if ( elem.nodeType )
				ret.push( elem );
			else
				ret = jQuery.merge( ret, elem );

		});

		if ( fragment ) {
			for ( var i = 0; ret[i]; i++ ) {
				if ( jQuery.nodeName( ret[i], "script" ) && (!ret[i].type || ret[i].type.toLowerCase() === "text/javascript") ) {
					scripts.push( ret[i].parentNode ? ret[i].parentNode.removeChild( ret[i] ) : ret[i] );
				} else {
					if ( ret[i].nodeType === 1 )
						ret.splice.apply( ret, [i + 1, 0].concat(jQuery.makeArray(ret[i].getElementsByTagName("script"))) );
					fragment.appendChild( ret[i] );
				}
			}
			
			return scripts;
		}

		return ret;
	},

	attr: function( elem, name, value ) {
		// don't set attributes on text and comment nodes
		if (!elem || elem.nodeType == 3 || elem.nodeType == 8)
			return undefined;

		var notxml = !jQuery.isXMLDoc( elem ),
			// Whether we are setting (or getting)
			set = value !== undefined;

		// Try to normalize/fix the name
		name = notxml && jQuery.props[ name ] || name;

		// Only do all the following if this is a node (faster for style)
		// IE elem.getAttribute passes even for style
		if ( elem.tagName ) {

			// These attributes require special treatment
			var special = /href|src|style/.test( name );

			// Safari mis-reports the default selected property of a hidden option
			// Accessing the parent's selectedIndex property fixes it
			if ( name == "selected" && elem.parentNode )
				elem.parentNode.selectedIndex;

			// If applicable, access the attribute via the DOM 0 way
			if ( name in elem && notxml && !special ) {
				if ( set ){
					// We can't allow the type property to be changed (since it causes problems in IE)
					if ( name == "type" && jQuery.nodeName( elem, "input" ) && elem.parentNode )
						throw "type property can't be changed";

					elem[ name ] = value;
				}

				// browsers index elements by id/name on forms, give priority to attributes.
				if( jQuery.nodeName( elem, "form" ) && elem.getAttributeNode(name) )
					return elem.getAttributeNode( name ).nodeValue;

				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				if ( name == "tabIndex" ) {
					var attributeNode = elem.getAttributeNode( "tabIndex" );
					return attributeNode && attributeNode.specified
						? attributeNode.value
						: elem.nodeName.match(/(button|input|object|select|textarea)/i)
							? 0
							: elem.nodeName.match(/^(a|area)$/i) && elem.href
								? 0
								: undefined;
				}

				return elem[ name ];
			}

			if ( !jQuery.support.style && notxml &&  name == "style" )
				return jQuery.attr( elem.style, "cssText", value );

			if ( set )
				// convert the value to a string (all browsers do this but IE) see #1070
				elem.setAttribute( name, "" + value );

			var attr = !jQuery.support.hrefNormalized && notxml && special
					// Some attributes require a special call on IE
					? elem.getAttribute( name, 2 )
					: elem.getAttribute( name );

			// Non-existent attributes return null, we normalize to undefined
			return attr === null ? undefined : attr;
		}

		// elem is actually elem.style ... set the style

		// IE uses filters for opacity
		if ( !jQuery.support.opacity && name == "opacity" ) {
			if ( set ) {
				// IE has trouble with opacity if it does not have layout
				// Force it by setting the zoom level
				elem.zoom = 1;

				// Set the alpha filter to set the opacity
				elem.filter = (elem.filter || "").replace( /alpha\([^)]*\)/, "" ) +
					(parseInt( value ) + '' == "NaN" ? "" : "alpha(opacity=" + value * 100 + ")");
			}

			return elem.filter && elem.filter.indexOf("opacity=") >= 0 ?
				(parseFloat( elem.filter.match(/opacity=([^)]*)/)[1] ) / 100) + '':
				"";
		}

		name = name.replace(/-([a-z])/ig, function(all, letter){
			return letter.toUpperCase();
		});

		if ( set )
			elem[ name ] = value;

		return elem[ name ];
	},

	trim: function( text ) {
		return (text || "").replace( /^\s+|\s+$/g, "" );
	},

	makeArray: function( array ) {
		var ret = [];

		if( array != null ){
			var i = array.length;
			// The window, strings (and functions) also have 'length'
			if( i == null || typeof array === "string" || jQuery.isFunction(array) || array.setInterval )
				ret[0] = array;
			else
				while( i )
					ret[--i] = array[i];
		}

		return ret;
	},

	inArray: function( elem, array ) {
		for ( var i = 0, length = array.length; i < length; i++ )
		// Use === because on IE, window == document
			if ( array[ i ] === elem )
				return i;

		return -1;
	},

	merge: function( first, second ) {
		// We have to loop this way because IE & Opera overwrite the length
		// expando of getElementsByTagName
		var i = 0, elem, pos = first.length;
		// Also, we need to make sure that the correct elements are being returned
		// (IE returns comment nodes in a '*' query)
		if ( !jQuery.support.getAll ) {
			while ( (elem = second[ i++ ]) != null )
				if ( elem.nodeType != 8 )
					first[ pos++ ] = elem;

		} else
			while ( (elem = second[ i++ ]) != null )
				first[ pos++ ] = elem;

		return first;
	},

	unique: function( array ) {
		var ret = [], done = {};

		try {

			for ( var i = 0, length = array.length; i < length; i++ ) {
				var id = jQuery.data( array[ i ] );

				if ( !done[ id ] ) {
					done[ id ] = true;
					ret.push( array[ i ] );
				}
			}

		} catch( e ) {
			ret = array;
		}

		return ret;
	},

	grep: function( elems, callback, inv ) {
		var ret = [];

		// Go through the array, only saving the items
		// that pass the validator function
		for ( var i = 0, length = elems.length; i < length; i++ )
			if ( !inv != !callback( elems[ i ], i ) )
				ret.push( elems[ i ] );

		return ret;
	},

	map: function( elems, callback ) {
		var ret = [];

		// Go through the array, translating each of the items to their
		// new value (or values).
		for ( var i = 0, length = elems.length; i < length; i++ ) {
			var value = callback( elems[ i ], i );

			if ( value != null )
				ret[ ret.length ] = value;
		}

		return ret.concat.apply( [], ret );
	}
});

// Use of jQuery.browser is deprecated.
// It's included for backwards compatibility and plugins,
// although they should work to migrate away.

var userAgent = navigator.userAgent.toLowerCase();

// Figure out what browser is being used
jQuery.browser = {
	version: (userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [0,'0'])[1],
	safari: /webkit/.test( userAgent ),
	opera: /opera/.test( userAgent ),
	msie: /msie/.test( userAgent ) && !/opera/.test( userAgent ),
	mozilla: /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent )
};

jQuery.each({
	parent: function(elem){return elem.parentNode;},
	parents: function(elem){return jQuery.dir(elem,"parentNode");},
	next: function(elem){return jQuery.nth(elem,2,"nextSibling");},
	prev: function(elem){return jQuery.nth(elem,2,"previousSibling");},
	nextAll: function(elem){return jQuery.dir(elem,"nextSibling");},
	prevAll: function(elem){return jQuery.dir(elem,"previousSibling");},
	siblings: function(elem){return jQuery.sibling(elem.parentNode.firstChild,elem);},
	children: function(elem){return jQuery.sibling(elem.firstChild);},
	contents: function(elem){return jQuery.nodeName(elem,"iframe")?elem.contentDocument||elem.contentWindow.document:jQuery.makeArray(elem.childNodes);}
}, function(name, fn){
	jQuery.fn[ name ] = function( selector ) {
		var ret = jQuery.map( this, fn );

		if ( selector && typeof selector == "string" )
			ret = jQuery.multiFilter( selector, ret );

		return this.pushStack( jQuery.unique( ret ), name, selector );
	};
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function(name, original){
	jQuery.fn[ name ] = function( selector ) {
		var ret = [], insert = jQuery( selector );

		for ( var i = 0, l = insert.length; i < l; i++ ) {
			var elems = (i > 0 ? this.clone(true) : this).get();
			jQuery.fn[ original ].apply( jQuery(insert[i]), elems );
			ret = ret.concat( elems );
		}

		return this.pushStack( ret, name, selector );
	};
});

jQuery.each({
	removeAttr: function( name ) {
		jQuery.attr( this, name, "" );
		if (this.nodeType == 1)
			this.removeAttribute( name );
	},

	addClass: function( classNames ) {
		jQuery.className.add( this, classNames );
	},

	removeClass: function( classNames ) {
		jQuery.className.remove( this, classNames );
	},

	toggleClass: function( classNames, state ) {
		if( typeof state !== "boolean" )
			state = !jQuery.className.has( this, classNames );
		jQuery.className[ state ? "add" : "remove" ]( this, classNames );
	},

	remove: function( selector ) {
		if ( !selector || jQuery.filter( selector, [ this ] ).length ) {
			// Prevent memory leaks
			jQuery( "*", this ).add([this]).each(function(){
				jQuery.event.remove(this);
				jQuery.removeData(this);
			});
			if (this.parentNode)
				this.parentNode.removeChild( this );
		}
	},

	empty: function() {
		// Remove element nodes and prevent memory leaks
		jQuery(this).children().remove();

		// Remove any remaining nodes
		while ( this.firstChild )
			this.removeChild( this.firstChild );
	}
}, function(name, fn){
	jQuery.fn[ name ] = function(){
		return this.each( fn, arguments );
	};
});

// Helper function used by the dimensions and offset modules
function num(elem, prop) {
	return elem[0] && parseInt( jQuery.curCSS(elem[0], prop, true), 10 ) || 0;
}
var expando = "jQuery" + now(), uuid = 0, windowData = {};

jQuery.extend({
	cache: {},

	data: function( elem, name, data ) {
		elem = elem == window ?
			windowData :
			elem;

		var id = elem[ expando ];

		// Compute a unique ID for the element
		if ( !id )
			id = elem[ expando ] = ++uuid;

		// Only generate the data cache if we're
		// trying to access or manipulate it
		if ( name && !jQuery.cache[ id ] )
			jQuery.cache[ id ] = {};

		// Prevent overriding the named cache with undefined values
		if ( data !== undefined )
			jQuery.cache[ id ][ name ] = data;

		// Return the named cache data, or the ID for the element
		return name ?
			jQuery.cache[ id ][ name ] :
			id;
	},

	removeData: function( elem, name ) {
		elem = elem == window ?
			windowData :
			elem;

		var id = elem[ expando ];

		// If we want to remove a specific section of the element's data
		if ( name ) {
			if ( jQuery.cache[ id ] ) {
				// Remove the section of cache data
				delete jQuery.cache[ id ][ name ];

				// If we've removed all the data, remove the element's cache
				name = "";

				for ( name in jQuery.cache[ id ] )
					break;

				if ( !name )
					jQuery.removeData( elem );
			}

		// Otherwise, we want to remove all of the element's data
		} else {
			// Clean up the element expando
			try {
				delete elem[ expando ];
			} catch(e){
				// IE has trouble directly removing the expando
				// but it's ok with using removeAttribute
				if ( elem.removeAttribute )
					elem.removeAttribute( expando );
			}

			// Completely remove the data cache
			delete jQuery.cache[ id ];
		}
	},
	queue: function( elem, type, data ) {
		if ( elem ){
	
			type = (type || "fx") + "queue";
	
			var q = jQuery.data( elem, type );
	
			if ( !q || jQuery.isArray(data) )
				q = jQuery.data( elem, type, jQuery.makeArray(data) );
			else if( data )
				q.push( data );
	
		}
		return q;
	},

	dequeue: function( elem, type ){
		var queue = jQuery.queue( elem, type ),
			fn = queue.shift();
		
		if( !type || type === "fx" )
			fn = queue[0];
			
		if( fn !== undefined )
			fn.call(elem);
	}
});

jQuery.fn.extend({
	data: function( key, value ){
		var parts = key.split(".");
		parts[1] = parts[1] ? "." + parts[1] : "";

		if ( value === undefined ) {
			var data = this.triggerHandler("getData" + parts[1] + "!", [parts[0]]);

			if ( data === undefined && this.length )
				data = jQuery.data( this[0], key );

			return data === undefined && parts[1] ?
				this.data( parts[0] ) :
				data;
		} else
			return this.trigger("setData" + parts[1] + "!", [parts[0], value]).each(function(){
				jQuery.data( this, key, value );
			});
	},

	removeData: function( key ){
		return this.each(function(){
			jQuery.removeData( this, key );
		});
	},
	queue: function(type, data){
		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
		}

		if ( data === undefined )
			return jQuery.queue( this[0], type );

		return this.each(function(){
			var queue = jQuery.queue( this, type, data );
			
			 if( type == "fx" && queue.length == 1 )
				queue[0].call(this);
		});
	},
	dequeue: function(type){
		return this.each(function(){
			jQuery.dequeue( this, type );
		});
	}
});/*!
 * Sizzle CSS Selector Engine - v0.9.3
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){

var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,
	done = 0,
	toString = Object.prototype.toString;

var Sizzle = function(selector, context, results, seed) {
	results = results || [];
	context = context || document;

	if ( context.nodeType !== 1 && context.nodeType !== 9 )
		return [];
	
	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	var parts = [], m, set, checkSet, check, mode, extra, prune = true;
	
	// Reset the position of the chunker regexp (start from head)
	chunker.lastIndex = 0;
	
	while ( (m = chunker.exec(selector)) !== null ) {
		parts.push( m[1] );
		
		if ( m[2] ) {
			extra = RegExp.rightContext;
			break;
		}
	}

	if ( parts.length > 1 && origPOS.exec( selector ) ) {
		if ( parts.length === 2 && Expr.relative[ parts[0] ] ) {
			set = posProcess( parts[0] + parts[1], context );
		} else {
			set = Expr.relative[ parts[0] ] ?
				[ context ] :
				Sizzle( parts.shift(), context );

			while ( parts.length ) {
				selector = parts.shift();

				if ( Expr.relative[ selector ] )
					selector += parts.shift();

				set = posProcess( selector, set );
			}
		}
	} else {
		var ret = seed ?
			{ expr: parts.pop(), set: makeArray(seed) } :
			Sizzle.find( parts.pop(), parts.length === 1 && context.parentNode ? context.parentNode : context, isXML(context) );
		set = Sizzle.filter( ret.expr, ret.set );

		if ( parts.length > 0 ) {
			checkSet = makeArray(set);
		} else {
			prune = false;
		}

		while ( parts.length ) {
			var cur = parts.pop(), pop = cur;

			if ( !Expr.relative[ cur ] ) {
				cur = "";
			} else {
				pop = parts.pop();
			}

			if ( pop == null ) {
				pop = context;
			}

			Expr.relative[ cur ]( checkSet, pop, isXML(context) );
		}
	}

	if ( !checkSet ) {
		checkSet = set;
	}

	if ( !checkSet ) {
		throw "Syntax error, unrecognized expression: " + (cur || selector);
	}

	if ( toString.call(checkSet) === "[object Array]" ) {
		if ( !prune ) {
			results.push.apply( results, checkSet );
		} else if ( context.nodeType === 1 ) {
			for ( var i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && contains(context, checkSet[i])) ) {
					results.push( set[i] );
				}
			}
		} else {
			for ( var i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && checkSet[i].nodeType === 1 ) {
					results.push( set[i] );
				}
			}
		}
	} else {
		makeArray( checkSet, results );
	}

	if ( extra ) {
		Sizzle( extra, context, results, seed );

		if ( sortOrder ) {
			hasDuplicate = false;
			results.sort(sortOrder);

			if ( hasDuplicate ) {
				for ( var i = 1; i < results.length; i++ ) {
					if ( results[i] === results[i-1] ) {
						results.splice(i--, 1);
					}
				}
			}
		}
	}

	return results;
};

Sizzle.matches = function(expr, set){
	return Sizzle(expr, null, null, set);
};

Sizzle.find = function(expr, context, isXML){
	var set, match;

	if ( !expr ) {
		return [];
	}

	for ( var i = 0, l = Expr.order.length; i < l; i++ ) {
		var type = Expr.order[i], match;
		
		if ( (match = Expr.match[ type ].exec( expr )) ) {
			var left = RegExp.leftContext;

			if ( left.substr( left.length - 1 ) !== "\\" ) {
				match[1] = (match[1] || "").replace(/\\/g, "");
				set = Expr.find[ type ]( match, context, isXML );
				if ( set != null ) {
					expr = expr.replace( Expr.match[ type ], "" );
					break;
				}
			}
		}
	}

	if ( !set ) {
		set = context.getElementsByTagName("*");
	}

	return {set: set, expr: expr};
};

Sizzle.filter = function(expr, set, inplace, not){
	var old = expr, result = [], curLoop = set, match, anyFound,
		isXMLFilter = set && set[0] && isXML(set[0]);

	while ( expr && set.length ) {
		for ( var type in Expr.filter ) {
			if ( (match = Expr.match[ type ].exec( expr )) != null ) {
				var filter = Expr.filter[ type ], found, item;
				anyFound = false;

				if ( curLoop == result ) {
					result = [];
				}

				if ( Expr.preFilter[ type ] ) {
					match = Expr.preFilter[ type ]( match, curLoop, inplace, result, not, isXMLFilter );

					if ( !match ) {
						anyFound = found = true;
					} else if ( match === true ) {
						continue;
					}
				}

				if ( match ) {
					for ( var i = 0; (item = curLoop[i]) != null; i++ ) {
						if ( item ) {
							found = filter( item, match, i, curLoop );
							var pass = not ^ !!found;

							if ( inplace && found != null ) {
								if ( pass ) {
									anyFound = true;
								} else {
									curLoop[i] = false;
								}
							} else if ( pass ) {
								result.push( item );
								anyFound = true;
							}
						}
					}
				}

				if ( found !== undefined ) {
					if ( !inplace ) {
						curLoop = result;
					}

					expr = expr.replace( Expr.match[ type ], "" );

					if ( !anyFound ) {
						return [];
					}

					break;
				}
			}
		}

		// Improper expression
		if ( expr == old ) {
			if ( anyFound == null ) {
				throw "Syntax error, unrecognized expression: " + expr;
			} else {
				break;
			}
		}

		old = expr;
	}

	return curLoop;
};

var Expr = Sizzle.selectors = {
	order: [ "ID", "NAME", "TAG" ],
	match: {
		ID: /#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,
		CLASS: /\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,
		NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,
		ATTR: /\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
		TAG: /^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,
		CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,
		POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,
		PSEUDO: /:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/
	},
	attrMap: {
		"class": "className",
		"for": "htmlFor"
	},
	attrHandle: {
		href: function(elem){
			return elem.getAttribute("href");
		}
	},
	relative: {
		"+": function(checkSet, part, isXML){
			var isPartStr = typeof part === "string",
				isTag = isPartStr && !/\W/.test(part),
				isPartStrNotTag = isPartStr && !isTag;

			if ( isTag && !isXML ) {
				part = part.toUpperCase();
			}

			for ( var i = 0, l = checkSet.length, elem; i < l; i++ ) {
				if ( (elem = checkSet[i]) ) {
					while ( (elem = elem.previousSibling) && elem.nodeType !== 1 ) {}

					checkSet[i] = isPartStrNotTag || elem && elem.nodeName === part ?
						elem || false :
						elem === part;
				}
			}

			if ( isPartStrNotTag ) {
				Sizzle.filter( part, checkSet, true );
			}
		},
		">": function(checkSet, part, isXML){
			var isPartStr = typeof part === "string";

			if ( isPartStr && !/\W/.test(part) ) {
				part = isXML ? part : part.toUpperCase();

				for ( var i = 0, l = checkSet.length; i < l; i++ ) {
					var elem = checkSet[i];
					if ( elem ) {
						var parent = elem.parentNode;
						checkSet[i] = parent.nodeName === part ? parent : false;
					}
				}
			} else {
				for ( var i = 0, l = checkSet.length; i < l; i++ ) {
					var elem = checkSet[i];
					if ( elem ) {
						checkSet[i] = isPartStr ?
							elem.parentNode :
							elem.parentNode === part;
					}
				}

				if ( isPartStr ) {
					Sizzle.filter( part, checkSet, true );
				}
			}
		},
		"": function(checkSet, part, isXML){
			var doneName = done++, checkFn = dirCheck;

			if ( !part.match(/\W/) ) {
				var nodeCheck = part = isXML ? part : part.toUpperCase();
				checkFn = dirNodeCheck;
			}

			checkFn("parentNode", part, doneName, checkSet, nodeCheck, isXML);
		},
		"~": function(checkSet, part, isXML){
			var doneName = done++, checkFn = dirCheck;

			if ( typeof part === "string" && !part.match(/\W/) ) {
				var nodeCheck = part = isXML ? part : part.toUpperCase();
				checkFn = dirNodeCheck;
			}

			checkFn("previousSibling", part, doneName, checkSet, nodeCheck, isXML);
		}
	},
	find: {
		ID: function(match, context, isXML){
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);
				return m ? [m] : [];
			}
		},
		NAME: function(match, context, isXML){
			if ( typeof context.getElementsByName !== "undefined" ) {
				var ret = [], results = context.getElementsByName(match[1]);

				for ( var i = 0, l = results.length; i < l; i++ ) {
					if ( results[i].getAttribute("name") === match[1] ) {
						ret.push( results[i] );
					}
				}

				return ret.length === 0 ? null : ret;
			}
		},
		TAG: function(match, context){
			return context.getElementsByTagName(match[1]);
		}
	},
	preFilter: {
		CLASS: function(match, curLoop, inplace, result, not, isXML){
			match = " " + match[1].replace(/\\/g, "") + " ";

			if ( isXML ) {
				return match;
			}

			for ( var i = 0, elem; (elem = curLoop[i]) != null; i++ ) {
				if ( elem ) {
					if ( not ^ (elem.className && (" " + elem.className + " ").indexOf(match) >= 0) ) {
						if ( !inplace )
							result.push( elem );
					} else if ( inplace ) {
						curLoop[i] = false;
					}
				}
			}

			return false;
		},
		ID: function(match){
			return match[1].replace(/\\/g, "");
		},
		TAG: function(match, curLoop){
			for ( var i = 0; curLoop[i] === false; i++ ){}
			return curLoop[i] && isXML(curLoop[i]) ? match[1] : match[1].toUpperCase();
		},
		CHILD: function(match){
			if ( match[1] == "nth" ) {
				// parse equations like 'even', 'odd', '5', '2n', '3n+2', '4n-1', '-n+6'
				var test = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(
					match[2] == "even" && "2n" || match[2] == "odd" && "2n+1" ||
					!/\D/.test( match[2] ) && "0n+" + match[2] || match[2]);

				// calculate the numbers (first)n+(last) including if they are negative
				match[2] = (test[1] + (test[2] || 1)) - 0;
				match[3] = test[3] - 0;
			}

			// TODO: Move to normal caching system
			match[0] = done++;

			return match;
		},
		ATTR: function(match, curLoop, inplace, result, not, isXML){
			var name = match[1].replace(/\\/g, "");
			
			if ( !isXML && Expr.attrMap[name] ) {
				match[1] = Expr.attrMap[name];
			}

			if ( match[2] === "~=" ) {
				match[4] = " " + match[4] + " ";
			}

			return match;
		},
		PSEUDO: function(match, curLoop, inplace, result, not){
			if ( match[1] === "not" ) {
				// If we're dealing with a complex expression, or a simple one
				if ( match[3].match(chunker).length > 1 || /^\w/.test(match[3]) ) {
					match[3] = Sizzle(match[3], null, null, curLoop);
				} else {
					var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);
					if ( !inplace ) {
						result.push.apply( result, ret );
					}
					return false;
				}
			} else if ( Expr.match.POS.test( match[0] ) || Expr.match.CHILD.test( match[0] ) ) {
				return true;
			}
			
			return match;
		},
		POS: function(match){
			match.unshift( true );
			return match;
		}
	},
	filters: {
		enabled: function(elem){
			return elem.disabled === false && elem.type !== "hidden";
		},
		disabled: function(elem){
			return elem.disabled === true;
		},
		checked: function(elem){
			return elem.checked === true;
		},
		selected: function(elem){
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			elem.parentNode.selectedIndex;
			return elem.selected === true;
		},
		parent: function(elem){
			return !!elem.firstChild;
		},
		empty: function(elem){
			return !elem.firstChild;
		},
		has: function(elem, i, match){
			return !!Sizzle( match[3], elem ).length;
		},
		header: function(elem){
			return /h\d/i.test( elem.nodeName );
		},
		text: function(elem){
			return "text" === elem.type;
		},
		radio: function(elem){
			return "radio" === elem.type;
		},
		checkbox: function(elem){
			return "checkbox" === elem.type;
		},
		file: function(elem){
			return "file" === elem.type;
		},
		password: function(elem){
			return "password" === elem.type;
		},
		submit: function(elem){
			return "submit" === elem.type;
		},
		image: function(elem){
			return "image" === elem.type;
		},
		reset: function(elem){
			return "reset" === elem.type;
		},
		button: function(elem){
			return "button" === elem.type || elem.nodeName.toUpperCase() === "BUTTON";
		},
		input: function(elem){
			return /input|select|textarea|button/i.test(elem.nodeName);
		}
	},
	setFilters: {
		first: function(elem, i){
			return i === 0;
		},
		last: function(elem, i, match, array){
			return i === array.length - 1;
		},
		even: function(elem, i){
			return i % 2 === 0;
		},
		odd: function(elem, i){
			return i % 2 === 1;
		},
		lt: function(elem, i, match){
			return i < match[3] - 0;
		},
		gt: function(elem, i, match){
			return i > match[3] - 0;
		},
		nth: function(elem, i, match){
			return match[3] - 0 == i;
		},
		eq: function(elem, i, match){
			return match[3] - 0 == i;
		}
	},
	filter: {
		PSEUDO: function(elem, match, i, array){
			var name = match[1], filter = Expr.filters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );
			} else if ( name === "contains" ) {
				return (elem.textContent || elem.innerText || "").indexOf(match[3]) >= 0;
			} else if ( name === "not" ) {
				var not = match[3];

				for ( var i = 0, l = not.length; i < l; i++ ) {
					if ( not[i] === elem ) {
						return false;
					}
				}

				return true;
			}
		},
		CHILD: function(elem, match){
			var type = match[1], node = elem;
			switch (type) {
				case 'only':
				case 'first':
					while (node = node.previousSibling)  {
						if ( node.nodeType === 1 ) return false;
					}
					if ( type == 'first') return true;
					node = elem;
				case 'last':
					while (node = node.nextSibling)  {
						if ( node.nodeType === 1 ) return false;
					}
					return true;
				case 'nth':
					var first = match[2], last = match[3];

					if ( first == 1 && last == 0 ) {
						return true;
					}
					
					var doneName = match[0],
						parent = elem.parentNode;
	
					if ( parent && (parent.sizcache !== doneName || !elem.nodeIndex) ) {
						var count = 0;
						for ( node = parent.firstChild; node; node = node.nextSibling ) {
							if ( node.nodeType === 1 ) {
								node.nodeIndex = ++count;
							}
						} 
						parent.sizcache = doneName;
					}
					
					var diff = elem.nodeIndex - last;
					if ( first == 0 ) {
						return diff == 0;
					} else {
						return ( diff % first == 0 && diff / first >= 0 );
					}
			}
		},
		ID: function(elem, match){
			return elem.nodeType === 1 && elem.getAttribute("id") === match;
		},
		TAG: function(elem, match){
			return (match === "*" && elem.nodeType === 1) || elem.nodeName === match;
		},
		CLASS: function(elem, match){
			return (" " + (elem.className || elem.getAttribute("class")) + " ")
				.indexOf( match ) > -1;
		},
		ATTR: function(elem, match){
			var name = match[1],
				result = Expr.attrHandle[ name ] ?
					Expr.attrHandle[ name ]( elem ) :
					elem[ name ] != null ?
						elem[ name ] :
						elem.getAttribute( name ),
				value = result + "",
				type = match[2],
				check = match[4];

			return result == null ?
				type === "!=" :
				type === "=" ?
				value === check :
				type === "*=" ?
				value.indexOf(check) >= 0 :
				type === "~=" ?
				(" " + value + " ").indexOf(check) >= 0 :
				!check ?
				value && result !== false :
				type === "!=" ?
				value != check :
				type === "^=" ?
				value.indexOf(check) === 0 :
				type === "$=" ?
				value.substr(value.length - check.length) === check :
				type === "|=" ?
				value === check || value.substr(0, check.length + 1) === check + "-" :
				false;
		},
		POS: function(elem, match, i, array){
			var name = match[2], filter = Expr.setFilters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );
			}
		}
	}
};

var origPOS = Expr.match.POS;

for ( var type in Expr.match ) {
	Expr.match[ type ] = RegExp( Expr.match[ type ].source + /(?![^\[]*\])(?![^\(]*\))/.source );
}

var makeArray = function(array, results) {
	array = Array.prototype.slice.call( array );

	if ( results ) {
		results.push.apply( results, array );
		return results;
	}
	
	return array;
};

// Perform a simple check to determine if the browser is capable of
// converting a NodeList to an array using builtin methods.
try {
	Array.prototype.slice.call( document.documentElement.childNodes );

// Provide a fallback method if it does not work
} catch(e){
	makeArray = function(array, results) {
		var ret = results || [];

		if ( toString.call(array) === "[object Array]" ) {
			Array.prototype.push.apply( ret, array );
		} else {
			if ( typeof array.length === "number" ) {
				for ( var i = 0, l = array.length; i < l; i++ ) {
					ret.push( array[i] );
				}
			} else {
				for ( var i = 0; array[i]; i++ ) {
					ret.push( array[i] );
				}
			}
		}

		return ret;
	};
}

var sortOrder;

if ( document.documentElement.compareDocumentPosition ) {
	sortOrder = function( a, b ) {
		var ret = a.compareDocumentPosition(b) & 4 ? -1 : a === b ? 0 : 1;
		if ( ret === 0 ) {
			hasDuplicate = true;
		}
		return ret;
	};
} else if ( "sourceIndex" in document.documentElement ) {
	sortOrder = function( a, b ) {
		var ret = a.sourceIndex - b.sourceIndex;
		if ( ret === 0 ) {
			hasDuplicate = true;
		}
		return ret;
	};
} else if ( document.createRange ) {
	sortOrder = function( a, b ) {
		var aRange = a.ownerDocument.createRange(), bRange = b.ownerDocument.createRange();
		aRange.selectNode(a);
		aRange.collapse(true);
		bRange.selectNode(b);
		bRange.collapse(true);
		var ret = aRange.compareBoundaryPoints(Range.START_TO_END, bRange);
		if ( ret === 0 ) {
			hasDuplicate = true;
		}
		return ret;
	};
}

// Check to see if the browser returns elements by name when
// querying by getElementById (and provide a workaround)
(function(){
	// We're going to inject a fake input element with a specified name
	var form = document.createElement("form"),
		id = "script" + (new Date).getTime();
	form.innerHTML = "<input name='" + id + "'/>";

	// Inject it into the root element, check its status, and remove it quickly
	var root = document.documentElement;
	root.insertBefore( form, root.firstChild );

	// The workaround has to do additional checks after a getElementById
	// Which slows things down for other browsers (hence the branching)
	if ( !!document.getElementById( id ) ) {
		Expr.find.ID = function(match, context, isXML){
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);
				return m ? m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ? [m] : undefined : [];
			}
		};

		Expr.filter.ID = function(elem, match){
			var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
			return elem.nodeType === 1 && node && node.nodeValue === match;
		};
	}

	root.removeChild( form );
})();

(function(){
	// Check to see if the browser returns only elements
	// when doing getElementsByTagName("*")

	// Create a fake element
	var div = document.createElement("div");
	div.appendChild( document.createComment("") );

	// Make sure no comments are found
	if ( div.getElementsByTagName("*").length > 0 ) {
		Expr.find.TAG = function(match, context){
			var results = context.getElementsByTagName(match[1]);

			// Filter out possible comments
			if ( match[1] === "*" ) {
				var tmp = [];

				for ( var i = 0; results[i]; i++ ) {
					if ( results[i].nodeType === 1 ) {
						tmp.push( results[i] );
					}
				}

				results = tmp;
			}

			return results;
		};
	}

	// Check to see if an attribute returns normalized href attributes
	div.innerHTML = "<a href='#'></a>";
	if ( div.firstChild && typeof div.firstChild.getAttribute !== "undefined" &&
			div.firstChild.getAttribute("href") !== "#" ) {
		Expr.attrHandle.href = function(elem){
			return elem.getAttribute("href", 2);
		};
	}
})();

if ( document.querySelectorAll ) (function(){
	var oldSizzle = Sizzle, div = document.createElement("div");
	div.innerHTML = "<p class='TEST'></p>";

	// Safari can't handle uppercase or unicode characters when
	// in quirks mode.
	if ( div.querySelectorAll && div.querySelectorAll(".TEST").length === 0 ) {
		return;
	}
	
	Sizzle = function(query, context, extra, seed){
		context = context || document;

		// Only use querySelectorAll on non-XML documents
		// (ID selectors don't work in non-HTML documents)
		if ( !seed && context.nodeType === 9 && !isXML(context) ) {
			try {
				return makeArray( context.querySelectorAll(query), extra );
			} catch(e){}
		}
		
		return oldSizzle(query, context, extra, seed);
	};

	Sizzle.find = oldSizzle.find;
	Sizzle.filter = oldSizzle.filter;
	Sizzle.selectors = oldSizzle.selectors;
	Sizzle.matches = oldSizzle.matches;
})();

if ( document.getElementsByClassName && document.documentElement.getElementsByClassName ) (function(){
	var div = document.createElement("div");
	div.innerHTML = "<div class='test e'></div><div class='test'></div>";

	// Opera can't find a second classname (in 9.6)
	if ( div.getElementsByClassName("e").length === 0 )
		return;

	// Safari caches class attributes, doesn't catch changes (in 3.2)
	div.lastChild.className = "e";

	if ( div.getElementsByClassName("e").length === 1 )
		return;

	Expr.order.splice(1, 0, "CLASS");
	Expr.find.CLASS = function(match, context, isXML) {
		if ( typeof context.getElementsByClassName !== "undefined" && !isXML ) {
			return context.getElementsByClassName(match[1]);
		}
	};
})();

function dirNodeCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	var sibDir = dir == "previousSibling" && !isXML;
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];
		if ( elem ) {
			if ( sibDir && elem.nodeType === 1 ){
				elem.sizcache = doneName;
				elem.sizset = i;
			}
			elem = elem[dir];
			var match = false;

			while ( elem ) {
				if ( elem.sizcache === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 && !isXML ){
					elem.sizcache = doneName;
					elem.sizset = i;
				}

				if ( elem.nodeName === cur ) {
					match = elem;
					break;
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

function dirCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	var sibDir = dir == "previousSibling" && !isXML;
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];
		if ( elem ) {
			if ( sibDir && elem.nodeType === 1 ) {
				elem.sizcache = doneName;
				elem.sizset = i;
			}
			elem = elem[dir];
			var match = false;

			while ( elem ) {
				if ( elem.sizcache === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 ) {
					if ( !isXML ) {
						elem.sizcache = doneName;
						elem.sizset = i;
					}
					if ( typeof cur !== "string" ) {
						if ( elem === cur ) {
							match = true;
							break;
						}

					} else if ( Sizzle.filter( cur, [elem] ).length > 0 ) {
						match = elem;
						break;
					}
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

var contains = document.compareDocumentPosition ?  function(a, b){
	return a.compareDocumentPosition(b) & 16;
} : function(a, b){
	return a !== b && (a.contains ? a.contains(b) : true);
};

var isXML = function(elem){
	return elem.nodeType === 9 && elem.documentElement.nodeName !== "HTML" ||
		!!elem.ownerDocument && isXML( elem.ownerDocument );
};

var posProcess = function(selector, context){
	var tmpSet = [], later = "", match,
		root = context.nodeType ? [context] : context;

	// Position selectors must be done after the filter
	// And so must :not(positional) so we move all PSEUDOs to the end
	while ( (match = Expr.match.PSEUDO.exec( selector )) ) {
		later += match[0];
		selector = selector.replace( Expr.match.PSEUDO, "" );
	}

	selector = Expr.relative[selector] ? selector + "*" : selector;

	for ( var i = 0, l = root.length; i < l; i++ ) {
		Sizzle( selector, root[i], tmpSet );
	}

	return Sizzle.filter( later, tmpSet );
};

// EXPOSE
jQuery.find = Sizzle;
jQuery.filter = Sizzle.filter;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.filters;

Sizzle.selectors.filters.hidden = function(elem){
	return elem.offsetWidth === 0 || elem.offsetHeight === 0;
};

Sizzle.selectors.filters.visible = function(elem){
	return elem.offsetWidth > 0 || elem.offsetHeight > 0;
};

Sizzle.selectors.filters.animated = function(elem){
	return jQuery.grep(jQuery.timers, function(fn){
		return elem === fn.elem;
	}).length;
};

jQuery.multiFilter = function( expr, elems, not ) {
	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return Sizzle.matches(expr, elems);
};

jQuery.dir = function( elem, dir ){
	var matched = [], cur = elem[dir];
	while ( cur && cur != document ) {
		if ( cur.nodeType == 1 )
			matched.push( cur );
		cur = cur[dir];
	}
	return matched;
};

jQuery.nth = function(cur, result, dir, elem){
	result = result || 1;
	var num = 0;

	for ( ; cur; cur = cur[dir] )
		if ( cur.nodeType == 1 && ++num == result )
			break;

	return cur;
};

jQuery.sibling = function(n, elem){
	var r = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType == 1 && n != elem )
			r.push( n );
	}

	return r;
};

return;

window.Sizzle = Sizzle;

})();
/*
 * A number of helper functions used for managing events.
 * Many of the ideas behind this code originated from
 * Dean Edwards' addEvent library.
 */
jQuery.event = {

	// Bind an event to an element
	// Original by Dean Edwards
	add: function(elem, types, handler, data) {
		if ( elem.nodeType == 3 || elem.nodeType == 8 )
			return;

		// For whatever reason, IE has trouble passing the window object
		// around, causing it to be cloned in the process
		if ( elem.setInterval && elem != window )
			elem = window;

		// Make sure that the function being executed has a unique ID
		if ( !handler.guid )
			handler.guid = this.guid++;

		// if data is passed, bind to handler
		if ( data !== undefined ) {
			// Create temporary function pointer to original handler
			var fn = handler;

			// Create unique handler function, wrapped around original handler
			handler = this.proxy( fn );

			// Store data in unique handler
			handler.data = data;
		}

		// Init the element's event structure
		var events = jQuery.data(elem, "events") || jQuery.data(elem, "events", {}),
			handle = jQuery.data(elem, "handle") || jQuery.data(elem, "handle", function(){
				// Handle the second event of a trigger and when
				// an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && !jQuery.event.triggered ?
					jQuery.event.handle.apply(arguments.callee.elem, arguments) :
					undefined;
			});
		// Add elem as a property of the handle function
		// This is to prevent a memory leak with non-native
		// event in IE.
		handle.elem = elem;

		// Handle multiple events separated by a space
		// jQuery(...).bind("mouseover mouseout", fn);
		jQuery.each(types.split(/\s+/), function(index, type) {
			// Namespaced event handlers
			var namespaces = type.split(".");
			type = namespaces.shift();
			handler.type = namespaces.slice().sort().join(".");

			// Get the current list of functions bound to this event
			var handlers = events[type];
			
			if ( jQuery.event.specialAll[type] )
				jQuery.event.specialAll[type].setup.call(elem, data, namespaces);

			// Init the event handler queue
			if (!handlers) {
				handlers = events[type] = {};

				// Check for a special event handler
				// Only use addEventListener/attachEvent if the special
				// events handler returns false
				if ( !jQuery.event.special[type] || jQuery.event.special[type].setup.call(elem, data, namespaces) === false ) {
					// Bind the global event handler to the element
					if (elem.addEventListener)
						elem.addEventListener(type, handle, false);
					else if (elem.attachEvent)
						elem.attachEvent("on" + type, handle);
				}
			}

			// Add the function to the element's handler list
			handlers[handler.guid] = handler;

			// Keep track of which events have been used, for global triggering
			jQuery.event.global[type] = true;
		});

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	guid: 1,
	global: {},

	// Detach an event or set of events from an element
	remove: function(elem, types, handler) {
		// don't do events on text and comment nodes
		if ( elem.nodeType == 3 || elem.nodeType == 8 )
			return;

		var events = jQuery.data(elem, "events"), ret, index;

		if ( events ) {
			// Unbind all events for the element
			if ( types === undefined || (typeof types === "string" && types.charAt(0) == ".") )
				for ( var type in events )
					this.remove( elem, type + (types || "") );
			else {
				// types is actually an event object here
				if ( types.type ) {
					handler = types.handler;
					types = types.type;
				}

				// Handle multiple events seperated by a space
				// jQuery(...).unbind("mouseover mouseout", fn);
				jQuery.each(types.split(/\s+/), function(index, type){
					// Namespaced event handlers
					var namespaces = type.split(".");
					type = namespaces.shift();
					var namespace = RegExp("(^|\\.)" + namespaces.slice().sort().join(".*\\.") + "(\\.|$)");

					if ( events[type] ) {
						// remove the given handler for the given type
						if ( handler )
							delete events[type][handler.guid];

						// remove all handlers for the given type
						else
							for ( var handle in events[type] )
								// Handle the removal of namespaced events
								if ( namespace.test(events[type][handle].type) )
									delete events[type][handle];
									
						if ( jQuery.event.specialAll[type] )
							jQuery.event.specialAll[type].teardown.call(elem, namespaces);

						// remove generic event handler if no more handlers exist
						for ( ret in events[type] ) break;
						if ( !ret ) {
							if ( !jQuery.event.special[type] || jQuery.event.special[type].teardown.call(elem, namespaces) === false ) {
								if (elem.removeEventListener)
									elem.removeEventListener(type, jQuery.data(elem, "handle"), false);
								else if (elem.detachEvent)
									elem.detachEvent("on" + type, jQuery.data(elem, "handle"));
							}
							ret = null;
							delete events[type];
						}
					}
				});
			}

			// Remove the expando if it's no longer used
			for ( ret in events ) break;
			if ( !ret ) {
				var handle = jQuery.data( elem, "handle" );
				if ( handle ) handle.elem = null;
				jQuery.removeData( elem, "events" );
				jQuery.removeData( elem, "handle" );
			}
		}
	},

	// bubbling is internal
	trigger: function( event, data, elem, bubbling ) {
		// Event object or event type
		var type = event.type || event;

		if( !bubbling ){
			event = typeof event === "object" ?
				// jQuery.Event object
				event[expando] ? event :
				// Object literal
				jQuery.extend( jQuery.Event(type), event ) :
				// Just the event type (string)
				jQuery.Event(type);

			if ( type.indexOf("!") >= 0 ) {
				event.type = type = type.slice(0, -1);
				event.exclusive = true;
			}

			// Handle a global trigger
			if ( !elem ) {
				// Don't bubble custom events when global (to avoid too much overhead)
				event.stopPropagation();
				// Only trigger if we've ever bound an event for it
				if ( this.global[type] )
					jQuery.each( jQuery.cache, function(){
						if ( this.events && this.events[type] )
							jQuery.event.trigger( event, data, this.handle.elem );
					});
			}

			// Handle triggering a single element

			// don't do events on text and comment nodes
			if ( !elem || elem.nodeType == 3 || elem.nodeType == 8 )
				return undefined;
			
			// Clean up in case it is reused
			event.result = undefined;
			event.target = elem;
			
			// Clone the incoming data, if any
			data = jQuery.makeArray(data);
			data.unshift( event );
		}

		event.currentTarget = elem;

		// Trigger the event, it is assumed that "handle" is a function
		var handle = jQuery.data(elem, "handle");
		if ( handle )
			handle.apply( elem, data );

		// Handle triggering native .onfoo handlers (and on links since we don't call .click() for links)
		if ( (!elem[type] || (jQuery.nodeName(elem, 'a') && type == "click")) && elem["on"+type] && elem["on"+type].apply( elem, data ) === false )
			event.result = false;

		// Trigger the native events (except for clicks on links)
		if ( !bubbling && elem[type] && !event.isDefaultPrevented() && !(jQuery.nodeName(elem, 'a') && type == "click") ) {
			this.triggered = true;
			try {
				elem[ type ]();
			// prevent IE from throwing an error for some hidden elements
			} catch (e) {}
		}

		this.triggered = false;

		if ( !event.isPropagationStopped() ) {
			var parent = elem.parentNode || elem.ownerDocument;
			if ( parent )
				jQuery.event.trigger(event, data, parent, true);
		}
	},

	handle: function(event) {
		// returned undefined or false
		var all, handlers;

		event = arguments[0] = jQuery.event.fix( event || window.event );
		event.currentTarget = this;
		
		// Namespaced event handlers
		var namespaces = event.type.split(".");
		event.type = namespaces.shift();

		// Cache this now, all = true means, any handler
		all = !namespaces.length && !event.exclusive;
		
		var namespace = RegExp("(^|\\.)" + namespaces.slice().sort().join(".*\\.") + "(\\.|$)");

		handlers = ( jQuery.data(this, "events") || {} )[event.type];

		for ( var j in handlers ) {
			var handler = handlers[j];

			// Filter the functions by class
			if ( all || namespace.test(handler.type) ) {
				// Pass in a reference to the handler function itself
				// So that we can later remove it
				event.handler = handler;
				event.data = handler.data;

				var ret = handler.apply(this, arguments);

				if( ret !== undefined ){
					event.result = ret;
					if ( ret === false ) {
						event.preventDefault();
						event.stopPropagation();
					}
				}

				if( event.isImmediatePropagationStopped() )
					break;

			}
		}
	},

	props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),

	fix: function(event) {
		if ( event[expando] )
			return event;

		// store a copy of the original event object
		// and "clone" to set read-only properties
		var originalEvent = event;
		event = jQuery.Event( originalEvent );

		for ( var i = this.props.length, prop; i; ){
			prop = this.props[ --i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Fix target property, if necessary
		if ( !event.target )
			event.target = event.srcElement || document; // Fixes #1925 where srcElement might not be defined either

		// check if target is a textnode (safari)
		if ( event.target.nodeType == 3 )
			event.target = event.target.parentNode;

		// Add relatedTarget, if necessary
		if ( !event.relatedTarget && event.fromElement )
			event.relatedTarget = event.fromElement == event.target ? event.toElement : event.fromElement;

		// Calculate pageX/Y if missing and clientX/Y available
		if ( event.pageX == null && event.clientX != null ) {
			var doc = document.documentElement, body = document.body;
			event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc.clientLeft || 0);
			event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc.clientTop || 0);
		}

		// Add which for key events
		if ( !event.which && ((event.charCode || event.charCode === 0) ? event.charCode : event.keyCode) )
			event.which = event.charCode || event.keyCode;

		// Add metaKey to non-Mac browsers (use ctrl for PC's and Meta for Macs)
		if ( !event.metaKey && event.ctrlKey )
			event.metaKey = event.ctrlKey;

		// Add which for click: 1 == left; 2 == middle; 3 == right
		// Note: button is not normalized, so don't use it
		if ( !event.which && event.button )
			event.which = (event.button & 1 ? 1 : ( event.button & 2 ? 3 : ( event.button & 4 ? 2 : 0 ) ));

		return event;
	},

	proxy: function( fn, proxy ){
		proxy = proxy || function(){ return fn.apply(this, arguments); };
		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || proxy.guid || this.guid++;
		// So proxy can be declared as an argument
		return proxy;
	},

	special: {
		ready: {
			// Make sure the ready event is setup
			setup: bindReady,
			teardown: function() {}
		}
	},
	
	specialAll: {
		live: {
			setup: function( selector, namespaces ){
				jQuery.event.add( this, namespaces[0], liveHandler );
			},
			teardown:  function( namespaces ){
				if ( namespaces.length ) {
					var remove = 0, name = RegExp("(^|\\.)" + namespaces[0] + "(\\.|$)");
					
					jQuery.each( (jQuery.data(this, "events").live || {}), function(){
						if ( name.test(this.type) )
							remove++;
					});
					
					if ( remove < 1 )
						jQuery.event.remove( this, namespaces[0], liveHandler );
				}
			}
		}
	}
};

jQuery.Event = function( src ){
	// Allow instantiation without the 'new' keyword
	if( !this.preventDefault )
		return new jQuery.Event(src);
	
	// Event object
	if( src && src.type ){
		this.originalEvent = src;
		this.type = src.type;
	// Event type
	}else
		this.type = src;

	// timeStamp is buggy for some events on Firefox(#3843)
	// So we won't rely on the native value
	this.timeStamp = now();
	
	// Mark it as fixed
	this[expando] = true;
};

function returnFalse(){
	return false;
}
function returnTrue(){
	return true;
}

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	preventDefault: function() {
		this.isDefaultPrevented = returnTrue;

		var e = this.originalEvent;
		if( !e )
			return;
		// if preventDefault exists run it on the original event
		if (e.preventDefault)
			e.preventDefault();
		// otherwise set the returnValue property of the original event to false (IE)
		e.returnValue = false;
	},
	stopPropagation: function() {
		this.isPropagationStopped = returnTrue;

		var e = this.originalEvent;
		if( !e )
			return;
		// if stopPropagation exists run it on the original event
		if (e.stopPropagation)
			e.stopPropagation();
		// otherwise set the cancelBubble property of the original event to true (IE)
		e.cancelBubble = true;
	},
	stopImmediatePropagation:function(){
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	},
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse
};
// Checks if an event happened on an element within another element
// Used in jQuery.event.special.mouseenter and mouseleave handlers
var withinElement = function(event) {
	// Check if mouse(over|out) are still within the same parent element
	var parent = event.relatedTarget;
	// Traverse up the tree
	while ( parent && parent != this )
		try { parent = parent.parentNode; }
		catch(e) { parent = this; }
	
	if( parent != this ){
		// set the correct event type
		event.type = event.data;
		// handle event if we actually just moused on to a non sub-element
		jQuery.event.handle.apply( this, arguments );
	}
};
	
jQuery.each({ 
	mouseover: 'mouseenter', 
	mouseout: 'mouseleave'
}, function( orig, fix ){
	jQuery.event.special[ fix ] = {
		setup: function(){
			jQuery.event.add( this, orig, withinElement, fix );
		},
		teardown: function(){
			jQuery.event.remove( this, orig, withinElement );
		}
	};			   
});

jQuery.fn.extend({
	bind: function( type, data, fn ) {
		return type == "unload" ? this.one(type, data, fn) : this.each(function(){
			jQuery.event.add( this, type, fn || data, fn && data );
		});
	},

	one: function( type, data, fn ) {
		var one = jQuery.event.proxy( fn || data, function(event) {
			jQuery(this).unbind(event, one);
			return (fn || data).apply( this, arguments );
		});
		return this.each(function(){
			jQuery.event.add( this, type, one, fn && data);
		});
	},

	unbind: function( type, fn ) {
		return this.each(function(){
			jQuery.event.remove( this, type, fn );
		});
	},

	trigger: function( type, data ) {
		return this.each(function(){
			jQuery.event.trigger( type, data, this );
		});
	},

	triggerHandler: function( type, data ) {
		if( this[0] ){
			var event = jQuery.Event(type);
			event.preventDefault();
			event.stopPropagation();
			jQuery.event.trigger( event, data, this[0] );
			return event.result;
		}		
	},

	toggle: function( fn ) {
		// Save reference to arguments for access in closure
		var args = arguments, i = 1;

		// link all the functions, so any of them can unbind this click handler
		while( i < args.length )
			jQuery.event.proxy( fn, args[i++] );

		return this.click( jQuery.event.proxy( fn, function(event) {
			// Figure out which function to execute
			this.lastToggle = ( this.lastToggle || 0 ) % i;

			// Make sure that clicks stop
			event.preventDefault();

			// and execute the function
			return args[ this.lastToggle++ ].apply( this, arguments ) || false;
		}));
	},

	hover: function(fnOver, fnOut) {
		return this.mouseenter(fnOver).mouseleave(fnOut);
	},

	ready: function(fn) {
		// Attach the listeners
		bindReady();

		// If the DOM is already ready
		if ( jQuery.isReady )
			// Execute the function immediately
			fn.call( document, jQuery );

		// Otherwise, remember the function for later
		else
			// Add the function to the wait list
			jQuery.readyList.push( fn );

		return this;
	},
	
	live: function( type, fn ){
		var proxy = jQuery.event.proxy( fn );
		proxy.guid += this.selector + type;

		jQuery(document).bind( liveConvert(type, this.selector), this.selector, proxy );

		return this;
	},
	
	die: function( type, fn ){
		jQuery(document).unbind( liveConvert(type, this.selector), fn ? { guid: fn.guid + this.selector + type } : null );
		return this;
	}
});

function liveHandler( event ){
	var check = RegExp("(^|\\.)" + event.type + "(\\.|$)"),
		stop = true,
		elems = [];

	jQuery.each(jQuery.data(this, "events").live || [], function(i, fn){
		if ( check.test(fn.type) ) {
			var elem = jQuery(event.target).closest(fn.data)[0];
			if ( elem )
				elems.push({ elem: elem, fn: fn });
		}
	});

	elems.sort(function(a,b) {
		return jQuery.data(a.elem, "closest") - jQuery.data(b.elem, "closest");
	});
	
	jQuery.each(elems, function(){
		if ( this.fn.call(this.elem, event, this.fn.data) === false )
			return (stop = false);
	});

	return stop;
}

function liveConvert(type, selector){
	return ["live", type, selector.replace(/\./g, "`").replace(/ /g, "|")].join(".");
}

jQuery.extend({
	isReady: false,
	readyList: [],
	// Handle when the DOM is ready
	ready: function() {
		// Make sure that the DOM is not already loaded
		if ( !jQuery.isReady ) {
			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If there are functions bound, to execute
			if ( jQuery.readyList ) {
				// Execute all of them
				jQuery.each( jQuery.readyList, function(){
					this.call( document, jQuery );
				});

				// Reset the list of functions
				jQuery.readyList = null;
			}

			// Trigger any bound ready events
			jQuery(document).triggerHandler("ready");
		}
	}
});

var readyBound = false;

function bindReady(){
	if ( readyBound ) return;
	readyBound = true;

	// Mozilla, Opera and webkit nightlies currently support this event
	if ( document.addEventListener ) {
		// Use the handy event callback
		document.addEventListener( "DOMContentLoaded", function(){
			document.removeEventListener( "DOMContentLoaded", arguments.callee, false );
			jQuery.ready();
		}, false );

	// If IE event model is used
	} else if ( document.attachEvent ) {
		// ensure firing before onload,
		// maybe late but safe also for iframes
		document.attachEvent("onreadystatechange", function(){
			if ( document.readyState === "complete" ) {
				document.detachEvent( "onreadystatechange", arguments.callee );
				jQuery.ready();
			}
		});

		// If IE and not an iframe
		// continually check to see if the document is ready
		if ( document.documentElement.doScroll && window == window.top ) (function(){
			if ( jQuery.isReady ) return;

			try {
				// If IE is used, use the trick by Diego Perini
				// http://javascript.nwbox.com/IEContentLoaded/
				document.documentElement.doScroll("left");
			} catch( error ) {
				setTimeout( arguments.callee, 0 );
				return;
			}

			// and execute any waiting functions
			jQuery.ready();
		})();
	}

	// A fallback to window.onload, that will always work
	jQuery.event.add( window, "load", jQuery.ready );
}

jQuery.each( ("blur,focus,load,resize,scroll,unload,click,dblclick," +
	"mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave," +
	"change,select,submit,keydown,keypress,keyup,error").split(","), function(i, name){

	// Handle event binding
	jQuery.fn[name] = function(fn){
		return fn ? this.bind(name, fn) : this.trigger(name);
	};
});

// Prevent memory leaks in IE
// And prevent errors on refresh with events like mouseover in other browsers
// Window isn't included so as not to unbind existing unload events
jQuery( window ).bind( 'unload', function(){ 
	for ( var id in jQuery.cache )
		// Skip the window
		if ( id != 1 && jQuery.cache[ id ].handle )
			jQuery.event.remove( jQuery.cache[ id ].handle.elem );
}); 
(function(){

	jQuery.support = {};

	var root = document.documentElement,
		script = document.createElement("script"),
		div = document.createElement("div"),
		id = "script" + (new Date).getTime();

	div.style.display = "none";
	div.innerHTML = '   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';

	var all = div.getElementsByTagName("*"),
		a = div.getElementsByTagName("a")[0];

	// Can't get basic test support
	if ( !all || !all.length || !a ) {
		return;
	}

	jQuery.support = {
		// IE strips leading whitespace when .innerHTML is used
		leadingWhitespace: div.firstChild.nodeType == 3,
		
		// Make sure that tbody elements aren't automatically inserted
		// IE will insert them into empty tables
		tbody: !div.getElementsByTagName("tbody").length,
		
		// Make sure that you can get all elements in an <object> element
		// IE 7 always returns no results
		objectAll: !!div.getElementsByTagName("object")[0]
			.getElementsByTagName("*").length,
		
		// Make sure that link elements get serialized correctly by innerHTML
		// This requires a wrapper element in IE
		htmlSerialize: !!div.getElementsByTagName("link").length,
		
		// Get the style information from getAttribute
		// (IE uses .cssText insted)
		style: /red/.test( a.getAttribute("style") ),
		
		// Make sure that URLs aren't manipulated
		// (IE normalizes it by default)
		hrefNormalized: a.getAttribute("href") === "/a",
		
		// Make sure that element opacity exists
		// (IE uses filter instead)
		opacity: a.style.opacity === "0.5",
		
		// Verify style float existence
		// (IE uses styleFloat instead of cssFloat)
		cssFloat: !!a.style.cssFloat,

		// Will be defined later
		scriptEval: false,
		noCloneEvent: true,
		boxModel: null
	};
	
	script.type = "text/javascript";
	try {
		script.appendChild( document.createTextNode( "window." + id + "=1;" ) );
	} catch(e){}

	root.insertBefore( script, root.firstChild );
	
	// Make sure that the execution of code works by injecting a script
	// tag with appendChild/createTextNode
	// (IE doesn't support this, fails, and uses .text instead)
	if ( window[ id ] ) {
		jQuery.support.scriptEval = true;
		delete window[ id ];
	}

	root.removeChild( script );

	if ( div.attachEvent && div.fireEvent ) {
		div.attachEvent("onclick", function(){
			// Cloning a node shouldn't copy over any
			// bound event handlers (IE does this)
			jQuery.support.noCloneEvent = false;
			div.detachEvent("onclick", arguments.callee);
		});
		div.cloneNode(true).fireEvent("onclick");
	}

	// Figure out if the W3C box model works as expected
	// document.body must exist before we can do this
	jQuery(function(){
		var div = document.createElement("div");
		div.style.width = div.style.paddingLeft = "1px";

		document.body.appendChild( div );
		jQuery.boxModel = jQuery.support.boxModel = div.offsetWidth === 2;
		document.body.removeChild( div ).style.display = 'none';
	});
})();

var styleFloat = jQuery.support.cssFloat ? "cssFloat" : "styleFloat";

jQuery.props = {
	"for": "htmlFor",
	"class": "className",
	"float": styleFloat,
	cssFloat: styleFloat,
	styleFloat: styleFloat,
	readonly: "readOnly",
	maxlength: "maxLength",
	cellspacing: "cellSpacing",
	rowspan: "rowSpan",
	tabindex: "tabIndex"
};
jQuery.fn.extend({
	// Keep a copy of the old load
	_load: jQuery.fn.load,

	load: function( url, params, callback ) {
		if ( typeof url !== "string" )
			return this._load( url );

		var off = url.indexOf(" ");
		if ( off >= 0 ) {
			var selector = url.slice(off, url.length);
			url = url.slice(0, off);
		}

		// Default to a GET request
		var type = "GET";

		// If the second parameter was provided
		if ( params )
			// If it's a function
			if ( jQuery.isFunction( params ) ) {
				// We assume that it's the callback
				callback = params;
				params = null;

			// Otherwise, build a param string
			} else if( typeof params === "object" ) {
				params = jQuery.param( params );
				type = "POST";
			}

		var self = this;

		// Request the remote document
		jQuery.ajax({
			url: url,
			type: type,
			dataType: "html",
			data: params,
			complete: function(res, status){
				// If successful, inject the HTML into all the matched elements
				if ( status == "success" || status == "notmodified" )
					// See if a selector was specified
					self.html( selector ?
						// Create a dummy div to hold the results
						jQuery("<div/>")
							// inject the contents of the document in, removing the scripts
							// to avoid any 'Permission Denied' errors in IE
							.append(res.responseText.replace(/<script(.|\s)*?\/script>/g, ""))

							// Locate the specified elements
							.find(selector) :

						// If not, just inject the full result
						res.responseText );

				if( callback )
					self.each( callback, [res.responseText, status, res] );
			}
		});
		return this;
	},

	serialize: function() {
		return jQuery.param(this.serializeArray());
	},
	serializeArray: function() {
		return this.map(function(){
			return this.elements ? jQuery.makeArray(this.elements) : this;
		})
		.filter(function(){
			return this.name && !this.disabled &&
				(this.checked || /select|textarea/i.test(this.nodeName) ||
					/text|hidden|password|search/i.test(this.type));
		})
		.map(function(i, elem){
			var val = jQuery(this).val();
			return val == null ? null :
				jQuery.isArray(val) ?
					jQuery.map( val, function(val, i){
						return {name: elem.name, value: val};
					}) :
					{name: elem.name, value: val};
		}).get();
	}
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( "ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","), function(i,o){
	jQuery.fn[o] = function(f){
		return this.bind(o, f);
	};
});

var jsc = now();

jQuery.extend({
  
	get: function( url, data, callback, type ) {
		// shift arguments if data argument was ommited
		if ( jQuery.isFunction( data ) ) {
			callback = data;
			data = null;
		}

		return jQuery.ajax({
			type: "GET",
			url: url,
			data: data,
			success: callback,
			dataType: type
		});
	},

	getScript: function( url, callback ) {
		return jQuery.get(url, null, callback, "script");
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get(url, data, callback, "json");
	},

	post: function( url, data, callback, type ) {
		if ( jQuery.isFunction( data ) ) {
			callback = data;
			data = {};
		}

		return jQuery.ajax({
			type: "POST",
			url: url,
			data: data,
			success: callback,
			dataType: type
		});
	},

	ajaxSetup: function( settings ) {
		jQuery.extend( jQuery.ajaxSettings, settings );
	},

	ajaxSettings: {
		url: location.href,
		global: true,
		type: "GET",
		contentType: "application/x-www-form-urlencoded",
		processData: true,
		async: true,
		/*
		timeout: 0,
		data: null,
		username: null,
		password: null,
		*/
		// Create the request object; Microsoft failed to properly
		// implement the XMLHttpRequest in IE7, so we use the ActiveXObject when it is available
		// This function can be overriden by calling jQuery.ajaxSetup
		xhr:function(){
			return window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
		},
		accepts: {
			xml: "application/xml, text/xml",
			html: "text/html",
			script: "text/javascript, application/javascript",
			json: "application/json, text/javascript",
			text: "text/plain",
			_default: "*/*"
		}
	},

	// Last-Modified header cache for next request
	lastModified: {},

	ajax: function( s ) {
		// Extend the settings, but re-extend 's' so that it can be
		// checked again later (in the test suite, specifically)
		s = jQuery.extend(true, s, jQuery.extend(true, {}, jQuery.ajaxSettings, s));

		var jsonp, jsre = /=\?(&|$)/g, status, data,
			type = s.type.toUpperCase();

		// convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" )
			s.data = jQuery.param(s.data);

		// Handle JSONP Parameter Callbacks
		if ( s.dataType == "jsonp" ) {
			if ( type == "GET" ) {
				if ( !s.url.match(jsre) )
					s.url += (s.url.match(/\?/) ? "&" : "?") + (s.jsonp || "callback") + "=?";
			} else if ( !s.data || !s.data.match(jsre) )
				s.data = (s.data ? s.data + "&" : "") + (s.jsonp || "callback") + "=?";
			s.dataType = "json";
		}

		// Build temporary JSONP function
		if ( s.dataType == "json" && (s.data && s.data.match(jsre) || s.url.match(jsre)) ) {
			jsonp = "jsonp" + jsc++;

			// Replace the =? sequence both in the query string and the data
			if ( s.data )
				s.data = (s.data + "").replace(jsre, "=" + jsonp + "$1");
			s.url = s.url.replace(jsre, "=" + jsonp + "$1");

			// We need to make sure
			// that a JSONP style response is executed properly
			s.dataType = "script";

			// Handle JSONP-style loading
			window[ jsonp ] = function(tmp){
				data = tmp;
				success();
				complete();
				// Garbage collect
				window[ jsonp ] = undefined;
				try{ delete window[ jsonp ]; } catch(e){}
				if ( head )
					head.removeChild( script );
			};
		}

		if ( s.dataType == "script" && s.cache == null )
			s.cache = false;

		if ( s.cache === false && type == "GET" ) {
			var ts = now();
			// try replacing _= if it is there
			var ret = s.url.replace(/(\?|&)_=.*?(&|$)/, "$1_=" + ts + "$2");
			// if nothing was replaced, add timestamp to the end
			s.url = ret + ((ret == s.url) ? (s.url.match(/\?/) ? "&" : "?") + "_=" + ts : "");
		}

		// If data is available, append data to url for get requests
		if ( s.data && type == "GET" ) {
			s.url += (s.url.match(/\?/) ? "&" : "?") + s.data;

			// IE likes to send both get and post data, prevent this
			s.data = null;
		}

		// Watch for a new set of requests
		if ( s.global && ! jQuery.active++ )
			jQuery.event.trigger( "ajaxStart" );

		// Matches an absolute URL, and saves the domain
		var parts = /^(\w+:)?\/\/([^\/?#]+)/.exec( s.url );

		// If we're requesting a remote document
		// and trying to load JSON or Script with a GET
		if ( s.dataType == "script" && type == "GET" && parts
			&& ( parts[1] && parts[1] != location.protocol || parts[2] != location.host )){

			var head = document.getElementsByTagName("head")[0];
			var script = document.createElement("script");
			script.src = s.url;
			if (s.scriptCharset)
				script.charset = s.scriptCharset;

			// Handle Script loading
			if ( !jsonp ) {
				var done = false;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function(){
					if ( !done && (!this.readyState ||
							this.readyState == "loaded" || this.readyState == "complete") ) {
						done = true;
						success();
						complete();

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;
						head.removeChild( script );
					}
				};
			}

			head.appendChild(script);

			// We handle everything using the script element injection
			return undefined;
		}

		var requestDone = false;

		// Create the request object
		var xhr = s.xhr();

		// Open the socket
		// Passing null username, generates a login popup on Opera (#2865)
		if( s.username )
			xhr.open(type, s.url, s.async, s.username, s.password);
		else
			xhr.open(type, s.url, s.async);

		// Need an extra try/catch for cross domain requests in Firefox 3
		try {
			// Set the correct header, if data is being sent
			if ( s.data )
				xhr.setRequestHeader("Content-Type", s.contentType);

			// Set the If-Modified-Since header, if ifModified mode.
			if ( s.ifModified )
				xhr.setRequestHeader("If-Modified-Since",
					jQuery.lastModified[s.url] || "Thu, 01 Jan 1970 00:00:00 GMT" );

			// Set header so the called script knows that it's an XMLHttpRequest
			xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

			// Set the Accepts header for the server, depending on the dataType
			xhr.setRequestHeader("Accept", s.dataType && s.accepts[ s.dataType ] ?
				s.accepts[ s.dataType ] + ", */*" :
				s.accepts._default );
		} catch(e){}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && s.beforeSend(xhr, s) === false ) {
			// Handle the global AJAX counter
			if ( s.global && ! --jQuery.active )
				jQuery.event.trigger( "ajaxStop" );
			// close opended socket
			xhr.abort();
			return false;
		}

		if ( s.global )
			jQuery.event.trigger("ajaxSend", [xhr, s]);

		// Wait for a response to come back
		var onreadystatechange = function(isTimeout){
			// The request was aborted, clear the interval and decrement jQuery.active
			if (xhr.readyState == 0) {
				if (ival) {
					// clear poll interval
					clearInterval(ival);
					ival = null;
					// Handle the global AJAX counter
					if ( s.global && ! --jQuery.active )
						jQuery.event.trigger( "ajaxStop" );
				}
			// The transfer is complete and the data is available, or the request timed out
			} else if ( !requestDone && xhr && (xhr.readyState == 4 || isTimeout == "timeout") ) {
				requestDone = true;

				// clear poll interval
				if (ival) {
					clearInterval(ival);
					ival = null;
				}

				status = isTimeout == "timeout" ? "timeout" :
					!jQuery.httpSuccess( xhr ) ? "error" :
					s.ifModified && jQuery.httpNotModified( xhr, s.url ) ? "notmodified" :
					"success";

				if ( status == "success" ) {
					// Watch for, and catch, XML document parse errors
					try {
						// process the data (runs the xml through httpData regardless of callback)
						data = jQuery.httpData( xhr, s.dataType, s );
					} catch(e) {
						status = "parsererror";
					}
				}

				// Make sure that the request was successful or notmodified
				if ( status == "success" ) {
					// Cache Last-Modified header, if ifModified mode.
					var modRes;
					try {
						modRes = xhr.getResponseHeader("Last-Modified");
					} catch(e) {} // swallow exception thrown by FF if header is not available

					if ( s.ifModified && modRes )
						jQuery.lastModified[s.url] = modRes;

					// JSONP handles its own success callback
					if ( !jsonp )
						success();
				} else
					jQuery.handleError(s, xhr, status);

				// Fire the complete handlers
				complete();

				if ( isTimeout )
					xhr.abort();

				// Stop memory leaks
				if ( s.async )
					xhr = null;
			}
		};

		if ( s.async ) {
			// don't attach the handler to the request, just poll it instead
			var ival = setInterval(onreadystatechange, 13);

			// Timeout checker
			if ( s.timeout > 0 )
				setTimeout(function(){
					// Check to see if the request is still happening
					if ( xhr && !requestDone )
						onreadystatechange( "timeout" );
				}, s.timeout);
		}

		// Send the data
		try {
			xhr.send(s.data);
		} catch(e) {
			jQuery.handleError(s, xhr, null, e);
		}

		// firefox 1.5 doesn't fire statechange for sync requests
		if ( !s.async )
			onreadystatechange();

		function success(){
			// If a local callback was specified, fire it and pass it the data
			if ( s.success )
				s.success( data, status );

			// Fire the global callback
			if ( s.global )
				jQuery.event.trigger( "ajaxSuccess", [xhr, s] );
		}

		function complete(){
			// Process result
			if ( s.complete )
				s.complete(xhr, status);

			// The request was completed
			if ( s.global )
				jQuery.event.trigger( "ajaxComplete", [xhr, s] );

			// Handle the global AJAX counter
			if ( s.global && ! --jQuery.active )
				jQuery.event.trigger( "ajaxStop" );
		}

		// return XMLHttpRequest to allow aborting the request etc.
		return xhr;
	},

	handleError: function( s, xhr, status, e ) {
		// If a local callback was specified, fire it
		if ( s.error ) s.error( xhr, status, e );

		// Fire the global callback
		if ( s.global )
			jQuery.event.trigger( "ajaxError", [xhr, s, e] );
	},

	// Counter for holding the number of active queries
	active: 0,

	// Determines if an XMLHttpRequest was successful or not
	httpSuccess: function( xhr ) {
		try {
			// IE error sometimes returns 1223 when it should be 204 so treat it as success, see #1450
			return !xhr.status && location.protocol == "file:" ||
				( xhr.status >= 200 && xhr.status < 300 ) || xhr.status == 304 || xhr.status == 1223;
		} catch(e){}
		return false;
	},

	// Determines if an XMLHttpRequest returns NotModified
	httpNotModified: function( xhr, url ) {
		try {
			var xhrRes = xhr.getResponseHeader("Last-Modified");

			// Firefox always returns 200. check Last-Modified date
			return xhr.status == 304 || xhrRes == jQuery.lastModified[url];
		} catch(e){}
		return false;
	},

	httpData: function( xhr, type, s ) {
		var ct = xhr.getResponseHeader("content-type"),
			xml = type == "xml" || !type && ct && ct.indexOf("xml") >= 0,
			data = xml ? xhr.responseXML : xhr.responseText;

		if ( xml && data.documentElement.tagName == "parsererror" )
			throw "parsererror";
			
		// Allow a pre-filtering function to sanitize the response
		// s != null is checked to keep backwards compatibility
		if( s && s.dataFilter )
			data = s.dataFilter( data, type );

		// The filter can actually parse the response
		if( typeof data === "string" ){

			// If the type is "script", eval it in global context
			if ( type == "script" )
				jQuery.globalEval( data );

			// Get the JavaScript object, if JSON is used.
			if ( type == "json" )
				data = window["eval"]("(" + data + ")");
		}
		
		return data;
	},

	// Serialize an array of form elements or a set of
	// key/values into a query string
	param: function( a ) {
		var s = [ ];

		function add( key, value ){
			s[ s.length ] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
		};

		// If an array was passed in, assume that it is an array
		// of form elements
		if ( jQuery.isArray(a) || a.jquery )
			// Serialize the form elements
			jQuery.each( a, function(){
				add( this.name, this.value );
			});

		// Otherwise, assume that it's an object of key/value pairs
		else
			// Serialize the key/values
			for ( var j in a )
				// If the value is an array then the key names need to be repeated
				if ( jQuery.isArray(a[j]) )
					jQuery.each( a[j], function(){
						add( j, this );
					});
				else
					add( j, jQuery.isFunction(a[j]) ? a[j]() : a[j] );

		// Return the resulting serialization
		return s.join("&").replace(/%20/g, "+");
	}

});
var elemdisplay = {},
	timerId,
	fxAttrs = [
		// height animations
		[ "height", "marginTop", "marginBottom", "paddingTop", "paddingBottom" ],
		// width animations
		[ "width", "marginLeft", "marginRight", "paddingLeft", "paddingRight" ],
		// opacity animations
		[ "opacity" ]
	];

function genFx( type, num ){
	var obj = {};
	jQuery.each( fxAttrs.concat.apply([], fxAttrs.slice(0,num)), function(){
		obj[ this ] = type;
	});
	return obj;
}

jQuery.fn.extend({
	show: function(speed,callback){
		if ( speed ) {
			return this.animate( genFx("show", 3), speed, callback);
		} else {
			for ( var i = 0, l = this.length; i < l; i++ ){
				var old = jQuery.data(this[i], "olddisplay");
				
				this[i].style.display = old || "";
				
				if ( jQuery.css(this[i], "display") === "none" ) {
					var tagName = this[i].tagName, display;
					
					if ( elemdisplay[ tagName ] ) {
						display = elemdisplay[ tagName ];
					} else {
						var elem = jQuery("<" + tagName + " />").appendTo("body");
						
						display = elem.css("display");
						if ( display === "none" )
							display = "block";
						
						elem.remove();
						
						elemdisplay[ tagName ] = display;
					}
					
					jQuery.data(this[i], "olddisplay", display);
				}
			}

			// Set the display of the elements in a second loop
			// to avoid the constant reflow
			for ( var i = 0, l = this.length; i < l; i++ ){
				this[i].style.display = jQuery.data(this[i], "olddisplay") || "";
			}
			
			return this;
		}
	},

	hide: function(speed,callback){
		if ( speed ) {
			return this.animate( genFx("hide", 3), speed, callback);
		} else {
			for ( var i = 0, l = this.length; i < l; i++ ){
				var old = jQuery.data(this[i], "olddisplay");
				if ( !old && old !== "none" )
					jQuery.data(this[i], "olddisplay", jQuery.css(this[i], "display"));
			}

			// Set the display of the elements in a second loop
			// to avoid the constant reflow
			for ( var i = 0, l = this.length; i < l; i++ ){
				this[i].style.display = "none";
			}

			return this;
		}
	},

	// Save the old toggle function
	_toggle: jQuery.fn.toggle,

	toggle: function( fn, fn2 ){
		var bool = typeof fn === "boolean";

		return jQuery.isFunction(fn) && jQuery.isFunction(fn2) ?
			this._toggle.apply( this, arguments ) :
			fn == null || bool ?
				this.each(function(){
					var state = bool ? fn : jQuery(this).is(":hidden");
					jQuery(this)[ state ? "show" : "hide" ]();
				}) :
				this.animate(genFx("toggle", 3), fn, fn2);
	},

	fadeTo: function(speed,to,callback){
		return this.animate({opacity: to}, speed, callback);
	},

	animate: function( prop, speed, easing, callback ) {
		var optall = jQuery.speed(speed, easing, callback);

		return this[ optall.queue === false ? "each" : "queue" ](function(){
		
			var opt = jQuery.extend({}, optall), p,
				hidden = this.nodeType == 1 && jQuery(this).is(":hidden"),
				self = this;
	
			for ( p in prop ) {
				if ( prop[p] == "hide" && hidden || prop[p] == "show" && !hidden )
					return opt.complete.call(this);

				if ( ( p == "height" || p == "width" ) && this.style ) {
					// Store display property
					opt.display = jQuery.css(this, "display");

					// Make sure that nothing sneaks out
					opt.overflow = this.style.overflow;
				}
			}

			if ( opt.overflow != null )
				this.style.overflow = "hidden";

			opt.curAnim = jQuery.extend({}, prop);

			jQuery.each( prop, function(name, val){
				var e = new jQuery.fx( self, opt, name );

				if ( /toggle|show|hide/.test(val) )
					e[ val == "toggle" ? hidden ? "show" : "hide" : val ]( prop );
				else {
					var parts = val.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),
						start = e.cur(true) || 0;

					if ( parts ) {
						var end = parseFloat(parts[2]),
							unit = parts[3] || "px";

						// We need to compute starting value
						if ( unit != "px" ) {
							self.style[ name ] = (end || 1) + unit;
							start = ((end || 1) / e.cur(true)) * start;
							self.style[ name ] = start + unit;
						}

						// If a +=/-= token was provided, we're doing a relative animation
						if ( parts[1] )
							end = ((parts[1] == "-=" ? -1 : 1) * end) + start;

						e.custom( start, end, unit );
					} else
						e.custom( start, val, "" );
				}
			});

			// For JS strict compliance
			return true;
		});
	},

	stop: function(clearQueue, gotoEnd){
		var timers = jQuery.timers;

		if (clearQueue)
			this.queue([]);

		this.each(function(){
			// go in reverse order so anything added to the queue during the loop is ignored
			for ( var i = timers.length - 1; i >= 0; i-- )
				if ( timers[i].elem == this ) {
					if (gotoEnd)
						// force the next step to be the last
						timers[i](true);
					timers.splice(i, 1);
				}
		});

		// start the next in the queue if the last step wasn't forced
		if (!gotoEnd)
			this.dequeue();

		return this;
	}

});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show", 1),
	slideUp: genFx("hide", 1),
	slideToggle: genFx("toggle", 1),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" }
}, function( name, props ){
	jQuery.fn[ name ] = function( speed, callback ){
		return this.animate( props, speed, callback );
	};
});

jQuery.extend({

	speed: function(speed, easing, fn) {
		var opt = typeof speed === "object" ? speed : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
			jQuery.fx.speeds[opt.duration] || jQuery.fx.speeds._default;

		// Queueing
		opt.old = opt.complete;
		opt.complete = function(){
			if ( opt.queue !== false )
				jQuery(this).dequeue();
			if ( jQuery.isFunction( opt.old ) )
				opt.old.call( this );
		};

		return opt;
	},

	easing: {
		linear: function( p, n, firstNum, diff ) {
			return firstNum + diff * p;
		},
		swing: function( p, n, firstNum, diff ) {
			return ((-Math.cos(p*Math.PI)/2) + 0.5) * diff + firstNum;
		}
	},

	timers: [],

	fx: function( elem, options, prop ){
		this.options = options;
		this.elem = elem;
		this.prop = prop;

		if ( !options.orig )
			options.orig = {};
	}

});

jQuery.fx.prototype = {

	// Simple function for setting a style value
	update: function(){
		if ( this.options.step )
			this.options.step.call( this.elem, this.now, this );

		(jQuery.fx.step[this.prop] || jQuery.fx.step._default)( this );

		// Set display property to block for height/width animations
		if ( ( this.prop == "height" || this.prop == "width" ) && this.elem.style )
			this.elem.style.display = "block";
	},

	// Get the current size
	cur: function(force){
		if ( this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null) )
			return this.elem[ this.prop ];

		var r = parseFloat(jQuery.css(this.elem, this.prop, force));
		return r && r > -10000 ? r : parseFloat(jQuery.curCSS(this.elem, this.prop)) || 0;
	},

	// Start an animation from one number to another
	custom: function(from, to, unit){
		this.startTime = now();
		this.start = from;
		this.end = to;
		this.unit = unit || this.unit || "px";
		this.now = this.start;
		this.pos = this.state = 0;

		var self = this;
		function t(gotoEnd){
			return self.step(gotoEnd);
		}

		t.elem = this.elem;

		if ( t() && jQuery.timers.push(t) && !timerId ) {
			timerId = setInterval(function(){
				var timers = jQuery.timers;

				for ( var i = 0; i < timers.length; i++ )
					if ( !timers[i]() )
						timers.splice(i--, 1);

				if ( !timers.length ) {
					clearInterval( timerId );
					timerId = undefined;
				}
			}, 13);
		}
	},

	// Simple 'show' function
	show: function(){
		// Remember where we started, so that we can go back to it later
		this.options.orig[this.prop] = jQuery.attr( this.elem.style, this.prop );
		this.options.show = true;

		// Begin the animation
		// Make sure that we start at a small width/height to avoid any
		// flash of content
		this.custom(this.prop == "width" || this.prop == "height" ? 1 : 0, this.cur());

		// Start by showing the element
		jQuery(this.elem).show();
	},

	// Simple 'hide' function
	hide: function(){
		// Remember where we started, so that we can go back to it later
		this.options.orig[this.prop] = jQuery.attr( this.elem.style, this.prop );
		this.options.hide = true;

		// Begin the animation
		this.custom(this.cur(), 0);
	},

	// Each step of an animation
	step: function(gotoEnd){
		var t = now();

		if ( gotoEnd || t >= this.options.duration + this.startTime ) {
			this.now = this.end;
			this.pos = this.state = 1;
			this.update();

			this.options.curAnim[ this.prop ] = true;

			var done = true;
			for ( var i in this.options.curAnim )
				if ( this.options.curAnim[i] !== true )
					done = false;

			if ( done ) {
				if ( this.options.display != null ) {
					// Reset the overflow
					this.elem.style.overflow = this.options.overflow;

					// Reset the display
					this.elem.style.display = this.options.display;
					if ( jQuery.css(this.elem, "display") == "none" )
						this.elem.style.display = "block";
				}

				// Hide the element if the "hide" operation was done
				if ( this.options.hide )
					jQuery(this.elem).hide();

				// Reset the properties, if the item has been hidden or shown
				if ( this.options.hide || this.options.show )
					for ( var p in this.options.curAnim )
						jQuery.attr(this.elem.style, p, this.options.orig[p]);
					
				// Execute the complete function
				this.options.complete.call( this.elem );
			}

			return false;
		} else {
			var n = t - this.startTime;
			this.state = n / this.options.duration;

			// Perform the easing function, defaults to swing
			this.pos = jQuery.easing[this.options.easing || (jQuery.easing.swing ? "swing" : "linear")](this.state, n, 0, 1, this.options.duration);
			this.now = this.start + ((this.end - this.start) * this.pos);

			// Perform the next step of the animation
			this.update();
		}

		return true;
	}

};

jQuery.extend( jQuery.fx, {
	speeds:{
		slow: 600,
 		fast: 200,
 		// Default speed
 		_default: 400
	},
	step: {

		opacity: function(fx){
			jQuery.attr(fx.elem.style, "opacity", fx.now);
		},

		_default: function(fx){
			if ( fx.elem.style && fx.elem.style[ fx.prop ] != null )
				fx.elem.style[ fx.prop ] = fx.now + fx.unit;
			else
				fx.elem[ fx.prop ] = fx.now;
		}
	}
});
if ( document.documentElement["getBoundingClientRect"] )
	jQuery.fn.offset = function() {
		if ( !this[0] ) return { top: 0, left: 0 };
		if ( this[0] === this[0].ownerDocument.body ) return jQuery.offset.bodyOffset( this[0] );
		var box  = this[0].getBoundingClientRect(), doc = this[0].ownerDocument, body = doc.body, docElem = doc.documentElement,
			clientTop = docElem.clientTop || body.clientTop || 0, clientLeft = docElem.clientLeft || body.clientLeft || 0,
			top  = box.top  + (self.pageYOffset || jQuery.boxModel && docElem.scrollTop  || body.scrollTop ) - clientTop,
			left = box.left + (self.pageXOffset || jQuery.boxModel && docElem.scrollLeft || body.scrollLeft) - clientLeft;
		return { top: top, left: left };
	};
else 
	jQuery.fn.offset = function() {
		if ( !this[0] ) return { top: 0, left: 0 };
		if ( this[0] === this[0].ownerDocument.body ) return jQuery.offset.bodyOffset( this[0] );
		jQuery.offset.initialized || jQuery.offset.initialize();

		var elem = this[0], offsetParent = elem.offsetParent, prevOffsetParent = elem,
			doc = elem.ownerDocument, computedStyle, docElem = doc.documentElement,
			body = doc.body, defaultView = doc.defaultView,
			prevComputedStyle = defaultView.getComputedStyle(elem, null),
			top = elem.offsetTop, left = elem.offsetLeft;

		while ( (elem = elem.parentNode) && elem !== body && elem !== docElem ) {
			computedStyle = defaultView.getComputedStyle(elem, null);
			top -= elem.scrollTop, left -= elem.scrollLeft;
			if ( elem === offsetParent ) {
				top += elem.offsetTop, left += elem.offsetLeft;
				if ( jQuery.offset.doesNotAddBorder && !(jQuery.offset.doesAddBorderForTableAndCells && /^t(able|d|h)$/i.test(elem.tagName)) )
					top  += parseInt( computedStyle.borderTopWidth,  10) || 0,
					left += parseInt( computedStyle.borderLeftWidth, 10) || 0;
				prevOffsetParent = offsetParent, offsetParent = elem.offsetParent;
			}
			if ( jQuery.offset.subtractsBorderForOverflowNotVisible && computedStyle.overflow !== "visible" )
				top  += parseInt( computedStyle.borderTopWidth,  10) || 0,
				left += parseInt( computedStyle.borderLeftWidth, 10) || 0;
			prevComputedStyle = computedStyle;
		}

		if ( prevComputedStyle.position === "relative" || prevComputedStyle.position === "static" )
			top  += body.offsetTop,
			left += body.offsetLeft;

		if ( prevComputedStyle.position === "fixed" )
			top  += Math.max(docElem.scrollTop, body.scrollTop),
			left += Math.max(docElem.scrollLeft, body.scrollLeft);

		return { top: top, left: left };
	};

jQuery.offset = {
	initialize: function() {
		if ( this.initialized ) return;
		var body = document.body, container = document.createElement('div'), innerDiv, checkDiv, table, td, rules, prop, bodyMarginTop = body.style.marginTop,
			html = '<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';

		rules = { position: 'absolute', top: 0, left: 0, margin: 0, border: 0, width: '1px', height: '1px', visibility: 'hidden' };
		for ( prop in rules ) container.style[prop] = rules[prop];

		container.innerHTML = html;
		body.insertBefore(container, body.firstChild);
		innerDiv = container.firstChild, checkDiv = innerDiv.firstChild, td = innerDiv.nextSibling.firstChild.firstChild;

		this.doesNotAddBorder = (checkDiv.offsetTop !== 5);
		this.doesAddBorderForTableAndCells = (td.offsetTop === 5);

		innerDiv.style.overflow = 'hidden', innerDiv.style.position = 'relative';
		this.subtractsBorderForOverflowNotVisible = (checkDiv.offsetTop === -5);

		body.style.marginTop = '1px';
		this.doesNotIncludeMarginInBodyOffset = (body.offsetTop === 0);
		body.style.marginTop = bodyMarginTop;

		body.removeChild(container);
		this.initialized = true;
	},

	bodyOffset: function(body) {
		jQuery.offset.initialized || jQuery.offset.initialize();
		var top = body.offsetTop, left = body.offsetLeft;
		if ( jQuery.offset.doesNotIncludeMarginInBodyOffset )
			top  += parseInt( jQuery.curCSS(body, 'marginTop',  true), 10 ) || 0,
			left += parseInt( jQuery.curCSS(body, 'marginLeft', true), 10 ) || 0;
		return { top: top, left: left };
	}
};


jQuery.fn.extend({
	position: function() {
		var left = 0, top = 0, results;

		if ( this[0] ) {
			// Get *real* offsetParent
			var offsetParent = this.offsetParent(),

			// Get correct offsets
			offset       = this.offset(),
			parentOffset = /^body|html$/i.test(offsetParent[0].tagName) ? { top: 0, left: 0 } : offsetParent.offset();

			// Subtract element margins
			// note: when an element has margin: auto the offsetLeft and marginLeft 
			// are the same in Safari causing offset.left to incorrectly be 0
			offset.top  -= num( this, 'marginTop'  );
			offset.left -= num( this, 'marginLeft' );

			// Add offsetParent borders
			parentOffset.top  += num( offsetParent, 'borderTopWidth'  );
			parentOffset.left += num( offsetParent, 'borderLeftWidth' );

			// Subtract the two offsets
			results = {
				top:  offset.top  - parentOffset.top,
				left: offset.left - parentOffset.left
			};
		}

		return results;
	},

	offsetParent: function() {
		var offsetParent = this[0].offsetParent || document.body;
		while ( offsetParent && (!/^body|html$/i.test(offsetParent.tagName) && jQuery.css(offsetParent, 'position') == 'static') )
			offsetParent = offsetParent.offsetParent;
		return jQuery(offsetParent);
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( ['Left', 'Top'], function(i, name) {
	var method = 'scroll' + name;
	
	jQuery.fn[ method ] = function(val) {
		if (!this[0]) return null;

		return val !== undefined ?

			// Set the scroll offset
			this.each(function() {
				this == window || this == document ?
					window.scrollTo(
						!i ? val : jQuery(window).scrollLeft(),
						 i ? val : jQuery(window).scrollTop()
					) :
					this[ method ] = val;
			}) :

			// Return the scroll offset
			this[0] == window || this[0] == document ?
				self[ i ? 'pageYOffset' : 'pageXOffset' ] ||
					jQuery.boxModel && document.documentElement[ method ] ||
					document.body[ method ] :
				this[0][ method ];
	};
});
// Create innerHeight, innerWidth, outerHeight and outerWidth methods
jQuery.each([ "Height", "Width" ], function(i, name){

	var tl = i ? "Left"  : "Top",  // top or left
		br = i ? "Right" : "Bottom", // bottom or right
		lower = name.toLowerCase();

	// innerHeight and innerWidth
	jQuery.fn["inner" + name] = function(){
		return this[0] ?
			jQuery.css( this[0], lower, false, "padding" ) :
			null;
	};

	// outerHeight and outerWidth
	jQuery.fn["outer" + name] = function(margin) {
		return this[0] ?
			jQuery.css( this[0], lower, false, margin ? "margin" : "border" ) :
			null;
	};
	
	var type = name.toLowerCase();

	jQuery.fn[ type ] = function( size ) {
		// Get window width or height
		return this[0] == window ?
			// Everyone else use document.documentElement or document.body depending on Quirks vs Standards mode
			document.compatMode == "CSS1Compat" && document.documentElement[ "client" + name ] ||
			document.body[ "client" + name ] :

			// Get document width or height
			this[0] == document ?
				// Either scroll[Width/Height] or offset[Width/Height], whichever is greater
				Math.max(
					document.documentElement["client" + name],
					document.body["scroll" + name], document.documentElement["scroll" + name],
					document.body["offset" + name], document.documentElement["offset" + name]
				) :

				// Get or set width or height on the element
				size === undefined ?
					// Get width or height on the element
					(this.length ? jQuery.css( this[0], type ) : null) :

					// Set the width or height on the element (default to pixels if value is unitless)
					this.css( type, typeof size === "string" ? size : size + "px" );
	};

});
})();


/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * 5-08-10 JMS Added defaults for domain/path, for IE8
 */

/**
 * Create a cookie with the given name and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String name The name of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given name.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String name The name of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = '; path=' + (options.path ? (options.path) : '/');
        var domain = options.domain ? options.domain : document.domain;
        domain = (domain !== 'localhost') ? '; domain=' + domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
// http://ejohn.org/blog/javascript-micro-templating/
(function(){
  var cache = {};

  // RWD: Changed so you need to pass in actual template string as first
  // arg as opposed to the elementId of the template.  (This allows us to
  // store the template in a javascript var or other...
  this.template = function tmpl(str, data){

    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    var fn = !/\W/.test(str) ?
      cache[str] = cache[str] ||
        tmpl(str) :

      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +

        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +

        // Convert the template into pure JavaScript
        str
          .replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');");

    // Provide some basic currying to the user
    return data ? fn( data ) : fn;
  };
})();

/*
* jquery-google-analytics plugin
*
* A jQuery plugin that makes it easier to implement Google Analytics tracking,
* including event and link tracking.
*
* Adds the following methods to jQuery:
*   - $.trackPage() - Adds Google Analytics tracking on the page from which
*     it's called.
*   - $.trackPageview() - Tracks a pageview using the given uri. Can be used for tracking Ajax requests: http://www.google.com/support/analytics/bin/answer.py?hl=en&answer=55519
*   - $.trackEvent() - Tracks an event using the given parameters.
*   - $('a').track() - Adds event tracking to element(s).
*   - $.timePageLoad() - Measures the time it takes  an event using the given parameters.
*
* Features:
*   - Improves page load time by loading Google Analytics code without blocking.
*   - Easy and extensible event and link tracking plugin for jQuery and Google Analytics
*   - Automatic internal/external link detection. Default behavior is to skip
*     tracking of internal links.
*   - Enforces that tracking event handler is added to an element only once.
*   - Configurable: custom event tracking, skip internal links, metadata
*     extraction using callbacks.
*
* Copyright (c) 2008-09 Christian Hellsten
*
* Plugin homepage:
*   http://aktagon.com/projects/jquery/google-analytics/
*   http://github.com/christianhellsten/jquery-google-analytics/
*
* Examples:
*   http://aktagon.com/projects/jquery/google-analytics/examples/
*   http://code.google.com/apis/analytics/docs/eventTrackerGuide.html
*
* Repository:
*   git://github.com/christianhellsten/jquery-google-analytics.git
*
* Version 1.1.3
*
* Tested with:
*   - Mac: Firefox 3, Safari 3
*   - Linux: Firefox 3
*   - Windows: Firefox 3, Internet Explorer 6
*
* Licensed under the MIT license:
* http://www.opensource.org/licenses/mit-license.php
*
* Credits:
*   - http://google.com/analytics
*   - http://lyncd.com: 
*       Idea for trackPage method came from this blog post: http://lyncd.com/2009/03/better-google-analytics-javascript/
*/
(function($) {

  var pageTracker;

  /**
   * Enables Google Analytics tracking on the page from which it's called. 
   *
   * Usage:
   *  <script type="text/javascript">
   *    $.trackPage('UA-xxx-xxx', options);
   *  </script>
   *
   * Parameters:
   *   account_id - Your Google Analytics account ID.
   *   options - An object containing one or more optional parameters:
   *     - onload - boolean - If false, the Google Analytics code is loaded
   *       when this method is called instead of on window.onload.
   *     - status_code - The HTTP status code of the current server response.
   *       If this is set to something other than 200 then the page is tracked
   *       as an error page. For more details: http://www.google.com/support/analytics/bin/answer.py?hl=en&answer=86927
   *     - callback  - function to be executed after the Google Analytics code is laoded and initialized
   *
   */
  $.trackPage = function(account_id, options) {
    var host = (("https:" == document.location.protocol) ? "https://web.archive.org/web/20110912044651/https://ssl." : "https://web.archive.org/web/20110912044651/http://www.");
    var script;

    // Use default options, if necessary
    var settings = $.extend({}, {onload: true, status_code: 200}, options);
    var src  = host + 'google-analytics.com/ga.js';

    function init_analytics() {
      if (typeof _gat != undefined) {
        debug('Google Analytics loaded');

        pageTracker = _gat._getTracker(account_id);

        if(settings.status_code == null || settings.status_code == 200) {
          pageTracker._trackPageview();
        } else {
          debug('Tracking error ' + settings.status_code);
          pageTracker._trackPageview("/" + settings.status_code + ".html?page=" + document.location.pathname + document.location.search + "&from=" + document.referrer);
        }
        if($.isFunction(settings.callback)){
          settings.callback();
        }
      }
      else { 
        throw "_gat is undefined"; // setInterval loading?
      }
    }

    load_script = function() {
      $.ajax({
        type: "GET",
        url: src,
        success: function() {          
          init_analytics(); 
        },
        dataType: "script",
        cache: true // We want the cached version
      });
    }
    
    // Enable tracking when called or on page load?
    if(settings.onload == true || settings.onload == null) {
      $(window).load(load_script);
    } else {
      load_script();
    }
  }

  /**
   * Tracks an event using the given parameters. 
   *
   * The trackEvent method takes four arguments:
   *
   *  category - required string used to group events
   *  action - required string used to define event type, eg. click, download
   *  label - optional label to attach to event, eg. buy
   *  value - optional numerical value to attach to event, eg. price
   *  skip_internal - optional boolean value. If true then internal links are not tracked.
   *
   */
  $.trackEvent = function(category, action, label, value) {
    if(typeof pageTracker == 'undefined') {
      debug('FATAL: pageTracker is not defined'); // blocked by whatever
    } else {
      var status = pageTracker._trackEvent(category, action, label, value);
      debug('tracked event: ' + category + ', ' + action + ', ' + label + ', ' + value + '. success: ' + status);
    }
  };

  /**
   * Tracks a pageview using the given uri.
   *
   */
  $.trackPageview = function(uri) {
    if(typeof pageTracker == 'undefined') {
      debug('FATAL: pageTracker is not defined');
    } else {
      pageTracker._trackPageview(uri);
    }
  }

  /**
   * Adds click tracking to elements. Usage:
   *
   *  $('a').track()
   *
   */
  $.fn.track = function(options) {
    // Add event handler to all matching elements
    return this.each(function() {
      var element = $(this);

      // Prevent an element from being tracked multiple times.
      if (element.hasClass('tracked')) {
        return false;
      } else {
        element.addClass('tracked');
      } 

      // Use default options, if necessary
      var settings = $.extend({}, $.fn.track.defaults, options);

      // Merge custom options with defaults.
      var category = evaluate(element, settings.category);
      var action   = evaluate(element, settings.action);
      var label    = evaluate(element, settings.label);
      var value    = evaluate(element, settings.value);
      var event_name = evaluate(element, settings.event_name);
      
      var message = "category:'" + category + "' action:'" + action + "' label:'" + label + "' value:'" + value + "'";
      
      debug('Tracking ' + event_name + ' ' + message);

      // Bind the event to this element. 
      // TODO Use .live since jQuery 1.4 now supports it better.
      element.bind(event_name + '.track', function() {       
        // Should we skip internal links? REFACTOR
        var skip = settings.skip_internal && (element[0].hostname == location.hostname);
      
        if(!skip) {
          $.trackEvent(category, action, label, value);
          debug('Tracked ' + message);
        } else {
          debug('Skipped ' + message);
        }

        return true;
      });
    });
    
    /**
     * Checks whether a setting value is a string or a function.
     * 
     * If second parameter is a string: returns the value of the second parameter.
     * If the second parameter is a function: passes the element to the function and returns function's return value.
     */
    function evaluate(element, text_or_function) {
      if(typeof text_or_function == 'function') {
        text_or_function = text_or_function(element);
      }
      return text_or_function;
    };
  };

  /**
   * Prints to Firebug console, if available. To enable:
   *   $.fn.track.defaults.debug = true;
   */
  function debug(message) {
    if (typeof console != 'undefined' && typeof console.debug != 'undefined' && $.fn.track.defaults.debug) {
      console.debug(message);
    }
  };

  /**
   * Default (overridable) settings.
   */
  $.fn.track.defaults = {
    category      : function(element) { return (element[0].hostname == location.hostname) ? 'internal':'external'; },
    action        : 'click',
    label         : function(element) { return element.attr('href'); },
    value         : null,
    skip_internal : true,
    event_name    : 'click',
    debug         : false
  };
})(jQuery);


(function startGoogleAnalytics(){
    var config = {
        account: 'UA-12758561-1',
        category: 'Video',
        debug: false,
        value: 0
    };
    $.fn.track.defaults.debug = config.debug;
    $.trackPage(config.account);
    
    window.trackVideoEvent = function(action, label, value) {
        $.trackEvent(
            config.category, 
            action, 
            label || $.vplayer.options.slug, 
            Math.floor(value || $.vplayer.options.resource_id || config.value)
        );
    }
})(); 

$(document).ready(function startNativeVideoEventTracking() {
    if ($.vplayer && $.vplayer.htmlState.isSupported()) {

        $.extend($.vplayer, {
            pushPlayerCallBack: function(player) {
               $(player).bind('ended', function() { 
                    trackVideoEvent('end');
               }); 
               $(player).bind('play', function() { 
                    if (!this.getAttribute('data-started')) {
                        this.setAttribute('data-started', true);
                        trackVideoEvent('start');
                        $.completionChecker.start();
                    }
               }); 
            } 
        });  
       
        $.completionChecker = {
            TARGET_COMPLETION: .9,
            DELAY: 4000,
            start: function() {
                if (!this.active) {
                    this.active = true;
                    this.tickAfterDelay();
                }
            },
            stop: function() {
                this.active = false; 
            },
            tickAfterDelay: function() {
                setTimeout(function(){
                    $.completionChecker.tick()
                }, this.DELAY);  
            },
            tick: function() {      
                if (typeof $.vplayer.player == 'object') {
                    this.v = this.v || $.vplayer.player;
                    if ((this.v.currentTime && this.v.duration) &&
                    (this.v.currentTime / this.v.duration >= this.TARGET_COMPLETION)) {
                       trackVideoEvent('90-percent-completion');
                       this.active = false;
                    }
                }
                if (this.active) {
                    this.tickAfterDelay();
                }
            }
        }
    }
});


/*
    http://www.JSON.org/json2.js
    2009-09-29

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, strict: false */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (!this.JSON) {
    this.JSON = {};
}

(function () {

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf()) ?
                   this.getUTCFullYear()   + '-' +
                 f(this.getUTCMonth() + 1) + '-' +
                 f(this.getUTCDate())      + 'T' +
                 f(this.getUTCHours())     + ':' +
                 f(this.getUTCMinutes())   + ':' +
                 f(this.getUTCSeconds())   + 'Z' : null;
        };

        String.prototype.toJSON =
        Number.prototype.toJSON =
        Boolean.prototype.toJSON = function (key) {
            return this.valueOf();
        };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ?
            '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c :
                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' :
            '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0 ? '[]' :
                    gap ? '[\n' + gap +
                            partial.join(',\n' + gap) + '\n' +
                                mind + ']' :
                          '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0 ? '{}' :
                gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                        mind + '}' : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                     typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/.
test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());

/*
Apply client state to this element using jquery micro templates

$(window).load(function() {
  $('#user_menu').applyClientState({
    getTemplateBody: function() { return user_menu_template; }
  });
});

Or

$(window).load(function() {
  $('#user_menu').applyClientState({
    getTemplateBody: function() { "<%= user.username %>" },
    getData: function() { { user: { username: 'ryan' } } }
  });
});
*/

(function($) {

  var emptyData = JSON.parse("{}");

  $.fn.applyClientState = function(options) {
    var settings = $.extend({ getData: getDataFromCookie }, options);
    $(this).html(template(settings.getTemplateBody(), settings.getData()));
  };

  var getDataFromCookie = function() {
    var cookieData = $.cookie('_client_state');
    return cookieData != null ? JSON.parse(cookieData) : emptyData;
  };

}) (jQuery);

// See cookie_client_state plugin
$(document).ready(function() {
    if(typeof(user_menu_template) != "undefined") {
        $('#user_menu').applyClientState({
            getTemplateBody: function() { return user_menu_template; }
        });
    }
});

/**
 * jQuery.placeholder - Placeholder plugin for input fields
 * Written by Blair Mitchelmore (blair DOT mitchelmore AT gmail DOT com)
 * Licensed under the WTFPL (http://sam.zoy.org/wtfpl/).
 * Date: 2008/10/14
 *
 * @author Blair Mitchelmore
 * @version 1.0.1
 *
 **/
new function($) {
    $.fn.placeholder = function(settings) {
        settings = settings || {};
        var key = settings.dataKey || "placeholderValue";
        var attr = settings.attr || "placeholder";
        var className = settings.className || "placeholder";
        var values = settings.values || [];
        var block = settings.blockSubmit || false;
        var blank = settings.blankSubmit || false;
        var submit = settings.onSubmit || false;
        var value = settings.value || "";
        var position = settings.cursor_position || 0;


        return this.filter(":input").each(function(index) {
            $.data(this, key, values[index] || $(this).attr(attr));
        }).each(function() {
            if ($.trim($(this).val()) === "")
                $(this).addClass(className).val($.data(this, key));
        }).focus(function() {
            if ($.trim($(this).val()) === $.data(this, key))
                $(this).removeClass(className).val(value)
                if ($.fn.setCursorPosition) {
                  $(this).setCursorPosition(position);
                }
        }).blur(function() {
            if ($.trim($(this).val()) === value)
                $(this).addClass(className).val($.data(this, key));
        }).each(function(index, elem) {
            if (block)
                new function(e) {
                    $(e.form).submit(function() {
                        return $.trim($(e).val()) != $.data(e, key)
                    });
                }(elem);
            else if (blank)
                new function(e) {
                    $(e.form).submit(function() {
                        if ($.trim($(e).val()) == $.data(e, key))
                            $(e).removeClass(className).val("");
                        return true;
                    });
                }(elem);
            else if (submit)
                new function(e) { $(e.form).submit(submit); }(elem);
        });
    };
}(jQuery);

/*
 * Ajaxify - jQuery Plugin
 * version: 2.00 (11/12/2008)
 * Created by: MaX
 * Examples and documentation at: http://max.jsrhost.com/ajaxify/
 * licensed under and GPL licenses:
 * http://www.gnu.org/licenses/gpl.html
 */

(function($){


jQuery.AjaxifyDefaults = {  
		event:'click', /*specify the event*/
		link:false, /* specify the link, priority is for the href attr.*/
		target:'#container', /*the data loaded via ajax will be placed here*/
		animateOut:false,
		animateIn:false,
		animateOutSpeed:'normal',
		animateInSpeed:'normal',
		method: 'GET', /* the request method GET or POST*/
		tagToload:false, /* inserts just the tag from the data loaded, it can be specified as t a second argument in the 'target' attr(#box,#result)*/
		loading_txt:'',
		loading_img:"images/loading.gif",
		loading_target: false,
		loading_fn:function(options){
			jQuery.ajaxifyLoading(options);
		},
		loadHash:false,	/* for use this to resolve bookmarking issues, see example for more details*/
		title:false, /* change page title along with the request. */
		forms:false, /* send form data along with th request (forms, input , radio ... etc jquery selector) */
		params:'ajax=true',/*extend parameters for the webpage. it can be set to function since v2*/
		timeout:false, /*in ms.  there is a problem in this option on linux servers*/
		contentType:"application/x-www-form-urlencoded",
		dataType:'html',
		cache:false, /* force the browser not to cache*/
		username:false, /*username HTTP access authentication*/
		password:false, /*password HTTP access authentication*/
		onStart:function(op){}, /* a callback function before start requesting.*/
		onError:function(op){
			jQuery.ajaxifyManip(op,"<font style='color: #CC0000'>Error: </font> Couldn't open the page.");		
		}, /* a callback function if error happened while requesting*/
		onSuccess:function(op){},/* a callback function if the request finished successfuly*/
		onComplete:function(op){}//*a callback function when the request finished weather it was a successful one or not.*/
	};
jQuery.AjaxifyFirstLoad = true;
jQuery.AjaxifyhistorySet = new Object();
jQuery.AjaxifyPageTitle = document.title;
jQuery.AjaxifyDebug = false;



jQuery.fn.ajaxify = function(options) {  
	if(!jQuery(this).size()){
		jQuery.ajaxifylog('Error: No matched element/s for your ajaxify selector " '+jQuery(this).selector+' ".');
		return false;
	}
	var ver = jQuery.fn.jquery.split('.');
  // RWD: Faulty version check
//	if(ver[0] < 1 || ver[1] < 2 || ver[2] < 6){
//		jQuery.ajaxifylog('Error: Your jQuery version is old. Version 1.2.6 or newer is required.');
//		return false;
//	}
	return this.each(function() {
	var current = jQuery.extend({},jQuery.AjaxifyDefaults, options);
	if(jQuery.metadata){
	current = jQuery.extend(current,jQuery(this).metadata());
	}
	
	
	if(current.event){
		jQuery(this).bind(current.event,function(){		
			jQuery(this).ajaxifyAnalyse(current);
			if(!current.hash)
				jQuery.ajaxifyLoad(current);
			else{
				jQuery.ajaxifyHash(current);
			}
			 //stop browser
			if(jQuery(this).is('a') || jQuery(this).is('form')) return false;
		});
	}else{
		jQuery(this).ajaxifyAnalyse(current);
		jQuery.ajaxifyLoad(current);		
	}	
		//for bookmarking	
		if(current.loadHash  && jQuery.AjaxifyFirstLoad){
			jQuery(this).ajaxifyAnalyse(current);
			if(document.location.hash.replace(/^#/, '') == current.hash	&& current.hash){
				jQuery.ajaxifyHash(current);
				jQuery.AjaxifyFirstLoad = false;
			}
		}
		
  }); // end each fn 
}; // end ajaxify fn


 

 
jQuery.fn.ajaxifyAnalyse = function(current){
	current.object = this;
	if(jQuery(this).is('a')){
		if(jQuery(this).attr('href')){
			//if(jQuery.browser.msie)
				//var link = jQuery(this).attr('href').replace(/^#/, "");
			//else
				var link = jQuery(this).attr('href').replace(/^#/, "");
				//alert(link);
			current.link = link || current.link;
		}else 
			current.link;
			
		if(typeof current.tagToload != 'object')
			if(jQuery(this).attr('target'))
				current.target = jQuery(this).attr('target');
			else
				current.target;
		else
			current.target = current.loading_target || '#AjaxifyTemp';
	}
	   
	if(!current.loading_target)
	   current.loading_target = current.target;
	   

	if(current.forms){
		var text = jQuery(current.forms).serialize();
		current.paramres = text;
	}
	
	if(typeof current.params == 'function')
		var params = current.params(current);
	else
		var params = current.params;

	if(typeof params == 'string'){
		if(text)
		current.paramres +='&'+params;
		else
		current.paramres = params;
	}
	
	var len = current.target.length-1;
	if(typeof current.tagToload !='object')
		if(current.target.charAt(len) == '+' || current.target.charAt(len)=='-'){
			current.manip = current.target.charAt(len);
			current.target = current.target.substr(0,len);
		}

   	if(current.loadHash){
		if(!jQuery.historyInit){
			jQuery.ajaxifylog('Error: loadHash is enabled but history plugin couldn\'t be found.');
		return false;
		}
		
		if(current.loadHash === true){
			jQuery.ajaxifylog('Info: It seemes you are upgrading from v1.0. Please see the new documentation about loadHash. "attr:href" will be used instead of "true".');
			current.loadHash = "attr:href";
		}
		if(current.loadHash.toLowerCase() == 'attr:href' || 
			current.loadHash.toLowerCase() == 'attr:rel' ||
			current.loadHash.toLowerCase() == 'attr:title'){
			
			current.loadHash = current.loadHash.toLowerCase();
			current.hash = jQuery(this).attr(current.loadHash.replace('attr:',''));
			if(jQuery.browser.opera){
				current.hash = current.hash.replace('?','%3F');
				current.hash = current.hash.replace('&','%26');
				current.hash = current.hash.replace('=','%3D');
			}
		}else
			current.hash = current.loadHash;
		
		if(!current.hash)
			jQuery.ajaxifylog('Warning: You have specified loadHash, but its empty or attribute couldn\'t be found.');
	}
	
	if(!jQuery(current.target).size() && typeof current.tagToload !='object')
		jQuery.ajaxifylog('Warning: Target " '+current.target+' " couldn\'t be found.');
 	

};

 


jQuery.ajaxifyLoading = function(options){
	var html = "<div id='AjaxifyLoading'><img src='"+options.loading_img+"' alt='Loading...' title='Loading...' >"+options.loading_txt+"</div>";
	if(options.loading_target)
		jQuery.ajaxifyManip(options.loading_target,html);
	else
		jQuery.ajaxifyManip(options,html);
}





jQuery.ajaxifyHash = function(current){
	var ob = new Object();
	jQuery.each(current, function(key, value) {
		ob[key] = value;
	});
	jQuery.AjaxifyhistorySet[ob.hash] = ob;
	location.hash = ob.hash;
	//if(jQuery.AjaxifyFirstLoad.history){
	//alert(ob.hash);
		jQuery.historyInit(jQuery.ajaxifyHistory);
		jQuery.AjaxifyFirstLoad.history = false;
	//}
};





jQuery.ajaxifyLoad = function(current) {
	// turn off globals 
	//alert('ajaxifyLoad'+print_r(current,true));
	jQuery.ajaxSetup({global:false});	
	//start calling  jQuery.ajax function. thank you jquery for making this easy
	jQuery.ajax({
		type: current.method,
		url: current.link,
		dataType: current.dataType,
		data: current.paramres,
		contentType:current.contentType,
		processData:true,
		timeout:current.timeout,
		cache:current.cache,
		username:current.username,
		password:current.password,
		complete: function(){
			current.onComplete(current)
		},
		beforeSend: function(){
			current.onStart(current);
			
			if(current.animateOut){
				if(current.loading_target != current.target);//diff target? fire before start anim
					current.loading_fn(current);
				jQuery(current.target).animate(current.animateOut,current.animateOutSpeed,function(){
					//alert('hr');
					if(!current.loading_target)//already fired
					current.loading_fn(current);		
				});
			}else
				current.loading_fn(current);
			},
		success: function(data){
		jQuery(current.target).stop();
		jQuery('#AjaxifyLoading').remove();
		
		if(current.title)
			document.title = current.title;
		else if(document.title != jQuery.AjaxifyPageTitle)
			document.title = jQuery.AjaxifyPageTitle;
		
		if(current.tagToload){
		data = '<div>'+data+'</div>'; //wrap data so we can find tags within it.
			if(typeof current.tagToload == 'string'){
					jQuery.ajaxifyManip(current,jQuery(data).find(current.tagToload)); 					
			}else if(typeof current.tagToload == 'object') {
					jQuery.each(current.tagToload, function(tag, target) {
						if(jQuery(data).find(tag).size())
							jQuery.ajaxifyManip(target,jQuery(data).find(tag)); 
						else
							jQuery.ajaxifylog('Warning: Tag "'+tag+'" couldn\'t be found.');
						
					});
			}
		
		}else{
		 // 
		 jQuery.ajaxifyManip(current,data);
		  }
		current.onSuccess(current,data);
		if(current.animateIn)
			jQuery(current.target).animate(current.animateIn,current.animateInSpeed);
		  
		  },
		  error:function(msg){
			  jQuery(current.target).stop();
			  current.onError(current,msg);
			  if(current.animateIn)
		  jQuery(current.target).animate(current.animateIn,current.animateInSpeed);
		  }
		});
};





jQuery.ajaxifylog = function(message) {
	if(jQuery.AjaxifyDebug)
		if(window.console) {
			 console.debug(message);
		} else {
			 alert(message);
		}
};





jQuery.ajaxifyHistory = function(hash){
	if(hash){
		if(jQuery.browser.safari){
			var options = jQuery.AjaxifyhistorySet[location.hash.replace(/^#/,'')]; //fix bug in history.js
		}else
			var options = jQuery.AjaxifyhistorySet[hash];
		
		if(options)
			jQuery.ajaxifyLoad(options);
		else
			jQuery.ajaxifylog('History Fired. But I couldn\'t find hash. Most propabley, the hash is empty. If so, its normal.');
	}
};





jQuery.ajaxifyManip = function(current,data){

if(typeof current != 'object'){
	var target = current;
	var current = new Object;
	var len = target.length-1;
	if(target.charAt(len) == '+' || target.charAt(len)=='-'){
		current.manip = target.charAt(len);
		current.target = target.substr(0,len);
	}
	else{
		current.manip = '';
		current.target = target;
	}
	if(!jQuery(current.target).size())
		jQuery.ajaxifylog('Warning: Target "'+current.target+'" couldn\'t be found.');
}
	
		
	if(current.manip == '+')
		jQuery(current.target).append(data);
	else if(current.manip == '-')
		jQuery(current.target).prepend(data);
	else
		jQuery(current.target).html(data);
};


})(jQuery);

/*! Copyright (c) 2009 Brandon Aaron (http://brandonaaron.net)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.1.0-pre
 * Requires jQuery 1.3+
 * Docs: http://docs.jquery.com/Plugins/livequery
 */

(function($) {

$.extend($.fn, {
	livequery: function(type, fn, fn2) {
		var self = this, q;

		// Handle different call patterns
		if ($.isFunction(type))
			fn2 = fn, fn = type, type = undefined;

		// See if Live Query already exists
		$.each( $.livequery.queries, function(i, query) {
			if ( self.selector == query.selector && self.context == query.context &&
				type == query.type && (!fn || fn.$lqguid == query.fn.$lqguid) && (!fn2 || fn2.$lqguid == query.fn2.$lqguid) )
					// Found the query, exit the each loop
					return (q = query) && false;
		});

		// Create new Live Query if it wasn't found
		q = q || new $.livequery(this.selector, this.context, type, fn, fn2);

		// Make sure it is running
		q.stopped = false;

		// Run it immediately for the first time
		q.run();

		// Contnue the chain
		return this;
	},

	expire: function(type, fn, fn2) {
		var self = this;

		// Handle different call patterns
		if ($.isFunction(type))
			fn2 = fn, fn = type, type = undefined;

		// Find the Live Query based on arguments and stop it
		$.each( $.livequery.queries, function(i, query) {
			if ( self.selector == query.selector && self.context == query.context &&
				(!type || type == query.type) && (!fn || fn.$lqguid == query.fn.$lqguid) && (!fn2 || fn2.$lqguid == query.fn2.$lqguid) && !this.stopped )
					$.livequery.stop(query.id);
		});

		// Continue the chain
		return this;
	}
});

$.livequery = function(selector, context, type, fn, fn2) {
	this.selector = selector;
	this.context  = context;
	this.type     = type;
	this.fn       = fn;
	this.fn2      = fn2;
	this.elements = [];
	this.stopped  = false;

	// The id is the index of the Live Query in $.livequery.queries
	this.id = $.livequery.queries.push(this)-1;

	// Mark the functions for matching later on
	fn.$lqguid = fn.$lqguid || $.livequery.guid++;
	if (fn2) fn2.$lqguid = fn2.$lqguid || $.livequery.guid++;

	// Return the Live Query
	return this;
};

$.livequery.prototype = {
	stop: function() {
		var query = this;

		if ( this.type )
			// Unbind all bound events
			this.elements.unbind(this.type, this.fn);
		else if (this.fn2)
			// Call the second function for all matched elements
			this.elements.each(function(i, el) {
				query.fn2.apply(el);
			});

		// Clear out matched elements
		this.elements = [];

		// Stop the Live Query from running until restarted
		this.stopped = true;
	},

	run: function() {
		// Short-circuit if stopped
		if ( this.stopped ) return;
		var query = this;

		var oEls = this.elements,
			els  = $(this.selector, this.context),
			nEls = els.not(oEls);

		// Set elements to the latest set of matched elements
		this.elements = els;

		if (this.type) {
			// Bind events to newly matched elements
			nEls.bind(this.type, this.fn);

			// Unbind events to elements no longer matched
			if (oEls.length > 0)
				$.each(oEls, function(i, el) {
					if ( $.inArray(el, els) < 0 )
						$.event.remove(el, query.type, query.fn);
				});
		}
		else {
			// Call the first function for newly matched elements
			nEls.each(function() {
				query.fn.apply(this);
			});

			// Call the second function for elements no longer matched
			if ( this.fn2 && oEls.length > 0 )
				$.each(oEls, function(i, el) {
					if ( $.inArray(el, els) < 0 )
						query.fn2.apply(el);
				});
		}
	}
};

$.extend($.livequery, {
	guid: 0,
	queries: [],
	queue: [],
	running: false,
	timeout: null,

	checkQueue: function() {
		if ( $.livequery.running && $.livequery.queue.length ) {
			var length = $.livequery.queue.length;
			// Run each Live Query currently in the queue
			while ( length-- )
				$.livequery.queries[ $.livequery.queue.shift() ].run();
		}
	},

	pause: function() {
		// Don't run anymore Live Queries until restarted
		$.livequery.running = false;
	},

	play: function() {
		// Restart Live Queries
		$.livequery.running = true;
		// Request a run of the Live Queries
		$.livequery.run();
	},

	registerPlugin: function() {
		$.each( arguments, function(i,n) {
			// Short-circuit if the method doesn't exist
			if (!$.fn[n]) return;

			// Save a reference to the original method
			var old = $.fn[n];

			// Create a new method
			$.fn[n] = function() {
				// Call the original method
				var r = old.apply(this, arguments);

				// Request a run of the Live Queries
				$.livequery.run();

				// Return the original methods result
				return r;
			}
		});
	},

	run: function(id) {
		if (id != undefined) {
			// Put the particular Live Query in the queue if it doesn't already exist
			if ( $.inArray(id, $.livequery.queue) < 0 )
				$.livequery.queue.push( id );
		}
		else
			// Put each Live Query in the queue if it doesn't already exist
			$.each( $.livequery.queries, function(id) {
				if ( $.inArray(id, $.livequery.queue) < 0 )
					$.livequery.queue.push( id );
			});

		// Clear timeout if it already exists
		if ($.livequery.timeout) clearTimeout($.livequery.timeout);
		// Create a timeout to check the queue and actually run the Live Queries
		$.livequery.timeout = setTimeout($.livequery.checkQueue, 20);
	},

	stop: function(id) {
		if (id != undefined)
			// Stop are particular Live Query
			$.livequery.queries[ id ].stop();
		else
			// Stop all Live Queries
			$.each( $.livequery.queries, function(id) {
				$.livequery.queries[ id ].stop();
			});
	}
});

// Register core DOM manipulation methods
$.livequery.registerPlugin('append', 'prepend', 'after', 'before', 'wrap', 'attr', 'removeAttr', 'addClass', 'removeClass', 'toggleClass', 'empty', 'remove');

// Run Live Queries when the Document is ready
$(function() { $.livequery.play(); });

})(jQuery);

/*
 * FancyBox - jQuery Plugin
 * simple and fancy lightbox alternative
 *
 * Copyright (c) 2009 Janis Skarnelis
 * Examples and documentation at: http://fancybox.net
 * 
 * Version: 1.2.6 (16/11/2009)
 * Requires: jQuery v1.3+
 * 
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

;(function($) {
	$.fn.fixPNG = function() {
		return this.each(function () {
			var image = $(this).css('backgroundImage');

			if (image.match(/^url\(["']?(.*\.png)["']?\)$/i)) {
				image = RegExp.$1;
				$(this).css({
					'backgroundImage': 'none',
					'filter': "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=" + ($(this).css('backgroundRepeat') == 'no-repeat' ? 'crop' : 'scale') + ", src='" + image + "')"
				}).each(function () {
					var position = $(this).css('position');
					if (position != 'absolute' && position != 'relative')
						$(this).css('position', 'relative');
				});
			}
		});
	};

	var elem, opts, busy = false, imagePreloader = new Image, loadingTimer, loadingFrame = 1, imageRegExp = /\.(jpg|gif|png|bmp|jpeg)(.*)?$/i;
	var ieQuirks = null, IE6 = $.browser.msie && $.browser.version.substr(0,1) == 6 && !window.XMLHttpRequest, oldIE = IE6 || ($.browser.msie && $.browser.version.substr(0,1) == 7);

	$.fn.fancybox = function(o) {
		var settings		= $.extend({}, $.fn.fancybox.defaults, o);
		var matchedGroup	= this;

		function _initialize() {
			elem = this;
			opts = $.extend({}, settings);

			_start();

			return false;
		};

		function _start() {
			if (busy) return;

			if ($.isFunction(opts.callbackOnStart)) {
				opts.callbackOnStart();
			}

			opts.itemArray		= [];
			opts.itemCurrent	= 0;

			if (settings.itemArray.length > 0) {
				opts.itemArray = settings.itemArray;

			} else {
				var item = {};

				if (!elem.rel || elem.rel == '') {
					var item = {href: elem.href, title: elem.title};

					if ($(elem).children("img:first").length) {
						item.orig = $(elem).children("img:first");
					} else {
						item.orig = $(elem);
					}

					if (item.title == '' || typeof item.title == 'undefined') {
						item.title = item.orig.attr('alt');
					}
					
					opts.itemArray.push( item );

				} else {
					var subGroup = $(matchedGroup).filter("a[rel=" + elem.rel + "]");
					var item = {};

					for (var i = 0; i < subGroup.length; i++) {
						item = {href: subGroup[i].href, title: subGroup[i].title};

						if ($(subGroup[i]).children("img:first").length) {
							item.orig = $(subGroup[i]).children("img:first");
						} else {
							item.orig = $(subGroup[i]);
						}

						if (item.title == '' || typeof item.title == 'undefined') {
							item.title = item.orig.attr('alt');
						}

						opts.itemArray.push( item );
					}
				}
			}

			while ( opts.itemArray[ opts.itemCurrent ].href != elem.href ) {
				opts.itemCurrent++;
			}

			if (opts.overlayShow) {
				if (IE6) {
					$('embed, object, select').css('visibility', 'hidden');
					$("#fancy_overlay").css('height', $(document).height());
				}

				$("#fancy_overlay").css({
					'background-color'	: opts.overlayColor,
					'opacity'			: opts.overlayOpacity
				}).show();
			}
			
			$(window).bind("resize.fb scroll.fb", $.fn.fancybox.scrollBox);

			_change_item();
		};

		function _change_item() {
			$("#fancy_right, #fancy_left, #fancy_close, #fancy_title").hide();

			var href = opts.itemArray[ opts.itemCurrent ].href;

			if (href.match("iframe") || elem.className.indexOf("iframe") >= 0) {
				$.fn.fancybox.showLoading();
				_set_content('<iframe id="fancy_frame" onload="jQuery.fn.fancybox.showIframe()" name="fancy_iframe' + Math.round(Math.random()*1000) + '" frameborder="0" hspace="0" src="' + href + '"></iframe>', opts.frameWidth, opts.frameHeight);

			} else if (href.match(/#/)) {
				var target = window.location.href.split('#')[0]; target = href.replace(target, ''); target = target.substr(target.indexOf('#'));

				_set_content('<div id="fancy_div">' + $(target).html() + '</div>', opts.frameWidth, opts.frameHeight);

			} else if (href.match(imageRegExp)) {
				imagePreloader = new Image; imagePreloader.src = href;

				if (imagePreloader.complete) {
					_proceed_image();

				} else {
					$.fn.fancybox.showLoading();
					$(imagePreloader).unbind().bind('load', function() {
						$("#fancy_loading").hide();

						_proceed_image();
					});
				}
			} else {
				$.fn.fancybox.showLoading();
				$.get(href, function(data) {
					$("#fancy_loading").hide();
					_set_content( '<div id="fancy_ajax">' + data + '</div>', opts.frameWidth, opts.frameHeight );
				});
			}
		};

		function _proceed_image() {
			var width	= imagePreloader.width;
			var height	= imagePreloader.height;

			var horizontal_space	= (opts.padding * 2) + 40;
			var vertical_space		= (opts.padding * 2) + 60;

			var w = $.fn.fancybox.getViewport();
			
			if (opts.imageScale && (width > (w[0] - horizontal_space) || height > (w[1] - vertical_space))) {
				var ratio = Math.min(Math.min(w[0] - horizontal_space, width) / width, Math.min(w[1] - vertical_space, height) / height);

				width	= Math.round(ratio * width);
				height	= Math.round(ratio * height);
			}

			_set_content('<img alt="" id="fancy_img" src="' + imagePreloader.src + '" />', width, height);
		};

		function _preload_neighbor_images() {
			if ((opts.itemArray.length -1) > opts.itemCurrent) {
				var href = opts.itemArray[opts.itemCurrent + 1].href || false;

				if (href && href.match(imageRegExp)) {
					objNext = new Image();
					objNext.src = href;
				}
			}

			if (opts.itemCurrent > 0) {
				var href = opts.itemArray[opts.itemCurrent -1].href || false;

				if (href && href.match(imageRegExp)) {
					objNext = new Image();
					objNext.src = href;
				}
			}
		};

		function _set_content(value, width, height) {
			busy = true;

			var pad = opts.padding;

			if (oldIE || ieQuirks) {
				$("#fancy_content")[0].style.removeExpression("height");
				$("#fancy_content")[0].style.removeExpression("width");
			}

			if (pad > 0) {
				width	+= pad * 2;
				height	+= pad * 2;

				$("#fancy_content").css({
					'top'		: pad + 'px',
					'right'		: pad + 'px',
					'bottom'	: pad + 'px',
					'left'		: pad + 'px',
					'width'		: 'auto',
					'height'	: 'auto'
				});

				if (oldIE || ieQuirks) {
					$("#fancy_content")[0].style.setExpression('height',	'(this.parentNode.clientHeight - '	+ pad * 2 + ')');
					$("#fancy_content")[0].style.setExpression('width',		'(this.parentNode.clientWidth - '	+ pad * 2 + ')');
				}
			} else {
				$("#fancy_content").css({
					'top'		: 0,
					'right'		: 0,
					'bottom'	: 0,
					'left'		: 0,
					'width'		: '100%',
					'height'	: '100%'
				});
			}

			if ($("#fancy_outer").is(":visible") && width == $("#fancy_outer").width() && height == $("#fancy_outer").height()) {
				$("#fancy_content").fadeOut('fast', function() {
					$("#fancy_content").empty().append($(value)).fadeIn("normal", function() {
						_finish();
					});
				});

				return;
			}

			var w = $.fn.fancybox.getViewport();

			var itemTop		= (height	+ 60) > w[1] ? w[3] : (w[3] + Math.round((w[1] - height	- 60) * 0.5));
			var itemLeft	= (width	+ 40) > w[0] ? w[2] : (w[2] + Math.round((w[0] - width	- 40) * 0.5));

			var itemOpts = {
				'left':		itemLeft,
				'top':		itemTop,
				'width':	width + 'px',
				'height':	height + 'px'
			};

			if ($("#fancy_outer").is(":visible")) {
				$("#fancy_content").fadeOut("normal", function() {
					$("#fancy_content").empty();
					$("#fancy_outer").animate(itemOpts, opts.zoomSpeedChange, opts.easingChange, function() {
						$("#fancy_content").append($(value)).fadeIn("normal", function() {
							_finish();
						});
					});
				});

			} else {

				if (opts.zoomSpeedIn > 0 && opts.itemArray[opts.itemCurrent].orig !== undefined) {
					$("#fancy_content").empty().append($(value));

					var orig_item	= opts.itemArray[opts.itemCurrent].orig;
					var orig_pos	= $.fn.fancybox.getPosition(orig_item);

					$("#fancy_outer").css({
						'left':		(orig_pos.left	- 20 - opts.padding) + 'px',
						'top':		(orig_pos.top	- 20 - opts.padding) + 'px',
						'width':	$(orig_item).width() + (opts.padding * 2),
						'height':	$(orig_item).height() + (opts.padding * 2)
					});

					if (opts.zoomOpacity) {
						itemOpts.opacity = 'show';
					}

					$("#fancy_outer").animate(itemOpts, opts.zoomSpeedIn, opts.easingIn, function() {
						_finish();
					});

				} else {

					$("#fancy_content").hide().empty().append($(value)).show();
					$("#fancy_outer").css(itemOpts).fadeIn("normal", function() {
						_finish();
					});
				}
			}
		};

		function _set_navigation() {
			if (opts.itemCurrent !== 0) {
				$("#fancy_left, #fancy_left_ico").unbind().bind("click", function(e) {
					e.stopPropagation();

					opts.itemCurrent--;
					_change_item();

					return false;
				});

				$("#fancy_left").show();
			}

			if (opts.itemCurrent != ( opts.itemArray.length -1)) {
				$("#fancy_right, #fancy_right_ico").unbind().bind("click", function(e) {
					e.stopPropagation();

					opts.itemCurrent++;
					_change_item();

					return false;
				});

				$("#fancy_right").show();
			}
		};

		function _finish() {
			if ($.browser.msie) {
				$("#fancy_content")[0].style.removeAttribute('filter');
				$("#fancy_outer")[0].style.removeAttribute('filter');
			}

			_set_navigation();

			_preload_neighbor_images();

			$(document).bind("keydown.fb", function(e) {
				if (e.keyCode == 27 && opts.enableEscapeButton) {
					$.fn.fancybox.close();

				} else if(e.keyCode == 37 && opts.itemCurrent !== 0) {
					$(document).unbind("keydown.fb");
					opts.itemCurrent--;
					_change_item();
					

				} else if(e.keyCode == 39 && opts.itemCurrent != (opts.itemArray.length - 1)) {
					$(document).unbind("keydown.fb");
					opts.itemCurrent++;
					_change_item();
				}
			});

			if (opts.hideOnContentClick) {
				$("#fancy_content").click($.fn.fancybox.close);
			}

			if (opts.overlayShow && opts.hideOnOverlayClick) {
				$("#fancy_overlay").bind("click", $.fn.fancybox.close);
			}

			if (opts.showCloseButton) {
				$("#fancy_close").bind("click", $.fn.fancybox.close).show();
			}

			if (typeof opts.itemArray[ opts.itemCurrent ].title !== 'undefined' && opts.itemArray[ opts.itemCurrent ].title.length > 0) {
				var pos = $("#fancy_outer").position();

				$('#fancy_title div').text( opts.itemArray[ opts.itemCurrent ].title).html();

				$('#fancy_title').css({
					'top'	: pos.top + $("#fancy_outer").outerHeight() - 32,
					'left'	: pos.left + (($("#fancy_outer").outerWidth() * 0.5) - ($('#fancy_title').width() * 0.5))
				}).show();
			}

			if (opts.overlayShow && IE6) {
				$('embed, object, select', $('#fancy_content')).css('visibility', 'visible');
			}

			if ($.isFunction(opts.callbackOnShow)) {
				opts.callbackOnShow( opts.itemArray[ opts.itemCurrent ] );
			}

			if ($.browser.msie) {
				$("#fancy_outer")[0].style.removeAttribute('filter'); 
				$("#fancy_content")[0].style.removeAttribute('filter'); 
			}
			
			busy = false;
		};

		return this.unbind('click.fb').bind('click.fb', _initialize);
	};

	$.fn.fancybox.scrollBox = function() {
		var w = $.fn.fancybox.getViewport();
		
		if (opts.centerOnScroll && $("#fancy_outer").is(':visible')) {
			var ow	= $("#fancy_outer").outerWidth();
			var oh	= $("#fancy_outer").outerHeight();

			var pos	= {
				'top'	: (oh > w[1] ? w[3] : w[3] + Math.round((w[1] - oh) * 0.5)),
				'left'	: (ow > w[0] ? w[2] : w[2] + Math.round((w[0] - ow) * 0.5))
			};

			$("#fancy_outer").css(pos);

			$('#fancy_title').css({
				'top'	: pos.top	+ oh - 32,
				'left'	: pos.left	+ ((ow * 0.5) - ($('#fancy_title').width() * 0.5))
			});
		}
		
		if (IE6 && $("#fancy_overlay").is(':visible')) {
			$("#fancy_overlay").css({
				'height' : $(document).height()
			});
		}
		
		if ($("#fancy_loading").is(':visible')) {
			$("#fancy_loading").css({'left': ((w[0] - 40) * 0.5 + w[2]), 'top': ((w[1] - 40) * 0.5 + w[3])});
		}
	};

	$.fn.fancybox.getNumeric = function(el, prop) {
		return parseInt($.curCSS(el.jquery?el[0]:el,prop,true))||0;
	};

	$.fn.fancybox.getPosition = function(el) {
		var pos = el.offset();

		pos.top	+= $.fn.fancybox.getNumeric(el, 'paddingTop');
		pos.top	+= $.fn.fancybox.getNumeric(el, 'borderTopWidth');

		pos.left += $.fn.fancybox.getNumeric(el, 'paddingLeft');
		pos.left += $.fn.fancybox.getNumeric(el, 'borderLeftWidth');

		return pos;
	};

	$.fn.fancybox.showIframe = function() {
		$("#fancy_loading").hide();
		$("#fancy_frame").show();
	};

	$.fn.fancybox.getViewport = function() {
		return [$(window).width(), $(window).height(), $(document).scrollLeft(), $(document).scrollTop() ];
	};

	$.fn.fancybox.animateLoading = function() {
		if (!$("#fancy_loading").is(':visible')){
			clearInterval(loadingTimer);
			return;
		}

		$("#fancy_loading > div").css('top', (loadingFrame * -40) + 'px');

		loadingFrame = (loadingFrame + 1) % 12;
	};

	$.fn.fancybox.showLoading = function() {
		clearInterval(loadingTimer);

		var w = $.fn.fancybox.getViewport();

		$("#fancy_loading").css({'left': ((w[0] - 40) * 0.5 + w[2]), 'top': ((w[1] - 40) * 0.5 + w[3])}).show();
		$("#fancy_loading").bind('click', $.fn.fancybox.close);

		loadingTimer = setInterval($.fn.fancybox.animateLoading, 66);
	};

	$.fn.fancybox.close = function() {
		busy = true;

		$(imagePreloader).unbind();

		$(document).unbind("keydown.fb");
		$(window).unbind("resize.fb scroll.fb");

		$("#fancy_overlay, #fancy_content, #fancy_close").unbind();

		$("#fancy_close, #fancy_loading, #fancy_left, #fancy_right, #fancy_title").hide();

		__cleanup = function() {
			if ($("#fancy_overlay").is(':visible')) {
				$("#fancy_overlay").fadeOut("fast");
			}

			$("#fancy_content").empty();
			
			if (opts.centerOnScroll) {
				$(window).unbind("resize.fb scroll.fb");
			}

			if (IE6) {
				$('embed, object, select').css('visibility', 'visible');
			}

			if ($.isFunction(opts.callbackOnClose)) {
				opts.callbackOnClose();
			}

			busy = false;
		};

		if ($("#fancy_outer").is(":visible") !== false) {
			if (opts.zoomSpeedOut > 0 && opts.itemArray[opts.itemCurrent].orig !== undefined) {
				var orig_item	= opts.itemArray[opts.itemCurrent].orig;
				var orig_pos	= $.fn.fancybox.getPosition(orig_item);

				var itemOpts = {
					'left':		(orig_pos.left	- 20 - opts.padding) + 'px',
					'top': 		(orig_pos.top	- 20 - opts.padding) + 'px',
					'width':	$(orig_item).width() + (opts.padding * 2),
					'height':	$(orig_item).height() + (opts.padding * 2)
				};

				if (opts.zoomOpacity) {
					itemOpts.opacity = 'hide';
				}

				$("#fancy_outer").stop(false, true).animate(itemOpts, opts.zoomSpeedOut, opts.easingOut, __cleanup);

			} else {
				$("#fancy_outer").stop(false, true).fadeOut('fast', __cleanup);
			}

		} else {
			__cleanup();
		}

		return false;
	};

	$.fn.fancybox.build = function() {
		var html = '';

		html += '<div id="fancy_overlay"></div>';
		html += '<div id="fancy_loading"><div></div></div>';

		html += '<div id="fancy_outer">';
		html += '<div id="fancy_inner">';

		html += '<div id="fancy_close"></div>';

		html += '<div id="fancy_bg"><div class="fancy_bg" id="fancy_bg_n"></div><div class="fancy_bg" id="fancy_bg_ne"></div><div class="fancy_bg" id="fancy_bg_e"></div><div class="fancy_bg" id="fancy_bg_se"></div><div class="fancy_bg" id="fancy_bg_s"></div><div class="fancy_bg" id="fancy_bg_sw"></div><div class="fancy_bg" id="fancy_bg_w"></div><div class="fancy_bg" id="fancy_bg_nw"></div></div>';

		html += '<a href="javascript:;" id="fancy_left"><span class="fancy_ico" id="fancy_left_ico"></span></a><a href="javascript:;" id="fancy_right"><span class="fancy_ico" id="fancy_right_ico"></span></a>';

		html += '<div id="fancy_content"></div>';

		html += '</div>';
		html += '</div>';
		
		html += '<div id="fancy_title"></div>';
		
		$(html).appendTo("body");

		$('<table cellspacing="0" cellpadding="0" border="0"><tr><td class="fancy_title" id="fancy_title_left"></td><td class="fancy_title" id="fancy_title_main"><div></div></td><td class="fancy_title" id="fancy_title_right"></td></tr></table>').appendTo('#fancy_title');

		if ($.browser.msie) {
			$(".fancy_bg").fixPNG();
		}

		if (IE6) {
			$("div#fancy_overlay").css("position", "absolute");
			$("#fancy_loading div, #fancy_close, .fancy_title, .fancy_ico").fixPNG();

			$("#fancy_inner").prepend('<iframe id="fancy_bigIframe" src="javascript:false;" scrolling="no" frameborder="0"></iframe>');

			// Get rid of the 'false' text introduced by the URL of the iframe
			var frameDoc = $('#fancy_bigIframe')[0].contentWindow.document;
			frameDoc.open();
			frameDoc.close();
			
		}
	};

	$.fn.fancybox.defaults = {
		padding				:	10,
		imageScale			:	true,
		zoomOpacity			:	true,
		zoomSpeedIn			:	0,
		zoomSpeedOut		:	0,
		zoomSpeedChange		:	300,
		easingIn			:	'swing',
		easingOut			:	'swing',
		easingChange		:	'swing',
		frameWidth			:	560,
		frameHeight			:	340,
		overlayShow			:	true,
		overlayOpacity		:	0.3,
		overlayColor		:	'#666',
		enableEscapeButton	:	true,
		showCloseButton		:	true,
		hideOnOverlayClick	:	true,
		hideOnContentClick	:	true,
		centerOnScroll		:	true,
		itemArray			:	[],
		callbackOnStart		:	null,
		callbackOnShow		:	null,
		callbackOnClose		:	null
	};

	$(document).ready(function() {
		ieQuirks = $.browser.msie && !$.boxModel;

		if ($("#fancy_outer").length < 1) {
			$.fn.fancybox.build();
		}
	});

})(jQuery);

// MSDropDown - jquery.dd.js
// author: Marghoob Suleman
// Date: 12th Aug, 2009
// Version: 2.1 {date: 3rd Sep 2009}
// Revision: 25
// web: www.giftlelo.com | www.marghoobsuleman.com
// MSDropDown - jquery.dd.js
// author: Marghoob Suleman
// Date: 12th Aug, 2009
// Version: 2.1 {date: 3rd Sep 2009}
// Revision: 25
// web: www.giftlelo.com | www.marghoobsuleman.com
/*
// msDropDown is free jQuery Plugin: you can redistribute it and/or modify
// it under the terms of the either the MIT License or the Gnu General Public License (GPL) Version 2
*/
;(function($) {
	var oldDiv = "";
	$.fn.dd = function(options) {
		$this =  this;
		options = $.extend({
			height:120,
			visibleRows:7,
			rowHeight:23,
			showIcon:true,
			zIndex:9999,
			style:''
		}, options);
		var selectedValue = "";
		var actionSettings ={};
		actionSettings.insideWindow = true;
		actionSettings.keyboardAction = false;
		actionSettings.currentKey = null;
		var ddList = false;
		config = {postElementHolder:'_msddHolder', postID:'_msdd', postTitleID:'_title',postTitleTextID:'_titletext',postChildID:'_child',postAID:'_msa',postOPTAID:'_msopta',postInputID:'_msinput', postArrowID:'_arrow', postInputhidden:'_inp'};
		styles = {dd:'dd', ddTitle:'ddTitle', arrow:'arrow', ddChild:'ddChild', disbaled:.30};
		attributes = {actions:"onfocus,onblur,onchange,onclick,ondblclick,onmousedown,onmouseup,onmouseover,onmousemove,onmouseout,onkeypress,onkeydown,onkeyup", prop:"size,multiple,disabled,tabindex"};
		var elementid = $(this).attr("id");
		var inlineCSS = $(this).attr("style");
		options.style += (inlineCSS==undefined) ? "" : inlineCSS;
		var allOptions = $(this).children();
		ddList = ($(this).attr("size")>0 || $(this).attr("multiple")==true) ? true : false;
		if(ddList) {options.visibleRows = $(this).attr("size");};
		var a_array = {};//stores id, html & value etc
		//create wrapper
		createDropDown();
	
	function getPostID(id) {
		return elementid+config[id];
	};
	function getOptionsProperties(option) {
		var currentOption = option;
		var styles = $(currentOption).attr("style");
		return styles;
	};
	function matchIndex(index) {
		var selectedIndex = $("#"+elementid+" option:selected");
		if(selectedIndex.length>1) {
			for(var i=0;i<selectedIndex.length;i++) {
				if(index == selectedIndex[i].index) {
					return true;
				};
			};
		} else if(selectedIndex.length==1) {
			if(selectedIndex[0].index==index) {
				return true;
			};
		};
		return false;
	}
	function createATags() {
		var childnodes = allOptions;
		var aTag = "";
		var aidfix = getPostID("postAID");
		var aidoptfix = getPostID("postOPTAID");
		childnodes.each(function(current){
								 var currentOption = childnodes[current];
								 //OPTGROUP
								 if(currentOption.nodeName == "OPTGROUP") {
								  	aTag += "<div class='opta'>";
									 aTag += "<span style='font-weight:bold;font-style:italic; clear:both;'>"+$(currentOption).attr("label")+"</span>";
									 var optChild = $(currentOption).children();
									 optChild.each(function(currentopt){
															var currentOptOption = optChild[currentopt];
															 var aid = aidoptfix+"_"+(current)+"_"+(currentopt);
															 var arrow = $(currentOptOption).attr("title");
															 arrow = (arrow.length==0) ? "" : '<img src="'+arrow+'" align="left" /> ';
															 var sText = $(currentOptOption).text();
															 var sValue = $(currentOptOption).val();
															 var sEnabledClass = ($(currentOptOption).attr("disabled")==true) ? "disabled" : "enabled";
															 a_array[aid] = {html:arrow + sText, value:sValue, text:sText, index:currentOptOption.index, id:aid};
															 var innerStyle = getOptionsProperties(currentOptOption);
															 if(matchIndex(currentOptOption.index)==true) {
																 aTag += '<a href="javascript:void(0);" class="selected '+sEnabledClass+'"';
															 } else {
															 	aTag += '<a  href="javascript:void(0);" class="'+sEnabledClass+'"';
															 };
															 if(innerStyle!=false)
															 aTag +=  ' style="'+innerStyle+'"';
															 aTag +=  ' id="'+aid+'">';
															 aTag += arrow + sText+'</a>';															 
															});
									 aTag += "</div>";
									 
								 } else {
									 var aid = aidfix+"_"+(current);
									 var arrow = $(currentOption).attr("title");
									 arrow = (arrow.length==0) ? "" : '<img src="'+arrow+'" align="left" /> ';									 
									 var sText = $(currentOption).text();
									 var sValue = $(currentOption).val();
									 var sEnabledClass = ($(currentOption).attr("disabled")==true) ? "disabled" : "enabled";
									 a_array[aid] = {html:arrow + sText, value:sValue, text:sText, index:currentOption.index, id:aid};
									 var innerStyle = getOptionsProperties(currentOption);
									 if(matchIndex(currentOption.index)==true) {
										 aTag += '<a href="javascript:void(0);" class="selected '+sEnabledClass+'"';
									 } else {
										aTag += '<a  href="javascript:void(0);" class="'+sEnabledClass+'"';
									 };
									 if(innerStyle!=false)
									 aTag +=  ' style="'+innerStyle+'"';
									 aTag +=  ' id="'+aid+'">';
									 aTag += arrow + sText+'</a>';															 
								 };
								 });
		return aTag;
	};
	function createChildDiv() {
		var id = getPostID("postID");
		var childid = getPostID("postChildID");
		var sStyle = options.style;
		sDiv = "";
		sDiv += '<div id="'+childid+'" class="'+styles.ddChild+'"';
		if(!ddList) {
			sDiv += (sStyle!="") ? ' style="'+sStyle+'"' : ''; 
		} else {
			sDiv += (sStyle!="") ? ' style="border-top:1px solid #c3c3c3;display:block;position:relative;'+sStyle+'"' : ''; 
		}
		sDiv += '>';		
		return sDiv;
	};

	function createTitleDiv() {
		var titleid = getPostID("postTitleID");
		var arrowid = getPostID("postArrowID");
		var titletextid = getPostID("postTitleTextID");
		var inputhidden = getPostID("postInputhidden");
		var sText = $("#"+elementid+" option:selected").text();
		var arrow = $("#"+elementid+" option:selected").attr("title");
		arrow = (arrow.length==0 || arrow==undefined || options.showIcon==false) ? "" : '<img src="'+arrow+'" align="left" /> ';
		var sDiv = '<div id="'+titleid+'" class="'+styles.ddTitle+'"';
		sDiv += '>';
		sDiv += '<span id="'+arrowid+'" class="'+styles.arrow+'"></span><span class="textTitle" id="'+titletextid+'">'+arrow + sText+'</span></div>';
		return sDiv;
	};
	function createDropDown() {
		var changeInsertionPoint = false;
		var id = getPostID("postID");
		var titleid = getPostID("postTitleID");
		var titletextid = getPostID("postTitleTextID");
		var childid = getPostID("postChildID");
		var arrowid = getPostID("postArrowID");
		var iWidth = $("#"+elementid).width();
		var sStyle = options.style;
		if($("#"+id).length>0) {
			$("#"+id).remove();
			changeInsertionPoint = true;
		}
		var sDiv = '<div id="'+id+'" class="'+styles.dd+'"';
		sDiv += (sStyle!="") ? ' style="'+sStyle+'"' : '';
		sDiv += '>';
		//create title bar
		if(!ddList)
		sDiv += createTitleDiv();
		//create child
		sDiv += createChildDiv();
		sDiv += createATags();
		sDiv += "</div>";
		sDiv += "</div>";
		if(changeInsertionPoint==true) {
			var sid =getPostID("postElementHolder");
			$("#"+sid).after(sDiv);
		} else {
			$("#"+elementid).after(sDiv);
		}
		$("#"+id).css("width", iWidth+"px");
		$("#"+childid).css("width", (iWidth-2)+"px");
		if(allOptions.length>options.visibleRows) {
			var margin = parseInt($("#"+childid+" a:first").css("padding-bottom")) + parseInt($("#"+childid+" a:first").css("padding-top"));
			var iHeight = ((options.rowHeight)*options.visibleRows) - margin;
			$("#"+childid).css("height", iHeight+"px");
		}
		//set out of vision
		if(changeInsertionPoint==false) {
			setOutOfVision();
			addNewEvents(elementid);
		}
		if($("#"+elementid).attr("disabled")==true) {
			$("#"+id).css("opacity", styles.disbaled);
		} else {
			applyEvents();
			//add events
			//arrow hightlight
			if(!ddList) {
				$("#"+titleid).bind("mouseover", function(event) {
														  hightlightArrow(1);
														  });
				$("#"+titleid).bind("mouseout", function(event) {
														  hightlightArrow(0);
														  });
			};
			//open close events
			$("#"+childid+ " a.enabled").bind("click", function(event) {
														 event.preventDefault();
														 manageSelection(this);
														 if(!ddList) {
															 $("#"+childid).unbind("mouseover");
															 setInsideWindow(false);															 
															 var sText = (options.showIcon==false) ? $(this).text() : $(this).html();
															  setTitleText(sText);
															  closeMe();
														 };
														 setValue();
														 //actionSettings.oldIndex = a_array[$(this).attr("id")].index;
														 });
			$("#"+childid+ " a.disabled").css("opacity", styles.disbaled);
			if(ddList) {
				$("#"+childid).bind("mouseover", function(event) {if(!actionSettings.keyboardAction) {
																	 actionSettings.keyboardAction = true;
																	 $(document).bind("keydown", function(event) {
																										var keyCode = event.keyCode;	
																										actionSettings.currentKey = keyCode;
																										if(keyCode==39 || keyCode==40) {
																											//move to next
																											event.preventDefault(); event.stopPropagation();
																											next();
																											setValue();
																										};
																										if(keyCode==37 || keyCode==38) {
																											event.preventDefault(); event.stopPropagation();
																											//move to previous
																											previous();
																											setValue();
																										};
																										  });
																	 
																	 }});
			};
			$("#"+childid).bind("mouseout", function(event) {setInsideWindow(false);$(document).unbind("keydown");actionSettings.keyboardAction = false;actionSettings.currentKey=null;});
			if(!ddList) {
				$("#"+titleid).bind("click", function(event) {
													  setInsideWindow(false);
														if($("#"+childid+":visible").length==1) {
															$("#"+childid).unbind("mouseover");
														} else {
															$("#"+childid).bind("mouseover", function(event) {setInsideWindow(true);});
															openMe();
														};
													  });
			};
			$("#"+titleid).bind("mouseout", function(evt) {
													 setInsideWindow(false);
													 })
		};
	};
	function getByIndex(index) {
		for(var i in a_array) {
			if(a_array[i].index==index) {
				return a_array[i];
			}
		}
	}
	function manageSelection(obj) {
		var childid = getPostID("postChildID");
		if(!ddList) {
			$("#"+childid+ " a.selected").removeClass("selected");
		} 
		var selectedA = $("#"+childid + " a.selected").attr("id");
		if(selectedA!=undefined) {
			var oldIndex = (actionSettings.oldIndex==undefined || actionSettings.oldIndex==null) ? a_array[selectedA].index : actionSettings.oldIndex;
		};
		if(obj && !ddList) {
			$(obj).addClass("selected");
		};				
		if(ddList) {
			var keyCode = actionSettings.currentKey;
			if($("#"+elementid).attr("multiple")==true) {
				if(keyCode == 17) {
					//control
						actionSettings.oldIndex = a_array[$(obj).attr("id")].index;
						$(obj).toggleClass("selected");
					//multiple
				} else if(keyCode==16) {
					$("#"+childid+ " a.selected").removeClass("selected");
					$(obj).addClass("selected");
					//shift
					var currentSelected = $(obj).attr("id");
					var currentIndex = a_array[currentSelected].index;
					for(var i=Math.min(oldIndex, currentIndex);i<=Math.max(oldIndex, currentIndex);i++) {
						$("#"+getByIndex(i).id).addClass("selected");
					}
				} else {
					$("#"+childid+ " a.selected").removeClass("selected");
					$(obj).addClass("selected");
					actionSettings.oldIndex = a_array[$(obj).attr("id")].index;
				};
			} else {
					$("#"+childid+ " a.selected").removeClass("selected");
					$(obj).addClass("selected");
					actionSettings.oldIndex = a_array[$(obj).attr("id")].index;				
			};
		};		
	};
	function addNewEvents(id) {
		document.getElementById(id).refresh = function(e) {
			$("#"+this.id).dd(options);
		};
	};
	function setInsideWindow(val) {
		actionSettings.insideWindow = val;
	};
	function getInsideWindow() {
		return actionSettings.insideWindow;
	};
	function applyEvents() {
		var mainid = getPostID("postID");
		var actions_array = attributes.actions.split(",");
		for(var iCount=0;iCount<actions_array.length;iCount++) {
			var action = actions_array[iCount];
			var actionFound = $("#"+elementid).attr(action);
			if(actionFound!=undefined) {
				switch(action) {
					case "onfocus": 
					$("#"+mainid).bind("mouseenter", function(event) {
													   document.getElementById(elementid).focus();
													   });
					break;
					case "onclick": 
					$("#"+mainid).bind("click", function(event) {
													   document.getElementById(elementid).onclick();
													   });
					break;
					case "ondblclick": 
					$("#"+mainid).bind("dblclick", function(event) {
													   document.getElementById(elementid).ondblclick();
													   });
					break;
					case "onmousedown": 
					$("#"+mainid).bind("mousedown", function(event) {
													   document.getElementById(elementid).onmousedown();
													   });
					break;
					case "onmouseup": 
					//has in closeMe mthod
					$("#"+mainid).bind("mouseup", function(event) {
													   document.getElementById(elementid).onmouseup();
													   //setValue();
													   });
					break;
					case "onmouseover": 
					$("#"+mainid).bind("mouseover", function(event) {
													   document.getElementById(elementid).onmouseover();
													   });
					break;
					case "onmousemove": 
					$("#"+mainid).bind("mousemove", function(event) {
													   document.getElementById(elementid).onmousemove();
													   });
					break;
					case "onmouseout": 
					$("#"+mainid).bind("mouseout", function(event) {
													   document.getElementById(elementid).onmouseout();
													   });
					break;
				};
			};
		};
		
	};
	function setOutOfVision() {
		var sId = getPostID("postElementHolder");
		$("#"+elementid).after("<div style='height:0px;overflow:hidden;position:absolute;' id='"+sId+"'></div>");
		$("#"+elementid).appendTo($("#"+sId));
	};
	function setTitleText(sText) {
		var titletextid = getPostID("postTitleTextID");
		$("#"+titletextid).html(sText);
	};
	function next() {
		var titletextid = getPostID("postTitleTextID");
		var childid = getPostID("postChildID");
		var allAs = $("#"+childid + " a.enabled");
		for(var current=0;current<allAs.length;current++) {
			var currentA = allAs[current];
			var id = $(currentA).attr("id");
			if($(currentA).hasClass("selected") && current<allAs.length-1) {
				$("#"+childid + " a.selected").removeClass("selected");
				$(allAs[current+1]).addClass("selected");
				//manageSelection(allAs[current+1]);
				var selectedA = $("#"+childid + " a.selected").attr("id");
				if(!ddList) {
					var sText = (options.showIcon==false) ? a_array[selectedA].text : a_array[selectedA].html;
					setTitleText(sText);
				}
				if(parseInt(($("#"+selectedA).position().top+$("#"+selectedA).height()))>=parseInt($("#"+childid).height())) {
					$("#"+childid).scrollTop(($("#"+childid).scrollTop())+$("#"+selectedA).height()+$("#"+selectedA).height());
				};
				break;
			};
		};
	};
	function previous() {
		var titletextid = getPostID("postTitleTextID");
		var childid = getPostID("postChildID");
		var allAs = $("#"+childid + " a.enabled");
		for(var current=0;current<allAs.length;current++) {
			var currentA = allAs[current];
			var id = $(currentA).attr("id");
			if($(currentA).hasClass("selected") && current!=0) {
				$("#"+childid + " a.selected").removeClass("selected");
				$(allAs[current-1]).addClass("selected");				
				//manageSelection(allAs[current-1]);
				var selectedA = $("#"+childid + " a.selected").attr("id");
				if(!ddList) {
					var sText = (options.showIcon==false) ? a_array[selectedA].text : a_array[selectedA].html;
					setTitleText(sText);
				}
				if(parseInt(($("#"+selectedA).position().top+$("#"+selectedA).height())) <=0) {
					$("#"+childid).scrollTop(($("#"+childid).scrollTop()-$("#"+childid).height())-$("#"+selectedA).height());
				};
				break;
			};
		};
	};
	function setValue() {
		var childid = getPostID("postChildID");
		var allSelected = $("#"+childid + " a.selected");
		if(allSelected.length==1) {
			var sText = $("#"+childid + " a.selected").text();
			var selectedA = $("#"+childid + " a.selected").attr("id");
			if(selectedA!=undefined) {
				var sValue = a_array[selectedA].value;
				document.getElementById(elementid).selectedIndex = a_array[selectedA].index;
			};
		} else if(allSelected.length>1) { 
			var alls = $("#"+elementid +" > option:selected").removeAttr("selected");
			for(var i=0;i<allSelected.length;i++) {
				var selectedA = $(allSelected[i]).attr("id");
				var index = a_array[selectedA].index;
				document.getElementById(elementid).options[index].selected = "selected";
			};
		};
	};
	function openMe() {
		var childid = getPostID("postChildID");
		if(oldDiv!="" && childid!=oldDiv) { 
			$("#"+oldDiv).slideUp("fast");
			$("#"+oldDiv).css({zIndex:'0'});
		};
		if($("#"+childid).css("display")=="none") {
			selectedValue = a_array[$("#"+childid +" a.selected").attr("id")].text;
			$(document).bind("keydown", function(event) {
													var keyCode = event.keyCode;											
													if(keyCode==39 || keyCode==40) {
														//move to next
														event.preventDefault(); event.stopPropagation();
														next();
													};
													if(keyCode==37 || keyCode==38) {
														event.preventDefault(); event.stopPropagation();
														//move to previous
														previous();
													};
													if(keyCode==27 || keyCode==13) {
														closeMe();
														setValue();
													};
													if($("#"+elementid).attr("onkeydown")!=undefined) {
															document.getElementById(elementid).onkeydown();
														};														
													   });
			$(document).bind("keyup", function(event) {
													if($("#"+elementid).attr("onkeyup")!=undefined) {
														//$("#"+elementid).keyup();
														document.getElementById(elementid).onkeyup();
													};												 
												 });

					$(document).bind("mouseup", function(evt){
															if(getInsideWindow()==false) {
															 closeMe();
															}
														 });													  
			$("#"+childid).css({zIndex:options.zIndex});
			$("#"+childid).slideDown("fast");
		if(childid!=oldDiv) {
			oldDiv = childid;
		}
		};
	};
	function closeMe() {
				var childid = getPostID("postChildID");
				$(document).unbind("keydown");
				$(document).unbind("keyup");
				$(document).unbind("mouseup");
				$("#"+childid).slideUp("fast", function(event) {
															checkMethodAndApply();
															$("#"+childid).css({zIndex:'0'});
															});
		
	};
	function checkMethodAndApply() {
		var childid = getPostID("postChildID");
		if($("#"+elementid).attr("onchange")!=undefined) {
			var currentSelectedValue = a_array[$("#"+childid +" a.selected").attr("id")].text;
			if(selectedValue!=currentSelectedValue){document.getElementById(elementid).onchange();};
		}
		if($("#"+elementid).attr("onmouseup")!=undefined) {
			document.getElementById(elementid).onmouseup();
		}
		if($("#"+elementid).attr("onblur")!=undefined) { 
			$(document).bind("mouseup", function(evt) {
												   $("#"+elementid).focus();
												   $("#"+elementid)[0].blur();
												   setValue();
												   $(document).unbind("mouseup");
												});
		};
	};
	function hightlightArrow(ison) {
		var arrowid = getPostID("postArrowID");
		if(ison==1)
			$("#"+arrowid).css({backgroundPosition:'0 100%'});
		else 
			$("#"+arrowid).css({backgroundPosition:'0 0'});
	};
	};
	$.fn.msDropDown = function(properties) {
		var dds = $(this);
		for(var iCount=0;iCount<dds.length;iCount++) {
			var id = $(dds[iCount]).attr("id");
			if(properties==undefined) {
				$("#"+id).dd();
			} else {
				$("#"+id).dd(properties);
			};
		};		
	};
})(jQuery);

/**
 * --------------------------------------------------------------------
 * jQuery-Plugin "pngFix"
 * Version: 1.2, 09.03.2009
 * by Andreas Eberhard, andreas.eberhard@gmail.com
 *                      http://jquery.andreaseberhard.de/
 *
 * Copyright (c) 2007 Andreas Eberhard
 * Licensed under GPL (http://www.opensource.org/licenses/gpl-license.php)
 *
 * Changelog:
 *    09.03.2009 Version 1.2
 *    - Update for jQuery 1.3.x, removed @ from selectors
 *    11.09.2007 Version 1.1
 *    - removed noConflict
 *    - added png-support for input type=image
 *    - 01.08.2007 CSS background-image support extension added by Scott Jehl, scott@filamentgroup.com, http://www.filamentgroup.com
 *    31.05.2007 initial Version 1.0
 * --------------------------------------------------------------------
 * @example $(function(){$(document).pngFix();});
 * @desc Fixes all PNG's in the document on document.ready
 *
 * jQuery(function(){jQuery(document).pngFix();});
 * @desc Fixes all PNG's in the document on document.ready when using noConflict
 *
 * @example $(function(){$('div.examples').pngFix();});
 * @desc Fixes all PNG's within div with class examples
 *
 * @example $(function(){$('div.examples').pngFix( { blankgif:'ext.gif' } );});
 * @desc Fixes all PNG's within div with class examples, provides blank gif for input with png
 * --------------------------------------------------------------------
 */

(function($) {

jQuery.fn.pngFix = function(settings) {

	// Settings
	settings = jQuery.extend({
		blankgif: 'blank.gif'
	}, settings);

	var ie55 = (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion) == 4 && navigator.appVersion.indexOf("MSIE 5.5") != -1);
	var ie6 = (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion) == 4 && navigator.appVersion.indexOf("MSIE 6.0") != -1);

	if (jQuery.browser.msie && (ie55 || ie6)) {

		//fix images with png-source
		jQuery(this).find("img[src$=.png]").each(function() {

			jQuery(this).attr('width',jQuery(this).width());
			jQuery(this).attr('height',jQuery(this).height());

			var prevStyle = '';
			var strNewHTML = '';
			var imgId = (jQuery(this).attr('id')) ? 'id="' + jQuery(this).attr('id') + '" ' : '';
			var imgClass = (jQuery(this).attr('class')) ? 'class="' + jQuery(this).attr('class') + '" ' : '';
			var imgTitle = (jQuery(this).attr('title')) ? 'title="' + jQuery(this).attr('title') + '" ' : '';
			var imgAlt = (jQuery(this).attr('alt')) ? 'alt="' + jQuery(this).attr('alt') + '" ' : '';
			var imgAlign = (jQuery(this).attr('align')) ? 'float:' + jQuery(this).attr('align') + ';' : '';
			var imgHand = (jQuery(this).parent().attr('href')) ? 'cursor:hand;' : '';
			if (this.style.border) {
				prevStyle += 'border:'+this.style.border+';';
				this.style.border = '';
			}
			if (this.style.padding) {
				prevStyle += 'padding:'+this.style.padding+';';
				this.style.padding = '';
			}
			if (this.style.margin) {
				prevStyle += 'margin:'+this.style.margin+';';
				this.style.margin = '';
			}
			var imgStyle = (this.style.cssText);

			strNewHTML += '<span '+imgId+imgClass+imgTitle+imgAlt;
			strNewHTML += 'style="position:relative;white-space:pre-line;display:inline-block;background:transparent;'+imgAlign+imgHand;
			strNewHTML += 'width:' + jQuery(this).width() + 'px;' + 'height:' + jQuery(this).height() + 'px;';
			strNewHTML += 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader' + '(src=\'' + jQuery(this).attr('src') + '\', sizingMethod=\'scale\');';
			strNewHTML += imgStyle+'"></span>';
			if (prevStyle != ''){
				strNewHTML = '<span style="position:relative;display:inline-block;'+prevStyle+imgHand+'width:' + jQuery(this).width() + 'px;' + 'height:' + jQuery(this).height() + 'px;'+'">' + strNewHTML + '</span>';
			}

			jQuery(this).hide();
			jQuery(this).after(strNewHTML);

		});

		// fix css background pngs
		jQuery(this).find("*").each(function(){
			var bgIMG = jQuery(this).css('background-image');
			if(bgIMG.indexOf(".png")!=-1){
				var iebg = bgIMG.split('url("')[1].split('")')[0];
				jQuery(this).css('background-image', 'none');
				jQuery(this).get(0).runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + iebg + "',sizingMethod='scale')";
			}
		});
		
		//fix input with png-source
		jQuery(this).find("input[src$=.png]").each(function() {
			var bgIMG = jQuery(this).attr('src');
			jQuery(this).get(0).runtimeStyle.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader' + '(src=\'' + bgIMG + '\', sizingMethod=\'scale\');';
   		jQuery(this).attr('src', settings.blankgif)
		});
	
	}
	
	return jQuery;

};

})(jQuery);


/**
 * jCarousel - Riding carousels with jQuery
 *   http://sorgalla.com/jcarousel/
 *
 * Copyright (c) 2006 Jan Sorgalla (http://sorgalla.com)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * Built on top of the jQuery library
 *   http://jquery.com
 *
 * Inspired by the "Carousel Component" by Bill Scott
 *   http://billwscott.com/carousel/
 */

(function($) {
    /**
     * Creates a carousel for all matched elements.
     *
     * @example $("#mycarousel").jcarousel();
     * @before <ul id="mycarousel" class="jcarousel-skin-name"><li>First item</li><li>Second item</li></ul>
     * @result
     *
     * <div class="jcarousel-skin-name">
     *   <div class="jcarousel-container">
     *     <div disabled="disabled" class="jcarousel-prev jcarousel-prev-disabled"></div>
     *     <div class="jcarousel-next"></div>
     *     <div class="jcarousel-clip">
     *       <ul class="jcarousel-list">
     *         <li class="jcarousel-item-1">First item</li>
     *         <li class="jcarousel-item-2">Second item</li>
     *       </ul>
     *     </div>
     *   </div>
     * </div>
     *
     * @name jcarousel
     * @type jQuery
     * @param Hash o A set of key/value pairs to set as configuration properties.
     * @cat Plugins/jCarousel
     */
    $.fn.jcarousel = function(o) {
        return this.each(function() {
            new $jc(this, o);
        });
    };

    // Default configuration properties.
    var defaults = {
        vertical: false,
        start: 1,
        offset: 1,
        size: null,
        scroll: 3,
        visible: null,
        animation: 'normal',
        easing: 'swing',
        auto: 0,
        wrap: null,
        initCallback: null,
        reloadCallback: null,
        itemLoadCallback: null,
        itemFirstInCallback: null,
        itemFirstOutCallback: null,
        itemLastInCallback: null,
        itemLastOutCallback: null,
        itemVisibleInCallback: null,
        itemVisibleOutCallback: null,
        buttonNextHTML: '<div></div>',
        buttonPrevHTML: '<div></div>',
        buttonNextEvent: 'click',
        buttonPrevEvent: 'click',
        buttonNextCallback: null,
        buttonPrevCallback: null
    };

    /**
     * The jCarousel object.
     *
     * @constructor
     * @name $.jcarousel
     * @param Object e The element to create the carousel for.
     * @param Hash o A set of key/value pairs to set as configuration properties.
     * @cat Plugins/jCarousel
     */
    $.jcarousel = function(e, o) {
        this.options    = $.extend({}, defaults, o || {});

        this.locked     = false;

        this.container  = null;
        this.clip       = null;
        this.list       = null;
        this.buttonNext = null;
        this.buttonPrev = null;

        this.wh = !this.options.vertical ? 'width' : 'height';
        this.lt = !this.options.vertical ? 'left' : 'top';

        // Extract skin class
        var skin = '', split = e.className.split(' ');

        for (var i = 0; i < split.length; i++) {
            if (split[i].indexOf('jcarousel-skin') != -1) {
                $(e).removeClass(split[i]);
                var skin = split[i];
                break;
            }
        }

        if (e.nodeName == 'UL' || e.nodeName == 'OL') {
            this.list = $(e);
            this.container = this.list.parent();

            if (this.container.hasClass('jcarousel-clip')) {
                if (!this.container.parent().hasClass('jcarousel-container'))
                    this.container = this.container.wrap('<div></div>');

                this.container = this.container.parent();
            } else if (!this.container.hasClass('jcarousel-container'))
                this.container = this.list.wrap('<div></div>').parent();
        } else {
            this.container = $(e);
            this.list = $(e).find('>ul,>ol,div>ul,div>ol');
        }

        if (skin != '' && this.container.parent()[0].className.indexOf('jcarousel-skin') == -1)
        	this.container.wrap('<div class=" '+ skin + '"></div>');

        this.clip = this.list.parent();

        if (!this.clip.length || !this.clip.hasClass('jcarousel-clip'))
            this.clip = this.list.wrap('<div></div>').parent();

        this.buttonPrev = $('.jcarousel-prev', this.container);

        if (this.buttonPrev.size() == 0 && this.options.buttonPrevHTML != null)
            this.buttonPrev = this.clip.before(this.options.buttonPrevHTML).prev();

        this.buttonPrev.addClass(this.className('jcarousel-prev'));

        this.buttonNext = $('.jcarousel-next', this.container);

        if (this.buttonNext.size() == 0 && this.options.buttonNextHTML != null)
            this.buttonNext = this.clip.before(this.options.buttonNextHTML).prev();

        this.buttonNext.addClass(this.className('jcarousel-next'));

        this.clip.addClass(this.className('jcarousel-clip'));
        this.list.addClass(this.className('jcarousel-list'));
        this.container.addClass(this.className('jcarousel-container'));

        var di = this.options.visible != null ? Math.ceil(this.clipping() / this.options.visible) : null;
        var li = this.list.children('li');

        var self = this;

        if (li.size() > 0) {
            var wh = 0, i = this.options.offset;
            li.each(function() {
                self.format(this, i++);
                wh += self.dimension(this, di);
            });

            this.list.css(this.wh, wh + 'px');

            // Only set if not explicitly passed as option
            if (!o || o.size === undefined)
                this.options.size = li.size();
        }

        // For whatever reason, .show() does not work in Safari...
        this.container.css('display', 'block');
        this.buttonNext.css('display', 'block');
        this.buttonPrev.css('display', 'block');

        this.funcNext   = function() { self.next(); };
        this.funcPrev   = function() { self.prev(); };
        this.funcResize = function() { self.reload(); };

        if (this.options.initCallback != null)
            this.options.initCallback(this, 'init');

        // JMS removing -- check iphone?
        //if (($.browser.safari)&&()) {
        //    this.buttons(false, false);
        //    $(window).bind('load', function() { self.setup(); });
        //} else
            this.setup();
    };

    // Create shortcut for internal use
    var $jc = $.jcarousel;

    $jc.fn = $jc.prototype = {
        jcarousel: '0.2.3'
    };

    $jc.fn.extend = $jc.extend = $.extend;

    $jc.fn.extend({
        /**
         * Setups the carousel.
         *
         * @name setup
         * @type undefined
         * @cat Plugins/jCarousel
         */
        setup: function() {
            this.first     = null;
            this.last      = null;
            this.prevFirst = null;
            this.prevLast  = null;
            this.animating = false;
            this.timer     = null;
            this.tail      = null;
            this.inTail    = false;

            if (this.locked)
                return;

            this.list.css(this.lt, this.pos(this.options.offset) + 'px');
            var p = this.pos(this.options.start);
            this.prevFirst = this.prevLast = null;
            this.animate(p, false);

            $(window).unbind('resize', this.funcResize).bind('resize', this.funcResize);
        },

        /**
         * Clears the list and resets the carousel.
         *
         * @name reset
         * @type undefined
         * @cat Plugins/jCarousel
         */
        reset: function() {
            this.list.empty();

            this.list.css(this.lt, '0px');
            this.list.css(this.wh, '10px');

            if (this.options.initCallback != null)
                this.options.initCallback(this, 'reset');

            this.setup();
        },

        /**
         * Reloads the carousel and adjusts positions.
         *
         * @name reload
         * @type undefined
         * @cat Plugins/jCarousel
         */
        reload: function() {
            if (this.tail != null && this.inTail)
                this.list.css(this.lt, $jc.intval(this.list.css(this.lt)) + this.tail);

            this.tail   = null;
            this.inTail = false;

            if (this.options.reloadCallback != null)
                this.options.reloadCallback(this);

            if (this.options.visible != null) {
                var self = this;
                var di = Math.ceil(this.clipping() / this.options.visible), wh = 0, lt = 0;
                $('li', this.list).each(function(i) {
                    wh += self.dimension(this, di);
                    if (i + 1 < self.first)
                        lt = wh;
                });

                this.list.css(this.wh, wh + 'px');
                this.list.css(this.lt, -lt + 'px');
            }

            this.scroll(this.first, false);
        },

        /**
         * Locks the carousel.
         *
         * @name lock
         * @type undefined
         * @cat Plugins/jCarousel
         */
        lock: function() {
            this.locked = true;
            this.buttons();
        },

        /**
         * Unlocks the carousel.
         *
         * @name unlock
         * @type undefined
         * @cat Plugins/jCarousel
         */
        unlock: function() {
            this.locked = false;
            this.buttons();
        },

        /**
         * Sets the size of the carousel.
         *
         * @name size
         * @type undefined
         * @param Number s The size of the carousel.
         * @cat Plugins/jCarousel
         */
        size: function(s) {
            if (s != undefined) {
                this.options.size = s;
                if (!this.locked)
                    this.buttons();
            }

            return this.options.size;
        },

        /**
         * Checks whether a list element exists for the given index (or index range).
         *
         * @name get
         * @type bool
         * @param Number i The index of the (first) element.
         * @param Number i2 The index of the last element.
         * @cat Plugins/jCarousel
         */
        has: function(i, i2) {
            if (i2 == undefined || !i2)
                i2 = i;

            if (this.options.size !== null && i2 > this.options.size)
            	i2 = this.options.size;

            for (var j = i; j <= i2; j++) {
                var e = this.get(j);
                if (!e.length || e.hasClass('jcarousel-item-placeholder'))
                    return false;
            }

            return true;
        },

        /**
         * Returns a jQuery object with list element for the given index.
         *
         * @name get
         * @type jQuery
         * @param Number i The index of the element.
         * @cat Plugins/jCarousel
         */
        get: function(i) {
            return $('.jcarousel-item-' + i, this.list);
        },

        /**
         * Adds an element for the given index to the list.
         * If the element already exists, it updates the inner html.
         * Returns the created element as jQuery object.
         *
         * @name add
         * @type jQuery
         * @param Number i The index of the element.
         * @param String s The innerHTML of the element.
         * @cat Plugins/jCarousel
         */
        add: function(i, s) {
            var e = this.get(i), old = 0, add = 0;

            if (e.length == 0) {
                var c, e = this.create(i), j = $jc.intval(i);
                while (c = this.get(--j)) {
                    if (j <= 0 || c.length) {
                        j <= 0 ? this.list.prepend(e) : c.after(e);
                        break;
                    }
                }
            } else
                old = this.dimension(e);

            e.removeClass(this.className('jcarousel-item-placeholder'));
            typeof s == 'string' ? e.html(s) : e.empty().append(s);

            var di = this.options.visible != null ? Math.ceil(this.clipping() / this.options.visible) : null;
            var wh = this.dimension(e, di) - old;

            if (i > 0 && i < this.first)
                this.list.css(this.lt, $jc.intval(this.list.css(this.lt)) - wh + 'px');

            this.list.css(this.wh, $jc.intval(this.list.css(this.wh)) + wh + 'px');

            return e;
        },

        /**
         * Removes an element for the given index from the list.
         *
         * @name remove
         * @type undefined
         * @param Number i The index of the element.
         * @cat Plugins/jCarousel
         */
        remove: function(i) {
            var e = this.get(i);

            // Check if item exists and is not currently visible
            if (!e.length || (i >= this.first && i <= this.last))
                return;

            var d = this.dimension(e);

            if (i < this.first)
                this.list.css(this.lt, $jc.intval(this.list.css(this.lt)) + d + 'px');

            e.remove();

            this.list.css(this.wh, $jc.intval(this.list.css(this.wh)) - d + 'px');
        },

        /**
         * Moves the carousel forwards.
         *
         * @name next
         * @type undefined
         * @cat Plugins/jCarousel
         */
        next: function() {
            this.stopAuto();

            if (this.tail != null && !this.inTail)
                this.scrollTail(false);
            else
                this.scroll(((this.options.wrap == 'both' || this.options.wrap == 'last') && this.options.size != null && this.last == this.options.size) ? 1 : this.first + this.options.scroll);
        },

        /**
         * Moves the carousel backwards.
         *
         * @name prev
         * @type undefined
         * @cat Plugins/jCarousel
         */
        prev: function() {
            this.stopAuto();

            if (this.tail != null && this.inTail)
                this.scrollTail(true);
            else
                this.scroll(((this.options.wrap == 'both' || this.options.wrap == 'first') && this.options.size != null && this.first == 1) ? this.options.size : this.first - this.options.scroll);
        },

        /**
         * Scrolls the tail of the carousel.
         *
         * @name scrollTail
         * @type undefined
         * @param Bool b Whether scroll the tail back or forward.
         * @cat Plugins/jCarousel
         */
        scrollTail: function(b) {
            if (this.locked || this.animating || !this.tail)
                return;

            var pos  = $jc.intval(this.list.css(this.lt));

            !b ? pos -= this.tail : pos += this.tail;
            this.inTail = !b;

            // Save for callbacks
            this.prevFirst = this.first;
            this.prevLast  = this.last;

            this.animate(pos);
        },

        /**
         * Scrolls the carousel to a certain position.
         *
         * @name scroll
         * @type undefined
         * @param Number i The index of the element to scoll to.
         * @param Bool a Flag indicating whether to perform animation.
         * @cat Plugins/jCarousel
         */
        scroll: function(i, a) {
            if (this.locked || this.animating)
                return;

            this.animate(this.pos(i), a);
        },

        /**
         * Prepares the carousel and return the position for a certian index.
         *
         * @name pos
         * @type Number
         * @param Number i The index of the element to scoll to.
         * @cat Plugins/jCarousel
         */
        pos: function(i) {
            if (this.locked || this.animating)
                return;

            i = $jc.intval(i);
            if (this.options.wrap != 'circular')
                i = i < 1 ? 1 : (this.options.size && i > this.options.size ? this.options.size : i);

            var back = this.first > i;
            var pos  = $jc.intval(this.list.css(this.lt));

            // Create placeholders, new list width/height
            // and new list position
            var f = this.options.wrap != 'circular' && this.first <= 1 ? 1 : this.first;
            var c = back ? this.get(f) : this.get(this.last);
            var j = back ? f : f - 1;
            var e = null, l = 0, p = false, d = 0;

            while (back ? --j >= i : ++j < i) {
                e = this.get(j);
                p = !e.length;
                if (e.length == 0) {
                    e = this.create(j).addClass(this.className('jcarousel-item-placeholder'));
                    c[back ? 'before' : 'after' ](e);
                }

                c = e;
                d = this.dimension(e);

                if (p)
                    l += d;

                if (this.first != null && (this.options.wrap == 'circular' || (j >= 1 && (this.options.size == null || j <= this.options.size))))
                    pos = back ? pos + d : pos - d;
            }

            // Calculate visible items
            var clipping = this.clipping();
            var cache = [];
            var visible = 0, j = i, v = 0;
            var c = this.get(i - 1);

            while (++visible) {
                e = this.get(j);
                p = !e.length;
                if (e.length == 0) {
                    e = this.create(j).addClass(this.className('jcarousel-item-placeholder'));
                    // This should only happen on a next scroll
                    c.length == 0 ? this.list.prepend(e) : c[back ? 'before' : 'after' ](e);
                }

                c = e;
                var d = this.dimension(e);
                if (d == 0) {
                    alert('jCarousel: No width/height set for items. This will cause an infinite loop. Aborting...');
                    return 0;
                }

                if (this.options.wrap != 'circular' && this.options.size !== null && j > this.options.size)
                    cache.push(e);
                else if (p)
                    l += d;

                v += d;

                if (v >= clipping)
                    break;

                j++;
            }

             // Remove out-of-range placeholders
            for (var x = 0; x < cache.length; x++)
                cache[x].remove();

            // Resize list
            if (l > 0) {
                this.list.css(this.wh, this.dimension(this.list) + l + 'px');

                if (back) {
                    pos -= l;
                    this.list.css(this.lt, $jc.intval(this.list.css(this.lt)) - l + 'px');
                }
            }

            // Calculate first and last item
            var last = i + visible - 1;
            if (this.options.wrap != 'circular' && this.options.size && last > this.options.size)
                last = this.options.size;

            if (j > last) {
                visible = 0, j = last, v = 0;
                while (++visible) {
                    var e = this.get(j--);
                    if (!e.length)
                        break;
                    v += this.dimension(e);
                    if (v >= clipping)
                        break;
                }
            }

            var first = last - visible + 1;
            if (this.options.wrap != 'circular' && first < 1)
                first = 1;

            if (this.inTail && back) {
                pos += this.tail;
                this.inTail = false;
            }

            this.tail = null;
            if (this.options.wrap != 'circular' && last == this.options.size && (last - visible + 1) >= 1) {
                var m = $jc.margin(this.get(last), !this.options.vertical ? 'marginRight' : 'marginBottom');
                if ((v - m) > clipping)
                    this.tail = v - clipping - m;
            }

            // Adjust position
            while (i-- > first)
                pos += this.dimension(this.get(i));

            // Save visible item range
            this.prevFirst = this.first;
            this.prevLast  = this.last;
            this.first     = first;
            this.last      = last;

            return pos;
        },

        /**
         * Animates the carousel to a certain position.
         *
         * @name animate
         * @type undefined
         * @param mixed p Position to scroll to.
         * @param Bool a Flag indicating whether to perform animation.
         * @cat Plugins/jCarousel
         */
        animate: function(p, a) {
            if (this.locked || this.animating)
                return;

            this.animating = true;

            var self = this;
            var scrolled = function() {
                self.animating = false;

                if (p == 0)
                    self.list.css(self.lt,  0);

                if (self.options.wrap == 'both' || self.options.wrap == 'last' || self.options.size == null || self.last < self.options.size)
                    self.startAuto();

                self.buttons();
                self.notify('onAfterAnimation');
            };

            this.notify('onBeforeAnimation');

            // Animate
            if (!this.options.animation || a == false) {
                this.list.css(this.lt, p + 'px');
                scrolled();
            } else {
                var o = !this.options.vertical ? {'left': p} : {'top': p};
                this.list.animate(o, this.options.animation, this.options.easing, scrolled);
            }
        },

        /**
         * Starts autoscrolling.
         *
         * @name auto
         * @type undefined
         * @param Number s Seconds to periodically autoscroll the content.
         * @cat Plugins/jCarousel
         */
        startAuto: function(s) {
            if (s != undefined)
                this.options.auto = s;

            if (this.options.auto == 0)
                return this.stopAuto();

            if (this.timer != null)
                return;

            var self = this;
            this.timer = setTimeout(function() { self.next(); }, this.options.auto * 1000);
        },

        /**
         * Stops autoscrolling.
         *
         * @name stopAuto
         * @type undefined
         * @cat Plugins/jCarousel
         */
        stopAuto: function() {
            if (this.timer == null)
                return;

            clearTimeout(this.timer);
            this.timer = null;
        },

        /**
         * Sets the states of the prev/next buttons.
         *
         * @name buttons
         * @type undefined
         * @cat Plugins/jCarousel
         */
        buttons: function(n, p) {
            if (n == undefined || n == null) {
                var n = !this.locked && this.options.size !== 0 && ((this.options.wrap && this.options.wrap != 'first') || this.options.size == null || this.last < this.options.size);
                if (!this.locked && (!this.options.wrap || this.options.wrap == 'first') && this.options.size != null && this.last >= this.options.size)
                    n = this.tail != null && !this.inTail;
            }

            if (p == undefined || p == null) {
                var p = !this.locked && this.options.size !== 0 && ((this.options.wrap && this.options.wrap != 'last') || this.first > 1);
                if (!this.locked && (!this.options.wrap || this.options.wrap == 'last') && this.options.size != null && this.first == 1)
                    p = this.tail != null && this.inTail;
            }

            var self = this;

            this.buttonNext[n ? 'bind' : 'unbind'](this.options.buttonNextEvent, this.funcNext)[n ? 'removeClass' : 'addClass'](this.className('jcarousel-next-disabled')).attr('disabled', n ? false : true);
            this.buttonPrev[p ? 'bind' : 'unbind'](this.options.buttonPrevEvent, this.funcPrev)[p ? 'removeClass' : 'addClass'](this.className('jcarousel-prev-disabled')).attr('disabled', p ? false : true);

            if (this.buttonNext.length > 0 && (this.buttonNext[0].jcarouselstate == undefined || this.buttonNext[0].jcarouselstate != n) && this.options.buttonNextCallback != null) {
                this.buttonNext.each(function() { self.options.buttonNextCallback(self, this, n); });
                this.buttonNext[0].jcarouselstate = n;
            }

            if (this.buttonPrev.length > 0 && (this.buttonPrev[0].jcarouselstate == undefined || this.buttonPrev[0].jcarouselstate != p) && this.options.buttonPrevCallback != null) {
                this.buttonPrev.each(function() { self.options.buttonPrevCallback(self, this, p); });
                this.buttonPrev[0].jcarouselstate = p;
            }
        },

        notify: function(evt) {
            var state = this.prevFirst == null ? 'init' : (this.prevFirst < this.first ? 'next' : 'prev');

            // Load items
            this.callback('itemLoadCallback', evt, state);

            if (this.prevFirst !== this.first) {
                this.callback('itemFirstInCallback', evt, state, this.first);
                this.callback('itemFirstOutCallback', evt, state, this.prevFirst);
            }

            if (this.prevLast !== this.last) {
                this.callback('itemLastInCallback', evt, state, this.last);
                this.callback('itemLastOutCallback', evt, state, this.prevLast);
            }

            this.callback('itemVisibleInCallback', evt, state, this.first, this.last, this.prevFirst, this.prevLast);
            this.callback('itemVisibleOutCallback', evt, state, this.prevFirst, this.prevLast, this.first, this.last);
        },

        callback: function(cb, evt, state, i1, i2, i3, i4) {
            if (this.options[cb] == undefined || (typeof this.options[cb] != 'object' && evt != 'onAfterAnimation'))
                return;

            var callback = typeof this.options[cb] == 'object' ? this.options[cb][evt] : this.options[cb];

            if (!$.isFunction(callback))
                return;

            var self = this;

            if (i1 === undefined)
                callback(self, state, evt);
            else if (i2 === undefined)
                this.get(i1).each(function() { callback(self, this, i1, state, evt); });
            else {
                for (var i = i1; i <= i2; i++)
                    if (i !== null && !(i >= i3 && i <= i4))
                        this.get(i).each(function() { callback(self, this, i, state, evt); });
            }
        },

        create: function(i) {
            return this.format('<li></li>', i);
        },

        format: function(e, i) {
            var $e = $(e).addClass(this.className('jcarousel-item')).addClass(this.className('jcarousel-item-' + i));
            $e.attr('jcarouselindex', i);
            return $e;
        },

        className: function(c) {
            return c + ' ' + c + (!this.options.vertical ? '-horizontal' : '-vertical');
        },

        dimension: function(e, d) {
            var el = e.jquery != undefined ? e[0] : e;

            var old = !this.options.vertical ?
                el.offsetWidth + $jc.margin(el, 'marginLeft') + $jc.margin(el, 'marginRight') :
                el.offsetHeight + $jc.margin(el, 'marginTop') + $jc.margin(el, 'marginBottom');

            if (d == undefined || old == d)
                return old;

            var w = !this.options.vertical ?
                d - $jc.margin(el, 'marginLeft') - $jc.margin(el, 'marginRight') :
                d - $jc.margin(el, 'marginTop') - $jc.margin(el, 'marginBottom');

            $(el).css(this.wh, w + 'px');

            return this.dimension(el);
        },

        clipping: function() {
            return !this.options.vertical ?
                this.clip[0].offsetWidth - $jc.intval(this.clip.css('borderLeftWidth')) - $jc.intval(this.clip.css('borderRightWidth')) :
                this.clip[0].offsetHeight - $jc.intval(this.clip.css('borderTopWidth')) - $jc.intval(this.clip.css('borderBottomWidth'));
        },

        index: function(i, s) {
            if (s == undefined)
                s = this.options.size;

            return Math.round((((i-1) / s) - Math.floor((i-1) / s)) * s) + 1;
        }
    });

    $jc.extend({
        /**
         * Gets/Sets the global default configuration properties.
         *
         * @name defaults
         * @descr Gets/Sets the global default configuration properties.
         * @type Hash
         * @param Hash d A set of key/value pairs to set as configuration properties.
         * @cat Plugins/jCarousel
         */
        defaults: function(d) {
            return $.extend(defaults, d || {});
        },

        margin: function(e, p) {
            if (!e)
                return 0;

            var el = e.jquery != undefined ? e[0] : e;

            if (p == 'marginRight' && $.browser.safari) {
                var old = {'display': 'block', 'float': 'none', 'width': 'auto'}, oWidth, oWidth2;

                $.swap(el, old, function() { oWidth = el.offsetWidth; });

                old['marginRight'] = 0;
                $.swap(el, old, function() { oWidth2 = el.offsetWidth; });

                return oWidth2 - oWidth;
            }

            return $jc.intval($.css(el, p));
        },

        intval: function(v) {
            v = parseInt(v);
            return isNaN(v) ? 0 : v;
        }
    });

})(jQuery);


(function($) {

    // Force the image out of the way, just use text for now
    var ajaxLoading = function(options) {
        var html = "<div id='AjaxifyLoading'>" + options.loading_txt + "</div>";
        if(options.loading_target)
            jQuery.ajaxifyManip(options.loading_target,html);
        else
            jQuery.ajaxifyManip(options,html);
    }

    jQuery.AjaxifyDefaults['loading_txt'] = "Loading...";
    jQuery.AjaxifyDefaults['loading_fn'] = ajaxLoading;
    
})(jQuery);

$(document).ready(function() {
    $.fn.fixPNG = $.fn.pngFix; 
    $("#login_link, #forgot_password_link, a[href*=/users/login]").livequery(function() {
        $(this).fancybox({
            hideOnContentClick: false,
            autoScale: true,
            frameWidth: 614,
            frameHeight: 433,
            callbackOnStart: function() { $("body").addClass("login_modal modal"); },
            callbackOnClose : function() { $("body").removeClass("login_modal modal"); }
        });
    });

    // Way too much work to ajaxify a form.  Look into
    // jquery.form instead?
    $('form.new_session, form.forgot_password').livequery(function() {
        var $me = $(this);
        $me.ajaxify({
            event: 'submit',
            method: $me.attr('method'),
            dataType: 'script',
            forms: '#' + $me.attr('id'),
            link: $me.attr('action'),
            target: $me.attr('target'),
            loading_txt: "Logging in..."
        });
    });
});

$(document).ready(function() {

    $('a.new_comment').livequery(function() {
        $(this).ajaxify({
            cache: true,
            loading_txt: "Loading comment form..."
        }); // no dataType => defaults to html return type
    });

    // Way too much work to ajaxify a form.  Look into
    // jquery.form instead?
    $('form.new_comment').livequery(function() {
        var $me = $(this);
        $me.ajaxify({
            event: 'submit',
            method: $me.attr('method'),
            dataType: 'script',
            forms: '#' + $me.attr('id'),
            link: $me.attr('action'),
            loading_txt: "Submitting comment...",
            target: '#not_a_real_container',
            onStart: function(op) {
                $me.find("input[type='submit']").attr('disabled', 'disabled').attr('value', 'Commenting...');
            }
//            target: $me.attr('target') // => no target, let return script update (TODO:remove this)
        });
    });

    // TODO: prefer something like this, kind of works but getting an error with inherited resource about comment_url doesn't exist
    //  $('form.new_comment').livequery('submit', function() {
    //    $.post($(this).attr('action'), $(this).serialize(), function(data) { alert(data) }, 'script');
    //  });

    // Comment pagination
    $('.comments_container .comments .pagination a.next_page, .comments_container .comments .pagination a.prev_page').livequery(function() {
        var $me = $(this);
        var $container = $($me.closest('.list_container'));
        $me.ajaxify({
            cache: true,
            target: "#" + $container.attr('id'),
            loading_target: $me,
            loading_fn: function(options) {
                options.loading_target.html('loading...')
            }
        }); // no dataType => defaults to html return type
    })


});

$(window).load(function() {
  $('a.like').livequery(function() {
    $(this).ajaxify({
        dataType: 'script',
        method: 'POST',
        loading_txt: "Liking..."
    });
  });
});

$(document).ready(function() {
  $('a.add_favorite').livequery(function() {
    var $me = $(this);
    $me.ajaxify({
        method: 'POST',
        loading_txt: "Adding to your page...",
        dataType: 'script'
    });
  });
  $('a.remove_favorite').livequery(function() {
    var $me = $(this);
    $me.ajaxify({
        method: 'POST',
        dataType: 'script',
        loading_txt: "Removing...",
        params: "_method=delete"
    });
  });
});

$(document).ready(function() {
    $('a.send_to_friend').livequery(function() {
        $(this).fancybox({
            hideOnContentClick: false,
            autoScale: true,
            frameWidth: 725,
            frameHeight: 471,

            // fancybox v1.2
            callbackOnShow: function() {
                $('#fancy_title').hide();
            },
            
//            // fancybox v1.3
//            titleShow: false

            callbackOnClose : function() { $("body").removeClass("send_to_friend_modal modal"); },
            callbackOnStart: function() { $("body").addClass("send_to_friend_modal modal"); }
        });
    });

    // Way too much work to ajaxify a form.  Look into
    // jquery.form instead?
    $('form#new_send_to_friend').livequery(function() {
        var $me = $(this);
        $me.ajaxify({
            event: 'submit',
            method: $me.attr('method'),
            forms: '#' + $me.attr('id'),
            link: $me.attr('action'),
            target: '#fancy_ajax',
            loading_txt: "Sending to your friend..."
        });
    });
});

$(document).ready(function() {
    $('a.embed').livequery(function() {
        $(this).fancybox({
            hideOnContentClick: false,
            autoScale: true,
            frameWidth: 426,
            frameHeight: 492,

            // fancybox v1.2
            callbackOnShow: function() {
                $('#fancy_title').hide();
            },
            
//            // fancybox v1.3
//            titleShow: false

            callbackOnClose : function() { $("body").removeClass("embed_modal modal"); $('object').css('opacity', 1); },
            callbackOnStart: function() { $("body").addClass("embed_modal modal"); $('object').css('opacity', 0); },
            callbackOnShow: load_embed_urls
        });
    });

});


    function load_embed_urls() {
        
        if ($.vplayer && $.vplayer.player && $.vplayer.player.pause) {
           $.vplayer.player.pause();
        }
        
        $('#embed_view textarea').click(function() {
            this.focus(); this.select();
        })
        $('#embed_view .button').click(function() {
            $('textarea', $(this).parent()).focus().select();
            copySelectionIE();        
        });
        if ($.browser.msie) {
           $('#embed_view .button').addClass('copy');
        }
             
        function copySelectionIE() {
            if ($.browser.msie && document.selection){
                 sel = document.selection.createRange();
                 sel.execCommand("Copy");
            }
        }
        $('#fancy_overlay').show();
        $('#fancy_title').hide();
        
        var SIZES = {'Small': [480, 270], 'Medium': [576, 324], 'Large': [640, 360]};
        
        $('#embed_view input').click(function(){
            if (this.value in SIZES) {
                var textarea = $('#embed_view textarea:first'),
                    code = textarea.val(),
                    size = SIZES[this.value];
                code = code.replace(/width\S+/, 'width="' + size[0] + '"');
                code = code.replace(/height\S+/, 'height="' + size[1] + '"');
                textarea.val(code);
            }
        }).eq(1).click();
    }
    

$(document).ready(function() {

    var config = {
        scroll: 1,
        visible: 1,
        wrap: "last",
        animation: "slow"
    };

    $('#sidebar_game_container .game_of_months').jcarousel(config);

    // We start out with the list not visible to reduce flicker, make visible now
    $("#sidebar_game_container ul").css({visibility: "visible"});
    // Hide prev/next buttons if only one child
    // TODO: $(".jcarousel-list li:only-child").closest(".jcarousel-container").find(".jcarousel-next, .jcarousel-prev").hide();
});

		// CODA 2.39 dated 25-Apr-2011 Mon 11:53 AM
/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/

//Build 504
var mtvn=typeof mtvn==='object'?mtvn:{};mtvn.btg=typeof mtvn.btg==='object'?mtvn.btg:{};mtvn.btg.config=typeof mtvn.btg.config==='object'?mtvn.btg.config:{};mtvn.btg.managers=typeof mtvn.btg.managers==='object'?mtvn.btg.managers:{};mtvn.btg.ads=typeof mtvn.btg.ads==='object'?mtvn.btg.ads:{};mtvn.btg.ads.games=typeof mtvn.btg.ads.games==='object'?mtvn.btg.ads.games:{};mtvn.btg.ads.doubleclick=typeof mtvn.btg.ads.doubleclick==='object'?mtvn.btg.ads.doubleclick:{};mtvn.btg.ads.freewheel=typeof mtvn.btg.ads.freewheel==='object'?mtvn.btg.ads.freewheel:{};mtvn.btg.reporting=typeof mtvn.btg.reporting==='object'?mtvn.btg.reporting:{};mtvn.btg.reporting.omniture=typeof mtvn.btg.reporting.omniture==='object'?mtvn.btg.reporting.omniture:{};mtvn.btg.util=typeof mtvn.btg.util==='object'?mtvn.btg.util:{};mtvn.btg.globalvars=typeof mtvn.btg.globalvars==='object'?mtvn.btg.globalvars:{};mtvn.btg.reporting.player=typeof mtvn.btg.reporting.player==='object'?mtvn.btg.reporting.player:{};mtvn.btg.reporting.games=typeof mtvn.btg.reporting.games==='object'?mtvn.btg.reporting.games:{};mtvn.btg.html5=typeof mtvn.btg.html5==='object'?mtvn.btg.html5:{};mtvn.btg.html5.reporting=typeof mtvn.btg.html5.reporting==='object'?mtvn.btg.html5.reporting:{};mtvn.btg.html5.ads=typeof mtvn.btg.html5.ads==='object'?mtvn.btg.html5.ads:{};mtvn.btg.plugins=typeof mtvn.btg.plugins==='object'?mtvn.btg.plugins:{};mtvn.btg.globalvars={VISITOR_NAMESPACE:"mtvn",IS_CODA_ADS_USED:false,VERSION:"2.39",IS_TOP_ACCESSIBLE:function(){try{return(typeof top.location.search!='undefined'&&typeof top.location.search!='unknown');}catch(e){return false;}}(),PAGE_URL:function(){try{var retVal='';retVal=self.location.pathname;if(retVal=='')retVal='/';return retVal;}catch(e){}}(),IS_UNIT_TEST:function(){try{return(location.href.toLowerCase().indexOf("/api/jsunittest/tests/")!=-1);}catch(e){return false}}(),FORCE_AD_WAIT_TIME:{PLAYER_LOADED:10000,PLAYER_FAILED:10000,PLAYER_LOAD_WAIT_TIME:10000},VALID_DCOPT:["ist"]};mtvn.btg.Controller=new function(){var _btgGv=mtvn.btg.globalvars;var _btgCfg=mtvn.btg.config;var _btgRep=mtvn.btg.reporting;var _btgRepG=_btgRep.games;var _btgAds=mtvn.btg.ads;var _btgAdsG=_btgAds.games;var hasReporting=false;var hasAds=false;var hasGame=false;var hasHtml5=false;var reportingData;var adsData;var defaultPageName="";this.init=function(){_btgGv.IS_LIVE_ENV=function(){var retVal=true;try{if(mtvn.btg.util.String.isDefined(_btgCfg.ReportSettings.Omniture.dynamicAccountList)){var dal=_btgCfg.ReportSettings.Omniture.dynamicAccountList;var b=dal.indexOf("=");if(b>-1){dal=dal.substring(b+1);dal=dal.split(",");var url=self.location.hostname;if(_btgGv.IS_TOP_ACCESSIBLE){url=top.location.hostname;}
for(var i=0,len=dal.length;i<len;i++){if(url.indexOf(dal[i])>-1){retVal=false;break;}}}}}catch(e){}
return retVal;}();defaultPageName=(typeof _btgGv.PAGE_URL=="string"&&_btgGv.PAGE_URL!="")?_btgGv.PAGE_URL:location.pathname;if(defaultPageName.charAt(defaultPageName.length-1)=="/"){defaultPageName+=typeof _btgCfg.ReportSettings.indexFileName=="string"?_btgCfg.ReportSettings.indexFileName:"index";}
if(_btgCfg.ReportSettings){_btgCfg.ReportSettings._defaultPageName=defaultPageName;_btgRep.ReportingManager.init();hasReporting=true;}
if(_btgCfg.AdSettings){_btgCfg.AdSettings.defaultPageName=defaultPageName;_btgAds.AdManager.init();hasAds=true;}
if(typeof _btgRep.TestAndTarget!="undefined")_btgRep.TestAndTarget.init();return true;};this.gameInit=function(){if(!hasReporting&&_btgCfg.ReportSettings){_btgRep.ReportingManager.init();hasReporting=true;}
if(!hasAds&&_btgCfg.AdSettings){_btgAds.AdManager.init();hasAds=true;}
if(!hasGame&&com.mtvnet.games.GameSettings){_btgRepG.GameReportingManager.init();_btgAdsG.GameAdManager.init();hasGame=true;}
return true;}
this.html5Init=function(playerObj){if(!hasHtml5){var btgH5Rep=mtvn.btg.html5.reporting;var btgH5Ads=mtvn.btg.html5.ads;if(btgH5Rep.ReportingManager)btgH5Rep.ReportingManager.init(playerObj);if(btgH5Ads.AdManager)btgH5Ads.AdManager.init(playerObj);hasHtml5=true;}
return true;}
this.loadGame=function(status){if(hasGame){_btgAdsG.GameAdManager.loadGame(status);_btgRepG.GameReportingManager.gameLoad(status);}}
this.sendPageCall=function(data){if(hasReporting){if(typeof data=="undefined"||!data)data={};_btgRep.ReportingManager.sendPageCall(data);reportingData=_btgRep.ReportingManager.getData();}};this.sendLinkEvent=function(data){if(hasReporting){if(typeof data=="undefined"||!data)data={};_btgRep.ReportingManager.sendLinkEvent(data);}};this.placeAd=function(data){if(hasAds){_btgAds.AdManager.placeAd(data);adsData=_btgAds.AdManager.getData();}};this.placeIFrameAd=function(adHtml,a_data){_btgAds.AdManager.placeIFrameAd(adHtml,a_data);}
this.getAdUrl=function(data){if(hasAds){return _btgAds.AdManager.getAdUrl(data);}};this.getVersion=function(){return _btgGv.VERSION;};this.createMboxes=function(map){if(typeof mboxDefine=="function"&&typeof _btgCfg.ReportSettings.Omniture.enableTestAndTarget=="boolean"&&_btgCfg.ReportSettings.Omniture.enableTestAndTarget&&typeof _btgRep.TestAndTarget!="undefined")
_btgRep.TestAndTarget.createMboxes(map);};this.setChoiceStreamRequest=function(data,isActivity){if(hasReporting)
mtvn.btg.reporting.ReportingManager.setChoiceStreamRequest(data,isActivity);}};mtvn.btg.util.Beacon=function(url){this.url=url;this.data=null;};mtvn.btg.util.Beacon.prototype={setData:function(data){this.data=mtvn.btg.util.Object.toString(data,'&');},formatSrc:function(){if(this.data){if(this.url.indexOf('?')>-1){this.url+='&'+this.data;}else{this.url+='?'+this.data;}}
return this.url;},send:function(){var http=new Image(1,1);http.src=this.formatSrc();http.onload=function(){return;};http.onabort=function(){return;};http.onerror=function(){return;};}};mtvn.btg.util.Alert=function(text,type){if(!text)return;var _DEPENDENCY_FLAG_NAME="ga_script_load";var _WAIT=100;switch(type){case 1:var category="Warning";break;case 2:var category="Alert";break;default:var category="Error";break;}
this.dependencies=new mtvn.btg.managers.DependencyManager();this.dependencies.add(_DEPENDENCY_FLAG_NAME,function(){return typeof(_gat)=="object";},_WAIT);this.dependencies.checkDependency(_DEPENDENCY_FLAG_NAME);if(this.dependencies.hasDependency()){this.dependencies.addToCallQueue(this,function(){new mtvn.btg.util.Alert(text,type)});return;}
var pageTracker=_gat._createTracker("UA-18578264-1","coda_alerts_tracker");pageTracker._setDomainName("");pageTracker._trackEvent(location.hostname,location.pathname,category+": "+text);};mtvn.btg.util.Cookie={read:function(name){var name=name+"=";var ca=document.cookie.split(';');for(var i=0,len=ca.length;i<len;i++){var c=ca[i];while(c.charAt(0)==' '){c=c.substring(1,c.length)};if(c.indexOf(name)==0){return unescape(c.substring(name.length,c.length))};}
return null;},set:function(name,value,expy,path,domain){var cookie=name+"="+escape(value)+"; path=/";if(expy)cookie+=";expires="+expy;if(!domain){var domain=document.domain.split(".");domain=domain.length>2?domain[domain.length-2]+"."+domain[domain.length-1]:document.domain;}
if(domain!="localhost")cookie+=";domain="+domain;cookie+=";path="+(path?path:"/");document.cookie=cookie;},remove:function(name,path,domain){var cookie=name+"=";if(!domain){var domain=document.domain.split(".");domain=domain.length>2?domain[domain.length-2]+"."+domain[domain.length-1]:document.domain;}
if(domain!="localhost")cookie+=";domain="+domain;cookie+=";path="+(path?path:"/");cookie+=";expires=Thu, 01-Jan-1970 00:00:01 GMT";document.cookie=cookie;}};mtvn.btg.util.DOM={Events:{addListener:function(obj,type,fn){if(obj.attachEvent)
obj.attachEvent('on'+type,fn);else if(obj.addEventListener)
obj.addEventListener(type,fn,false);else obj['on'+type]=fn;},removeListener:function(obj,type,fn){if(obj.detachEvent)
obj.detachEvent('on'+type,fn);else if(obj.removeEventListener)
obj.removeEventListener(type,fn,false);else obj['on'+type]=null;}},loadScript:function(a_url,a_appendToBody){if(mtvn.btg.util.String.isDefined(a_url)){try{var scriptObj=document.createElement('script');scriptObj.setAttribute("type","text/javascript");scriptObj.setAttribute("src",a_url);if(a_appendToBody)document.body.appendChild(scriptObj);else document.getElementsByTagName("head")[0].appendChild(scriptObj);}catch(e){}}},loadScriptOnHead:function(a_url){if(mtvn.btg.util.String.isDefined(a_url)){try{var scriptObj=document.createElement('script');scriptObj.setAttribute("type","text/javascript");scriptObj.setAttribute("src",a_url);document.getElementsByTagName("head")[0].appendChild(scriptObj);}catch(e){}}}}
mtvn.btg.util.Events=new function(){var _event=function(){this.callbacks=[];this.subscribe=function(callback){if(typeof callback=="function")this.callbacks[this.callbacks.length]=callback;};this.remove=function(callback){for(var s=0,len=this.callbacks.length;s<len;s++){if(this.callbacks[s]==callback)delete this.callbacks[s];}
if(typeof callback=="function")this.callbacks[this.callbacks.length]=callback;};this.fire=function(){for(var s=0,len=this.callbacks.length;s<len;s++){try{if(typeof this.callbacks[s]=="function")this.callbacks[s].apply(this,arguments);}catch(e){new mtvn.btg.util.Alert('An event callback has failed. \"'+e.number+': '+e.message+'\".');}}};};this.add=function(name){this[name]=new _event();return this;}
this.flipBookView=new _event();this.adLoaded=new _event();this.Player_Freewheel_failsafe=new _event();this.Player_HTML5_play=new _event();this.Player_HTML5_pause=new _event();this.Player_HTML5_end=new _event();this.Player_HTML5_seek=new _event();this.Player_HTML5_milestone=new _event();this.ABTest_Group_Assigned=new _event();this.ON_GAME_CONFIG_LOADED=new _event();this.ON_GAME_LOAD=new _event();this.ON_GAME_PLAY=new _event();this.ON_GAME_LEVELSTART=new _event();};if(!this.mtvn.btg.util.JSON){mtvn.btg.util.JSON=function(){function f(n){return n<10?'0'+n:n;}
Date.prototype.toJSON=function(){return this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z';};var m={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};function stringify(value,whitelist){var a,i,k,l,r=/["\\\x00-\x1f\x7f-\x9f]/g,v;switch(typeof value){case'string':return r.test(value)?'"'+value.replace(r,function(a){var c=m[a];if(c){return c;}
c=a.charCodeAt();return'\\u00'+Math.floor(c/16).toString(16)+
(c%16).toString(16);})+'"':'"'+value+'"';case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
if(typeof value.toJSON==='function'){return stringify(value.toJSON());}
a=[];if(typeof value.length==='number'&&!(value.propertyIsEnumerable('length'))){l=value.length;for(i=0;i<l;i+=1){a.push(stringify(value[i],whitelist)||'null');}
return'['+a.join(',')+']';}
if(whitelist){l=whitelist.length;for(i=0;i<l;i+=1){k=whitelist[i];if(typeof k==='string'){v=stringify(value[k],whitelist);if(v){a.push(stringify(k)+':'+v);}}}}else{for(k in value){if(typeof k==='string'){v=stringify(value[k],whitelist);if(v){a.push(stringify(k)+':'+v);}}}}
return'{'+a.join(',')+'}';}}
return{stringify:stringify,parse:function(text,filter){var j;function walk(k,v){var i,n;if(v&&typeof v==='object'){for(i in v){if(Object.prototype.hasOwnProperty.apply(v,[i])){n=walk(i,v[i]);if(n!==undefined){v[i]=n;}}}}
return filter(k,v);}
if(/^[\],:{}\s]*$/.test(text.replace(/\\./g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(:?[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof filter==='function'?walk('',j):j;}
throw new SyntaxError('parseJSON');}};}();}
mtvn.btg.util.Math={random:function(){var min;var max;if(arguments.length>1){min=arguments[0];max=arguments[1];}else{min=0;max=arguments[0];}
return Math.floor(Math.random()*(max-min+1)+min);}};mtvn.btg.util.Object={isDefined:function(object){if(typeof object=="object"&&object!==null){return true;}else{return false;}},toString:function(object,delimiter){var delimiter=delimiter?delimiter:',';var array=[];for(var i in object){if(mtvn.btg.util.String.isDefined(object[i])){array.push(i+"="+object[i]);}}
return array.join(delimiter);},copyProperties:function(a_sourceObj,a_destinationObj,a_forceOverwrite){if(this.isDefined(a_sourceObj)&&this.isDefined(a_destinationObj)){for(var i in a_sourceObj){if(this.isDefined(a_destinationObj[i])||mtvn.btg.util.String.isDefined(a_destinationObj[i])){if(a_forceOverwrite=="forceOverwrite")a_destinationObj[i]=a_sourceObj[i];}
else{a_destinationObj[i]=a_sourceObj[i];}}}},isConfigDefined:function(object){if(typeof object=="object"&&object!==null&&object.enabled==true){return true;}else{return false;}}};mtvn.btg.util.Sections={getAdSections:function(){var btgU=mtvn.btg.util;var btgCfg=mtvn.btg.config;var retVal=self.location.pathname;if(retVal=='')retVal='/';if(retVal.lastIndexOf("/")==(retVal.length-1)){retVal+=(btgU.Object.isDefined(btgCfg.AdSettings)&&btgU.String.isDefined(btgCfg.AdSettings.defaultIndexFileName))?btgCfg.AdSettings.defaultIndexFileName:"index";}
if(retVal!='/'&&retVal.indexOf('/')==0)retVal=retVal.substring(1);return retVal;},getReportingSections:function(){return self.location.pathname;}};mtvn.btg.util.Session={btgCk:mtvn.btg.util.Cookie,Variables:{config:[],add:function(config){if(typeof config=="undefined")return false;for(var c1=0,len=this.config.length;c1<len;c1++){if(typeof this.config[c1].varName!="string")continue;for(var c2=0,len=config.length;c2<len;c2++){if(typeof config[c2].varName!="string")continue;if(config[c2].varName==this.config[c1].varName)this.config.splice(c1,1);}}
this.config=this.config.concat(config);return true;},setData:function(data){var isStr=mtvn.btg.util.String.isDefined;if(!isStr(data))return null;for(var c=0,len=this.config.length;c<len;c++){var _config=this.config[c];if(typeof data[_config.varName]!="undefined"){data[_config.varName]=this.saveToCookie(_config,data[_config.varName]);}
else{var cookieName=isStr(_config.cookieName)?_config.cookieName:"mtvn_btg_"+_config.varName;var cookie=this.btgCk.read(cookieName);if(isStr(cookie)){cookie=cookie.replace(/\+/gim,";");data[_config.varName]=cookie;}}}
return data;},saveToCookie:function(config,value){var isStr=mtvn.btg.util.String.isDefined;if(typeof value=="string"&&typeof config.varName=="string"){value=value.replace(/\;/gim,"+");var varName=config.varName;var cookieName=typeof config.cookieName=="string"?config.cookieName:"mtvn_btg_"+varName;var neverDie=typeof config.neverDie=="boolean"?config.neverDie:0;var appendOnly=typeof config.appendOnly=="boolean"||typeof config.appendOnly=="number"?config.appendOnly:0;if(appendOnly){var cookie=this.btgCk.read(cookieName);if(isStr(cookie)){values=value.split(",");for(var v=0,len=values.length;v<len;v++){var current_value=values[v];if(!isStr(current_value))continue;if(cookie.indexOf(current_value)>-1)continue;if(cookie.length>0)cookie+=",";cookie+=current_value;}
value=cookie;}}
var year=new Date().getYear();var expy=neverDie?"Thu, 01-Jan-"+(year+10)+" 23:59:59 GMT":null;this.btgCk.set(cookieName,value,expy);}
return isStr(value)?value.replace(/\+/gim,";"):null;}}}
mtvn.btg.util.String={isDefined:function(value){if(typeof value==='undefined'||value===null||value==''){return false;}else{return true;}},random:function(length){var chars='ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';var string='';length=length?length:8;for(var x=0;x<length;x++){var num=Math.floor(Math.random()*chars.length);string+=chars.substring(num,num+1);}
return string;},toObject:function(string,delimiter){var delimiter=delimiter?delimiter:',';var array=string.split(delimiter);var object={};for(var x=0,len=array.length;x<len;x++){var pairs=array[x].split('=');object[pairs[0]]=pairs[1];}
return object;},queryStringToObject:function(string){var string=string.indexOf('?')>-1?string.split('?')[1]:string;return this.toObject(string,'&');},stripFileExtension:function(string){var lastIndex=string.lastIndexOf('.');if(lastIndex>0){return string.substring(0,lastIndex);}else{return string;}},charLtrim:function(string,character){var trimIndex=string.indexOf(character)
if(trimIndex==0){string=string.substring(1);}
return string;},charRtrim:function(string,character){var trimIndex=string.lastIndexOf(character);var stringLength=string.length;if(trimIndex==stringLength-1){string=string.substring(0,stringLength-1);}
return string;},charTrim:function(string,character){string=this.charLtrim(string,character);string=this.charRtrim(string,character);return string;},mockItUp:function(string){string=string.replace(/[<]/g,"&lt;");string=string.replace(/[>]/g,"&gt;");return string;},getFileName:function(a_pathString){var retVal=(this.isDefined(a_pathString))?a_pathString:'';retVal=retVal.substring(retVal.lastIndexOf('/')+1);return retVal;},getBetween:function(a_source,a_markStart,a_markEnd){var retVal="";if(this.isDefined(a_source)){if(this.isDefined(a_markStart)){var cutStart=a_source.indexOf(a_markStart);if(cutStart>=0){retVal=a_source.substring(cutStart+a_markStart.length);}}
if(this.isDefined(a_markEnd)){var cutEnd=retVal.indexOf(a_markEnd);if(cutEnd>=0){retVal=retVal.substring(0,cutEnd);}}}
return retVal;}};mtvn.btg.util.Window={getNodeLinkName:function(node){var linkName=null;for(var x=0,len=node.childNodes.length;x<len;x++){var childnode=node.childNodes[x];switch(childnode.nodeType){case 3:linkName=childnode.nodeValue;break;case 1:if(node.attributes['title']&&node.attributes['title'].nodeValue!=''){linkName=node.attributes['title'].nodeValue;}else if(node.attributes['alt']&&node.attributes['alt'].nodeValue!=''){linkName=node.attributes['alt'].nodeValue;}
break;};}
return linkName;},debug:function(message){var debugElement=document.getElementById("debug");if(!debugElement){debugElement=document.createElement("div");debugElement.setAttribute("id","debug");document.getElementsByTagName("body")[0].appendChild(debugElement);}
debugElement.innerHTML=debugElement.innerHTML+message+"<br>";}};mtvn.btg.util.swfobject=function(){try{function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return!a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y};var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in mtvn.btg.util.swfobject){mtvn.btg.util.swfobject[X]=null}mtvn.btg.util.swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}catch(e){}}();mtvn.btg.util.Class={inheritFrom:function(a_superClass,a_subClass){function subClass(){if(arguments.length>0&&typeof(a_superClass)==="function"){a_superClass.apply(this,arguments);}}
if(typeof(a_superClass)==="function"||typeof(a_superClass)==="object"){if(typeof(a_subClass)==="function"||typeof(a_subClass)==="object"){var tempPrototype=a_subClass.prototype;a_subClass.prototype=(typeof(a_superClass)==="function")?new a_superClass:a_superClass;for(var i in tempPrototype){a_subClass.prototype[i]=tempPrototype[i];}
a_subClass.prototype.constructor=a_subClass;subClass.prototype=(typeof(a_subClass)==="function")?new a_subClass:a_subClass;subClass.prototype.constructor=subClass;}
else{subClass.prototype=(typeof(a_superClass)==="function")?new a_superClass:a_superClass;subClass.prototype.constructor=subClass;}}
else{throw"Coda ERROR: mtvn.btg.util.Class.inheritFrom(a_superClass,a_subClass) requires at least a_superClass argument!";}
return subClass;}};mtvn.btg.util.Timer=function(id,milliseconds){this.id=id;this.isRunning=false;this.currentCount=0;this.milliseconds=milliseconds?milliseconds:100;this.intervalId=null;this.listeners=[];};mtvn.btg.util.Timer.prototype={on:function(eventName,func){if(typeof func=="function"){this.listeners[eventName]=func;}},execListener:function(eventName){if(typeof(this.listeners[eventName])=="function")this.listeners[eventName]();},start:function(){if(!this.isRunning){this.isRunning=true;this.intervalId=setInterval(this.id+".count()",this.milliseconds);}},count:function(){this.currentCount=this.currentCount+this.milliseconds;this.execListener('count');},stop:function(){clearInterval(this.intervalId);this.isRunning=false;},reset:function(){this.stop();this.currentCount=0;this.start();}};mtvn.btg.util.TimeTracker=function(a_cookieName){var _btgU=mtvn.btg.util;var _btgIsStr=_btgU.String.isDefined;var _btgCk=_btgU.Cookie;var _data="";var _startTime=null;var _cookieName=(_btgIsStr(a_cookieName))?a_cookieName:"";this.init=function(){_startTime=(new Date()).getTime();_btgU.DOM.Events.addListener(window,"unload",this.saveTimeSpent);return true;};this.setData=function(a_data){if(_btgIsStr(a_data)){_data=a_data;}};this.getTimeSpentOnPage=function(){var retVal="";var endTime=(new Date()).getTime();retVal=Math.round((endTime-_startTime)/100);if(retVal<1)retVal="";_startTime=(new Date()).getTime();return retVal;};this.saveTimeSpent=function(){if(_btgIsStr(_cookieName)){var endTime=(new Date()).getTime();var elapsedSeconds=Math.round((endTime-_startTime)/100);if(elapsedSeconds<1)elapsedSeconds=1;var cookieVal=elapsedSeconds;cookieVal+=(_btgIsStr(_data))?","+_data:"";_btgCk.set(_cookieName,cookieVal);}};this.getTimespent=function(){if(_btgIsStr(_cookieName)){var timerCookie=_btgCk.read(_cookieName);_btgCk.remove(_cookieName);_startTime=(new Date()).getTime();return(_btgIsStr(timerCookie))?timerCookie:"";}};};mtvn.btg.managers.DependencyManager=function(ttl){var _btgCfg=mtvn.btg.config;var _btgU=mtvn.btg.util;var _btgIsStr=_btgU.String.isDefined;var _failsafeTTL=ttl?ttl:8000;var _failsafeTimerStarted=false;var _timeout=null;var _callQueue=[];var _dependencies=[];var _startFailSafeTimer=function(dm){if(!_failsafeTimerStarted){_failsafeTimerStarted=true;window.setTimeout(dm.sendCalls,_failsafeTTL);return true;}
return false;}
this.add=function(flagname,callback,interval,checkImmediately){if(typeof flagname=="undefined"||typeof callback=="undefined")return false;for(var e=0,len=_dependencies.length;e<len;e++){if(_dependencies[e].flagname==flagname)return false;}
_dependencies[_dependencies.length]={flagname:flagname,callback:callback,interval:(interval?interval:100)};_startFailSafeTimer(this);if(checkImmediately)this.checkDependency(flagname);return true;};this.remove=function(flagname){if(typeof flagname=="string"&&flagname!=""){for(var d=0,len=_dependencies.length;d<len;d++){if(_dependencies[d].flagname==flagname)_dependencies.splice(d,1);}}
if(!this.hasDependency())this.sendCalls();};this.checkDependency=function(flagname){var _dependency=null;for(var d=0,len=_dependencies.length;d<len;d++){if(_dependencies[d].flagname==flagname)_dependency=_dependencies[d];}
if(!_dependency)return false;if(_dependency.callback.apply()){this.remove(flagname);}
else{var _this=this;window.setTimeout(function(){_this.checkDependency(flagname);},_dependency.interval);}};this.hasDependency=function(flagname){if(_btgIsStr(flagname)){var _len=_dependencies.length;for(var d=0;d<_len;d++){if(_dependencies[d].flagname==flagname)return true;}
return false;}
return _dependencies.length>=1;};this.addToCallQueue=function(context,callback){if(!callback)return false;var args=new Array();for(var i=2,len=arguments.length;i<len;i++)
args.push(arguments[i]);_callQueue[_callQueue.length]={context:context?context:this,callback:callback,args:args,config:_btgCfg.ReportSettings};return true;};this.sendCalls=function(){_dependencies=[];var settings=_btgCfg.ReportSettings;for(var q=0,len=_callQueue.length;q<len;q++){_btgCfg.ReportSettings=_callQueue[q].config;_callQueue[q].callback.apply(_callQueue[q].context,_callQueue[q].args);}
_btgCfg.ReportSettings=settings;_callQueue=[];};};mtvn.btg.managers.PluginManager=function(_plugin_list){var _plugins=_plugin_list;var args=new Array();for(var i=1,len=arguments.length;i<len;i++)
args.push(arguments[i]);for(var p=0,len=_plugins.length;p<len;p++){if(typeof _plugins[p].init=="function")_plugins[p].init.apply(this,args);}
this.run=function(_data){for(var p=0,len=_plugins.length;p<len;p++){if(mtvn.btg.util.Object.isDefined(_plugins[p])&&typeof _plugins[p].run=="function")_data=_plugins[p].run(_data);}
return _data;};};mtvn.btg.managers.QueueManager=function(options){this.id=options.id;this.timeToWait=!isNaN(options.timeToWait)?options.timeToWait:1;this.handler=typeof options.handler=="function"?options.handler:function(i){};this.notificationHandler=typeof options.notificationHandler=="function"?options.notificationHandler:function(i){};this.intervalId=null;this.isProcessing=false;this.queue=[];this.processedQueue=[];this.maxNumItems=options.maxNumItems;this.maxElapsed=options.maxElapsed;this.elapsed=0;this.totalItems=0;this.itemsAdded=0;};mtvn.btg.managers.QueueManager.prototype={init:function(){this.isProcessing=true;this.processQueue();this.intervalId=setInterval(this.id+".processQueue()",this.timeToWait);},addToQueue:function(){this.queue.push(arguments);this.itemsAdded++;if(!this.isProcessing)this.init();},processQueue:function(){if(this.isProcessing==true){if(this.queue.length>0){var nextItem=this.queue.shift();this.elapsed=this.elapsed+this.timeToWait;this.totalItems++;if(!this.hasLimit()){this.handler(nextItem);this.processedQueue.push(nextItem);}else{this.notificationHandler(this);this.clearQueue();this.stop();}}else{this.stop();}}},stop:function(){clearInterval(this.intervalId);this.isProcessing=false;this.elapsed=0;this.totalItems=0;this.itemsAdded=0;},hasLimit:function(){return(this.elapsed==this.maxElapsed||this.totalItems>this.maxNumItems);},clearQueue:function(){this.queue=[];this.processedQueue=[];}};mtvn.btg.plugins.Meteor=new function(){var _btgCfg=mtvn.btg.config;var _btgU=mtvn.btg.util;var _btgP=mtvn.btg.plugins;var _DEPENDENCY_FLAG_NAME="meteor_script_load";var _WAIT=100;var _config=null;var _wom=null;var _appId="";this.getWOM=function(){var _cookies=document.cookie.split(";");var _meteorCookie=null;for(var c=0,len=_cookies.length;c<len;c++){var _cookie=_cookies[c].split("=");if(_cookie[0].match(/[a-zA-Z0-9]{8}\-[a-zA-Z0-9]{4}\-[a-zA-Z0-9]{4}\-[a-zA-Z0-9]{4}\-[a-zA-Z0-9]{12}/)){_meteorCookie=unescape(_cookie[1]);eval("var _meteor_settings = "+_meteorCookie);if(typeof _meteor_settings.wom=="undefined")return null;return typeof _meteor_settings.wom=="boolean"?_meteor_settings.wom:null;break;}}
return null;};var _isEnabled=function(){return(mtvn.btg.util.Object.isConfigDefined(_btgCfg.ReportSettings.Meteor)&&_appId!="");}
this.isWOMReported=false;this.init=function(_cfg,_dependencies){_config=_cfg;if(mtvn.btg.util.Object.isDefined(_btgCfg.ReportSettings.Meteor))
_appId=(_btgU.String.isDefined(_btgCfg.ReportSettings.Meteor.applicationId)?_btgCfg.ReportSettings.Meteor.applicationId:"")
if(typeof _config.womVarMap=="undefined")
_config.womVarMap=["prop32","eVar55"];if(typeof _config.womVarMap=="string")
_config.womVarMap=_config.womVarMap.split(",");if(!_isEnabled())return false;_btgP.Meteor.multiTrackTimer.on('count',mtvn.btg.plugins.Meteor.multiTrackScript);_btgP.Meteor.multiTrackTimer.start();_wom=_btgP.Meteor.getWOM();return true;};this.run=function(_data){if(!_isEnabled())return _data;var _wom_value=null;if(typeof _wom=="undefined"||_wom===null){_wom_value="Unknown";new _btgU.Alert('Failed to find Meteor Word-of-Mouth ("wom") value.');}
else if(_wom===true){this.isWOMReported=true;_wom_value="Word of mouth";}
else if(_wom===false){this.isWOMReported=true;_wom_value="Not word of mouth";}
for(var m=0,len=_config.womVarMap.length;m<len;m++){_data[_config.womVarMap[m]]=_wom_value;}
return _data;};this.sendLinkEventCall=function(){var self=_btgCfg.ReportSettings.Meteor;var data={linkName:'Meteor reporting',linkType:'o'};_wom=_btgP.Meteor.getWOM();if((typeof self.enabled=="boolean"&&self.enabled&&self.applicationId!=""))mtvn.btg.Controller.sendLinkEvent(data);}
this.multiTrackScript=function(){var self=(mtvn.btg.util.Object.isDefined(_btgCfg.ReportSettings)?_btgCfg.ReportSettings.Meteor:null);if(typeof meteor!='undefined'){if((mtvn.btg.util.Object.isConfigDefined(self)&&self.applicationId!="")){_btgU.DOM.loadScript('http'+('https:'==document.location.protocol?"s":"")+'://cdnt.meteorsolutions.com/api/multi_track?application_id='+self.applicationId+'&url_storage_source=hash&hash_join=true');}
_btgP.Meteor.multiTrackTimer.stop();}}
this.multiTrackTimer=new _btgU.Timer('mtvn.btg.plugins.Meteor.multiTrackTimer',500);this.womScript=function(){var wom=_btgP.Meteor.getWOM();var self=_btgP.Meteor;if(wom!=null){self.sendLinkEventCall();self.isWOMReported=true;self.womTimer.stop();}}
this.womTimer=new _btgU.Timer('mtvn.btg.plugins.Meteor.womTimer',500);this.multiDomainScript=function(){if(_btgP.Meteor.isWOMReported&&typeof meteor!='undefined'&&typeof meteor.orion!='undefined'&&meteor.orion.init!='undefined'){meteor.orion.init();_btgP.Meteor.multiDomainTimer.stop();}}
this.multiDomainTimer=new _btgU.Timer('mtvn.btg.plugins.Meteor.multiDomainTimer',500);};try{mtvn.btg.util.DOM.loadScript("http"+("https:"==document.location.protocol?"s":"")+"://btg.mtvnservices.com/aria/metsol-mtv.js");mtvn.btg.plugins.Meteor.multiTrackTimer.on('count',mtvn.btg.plugins.Meteor.multiTrackScript);mtvn.btg.plugins.Meteor.multiTrackTimer.start();}catch(e){}
try{mtvn.btg.util.DOM.Events.addListener(window,"load",function(){var btgCfg=mtvn.btg.config;var self=mtvn.btg.plugins.Meteor;if(!self.isWOMReported){self.womTimer.on('count',self.womScript);self.womTimer.start();}
if((mtvn.btg.util.Object.isConfigDefined(self)&&self.applicationId!="")){if(typeof btgCfg.ReportSettings.Meteor.multiDomain=="boolean"&&btgCfg.ReportSettings.Meteor.multiDomain){self.multiDomainTimer.on('count',self.multiDomainScript);self.multiDomainTimer.start();}}});}catch(e){}
mtvn.btg.plugins.GUID=new function(){var _btgU=mtvn.btg.util;var _btgP=mtvn.btg.plugins;var _config=null;var _value=null;var _dependsOn=function(){var _cookie=_btgU.Cookie.read("mtvn_guid");if(typeof _cookie=="string")_value=_cookie;return typeof _value=="string";}
var _isEnabled=function(){return(typeof _config.enableGuidPlugin=="boolean"&&_config.enableGuidPlugin);}
this.isGUIDReported=false;this.hasGUIDCookie=function(){return _dependsOn();}
this.init=function(_cfg,_dependencies){_config=_cfg;if(!_isEnabled())return false;if(typeof _config.guidIdVarMap=="undefined")
_config.guidIdVarMap=["eVar18"];if(typeof _config.guidIdVarMap=="string")
_config.guidIdVarMap=_config.guidIdVarMap.split(",");return true;};this.run=function(_data){if(!_isEnabled())return _data;if(!_dependsOn()){new _btgU.Alert('Failed to find the GUID value.');return _data;}
for(var m=0,len=_config.guidIdVarMap.length;m<len;m++){_data[_config.guidIdVarMap[m]]=_value;}
this.isGUIDReported=true;return _data;};this.guidScript=function(){var self=_btgP.GUID;if(self.hasGUIDCookie()&&!self.isGUIDReported){self.sendLinkEventCall();self.isGUIDReported=true;return true;}
return false;}
this.sendLinkEventCall=function(){var data={linkName:'GUID reporting',linkType:'o'};data=_btgP.GUID.run(data)
if(_isEnabled)mtvn.btg.Controller.sendLinkEvent(data);};};try{if(!mtvn.btg.plugins.GUID.hasGUIDCookie())
mtvn.btg.util.DOM.loadScript("http"+('https:'==document.location.protocol?"s":"")+"://btg.mtvnservices.com/aria/guid.html");}catch(e){}
try{mtvn.btg.util.DOM.Events.addListener(window,"load",function(){var btgCfg=mtvn.btg.config;var btgP=mtvn.btg.plugins;var isConfigDefined=mtvn.btg.util.Object.isConfigDefined;if(isConfigDefined(btgCfg.ReportSettings.Omniture)){if(btgCfg.ReportSettings.Omniture.enableGuidPlugin&&btgCfg.ReportSettings.Omniture.enableGuidAuxiliaryCall&&!btgP.GUID.isGUIDReported){var _dependency=new mtvn.btg.managers.DependencyManager();_dependency.add("mtvn_guid",btgP.GUID.guidScript);_dependency.checkDependency("mtvn_guid");}}});}catch(e){}
mtvn.btg.reporting.ABTest=function(id,groups,callback){var _btgCk=mtvn.btg.util.Cookie;if(typeof id!=="string"||mtvn.btg.util.String.charTrim(id," ")==""){throw new Error("mtvn.btg.reporting.ABTest: The first argument to the constructor must be a unique ID of the type {String}.");return null;}
if(typeof groups!="object"||groups.length<2){throw new Error("mtvn.btg.reporting.ABTest: The second argument to the constructor must be an Array of 2 or more Objects, each with a \"name\" and a \"weight\" property.");return null;}
var _floor=0;var _RANDOM_NUM=Math.floor(Math.random()*(100-1+1)+1);var _COOKIE_NAME="MTVN_ABTest_"+id;var _cookie=_btgCk.read(_COOKIE_NAME);var _id=id;var _group=null;this.getId=function(){return _id;};this.getGroup=function(){return _group;};if(_cookie&&_cookie!=""){_group=_cookie;}
else{groups.sort(function(a,b){return b.weight-a.weight;});for(var g=0,len=groups.length;g<len;g++){var _ceiling=_floor+groups[g].weight;if(_RANDOM_NUM>_floor&&_RANDOM_NUM<=_ceiling){_group=groups[g].name;}
_floor+=groups[g].weight;};if(!_group){throw new Error("mtvn.btg.reporting.ABTest: Couldn't assign user to an A/B Test group.");return null;}
if(_floor!=100){throw new Error("mtvn.btg.reporting.ABTest: The sum of the weights of your A/B Test groups must equal 100 exactly.");return null;}
_btgCk.set(_COOKIE_NAME,_group,"Thu, 31-Dec-2038 11:59:59 GMT");}
mtvn.btg.reporting.UserSegment.set(_id+": "+_group);mtvn.btg.util.Events.ABTest_Group_Assigned.fire(_id,_group);if(typeof callback=="function")callback.call(this);};mtvn.btg.reporting.ComScore=function(config){this.btgIsStr=mtvn.btg.util.String.isDefined;this.btgU=mtvn.btg.util;this.btgGv=mtvn.btg.globalvars;this.config=config;this.c1=(this.btgIsStr(this.config.c1))?this.config.c1:"2";this.c2=(this.btgIsStr(this.config.c2))?this.config.c2:"6036034";this.c3=(this.btgIsStr(this.config.c3))?this.config.c3:'';this.c4=(this.btgIsStr(this.config.c4))?this.config.c4:(this.btgU.Object.isDefined(this.btgU.Sections))?escape(this.btgU.Sections.getReportingSections()):(this.btgGv.IS_TOP_ACCESSIBLE)?escape(top.document.location.hostname+top.document.location.pathname):escape(document.location.hostname+document.location.pathname);this.c5=(this.btgIsStr(this.config.c5))?this.config.c5:'20000';this.c6=(this.btgIsStr(this.config.c6))?this.config.c6:'';this.c15=(this.btgIsStr(this.config.c15))?this.config.c15:'';this.sendPageCall();};mtvn.btg.reporting.ComScore.prototype={sendPageCall:function(data){var rm=mtvn.btg.reporting.ReportingManager;if(typeof(data)==='object'){if(this.btgIsStr(data.comScore1))this.c1=data.comScore1;if(this.btgIsStr(data.comScore2))this.c2=data.comScore2;if(this.btgIsStr(data.comScore3))this.c3=data.comScore3;if(this.btgIsStr(data.comScore4))this.c4=data.comScore4;if(this.btgIsStr(data.comScore5))this.c5=data.comScore5;if(this.btgIsStr(data.comScore6))this.c6=data.comScore6;if(this.btgIsStr(data.comScore15))this.c15=data.comScore15;}
var cs_params=["c1=",this.c1,"&c2=",this.c2,"&c3=",this.c3,"&c4=",this.c4,"&c5=",this.c5,"&c6=",this.c6,"&c15=",this.c15].join('');try{if(!this.btgGv.IS_UNIT_TEST&&!rm.isScriptIncluded.comscore){this.btgU.DOM.loadScript((document.location.protocol=='https:'?'https://web.archive.org/web/20110912044651/https://sb':'http://b')+'.scorecardresearch.com/beacon.js?'+cs_params);rm.isScriptIncluded.comscore=true;}}catch(e){}}};mtvn.btg.reporting.FluxHosted={sendCall:function(){var _chkContextObjectExists=function(){if(typeof Flux!="object"||typeof Flux.Context!="object")return false;return true;};var _chkCommunityObjectsExist=function(){if(typeof FluxReporting!="object"||typeof FluxReporting.Standard!="object")return false;return true;};var _getMemberState=function(){if(!_chkContextObjectExists())return null;return Flux.Context.isCommunityMember()?"member":"non-member";};var _getLoginState=function(){if(!_chkContextObjectExists())return null;return Flux.Context.isUserAuthenticated()?"logged-in":"not logged-in";};var _mapVars=function(){var isStr=mtvn.btg.util.String.isDefined;var frs=FluxReporting.Standard;var _data={};if(!_chkContextObjectExists()&&!_chkCommunityObjectsExist())return false;var pageName=location.pathname.substring(1);pageName=pageName=="/"||pageName==""?"main.aspx":pageName;pageName=pageName.substring(0,2)=='-/'?pageName.substring(2):pageName;var pathsToTrim=["/profile","/Topic"];for(var i=0,len=pathsToTrim.length;i<len;i++){if(pageName.indexOf(pathsToTrim[i])>-1){pageName=pageName.substring(0,pageName.indexOf(pathsToTrim[i])+pathsToTrim[i].length);}}
_data["pageName"]=_data["hier1"]=pageName;if(_chkContextObjectExists()){_data["prop10"]=_data["eVar10"]=_getMemberState();_data["prop11"]=_data["eVar11"]=_getLoginState();};if(_chkCommunityObjectsExist()){_data["prop3"]=_data["eVar3"]=(isStr(frs.Community_Name)?frs.Community_Name:null);_data["prop4"]=_data["eVar4"]=(isStr(frs.Content_UCID)?frs.Content_UCID:null);_data["prop5"]=_data["eVar5"]=(isStr(frs.Content_Title)?frs.Content_Title:null);_data["prop6"]=_data["eVar6"]=(isStr(frs.Content_Section)?frs.Content_Section:null);_data["prop7"]=_data["eVar7"]=(isStr(frs.Content_Page)?frs.Content_Page:null);_data["prop8"]=_data["eVar8"]=(isStr(frs.Content_Details)?frs.Content_Details:null);_data["prop9"]=_data["eVar9"]=(isStr(frs.Content_Subtype)?frs.Content_Subtype:null);};_data["prop12"]=_data["eVar12"]=location.host;if(typeof FluxReporting.Overrides!="undefined"){for(i in FluxReporting.Overrides){_data[i]=FluxReporting.Overrides[i];}}
return _data;};var data=_mapVars();var oldConfig=mtvn.btg.config.ReportSettings;mtvn.btg.config.ReportSettings={Omniture:{enabled:true,account:'viafluxrollup',dynamicAccountSelection:'true',dynamicAccountList:'viafluxrollupdev=mtv-d,mtv-q,mtvi.com',linkInternalFilters:'javascript:,flux.com,mtvi.com,'+location.hostname,trackExternalLinks:true,trackDownloadLinks:true,isFluxHosted:true},GoogleAnalytics:{enabled:false},Comscore:{enabled:false},QuantCast:{enabled:false},Nielsen:{enabled:false}};var ctrlr=mtvn.btg.Controller;ctrlr.init();ctrlr.sendPageCall(data);mtvn.btg.config.ReportSettings=oldConfig;return true;}};if(typeof FluxReporting!="undefined"){mtvn.btg.util.DOM.Events.addListener(window,"load",function(){mtvn.btg.reporting.FluxHosted.sendCall();})};mtvn.btg.reporting.FluxState=new function(){var _chkFluxVersion=function(){if(typeof Flux!="object"||Flux==null){return null;}
else if(typeof Flux.context=="object"&&Flux.context!=null&&typeof Flux.context.user=="object"&&Flux.context.user!=null){return 3;}
else if(typeof Flux.Context=="object"&&Flux.Context!=null){return 2;}
return null;};var _getMemberState=function(){var fv=_chkFluxVersion();var memberState=null;switch(fv){case 3:memberState=Flux.context.user.communityMember;break;case 2:memberState=Flux.Context.isCommunityMember();break;}
return memberState?"member":"non-member";};var _getLoginState=function(context){var us=mtvn.btg.reporting.UserSegment;var fv=_chkFluxVersion();var loginState=null;switch(fv){case 3:if(Flux.context.user.memberType){loginState=Flux.context.user.memberType;us.add(context,loginState+" User");}
else if(Flux.context.user.facebookOnly){loginState="FB Only";us.add(context,"FB Connect Only User");}
else if(Flux.context.user.facebookConnected){loginState="Flux + FB";us.add(context,"Flux & FB Connect User");}
else if(typeof Flux.context.user.ucid=="string"&&Flux.context.user.ucid.length>0){loginState="Flux Only";us.add(context,"Flux Only User");}
else loginState="not logged-in";break;case 2:loginState=Flux.Context.isUserAuthenticated()?"logged-in":"not logged-in";break;default:loginState="not logged-in";}
if(loginState&&loginState!="not logged-in")us.add(context,"LoggedIn");return loginState;};this.setData=function(context,data){data[context.config.fluxVarMap.memberState]=_getMemberState();data[context.config.fluxVarMap.loginState]=_getLoginState(context);return data;};};mtvn.btg.reporting.GoogleAnalytics=function(config){var _DEPENDENCY_FLAG_NAME="ga_script_load";var _WAIT=100;var timeout=null;this.btgGv=mtvn.btg.globalvars;this.btgIsStr=mtvn.btg.util.String.isDefined;this.config=config;if(config.iframeAccount!=''&&!this.btgGv.IS_UNIT_TEST){document.write(unescape("%3Cdiv id='btg_ga_div'%3E%3C/div%3E"));}
this.account=config.account;this.dependencies=new mtvn.btg.managers.DependencyManager();this.dependencies.add(_DEPENDENCY_FLAG_NAME,function(){return typeof(_gat)=="object";},_WAIT);this.dependencies.checkDependency(_DEPENDENCY_FLAG_NAME);};mtvn.btg.reporting.GoogleAnalytics.prototype={sendPageCall:function(data){if(this.dependencies.hasDependency()){this.dependencies.addToCallQueue(this,this.sendPageCall,data);return;}
if(this.btgIsStr(this.config.iframeAccount)){var instances=[];if(this.config.iframeAccount.indexOf(",")>-1)
{instances=this.config.iframeAccount.split(",");}else{instances[0]=this.config.iframeAccount;}
for(var i=0,len=instances.length;i<len;i++)
{var _div=document.getElementById("btg_ga_div");var _wl=window.location;var uri=data.pageName;var _uri=uri.substring(0,1)!="/"?"/"+uri:uri;var _refer=document.referrer;var _ga="//web.archive.org/web/20110912044651/http://btg.mtvnservices.com/aria/ga.html?ga="+instances[i]+"&uri=";_refer="&ref="+escape(_refer);if(_div){var newChild=document.createElement("iframe");newChild.src=_wl.protocol+_ga+_wl.hostname+_uri+_refer;newChild.style.width=1+'px';newChild.style.height=1+'px';newChild.style.visibility='hidden';newChild.style.left=-50+'px';newChild.style.top=-50+'px';newChild.style.position='absolute';_div.appendChild(newChild);}}}
if(this.btgIsStr(this.config.account))
{try
{if(!this.btgGv.IS_UNIT_TEST){if(typeof(_gat)=="object"){var pageTracker=_gat._getTracker(this.config.account);pageTracker._trackPageview();};}}
catch(e){}}},sendLinkEvent:function(data){if(!data||!this.btgIsStr(data.category)||!this.btgIsStr(data.action)||!this.btgIsStr(data.label))return;if(this.dependencies.hasDependency()){this.dependencies.addToCallQueue(this,this.sendLinkEvent,data);return;}
data.value=typeof data.value!="undefined"&&typeof parseInt(data.value)=="number"?parseInt(data.value):null;var pageTracker=_gat._createTracker(this.config.account,"event_tracker");pageTracker._setDomainName("");pageTracker._trackEvent(data.category,data.action,data.label,data.value);}};try{if(!mtvn.btg.globalvars.IS_UNIT_TEST){var ga=document.createElement('script');ga.type='text/javascript';ga.async=true;ga.src=('https:'==document.location.protocol?'https://web.archive.org/web/20110912044651/https://ssl':'https://web.archive.org/web/20110912044651/http://www')+'.google-analytics.com/ga.js';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(ga,s);}}catch(e){};mtvn.btg.reporting.Nielsen=function(config){this.config=config;this.sendPageCall();};mtvn.btg.reporting.Nielsen.prototype={sendPageCall:function(data){var btgU=mtvn.btg.util;var isStr=btgU.String.isDefined;var isObj=btgU.Object.isDefined;var ci=null;if(!ci&&isStr(this.config.cid))ci=this.config.cid;if(!ci)return false;var d=new Image(1,1);d.onerror=d.onload=function(){d.onerror=d.onload=null;};d.src=["//web.archive.org/web/20110912044651/http://secure-us.imrworldwide.com/cgi-bin/m?ci="+ci+"&cg=0&cc=1&si=",escape(window.location.href),"&rp=",escape(document.referrer),"&ts=compact&rnd=",(new Date()).getTime()].join('');}};mtvn.btg.reporting.Omniture=function(config){this.pageViewEventSet=false;this.btgStr=mtvn.btg.util.String;this.btgIsStr=this.btgStr.isDefined;var _btgMgrs=mtvn.btg.managers;var _btgPlgs=mtvn.btg.plugins;this.btgCfg=mtvn.btg.config;this.btgRep=mtvn.btg.reporting;this.btgSv=mtvn.btg.util.Session.Variables;this.btgCk=mtvn.btg.util.Cookie;this.name="Omniture";this.values=[];this.newRepeatProp=this.btgIsStr(config.newRepeatProp)?config.newRepeatProp:"prop41";this.config=config;this.hcode=this.btgRep.omniture.Hcode;this.hcode.setAccount(this.config.account);if(this.config.enableFirstPartyCookie&&this.btgIsStr(this.config.cName)){this.hcode.trackingServer=this.config.cName;}
for(var i in this.config)this.hcode[i]=this.config[i];this.url="http"+(this.hcode.ssl?"s":"")+"://"+this.hcode.un+".112.2o7.net/b/ss/"+this.hcode.un+"/1/";this.dependencies=new _btgMgrs.DependencyManager();this.plugins=new _btgMgrs.PluginManager([_btgPlgs.Meteor,_btgPlgs.GUID],this.config,this.dependencies);if(typeof this.config.userSegmentVarMap=="undefined"){this.config.userSegmentVarMap={traffic:"prop31",commerce:"products"}
this.btgCfg.ReportSettings.Omniture.userSegmentVarMap=this.config.userSegmentVarMap;}
if(typeof this.btgRep.UserSegment=="object")
this.btgRep.UserSegment.init(this);if(typeof this.config.fluxVarMap=="undefined"){this.config.fluxVarMap={memberState:"prop5",loginState:"prop6"}
this.btgCfg.ReportSettings.Omniture.fluxVarMap=this.config.fluxVarMap;}
if(typeof this.config.timePartingVarMap=="undefined"){this.config.timePartingVarMap={trafficDay:"prop33",trafficHour:"prop34",commerceDay:"eVar45",commerceHour:"eVar46"}}
if(typeof this.config.photosVarMap=="undefined"){this.config.photosVarMap={application:["prop48","eVar31"],gallery:"eVar16",photoId:"eVar17",flipbookView:"event57",photoView:"event58",adView:"event59",timeSpent:"event60"}}
if(typeof mtvn_btg_Photos=="object"&&mtvn_btg_Photos!=null)
this.btgRep.Photos.init(this.config.photosVarMap);if(typeof this.config.pageViewEvent!="string"){this.config.pageViewEvent="event16";};if(typeof this.btgRep.player.MediaPlayer=="object")
this.btgRep.player.MediaPlayer.init(this);if(typeof this.config.sessionVars!="undefined")this.btgSv.add(this.config.sessionVars);};mtvn.btg.reporting.Omniture.prototype={setAttribute:function(k,v){if(this.btgIsStr(k)){this.hcode[k]=(this.btgIsStr(v)?v:'');return true;}
else{return false;}},getAttribute:function(k){return this.hcode[k];},setValues:function(data){for(var i in data){this.setAttribute(i,data[i]);this.values.push(i);}
return true;},clearValues:function(){for(var x=0,len=this.values.length;x<len;x++){if(this.values[x]!="pageName"){this.setAttribute(this.values[x],"");}}
this.clearNewRepeat();this.values=this.getPageName()?["pageName"]:[];return true;},setNewRepeat:function(){this.setAttribute(this.newRepeatProp,this.hcode.getNewRepeat());return true;},clearNewRepeat:function(){this.setAttribute(this.newRepeatProp,"");return true;},getValOnce:function(v,c,e){return this.hcode.getValOnce(v,c,e);},getNewRepeat:function(){return this.hcode.getNewRepeat();},getPageName:function(){return this.getAttribute("pageName");},preprocessData:function(data){if(typeof mboxDefine=="function"&&typeof this.config.enableTestAndTarget=="boolean"&&this.config.enableTestAndTarget){data["tnt"]=this.hcode.trackTNT();if(data["tnt"]=="")
data["tnt"]=this.btgRep.TestAndTarget.getCampaignId();}
if(typeof this.btgCfg.ReportSettings.Omniture.enableVisitorNamespace=="boolean"&&this.btgCfg.ReportSettings.Omniture.enableVisitorNamespace)
data["visitorNamespace"]=mtvn.btg.globalvars.VISITOR_NAMESPACE;if(typeof this.btgRep.UserSegment!="undefined"){data=this.btgRep.UserSegment.setData(this,data);}
if(typeof mtvn.btg.util.Session!="undefined")
data=this.btgSv.setData(data);return data;},sendPageCall:function(data){var btgGms=mtvn.btg.reporting.games;if(this.dependencies.hasDependency()){this.dependencies.addToCallQueue(this,this.sendPageCall,data);return;}
data=typeof data!="object"?{}:data;data=this.plugins.run(data);if(typeof data.pageName!="string"||data.pageName==""){data.pageName=typeof this.hcode.pageName==="string"&&this.hcode.pageName!=""?this.hcode.pageName:this.btgCfg.ReportSettings._defaultPageName;}
if(typeof this.config.noPagenameSlash!="undefined"&&this.config.noPagenameSlash&&data.pageName.charAt(0)=="/"){data.pageName=data.pageName.substring(1);}
if(typeof this.config.defaultHier=="string"&&this.config.defaultHier!=""){if(typeof data[this.config.defaultHier]!=="string"||data[this.config.defaultHier]==""){if(typeof this.hcode[this.config.defaultHier]==="string"&&this.hcode[this.config.defaultHier]!="")
var _hier=this.hcode[this.config.defaultHier];else if(typeof data.docHierarchy==="string"&&data.docHierarchy!="")
var _hier=data.docHierarchy;else var _hier=data.pageName;if(_hier.charAt(_hier.length-1)=="/"){if(typeof this.btgCfg.ReportSettings.indexFileName==="string")
data[this.config.defaultHier]=_hier+this.btgCfg.ReportSettings.indexFileName;else
data[this.config.defaultHier]=_hier+"index";}
else data[this.config.defaultHier]=_hier;data[this.config.defaultHier]=this.btgStr.charLtrim(data[this.config.defaultHier],"/");}}
if(typeof data.channel!="string"||data.channel==""){if(typeof this.hcode.channel=="string"){data.channel=this.hcode.channel;}
else if(data.pageName=="/"){data.channel=data.pageName;}else{var parts=data.pageName.split("/");for(var p=0,len=parts.length;p<len;p++){if(parts[p]!=""){data.channel=parts[p];break;}}}}
if(typeof data.channel=="string")data["eVar49"]=data["channel"];if(typeof this.btgRep.SEO!="undefined")data=this.btgRep.SEO.setData(this,data);if(typeof this.btgRep.BrowserToolbar!="undefined")data=this.btgRep.BrowserToolbar.setData(this,data);if((typeof this.config.isFluxHosted=="undefined"||(typeof this.config.isFluxHosted!="undefined"&&this.config.isFluxHosted!=true))&&typeof this.btgRep.FluxState!="undefined")data=this.btgRep.FluxState.setData(this,data);if(typeof this.btgRep.Search!="undefined")data=this.btgRep.Search.setData(data);if(typeof this.btgRep.Search!="undefined")data=this.btgRep.Search.chkConversions(data);if(typeof this.btgRep.Photos!="undefined")data=this.btgRep.Photos.setData(data);if(typeof this.btgRep.RecsABTesting!="undefined")data=this.btgRep.RecsABTesting.setData(this,data);if(typeof this.config.enableTimeParting!="undefined"&&this.config.enableTimeParting==true&&typeof this.config.timePartingVarMap!="undefined"){var tz=typeof this.btgCfg.ReportSettings.Omniture.timezone!="undefined"?this.btgCfg.ReportSettings.Omniture.timezone:"-5";data[this.config.timePartingVarMap.commerceHour]=data[this.config.timePartingVarMap.trafficHour]=this.hcode.getTimeParting('h',tz);data[this.config.timePartingVarMap.commerceDay]=data[this.config.timePartingVarMap.trafficDay]=this.hcode.getTimeParting('d',tz);}
if(typeof this.config.percentPageViewedVarMap!="undefined"){if(typeof this.config.percentPageViewedVarMap.previousPage!="undefined")
data[this.config.percentPageViewedVarMap.previousPage]=this.hcode.getPreviousValue(data["pageName"],"s_pn");if(typeof this.config.percentPageViewedVarMap.percentage!="undefined"){if(this.config.percentPageViewedVarMap.percentage.indexOf("event")>=0){if(typeof data["events"]=="string"&&data["events"]!="")data["events"]+=",";else data["events"]="";data["events"]+=this.config.percentPageViewedVarMap.percentage;if(typeof data["products"]=="string"&&data["products"]!="")data["products"]+=",";else data["products"]="";data["products"]+=";;;;"+this.config.percentPageViewedVarMap.percentage+"="+this.hcode.getPercentPageViewed();}
else data[this.config.percentPageViewedVarMap.percentage]=this.hcode.getPercentPageViewed();}}
if(!this.pageViewEventSet){var _events=typeof data["events"]==="string"?data["events"]:"";if(typeof this.config.pageViewEvent==="string"&&_events.indexOf(this.config.pageViewEvent)<0){if(_events!="")_events+=",";_events+=this.config.pageViewEvent;data["events"]=_events;this.pageViewEventSet=true;}}
if(typeof btgGms.GameReporter!="undefined"){btgGms.GameReporter.gtsEvent="event74";data=btgGms.GameReporter.setData(data);}
data=this.preprocessData(data);this.setValues(data);this.setNewRepeat();this.attachLoggedEvent();this.hcode.t();this.clearValues();return true;},sendLinkEvent:function(data){if(this.dependencies.hasDependency()){this.dependencies.addToCallQueue(this,this.sendPageCall,data);return;}
data=typeof data!="object"?{}:data;data=this.plugins.run(data);var sessionPageName=this.getPageName();data.lnk=data.lnk?this.hcode.co(data.lnk):true;data.linkType=data.linkType?data.linkType:"o";data.referrer=location.href;data=this.preprocessData(data);this.setValues(data);this.setAttribute("pageName","");this.attachLoggedEvent();this.hcode.t();this.clearValues();this.setAttribute("pageName",sessionPageName);return true;},setAccountVars:function(o){this.setAttribute("un",o.name);this.setAttribute("dynamicAccountSelection",o.dynamic);this.setAttribute("dynamicAccountList",o.list);this.setAttribute("linkInternalFilters",o.filters);this.setAttribute("charSet",o.chartset);for(var i in o){if(this.btgIsStr(i))
this.setAttribute(i,(this.btgIsStr(o[i])?o[i]:''));};},logEvent:function(data){var btgCk_set=this.btgCk.set;if(this.btgIsStr(data)){if(this.btgIsStr(data['UIEvent'])){btgCk_set('UIEvent',data['UIEvent']);}
if(this.btgIsStr(data['UIEventName'])){btgCk_set('UIEventName',data['UIEventName']);}
if(this.btgIsStr(data['UITrackingCode'])){btgCk_set('UITrackingCode',data['UITrackingCode']);}}},attachLoggedEvent:function(){var btgCk_read=this.btgCk.read;var btgCk_remove=this.btgCk.remove;if(this.btgIsStr(btgCk_read('UIEvent'))){this.setAttribute('events',btgCk_read('UIEvent'));btgCk_remove('UIEvent');}
if(this.btgIsStr(btgCk_read('UIEventName'))){this.setAttribute('eVar40',btgCk_read('UIEventName'));btgCk_remove('UIEventName');}
if(this.btgIsStr(btgCk_read('UITrackingCode'))){this.setAttribute('campaign',btgCk_read('UITrackingCode'));btgCk_remove('UITrackingCode');}
return true;},clearAllVars:function(){for(var i=1;i<=50;i++){this.setAttribute("eVar"+i,'');this.setAttribute("prop"+i,'');if(i<6){this.setAttribute("hier"+i,"");}}
this.setAttribute("pageName","");this.setAttribute("channel","");return true;}};mtvn.btg.reporting.QuantCast=function(config){var _btgCfg=mtvn.btg.config;var _btgRm=mtvn.btg.reporting.ReportingManager;var _btgDomEv=mtvn.btg.util.DOM.Events;this.labels="";this.config=config;var _qacct="p-94wNw88f65Rhk";var qcHost=(("https:"==document.location.protocol)?"https://web.archive.org/web/20110912044651/https://secure":"https://web.archive.org/web/20110912044651/http://edge");var qcModuleExists=typeof _btgCfg.AdSettings!="undefined"&&typeof _btgCfg.AdSettings.QuantCast!="undefined";var demoTargetingFlag=qcModuleExists&&typeof _btgCfg.AdSettings.QuantCast.enableDemoTargeting=="boolean"?_btgCfg.AdSettings.QuantCast.enableDemoTargeting:true;if(demoTargetingFlag&&!mtvn.btg.globalvars.IS_UNIT_TEST&&!_btgRm.isScriptIncluded.quantcast){_btgDomEv.addListener(window,"load",function(){mtvn.btg.util.DOM.loadScript(qcHost+".quantserve.com/quant.js",true);});if(demoTargetingFlag&&!mtvn.btg.util.String.isDefined(mtvn.btg.util.Cookie.read('qcDemo'))){try{_btgDomEv.addListener(window,"load",function(){mtvn.btg.util.DOM.loadScript("http"+('https:'==document.location.protocol?"s":"")+"://pixel.quantserve.com/api/segments.json?a="+_qacct+"&callback=mtvn.btg.reporting.QuantCast.Ads.setCookieDemoTargetVal");});}catch(e){}}
_btgRm.isScriptIncluded.quantcast=true;}
this.labels=this.config.labels;};mtvn.btg.reporting.QuantCast.prototype={sendPageCall:function(data){if(this.config.reportMode=='direct')
{try
{_qoptions={labels:this.labels};_qacct="p-94wNw88f65Rhk";quantserve();}
catch(e){};}}};mtvn.btg.reporting.QuantCast.Ads=new function(){this.setLabels=function(data,adsections){try{var _labels="";var dartSite="";var sections="";dartSite=data.dartSite.replace(/\./g,'_');sections=adsections.replace(/^\//m,'');sections=sections.replace(/\//g,'.');_labels=mtvn.btg.config.ReportSettings.QuantCast.labels+",Viacom Global Digital Network.MTVN Digital Ad Sales.Content.Pages."+dartSite+"."+sections;_qoptions={labels:_labels};_qacct="p-94wNw88f65Rhk";quantserve();}
catch(e){};};this.setCookieDemoTargetVal=function(result){var demoTokenStr=[];for(var i=0,len=result.segments.length;i<len;i++)
demoTokenStr[i]="demo="+result.segments[i].id;mtvn.btg.util.Cookie.set('qcDemo',escape(demoTokenStr.join(";")));};};mtvn.btg.reporting.ReportingManager=new function(){var hasOmniture=false;var hasNielsen=false;var hasQuantCast=false;var hasComScore=false;var hasGoogleAnalytics=false;var hasChoiceStream=false;var pageName;var config;var omniture;var nielsen;var quantcast;var comscore;var googleAnalytics;this.isScriptIncluded={comscore:false,quantcast:false,googleAnalytics:false};this.init=function(){var btgRep=mtvn.btg.reporting;config=mtvn.btg.config.ReportSettings;var isConfigDefined=mtvn.btg.util.Object.isConfigDefined;if(isConfigDefined(config.Omniture)&&btgRep.Omniture){omniture=new btgRep.Omniture(config.Omniture);hasOmniture=true;}
if(isConfigDefined(config.Nielsen)&&btgRep.Nielsen){nielsen=new btgRep.Nielsen(config.Nielsen);hasNielsen=true;}
if(isConfigDefined(config.GoogleAnalytics)&&btgRep.GoogleAnalytics){googleAnalytics=new btgRep.GoogleAnalytics(config.GoogleAnalytics);hasGoogleAnalytics=true;}
if(isConfigDefined(config.QuantCast)&&btgRep.QuantCast){quantcast=new btgRep.QuantCast(config.QuantCast);hasQuantCast=true;}
if(isConfigDefined(config.ComScore)&&btgRep.ComScore){comscore=new btgRep.ComScore(config.ComScore);hasComScore=true;}
if(btgRep.GUID)
btgRep.GUID.init();if(config.ChoiceStream&&config.ChoiceStream.enabled&&mtvn.btg.reporting.ChoiceStream){choicestream=new mtvn.btg.reporting.ChoiceStream(config.ChoiceStream);hasChoiceStream=true;}};this.sendPageCall=function(data){if(hasOmniture){var omniData=typeof data.omniture=="object"&&data.omniture!=null?data.omniture:data;omniture.sendPageCall(omniData);pageName=omniture.getPageName();}
if(hasQuantCast){var qcData=typeof data.quantCast=="object"&&data.quantCast!=null?data.quantCast:data;quantcast.sendPageCall(qcData);}
if(hasGoogleAnalytics){var gaData=typeof data.googleAnalytics=="object"&&data.googleAnalytics!=null?data.googleAnalytics:data;googleAnalytics.sendPageCall(gaData);}};this.sendLinkEvent=function(data){if(hasOmniture){var omniData=typeof data.omniture=="object"&&data.omniture!=null?data.omniture:data;omniture.sendLinkEvent(omniData);}
if(hasGoogleAnalytics&&mtvn.btg.util.Object.isDefined(data.googleAnalytics)){googleAnalytics.sendLinkEvent(data.googleAnalytics);}};this.getData=function(){return{pageName:pageName};};this.getOmniture=function(){return hasOmniture?omniture:null;};this.setChoiceStreamRequest=function(data,isActivity){if(hasChoiceStream)
choicestream.setChoiceStreamRequest(data,isActivity);}};mtvn.btg.reporting.TestAndTarget={btgIsStr:mtvn.btg.util.String.isDefined,btgCfg:mtvn.btg.config,campaignId:"",isEnabled:function(){return(this.btgIsStr(this.btgCfg.ReportSettings.Omniture.enableTestAndTarget)&&this.btgCfg.ReportSettings.Omniture.enableTestAndTarget);},init:function(){if(!this.isEnabled())
return false;var map=(typeof this.btgCfg.ReportSettings.Omniture.mboxMap!="undefined"?this.btgCfg.ReportSettings.Omniture.mboxMap:"");for(var i=0,len=map.length;i<len;i++){var tempId="temp_"+map[i].elementId;var tempDiv=document.createElement("div");tempDiv.setAttribute("id",tempId);document.getElementsByTagName("body")[0].appendChild(tempDiv);var mboxId=map[i].mboxId;var params=map[i].params;if(this.btgIsStr(map[i].params)){mboxDefine(tempId,mboxId,params);mboxUpdate(mboxId,map[i].params);}
else{mboxDefine(tempId,mboxId);mboxUpdate(mboxId);}}},convertMbox:function(mboxId){if(!this.isEnabled())
return false;var tempId="div_"+mtvn.btg.util.Math.random(100000000000000000,999999999999999999);;var tempDiv=document.createElement("div");document.getElementsByTagName("body")[0].appendChild(tempDiv);mboxDefine(tempId,mboxId);mboxUpdate(mboxId);},createMboxes:function(map){if(!this.isEnabled())
return false;if(typeof this.btgCfg.ReportSettings.Omniture.mboxMap=="object"){if(typeof map!="object")
map=this.btgCfg.ReportSettings.Omniture.mboxMap;else
map=map.concat(this.btgCfg.ReportSettings.Omniture.mboxMap);}
for(i in map){var elementId=map[i].elementId;if(!document.getElementById(elementId))continue;var mboxId=map[i].mboxId;var params=map[i].params;var tempId="temp_"+elementId;var mboxDivId="mboxImported-default-"+mboxId+"-0";if(document.getElementById(mboxDivId).childNodes.length>3){document.getElementById(elementId).innerHTML="";document.getElementById(elementId).appendChild(document.getElementById(mboxDivId));}}},getCampaignId:function(){return this.campaignId;},setCampaignId:function(id){this.campaignId=id;}};mtvn.btg.reporting.Search=new function(){var _btgCk=mtvn.btg.util.Cookie;var _events="";var _setEvent=function(evt){if(_events.indexOf(evt)<0){if(_events!="")_events+=",";_events+=evt;}
return _events;};this.init=function(context){};this.setData=function(_data){if(typeof com_mtvi_SSDC!="object")return _data;var linkTrackVars="events,prop31";_setEvent("event36");_data["eVar3"]=typeof com_mtvi_SSDC.srchtype=="string"?com_mtvi_SSDC.srchtype:"GENERAL";if(typeof com_mtvi_SSDC.srchsyn!="undefined"){_setEvent("event33");if(typeof com_mtvi_SSDC.srchsyn=="object"){for(var s=0,len=com_mtvi_SSDC.srchsyn.length;s<len;s++)com_mtvi_SSDC.srchsyn[s]=com_mtvi_SSDC.srchsyn[s].replace(/\,/,"");com_mtvi_SSDC.srchsyn=com_mtvi_SSDC.srchsyn.join(",");}
_data["eVar36"]=com_mtvi_SSDC.srchsyn;linkTrackVars+=",eVar36";}
if(typeof com_mtvi_SSDC.srchterm=="string"){_setEvent("event38");_data["eVar2"]=com_mtvi_SSDC.srchterm;linkTrackVars+=",eVar2";}
else if(typeof com_mtvi_SSDC.srchfail=="string"){_setEvent("event37");_data["eVar4"]=typeof com_mtvi_SSDC.appfailure=="boolean"&&com_mtvi_SSDC.appfailure?"APP_FAILURE":com_mtvi_SSDC.srchfail;linkTrackVars+=",eVar4";}
mtvn.btg.reporting.UserSegment.set("SiteSearcher");_data["linkTrackVars"]=linkTrackVars;_data["linkTrackEvents"]=_events;return _data;};this.sendLinkEvent=function(){if(!com_mtvi_SSDC)return false;var _data={linkName:"SITE_SEARCH_RESULTS",linkType:"o"}
_data=this.setData(_data);mtvn.btg.Controller.sendLinkEvent(_data);return true;};this.chkConversions=function(_data){var btgCk_read=_btgCk.read;var btgCk_remove=_btgCk.remove;if(typeof _data.events=="string")_events=_data.events;if(btgCk_read("mtvn_btg_SSDC_conv")){_setEvent("event35");btgCk_remove("mtvn_btg_SSDC_conv");}
if(btgCk_read("mtvn_btg_SSDC_syn_conv")){_setEvent("event34");btgCk_remove("mtvn_btg_SSDC_syn_conv");}
if(btgCk_read("mtvn_btg_SSDC_typeahead_conv")){_setEvent("event39");btgCk_remove("mtvn_btg_SSDC_typeahead_conv");}
_data.events=_events;return _data;};this.setConversion=function(){_btgCk.set("mtvn_btg_SSDC_conv",1);};this.setSynConversion=function(){_btgCk.set("mtvn_btg_SSDC_syn_conv",1);};this.setTypeAheadConversion=function(){_btgCk.set("mtvn_btg_SSDC_typeahead_conv",1);};};mtvn.btg.reporting.SEO=new function(){this.setData=function(context,data){_setUserSegments();return data;};var _setUserSegments=function(){var btgRep=mtvn.btg.reporting;var engines=[["google.com","GoogleUser"],["msn.com","MSNUser"],["yahoo.com","YahooUser"]];for(var e=0,len=engines.length;e<len;e++){var referrer=document.referrer;if(referrer.indexOf(engines[e][0])>-1){if(typeof btgRep.UserSegment!="undefined"){btgRep.UserSegment.set(engines[e][1]);}}}}};mtvn.btg.reporting.UserSegment=new function(){var _btgCk=mtvn.btg.util.Cookie;var _COOKIE_NAME="mtvn_btg_userSegments";this.init=function(context){var usCookie=_btgCk.read(_COOKIE_NAME);context.userSegments=usCookie?usCookie.split(","):[];return true;};this.set=function(segment,context){if(!context)context=mtvn.btg.reporting.ReportingManager.getOmniture();for(var s=0,len=context.userSegments.length;s<len;s++){if(context.userSegments[s]==segment)return false;}
context.userSegments[context.userSegments.length]=segment;_btgCk.set(_COOKIE_NAME,context.userSegments.join(","));return true;};this.add=function(context,segment){this.set(segment,context);return true;};this.getSegments=function(context){return context.userSegments};this.getStr=function(context,pre,post){if(!pre)pre="";if(!post)post="";var str=typeof context.userSegments=="object"&&context.userSegments.length>0?pre+context.userSegments.join(post+","+pre)+post:"";return str;};this.setData=function(context,data){data[context.config.userSegmentVarMap.traffic]=data[context.config.userSegmentVarMap.traffic]?data[context.config.userSegmentVarMap.traffic]+(this.getStr(context)!=""?",":"")+this.getStr(context):this.getStr(context);data[context.config.userSegmentVarMap.commerce]=data[context.config.userSegmentVarMap.commerce]?data[context.config.userSegmentVarMap.commerce]+(this.getStr(context,"User Segment;")!=""?",":"")+this.getStr(context,"User Segment;"):this.getStr(context,"User Segment;");return data;};}
mtvn.btg.reporting.RecsABTesting={btgCk:mtvn.btg.util.Cookie,setData:function(context,data){var isStr=mtvn.btg.util.String.isDefined;var us=mtvn.btg.reporting.UserSegment;var vendorCookie=this.btgCk.read("RecsVendor");if(isStr(vendorCookie)){var segment=null;switch(vendorCookie){case"0":segment="RecsAB_ChoiceStream";break;case"1":segment="RecsAB_Control";break;}
if(segment)
us.add(context,segment);}
if(isStr(this.btgCk.read("RecsConversion"))){us.add(context,"RecsAB_ChoiceStream_Clickthrough");if(typeof data["events"]==="string"&&data["events"].length>0)data["events"]+=",event40";else data["events"]="event40";this.btgCk.remove("RecsConversion");}
return data;},setConversion:function(){this.btgCk.set("RecsConversion",1);}};mtvn.btg.reporting.ESIVars=new function(){var _chkObjectExists=function(){if(typeof mtvn_btg_ESIVars!="object")return false;return true;};this.setData=function(context,data){if(!_chkObjectExists())return data;if(typeof context.config.ESIVarMap.network=="string")mtvn.btg.reporting.UserSegment.add(context,mtvn_btg_ESIVars.network);if(typeof context.config.ESIVarMap.asnum=="string")data[context.config.ESIVarMap.asnum]=mtvn_btg_ESIVars.asnum;if(typeof context.config.ESIVarMap.proxy=="string")data[context.config.ESIVarMap.proxy]=mtvn_btg_ESIVars.proxy;if(typeof context.config.ESIVarMap.countryCode=="string")data[context.config.ESIVarMap.countryCode]=mtvn_btg_ESIVars.countryCode;return data;};};mtvn.btg.reporting.Photos=new function(){var _btgU=mtvn.btg.util;var _btgCk=mtvn.btg.util.Cookie;var _btgCk_set=_btgCk.set;var _btgCk_read=_btgCk.read;var _btgClr=mtvn.btg.Controller;_TIMESPENT_COOKIE_NAME="mtvn_btg_photos_timespent";_FLIPBOOKVIEW_COOKIE_NAME="mtvn_btg_photos_flipbook";_startTime=null;_varMap=null;_events="";var _setEvent=function(evt){if(_events.indexOf(evt)<0){if(_events!="")_events+=",";_events+=evt;}
return _events;};this.init=function(_varMap){_startTime=(new Date()).getTime();this._varMap=_varMap;_btgU.DOM.Events.addListener(window,"unload",function(){mtvn.btg.reporting.Photos.setTimespent()});return true;};this.setTimespent=function(){var endTime=(new Date()).getTime();var elapsedSeconds=Math.round((endTime-_startTime)/100);if(elapsedSeconds<1)elapsedSeconds=1;_btgCk_set(_TIMESPENT_COOKIE_NAME,elapsedSeconds);};this.getTimespent=function(){var timerCookie=_btgCk_read(_TIMESPENT_COOKIE_NAME);_btgCk.remove(_TIMESPENT_COOKIE_NAME);_startTime=(new Date()).getTime();return timerCookie?timerCookie:0;};this.setData=function(data){_events=typeof data.events=="string"&&data.events.length>0?data.events:"";if(typeof mtvn_btg_Photos=="object"&&mtvn_btg_Photos!=null&&typeof _varMap=="object"&&_varMap!=null){if((typeof mtvn_btg_Photos.isPhotoView=="boolean"&&mtvn_btg_Photos.isPhotoView)||(typeof mtvn_btg_Photos.photoId=="string"&&mtvn_btg_Photos.photoId!="")){mtvn.btg.reporting.UserSegment.set("Photo Viewer");}
else if(typeof mtvn_btg_Photos.isAd=="boolean"&&typeof mtvn_btg_Photos.isAd)
_setEvent(_varMap.adView);if(typeof mtvn_btg_Photos.application!="undefined"&&typeof mtvn_btg_Photos.gallery!="undefined"&&(typeof mtvn_btg_Photos.photoId!="undefined"||(typeof mtvn_btg_Photos.isAd=="boolean"&&typeof mtvn_btg_Photos.isAd))){var aVars=typeof _varMap.application=="string"?_varMap.application.split(","):_varMap.application;for(var a=0,len=aVars.length;a<len;a++)data[aVars[a]]=mtvn_btg_Photos.application;var gVars=typeof _varMap.gallery=="string"?_varMap.gallery.split(","):_varMap.gallery;for(var g=0,len=gVars.length;g<len;g++)data[gVars[g]]=mtvn_btg_Photos.gallery;var pVars=typeof _varMap.photoId=="string"?_varMap.photoId.split(","):_varMap.photoId;for(var p=0,len=pVars.length;p<len;p++)data[pVars[p]]=mtvn_btg_Photos.photoId;if(typeof mtvn_btg_Photos.photoId!="undefined")
_setEvent(_varMap.photoView);var flipbookViewCookie=_btgCk_read(_FLIPBOOKVIEW_COOKIE_NAME);if(mtvn_btg_Photos.gallery!=flipbookViewCookie){_setEvent(_varMap.flipbookView);_btgCk_set(_FLIPBOOKVIEW_COOKIE_NAME,mtvn_btg_Photos.gallery);if(typeof _btgU.Events["flipBookView"]!="undefined")_btgU.Events["flipBookView"].fire();}
if(typeof data["products"]=="string"&&data["products"]!="")data["products"]+=",";else data["products"]="";data["products"]+=";;;;"+_varMap.timeSpent+"="+this.getTimespent();_setEvent(_varMap.timeSpent);}}
data.events=_events;return data;};this.sendCall=function(_photoObj){if(typeof _photoObj=="object"){if(typeof mtvn_btg_Photos!="object")mtvn_btg_Photos={};if(typeof _photoObj.application=="string")mtvn_btg_Photos.application=_photoObj.application;if(typeof _photoObj.gallery=="string")mtvn_btg_Photos.gallery=_photoObj.gallery;if(typeof _photoObj.photoId=="string")mtvn_btg_Photos.photoId=_photoObj.photoId;if(typeof _photoObj.isAd=="boolean")mtvn_btg_Photos.isAd=_photoObj.isAd;}
this.setTimespent();_btgClr.sendPageCall();};this.trackShareButton=function(){_btgClr.sendLinkEvent({linkName:"Photo Share Button",linkType:"o"});};this.trackRSSButton=function(){_btgClr.sendLinkEvent({linkName:"Photo RSS Button",linkType:"o"});};};mtvn.btg.reporting.BrowserToolbar={setData:function(context,data){var c_read=mtvn.btg.util.Cookie.read;var c_remove=mtvn.btg.util.Cookie.remove;var isStr=mtvn.btg.util.String.isDefined;var us=mtvn.btg.reporting.UserSegment;var user_cookie=c_read("mtvn_btg_Toolbar");if(isStr(user_cookie)){us.add(context,"Toolbar - Main - User");c_remove("mtvn_btg_Toolbar");}
var subscriber_cookie=c_read("mtvn_btg_ToolbarSubscriber");if(isStr(subscriber_cookie)){us.add(context,"Toolbar - Main - Subscriber");c_remove("ToolBarSubscriber");}
var hpuser_cookie=c_read("mtvn_btg_ToolbarHpUser");if(isStr(hpuser_cookie)){us.add(context,"Toolbar - Main - HP User");}
return data;}};mtvn.btg.reporting.ChoiceStream=function(config){this.config=config;this.apiKey=(this.config.apiKey?this.config.apiKey:"");this.profileId=(this.config.profileId?this.config.profileId:"");this.CSRR=null;if(this.config.enabled){try{mtvn.btg.util.DOM.loadScript("http"+('https:'==document.location.protocol?"s":"")+"://stgapi.choicestream.com/instr/csanywhere.js");}catch(e){}}};mtvn.btg.reporting.ChoiceStream.prototype={setChoiceStreamRequest:function(data,isActivity){var _self=this;var _data=(mtvn.btg.util.Object.isDefined(data)?data:{});if(!mtvn.btg.util.Object.isConfigDefined(this.config))return;var _dependency=new mtvn.btg.managers.DependencyManager();_dependency.add("mtvn_csrr",function(){if(typeof csRR=='undefined')
return false;_self.CSRR=new csRR(_self.apiKey,"custom");_self.CSRR.addRecoDisplayRequest(_data.pageType,{"appcontext":_data.pageType});_self.CSRR.setParameter("cookie_id",_self.profileId);for(var i=0,j=(_data.items?_data.items.length:0);i<j;i++)
_self.CSRR.addItem(_data.items[i]);for(var param in _data.parameters){if(_data.hasOwnProperty(param))
_self.CSRR.setParameter(param,_data.parameters[param]);}
if(!isActivity)(_self.CSRR.getRequest()).setSuccessCallback(_self.setPlayerEndSlate);_self.CSRR.send();return true;});_dependency.checkDependency("mtvn_csrr");},setPlayerEndSlate:function(data){var status=data.getStatus();var recoSet=data.getRecoSet(0);var recoStatus=recoSet.getStatus();var numRecos=recoSet.getNumRecos();var items=[];if(recoStatus.getCode()==99){if(numRecos!=0){for(var i=0;i<numRecos;i++){var reco=recoSet.getReco(i);var item={};item.title=reco.getAttribute("name");item.description=reco.getAttribute("description");item.displayData={thumbnail:{url:reco.getAttribute("image_link"),width:70,height:53},source:reco.getAttribute("name")};item.link=reco.getAttribute("link");items.push(item);}}}
window["getEndSlateFeed"]=function(){return{title:"Related Videos",items:items};}}};mtvn.btg.reporting.player.Loadtime={initTime:Number(new Date()),initFlag:0,timeRangeArr:[0,.9,2.9,4.9,6.9,9.9,12.9,15.9,19.9,24.9,30],reportURL:'http://{suiteName}.112.2o7.net/b/ss/{suiteName}/1/H.1-pdv-2/{ord}?pageName={siteName}&c11=PLAYER-LOAD-TEST&c12={delta}&events=event1&products=;;;;event1={playerLoadTime}',suiteName:'viarnd',siteNameVal:'media.mtvnservices.com',timerStateCheck:function(state){if(typeof siteName!="undefined"){this.siteNameVal=siteName;}
if(state=="connected"&&this.initFlag==0){this.initFlag++;var tsPlaying=Number(new Date());var tsPlayDiff=tsPlaying-this.initTime;var secsPlayDiff=tsPlayDiff/1000;var playerLoadTime=secsPlayDiff;secsPlayDiff=(secsPlayDiff>30?30:secsPlayDiff);var delta=0;switch(secsPlayDiff)
{case 0:delta='0-1';break;case 30:delta='30';break;default:for(var i=1,len=this.timeRangeArr.length;i<len;i++)
if(this.timeRangeArr[i-1]<secsPlayDiff&&this.timeRangeArr[i]>=secsPlayDiff){delta=Math.ceil(this.timeRangeArr[i-1])+'-'+Math.ceil(this.timeRangeArr[i]);break;}}
this.reportURL=this.reportURL.replace(/http:/,('https:'==document.location.protocol?"https:":"http:")).replace(/\{suiteName\}/g,this.suiteName).replace(/\{ord\}/,Math.floor(Math.random()*1000000000000)).replace(/\{siteName\}/g,this.siteNameVal).replace(/\{delta\}/,delta).replace(/\{playerLoadTime\}/,playerLoadTime);var reportReq=new Image();reportReq.src=this.reportURL;}}}
mtvn.btg.reporting.player.MediaPlayer={btgC:mtvn.btg.util.Cookie,btgMp:mtvn.btg.reporting.player.MediaPlayer,context:null,playerCommandQueue:null,init:function(context){this.context=context;this.playerCommandQueue=new mtvn.btg.managers.QueueManager({id:"mtvn.btg.reporting.player.MediaPlayer.playerCommandQueue",timeToWait:100,maxNumItems:10,maxElapsed:1000,handler:this.execute})},playStarted:false,players:[],addPlayer:function(id,onLoadFunctionName){this.players[id]=new this.Player(id,onLoadFunctionName);return this.players[id];},setEndSlateClick:function(flag){var btgC_set=this.btgC.set;btgC_set("mtvn_btg_tnt",(flag?mtvn.btg.reporting.TestAndTarget.getCampaignId():"")+"_"+(typeof feedEndslate!='undefined'&&feedEndslate));btgC_set("mtvn_btg_esclicked",flag);},getEndSlateClick:function(flag){return this.btgC.read("mtvn_btg_esclicked");},PlayerController:function(id,onLoadFunctionName){return this.addPlayer(id,onLoadFunctionName);},pause:function(){var self=mtvn.btg.reporting.player.MediaPlayer;for(var p in self.players)
if(self.players.hasOwnProperty(p))
self.players[p].player.pause();},unpause:function(){var self=mtvn.btg.reporting.player.MediaPlayer;for(var p in self.players)
if(self.players.hasOwnProperty(p))
self.players[p].player.unpause();},execute:function(command){var self=mtvn.btg.reporting.player.MediaPlayer;var btgAL=mtvn.btg.html5.ads.AdLoader;try{if(btgAL.html5Player){self.playStarted=true;}}catch(e){}
if(self.playStarted){switch(command){case"unpause":if(mtvn.btg.html5&&btgAL.html5Player){if(self.pausedPlay){btgAL.html5Player.play();}}
else{self.unpause();}
break;case"pause":if(mtvn.btg.html5&&btgAL.html5Player){self.pausedPlay=!btgAL.html5Player.paused;btgAL.html5Player.pause();}
else{self.pause();}
break;}}
else{self.playerCommandQueue.queue.push(command);}},Player:function(id,onLoadFunctionName){var _btgC=mtvn.btg.Controller;var _btgCk=mtvn.btg.util.Cookie;var _btgR=mtvn.btg.reporting;var _btgTaT=mtvn.btg.reporting.TestAndTarget;var _btgP=mtvn.btg.reporting.player.MediaPlayer;var _btgCfg=mtvn.btg.config;var config=_btgCfg.ReportSettings;this.playerId=id;this.lastGuid=null;this.player=null;this.playerLoaded=false;this.onLoadFunctionName=onLoadFunctionName;this.onLoaded=function(){this.player=(navigator.appName.indexOf("Microsoft")!=-1)?window[this.playerId]:document[this.playerId];if(typeof this.player.length!='undefined')this.player=this.player[0];this.player.addEventListener('METADATA','mtvn.btg.reporting.player.MediaPlayer.players[\"'+this.playerId+'\"].onMetaData');this.player.addEventListener('ENDSLATE_CLICK','mtvn.btg.reporting.player.MediaPlayer.players[\"'+this.playerId+'\"].onEndslateLoad');this.player.addEventListener('PLAYHEAD_UPDATE','mtvn.btg.reporting.player.MediaPlayer.players[\"'+this.playerId+'\"].onPlayHeadUpdate');this.playerLoaded=true;var onLoadFunctionName=eval(this.onLoadFunctionName);if(typeof onLoadFunctionName=='function')onLoadFunctionName(this);};this.onDump=function(){};this.dump=function(){var temp="";if(this.playerLoaded){temp=this.player.getLogDump();}
else{temp="player not loaded";}
this.onDump(temp);};this.onPlayHeadUpdate=function(){var self=mtvn.btg.reporting.player.MediaPlayer;if(!self.playStarted){self.playStarted=true;self.playerCommandQueue.init();}},this.onMetaData=function(metadata){if(location.search.match(/showMetaData\=true/)){str="";for(m in metadata)str+=m+": "+metadata[m]+"\n";alert(this.lastGuid+"\n\n\n"+str);};var esCampaign="";var url=document.location.search;var isEndSlate=(url.toLowerCase().indexOf("xrs=mpes_")!=-1?true:false);var isC3Content=metadata["contentType"]==="c3_adpod";if(isEndSlate){var paramArr=url.replace(/^\?/g,'').split("&");for(var i=0,len=paramArr.length;i<len;i++){if(paramArr[i].split('=')[0]=='xrs'){esCampaign=(mtvn.btg.util.String.isDefined(paramArr[i].split('=')[1])?paramArr[i].split('=')[1]:"");}}}
if(metadata["guid"]&&this.lastGuid!==metadata["guid"]){var _data={linkName:"Video View",linkType:"o",eVar28:metadata["contentType"],events:"event15"+(_btgP.getEndSlateClick()=='true'?",event45":""),campaign:esCampaign};if(typeof _btgCfg.ReportSettings.Omniture.enableTestAndTargetTrial!='undefined'&&_btgCfg.ReportSettings.Omniture.enableTestAndTargetTrial){var tntString=_btgCk.read("mtvn_btg_tnt");var tnt=(tntString?tntString.split('_')[0]:"");var feed=(tntString?tntString.split('_')[1]:"false");if(_btgP.getEndSlateClick()=='true'&&tnt!=""){if(feed.toString()=="true")
_btgTaT.convertMbox((location.href&&location.href.match(/[\?#&]id=[^&]/gi)?"editorialplaylist":"dynamicplaylist"));else
_btgTaT.convertMbox("endslatevideoloaded");}
_btgTaT.convertMbox("endSlateGating");}
_btgCk.set("mtvn_btg_tnt","");if(typeof _btgR.UserSegment!="undefined"){_btgR.UserSegment.add(_btgP.context,"VideoViewer");if(isC3Content){_btgR.UserSegment.add(_btgR.MediaPlayer.context,"C3VideoViewer");}}
if(typeof _btgCfg.ReportSettings.Omniture.videoViewEventDisable!="undefined"&&_btgCfg.ReportSettings.Omniture.videoViewEventDisable){_data.events=_data.events.replace(/event15(,)?/gi,"");_data.eVar28="";}
else{_btgP.setEndSlateClick('false');_btgC.sendLinkEvent(_data);}};this.lastGuid=metadata["guid"];};this.onEndslateLoad=function(){var _data={linkName:"Endslate View",linkType:"o",events:"event44"};if(typeof this.onEndslateFired!='undefined'){return;}else{this.onEndslateFired=true;}
if(typeof _btgR.UserSegment!="undefined"){_btgR.UserSegment.add(_btgP.context,"EndslateViewer");}
_btgC.sendLinkEvent(_data);if(typeof _btgCfg.ReportSettings.Omniture.enableTestAndTargetTrial!='undefined'&&_btgCfg.ReportSettings.Omniture.enableTestAndTargetTrial)
_btgTaT.convertMbox("endslateload");};},onWindowLoaded:function(e){var self=mtvn.btg.reporting.player.MediaPlayer;var oldMtvnPlayerLoaded=window["mtvnPlayerLoaded"];var mtvnPlayerLoaded=function(id){if(typeof oldMtvnPlayerLoaded!="undefined")oldMtvnPlayerLoaded(id);if(typeof document.getElementById(id)=="undefined")return;if(typeof self.players[id]=='undefined')
self.addPlayer(id);self.players[id].onLoaded();};window["mtvnPlayerLoaded"]=mtvnPlayerLoaded;}};try{mtvn.btg.reporting.player.MediaPlayer.onWindowLoaded();}catch(e){}
mtvn.btg.reporting.player.Preload=function(){this.playUpUrl='https://web.archive.org/web/20110912044651/http://media.mtvnservices.com/player/images/Button_playBig_upSkin.png';this.playOverUrl='https://web.archive.org/web/20110912044651/http://media.mtvnservices.com/player/images/Button_playBig_overSkin.png';this.playButtonWidth=92;this.playButtonHeight=70;this.embedCount=0;this.getElementsByClassName=function(elementType,swapClass){var retnode=[];var myclass=new RegExp('\\b'+swapClass+'\\b');var elem=document.getElementsByTagName(elementType);for(var i=0,len=elem.length;i<len;i++){var classes=elem[i].className;if(myclass.test(classes))retnode.push(elem[i]);}
return retnode;}
this.attachClickToWrappers=function(swapDivName,h,w){var holders=this.getElementsByClassName("div",swapDivName);for(var i=0,len=holders.length;i<len;i++){var currentHolder=holders[i];this.onClickWrapper(currentHolder,h,w);}}
this.attachToWrappers=function(swapDivName,h,w){var holders=this.getElementsByClassName("div",swapDivName);for(var i=0,len=holders.length;i<len;i++){var currentHolder=holders[i];this.attachToWrapper(currentHolder,h,w);}}
this.attachToWrapper=function(swapDivO,h,w){var embedCount=this.embedCount;var upName="pUp"+this.embedCount;var overName="pOver"+this.embedCount;var images=swapDivO.getElementsByTagName('img');var placeHolder=images[0];swapDivO.style.position="relative";var playOver=document.createElement('img');playOver.src=this.playOverUrl;playOver.style.position="absolute";playOver.style.zIndex=15;playOver.style.left=placeHolder.width/2-this.playButtonWidth/2;playOver.style.top=placeHolder.height/2-this.playButtonHeight/2;playOver.style.display="none";playOver.className="pOver";playOver.id=overName;var playUp=document.createElement('img');playUp.src=this.playUpUrl;playUp.style.position="absolute";playUp.style.zIndex=15;playUp.style.left=placeHolder.width/2-this.playButtonWidth/2;playUp.style.top=placeHolder.height/2-this.playButtonHeight/2;playUp.style.display="block";playUp.className="pUp";playUp.id=upName;swapDivO.m=new Object();swapDivO.m.idNumber=embedCount;swapDivO.m.overIdName=overName;swapDivO.m.upIdName=upName;swapDivO.appendChild(playOver);swapDivO.appendChild(playUp);this.onClickWrapper(swapDivO,h,w);this.onEnterWrapper(swapDivO);this.onExitWrapper(swapDivO);this.embedCount++;}
this.onEnterWrapper=function(o){o.onmouseover=function(){var overId=this.m["overIdName"];var pOver=document.getElementById(overId);pOver.style.display="block";var upId=this.m["upIdName"];var pUp=document.getElementById(upId);pUp.style.display="none";}}
this.onExitWrapper=function(o){o.onmouseout=function(){var overId=this.m["overIdName"];var pOver=document.getElementById(overId);pOver.style.display="none";var upId=this.m["upIdName"];var pUp=document.getElementById(upId);pUp.style.display="block";}}
this.createEmbedTag=function(id,h,w,flashVars){var embed=document.createElement('embed');embed.setAttribute('src','https://web.archive.org/web/20110912044651/http://media.mtvnservices.com/'+id);embed.setAttribute('height',h);embed.setAttribute('width',w);embed.setAttribute('id',id);embed.setAttribute('flashVars',flashVars);embed.setAttribute('wmode','window');embed.setAttribute('allowFullScreen',true);embed.setAttribute('allowScriptAccess','always');embed.setAttribute('type','application/x-shockwave-flash');embed.style.backgroundColor='black';return embed;}
this.onClickWrapper=function(o,h,w){o.onclick=function(){var id=this.id;var flashVars;if(this.getElementsByTagName('q').length>0){var qValue=this.getElementsByTagName('q');flashVars=qValue[0].innerHTML;}
if(this.getAttribute('flashVars')){flashVars=this.getAttribute('flashVars');}
if(h==0){var elemArray=this.getElementsByTagName('img');var elem=elemArray[0];h=elem.height;w=elem.width;}
var overId=this.m["overIdName"];pOver=document.getElementById(overId);this.removeChild(pOver);var upId=this.m["upIdName"];pUp=document.getElementById(upId);this.removeChild(pUp);var images=this.getElementsByTagName('img');for(var i=0,len=images.length;i<len;i++){var dropNode=images[i];this.removeChild(dropNode);}
var embed=MTVNPlayerPreload.createEmbedTag(id,h,w,flashVars);this.appendChild(embed);o.onmouseout=function(){};o.onmouseover=function(){};o.onclick=function(){};}}}();mtvn.btg.reporting.games.GameEventMediator={gameSwf:null,gameLoad:function(id){this.gameSwf=(navigator.appName.indexOf("Microsoft")!=-1&&window[id])?window[id]:document[id];if(this.gameSwf&&this.gameSwf.addEventListener){this.gameSwf.addEventListener('ON_GAME_EVENT','mtvn.btg.reporting.games.GameReporter.onGameEvent');}}}
mtvn.btg.reporting.games.GameEventVO={ON_GAME_LOAD:"event51",ON_GAME_PLAY:"event52",ON_GAME_LEVELSTART:"event54"}
mtvn.btg.reporting.games.GameReporter={config:{},metadata:{},gtsEvent:"event74",gtsTracker:new mtvn.btg.util.TimeTracker("gtsTracker"),omniVarMap:{linkName:"linkName",linkURL:"gameURL",prop39:"gameGenre",prop40:"gameTitle",eVar53:"gameTitle",eVar54:"franchise",eVar41:"gameGenre",eVar42:"level",eVar31:"applicationName",prop48:"applicationName",eVar30:"applicationOrigin",prop47:"applicationOrigin",eVar32:"applicationContext",prop49:"applicationContext",products:"products",events:"events"},gaVarMap:{category:"gameTitle",action:"eventName"},init:function(obj){this.mapConfig(obj);this.gameReporterQueue=new mtvn.btg.managers.QueueManager({id:"mtvn.btg.reporting.games.GameReporter.gameReporterQueue",timeToWait:300,maxNumItems:10,maxElapsed:3000,handler:this.gameEvent,notificationHandler:this.notify});},onGameLoad:function(data){if(data=="embed"&&mtvn.btg.reporting.games.GameEventMediator.gameSwf!=null){return;}
this.onGameEvent("ON_GAME_LOAD",data);},onGameEvent:function(eventName,data){this.gameReporterQueue.addToQueue(eventName,data);},notify:function(a_qmObj){var notifyMsg="";notifyMsg+="QueueManager/GameReporter processed ";notifyMsg+=a_qmObj.processedQueue.length+" Game Events out of "+a_qmObj.itemsAdded+" before aborting.";notifyMsg+="QM settings:timeToWait="+a_qmObj.timeToWait;notifyMsg+=";maxNumItems="+a_qmObj.maxNumItems;notifyMsg+=";maxElapsed="+a_qmObj.maxElapsed+".";notifyMsg+="Events processed:";for(var i=0,len=a_qmObj.processedQueue.length;i<len;i++){notifyMsg+=a_qmObj.processedQueue[i][0];notifyMsg+=(i<a_qmObj.processedQueue.length-1)?";":"";}
new mtvn.btg.util.Alert(notifyMsg);},gameEvent:function(e){var btgGms=mtvn.btg.reporting.games;var isObj=mtvn.btg.util.Object.isDefined;var btgClr=mtvn.btg.Controller;var btgU=mtvn.btg.util;var isStr=mtvn.btg.util.String.isDefined;var omniData,gaData,pageTracker;var metadata=btgGms.GameReporter.metadata;var config=btgGms.GameReporter.config;var eventName=e[0];var data=isObj(e[1])?e[1]:{};var eventVO=btgGms.GameEventVO;var wasEventFired=false;if(typeof eventVO[eventName]!="undefined"){omniData=data;omniData["events"]=eventVO[eventName];switch(eventName){case"ON_GAME_LOAD":btgGms.GameReporter.gtsTracker.init();break;}
omniData=btgGms.GameReporter.mapOmniData(omniData);btgClr.sendLinkEvent(omniData);}
else{if(isObj(data)&&typeof data.varmap!="undefined"){omniData=data;if(typeof omniData.varmap=="string"){omniData.varmap=omniData.varmap.replace(/\s/,"");omniData.varmap=omniData.varmap.split(",");}
for(var m=0,len=omniData.varmap.length;m<len;m++){if(omniData.varmap[m].match(/event/)){if(isNaN(parseFloat(eventName))){omniData["events"]=typeof omniData["events"]=="string"?omniData["events"]+=",":"";omniData["events"]+=omniData.varmap[m];}
else{omniData["products"]=typeof omniData["products"]=="string"?omniData["events"]+=",":"";omniData["products"]+=";;;;"+omniData.varmap[m]+"="+eventName;}}
else omniData[omniData.varmap[m]]=eventName;}
delete omniData.varmap;omniData=btgGms.GameReporter.mapOmniData(omniData);btgClr.sendLinkEvent(omniData);wasEventFired=true;}
else if(isObj(config.omnitureEventMap)&&isObj(config.omnitureEventMap[eventName])){omniData=data;var origOmniVarMap={};btgU.Object.copyProperties(btgGms.GameReporter.omniVarMap,origOmniVarMap);btgGms.GameReporter.appendOmniVarMap(config.omnitureEventMap[eventName]);omniData=btgGms.GameReporter.mapOmniData(omniData);btgGms.GameReporter.omniVarMap=origOmniVarMap;btgClr.sendLinkEvent(omniData);wasEventFired=true;}
if(isStr(config.gaAccount)&&isObj(config.googleEventMap)&&isObj(config.googleEventMap[eventName])&&isStr(config.googleEventMap[eventName].label)&&isStr(config.googleEventMap[eventName].value)&&isStr(data[config.googleEventMap[eventName].label])&&isStr(data[config.googleEventMap[eventName].value])){gaData=data;btgGms.GameReporter.appendGaVarMap(config.googleEventMap[eventName]);gaData["eventName"]=eventName;gaData=btgGms.GameReporter.mapGaData(gaData);gaData.label=typeof gaData.label!="undefined"&&gaData.label!=""?gaData.label:"General";gaData.value=typeof gaData.value!="undefined"&&typeof parseInt(gaData.value)=="number"?parseInt(gaData.value):null;pageTracker=_gat._createTracker(config.gaAccount,"event_tracker");pageTracker._setDomainName("");pageTracker._trackEvent(gaData.category,gaData.action,gaData.label,gaData.value);wasEventFired=true;}
if(!wasEventFired){new btgU.Alert("GameReporter: Unrecognized event "+eventName+". Game Title = "+metadata.gameTitle+" Game URL= "+metadata.gameURL+".");return;}}
if(typeof btgU.Events[eventName]!="undefined")btgU.Events[eventName].fire(data);},mapOmniData:function(data){var omniVarMap=this.omniVarMap;var isStr=mtvn.btg.util.String.isDefined;var dataObj={};if(typeof data=="object"&&data!=null){for(var key in data){if(data.hasOwnProperty(key)&&!isStr(this.metadata[key]))
dataObj[key]=data[key];}}
for(var key in omniVarMap){if(!omniVarMap.hasOwnProperty(key))continue;if(isStr(this.metadata[omniVarMap[key]]))
dataObj[key]=this.metadata[omniVarMap[key]];else if(isStr(data[omniVarMap[key]]))
dataObj[key]=data[omniVarMap[key]];}
mtvn.btg.reporting.games.GameReporter.gtsTracker.setData(dataObj["eVar53"]+","+dataObj["eVar54"]);dataObj=this.addGtsData(dataObj);return dataObj;},appendOmniVarMap:function(map){var btgGms=mtvn.btg.reporting.games;if(typeof map!="undefined"){for(var key in map){if(!map.hasOwnProperty(key))continue;if(/prop(((0|1|3|4|5|6|7|8|9|10|11|12|30|31|33|34|35|36|37|38|43|45|46|47|48|49)$)|([5-9][0-9]|[1-9][0-9]{2,})$)/.test(key)||/eVar(((0|2|3|4|5|6|7|8|9|10|11|12|18|26|27|28|29|30|31|32|33|34|36|42|45|46|49)$)|([5-9][0-9]|[1-9][0-9]{2,})$)/.test(key)||/event(((0|15|16|24|25|26|27|28|29|33|34|35|36|37|38|39|40|44|45|49)$)|([5-9][0-9]|[1-9][0-9]{2,})$)/.test(key)){new mtvn.btg.util.Alert("GameReporter error nonstandard event call. Omniture variable '"+key+"' is reserved and cannot be overriden. Game Title = "+btgGms.GameReporter.metadata.gameTitle+". Game URL= "+btgGms.GameReporter.metadata.gameURL+".");continue;}
if(!mtvn.btg.util.String.isDefined(this.omniVarMap[key]))
this.omniVarMap[key]=map[key];}}},mapGaData:function(data){var gaVarMap=this.gaVarMap;var isStr=mtvn.btg.util.String.isDefined;var dataObj={};for(var key in gaVarMap){if(!gaVarMap.hasOwnProperty(key))continue;if(isStr(this.metadata[gaVarMap[key]]))
dataObj[key]=this.metadata[gaVarMap[key]];else if(isStr(data[gaVarMap[key]]))
dataObj[key]=data[gaVarMap[key]];}
return dataObj;},appendGaVarMap:function(map){if(typeof map!="undefined"){for(var key in map){if(!map.hasOwnProperty(key))continue;this.gaVarMap[key]=map[key];}}},mapConfig:function(data){this.config={gaAccount:(data.Reporting.GoogleAnalytics&&data.Reporting.GoogleAnalytics.enabled?data.Reporting.GoogleAnalytics.account:''),googleEventMap:data.googleEventMap,omnitureEventMap:data.omnitureEventMap};this.metadata.gameURL=data.Game.metadata.gameURL;this.metadata.gameGenre=data.Game.metadata.gameGenre;this.metadata.gameTitle=data.Game.metadata.gameTitle;this.metadata.franchise=data.Game.metadata.franchise;this.metadata.applicationName=data.Game.metadata.type;this.metadata.applicationOrigin=data.Game.metadata.orig;this.metadata.applicationContext=data.Game.metadata.ref;this.metadata.products="User Segment;Game Player";this.metadata.events="";this.metadata.linkName="Game Link Event";},getGtsVals:function(a_gtsVal,a_data){if(mtvn.btg.util.String.isDefined(a_gtsVal)){a_gtsVal+="";a_gtsVal=a_gtsVal.split(",");var gts=parseInt(a_gtsVal[0]);if(!isNaN(gts)&&gts>0){a_data["products"]=(typeof a_data["products"]=="string")?a_data["products"]+=",":"";a_data["products"]+=";;;;"+this.gtsEvent+"="+gts;a_data["events"]=(typeof a_data["events"]=="string")?a_data["events"]+=",":"";a_data["events"]+=this.gtsEvent;if(a_gtsVal.length==3){a_data["eVar53"]=a_gtsVal[1];a_data["eVar54"]=a_gtsVal[2];}}}
return a_data;},addGtsData:function(data){return this.getGtsVals(mtvn.btg.reporting.games.GameReporter.gtsTracker.getTimeSpentOnPage(),data);},setData:function(data){return this.getGtsVals(mtvn.btg.reporting.games.GameReporter.gtsTracker.getTimespent(),data);}};mtvn.btg.reporting.games.GameReportingManager=new function(){var _btgGms=mtvn.btg.reporting.games;var hasOmniture=false;var config;this.init=function(){config=com.mtvnet.games.GameSettings;if(config.Reporting.omniture.enabled.toString()=="true")
hasOmniture=true;_btgGms.GameReporter.init(config);}
this.gameLoad=function(id){if(mtvn.btg.util.String.isDefined(id)){if(id=="embed"){setTimeout('mtvn.btg.reporting.games.GameReporter.onGameLoad("embed")',10000);}else if(id!="load")
_btgGms.GameEventMediator.gameLoad(id);}}}
var s_code='',s_objectID;function s_gi(un,pg,ss){try{var c="s._c='s_c';s.wd=window;if(!s.wd.s_c_in){s.wd.s_c_il=new Array;s.wd.s_c_in=0;}s._il=s.wd.s_c_il;s._in=s.wd.s_c_in;s._il[s._in]=s;s.wd.s_c_in++;s"
+".an=s_an;s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=func"
+"tion(o){if(!o)return o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.indexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexO"
+"f(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3)"
+"return encodeURIComponent(x);else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%"
+"16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}return y}else{x=s.rep(escape(''+x),'+','%2B');if(c&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if"
+"(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}}return x};s.epa=function(x){var s=this;if(x){x=''+x;return s.em==3?de"
+"codeURIComponent(x):unescape(s.rep(x,'+',' '))}return x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d.l"
+"ength;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.f"
+"sf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.si=function(){var s=this,i,k,v,c="
+"s_gi+'var s=s_gi(\"'+s.oun+'\");s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)=='string')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}"
+"c+=\"s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var"
+" s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('"
+".',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s."
+"epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NON"
+"E'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()"
+"+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i]."
+"o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv"
+">=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,"
+"'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s"
+".t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs="
+"p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,"
+"l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,0,r.t,r.u)}};s.br=function(id,rs){var s=this;if(s.disableBufferedRequests||!s.c_w('s_br',rs))s.brl=rs};s.flushBufferedReques"
+"ts=function(){this.fbr(0)};s.fbr=function(id){var s=this,br=s.c_r('s_br');if(!br)br=s.brl;if(br){if(!s.disableBufferedRequests)s.c_w('s_br','');s.mr(0,0,br)}s.brl=0};s.mr=function(sess,q,rs,id,ta,u"
+"){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+(un),im,b,e;if(!rs){if"
+"(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s"
+".ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/H.22.1/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047);if(id){s.br(id,rs);return}}if(s.d.images&&s.apv>=3"
+"&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+']."
+"mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im.s_l=0;im.onload=new Function('e',"
+"'this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;im.src=rs;if((!ta||ta=='_self'||ta="
+"='_top'||(s.wd.name&&ta==s.wd.name))&&rs.indexOf('&pe=')>=0){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0"
+" alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl="
+"function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,l,a,b='',c='',t;if(x){y=''+x;i=y.indexOf('?');if(i>0){a=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase()"
+";i=0;if(h.substring(0,7)=='http://')i+=7;else if(h.substring(0,8)=='https://')i+=8;h=h.substring(i);i=h.indexOf(\"/\");if(i>0){h=h.substring(0,i);if(h.indexOf('google')>=0){a=s.sp(a,'&');if(a.lengt"
+"h>1){l=',q,ie,start,search_key,word,kw,cd,';for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c){y+='?'+b+'&'"
+"+c;if(''+x!=y)x=y}}}}}}return x};s.hav=function(){var s=this,qs='',fv=s.linkTrackVars,fe=s.linkTrackEvents,mn,i;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].tr"
+"ackVars;fe=s[mn].trackEvents}}fv=fv?fv+','+s.vl_l+','+s.vl_l2:'';for(i=0;i<s.va_t.length;i++){var k=s.va_t[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(v&&k!='linkName'&&k!='l"
+"inkType'){if(s.pe||s.lnk||s.eo){if(fv&&(','+fv+',').indexOf(','+k+',')<0)v='';if(k=='events'&&fe)v=s.fs(v,fe)}if(v){if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pa"
+"geURL'){q='g';v=s.fl(v,255)}else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigra"
+"tionServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em="
+"=2||s.em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode"
+"')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j"
+"';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp'"
+";else if(k=='plugins')q='p';else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+q+'='+(k.substring(0,3)"
+"!='pev'?s.ape(v):v)}}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t"
+")return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExt"
+"ernalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.substring(0,1)"
+"!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=s.co(this);s.t"
+"();s.lnk=0;if(b)return this[b](e);return true');s.bc=new Function('e','var s=s_c_il['+s._in+'],f,tcf;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;s.eo=e.srcElement?e.srcElement:e.target;tcf=new Functi"
+"on(\"s\",\"var e;try{if(s.eo&&(s.eo.tagName||s.eo.parentElement||s.eo.parentNode))s.t()}catch(e){}\");tcf(s);s.eo=0');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.inde"
+"xOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'"
+"')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE'"
+")t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p"
+"=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' '"
+",'');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100"
+");o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&"
+"s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,'"
+",','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[u"
+"n]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Ob"
+"ject.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq"
+"[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o"
+".onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie|"
+"|!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener)s.b.addEventListener('click',s.bc,false);else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=func"
+"tion(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e)"
+")return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.subst"
+"ring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowe"
+"rCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};"
+"s.sa=function(un){var s=this;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_"
+"l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Ar"
+"ray('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.le"
+"ngth;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0"
+";if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf("
+"\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl."
+"length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexO"
+"f('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadMo"
+"dule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else "
+"g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],"
+"o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!"
+"o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javas"
+"cript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,"
+"f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.vo1=function(t,a){if(a[t]"
+"||a['!'+t])this[t]=a[t]};s.vo2=function(t,a){if(!a[t]){a[t]=this[t];if(!a[t])a['!'+t]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.d"
+"ll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.d"
+"l=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.pt(s.vl_g,',','vo2',vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s.t=fun"
+"ction(vo,id){var s=this,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate("
+")+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Objec"
+"t;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1'"
+";if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try"
+"{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next)j='1.7'}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c="
+"screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.offsetWid"
+"th;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return hp');hp="
+"tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.f"
+"l(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectionType=c"
+"t;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.pt(s.vl_g,',','vo2',vb);s.pt(s.vl_g,',','vo1',vo)}if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);var l=s.wd.location,r=tfs.document.referrer"
+";if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk;if(!o)return '';var p=s.pageName,w=1,t=s.ot(o)"
+",n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';t=s.ot(o);n=s.oid(o);x=o.s_oidt}oc=o.onclick?''+o.onclick:''"
+";if((oc.indexOf(\"s_gs(\")>=0&&oc.indexOf(\".s_oc(\")<0)||oc.indexOf(\".tl(\")>=0)return ''}if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName"
+";t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l))q+='&pe=lnk_'+(t=='d'||t=='e'?s.ape(t):'o')+(h?'&pev1='+s.ape(h):'')+(l?'&pev2='+s.ape(l):'');else trk=0;if(s.trackInlineStats){if(!p){p="
+"s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot="
+"'+s.ape(t)+(i?'&oi='+i:'')}}if(!trk&&!qs)return '';s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,id,ta);qs='';s.m_m('t');if(s.p_r)s.p_r("
+");s.referrer=''}s.sq(qs);}else{s.dl(vo);}if(vo)s.pt(s.vl_g,',','vo1',vb);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_link"
+"Name=s.wd.s_linkType='';if(!id&&!s.tc){s.tc=1;s.flushBufferedRequests()}return code};s.tl=function(o,t,n,vo){var s=this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t(vo)};if(pg){s.wd.s_co=function(o)"
+"{var s=s_gi(\"_\",1,1);return s.co(o)};s.wd.s_gs=function(un){var s=s_gi(un,1,1);return s.t()};s.wd.s_dc=function(un){var s=s_gi(un,1);return s.t()}}s.ssl=(s.wd.location.protocol.toLowerCase().inde"
+"xOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var ap"
+"n=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isope"
+"ra=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv="
+"parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=="
+"'%U0100'?1:0))}s.sa(un);s.vl_l='dynamicVariablePrefix,visitorID,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLi"
+"fetime,pageName,pageURL,referrer,currencyCode';s.va_l=s.sp(s.vl_l,',');s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,products,linkName,"
+"linkType';for(var n=1;n<76;n++)s.vl_t+=',prop'+n+',eVar'+n+',hier'+n+',list'+n;s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browse"
+"rHeight,connectionType,homepage,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests"
+",mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadF"
+"ileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,_1_referrer';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);if(!ss)s.wds()",w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,s;if(un){un=un.toLowerCase();if(l)for(i=0;i<l.length;i++){s=l[i];if(!s._c||s._c=='s_c'){if(s.oun==un)return s;else if(s.fs&&s.sa&&s.fs(s.oun,un)){s.sa(un);return s}}}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+"a");w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a>=5&&v.indexOf('Opera')<0&&u.indexOf('Opera')<0){w.s_c=new Function("un","pg","ss","var s=this;"+c);return new s_c(un,pg,ss)}else s=new Function("un","pg","ss","var s=new Object;"+s_ft(c)+";return s");return s(un,pg,ss)}catch(e){}}
var mboxCopyright="Copyright 1996-2009. Adobe Systems Incorporated. All rights reserved";mboxUrlBuilder=function(a,b){this.a=a;this.b=b;this.c=new Array();this.d=function(e){return e;};this.f=null;};mboxUrlBuilder.prototype.addParameter=function(g,h){var i=new RegExp('(\'|")');if(i.exec(g)){throw"Parameter '"+g+"' contains invalid characters";}for(var j=0;j<this.c.length;j++){var k=this.c[j];if(k.name==g){k.value=h;return this;}}var l=new Object();l.name=g;l.value=h;this.c[this.c.length]=l;return this;};mboxUrlBuilder.prototype.addParameters=function(c){if(!c){return this;}for(var j=0;j<c.length;j++){var m=c[j].indexOf('=');if(m==-1||m==0){continue;}this.addParameter(c[j].substring(0,m),c[j].substring(m+1,c[j].length));}return this;};mboxUrlBuilder.prototype.setServerType=function(n){this.o=n;};mboxUrlBuilder.prototype.setBasePath=function(f){this.f=f;};mboxUrlBuilder.prototype.setUrlProcessAction=function(p){this.d=p;};mboxUrlBuilder.prototype.buildUrl=function(){var q=this.f?this.f:'/m2/'+this.b+'/mbox/'+this.o;var r=document.location.protocol=='file:'?'http:':document.location.protocol;var e=r+"//"+this.a+q;var s=e.indexOf('?')!=-1?'&':'?';for(var j=0;j<this.c.length;j++){var k=this.c[j];e+=s+encodeURIComponent(k.name)+'='+encodeURIComponent(k.value);s='&';}return this.t(this.d(e));};mboxUrlBuilder.prototype.getParameters=function(){return this.c;};mboxUrlBuilder.prototype.setParameters=function(c){this.c=c;};mboxUrlBuilder.prototype.clone=function(){var u=new mboxUrlBuilder(this.a,this.b);u.setServerType(this.o);u.setBasePath(this.f);u.setUrlProcessAction(this.d);for(var j=0;j<this.c.length;j++){u.addParameter(this.c[j].name,this.c[j].value);}return u;};mboxUrlBuilder.prototype.t=function(v){return v.replace(/\"/g,'&quot;').replace(/>/g,'&gt;');};mboxStandardFetcher=function(){};mboxStandardFetcher.prototype.getType=function(){return'standard';};mboxStandardFetcher.prototype.fetch=function(w){w.setServerType(this.getType());document.write('<'+'scr'+'ipt src="'+w.buildUrl()+'" language="JavaScript"><'+'\/scr'+'ipt>');};mboxStandardFetcher.prototype.cancel=function(){};mboxAjaxFetcher=function(){};mboxAjaxFetcher.prototype.getType=function(){return'ajax';};mboxAjaxFetcher.prototype.fetch=function(w){w.setServerType(this.getType());var e=w.buildUrl();this.x=document.createElement('script');this.x.src=e;document.body.appendChild(this.x);};mboxAjaxFetcher.prototype.cancel=function(){};mboxMap=function(){this.y=new Object();this.z=new Array();};mboxMap.prototype.put=function(A,h){if(!this.y[A]){this.z[this.z.length]=A;}this.y[A]=h;};mboxMap.prototype.get=function(A){return this.y[A];};mboxMap.prototype.remove=function(A){this.y[A]=undefined;};mboxMap.prototype.each=function(p){for(var j=0;j<this.z.length;j++){var A=this.z[j];var h=this.y[A];if(h){var B=p(A,h);if(B===false){break;}}}};mboxFactory=function(C,b,D){this.E=false;this.C=C;this.D=D;this.F=new mboxList();mboxFactories.put(D,this);this.G=typeof document.createElement('div').replaceChild!='undefined'&&(function(){return true;})()&&typeof document.getElementById!='undefined'&&typeof(window.attachEvent||document.addEventListener||window.addEventListener)!='undefined'&&typeof encodeURIComponent!='undefined';this.H=this.G&&mboxGetPageParameter('mboxDisable')==null;var I=D=='default';this.J=new mboxCookieManager('mbox'+(I?'':('-'+D)),(function(){return mboxCookiePageDomain();})());this.H=this.H&&this.J.isEnabled()&&(this.J.getCookie('disable')==null);if(this.isAdmin()){this.enable();}this.K=mboxGenerateId();this.L=mboxScreenHeight();this.M=mboxScreenWidth();this.N=mboxBrowserWidth();this.O=mboxBrowserHeight();this.P=mboxScreenColorDepth();this.Q=mboxBrowserTimeOffset();this.R=new mboxSession(this.K,'mboxSession','session',31*60,this.J);this.S=new mboxPC('PC',1209600,this.J);this.w=new mboxUrlBuilder(C,b);this.T(this.w,I);this.U=new Date().getTime();this.V=this.U;var W=this;this.addOnLoad(function(){W.V=new Date().getTime();});if(this.G){this.addOnLoad(function(){W.E=true;W.getMboxes().each(function(X){X.setFetcher(new mboxAjaxFetcher());X.finalize();});});this.limitTraffic(100,10368000);if(this.H){this.Y();this.Z=new mboxSignaler(function(_,c){return W.create(_,c);},this.J);}}};mboxFactory.prototype.isEnabled=function(){return this.H;};mboxFactory.prototype.getDisableReason=function(){return this.J.getCookie('disable');};mboxFactory.prototype.isSupported=function(){return this.G;};mboxFactory.prototype.disable=function(ab,bb){if(typeof ab=='undefined'){ab=60*60;}if(typeof bb=='undefined'){bb='unspecified';}if(!this.isAdmin()){this.H=false;this.J.setCookie('disable',bb,ab);}};mboxFactory.prototype.enable=function(){this.H=true;this.J.deleteCookie('disable');};mboxFactory.prototype.isAdmin=function(){return document.location.href.indexOf('mboxEnv')!=-1;};mboxFactory.prototype.limitTraffic=function(cb,ab){};mboxFactory.prototype.addOnLoad=function(p){if(window.addEventListener){window.addEventListener('load',p,false);}else if(document.addEventListener){document.addEventListener('load',p,false);}else if(document.attachEvent){window.attachEvent('onload',p);}};mboxFactory.prototype.getEllapsedTime=function(){return this.V-this.U;};mboxFactory.prototype.getEllapsedTimeUntil=function(db){return db-this.U;};mboxFactory.prototype.getMboxes=function(){return this.F;};mboxFactory.prototype.get=function(_,eb){return this.F.get(_).getById(eb||0);};mboxFactory.prototype.update=function(_,c){if(!this.isEnabled()){return;}if(this.F.get(_).length()==0){throw"Mbox "+_+" is not defined";}this.F.get(_).each(function(X){X.getUrlBuilder().addParameter('mboxPage',mboxGenerateId());X.load(c);});};mboxFactory.prototype.create=function(_,c,fb){if(!this.isSupported()){return null;}var e=this.w.clone();e.addParameter('mboxCount',this.F.length()+1);e.addParameters(c);var eb=this.F.get(_).length();var gb=this.D+'-'+_+'-'+eb;var hb;if(fb){hb=new mboxLocatorNode(fb);}else{if(this.E){throw'The page has already been loaded, can\'t write marker';}hb=new mboxLocatorDefault(gb);}try{var W=this;var ib='mboxImported-'+gb;var X=new mbox(_,eb,e,hb,ib);if(this.H){X.setFetcher(this.E?new mboxAjaxFetcher():new mboxStandardFetcher());}X.setOnError(function(jb,n){X.setMessage(jb);X.activate();if(!X.isActivated()){W.disable(60*60,jb);window.location.reload(false);}});this.F.add(X);}catch(kb){this.disable();throw'Failed creating mbox "'+_+'", the error was: '+kb;}var lb=new Date();e.addParameter('mboxTime',lb.getTime()-(lb.getTimezoneOffset()*60000));return X;};mboxFactory.prototype.getCookieManager=function(){return this.J;};mboxFactory.prototype.getPageId=function(){return this.K;};mboxFactory.prototype.getPCId=function(){return this.S;};mboxFactory.prototype.getSessionId=function(){return this.R;};mboxFactory.prototype.getSignaler=function(){return this.Z;};mboxFactory.prototype.getUrlBuilder=function(){return this.w;};mboxFactory.prototype.T=function(e,I){e.addParameter('mboxHost',document.location.hostname).addParameter('mboxSession',this.R.getId());if(!I){e.addParameter('mboxFactoryId',this.D);}if(this.S.getId()!=null){e.addParameter('mboxPC',this.S.getId());}e.addParameter('mboxPage',this.K);e.addParameter('screenHeight',this.L);e.addParameter('screenWidth',this.M);e.addParameter('browserWidth',this.N);e.addParameter('browserHeight',this.O);e.addParameter('browserTimeOffset',this.Q);e.addParameter('colorDepth',this.P);e.setUrlProcessAction(function(e){e+='&mboxURL='+encodeURIComponent(document.location);var mb=encodeURIComponent(document.referrer);if(e.length+mb.length<2000){e+='&mboxReferrer='+mb;}e+='&mboxVersion='+mboxVersion;return e;});};mboxFactory.prototype.nb=function(){return"";};mboxFactory.prototype.Y=function(){document.write('<style>.'+'mboxDefault'+' { visibility:hidden; }</style>');};mboxFactory.prototype.isDomLoaded=function(){return this.E;};mboxSignaler=function(ob,J){this.J=J;var pb=J.getCookieNames('signal-');for(var j=0;j<pb.length;j++){var qb=pb[j];var rb=J.getCookie(qb).split('&');var X=ob(rb[0],rb);X.load();J.deleteCookie(qb);}};mboxSignaler.prototype.signal=function(sb,_){this.J.setCookie('signal-'+sb,mboxShiftArray(arguments).join('&'),45*60);};mboxList=function(){this.F=new Array();};mboxList.prototype.add=function(X){if(X!=null){this.F[this.F.length]=X;}};mboxList.prototype.get=function(_){var B=new mboxList();for(var j=0;j<this.F.length;j++){var X=this.F[j];if(X.getName()==_){B.add(X);}}return B;};mboxList.prototype.getById=function(tb){return this.F[tb];};mboxList.prototype.length=function(){return this.F.length;};mboxList.prototype.each=function(p){if(typeof p!='function'){throw'Action must be a function, was: '+typeof(p);}for(var j=0;j<this.F.length;j++){p(this.F[j]);}};mboxLocatorDefault=function(g){this.g='mboxMarker-'+g;document.write('<div id="'+this.g+'" style="visibility:hidden;display:none">&nbsp;</div>');};mboxLocatorDefault.prototype.locate=function(){var ub=document.getElementById(this.g);while(ub!=null){if(ub.nodeType==1){if(ub.className=='mboxDefault'){return ub;}}ub=ub.previousSibling;}return null;};mboxLocatorDefault.prototype.force=function(){var vb=document.createElement('div');vb.className='mboxDefault';var wb=document.getElementById(this.g);wb.parentNode.insertBefore(vb,wb);return vb;};mboxLocatorNode=function(xb){this.ub=xb;};mboxLocatorNode.prototype.locate=function(){return typeof this.ub=='string'?document.getElementById(this.ub):this.ub;};mboxLocatorNode.prototype.force=function(){return null;};mboxCreate=function(_){var X=mboxFactoryDefault.create(_,mboxShiftArray(arguments));if(X){X.load();}return X;};mboxDefine=function(fb,_){var X=mboxFactoryDefault.create(_,mboxShiftArray(mboxShiftArray(arguments)),fb);return X;};mboxUpdate=function(_){mboxFactoryDefault.update(_,mboxShiftArray(arguments));};mbox=function(g,yb,w,zb,ib){this.Ab=null;this.Bb=0;this.hb=zb;this.ib=ib;this.Cb=null;this.Db=new mboxOfferContent();this.vb=null;this.w=w;this.message='';this.Eb=new Object();this.Fb=0;this.yb=yb;this.g=g;this.Gb();w.addParameter('mbox',g).addParameter('mboxId',yb);this.Hb=function(){};this.Ib=function(){};this.Jb=null;};mbox.prototype.getId=function(){return this.yb;};mbox.prototype.Gb=function(){if(this.g.length>250){throw"Mbox Name "+this.g+" exceeds max length of "+"250 characters.";}else if(this.g.match(/^\s+|\s+$/g)){throw"Mbox Name "+this.g+" has leading/trailing whitespace(s).";}};mbox.prototype.getName=function(){return this.g;};mbox.prototype.getParameters=function(){var c=this.w.getParameters();var B=new Array();for(var j=0;j<c.length;j++){if(c[j].name.indexOf('mbox')!=0){B[B.length]=c[j].name+'='+c[j].value;}}return B;};mbox.prototype.setOnLoad=function(p){this.Ib=p;return this;};mbox.prototype.setMessage=function(jb){this.message=jb;return this;};mbox.prototype.setOnError=function(Hb){this.Hb=Hb;return this;};mbox.prototype.setFetcher=function(Kb){if(this.Cb){this.Cb.cancel();}this.Cb=Kb;return this;};mbox.prototype.getFetcher=function(){return this.Cb;};mbox.prototype.load=function(c){if(this.Cb==null){return this;}this.setEventTime("load.start");this.cancelTimeout();this.Bb=0;var w=(c&&c.length>0)?this.w.clone().addParameters(c):this.w;this.Cb.fetch(w);var W=this;this.Lb=setTimeout(function(){W.Hb('browser timeout',W.Cb.getType());},15000);this.setEventTime("load.end");return this;};mbox.prototype.loaded=function(){this.cancelTimeout();if(!this.activate()){var W=this;setTimeout(function(){W.loaded();},100);}};mbox.prototype.activate=function(){if(this.Bb){return this.Bb;}this.setEventTime('activate'+(++this.Fb)+'.start');if(this.show()){this.cancelTimeout();this.Bb=1;}this.setEventTime('activate'+this.Fb+'.end');return this.Bb;};mbox.prototype.isActivated=function(){return this.Bb;};mbox.prototype.setOffer=function(Db){if(Db&&Db.show&&Db.setOnLoad){this.Db=Db;}else{throw'Invalid offer';}return this;};mbox.prototype.getOffer=function(){return this.Db;};mbox.prototype.show=function(){this.setEventTime('show.start');var B=this.Db.show(this);this.setEventTime(B==1?"show.end.ok":"show.end");return B;};mbox.prototype.showContent=function(Mb){if(Mb==null){return 0;}if(this.vb==null||!this.vb.parentNode){this.vb=this.getDefaultDiv();if(this.vb==null){return 0;}}if(this.vb!=Mb){this.Nb(this.vb);this.vb.parentNode.replaceChild(Mb,this.vb);this.vb=Mb;}this.Ob(Mb);this.Ib();return 1;};mbox.prototype.hide=function(){this.setEventTime('hide.start');var B=this.showContent(this.getDefaultDiv());this.setEventTime(B==1?'hide.end.ok':'hide.end.fail');return B;};mbox.prototype.finalize=function(){this.setEventTime('finalize.start');this.cancelTimeout();if(this.getDefaultDiv()==null){if(this.hb.force()!=null){this.setMessage('No default content, an empty one has been added');}else{this.setMessage('Unable to locate mbox');}}if(!this.activate()){this.hide();this.setEventTime('finalize.end.hide');}this.setEventTime('finalize.end.ok');};mbox.prototype.cancelTimeout=function(){if(this.Lb){clearTimeout(this.Lb);}if(this.Cb!=null){this.Cb.cancel();}};mbox.prototype.getDiv=function(){return this.vb;};mbox.prototype.getDefaultDiv=function(){if(this.Jb==null){this.Jb=this.hb.locate();}return this.Jb;};mbox.prototype.setEventTime=function(Pb){this.Eb[Pb]=(new Date()).getTime();};mbox.prototype.getEventTimes=function(){return this.Eb;};mbox.prototype.getImportName=function(){return this.ib;};mbox.prototype.getURL=function(){return this.w.buildUrl();};mbox.prototype.getUrlBuilder=function(){return this.w;};mbox.prototype.Qb=function(vb){return vb.style.display!='none';};mbox.prototype.Ob=function(vb){this.Rb(vb,true);};mbox.prototype.Nb=function(vb){this.Rb(vb,false);};mbox.prototype.Rb=function(vb,Sb){vb.style.visibility=Sb?"visible":"hidden";vb.style.display=Sb?"block":"none";};mboxOfferContent=function(){this.Ib=function(){};};mboxOfferContent.prototype.show=function(X){var B=X.showContent(document.getElementById(X.getImportName()));if(B==1){this.Ib();}return B;};mboxOfferContent.prototype.setOnLoad=function(Ib){this.Ib=Ib;};mboxOfferAjax=function(Mb){this.Mb=Mb;this.Ib=function(){};};mboxOfferAjax.prototype.setOnLoad=function(Ib){this.Ib=Ib;};mboxOfferAjax.prototype.show=function(X){var Tb=document.createElement('div');Tb.id=X.getImportName();Tb.innerHTML=this.Mb;var B=X.showContent(Tb);if(B==1){this.Ib();}return B;};mboxOfferDefault=function(){this.Ib=function(){};};mboxOfferDefault.prototype.setOnLoad=function(Ib){this.Ib=Ib;};mboxOfferDefault.prototype.show=function(X){var B=X.hide();if(B==1){this.Ib();}return B;};mboxCookieManager=function mboxCookieManager(g,Ub){this.g=g;this.Ub=Ub==''||Ub.indexOf('.')==-1?'':'; domain='+Ub;this.Vb=new mboxMap();this.loadCookies();};mboxCookieManager.prototype.isEnabled=function(){this.setCookie('check','true',60);this.loadCookies();return this.getCookie('check')=='true';};mboxCookieManager.prototype.setCookie=function(g,h,ab){if(typeof g!='undefined'&&typeof h!='undefined'&&typeof ab!='undefined'){var Wb=new Object();Wb.name=g;Wb.value=escape(h);Wb.expireOn=Math.ceil(ab+new Date().getTime()/1000);this.Vb.put(g,Wb);this.saveCookies();}};mboxCookieManager.prototype.getCookie=function(g){var Wb=this.Vb.get(g);return Wb?unescape(Wb.value):null;};mboxCookieManager.prototype.deleteCookie=function(g){this.Vb.remove(g);this.saveCookies();};mboxCookieManager.prototype.getCookieNames=function(Xb){var Yb=new Array();this.Vb.each(function(g,Wb){if(g.indexOf(Xb)==0){Yb[Yb.length]=g;}});return Yb;};mboxCookieManager.prototype.saveCookies=function(){var Zb=new Array();var _b=0;this.Vb.each(function(g,Wb){Zb[Zb.length]=g+'#'+Wb.value+'#'+Wb.expireOn;if(_b<Wb.expireOn){_b=Wb.expireOn;}});var ac=new Date(_b*1000);document.cookie=this.g+'='+Zb.join('|')+'; expires='+ac.toGMTString()+'; path=/'+this.Ub;};mboxCookieManager.prototype.loadCookies=function(){this.Vb=new mboxMap();var bc=document.cookie.indexOf(this.g+'=');if(bc!=-1){var cc=document.cookie.indexOf(';',bc);if(cc==-1){cc=document.cookie.indexOf(',',bc);if(cc==-1){cc=document.cookie.length;}}var dc=document.cookie.substring(bc+this.g.length+1,cc).split('|');var ec=Math.ceil(new Date().getTime()/1000);for(var j=0;j<dc.length;j++){var Wb=dc[j].split('#');if(ec<=Wb[2]){var fc=new Object();fc.name=Wb[0];fc.value=Wb[1];fc.expireOn=Wb[2];this.Vb.put(fc.name,fc);}}}};mboxSession=function(gc,hc,qb,ic,J){this.hc=hc;this.qb=qb;this.ic=ic;this.J=J;this.jc=false;this.yb=typeof mboxForceSessionId!='undefined'?mboxForceSessionId:mboxGetPageParameter(this.hc);if(this.yb==null||this.yb.length==0){this.yb=J.getCookie(qb);if(this.yb==null||this.yb.length==0){this.yb=gc;this.jc=true;}}J.setCookie(qb,this.yb,ic);};mboxSession.prototype.getId=function(){return this.yb;};mboxSession.prototype.forceId=function(kc){this.yb=kc;this.J.setCookie(this.qb,this.yb,this.ic);};mboxPC=function(qb,ic,J){this.qb=qb;this.ic=ic;this.J=J;this.yb=typeof mboxForcePCId!='undefined'?mboxForcePCId:J.getCookie(qb);if(this.yb!=null){J.setCookie(qb,this.yb,ic);}};mboxPC.prototype.getId=function(){return this.yb;};mboxPC.prototype.forceId=function(kc){if(this.yb!=kc){this.yb=kc;this.J.setCookie(this.qb,this.yb,this.ic);return true;}return false;};mboxGetPageParameter=function(g){var B=null;var lc=new RegExp(g+"=([^\&]*)");var mc=lc.exec(document.location);if(mc!=null&&mc.length>=2){B=mc[1];}return B;};mboxSetCookie=function(g,h,ab){return mboxFactoryDefault.getCookieManager().setCookie(g,h,ab);};mboxGetCookie=function(g){return mboxFactoryDefault.getCookieManager().getCookie(g);};mboxCookiePageDomain=function(){var Ub=(/([^:]*)(:[0-9]{0,5})?/).exec(document.location.host)[1];var nc=/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/;if(!nc.exec(Ub)){var oc=(/([^\.]+\.[^\.]{3}|[^\.]+\.[^\.]+\.[^\.]{2})$/).exec(Ub);if(oc){Ub=oc[0];}}return Ub?Ub:"";};mboxShiftArray=function(pc){var B=new Array();for(var j=1;j<pc.length;j++){B[B.length]=pc[j];}return B;};mboxGenerateId=function(){return(new Date()).getTime()+"-"+Math.floor(Math.random()*999999);};mboxScreenHeight=function(){return screen.height;};mboxScreenWidth=function(){return screen.width;};mboxBrowserWidth=function(){return(window.innerWidth)?window.innerWidth:document.documentElement?document.documentElement.clientWidth:document.body.clientWidth;};mboxBrowserHeight=function(){return(window.innerHeight)?window.innerHeight:document.documentElement?document.documentElement.clientHeight:document.body.clientHeight;};mboxBrowserTimeOffset=function(){return-new Date().getTimezoneOffset();};mboxScreenColorDepth=function(){return screen.pixelDepth;};try{if(typeof mboxVersion=='undefined'){var mboxVersion=39;var mboxFactories=new mboxMap();var mboxFactoryDefault=new mboxFactory('mtvnetworks.tt.omtrdc.net','mtvnetworks','default');};if(mboxGetPageParameter("mboxDebug")!=null||mboxFactoryDefault.getCookieManager().getCookie("debug")!=null){setTimeout(function(){if(typeof mboxDebugLoaded=='undefined'){alert('Could not load the remote debug.\nPlease check your connection'+' to Test&amp;Target servers');}},60*60);document.write('<'+'scr'+'ipt language="Javascript1.2" src='+'"https://web.archive.org/web/20110912044651/http://admin5.testandtarget.omniture.com/admin/mbox/mbox_debug.jsp?mboxServerHost=mtvnetworks.tt.omtrdc.net'+'&clientCode=mtvnetworks"><'+'\/scr'+'ipt>');};}catch(e){};mboxScPluginFetcher=function(b,qc){this.b=b;this.qc=qc;};mboxScPluginFetcher.prototype.rc=function(w){w.setBasePath('/m2/'+this.b+'/sc/standard');this.sc(w);var e=w.buildUrl();e+='&scPluginVersion=1';return e;};mboxScPluginFetcher.prototype.sc=function(w){var tc=["dynamicVariablePrefix","visitorID","vmk","ppu","charSet","visitorNamespace","cookieDomainPeriods","cookieLifetime","pageName","currencyCode","variableProvider","channel","server","pageType","transactionID","purchaseID","campaign","state","zip","events","products","linkName","linkType","resolution","colorDepth","javascriptVersion","javaEnabled","cookiesEnabled","browserWidth","browserHeight","connectionType","homepage","pe","pev1","pev2","pev3","visitorSampling","visitorSamplingGroup","dynamicAccountSelection","dynamicAccountList","dynamicAccountMatch","trackDownloadLinks","trackExternalLinks","trackInlineStats","linkLeaveQueryString","linkDownloadFileTypes","linkExternalFilters","linkInternalFilters","linkTrackVars","linkTrackEvents","linkNames","lnk","eo"];for(var j=0;j<tc.length;j++){this.uc(tc[j],w);}for(var j=1;j<=50;j++){this.uc('prop'+j,w);this.uc('eVar'+j,w);this.uc('hier'+j,w);}};mboxScPluginFetcher.prototype.uc=function(g,w){var h=this.qc[g];if(typeof(h)==='undefined'||h===null||h===''){return;}w.addParameter(g,h);};mboxScPluginFetcher.prototype.cancel=function(){};mboxStandardScPluginFetcher=function(b,qc){mboxScPluginFetcher.call(this,b,qc);};mboxStandardScPluginFetcher.prototype=new mboxScPluginFetcher;mboxStandardScPluginFetcher.prototype.getType=function(){return'standard';};mboxStandardScPluginFetcher.prototype.fetch=function(w){w.setServerType(this.getType());var e=this.rc(w);document.write('<'+'scr'+'ipt src="'+e+'" language="JavaScript"><'+'\/scr'+'ipt>');};mboxAjaxScPluginFetcher=function(b,qc){mboxScPluginFetcher.call(this,b,qc);};mboxAjaxScPluginFetcher.prototype=new mboxScPluginFetcher;mboxAjaxScPluginFetcher.prototype.fetch=function(w){w.setServerType(this.getType());var e=this.rc(w);this.x=document.createElement('script');this.x.src=e;document.body.appendChild(this.x);};mboxAjaxScPluginFetcher.prototype.getType=function(){return'ajax';};function mboxLoadSCPlugin(qc){if(!qc){return null;}qc.m_tt=function(qc){var vc=qc.m_i('tt');vc.H=true;vc.b='mtvnetworks';vc['_t']=function(){if(!this.isEnabled()){return;}var X=this.xc();if(X){var Kb=mboxFactoryDefault.isDomLoaded()?new mboxAjaxScPluginFetcher(this.b,this.s):new mboxStandardScPluginFetcher(this.b,this.s);X.setFetcher(Kb);X.load();}};vc.isEnabled=function(){return this.H&&mboxFactoryDefault.isEnabled();};vc.xc=function(){var _=this.yc();var vb=document.createElement('DIV');return mboxFactoryDefault.create(_,new Array(),vb);};vc.yc=function(){var zc=this.s.events&&this.s.events.indexOf('purchase')!=-1;return'SiteCatalyst: '+(zc?'purchase':'event');};};return qc.loadModule('tt');};mtvn.btg.reporting.omniture.Hcode=s_gi("");if(typeof mtvn.btg.reporting.omniture.Hcode==="object")
{mtvn.btg.reporting.omniture.Hcode.setAccount=function(account){this.un=account;};}
if(typeof mtvn.btg.reporting.omniture.Hcode==="object"){mtvn.btg.reporting.omniture.Hcode.getNewRepeat=new Function(""
+"var s=this,e=new Date(),cval,ct=e.getTime(),y=e.getYear();e.setTime"
+"(ct+30*24*60*60*1000);cval=s.c_r('s_nr');if(cval.length==0){s.c_w("
+"'s_nr',ct,e);return 'New';}if(cval.length!=0&&ct-cval<30*60*1000){s"
+".c_w('s_nr',ct,e);return 'New';}if(cval<1123916400001){e.setTime(cv"
+"al+30*24*60*60*1000);s.c_w('s_nr',ct,e);return 'Repeat';}else retur"
+"n 'Repeat';");}
if(typeof mtvn.btg.reporting.omniture.Hcode==="object"){mtvn.btg.reporting.omniture.Hcode.getTimeParting=new Function("t","z",""
+"var s=this,cy;dc=new Date('1/1/2000');"
+"if(dc.getDay()!=6||dc.getMonth()!=0){return'Data Not Available'}"
+"else{;z=parseFloat(z);var dsts=new Date(s.dstStart);"
+"var dste=new Date(s.dstEnd);fl=dste;cd=new Date();if(cd>dsts&&cd<fl)"
+"{z=z+1}else{z=z};utc=cd.getTime()+(cd.getTimezoneOffset()*60000);"
+"tz=new Date(utc + (3600000*z));thisy=tz.getFullYear();"
+"var days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday',"
+"'Saturday'];if(thisy!=s.currentYear){return'Data Not Available'}else{;"
+"thish=tz.getHours();thismin=tz.getMinutes();thisd=tz.getDay();"
+"var dow=days[thisd];var ap='AM';var dt='Weekday';var mint='00';"
+"if(thismin>30){mint='30'}if(thish>=12){ap='PM';thish=thish-12};"
+"if (thish==0){thish=12};if(thisd==6||thisd==0){dt='Weekend'};"
+"var timestring=thish+':'+mint+ap;if(t=='h'){return timestring}"
+"if(t=='d'){return dow};if(t=='w'){return dt}}};");mtvn.btg.reporting.omniture.Hcode.dstStart="03/14/2010";mtvn.btg.reporting.omniture.Hcode.dstEnd="11/07/2010";mtvn.btg.reporting.omniture.Hcode.currentYear=(new Date()).getFullYear();}
if(typeof mtvn.btg.reporting.omniture.Hcode==="object"){mtvn.btg.reporting.omniture.Hcode.getValOnce=new Function("v","c","e",""
+"var s=this,k=s.c_r(c),a=new Date;e=e?e:0;if(v){a.setTime(a.getTime("
+")+e*86400000);s.c_w(c,v,e?a:0);}return v==k?'':v");}
if(typeof mtvn.btg.reporting.omniture.Hcode==="object"){mtvn.btg.reporting.omniture.Hcode.getPreviousValue=new Function("v","c","el",""
+"var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
+"){if(s.events){i=split(el,',');j=split(s.events,',');for(x in i"
+"){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
+":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
+"s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");var split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");}
if(typeof mtvn.btg.reporting.omniture.Hcode==="object"){mtvn.btg.reporting.omniture.Hcode.getPercentPageViewed=new Function("",""
+"var s=this;if(typeof(s.linkType)=='undefined'||s.linkType=='e'){var"+" v=s.c_r('s_ppv');s.c_w('s_ppv',0);return v;}");mtvn.btg.reporting.omniture.Hcode.getPPVCalc=new Function("",""
+"var s=s_c_il["+mtvn.btg.reporting.omniture.Hcode._in+"],dh=Math.max(Math.max(s.d.body.scrollHeight,"
+"s.d.documentElement.scrollHeight),Math.max(s.d.body.offsetHeight,s."
+"d.documentElement.offsetHeight),Math.max(s.d.body.clientHeight,s.d."
+"documentElement.clientHeight)),vph=s.wd.innerHeight||(s.d.documentE"
+"lement.clientHeight||s.d.body.clientHeight),st=s.wd.pageYOffset||(s"
+".wd.document.documentElement.scrollTop||s.wd.document.body.scrollTo"
+"p),vh=st+vph,pv=Math.round(vh/dh*100),cp=s.c_r('s_ppv');if(pv>100){"+"s.c_w('s_ppv','');}else if(pv>cp){s.c_w('s_ppv',pv);}");mtvn.btg.reporting.omniture.Hcode.getPPVSetup=new Function("",""
+"var s=this;if(s.wd.addEventListener){s.wd.addEventListener('load',s"+".getPPVCalc,false);s.wd.addEventListener('scroll',s.getPPVCalc,fals"+"e);s.wd.addEventListener('resize',s.getPPVCalc,false);}else if(s.wd"
+".attachEvent){s.wd.attachEvent('onload',s.getPPVCalc);s.wd.attachEv"+"ent('onscroll',s.getPPVCalc);s.wd.attachEvent('onresize',s.getPPVCa"+"lc);}");mtvn.btg.reporting.omniture.Hcode.getPPVSetup();}
if(typeof mtvn.btg.reporting.omniture.Hcode==="object"){mtvn.btg.reporting.omniture.Hcode.getQueryParam=new Function("p","d","u",""
+"var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
+"on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
+".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-"
+"1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i="
+"=p.length?i:i+1)}return v");mtvn.btg.reporting.omniture.Hcode.p_gpv=new Function("k","u",""
+"var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
+"=s.pt(q,'&','p_gvf',k)}return v");mtvn.btg.reporting.omniture.Hcode.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"epa(v)}return ''");}
if(typeof mtvn.btg.reporting.omniture.Hcode==="object"){mtvn.btg.reporting.omniture.Hcode.trackTNT=function(v,p,b){var s=this,n="s_tnt",p=(p)?p:n,v=(v)?v:n,r="",pm=false,b=(b)?b:true;if(s.getQueryParam)
pm=s.getQueryParam(p);if(pm)
r+=(pm+",");if(s.wd[v]!=undefined)
r+=s.wd[v];if(b)
s.wd[v]="";return r;}}
mtvn.btg.ads.AdManager=new function(){var _btgU=mtvn.btg.util;var _btgObj=_btgU.Object;var _btgIsStr=_btgU.String.isDefined;var _btgIsConfig=_btgObj.isConfigDefined;var _btgStrpFileExt=_btgU.String.stripFileExtension;var _btgRnd=_btgU.Math.random;var _btgAds=mtvn.btg.ads;var _btgDc=_btgAds.doubleclick;var _btgGv=mtvn.btg.globalvars;var hasDoubleClickAd=false;var hasFreeWheel=false;var hasInternationalAd=false;var hasQuantCast=false;var allReloadableAds=false;var reloadInterval=30000;var minReloadInterval=10000;var config;var ads=[];this.groupedReloadableAdsTotal=0;this.groupedReloadableAdsCounter=0;var data={};var counter=0;this.reloadableAds={};this.init=function(){config=mtvn.btg.config.AdSettings;if(config.reloadableAds&&config.reloadableAds===true)allReloadableAds=true;if(config.reloadInterval&&!isNaN(parseInt(config.reloadInterval))){config.reloadInterval=parseInt(config.reloadInterval);if(config.reloadInterval>=minReloadInterval){reloadInterval=config.reloadInterval;}}
var qc_obj={};if(_btgIsConfig(config.DoubleClick)){if(config.DoubleClick.type&&config.DoubleClick.type.toLowerCase()=="international"){config.International={};_btgObj.copyProperties(config.DoubleClick,config.International);}
else if(config.DoubleClick.type&&config.DoubleClick.type.toLowerCase()=="domestic"){config.International={};}
hasDoubleClickAd=true;if(_btgIsStr(config.DoubleClick.sections)){config.DoubleClick.sections=_btgStrpFileExt(config.DoubleClick.sections);qc_obj.sections=config.DoubleClick.sections;}
else{this.setDefaultSections();if(_btgIsStr(data.sections))
qc_obj.sections=data.sections;}
qc_obj.dartSite=config.DoubleClick.dartSite;data.tile=0;data.ord=_btgRnd(100000000000000000,999999999999999999);}
if(_btgIsConfig(config.FreeWheel)){hasFreeWheel=true;}
if(_btgIsConfig(config.International)){hasInternationalAd=true;if(_btgIsStr(config.International.sections)){config.International.sections=_btgStrpFileExt(config.International.sections);qc_obj.sections=config.International.sections;}
else{this.setDefaultSections();if(_btgIsStr(data.sections))
qc_obj.sections=data.sections;}
qc_obj.dartSite=config.International.dartSite;data.tile=0;data.ord=_btgRnd(100000000000000000,999999999999999999);}
if(_btgIsConfig(config.QuantCast)){hasQuantCast=true;}
if(hasQuantCast){PlatoAd=new _btgDc.DomesticDc(config.DoubleClick);dmobj={size:'728x90',contentType:"adj"};dmobj.sections=qc_obj.sections;if(_btgIsStr(config.QuantCast.vertical)){PlatoAd.setKeyValues("vertical="+config.QuantCast.vertical);};PlatoAd.init(dmobj);PlatoAd.getUrl();mtvn.btg.reporting.QuantCast.Ads.setLabels(qc_obj,PlatoAd.getSections());}};this.placeAd=function(a_data){if(typeof(_btgGv.IS_CODA_ADS_USED)!='undefined'&&_btgGv.IS_CODA_ADS_USED==false)
_btgGv.IS_CODA_ADS_USED=true;var ad=this.getAd(a_data);if(a_data.isReloadable===true||(allReloadableAds&&a_data.isReloadable!==false)){if(ad.setContentType){ad.setContentType("adi");}
ad.reloadInterval=reloadInterval;if(a_data.reloadInterval&&!isNaN(parseInt(a_data.reloadInterval))){ad.needUniqueOrd=true;a_data.reloadInterval=parseInt(a_data.reloadInterval);if(a_data.reloadInterval>=minReloadInterval){ad.reloadInterval=a_data.reloadInterval;}}
else{this.groupedReloadableAdsTotal++;this.groupedReloadableAdsCounter++;}
var tmpFunc=function(){mtvn.btg.ads.AdManager.reloadAd(ad);};if(ad.reloadTimer){clearInterval(ad.reloadTimer);ad.reloadTimer=null;}
ad.reloadTimer=setInterval(tmpFunc,ad.reloadInterval);}
if(ad!=null){return ad.placeAd(a_data);}
else{document.write("[ERROR: Ad not created, please check your config to enable CODA ads]");return null;}};this.adLoadNotify=function(a_adId){if(typeof _btgU.Events['adLoaded']!='undefined'){_btgU.Events['adLoaded'].fire(a_adId);}};this.setAdReloadOrdByGroup=function(a_adObj){if(a_adObj.needUniqueOrd===true){a_adObj.setOrd(_btgRnd(100000000000000000,999999999999999999));}
else{if((this.groupedReloadableAdsCounter>=this.groupedReloadableAdsTotal)&&(this.groupedReloadableAdsCounter%this.groupedReloadableAdsTotal==0)){data.ord=_btgRnd(100000000000000000,999999999999999999);}
a_adObj.setOrd(data.ord);this.groupedReloadableAdsCounter++;}};this.reloadAd=function(a_adObj){var _btgIsObj=_btgObj.isDefined;if(_btgIsObj(a_adObj)&&_btgIsStr(a_adObj.id)&&_btgIsObj(self.frames[a_adObj.id])){a_adObj.setContentType("adi");this.setAdReloadOrdByGroup(a_adObj);try{self.frames[a_adObj.id].location.replace(a_adObj.getUrl());}catch(e){}}};this.placeIFrameAd=function(adHtml,a_data){if(typeof(_btgGv.IS_CODA_ADS_USED)!='undefined')
_btgGv.IS_CODA_ADS_USED=true;var containerId="container"+a_data.reloadableAdId;this.reloadableAds[a_data.reloadableAdId]={data:a_data};document.write('<iframe allowtransparency="true" name="'+containerId+'" id="'+containerId+'" src="'+adHtml+'?'+a_data.reloadableAdId+'" width='+a_data.size.split('x')[0]+' height='+a_data.size.split('x')[1]+' marginwidth=0 marginheight=0 frameborder=0 scrolling="no"></iframe>');}
this.getData=function(){return data;};this.setDefaultSections=function(a_defaultSections){var sections=(_btgIsStr(a_defaultSections)?a_defaultSections:_btgU.Sections.getAdSections());if(_btgIsStr(sections)){data.sections=_btgStrpFileExt(sections);}};this.getAd=function(a_data){var ad;if(hasInternationalAd){ad=new _btgDc.InternationalDc(config.International);data.tile++;a_data=this.setReloadableAdData(a_data);if(_btgIsStr(a_data.sections)){a_data.sections=_btgStrpFileExt(a_data.sections);}
_btgObj.copyProperties(data,a_data);ad.init(a_data);ads.push(ad);}
else if(hasFreeWheel){ad=new _btgAds.freewheel.FreeWheelAd(config);data.tile++;a_data=this.setReloadableAdData(a_data);if(_btgIsStr(a_data.sections)){a_data.sections=_btgStrpFileExt(a_data.sections);}
_btgObj.copyProperties(data,a_data);ad.init(a_data);ads.push(ad);}
else if(hasDoubleClickAd){ad=new _btgDc.DomesticDc(config.DoubleClick);data.tile++;a_data=this.setReloadableAdData(a_data);if(_btgIsStr(a_data.sections)){a_data.sections=_btgStrpFileExt(a_data.sections);}
_btgObj.copyProperties(data,a_data);ad.init(a_data);ads.push(ad);}else{document.write("<!-- [ERROR: Ads not enabled. Please check your config or placeAd() method call!] -->");return null;}
return ad;};this.getAdUrl=function(a_data){return this.getAd(a_data).getUrl();};this.setReloadableAdData=function(a_data)
{if(_btgIsStr(a_data.reloadableAdId)&&_btgIsStr(this.reloadableAds[a_data.reloadableAdId])){++counter;a_data.ord=data.ord=(_btgIsStr(this.reloadableAds[a_data.reloadableAdId].tile)&&this.hasReloadComplete()?_btgRnd(100000000000000000,999999999999999999):data.ord);a_data.tile=data.tile=this.reloadableAds[a_data.reloadableAdId].tile=(_btgIsStr(this.reloadableAds[a_data.reloadableAdId].tile)?this.reloadableAds[a_data.reloadableAdId].tile:data.tile);}
if(_btgIsStr(a_data.loadOrder))
a_data.tile=a_data.loadOrder;return a_data;}
this.hasReloadComplete=function(){var totAdCount=0;for(var i in this.reloadableAds)
totAdCount++;if(counter>totAdCount){counter=1;return true;}
return false;}};mtvn.btg.ads.doubleclick.DoubleClick=function(config){this.btgAds=mtvn.btg.ads;this.btgU=mtvn.btg.util;this.btgStr=this.btgU.String;this.btgCfg=mtvn.btg.config;this.isStr=this.btgStr.isDefined;this.isObj=this.btgU.Object.isDefined;this.gv=mtvn.btg.globalvars;if(this.isObj(config)){this.config=config;}
this.id;this.server="ad.doubleclick.net";this.ssl=false;this.dartSite;this.contentType="adj";this.mediaType="standard";this.sections;this.keyValues="";this.reloadTimer;this.size;this.realSize;this.zoneOverride=null;this.tile;this.positionThreshold;this.ord;this.additionalKeyValues=[];this.position;this.partner;this.exclusions=[];this.reservedKeyValues={};if(this.isObj(config)){this.autoDcopt=(config.autoDcopt)?true:false;}
if(this.isObj(this.btgAds.AdManager)&&!this.btgAds.AdManager.dcoptOn){this.btgAds.AdManager.dcoptOn=false;}
this.isDevEnv=false;if(this.gv.IS_TOP_ACCESSIBLE&&top.location.hostname.indexOf("mtvi.com")>-1){this.isDevEnv=true;}
if(this.isObj(config)){for(var i in config){if(this.isStr(config[i])&&(typeof(config[i])=='string'||typeof(config[i])=='number')){if(i=="sections"){this.setSections(config[i]);}
else if(i=="keyValues"){this.setKeyValues(config[i]);}
else if(i=="positionThreshold"){this.setPositionThreshold(config[i]);}
else{this[i]=config[i];}}}}};mtvn.btg.ads.doubleclick.DoubleClick.prototype={formatUrl:function(values){var retVal="";var zoneToCheck=values.dartSite+"/"+values.zone+";";if(zoneToCheck.length>64){var cutPoint=values.zone.length-(zoneToCheck.length-64);values.zone=values.zone.substring(0,cutPoint);}
var target=[values.protocol+values.server,values.contentType,values.dartSite,values.zone];var url=target.join("/");var vals=[url,values.sections];if(this.isStr(values.keyValues)){vals.push(values.keyValues);}
if(this.isStr(values.uValues)){vals.push(values.uValues);}
if(values.ord>0){vals.push('ord='+values.ord+"?");}
retVal=vals.join(";");return retVal;},setKeyValues:function(str){str=str.replace(/[^\w=!;|-]/g,"_");this.keyValues=str.replace(/^;+|;+$/g,'');if(this.keyValues.indexOf("mtype=")>-1){this.setMediaType(this.getKeyValue("mtype="));}
if(this.keyValues.indexOf("pos=")>-1){this.setPosition(this.getKeyValue("pos="));}else if(this.keyValues.indexOf("threshold=")>-1){this.setPositionThreshold(this.getKeyValue("threshold="));}},setZoneOverride:function(str){this.zoneOverride=str;},setId:function(str){this.id=str;},setServer:function(str){this.server=str;},setSsl:function(){this.ssl=true;},setDartSite:function(str){this.dartSite=str;},setContentType:function(str){this.contentType=str;},setMediaType:function(str){this.mediaType=str;},setPosition:function(str){this.position=str;},setSections:function(str){str=(str=='/')?str:this.btgStr.charTrim(str,'/');var difn=(this.isObj(this.btgCfg.AdSettings)&&this.isStr(this.btgCfg.AdSettings.defaultIndexFileName))?this.btgCfg.AdSettings.defaultIndexFileName:"index";difn=this.btgStr.stripFileExtension(difn);var hpCases=['/',difn,"home/"+difn];for(var i=0,len=hpCases.length;i<len;i++){if(str.indexOf(hpCases[i])==0&&str.length==hpCases[i].length){str=str.replace(hpCases[i],'_hp');break;}}
str=str.replace(/[^\/\w=!;|-]/g,"_");while(str.match(/\/\d/)){str=str.replace(/\/\d/,RegExp.lastMatch.substring(0,1)+"_"+RegExp.lastMatch.substring(1,2));}
str=str.replace(/^\d/,"_"+str.match(/^\d/,"_"));this.sections=str.replace(/^\/+|\/+$/g,'');if(this.sections.indexOf('.')>-1){this.sections=this.sections.split('.')[0];}},setSize:function(str){this.size=str;},setRealSize:function(str){this.realSize=str;},setTile:function(num){this.tile=num;},setPositionThreshold:function(num){if(isNaN(parseInt(num))){this.positionThreshold=null;}else{this.positionThreshold=parseInt(num);}},setOrd:function(num){this.ord=num;},setPartner:function(str){this.partner=str;},addExclusionCategory:function(str){str=str.replace(/^;+|;+$/g,'');var isExists=false;if(this.exclusions.length>0){for(var i=0,len=this.exclusions.length;i<len;i++)
if(this.exclusions[i].match(new RegExp("category="+str,"ig"))){isExists=true;break;}
if(!isExists)
this.exclusions.push('!category='+str);}
else
this.exclusions.push('!category='+str);},addKeyValues:function(str){if(this.isStr(str)&&str.indexOf('=')>-1){this.additionalKeyValues.push(str);}},appendKeyValue:function(str1,str2){if(!this.isStr(str1))str1="";if(!this.isStr(str2))str2="";str1=str1.replace(/^;+|;+$/g,'');str2=str2.replace(/^;+|;+$/g,'');if(str1.indexOf('=')>-1)str2+=";"+str1;str2=str2.replace(/^;+|;+$/g,'');return str2;},removeKeyValue:function(a_key){if(this.isStr(this.getKeyValue(a_key))){var strToRemove=";"+a_key+this.getKeyValue(a_key);if(this.keyValues.indexOf(strToRemove)==-1){strToRemove=a_key+this.getKeyValue(a_key)+";";if(this.keyValues.indexOf(strToRemove)==-1){strToRemove=a_key+this.getKeyValue(a_key);}}
var re=new RegExp(strToRemove,"g");this.keyValues=this.keyValues.replace(re,"");this.removeKeyValue(a_key);}},getProtocol:function(){return this.ssl?'https://':'http://';},getPosition:function(){var placement="unk";if(this.isStr(this.position)){if(this.position.indexOf("atf")>-1){placement="atf";}else if(this.position.indexOf("btf")>-1){placement="btf";}}else{if(this.isStr(this.positionThreshold)){placement=(this.tile<=this.positionThreshold)?"atf":"btf";}}
return placement;},getKeyValue:function(key){var value;if(this.keyValues.indexOf(key)>-1){var temp=this.keyValues.split(key);if(temp.length>0){if(temp[1].indexOf(";")>-1){value=temp[1].substring(0,temp[1].indexOf(";"));}else{value=temp[1];}}}
return value;},getSections:function(){return this.sections;},getContentTypeAbbreviation:function(){var abbr="";if(this.contentType=="pfadx")abbr="p";if(this.contentType=="adj")abbr="j";if(this.contentType=="adi")abbr="i";if(this.contentType=="adx")abbr="x";if(this.contentType=="ad")abbr="a";return abbr;},getExclusions:function(){return this.exclusions.join(';');},isValidDcopt:function(a_val){var retVal=false;if(this.isStr(a_val)){for(var i=0,len=this.gv.VALID_DCOPT.length;i<len;i++){if(a_val==this.gv.VALID_DCOPT[i]){retVal=true;break;}}}
return retVal;},formatReserved:function(){var keyvals=this.keyValues;var reserved=["dcmt","dcopt","dcove"];for(var i=0,len=reserved.length;i<len;i++){if(keyvals.indexOf(reserved[i]+"=")>-1){var key=this.getKeyValue(reserved[i]+"=");var tempKeys=keyvals.split(reserved[i]+"="+key);for(var x=0,len=tempKeys.length;x<len;x++){tempKeys[x]=tempKeys[x].replace(/^;+|;+$/g,'');}
if(reserved[i]=="dcopt"&&this.isValidDcopt(key)!=true){this.keyValues=tempKeys.join(';');return this.formatReserved();}
this.reservedKeyValues[reserved[i]]=key;keyvals=tempKeys.join(';');}}
if(keyvals.lastIndexOf(";")==keyvals.length-1){keyvals=keyvals.substring(0,keyvals.length-1);}
return keyvals;},getAdditionalKeyValues:function(){return this.additionalKeyValues.join(';');},applyTestbedValues:function(){var atbCookie=mtvn.btg.util.Cookie.read("btg_atb");if(atbCookie!=null&&atbCookie.indexOf("daDart:")>=0){var daDartVal=atbCookie.split(',')[0].split(":")[1];this.dartSite=(daDartVal=="auto")?this.dartSite="atb_"+this.dartSite:daDartVal;}},getValues:function(){this.applyTestbedValues();var zone=this.isStr(this.zoneOverride)?this.zoneOverride:this.formatZone();var keyVals=this.formatKeyValues();var secVals=this.formatSectionValues();var uVals=this.formatUValues(keyVals);if(uVals!=""){uVals="u="+uVals;}
return{id:this.id,protocol:this.getProtocol(),server:this.server,dartSite:this.dartSite,contentType:this.contentType,mediaType:this.mediaType,zone:zone,sections:secVals,keyValues:keyVals,uValues:uVals,ord:this.ord};},getRealWidth:function(){return this.realSize.substr(0,this.realSize.indexOf("x"));},getRealHeight:function(){return this.realSize.substr(this.realSize.indexOf("x")+1,this.realSize.length);},getWidth:function(){return this.size.substr(0,this.size.indexOf("x"));},getHeight:function(){return this.size.substr(this.size.indexOf("x")+1,this.size.length);},getUrl:function(){return this.formatUrl(this.getValues());},getJson:function(){var values=this.getValues();values.url=this.formatUrl(values);return values;},getXml:function(){var xml=[];var values=this.getValues();values.url=this.formatUrl(values);for(var i in values){if(typeof(values[i]=='string')){xml.push('<'+i+'>'+'</'+values[i]+'>');}}
return'<DoubleClick>'+xml.join('')+'</DoubleClick>';},init:function(data){if(typeof(data)==='object'){if(this.isStr(data.zoneOverride))this.setZoneOverride(data.zoneOverride);if(this.isStr(data.id))this.setId(data.id);if(this.isStr(data.server))this.setServer(data.server);if(this.isStr(data.ssl))this.setSsl(data.ssl);if(this.isStr(data.dartSite))this.setDartSite(data.dartSite);if(this.isStr(data.contentType))this.setContentType(data.contentType);if(this.isStr(data.mediaType))this.setMediaType(data.mediaType);if(this.isStr(data.position))this.setPosition(data.position);if(this.isStr(data.sections))this.setSections(data.sections);if(this.isStr(data.keyValues))this.setKeyValues(data.keyValues);if(this.isStr(data.size)){this.setSize(data.size);}
else{this.setSize("[ERROR: Size Not Defined!]");}
if(this.isStr(data.realSize)){this.setRealSize(data.realSize);}
else{this.setRealSize(this.size);}
if(this.isStr(data.tile))this.setTile(data.tile);if(this.isStr(data.positionThreshold))this.setPositionThreshold(data.positionThreshold);if(this.isStr(data.ord))this.setOrd(data.ord);if(this.isStr(data.partner))this.setPartner(data.partner);}}};mtvn.btg.ads.doubleclick.DomesticDc=function(config){this.type="DomesticDc";};mtvn.btg.ads.doubleclick.DomesticDc.prototype={formatSectionValues:function(){try{var parts=this.sections.split('/');}catch(e){parts=["[ERROR: Sections Not Defined!]"];}
var count=0;var sections=[];for(var x=0,len=parts.length;x<len;x++){if(mtvn.btg.util.String.isDefined(parts[x])){sections.push('sec'+count+'='+parts[x]);count++;}}
return sections.join(';');},formatZone:function(){var posTypeTag=this.getPosition()+'_'+this.getContentTypeAbbreviation()+'_'+this.mediaType.substr(0,1);var zoneValues=posTypeTag+"/";var secValues=this.getSections();if(this.isStr(this.keyValues)){if(this.keyValues.indexOf("partner=")>-1){var partner=this.getKeyValue("partner=");if(this.isStr(partner)&&partner!="null"){zoneValues+=partner+"/";this.addExclusionCategory(partner);this.addExclusionCategory("partner");}else{this.keyValues=this.keyValues.replace(/(partner=;)|partner=$/ig,"partner=null;");}}
if(this.keyValues.indexOf("vertical=")>-1){var vertical=this.getKeyValue("vertical=");if(this.isStr(vertical)){secValues=vertical+"/"+secValues;this.setSections(secValues);}}
if(this.keyValues.indexOf("synd=")>-1){var synd=this.getKeyValue("synd=");if(this.isStr(synd))this.addExclusionCategory(synd);}}
zoneValues=zoneValues.replace(/^\d/,"_"+zoneValues.match(/^\d/,"_"));return zoneValues+secValues;},setDemoVal:function(){var demoVal=this.btgU.Cookie.read('qcDemo');var qcModuleExists=typeof this.btgCfg.AdSettings!="undefined"&&typeof this.btgCfg.AdSettings.QuantCast!="undefined";var demoTargetingFlag=qcModuleExists&&typeof this.btgCfg.AdSettings.QuantCast.enableDemoTargeting=="boolean"?this.btgCfg.AdSettings.QuantCast.enableDemoTargeting:true;if(demoTargetingFlag&&this.isStr(demoVal)&&this.keyValues.indexOf("demo=D")==-1){this.keyValues+=";"+unescape(demoVal);}},formatKeyValues:function(){var extraKeyVals=this.getAdditionalKeyValues();if(this.isStr(extraKeyVals)){this.keyValues+=";"+extraKeyVals;}
if(this.keyValues.indexOf("pos=")==-1){this.keyValues+=";pos="+this.getPosition();}
if(this.keyValues.indexOf("tag=")==-1){this.keyValues+=";tag="+this.contentType;}
if(this.keyValues.indexOf("mtype=")==-1){this.keyValues+=";mtype="+this.mediaType;}
if(this.autoDcopt){this.removeKeyValue("dcopt");if(this.tile=="1"){this.keyValues+=";dcopt=ist";}}
this.keyValues=this.formatReserved();if(this.isStr(this.size)&&this.keyValues.indexOf("sz=")==-1){this.keyValues+=";sz="+this.size;}
if(this.tile>=0&&this.keyValues.indexOf("tile=")==-1){this.keyValues+=";tile="+this.tile;}
this.setDemoVal();if(this.isStr(this.reservedKeyValues.dcmt)){this.keyValues+=";dcmt="+this.reservedKeyValues.dcmt;}
if(this.isStr(this.reservedKeyValues.dcopt)){this.removeKeyValue("dcopt");this.keyValues+=";dcopt="+this.reservedKeyValues.dcopt;}
var exclusions=this.getExclusions();if(this.keyValues.indexOf(exclusions)==-1&&this.exclusions.length>0){this.keyValues+=";"+this.getExclusions();}
if(this.isStr(this.reservedKeyValues.dcove)){this.keyValues+=";dcove="+this.reservedKeyValues.dcove;}
if(this.gv.IS_TOP_ACCESSIBLE){var tModeValue=this.btgStr.queryStringToObject(top.location.search.toLowerCase()).testmode;if(this.isStr(tModeValue)){this.keyValues+=';testmode='+tModeValue;}}
this.keyValues=this.keyValues.replace(/^;+|;+$/g,'');return this.keyValues;},formatUValues:function(str){var uvals=str;uvals=uvals.replace(/\;/g,'|');uvals=uvals.replace(/\=/g,'-');return uvals;},placeAd:function(a_data){if(!this.isStr(this.id)){this.setId("ad"+this.tile);}
if(this.contentType=="adi"){var htmlOut='<ifr'+'ame allowtransparency="true" onload="mtvn.btg.ads.AdManager.adLoadNotify(\''+this.id+'\');" id="'+this.id+'" name="'+this.id+'" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" width="'+this.getRealWidth()+'" height="'+this.getRealHeight()+'" src="'+this.getUrl()+'"><\/ifr'+'ame>';if(this.gv.IS_TOP_ACCESSIBLE&&this.btgStr.queryStringToObject(top.location.search).mockupMode=='true'){htmlOut=this.btgStr.mockItUp(htmlOut);}
if(this.isStr(a_data)&&this.isStr(a_data.reloadableAdId))
return htmlOut;else if(typeof exposeTestFunctionNames=='undefined')
document.write(htmlOut);}else{var htmlOut='<scr'+'ipt type="text/javascript" id="'+this.id+'" onreadystatechange="if(this.readyState==\'complete\')mtvn.btg.ads.AdManager.adLoadNotify(\''+this.id+'\');" onload="mtvn.btg.ads.AdManager.adLoadNotify(\''+this.id+'\');" src="'+this.getUrl()+'"><\/scr'+'ipt>';if(this.gv.IS_TOP_ACCESSIBLE&&this.btgStr.queryStringToObject(top.location.search).mockupMode=='true'){htmlOut=this.btgStr.mockItUp(htmlOut);}
if(this.isStr(a_data)&&this.isStr(a_data.reloadableAdId))
return htmlOut;else if(typeof exposeTestFunctionNames=='undefined')
document.write(htmlOut);}}}
mtvn.btg.ads.doubleclick.DomesticDc=mtvn.btg.util.Class.inheritFrom(mtvn.btg.ads.doubleclick.DoubleClick,mtvn.btg.ads.doubleclick.DomesticDc);mtvn.btg.ads.doubleclick.InternationalDc=function(config){this.type="InternationalDc";};mtvn.btg.ads.doubleclick.InternationalDc.prototype={formatSectionValues:function(){var parts=this.sections.split('/');var sec0="none";var sec1="none";var secn="none";var temparr=[];if(this.isStr(parts[0])){sec0=parts[0];}else{sec0="/";};if(this.isStr(parts[1])){sec1=parts[1];};if(this.isStr(parts[2])){for(var x=2,len=parts.length;x<len;x++){if(this.isStr(parts[x])){temparr.push(parts[x]);}}
secn=temparr.join("/");};var result="sec0="+sec0+";sec1="+sec1+";secN="+secn;return result;},formatZone:function(){var parts=this.sections.split('/');if(this.isStr(parts[0])){var secValues=parts[0];}else{var secValues="/home";};return secValues;},formatKeyValues:function(){var _btgAdMgr=this.btgAds.AdManager;var extraKeyVals=this.getAdditionalKeyValues();if(this.isStr(extraKeyVals)){this.keyValues+=";"+extraKeyVals;}
this.keyValues=this.formatReserved();if(this.isStr(this.size)&&this.keyValues.indexOf("sz=")==-1){this.keyValues+=";sz="+this.size;}
if(this.tile>=0&&this.keyValues.indexOf("tile=")==-1){this.keyValues+=";tile="+this.tile;}
if(this.isStr(this.reservedKeyValues.dcmt)){this.keyValues+=";dcmt="+this.reservedKeyValues.dcmt;}
if(this.autoDcopt&&this.tile=="1"){this.keyValues+=";dcopt=ist";_btgAdMgr.dcoptOn=true;}
if(this.isStr(this.reservedKeyValues.dcopt)){if(_btgAdMgr.dcoptOn){if(this.tile!="1"&&this.isDevEnv){this.keyValues+=";[ERROR: attempt to set dcopt value more than once per page!]";}}
else{this.keyValues+=";dcopt="+this.reservedKeyValues.dcopt;_btgAdMgr.dcoptOn=true;}}
if(this.exclusions.length>0){this.keyValues+=";"+this.getExclusions();}
if(this.isStr(this.reservedKeyValues.dcove)){this.keyValues+=";dcove="+this.reservedKeyValues.dcove;}
if(self.location.href.indexOf('testmode=on')>-1){this.keyValues+=';testmode=on';}
this.keyValues=this.keyValues.replace(/^;+|;+$/g,'');return this.keyValues;},formatUValues:function(){return"";},addInternationalValues:function(data){if(this.isStr(data.log)){this.addKeyValues("log="+data.log);}else{this.addKeyValues("log=0");};if(this.isStr(data.demo)){this.addKeyValues("demo="+data.demo);}else{this.addKeyValues("demo=none");};if(this.isStr(data.event)){this.addKeyValues("event="+data.event);}else{this.addKeyValues("event=none");};if(this.isStr(data.keyword)){this.addKeyValues("search_kw="+data.keyword);}else{this.addKeyValues("search_kw=none");};if(this.isStr(data.vid)){this.addKeyValues("vid="+data.vid);}else{this.addKeyValues("vid=none");};if(this.isStr(data.vid_type)){this.addKeyValues("vid_type="+data.vid_type);}else{this.addKeyValues("vid_type=none");};if(this.isStr(data.region)){this.addKeyValues("region="+data.region);}else{this.addKeyValues("region=none");};this.addKeyValues("dcove=d");this.addKeyValues("url="+escape(location.pathname));if(this.isStr(data.keyValues)){this.addKeyValues(data.keyValues);};},placeAd:function(a_data){this.addInternationalValues(a_data);if(!this.isStr(this.id)){this.setId("ad"+this.tile);}
if(this.contentType=="adi"){var htmlOut='<ifr'+'ame allowtransparency="true" onload="mtvn.btg.ads.AdManager.adLoadNotify(\''+this.id+'\');" id="'+this.id+'" name="'+this.id+'" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" width="'+this.getRealWidth()+'" height="'+this.getRealHeight()+'" src="'+this.getUrl()+'"><\/ifr'+'ame>';if(this.gv.IS_TOP_ACCESSIBLE&&this.btgStr.queryStringToObject(top.location.search).mockupMode=='true'){htmlOut=this.btgStr.mockItUp(htmlOut);}
if(this.isStr(a_data)&&this.isStr(a_data.reloadableAdId))
return htmlOut;else if(typeof exposeTestFunctionNames=='undefined')
document.write(htmlOut);}else{var htmlOut='<scr'+'ipt type="text/javascript" id="'+this.id+'" onreadystatechange="if(this.readyState==\'complete\')mtvn.btg.ads.AdManager.adLoadNotify(\''+this.id+'\');" onload="mtvn.btg.ads.AdManager.adLoadNotify(\''+this.id+'\');" src="'+this.getUrl()+'"><\/scr'+'ipt>';if(this.gv.IS_TOP_ACCESSIBLE&&this.btgStr.queryStringToObject(top.location.search).mockupMode=='true'){htmlOut=this.btgStr.mockItUp(htmlOut);}
if(this.isStr(a_data)&&this.isStr(a_data.reloadableAdId))
return htmlOut;else if(typeof exposeTestFunctionNames=='undefined')
document.write(htmlOut);}}};mtvn.btg.ads.doubleclick.InternationalDc=mtvn.btg.util.Class.inheritFrom(mtvn.btg.ads.doubleclick.DoubleClick,mtvn.btg.ads.doubleclick.InternationalDc);mtvn.btg.ads.freewheel.FreeWheelAd=function(config){this.btgU=mtvn.btg.util;this.btgStr=this.btgU.String;this.isStr=this.btgStr.isDefined;this.btgAds=mtvn.btg.ads;this.btgDc=this.btgAds.doubleclick;this.btgAdMgr=this.btgAds.AdManager;this.config=config;this.type="FreeWheelAd";this.fwType="DART";this.slotId="fwph_";this.reloadTimer;this.dcAd;this.initData;this.realWidth;this.realHeight;this.reloadable=false;this.reloadTime=30000;this.isGroupedByOrd=false;this.needUniqueOrd=false;};mtvn.btg.ads.freewheel.FreeWheelAd.prototype={placeAd:function(data){if(this.fwType=="MRM"||this.fwType=="COV"){this.realWidth=this.realSize.substr(0,this.realSize.indexOf("x"));this.realHeight=this.realSize.substr(this.realSize.indexOf("x")+1,this.realSize.length);var slotParams="slid=";slotParams+=this.slotId;slotParams+="&ptgt=s&envp=g_iframe_js&w=";slotParams+=this.realWidth;slotParams+="&h=";slotParams+=this.realHeight;var fwph='';fwph+='<span id="'+this.slotId+'" class="_fwph">';fwph+='<form id="_fw_form_'+this.slotId+'" style="display:none;">';fwph+='<input type="hidden" name="_fw_input_'+this.slotId+'" id="_fw_input_'+this.slotId+'" value="'+slotParams+'" />';fwph+='</form>';fwph+='<span id="_fw_container_'+this.slotId+'" class="_fwac">';fwph+='<span id="fwCustom_'+this.slotId+'" name="fwCustom_'+this.slotId+'" class="fwCustomAll" style="width:'+this.realWidth+'px;height:'+this.realHeight+'px;display:block;"></span></span>';fwph+='</span>';if(mtvn.btg.globalvars.IS_TOP_ACCESSIBLE&&this.btgStr.queryStringToObject(top.location.search).mockupMode=='true'){fwph=this.btgStr.mockItUp(fwph);}
document.write(fwph);this.btgAds.freewheel.FreeWheelAdInterface.fwAds[this.slotId]=this;this.btgU.DOM.Events.addListener(window,"load",this.timerToPlayAd);}
else if(this.fwType=="DART"){this.dcAd=new this.btgDc.DomesticDc(this.config.DoubleClick);this.dcAd.init(this.initData);this.dcAd.placeAd(data);}
else{new this.btgU.Alert("FreeWheel ad type not recognized.");}},timerToPlayAd:function(){setTimeout(function(){var playerLoaded=false;for(var i in mtvn.btg.reporting.player.MediaPlayer.players){playerLoaded=true;break;}
if(playerLoaded){setTimeout(mtvn.btg.ads.freewheel.FreeWheelAdInterface.forcedPlayAd,mtvn.btg.globalvars.FORCE_AD_WAIT_TIME.PLAYER_LOADED);}
else
setTimeout(mtvn.btg.ads.freewheel.FreeWheelAdInterface.forcedPlayAd,mtvn.btg.globalvars.FORCE_AD_WAIT_TIME.PLAYER_FAILED);},mtvn.btg.globalvars.FORCE_AD_WAIT_TIME.PLAYER_LOAD_WAIT_TIME);},setContentType:function(){},init:function(data){var minReloadInterval=10000;var defaultReloadInterval=30000;this.initData=data;if(this.isStr(data.size)){this.size=data.size;}
else{this.size="[ERROR: Size Not Defined!]";new this.btgU.Alert("FreeWheel ad size not defined.");}
if(this.isStr(data.realSize)){this.realSize=data.realSize;}
else{this.realSize=this.size;}
this.slotId+=data.tile;if(this.isStr(this.config.FreeWheel.type)){this.fwType=this.config.FreeWheel.type.toUpperCase();}
if(this.config.FreeWheel.reloadable||data.isReloadable){this.reloadable=true;this.reloadTime=defaultReloadInterval;if(this.config.FreeWheel.reloadTime&&!isNaN(parseInt(this.config.FreeWheel.reloadTime))&&parseInt(this.config.FreeWheel.reloadTime)>=minReloadInterval){this.reloadTime=parseInt(this.config.FreeWheel.reloadTime);this.isGroupedByOrd=true;}
if(data.reloadInterval&&!isNaN(parseInt(data.reloadInterval))&&parseInt(data.reloadInterval)>=minReloadInterval){this.reloadTime=parseInt(data.reloadInterval);if(this.isGroupedByOrd===true){this.isGroupedByOrd=false;}
this.needUniqueOrd=true;}
if(this.isGroupedByOrd===true){this.btgAdMgr.groupedReloadableAdsTotal++;this.btgAdMgr.groupedReloadableAdsCounter++;}}},reload:function(){var targetFrameId="_fw_frame_"+this.slotId;var targetFrame=document.getElementById(targetFrameId);var targetFrameContainer=document.getElementById("fwCustom_"+this.slotId);if(!this.btgU.Object.isDefined(this.dcAd)){this.dcAd=new this.btgDc.DomesticDc(this.config.DoubleClick);this.dcAd.init(this.initData);}
if(!this.isStr(this.dcAd.id)){this.dcAd.setId("ad"+this.dcAd.tile);}
this.dcAd.needUniqueOrd=this.needUniqueOrd;if(targetFrame!=null){this.btgAdMgr.setAdReloadOrdByGroup(this.dcAd);}
this.dcAd.setContentType("adi");var htmlOut='<ifr'+'ame allowtransparency="true" style="display:inline;width:'+this.realWidth+'px;height:'+this.realHeight+'px;border:0px;z-index:99;border-width:0px;" onload="mtvn.btg.ads.AdManager.adLoadNotify(\''+this.dcAd.id+'\');" id="'+targetFrameId+'" name="'+targetFrameId+'" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" width="'+this.realWidth+'" height="'+this.realHeight+'" src="'+this.dcAd.getUrl()+'"><\/ifr'+'ame>';if(targetFrame==null&&targetFrameContainer!=null){targetFrameContainer.style.border='0px';targetFrameContainer.style.backgroundColor='transparent';try{targetFrameContainer.innerHTML=htmlOut;}catch(e){}}
else if(targetFrame!=null){if(targetFrame.parentElement){try{targetFrame.parentElement.innerHTML=htmlOut;}catch(e){}}
else if(targetFrame.parentNode){try{targetFrame.parentNode.innerHTML=htmlOut;}catch(e){}}}},startReloadTimer:function(){if(this.reloadable){var adObj=this;var tmpFunc=function(){adObj.reload();};if(this.reloadTimer){clearInterval(this.reloadTimer);this.reloadTimer=null;}
this.reloadTimer=setInterval(tmpFunc,this.reloadTime);}}};mtvn.btg.ads.freewheel.FreeWheelAdInterface=new function(){var _btgU=mtvn.btg.util;var _btgStr=_btgU.String;this.fwAds=[];this.getFallbackDisplayHTML=function(a_slotId,a_commaSeparatedCompetitiveIndustries){var _isStr=_btgStr.isDefined;var retVal="";var fwAd=this.fwAds[a_slotId];var exCatVals=a_commaSeparatedCompetitiveIndustries.split(",");var dcExCat="";for(var i=0,len=exCatVals.length;i<len;i++){if(_isStr(exCatVals[i])){dcExCat+=";!category="+exCatVals[i];}}
fwAd.dcAd=new mtvn.btg.ads.doubleclick.DomesticDc(fwAd.config.DoubleClick);if(_isStr(fwAd.initData.keyValues)){fwAd.initData.keyValues+=dcExCat;}
else{fwAd.initData.keyValues=dcExCat;}
fwAd.initData.contentType="adj";fwAd.dcAd.init(fwAd.initData);if(fwAd.reloadable){fwAd.startReloadTimer();}
if(!_isStr(fwAd.dcAd.id)){fwAd.dcAd.setId("ad"+fwAd.dcAd.tile);}
retVal+='<scr'+'ipt type="text/javascript"  id="'+fwAd.dcAd.id+'" onreadystatechange="if(this.readyState==\'complete\')parent.mtvn.btg.ads.AdManager.adLoadNotify(\''+fwAd.dcAd.id+'\');" onload="parent.mtvn.btg.ads.AdManager.adLoadNotify(\''+fwAd.dcAd.id+'\');" src="';retVal+=fwAd.dcAd.getUrl();retVal+='"><\/scr'+'ipt>';return retVal;};this.forcedPlayAd=function(){var _btgFWAI=mtvn.btg.ads.freewheel.FreeWheelAdInterface;var _btgGv=mtvn.btg.globalvars;var fsEnabled=false;var fsAlertOn=false;var fsOverride;var fsOnLive=_btgGv.IS_LIVE_ENV;if(_btgGv.IS_TOP_ACCESSIBLE){if(_btgStr.queryStringToObject(top.location.search).fwFailSafe=="true"){fsOverride=true;}
else if(_btgStr.queryStringToObject(top.location.search).fwFailSafe=="false"){fsOverride=false;}}
if(fsOverride==true){fsEnabled=true;if(fsOnLive==true){fsAlertOn=true;}}
else if(fsOverride==false){fsEnabled=false;}
else{if(fsOnLive==true){fsEnabled=true;fsAlertOn=true;}}
if(_btgGv.IS_TOP_ACCESSIBLE&&_btgStr.queryStringToObject(top.location.search).mockupMode=='true'){fsEnabled=false;fsAlertOn=false;}
if(fsEnabled==true){for(i in _btgFWAI.fwAds){if(document.getElementById("_fw_frame_"+i)==null){if(_btgFWAI.fwAds[i].reloadable){_btgFWAI.fwAds[i].startReloadTimer();}
_btgFWAI.fwAds[i].reload();}
else{fsAlertOn=false;}}
if(fsAlertOn==true){new _btgU.Alert("Freewheel failsafe method used.",1);}}};};mtvn.btg.ads.FreeWheelAdInterface=mtvn.btg.ads.freewheel.FreeWheelAdInterface;mtvn.btg.ads.games.GameDc=mtvn.btg.util.Class.inheritFrom(mtvn.btg.ads.doubleclick.DomesticDc);mtvn.btg.ads.games.GameDc.prototype.type="GameDc";mtvn.btg.ads.games.GameDc.prototype.formatUrl=function(values){var retVal="";var zoneToCheck=values.dartSite+"/"+values.zone+";";if(zoneToCheck.length>64){var cutPoint=values.zone.length-(zoneToCheck.length-64);values.zone=values.zone.substring(0,cutPoint);}
var target=[values.protocol+values.server,values.contentType,values.dartSite,values.zone];var url=target.join("/");var vals=[url];if(this.isStr(values.keyValues)){vals.push(values.keyValues);}
if(this.isStr(values.uValues)){vals.push(values.uValues);}
if(values.ord>0){vals.push('ord='+values.ord+"?");}
retVal=vals.join(";");return retVal;};mtvn.btg.ads.games.GameDc.prototype.formatKeyValues=function(){var extraKeyVals=this.getAdditionalKeyValues();if(this.isStr(extraKeyVals)){this.keyValues+=";"+extraKeyVals;}
if(this.keyValues.indexOf("mtype=")==-1){this.keyValues+=";mtype="+this.mediaType;}
this.keyValues=this.formatReserved();this.keyValues+=";dcmt=text/xml";if(this.isStr(this.size)&&this.keyValues.indexOf("sz=")==-1){this.keyValues+=";sz="+this.size;}
if(this.tile>=0&&this.keyValues.indexOf("tile=")==-1){this.keyValues+=";tile="+this.tile;}
var demoVal=this.btgU.Cookie.read('qcDemo');var qcModuleExists=typeof this.config.Ad!="undefined"&&typeof this.config.Ad.Quantcast!="undefined";var demoTargetingFlag=qcModuleExists&&typeof this.config.Ad.Quantcast.enabled=="boolean"?this.config.Ad.Quantcast.enabled:true;if(demoTargetingFlag&&this.isStr(demoVal)&&this.keyValues.indexOf("demo=D")==-1){this.keyValues+=";"+unescape(demoVal);}
if(this.exclusions.length>0){this.keyValues+=";"+this.getExclusions();}
if(this.gv.IS_TOP_ACCESSIBLE){var tModeValue=this.btgStr.queryStringToObject(top.location.search.toLowerCase()).testmode;if(this.isStr(tModeValue)){this.keyValues+=';testmode='+tModeValue;}}
this.keyValues=this.keyValues.replace(/^;+|;+$/g,'');return this.keyValues;};mtvn.btg.ads.games.GameDc.prototype.formatZone=function(){var zoneValues="";var secValues=this.getSections();if(this.isObj(this.config.Game)&&this.isObj(this.config.Game.metadata)){if(this.isStr(this.config.Game.metadata.ageGroup)&&this.config.Game.metadata.ageGroup.toLowerCase()=="mature"){this.addExclusionCategory("mature");}
if(this.isStr(this.config.Game.metadata.franchise)){this.addExclusionCategory(this.config.Game.metadata.franchise);}
var viralOn=false;if(this.config.Game.metadata.type&&this.config.Game.metadata.type.toLowerCase()=="viral"){this.setDartSite(this.dartSite+".vr");this.addExclusionCategory("vir");this.addKeyValues("pform=vir");viralOn=true;}
if((this.config.Game.metadata.type&&this.config.Game.metadata.type.toLowerCase()=="syndicated")||viralOn===true){if(viralOn===false){this.setDartSite(this.dartSite+".sy");}
this.addExclusionCategory("synd");this.addKeyValues("pform=synd");if(viralOn===false&&this.isStr(this.getKeyValue("partner="))){zoneValues+=this.getKeyValue("partner=")+"/";}}}
if(this.isObj(this.config.Ad)&&this.isObj(this.config.Ad.DoubleClick)){if(this.isStr(this.config.Ad.DoubleClick.keyValues)){this.addKeyValues(this.config.Ad.DoubleClick.keyValues);}}
this.addExclusionCategory("clip");this.addExclusionCategory("gamevideo");zoneValues+="c/gv/";zoneValues=zoneValues.replace(/^\d/,"_"+zoneValues.match(/^\d/,"_"));return zoneValues+secValues;};mtvn.btg.ads.games.GameAdManager=new function(){var _btgGms=mtvn.btg.ads.games;var _btgIsObj=mtvn.btg.util.Object.isDefined;var _btgIsStr=mtvn.btg.util.String.isDefined;var hasDCEnabled=false;var hasFWEnabled=false;var ad;var config;var gameAdData={};this.setSectionsData=function(){if(_btgIsObj(config.Game)&&_btgIsObj(config.Game.metadata)){gameAdData.sections="";gameAdData.sections+=(config.Game.metadata.revenueSplit&&config.Game.metadata.revenueSplit.toString()=="true")?"/pay":"";if(_btgIsStr(config.Game.metadata.gameGenre)&&config.Game.metadata.gameGenre.toUpperCase()!="NA"){gameAdData.sections+="/"+config.Game.metadata.gameGenre;}
else{gameAdData.sections+=(_btgIsStr(config.Game.metadata.gameType)&&config.Game.metadata.gameType.toUpperCase()!="NA")?"/"+config.Game.metadata.gameType:"/noG";}
gameAdData.sections+=(_btgIsStr(config.Game.metadata.partner)&&config.Game.metadata.partner.toUpperCase()!="NA")?"/"+config.Game.metadata.partner:"/noP";gameAdData.sections+=(_btgIsStr(config.Game.metadata.franchise)&&config.Game.metadata.franchise.toUpperCase()!="NA")?"/"+config.Game.metadata.franchise:"/noF";if(_btgIsStr(config.Game.metadata.gameType)&&config.Game.metadata.gameType.toUpperCase()!="NA"){gameAdData.sections+="/"+config.Game.metadata.gameType;}
else{gameAdData.sections+=(_btgIsStr(config.Game.metadata.gameGenre)&&config.Game.metadata.gameGenre.toUpperCase()!="NA")?"/"+config.Game.metadata.gameGenre:"/noGT";}
if(_btgIsStr(config.Game.metadata.gameName)&&config.Game.metadata.gameName.toUpperCase()!="NA"){gameAdData.sections+="/"+config.Game.metadata.gameName;}
else{gameAdData.sections+=(_btgIsStr(config.Game.metadata.gameTitle)&&config.Game.metadata.gameTitle.toUpperCase()!="NA")?"/"+config.Game.metadata.gameTitle:"/noGN";}
gameAdData.sections+=(_btgIsStr(config.Game.metadata.ageGroup)&&config.Game.metadata.ageGroup.toLowerCase()=="under13")?"/"+config.Game.metadata.ageGroup.toLowerCase():"";}};this.setContentTypeData=function(){gameAdData.contentType="pfadx";};this.setOrdData=function(){gameAdData.ord=mtvn.btg.util.Math.random(100000000000000000,999999999999999999);};this.setTileData=function(){gameAdData.tile=1;};this.setMediaTypeData=function(){gameAdData.mediaType="gamevideo";};this.setDartData=function(){var btgCfg=mtvn.btg.config;gameAdData.dartSite=(_btgIsStr(btgCfg.AdSettings.DoubleClick.dartSite))?btgCfg.AdSettings.DoubleClick.dartSite:"[ERROR: DARTSITE in config not defined!]";};this.setSizeData=function(){if(_btgIsObj(config.Ad)){gameAdData.size=(config.Ad.width)?config.Ad.width:"640";gameAdData.size+="x";gameAdData.size+=(config.Ad.height)?config.Ad.height:"480";}};this.setKeyValuesData=function(){gameAdData.keyValues="";gameAdData.keyValues+=";partner=";gameAdData.keyValues+=(_btgIsStr(config.Game.metadata.partner))?config.Game.metadata.partner:"";gameAdData.keyValues+=";franchise=";gameAdData.keyValues+=(_btgIsStr(config.Game.metadata.franchise))?config.Game.metadata.franchise:"";gameAdData.keyValues+=";mode=clip";gameAdData.keyValues+=";genre=";gameAdData.keyValues+=(_btgIsStr(config.Game.metadata.gameGenre))?config.Game.metadata.gameGenre:"";gameAdData.keyValues+=";game_type=";gameAdData.keyValues+=(_btgIsStr(config.Game.metadata.gameType))?config.Game.metadata.gameType:"";gameAdData.keyValues+=";game_id=";gameAdData.keyValues+=(_btgIsStr(config.Game.metadata.gameId))?config.Game.metadata.gameId:"";gameAdData.keyValues+=";game_name=";gameAdData.keyValues+=(_btgIsStr(config.Game.metadata.gameName))?config.Game.metadata.gameName:"";};this.getAd=function(){ad=new _btgGms.GameDc(config);this.setContentTypeData();this.setDartData();this.setSectionsData();this.setSizeData();this.setMediaTypeData();this.setTileData();this.setKeyValuesData();this.setOrdData();ad.init(gameAdData);return ad;};this.getAdUrl=function(){return this.getAd().getUrl();};this.init=function(){config=com.mtvnet.games.GameSettings;if(config.Ad.DoubleClick.enabled&&config.Ad.DoubleClick.enabled.toString()=="true")
hasDCEnabled=true;if(config.Ad.FreeWheel.enabled&&config.Ad.FreeWheel.enabled.toString()=="true")
hasFWEnabled=true;if(mtvn.btg.globalvars.IS_TOP_ACCESSIBLE&&mtvn.btg.util.String.queryStringToObject(top.location.search).mockupMode=='true'){document.write("<p>"+this.getAdUrl()+"</p>");}
if(hasDCEnabled){config.Ad.DoubleClick.url=this.getAdUrl();}
_btgGms.GameAdLoader.init(config);};this.loadGame=function(status){if(status=="load")
_btgGms.GameAdLoader.swapGame();};}
mtvn.btg.ads.games.GameAdLoader={btgC_read:mtvn.btg.util.Cookie.read,btgC_set:mtvn.btg.util.Cookie.set,config:{},parentDiv:null,init:function(config){this.config=config;this.parentDiv=config.parentDiv;var adPlayCounter=this.btgC_read("adPlayCounter");if(!adPlayCounter)
this.btgC_set("adPlayCounter",0);if(adPlayCounter>=this.config.Ad.gamePerAd&&!(this.config.Ad.disableAds)){adPlayCounter=0;this.embedAdLoader();}else{adPlayCounter++;this.embedGame();}
this.btgC_set("adPlayCounter",adPlayCounter);},noFlashContent:function(divId){this.parentDiv.innerHTML='<div id="'+(divId?divId:"adLoader_div")+'"><p><a href="https://web.archive.org/web/20110912044651/http://www.adobe.com/go/getflashplayer">Download the free Flash Player now!</a><br/><a href="https://web.archive.org/web/20110912044651/http://www.adobe.com/go/getflashplayer"><img src="https://web.archive.org/web/20110912044651/http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player" /> </a></p></div>';},embedAdLoader:function(){this.noFlashContent("adLoader_div");this.config.Game.metadata.gameSWF=this.config.Game.metadata.gameURL;this.embedFlash(this.config.adLoaderURL,"adLoader_div",this.config.Ad.width,this.config.Ad.height,true);},embedGame:function(){var game_url=this.config.Game.metadata.gameURL;var gameFlashVars=game_url.split("?");if(game_url.match(/\.swf(\?|#)/gi)||game_url.match(/(.swf)$/gi)){this.noFlashContent("game_div");if(gameFlashVars[1]&&gameFlashVars[1].match(/(useqsflashvar=true)/gi)){this.embedFlash(game_url,"game_div",this.config.Game.width,this.config.Game.height,"",true);}else{this.embedFlash(gameFlashVars[0],"game_div",this.config.Game.width,this.config.Game.height,"",gameFlashVars[1]?gameFlashVars[1]:false);}}else
this.parentDiv.innerHTML='<div id="game_div"><iframe src="'+this.config.Game.metadata.gameURL+'" height="'+this.config.Game.height+'"width="'+this.config.Game.width+'" scrolling="no" frameborder="0"></iframe></div>';},embedFlash:function(path,id,width,height,adFlashVars,gameFlashVars){var _btgU=mtvn.btg.util;var flashVars={};var params={allowfullscreen:'true',allowscriptaccess:'always',wmode:'transparent'};if(adFlashVars){flashVars.allowscriptaccess="always";flashVars.bgcolor="black";flashVars.sWidth=width;flashVars.sHeight=height;flashVars.timeDisplayEnabled=this.config.Ad.timeDisplayEnabled;flashVars.guiEnabled=(this.config.Ad.guiEnabled?this.config.Ad.guiEnabled:true);flashVars.language=this.config.Ad.language;flashVars.colorTint=this.config.Ad.colorTint;flashVars.doubleClickEnabled=this.config.Ad.DoubleClick.enabled;flashVars.adURL=this.config.Ad.DoubleClick.url;flashVars.freeWheelEnabled=this.config.Ad.FreeWheel.enabled;flashVars.networkId=this.config.Ad.FreeWheel.networkId;flashVars.assetId=this.config.Ad.FreeWheel.assetId;flashVars.siteSection=this.config.Ad.FreeWheel.siteSection;flashVars.isLiveEnvironment=this.config.Ad.FreeWheel.isLiveEnvironment;flashVars.quantcastEnabled=this.config.Ad.Quantcast.enabled;flashVars.quantCastID=this.config.Ad.Quantcast.id;if(typeof flashVars.assetId=="undefined"){new _btgU.Alert("flashVars.assetId missing in mtvn.btg.ads.games.GameAdLoader.embedFlash.");}
if(typeof flashVars.siteSection=="undefined"){new _btgU.Alert("flashVars.siteSection missing in mtvn.btg.ads.games.GameAdLoader.embedFlash.");}
if(this.config.gameCompURL!="")
flashVars.gameCompURL=this.config.gameCompURL;if(this.config.Ad.params){for(var param in this.config.Ad.params)
if(this.config.Ad.params[param]!="")
params[param]=flashVars[param]=this.config.Ad.params[param];}
if(this.config.Game.metadata){for(var key in this.config.Game.metadata)
if(this.config.Game.metadata[key]!="")
flashVars[key]=this.config.Game.metadata[key];}}
else if(gameFlashVars){if(typeof gameFlashVars!='boolean'){var gameFlashVarsArr=gameFlashVars.split("&");for(var i=0,len=gameFlashVarsArr.length;i<len;i++){var key=gameFlashVarsArr[i].split("=")[0];var val=gameFlashVarsArr[i].split("=")[1];if(key)
flashVars[key]=(val?val:"");}}else
flashVars="";for(var gameParam in this.config.Game.param)
if(gameParam)
params[gameParam]=(this.config.Game.param[gameParam]?this.config.Game.param[gameParam]:"");}
if((_btgU.swfobject.getFlashPlayerVersion()).major<10)
_btgU.swfobject.showExpressInstall({data:"https://web.archive.org/web/20110912044651/http://games.mtvnservices.com/swf/expressinstall/expressInstall.swf",width:width,height:height},{},id,function(){});else if(_btgU.String.isDefined(com.mtvnet.games.GameSettings.Game.gameEmbedTag)&&id!="adLoader_div")
document.getElementById(id).innerHTML=com.mtvnet.games.GameSettings.Game.gameEmbedTag;else
_btgU.swfobject.embedSWF(path,id,width,height,"10.0.0","https://web.archive.org/web/20110912044651/http://games.mtvnservices.com/swf/expressinstall/expressInstall.swf",flashVars,params,{style:"background:#000000;",name:id},(adFlashVars?null:this.gameEmbeded));},gameEmbeded:function(e){if(e.success)
mtvn.btg.Controller.loadGame("embed");},swapGame:function(){if(document.getElementById('adLoader_div'))document.getElementById('adLoader_div').style.display="none";this.embedGame();},isTimeSpentEnabled:function(){return(typeof this.config.Ad.timePerAd!="boolean"&&!isNaN(this.config.Ad.timePerAd)&&parseInt(this.config.Ad.timePerAd,10)>0);},setTimeSpent:function(clear){if(clear){this.btgC_set("mtvn_btg_GTS",0);return;}
if(!this.isTimeSpentEnabled())
return;var timeSpent=this.btgC_read("mtvn_btg_GTS");if(timeSpent==null||timeSpent==0)
this.btgC_set("mtvn_btg_GTS",5);else
this.btgC_set("mtvn_btg_GTS",parseInt(timeSpent,10)+5);},isTimeForAd:function(){if(!this.isTimeSpentEnabled())
return false;var timeSpent=this.btgC_read("mtvn_btg_GTS");if(timeSpent!=null&&parseInt(timeSpent,10)!=0){timeSpent=parseInt(timeSpent,10);return(timeSpent>parseInt(this.config.Ad.timePerAd,10));}
return false;}}
var com=typeof com==='object'?com:{};com.mtvi=typeof com.mtvi==='object'?com.mtvi:{};com.mtvi.reporting=typeof com.mtvi.reporting==='object'?com.mtvi.reporting:{};com.mtvi.ads=typeof com.mtvi.ads==='object'?com.mtvi.ads:{};com.mtvi.config=typeof com.mtvi.config==='object'?com.mtvi.config:{};com.mtvi.util=typeof com.mtvi.util==='object'?com.mtvi.util:{};com.mtvi.util.IFrameReloader=typeof com.mtvi.util.IFrameReloader==='object'?com.mtvi.util.IFrameReloader:{};com.mtvi.metadata=typeof com.mtvi.metadata==='object'?com.mtvi.metadata:{};com.mtvi.reporting.Controller=new function(){this.initalized=false;this.initialize=function(){mtvn.btg.Controller.init();this.initalized=true;};this.sendCall=function(data){mtvn.btg.Controller.sendPageCall(data);};this.sendLinkEvent=function(data){mtvn.btg.Controller.sendLinkEvent(data);};this.registerLinks=function(){return true;};this.setConfig=function(data){for(var i in data){mtvn.btg.config.ReportSettings.Omniture[i]=data[i];}
return true};this.addRegisterLinks=function(){return true;};this.setDefaultData=function(k,v){if(mtvn.btg.util.String.isDefined(k)){mtvn.btg.config.ReportSettings.Omniture[k]=mtvn.btg.util.String.isDefined(v)?v:'';return true}
else{return false;}}};com.mtvi.reporting.Dispatcher=function(){this.setAccountVars=function(o){try{this.setAttribute("un",o.name);this.setAttribute("dynamicAccountSelection",o.dynamic);this.setAttribute("dynamicAccountList",o.list);this.setAttribute("linkInternalFilters",o.filters);this.setAttribute("charSet",o.chartset);for(var i in o){this.setAttribute(i,o[i]);};}catch(e){}};this.getValOnce=function(v,c,e){return true};this.sendCall=function(data){data=(mtvn.btg.util.Object.isDefined(data)?data:(mtvn.btg.util.Object.isDefined(com.mtvi.config.SectionSetup)?com.mtvi.config.SectionSetup:{}));if(!com.mtvi.reporting.Controller.initalized){mtvn.btg.Controller.init();com.mtvi.reporting.Controller.initalized=true;}
mtvn.btg.Controller.sendPageCall(data);};this.send=function(data){this.sendCall(data);};this.sendLinkEvent=function(data){var objOmniture=(com.mtvi.reporting.Controller.initalized?mtvn.btg.reporting.omniture.Hcode:mtvn.btg.config.ReportSettings.Omniture);for(var i=1;i<=50;i++){objOmniture["eVars"+i]='';objOmniture["prop"+i]='';if(i<6){objOmniture["hier"+i]='';}}
objOmniture["pageName"]='';objOmniture["channel"]='';if(!com.mtvi.reporting.Controller.initalized){mtvn.btg.Controller.init();com.mtvi.reporting.Controller.initalized=true;}
mtvn.btg.Controller.sendLinkEvent(data);};this.registerLinks=function(){return true;}
this.setAttribute=function(k,v){if(mtvn.btg.util.String.isDefined(k)){var objOmniture=(com.mtvi.reporting.Controller.initalized?mtvn.btg.reporting.omniture.Hcode:mtvn.btg.config.ReportSettings.Omniture);objOmniture[k]=mtvn.btg.util.String.isDefined(v)?v:'';return true}
else{return false;}};this.getAttribute=function(k){var objOmniture=(com.mtvi.reporting.Controller.initalized?mtvn.btg.reporting.omniture.Hcode:mtvn.btg.config.ReportSettings.Omniture);return objOmniture[k];};this.setValues=function(data){for(var i in data){this.setAttribute(i,data[i]);}
return true};this.setDefaultData=function(){};this.clearProps=function(){try{for(var p=1;p<=50;p++){this.setAttribute("prop"+p,"");}}catch(e){}};this.clearAllVars=function(){var objOmniture=(com.mtvi.reporting.Controller.initalized?mtvn.btg.reporting.omniture.Hcode:mtvn.btg.config.ReportSettings.Omniture);try{for(var p=1;p<=50;p++){objOmniture["prop"+p]="";}
for(var e=1;e<=50;e++){objOmniture["eVars"+e]="";}
for(var h=1;h<=5;h++){objOmniture["hier"+h]="";}
objOmniture["pageName"]="";objOmniture["channel"]="";}catch(e){}}}
com.mtvi.reporting.MediaPlayer={addPlayer:function(id){var player=mtvn.btg.reporting.player.MediaPlayer.addPlayer(id);return player['id'];}}
mtvn.btg.reporting.MediaPlayer={setEndSlateClick:mtvn.btg.reporting.player.MediaPlayer.setEndSlateClick,getEndSlateClick:mtvn.btg.reporting.player.MediaPlayer.getEndSlateClick}
com.mtvi.ads.AdManager=new function(){var adType="";var reloadInterval=300000;this.setDartSite=function(a_dartSite){try{if(mtvn.btg.config.AdSettings.DoubleClick.enabled&&!mtvn.btg.util.String.isDefined(mtvn.btg.config.AdSettings.DoubleClick.dartSite)){mtvn.btg.config.AdSettings.DoubleClick.dartSite=a_dartSite;}
else if(mtvn.btg.config.AdSettings.International.enabled){mtvn.btg.config.AdSettings.International.dartSite=a_dartSite;}}
catch(e){}};this.setPositionThreshold=function(a_positionThreshold){try{if(mtvn.btg.config.AdSettings.DoubleClick.enabled&&!mtvn.btg.util.String.isDefined(mtvn.btg.config.AdSettings.DoubleClick.positionThreshold)){mtvn.btg.config.AdSettings.DoubleClick.positionThreshold=a_positionThreshold;}
else if(mtvn.btg.config.AdSettings.International.enabled){mtvn.btg.config.AdSettings.International.positionThreshold=a_positionThreshold;}}
catch(e){}};this.setSiteName=function(a_siteName){try{if(mtvn.btg.config.AdSettings.DoubleClick.enabled&&!mtvn.btg.util.String.isDefined(mtvn.btg.config.AdSettings.DoubleClick.siteName)){mtvn.btg.config.AdSettings.DoubleClick.siteName=a_siteName;}
else if(mtvn.btg.config.AdSettings.International.enabled){mtvn.btg.config.AdSettings.International.siteName=a_siteName;}}
catch(e){}};this.setDefaultSections=function(a_defaultSections){if(mtvn.btg.util.String.isDefined(a_defaultSections))
mtvn.btg.config.AdSettings.DoubleClick.sections=a_defaultSections;};this.setKeyValues=function(a_keyValues){try{if(mtvn.btg.config.AdSettings.DoubleClick.enabled&&!mtvn.btg.util.String.isDefined(mtvn.btg.config.AdSettings.DoubleClick.keyValues)){mtvn.btg.config.AdSettings.DoubleClick.keyValues=a_keyValues;}
else if(mtvn.btg.config.AdSettings.International.enabled){mtvn.btg.config.AdSettings.International.keyValues=a_keyValues;}}
catch(e){}};this.getFormattedSections=function(a_sections){var retVal=a_sections;try{retVal=(a_sections=='/')?a_sections:mtvn.btg.util.String.charTrim(a_sections,'/');var sectionsLength=a_sections.length;var difn="index";if(mtvn.btg.util.Object.isDefined(com.mtvi.reporting.Account)&&mtvn.btg.util.String.isDefined(com.mtvi.reporting.Account.defaultIndexFileName)){difn=com.mtvi.reporting.Account.defaultIndexFileName;}
if(mtvn.btg.util.Object.isDefined(mtvn.btg.config.AdSettings)&&mtvn.btg.util.String.isDefined(mtvn.btg.config.AdSettings.defaultIndexFileName)){difn=mtvn.btg.config.AdSettings.defaultIndexFileName;}
difn=mtvn.btg.util.String.stripFileExtension(difn);var hpCases=['/',difn,"home/"+difn];for(var i=0,len=hpCases.length;i<len;i++){if(a_sections.indexOf(hpCases[i])==0&&sectionsLength==hpCases[i].length){retVal=a_sections.replace(hpCases[i],'_hp');break;}}
if(retVal==''){retVal="_hp";}
var sectionArray=mtvn.btg.util.String.stripFileExtension(retVal).split('/');if(sectionArray.length==2){if(sectionArray[1]==difn){retVal=mtvn.btg.util.String.stripFileExtension(retVal).replace(difn,'_mn');}}}
catch(e){}
return retVal;};this.placeAd=function(a_adParametersObj){try{if(typeof(mtvn.btg.globalvars.IS_CODA_ADS_USED)!='undefined')
mtvn.btg.globalvars.IS_CODA_ADS_USED="Bridge methods";if(!com.mtvi.reporting.Controller.initalized){mtvn.btg.Controller.init();com.mtvi.reporting.Controller.initalized=true;}
if(!mtvn.btg.util.String.isDefined(a_adParametersObj.sections)){if(mtvn.btg.util.Object.isDefined(mtvn.btg.config.AdSettings.DoubleClick)&&mtvn.btg.util.String.isDefined(mtvn.btg.config.AdSettings.DoubleClick.sections)){a_adParametersObj.sections=mtvn.btg.config.AdSettings.DoubleClick.sections;}
else{a_adParametersObj.sections=mtvn.btg.util.Sections.getAdSections();}}
if(mtvn.btg.util.Object.isDefined(mtvn.btg.config.AdSettings.International)&&mtvn.btg.config.AdSettings.International.enabled&&mtvn.btg.util.String.isDefined(a_adParametersObj)&&!mtvn.btg.util.String.isDefined(a_adParametersObj.adType))
a_adParametersObj.adType="InternationalAd";a_adParametersObj.sections=this.getFormattedSections(a_adParametersObj.sections);mtvn.btg.ads.AdManager.placeAd(a_adParametersObj);}
catch(e){}};this.setServer=function(a_server){try{if(mtvn.btg.config.AdSettings.DoubleClick.enabled&&!mtvn.btg.util.String.isDefined(mtvn.btg.config.AdSettings.DoubleClick.server)){mtvn.btg.config.AdSettings.DoubleClick.server=a_server;}
else if(mtvn.btg.config.AdSettings.International.enabled){mtvn.btg.config.AdSettings.International.server=a_server;}}
catch(e){}};this.setSsl=function(){try{if(mtvn.btg.config.AdSettings.DoubleClick.enabled&&!mtvn.btg.util.String.isDefined(mtvn.btg.config.AdSettings.DoubleClick.ssl)){mtvn.btg.config.AdSettings.DoubleClick.ssl=true;}
else if(mtvn.btg.config.AdSettings.International.enabled){mtvn.btg.config.AdSettings.International.ssl=true;}}
catch(e){}};this.setDefaultContentType=function(a_defaultContentType){try{if(mtvn.btg.config.AdSettings.DoubleClick.enabled&&!mtvn.btg.util.String.isDefined(mtvn.btg.config.AdSettings.DoubleClick.contentType)){mtvn.btg.config.AdSettings.DoubleClick.contentType=a_defaultContentType;}else if(mtvn.btg.config.AdSettings.International.enabled){mtvn.btg.config.AdSettings.International.contentType=a_defaultContentType;}}
catch(e){}};this.setZoneOverride=function(a_zone){try{if(mtvn.btg.config.AdSettings.DoubleClick.enabled&&!mtvn.btg.util.String.isDefined(mtvn.btg.config.AdSettings.DoubleClick.zoneOverride)){mtvn.btg.config.AdSettings.DoubleClick.zoneOverride=a_zone;}else if(mtvn.btg.config.AdSettings.International.enabled){mtvn.btg.config.AdSettings.International.zoneOverride=a_zone;}}
catch(e){}};this.IFrameAds=[];this.placeIFrameAd=function(a_adParametersObj){try{if(typeof(mtvn.btg.globalvars.IS_CODA_ADS_USED)!='undefined')
mtvn.btg.globalvars.IS_CODA_ADS_USED="Bridge methods";var ad=this.getAd(a_adParametersObj);var adReloader=new com.mtvi.util.IFrameReloader(a_adParametersObj.containerId);adReloader.src=ad.getUrl();adReloader.width=ad.getWidth();adReloader.height=ad.getHeight();adReloader.write();if(a_adParametersObj.reloadAd){this.IFrameAds.push(adReloader);}}catch(e){}};this.setReloadInterval=function(num){try{reloadInterval=parseInt(num);mtvn.btg.util.DOM.Events.addListener(window,"load",function(){try{window.setInterval("com.mtvi.ads.AdManager.reloadIFrameAds()",reloadInterval);}catch(e){}});}catch(e){}};this.setAdClass=function(a_class){if(a_class=="InternationalAd"){adType="InternationalAd";}};this.getAdById=function(a_adId){return null;};this.getDartSite=function(){var retVal=null;try{if(mtvn.btg.util.String.isDefined(mtvn.btg.ads.AdManager.data.dartSite)){retVal=mtvn.btg.ads.AdManager.data.dartSite;}}
catch(e){try{retVal=mtvn.btg.config.AdSettings.DoubleClick.dartSite;}
catch(e){}}
return retVal;};this.getAd=function(a_adParametersObj){var retVal=null;try{retVal=mtvn.btg.ads.AdManager.getAd(a_adParametersObj);}
catch(e){}
return retVal;};this.getReloadInterval=function(){try{return reloadInterval;}catch(e){}};this.reloadIFrameAds=function(){for(var x=0,len=this.IFrameAds.length;x<len;x++){this.reloadIFrameAd(x);}};this.reloadIFrameAd=function(index){var src=this.IFrameAds[index].src;if(index==0)ord=Math.random(100000000000000000,999999999999999999);if(src.indexOf("ord=")>-1){src=src.split("ord=")[0]+"ord="+ord+"?";}
this.IFrameAds[index].src=src;this.IFrameAds[index].reload();};this.setZone=function(zone){};this.getNewAd=function(adObject){};this.populateNamesValuesObj=function(nameValues){};}
com.mtvi.ads.DoubleClickAd=function(params){};com.mtvi.ads.DoubleClickAd.prototype={setZoneOverride:function(str){},setDartSite:function(str){},setOrd:function(num){},placeAd:function(){},getXml:function(){return null;},getJson:function(){return null;},getUrl:function(){return null;},getSections:function(){return null;},setSize:function(str){},setSections:function(str){},setContentType:function(str){},setKeyValues:function(str){},setTile:function(num){},setPositionThreshold:function(num){},setServer:function(str){},setSsl:function(){},setMediaType:function(str){},setPosition:function(str){},setPartner:function(str){},setId:function(str){}};com.mtvi.reporting.FluxWidgeted={setVars:function(){return true;}};com.mtvi.reporting.GoogleAnalytics={makeCall:function(id,uri){return true;}};com.mtvi.reporting.QuantCast=new function(){this.sendQuantCastCall=function(a_labels){return true;};};com.mtvi.reporting.Search={setVars:function(obj){return true;},sendLinkEvent:function(obj){return true;},setConversion:function(){return true;},setSynConversion:function(){return true;}};com.mtvi.util={toObject:function(string,delimiter){var delimiter=delimiter?delimiter:',';var array=string.split(delimiter);var object={};for(var x=0,len=array.length;x<len;x++){var pairs=array[x].split('=');object[pairs[0]]=pairs[1];}
return object;},queryStringToHash:function(string){return mtvn.btg.util.String.queryStringToObject(string);},isDefined:function(value){return mtvn.btg.util.String.isDefined(value);},readCookie:function(name){return mtvn.btg.util.Cookie.read(name);},deleteCookie:function(name){mtvn.btg.util.Cookie.remove(name);},crawlNodes:function(node){return mtvn.btg.util.Window.getNodeLinkName(node);},addOnloadEvent:function(func){return mtvn.btg.util.DOM.Events.addListener(window,"load",func);}}
com.mtvi.reporting.ComScore=new function(){this.sendComScoreCall=function(){}};com.mtvi.metadata={getDefaultPageName:function(){var pageName='';try{pageName=mtvn.btg.config.ReportSettings.defaultPageName;if(pageName.lastIndexOf("/")==(pageName.length-1)){if(mtvn.btg.util.String.isDefined(mtvn.btg.config.ReportSettings.indexFileName)){pageName+=mtvn.btg.config.ReportSettings.indexFileName;}
else{pageName=(pageName!='/')?mtvn.btg.util.String.charRtrim(pageName,'/'):pageName;}}
if(pageName!='/'){pageName=mtvn.btg.util.String.charRtrim(pageName,'/');}
if(pageName!='/'&&pageName.indexOf('/')==0){pageName=pageName.substring(1);}
if(pageName.indexOf('/')==-1&&pageName.indexOf(mtvn.btg.config.ReportSettings.indexFileName)!=-1){pageName='home/'+pageName;}}
catch(e){return null;}
return pageName;},getDefaultHierarchy:function(){try{var hier=this.getDefaultPageName();if(hier=='/')hier='';}
catch(e){return null;}
return hier;},getDefaultChannel:function(){try{var channel=this.getDefaultPageName();if(channel!='/')
channel=channel.split('/')[0];}
catch(e){return null;}
return channel;}};com.mtvi.util.IFrameReloader=function(containerId){try{this.containerId=containerId;this.id="IFrameReloader"+Math.random(0,1000000);this.width;this.height;this.src;this.lastLoaded=0;}catch(e){}};com.mtvi.util.IFrameReloader.prototype={reload:function(){try{var date=new Date();var now=(date.getMinutes()*60000)+(date.getSeconds()*1000);var elapsed=now-this.lastLoaded;if(elapsed>5000){var n=document.getElementById(this.containerId);var i=document.createElement("iframe");i.id=this.id;i.width=this.width;i.height=this.height;i.style.width=this.width;i.style.height=this.height;i.src=this.src;i.frameBorder="0";i.scrolling="no";i.marginheight="0";i.marginwidth="0";i.style.margin="0";i.style.zIndex="99";i.style.border="0";i.style.borderWidth="0px";n.removeChild(document.getElementById(this.id));n.appendChild(i);}
this.lastLoaded=now;}catch(e){}},write:function(){try{var html='<iframe id="'+this.id+'" src="'+this.src+'" width="'+this.width+'" height="'+this.height+'" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"><\/iframe>';if(mtvn.btg.globalvars.IS_TOP_ACCESSIBLE&&mtvn.btg.util.String.queryStringToObject(top.location.search).mockupMode=='true'){html=mtvn.btg.util.String.mockItUp(html);}
document.write(html);}catch(e){}}};mtvn.btg.html5.ads.AdGuiControl=function(player)
{this.btgAL=mtvn.btg.html5.ads.AdLoader;this.player=player;this.view=document.createElement("div");this.view.id="adControlsView";this.view.innerHTML='<div id="adPlayPause" class="icon paused"></div>'+'<div id="adProgress">'+'<div id="adTimeDisplay">'+'<span id="adCurrentTimeDisplay">0:00</span> / <span id="adDurationDisplay">0:00</span>'+'</div>'+'<div id="adProgressBar">'+'<div id="adBufferFill"></div>'+'<div id="adProgressFill"></div>'+'</div>'+'<div id="adScrubber" class="icon scrubber"><div id="adScrubberTime" class="scrubberTimeClosed"></div></div>'+'</div>'+'<div id="adFullPageButton" class="icon"></div>';this.player.view.appendChild(this.view);this.availableWidth=0;this.width=0;this.height=0;this.playPause;this.progressBar;this.progressFill;this.currentTimeDisplay;this.durationDisplay;this.bufferFill;this.scrubber;this.cuepointView;this.scrubbing=false;this.scrubberTime;this.startX=0;this.visible=false;}
mtvn.btg.html5.ads.AdGuiControl.prototype.init=function()
{var self=this;window.addEventListener("resize",function(event){self.setSize(window.innerWidth,window.innerHeight);});this.currentTimeDisplay=document.getElementById("adCurrentTimeDisplay");this.durationDisplay=document.getElementById("adDurationDisplay");this.progressBar=document.getElementById("adProgressBar");this.progressBar.controls=this;this.progressFill=document.getElementById("adProgressFill");this.bufferFill=document.getElementById("adBufferFill");this.scrubber=document.getElementById("adScrubber");this.scrubberTime=document.getElementById("adScrubberTime");this.playPause=document.getElementById("adPlayPause");this.playPause.addEventListener('click',function(){self.player.togglePlayPause();});var down=(this.btgAL.isTouchDevice())?"touchstart":"mousedown";var up=(this.btgAL.isTouchDevice())?"touchend":"mouseup";this.playPause.addEventListener(down,function(){self.setPlayingState(self.playing,true);});this.playPause.addEventListener(up,function(){self.setPlayingState(self.playing,false);});this.setSize(window.innerWidth,window.innerHeight);this.updateUI();document.getElementById("adFullPageButton").addEventListener('click',function(){self.toggleFullScreen();});}
mtvn.btg.html5.ads.AdGuiControl.prototype.stopHideCheck=function(){clearTimeout(mtvn.btg.html5.ads.AdLoader.control.hideInterval);}
mtvn.btg.html5.ads.AdGuiControl.prototype.hideCheck=function()
{this.btgAL.control.stopHideCheck();mtvn.btg.html5.ads.AdLoader.control.hideInterval=setTimeout(function()
{mtvn.btg.html5.ads.AdLoader.timeDispDiv.className="occupyFull";mtvn.btg.html5.ads.AdLoader.control.hide();},5000);}
mtvn.btg.html5.ads.AdGuiControl.prototype.setSize=function(width,height)
{this.width=width;this.height=height;this.view.style.width=width+"px";this.updateUI();}
mtvn.btg.html5.ads.AdGuiControl.prototype.setPlayingState=function(playing,over)
{var player=this.btgAL.html5Player;var control=this;control.playing=playing;var overClass=(over)?"Over":"";if(!playing){control.playPause.className="icon playing"+overClass;player.overlays["playIcon"].hide();}
else{control.playPause.className="icon paused"+overClass;player.overlays["playIcon"].show();}}
mtvn.btg.html5.ads.AdGuiControl.prototype.hide=function()
{this.btgAL.control.visible=false;this.btgAL.control.view.className="adControlsClosed";}
mtvn.btg.html5.ads.AdGuiControl.prototype.show=function()
{this.btgAL.control.visible=true;this.btgAL.control.view.className="adControlsOpen";}
mtvn.btg.html5.ads.AdGuiControl.prototype.toggle=function()
{if(!this.btgAL.control.visible){this.btgAL.control.show();}
else{this.btgAL.control.hide();}}
mtvn.btg.html5.ads.AdGuiControl.prototype.updateTime=function()
{var self=this.btgAL.html5Player.video;this.btgAL.control.currentTimeDisplay.innerHTML=this.btgAL.formatDuration((isNaN(self.currentTime)?0:self.currentTime));this.btgAL.control.durationDisplay.innerHTML=this.btgAL.formatDuration((isNaN(self.duration)?0:self.duration));this.btgAL.control.scrubberTime.innerHTML=this.btgAL.formatDuration((isNaN(self.currentTime)?0:self.currentTime));this.btgAL.control.progressFill.style.width=this.btgAL.control.scrubber.style.left=(self.currentTime/self.duration*100)+"%";}
mtvn.btg.html5.ads.AdGuiControl.prototype.updateUI=function()
{this.updateProgress();}
mtvn.btg.html5.ads.AdGuiControl.prototype.updateProgress=function()
{this.availableWidth=(this.width-72-75);this.progressBar.style.width=this.availableWidth+"px";}
mtvn.btg.html5.ads.AdGuiControl.prototype.toggleFullScreen=function()
{this.player.toggleFullScreen();this.player.dispatchEvent(new Event(Player.FULL_SCREEN));parent.postMessage(new Event(Player.FULL_SCREEN,this.player.fullScreen),"*");}
mtvn.btg.html5.ads.AdLoader={btgU:mtvn.btg.util,btgAds:mtvn.btg.html5.ads,_TIME_LAST_AD_STOPPED_COOKIE:"mtvn_btg_timeSinceLastAdCookie",minTimeBtwAds:90,isFWReady:false,isPlayerReady:false,fwAdManager:null,html5Player:null,FW_URL:"https://web.archive.org/web/20110912044651/http://140cc.v.fwmrm.net/ad/g/1?nw={0}&prof={0}:{1}&flag=+sltp+exvt+slcb+unka+unks;",fwResponse:null,adCompleted:false,adRequested:false,beginAd:false,isAdPlaying:false,failSafeTimer:null,adTimer:0,adTimerObj:null,adDuration:0,timeDispDiv:null,control:null,config:{},init:function(playerObj){var reporter=mtvn.btg.html5.reporting;this.FW_URL="http"+('https:'==document.location.protocol?"s":"")+"://140cc.v.fwmrm.net/ad/g/1?nw={0}&prof={0}:{1}&flag=+sltp+exvt+slcb+unka+unks;";this.html5Player=playerObj;this.minTimeBtwAds=reporter.MetaDataVO.vo.FreeWheel.minTimeBtwAds;this.config.assetId=reporter.MetaDataVO.vo.FreeWheel.assetId;this.config.siteSection=reporter.MetaDataVO.vo.FreeWheel.siteSection;if(!this.btgU.String.isDefined(this.config.siteSection)){new this.btgU.Alert("Freewheel ad error because SID is empty for "+reporter.MetaDataVO.vo.referrer,0);return false;}
this.config.networkId=reporter.MetaDataVO.vo.FreeWheel.networkId;this.config.profileId=reporter.MetaDataVO.vo.FreeWheel.profileId;this.config.displayBase=reporter.MetaDataVO.vo.FreeWheel.displayBase;this.config.duration=this.html5Player.episode.duration;this.adRequested=true;this.timeDispDiv=document.createElement("div");this.controls=document.createElement("div");this.requestAd();},setFWReady:function(e){var self=mtvn.btg.html5.ads.AdLoader.btgAds.AdLoader;self.isFWReady=true;self.fwResponse=e.response;if(self.beginAd){self.playAd();}},hideOverlay:function(){if(this.html5Player.overlays["waitingIcon"])this.html5Player.overlays["waitingIcon"].hide();if(this.html5Player.overlays["playIcon"])this.html5Player.overlays["playIcon"].hide();this.html5Player.overlayContainer.style.display='none';this.html5Player.controls.hide();this.html5Player.shareBar.hide();},showOverlay:function(id){this.html5Player.overlayContainer.style.display='block';if(id)
this.html5Player.overlays[id].show();},isItTimeForAd:function(){var self=this.btgAds.AdLoader;if(!self.isOkToPlayAd())return false;self.failSafeForcePlay();if(self.isFWReady&&!self.adCompleted){self.playAd();return true;}
else if(self.adRequested&&!self.adCompleted){self.beginAd=true;return"wait";}
self.failSafeForcePlay(true);return false;},failSafeForcePlay:function(reset){var self=this.btgAds.AdLoader;if(!reset){if(self.failSafeTimer==null)
self.failSafeTimer=setTimeout("mtvn.btg.html5.ads.AdLoader.postAdHandler('failsafe')",20000);}else{clearTimeout(self.failSafeTimer);self.failSafeTimer=null;}},requestAd:function(){if(!mtvn.btg.html5.reporting.MetaDataVO.vo.FreeWheel.enabled){this.btgAds.AdLoader.adRequested=false;return;}
try{this.fwAdManager=new tv.freewheel.SDK.AdManager();this.fwAdManager.registerVideoDisplayBase(this.config.displayBase);this.fwAdManager.setVideoAsset(this.config.assetId,this.config.duration);this.fwAdManager.setSiteSection(this.config.siteSection);this.fwAdManager.setServerURL(this.FW_URL.replace(/\{0\}/g,this.config.networkId).replace(/\{1\}/g,this.config.profileId));this.fwAdManager.submitRequest(this.setFWReady,5000);}catch(e){new this.btgU.Alert("Error retrieving Freewheel Ad via mtvn.btg.html5.ads.AdLoader.requestAd. "+e.message);}},playAd:function(adType){var self=this.btgAds.AdLoader;if(!self.isFWReady)return;self.preAdHandler();switch(adType){case"preroll":this.fwAdManager.playSlots(tv.freewheel.SDK.TIME_POSITION_CLASS_PREROLL,self.postAdHandler);break;case"postroll":this.fwAdManager.playSlots(tv.freewheel.SDK.TIME_POSITION_CLASS_POSTROLL,self.postAdHandler);break;case"overlay":this.fwAdManager.playSlots(tv.freewheel.SDK.TIME_POSITION_CLASS_OVERLAY,self.postAdHandler);break;default:this.fwAdManager.playSlots(tv.freewheel.SDK.TIME_POSITION_CLASS_PREROLL,self.postAdHandler);break;}},preAdHandler:function(){var self=mtvn.btg.html5.ads.AdLoader;var player=self.html5Player.video;self.isAdPlaying=true;self.hideOverlay();self.createOverlay();player.addEventListener("play",mtvn.btg.html5.reporting.Reporter.onPlay);player.addEventListener("play",self.onPlay);player.addEventListener("playing",self.onPlaying);player.addEventListener("timeupdate",self.updateAdTimer);player.addEventListener("pause",self.onPause);player.addEventListener("waiting",self.onWait);},postAdHandler:function(failsafe){var self=mtvn.btg.html5.ads.AdLoader;self.setTimeLastAdStopped();var player=self.html5Player.video;if(typeof failsafe!='undefined')
new this.btgU.Alert("Error retrieving Freewheel Ad via mtvn.btg.html5.ads.AdLoader.postAdHandler. Fail safe method triggered.");player.removeEventListener("play",mtvn.btg.html5.reporting.Reporter.onPlay);player.removeEventListener("play",self.onPlay);player.removeEventListener("playing",self.onPlaying);player.removeEventListener("timeupdate",self.updateAdTimer);player.removeEventListener("pause",self.onPause);player.removeEventListener("waiting",self.onWait);self.isAdPlaying=false;self.adCompleted=true;self.hideOverlay();self.timeDispDiv.style.display='none';self.html5Player.play();self.showOverlay();if(self.control!=null)self.control.hide();},setTimeLastAdStopped:function(){var now=(new Date()).getTime();this.btgU.Cookie.set(this._TIME_LAST_AD_STOPPED_COOKIE,now);},getTimeSinceLastAd:function(){var timeLastAdStopped=this.btgU.Cookie.read(this._TIME_LAST_AD_STOPPED_COOKIE);if(!timeLastAdStopped||isNaN(parseInt(timeLastAdStopped)))return this.minTimeBtwAds+1;var now=(new Date()).getTime();return(now-timeLastAdStopped)/1000;},isOkToPlayAd:function(){return this.getTimeSinceLastAd()>this.minTimeBtwAds;},updateAdTimer:function(e){var self=mtvn.btg.html5.ads.AdLoader;if(self.html5Player.video.duration>0){self.setAdDuration();self.failSafeForcePlay(true);self.adTimer=Math.floor(self.html5Player.video.currentTime);self.updateTimeDisplay();}},stopAdTimer:function(){this.btgAds.AdLoader.hideOverlay();},updateTimeDisplay:function(){var self=this.btgAds.AdLoader;if(self.control==null){self.setControls();self.control.show();self.control.hideCheck();self.control.setPlayingState(false,false);}
self.timeDispDiv.innerHTML='<p class="adTimeLable">Content will resume '+self.formatDuration(self.adDuration-self.adTimer)+'</p>';self.control.updateTime();},createOverlay:function(){var self=this.btgAds.AdLoader;self.timeDispDiv.style.display='block';self.timeDispDiv.id="adTimeDisp";self.timeDispDiv.addEventListener(((self.isTouchDevice())?"touchend":"mouseup"),function(){self.control.hideCheck();if(self.timeDispDiv.className=="occupyFull")
self.control.show();self.timeDispDiv.className="occupyEmpty";});self.html5Player.view.appendChild(self.timeDispDiv);},setAdDuration:function(adType){try{this.adDuration=Math.floor(this.btgAds.AdLoader.html5Player.video.duration);}
catch(e){this.adDuration=0;return this.adDuration;}
return this.adDuration;},formatDuration:function(duration){if(duration>0&&duration<60)
return"00:"+(duration<10?"0":"")+Math.floor(duration);else if(duration>59)
return"0"+Math.floor(x/60)+":"+((duration%60).toString().length<2?"0":"")+(Math.floor(duration)%60);else
return"00:00";},setControls:function(){this.control=new this.btgAds.AdGuiControl(this.html5Player);this.control.init();},isTouchDevice:function()
{try
{document.createEvent("TouchEvent");return true;}
catch(e)
{return false;}},onWait:function(){mtvn.btg.html5.ads.AdLoader.btgAds.AdLoader.showOverlay('waitingIcon');},onPlay:function(){var self=mtvn.btg.html5.ads.AdLoader;self.hideOverlay();if(self.control!=null){self.control.setPlayingState(false,false);self.control.hideCheck();}},onPlaying:function(){var self=mtvn.btg.html5.ads.AdLoader;self.hideOverlay();},onPause:function(){var self=mtvn.btg.html5.ads.AdLoader;setTimeout("mtvn.btg.html5.ads.AdLoader.showOverlay('playIcon')",500);self.control.setPlayingState(true,false);self.control.stopHideCheck();},onError:function(){}}
mtvn.btg.html5.ads.AdManager=new function(){try{mtvn.btg.util.DOM.loadScript("http"+('https:'==document.location.protocol?"s":"")+"://btg.mtvnservices.com/aria/fwadmanager.js");}catch(e){}
this.init=function(playerObj){var _btgAds=mtvn.btg.html5.ads;_btgAds.AdLoader.init(playerObj);_btgAds.EventMediator.playerLoad(playerObj);}}
mtvn.btg.html5.ads.EventMediator={playerObj:null,playerLoad:function(object){this.playerObj=object;if(this.playerObj&&this.playerObj.addEventListener){this.playerObj.addEventListener('ON_ERROR',mtvn.btg.html5.ads.AdLoader.onError);}}}
mtvn.btg.html5.reporting.EventMediator={playerObj:null,playerLoad:function(object){this.playerObj=object;if(this.playerObj&&this.playerObj.addEventListener){mtvn.btg.html5.reporting.Reporter.onLoad();this.playerObj.addEventListener('PLAY',mtvn.btg.html5.reporting.Reporter.onPlay);this.playerObj.addEventListener('PLAYING',mtvn.btg.html5.reporting.Reporter.onPlaying);this.playerObj.addEventListener('PAUSE',mtvn.btg.html5.reporting.Reporter.onPause);this.playerObj.addEventListener('SEEK',mtvn.btg.html5.reporting.Reporter.onSeek);this.playerObj.addEventListener('END',mtvn.btg.html5.reporting.Reporter.onEnd);this.playerObj.addEventListener('RESIZE',mtvn.btg.html5.reporting.Reporter.onResize);this.playerObj.addEventListener('ERROR',mtvn.btg.html5.reporting.Reporter.onError);}}}
mtvn.btg.html5.reporting.MetaDataVO={btgIsStr:mtvn.btg.util.String.isDefined,btgGv:mtvn.btg.globalvars,btgHtml5Rep:mtvn.btg.html5.reporting,vo:{MetaData:{},Omniture:{enabled:"",account:"",metadata:""},ComScore:{primaryId:"",producerId:"",locationId:"",genreId:"",playerUrl:"",videoTitle:"",referrer:""},Nielsen:{clientId:"",videoCensusId:""},QuantCast:{publisherId:""},FreeWheel:{enabled:true,networkId:82125,profileId:"MTVN_Live_HTML5",assetId:"html5_video",siteSection:"",displayBase:"playerView",minTimeBtwAds:90}},configJson:{},mediagen:{},html5Player:null,init:function(playerObj){this.html5Player=playerObj;reportSettings=this.configJson.reportSettings;this.setMetadata();this.vo.referrer=(this.btgIsStr(this.configJson.referrer)?this.configJson.referrer:(this.btgGv.IS_TOP_ACCESSIBLE?top.location.host:false));metadata=this.btgHtml5Rep.MetaDataVO.vo.MetaData;if(metadata.item.length>1){this.vo.FreeWheel.assetId=metadata.item[0].group["playlist_uri"];}else
this.vo.FreeWheel.assetId=metadata.item[this.html5Player.currentIndex].guid;OmnitureVO=reportSettings.videoReporter;comscoreVO=reportSettings.comScore;quantcastVO=reportSettings.quantCast;nilesenVO=reportSettings.nielsenReporter;freewheelVO={};freewheelVO.enabled=(this.btgIsStr(this.configJson.freeWheel)&&typeof this.configJson.freeWheel.enabled=='boolean'?this.configJson.freeWheel.enabled:this.vo.FreeWheel.enabled);freewheelVO.assetId=(this.btgIsStr(this.configJson.freeWheel)&&this.btgIsStr(this.configJson.freeWheel.assetId)?this.configJson.freeWheel.assetId:this.vo.FreeWheel.assetId);freewheelVO.siteSection=(this.btgIsStr(this.configJson.freeWheel)&&this.btgIsStr(this.configJson.freeWheel.siteSection)?this.configJson.freeWheel.siteSection:this.vo.FreeWheel.siteSection);freewheelVO.networkId=(this.btgIsStr(this.configJson.freeWheel)&&this.btgIsStr(this.configJson.freeWheel.networkId)?this.configJson.freeWheel.networkId:this.vo.FreeWheel.networkId);freewheelVO.profileId=(this.btgIsStr(this.configJson.freeWheel)&&this.btgIsStr(this.configJson.freeWheel.profileId)?this.configJson.freeWheel.profileId:this.vo.FreeWheel.profileId);freewheelVO.displayBase=(this.btgIsStr(this.configJson.freeWheel)&&this.btgIsStr(this.configJson.freeWheel.displayBase)?this.configJson.freeWheel.displayBase:this.vo.FreeWheel.displayBase);freewheelVO.minTimeBtwAds=(this.btgIsStr(this.configJson.freeWheel)&&this.btgIsStr(this.configJson.freeWheel.minTimeBtwAds)?this.configJson.freeWheel.minTimeBtwAds:this.vo.FreeWheel.minTimeBtwAds);if(OmnitureVO){this.vo.Omniture.enabled=(OmnitureVO["enabled"].toString()==="true");this.vo.Omniture.account=OmnitureVO.networkAccount;(OmnitureVO.dataCenter&&OmnitureVO.dataCenter.length!="false")?this.vo.Omniture.dataCenter=OmnitureVO.dataCenter:this.vo.Omniture.dataCenter="2o7";this.vo.Omniture.metadata=metadata;}
this.vo.FreeWheel.enabled=freewheelVO.enabled;this.vo.FreeWheel.networkId=freewheelVO.networkId;this.vo.FreeWheel.profileId=freewheelVO.profileId;this.vo.FreeWheel.assetId=freewheelVO.assetId;this.vo.FreeWheel.siteSection=freewheelVO.siteSection;this.vo.FreeWheel.minTimeBtwAds=freewheelVO.minTimeBtwAds;if(comscoreVO){this.vo.ComScore.enabled=false;this.vo.ComScore.primaryId=comscoreVO.primaryId;this.vo.ComScore.producerId=(this.btgIsStr(comscoreVO.producerId)?comscoreVO.producerId:"");this.vo.ComScore.locationId=(this.btgIsStr(comscoreVO.locationId)?comscoreVO.locationId:"");this.vo.ComScore.genreId=(this.btgIsStr(comscoreVO.genreId)?comscoreVO.genreId:"");this.vo.ComScore.playerUrl=(location.protocol+'//'+location.host+location.pathname);this.vo.ComScore.referrer=(this.btgIsStr(this.configJson.referrer)?this.configJson.referrer:(this.btgGv.IS_TOP_ACCESSIBLE?top.location.host:false));}
if(nilesenVO){this.vo.Nielsen.enabled=false;this.vo.Nielsen.clientId=nilesenVO.clientId;this.vo.Nielsen.videoCensusId=nilesenVO.videoCensusId;this.vo.Nielsen.title="";this.vo.Nielsen.streamUrl="";}
if(quantcastVO){this.vo.QuantCast.enabled=false;this.vo.QuantCast.demoTargeting=(quantcastVO.demoTargeting["enabled"].toString()==="true");this.vo.QuantCast.publisherId=quantcastVO.publisherId;this.vo.QuantCast.videoId="";this.vo.QuantCast.title="";this.vo.QuantCast.videoUrl="";this.vo.QuantCast.embedUrl="";this.vo.QuantCast.duration="";}
if(typeof metadata.item.length=='undefined'){this.btgHtml5Rep.MetaDataVO.vo.MetaData.item[0].adUrl=metadata.item.adContent;}else{var i=0;for(var item in metadata.item){this.btgHtml5Rep.MetaDataVO.vo.MetaData.item[i++].adUrl=item.adContent;}}},setMetadata:function(){var metadata={};var episode=this.html5Player.episode;metadata.feed=episode.feed;metadata.title=episode.title;metadata.description=episode.description;metadata.duration=episode.duration;metadata.currentSegment=episode.currentSegment;metadata.item=new Array();for(var i=0,len=this.html5Player.episode.segments.length;i<len;i++)
{var segment=this.html5Player.episode.segments[i];metadata.item[i]={};for(var key in segment){if(key=="metadata"){metadata.item[i].group={};for(var k in segment.metadata)
metadata.item[i].group[k]=segment.metadata[k];for(var j in segment.metadata.category)
if(!metadata.item[i].group[j]||metadata.item[i].group[j]!="")
metadata.item[i].group[j]=segment.metadata.category[j];}
else if(key!="overlays"&&key!="beacons")
metadata.item[i][key]=segment[key];}}
this.btgHtml5Rep.MetaDataVO.vo.MetaData=metadata;}}
mtvn.btg.html5.reporting.Reporter={btgHtml5Rep:mtvn.btg.html5.reporting,hasNielsen:false,hasComScore:false,hasQuantCast:false,hasOmniture:false,config:mtvn.btg.html5.reporting.MetaDataVO.vo,error:"",html5Player:null,init:function(playerObj){this.html5Player=playerObj;var isConfigDefined=mtvn.btg.util.Object.isConfigDefined;if(isConfigDefined(this.config.ComScore))
this.hasComScore=true;if(isConfigDefined(this.config.Nielsen))
this.hasNielsen=true;if(isConfigDefined(this.config.QuantCast))
this.hasQuantCast=true;if(isConfigDefined(this.config.Omniture))
this.hasOmniture=true;},onLoad:function(data){var self=mtvn.btg.html5.reporting;data=self.Reporter.setData();if(self.Reporter.hasNielsen)
self.Nielsen.sendCall('ON_LOAD',data);if(self.Reporter.hasComScore)
self.ComScore.sendCall('ON_LOAD',data);if(self.Reporter.hasQuantCast)
self.QuantCast.sendCall('ON_LOAD',data);if(self.Reporter.hasOmniture)
self.Omniture.sendCall('ON_LOAD',data);self.Labels.sendCall('ON_LOAD',data);},onPlay:function(data){},onPlaying:function(data){var self=mtvn.btg.html5.reporting;data=self.Reporter.setData();if(self.Reporter.hasNielsen)
self.Nielsen.sendCall('ON_PLAY',data);if(self.Reporter.hasComScore)
self.ComScore.sendCall('ON_PLAY',data);if(self.Reporter.hasQuantCast)
self.QuantCast.sendCall('ON_PLAY',data);if(self.Reporter.hasOmniture)
self.Omniture.sendCall('ON_PLAY',data);self.Labels.sendCall('ON_PLAY',data);},onPause:function(data){var self=mtvn.btg.html5.reporting;data=self.Reporter.setData();if(self.Reporter.hasNielsen)
self.Nielsen.sendCall('ON_PAUSE',data);if(self.Reporter.hasComScore)
self.ComScore.sendCall('ON_PAUSE',data);if(self.Reporter.hasQuantCast)
self.QuantCast.sendCall('ON_PAUSE',data);if(self.Reporter.hasOmniture)
self.Omniture.sendCall('ON_PAUSE',data);self.Labels.sendCall('ON_PAUSE',data);},onSeek:function(data){var self=mtvn.btg.html5.reporting;data=self.Reporter.setData();if(self.Reporter.hasNielsen)
self.Nielsen.sendCall('ON_SEEK',data);if(self.Reporter.hasComScore)
self.ComScore.sendCall('ON_SEEK',data);if(self.Reporter.hasQuantCast)
self.QuantCast.sendCall('ON_SEEK',data);if(self.Reporter.hasOmniture)
self.Omniture.sendCall('ON_SEEK',data);self.Labels.sendCall('ON_SEEK',data);},onResize:function(data){var self=mtvn.btg.html5.reporting;data=self.Reporter.setData();if(self.Reporter.hasNielsen)
self.Nielsen.sendCall('ON_RESIZE',data);if(self.Reporter.hasComScore)
self.ComScore.sendCall('ON_RESIZE',data);if(self.Reporter.hasQuantCast)
self.QuantCast.sendCall('ON_RESIZE',data);if(self.Reporter.hasOmniture)
self.Omniture.sendCall('ON_RESIZE',data);},onEnd:function(data){var self=mtvn.btg.html5.reporting;data=self.Reporter.setData();if(self.Reporter.hasNielsen)
self.Nielsen.sendCall('ON_END',data);if(self.Reporter.hasComScore)
self.ComScore.sendCall('ON_END',data);if(self.Reporter.hasQuantCast)
self.QuantCast.sendCall('ON_END',data);if(self.Reporter.hasOmniture)
self.Omniture.sendCall('ON_END',data);self.Labels.sendCall('ON_END',data);},onError:function(data){var self=mtvn.btg.html5.reporting;var error=(data&&data.data?data.data.msg:"");if(error!=""&&(self.error!=error)){self.error=error;new mtvn.btg.util.Alert(error);}
if(self.Reporter.hasNielsen)
self.Nielsen.sendCall('ON_ERROR',data);if(self.Reporter.hasComScore)
self.ComScore.sendCall('ON_ERROR',data);if(self.Reporter.hasQuantCast)
self.QuantCast.sendCall('ON_ERROR',data);if(self.Reporter.hasOmniture)
self.Omniture.sendCall('ON_ERROR',data);self.Labels.sendCall('ON_ERROR',data);},setData:function(){if(typeof this.btgHtml5Rep.Reporter.html5Player!='undefined'&&this.btgHtml5Rep.Reporter.html5Player!=null){var data=this.btgHtml5Rep.Reporter.html5Player.episode.segments[this.btgHtml5Rep.Reporter.html5Player.currentIndex];data.index=this.btgHtml5Rep.Reporter.html5Player.currentIndex;if(mtvn.btg.html5.ads.AdLoader.isAdPlaying)
data.isAd=true;else
data.isAd=false;return data;}else return{};}}
mtvn.btg.html5.reporting.ReportingManager=new function(){var config;this.init=function(playerObj){var _btgRep=mtvn.btg.html5.reporting;_btgRep.MetaDataVO.init(playerObj);_btgRep.Reporter.init(playerObj);_btgRep.EventMediator.playerLoad(playerObj);}}
mtvn.btg.html5.reporting.ComScore={sendCall:function(_event,_data){if(_event!="ON_PLAY")return;var vo=mtvn.btg.html5.reporting.MetaDataVO.vo;var _beacon_url=(document.location.protocol=='https:'?'https://web.archive.org/web/20110912044651/https://sb':'http://b')+"b.scorecardresearch.com/beacon.js";var _beacon_data={c1:1,c2:vo.ComScore.primaryId,c3:vo.ComScore.producerId,c4:vo.ComScore.locationId,c5:vo.ComScore.genreId,c6:'',c7:vo.playerURL,c8:_data.isAd?"VIDEO_AD":_data.title,c9:vo.ComScore.referrer?vo.ComScore.referrer:"NO_REF"}
var _beacon=new mtvn.btg.util.Beacon(_beacon_url);_beacon.setData(_beacon_data);_beacon.send();}};mtvn.btg.html5.reporting.Labels=new function(){var _btgU=mtvn.btg.util;var _btgIsObj=_btgU.Object.isDefined;var curTimePlayed=0;var prevTimePlayed=0;var timerObj=null;var playStarted;var previousType="none";var currentType="none";var labelsBeaconHost="viamtvnvideo.112.2o7.net";var mediagen;var beaconsArray=[];var doneCounter=0;var labelBeacons=[];var initCalled=false;this.init=function(a_data){var _isStr=_btgU.String.isDefined;currentType=(_btgIsObj(a_data)&&a_data.isAd===true)?"ad":"notAd";mediagen=mtvn.btg.html5.reporting.MetaDataVO.configJson.mediagen;try{if(typeof(mediagen)!="undefined"){beaconsArray=mediagen.video.item[0].beacons.beacon;}}
catch(e){}
for(var i=0,len=beaconsArray.length;i<len;i++){var url=beaconsArray[i].url;if(_isStr(url)&&url.indexOf(labelsBeaconHost)>-1){var timeToFire=parseInt(beaconsArray[i].elapsed);if(!isNaN(timeToFire)){var eaa=beaconsArray[i].elapsedAfterAd;var shouldFire=false;if(!_isStr(eaa)){shouldFire=true;}
else if((currentType=="ad"&&eaa=="true")||(currentType!="ad"&&eaa=="false")){shouldFire=true;}
if(shouldFire===true){var rnd=_btgU.Math.random(1000000,9999999);url=url.replace("{ord}",rnd);labelBeacons[labelBeacons.length]={"url":url,"timeToFire":timeToFire,"enabled":true};}}}}};this.sendCall=function(a_event,a_data){if(a_event=="ON_PLAY"){if(!initCalled){this.init(a_data);initCalled=true;}
if(_btgIsObj(a_data)&&a_data.isAd!=true){this.startTimer();}}
else if(a_event=="ON_PAUSE"||a_event=="ON_SEEK"||a_event=="ON_ERROR"||a_event=="ON_END"){this.stopTimer();}};this.checkTime=function(){var playNow=new Date().getTime();curTimePlayed=parseInt(playNow)-parseInt(playStarted);var totalTimePlayed=parseInt((parseInt(prevTimePlayed)+parseInt(curTimePlayed))/1000);for(var i=0,len=labelBeacons.length;i<len;i++){if((totalTimePlayed>=labelBeacons[i].timeToFire)&&labelBeacons[i].enabled==true){labelBeacons[i].enabled=false;doneCounter++;var beacon=new _btgU.Beacon(labelBeacons[i].url);beacon.send();}}
if(doneCounter>=labelBeacons.length){this.stopTimer();}};this.startTimer=function(){this.stopTimer();playStarted=new Date().getTime();var tmpObj=this;var tmpFunc=function(){tmpObj.checkTime();};timerObj=setInterval(tmpFunc,1000);};this.stopTimer=function(){clearInterval(timerObj);timerObj=null;prevTimePlayed+=parseInt(curTimePlayed);curTimePlayed=0;};};mtvn.btg.html5.reporting.Nielsen={btgIsStr:mtvn.btg.util.String.isDefined,btgIsObj:mtvn.btg.util.Object.isDefined,url:"https://web.archive.org/web/20110912044651/http://secure-us.imrworldwide.com/cgi-bin/m",callData:{},nielsenVo:mtvn.btg.html5.reporting.MetaDataVO.vo.Nielsen,videoRecord:mtvn.btg.html5.reporting.MetaDataVO.vo.VideoRecord,sendCall:function(a_event,a_data){this.callData=a_data;if(this.btgIsStr(a_event)&&a_event.toUpperCase()=="ON_PLAY"){var beaconData=this.getBeaconData();if(this.btgIsStr(beaconData.ci)){var beacon=new mtvn.btg.util.Beacon(this.url);beacon.setData(beaconData);beacon.send();}}},getBeaconData:function(){var retVal={};retVal.ci=this.getClientId();retVal.c6=this.getVideoCensusId();retVal.cc=1;retVal.ou=this.getStreamUrl();retVal.sd=this.getDuration();retVal.tl=this.getVideoTitle();retVal.rnd=new Date().getTime();return retVal;},getDuration:function(){var retVal="";if(this.btgIsObj(this.videoRecord)&&this.btgIsStr(this.videoRecord.duration)){retVal=this.videoRecord.duration;}
return retVal;},getVideoTitle:function(){var retVal="";if(this.btgIsObj(this.callData)&&this.btgIsStr(this.callData.title)){retVal=this.callData.title;}
else if(this.nielsenVo&&this.btgIsStr(this.nielsenVo.title)){retVal=this.nielsenVo.title;}
if(this.btgIsStr(retVal)){retVal="dav0-"+retVal;}
return retVal;},getStreamUrl:function(){var retVal="";if(this.btgIsObj(this.callData)&&this.btgIsStr(this.callData.streamUrl)){retVal=this.callData.streamUrl;}
else if(this.nielsenVo&&this.btgIsStr(this.nielsenVo.streamUrl)){retVal=this.nielsenVo.streamUrl;}
return retVal;},getClientId:function(){var retVal="";if(this.btgIsObj(this.callData)&&this.btgIsStr(this.callData.clientId)){retVal=this.callData.clientId;}
else if(this.nielsenVo&&this.btgIsStr(this.nielsenVo.clientId)){retVal=this.nielsenVo.clientId;}
return retVal;},getVideoCensusId:function(){var retVal="";if(this.btgIsObj(this.callData)&&this.btgIsStr(this.callData.videoCensusId)){retVal=this.callData.videoCensusId;}
else if(this.nielsenVo&&this.btgIsStr(this.nielsenVo.videoCensusId)){retVal=this.nielsenVo.videoCensusId;}
return retVal;}}
mtvn.btg.html5.reporting.Omniture={SegmentPlayed:-1,sendCall:function(_event,_data){var isStr=mtvn.btg.util.String.isDefined;if(_event!="ON_PLAY")return;itemIndex=0;if(_data.isAd)return;if(typeof _data.index!='undefined'&&_data.index!=null)itemIndex=_data.index;if(itemIndex==this.SegmentPlayed){return;}else{this.SegmentPlayed=itemIndex;}
var btgRep=mtvn.btg.html5.reporting;var vo=btgRep.MetaDataVO.vo;var _guid=vo.Omniture.metadata.item[itemIndex].guid;var _guid_parts=vo.Omniture.metadata.item[itemIndex].guid.split(":");var _videoID=_guid_parts[4];var _account=vo.Omniture.account;var _pagename="video/net/"+vo.Omniture.metadata.item[itemIndex].title+"_"+_videoID;var _videoTitle=vo.Omniture.metadata.item[itemIndex].title+"_"+_videoID;var _videoType=vo.Omniture.metadata.item[itemIndex].group.content_type;var _mtvnOwner=vo.Omniture.metadata.item[itemIndex].group.mtvnOwner;var _videoType_title=_videoType+" : "+_videoTitle;var _franchise=vo.Omniture.metadata.item[itemIndex].group.franchise;var _artist=vo.Omniture.metadata.item[itemIndex].group.artist;var _playlist=(isStr(vo.Omniture.metadata.item[itemIndex].group.playlist_title)?vo.Omniture.metadata.item[itemIndex].group.playlist_title:vo.Omniture.metadata.item[itemIndex].title);var _id_franchise_type=_videoID+" : "+_franchise+" : "+_videoType;var _franchise_content_type=_franchise+" : "+_videoType;var _applicationContext=(isStr(btgRep.MetaDataVO.configJson.referrer)?btgRep.MetaDataVO.configJson.referrer:"CONTEXT_UNSET");var _applicationOrig=(isStr(btgRep.MetaDataVO.configJson.orig)?btgRep.MetaDataVO.configJson.orig:"ORIGIN_UNSET");var _applicationName=btgRep.MetaDataVO.configJson.reportSettings.playerInfo.networkPlayerName;var _agreement=vo.Omniture.metadata.item[itemIndex].agreement;var _agreementId=vo.Omniture.metadata.item[itemIndex].group.agreementId;var _isReportable=!(vo.Omniture.metadata.item[itemIndex].group.reportable.toString().toLowerCase()=="false");if(!_isReportable){return;}
var btgOmn=mtvn.btg.config.ReportSettings.Omniture;var _tempPageViewEvent=btgOmn.pageViewEvent;btgOmn.pageViewEvent="";var _omniture=mtvn.btg.reporting.ReportingManager.getOmniture();_omniture.sendPageCall({un:_account,pageName:_pagename,prop1:_agreement,prop3:_agreementId,eVar26:_franchise,eVar27:_mtvnOwner,eVar28:_videoType,eVar29:_artist,eVar30:_applicationContext,eVar31:_applicationName,eVar32:_applicationOrig,eVar33:_videoTitle,eVar34:_playlist,prop35:_id_franchise_type,prop30:_guid,prop36:_franchise,prop38:_mtvnOwner,prop43:_playlist,prop45:_videoType,prop46:_artist,prop47:_applicationContext,prop48:_applicationName,prop49:_applicationOrig,prop50:_videoTitle,events:'event15'});btgOmn.pageViewEvent=_tempPageViewEvent;}};mtvn.btg.html5.reporting.QuantCast={btgGv:mtvn.btg.globalvars,btgIsStr:mtvn.btg.util.String.isDefined,btgStr:mtvn.btg.util.String,btgIsObj:mtvn.btg.util.Object.isDefined,loadQcScripts:function(){try{var elem=document.createElement('script');elem.src=(document.location.protocol=="https:"?"https://web.archive.org/web/20110912044651/https://secure":"https://web.archive.org/web/20110912044651/http://edge")+".quantserve.com/quant.js";elem.async=true;elem.type="text/javascript";var scpt=document.getElementsByTagName('script')[0];scpt.parentNode.insertBefore(elem,scpt);elem=document.createElement('script');elem.src=(document.location.protocol=="https:"?"https://web.archive.org/web/20110912044651/https://secure":"https://web.archive.org/web/20110912044651/http://edge")+".quantserve.com/vquant.js";elem.async=true;elem.type="text/javascript";scpt=document.getElementsByTagName('script')[0];scpt.parentNode.insertBefore(elem,scpt);_qevents=(typeof _qevents!='undefined')||[];_qvideos=(typeof _qvideos!='undefined')||[];}catch(e){};}(),callData:"",qc:mtvn.btg.html5.reporting.MetaDataVO.vo.QuantCast,metaData:mtvn.btg.html5.reporting.MetaDataVO.vo.MetaData,sendCall:function(a_event,a_data){if(a_event=="ON_LOAD"){this.callData=a_data;var qcData={pageURL:(this.btgGv.IS_TOP_ACCESSIBLE)?top.location.href:self.location.href,qacct:this.getPublisherId(),videoId:this.getVideoId(),videoElementId:this.getVideoElementId(),videoTitle:this.getVideoTitle(),videoUrl:this.getVideoUrl(),embedUrl:this.getEmbedUrl(),media:this.getMediaValue(),group:this.getMediaValue(),uri:this.getUri(),labels:this.getLabelsHierarchy()};try{_qvideos.push(qcData);}catch(e){};}},getUri:function(){var retVal="";var currentIndex=parseInt(this.callData.currentItem);if(!isNaN(currentIndex)){var item=this.getItem(currentIndex);if(this.btgIsStr(item.guid)){retVal=item.guid;}}
return retVal;},getPublisherId:function(){var retVal="p-94wNw88f65Rhk";if(this.qc.publisherId&&this.btgIsStr(this.qc.publisherId)){retVal=this.qc.publisherId;}
if(this.callData&&this.btgIsStr(this.callData.publisherId)){retVal=this.callData.publisherId;}
return retVal;},getVideoElementId:function(){var retVal="videoView";if(this.qc.videoElementId&&this.btgIsStr(this.qc.videoElementId)){retVal=this.qc.videoElementId;}
if(this.callData&&this.btgIsStr(this.callData.videoElementId)){retVal=this.callData.videoElementId;}
return retVal;},getVideoId:function(){var retVal="";if(this.qc.videoId&&this.btgIsStr(this.qc.videoId)){retVal=this.qc.videoId;}
if(this.callData&&this.btgIsStr(this.callData.videoId)){retVal=this.callData.videoId;}
return retVal;},getVideoUrl:function(){var retVal="";if(this.qc.videoUrl&&this.btgIsStr(this.qc.videoUrl)){retVal=this.qc.videoUrl;}
if(this.callData&&this.btgIsStr(this.callData.videoUrl)){retVal=this.callData.videoUrl;}
return retVal;},getEmbedUrl:function(){var retVal=(this.btgGv.IS_TOP_ACCESSIBLE)?top.location.hostname:self.location.hostname;if(this.qc.embedUrl&&this.btgIsStr(this.qc.embedUrl)){retVal=this.qc.embedUrl;}
if(this.callData&&this.btgIsStr(this.callData.embedUrl)){retVal=this.callData.embedUrl;}
return retVal;},getMediaValue:function(){var retVal="";if(this.getMediaType()=="contentvideo"){retVal="video";}
else if(this.getMediaType()=="musicvideo"){retVal="music";}
return retVal;},getDartSite:function(){var retVal=this.btgStr.getBetween(this.getAdUrl(),"/pfadx/","/");if(this.callData&&this.btgIsStr(this.callData.dartSite)){retVal=this.callData.dartSite;}
if(this.btgIsStr(retVal)){retVal=retVal.replace(/\./,"_");}
else{retVal="NA";}
return retVal;},getAdUrl:function(){var retVal="";var item=this.getItem();if(this.btgIsObj(item)&&this.btgIsStr(item.adUrl)){retVal=item.adUrl;}
if(this.callData&&this.btgIsStr(this.callData.adUrl)){retVal=this.callData.adUrl;}
return retVal;},getItemGroup:function(){var retVal;var item=this.getItem();if(this.btgIsObj(item)&&this.btgIsObj(item.group)){retVal=item.group;}
return retVal;},getItem:function(a_index){var retVal;a_index=parseInt(a_index);if(isNaN(a_index)){a_index=0;}
if(this.metaData.item){if(this.metaData.item.length){if(this.metaData.item.length>=1){retVal=this.metaData.item[a_index];}}
else{retVal=this.metaData.item;}}
return retVal;},getMode:function(){return this.btgStr.getBetween(this.getAdUrl(),"mode=",";");},getMediaType:function(){return this.btgStr.getBetween(this.getAdUrl(),"mtype=",";");},getGenre:function(){return this.btgStr.getBetween(this.getAdUrl(),"genre=",";");},getArtistName:function(){var retVal="NA";var group=this.getItemGroup();if(this.btgIsObj(group)&&this.btgIsStr(group.categoryArtist)){retVal=group.categoryArtist;}
return retVal;},getVideoTitle:function(a_defaultVal){var retVal=this.btgIsStr(a_defaultVal)?a_defaultVal:"";if(this.qc.title&&this.btgIsStr(this.qc.title)){retVal=this.qc.title;}
if(this.callData&&this.btgIsStr(this.callData.title)){retVal=this.callData.title;}
return retVal;},getFranchise:function(){var retVal="NA";var group=this.getItemGroup();if(this.btgIsObj(group)&&this.btgIsStr(group.categoryFranchise)){retVal=group.categoryFranchise;}
return retVal;},getPlaylistTitle:function(){var retVal="PLAYLIST_TITLE_UNSET";var group=this.getItemGroup();if(this.btgIsObj(group)&&this.btgIsStr(group.categoryPlaylistTitle)){retVal=group.categoryPlaylistTitle;}
else if(this.btgIsObj(this.metaData)&&this.btgIsStr(this.metaData.title)){retVal=this.metaData.title;}
return retVal;},getLabelsHierarchy:function(){var retVal="";var labelHierarchy=['Viacom Global Digital Network','MTVN Digital Ad Sales','Content','Video',this.getDartSite()];if(this.getMediaType()=="contentvideo"&&this.getMode()=="episode"){labelHierarchy.push("Full Episodes");labelHierarchy.push(this.getFranchise());labelHierarchy.push(this.getVideoTitle("NA"));}
else if(this.getMediaType()=="musicvideo"){labelHierarchy.push("Music Videos");if(this.btgIsStr(this.getGenre())){labelHierarchy.push("Grouped by Genre");labelHierarchy.push(this.getGenre());labelHierarchy.push(this.getArtistName());labelHierarchy.push(this.getVideoTitle("NA"));}
else{labelHierarchy.push("Grouped by Artist");labelHierarchy.push(this.getArtistName());labelHierarchy.push(this.getVideoTitle("NA"));}}
else if(this.getMediaType()=="contentvideo"){labelHierarchy.push("Clips");labelHierarchy.push(this.getFranchise());if(this.getPlaylistTitle()!="PLAYLIST_TITLE_UNSET"){labelHierarchy.push("Grouped by Playlist");labelHierarchy.push(this.getPlaylistTitle());labelHierarchy.push(this.getVideoTitle("NA"));}
else{labelHierarchy.push("Grouped by Clip");labelHierarchy.push(this.getVideoTitle("NA"));}}
retVal=labelHierarchy.join(".");return retVal;}}


mtvn.btg.config.ReportSettings={
	defaultPageName:mtvn.btg.globalvars.PAGE_URL,
	Omniture:{
		enabled: true,
		account: 'viaslap,nickvia',
		cName: '',
		charSet: '',
		dynamicAccountSelection: 'true',
		dynamicAccountList:  'devvianick=beta',
		linkInternalFilters: 'javascript:,theslap.com',
		videoViewEventDisable: false,
		enableTimeParting: false,
		trackInlineStats: true,
		defaultHier: 'hier1',
		enableVisitorNamespace: 'false',
		enableMtvnVisitorGuid: false,
		enableMeteorPlugin: false,
		enableGuidPlugin: false,
		enableGuidAuxiliaryCall: true,
		enableFirstPartyCookie: false,
		timezone: '-5'
	},
	Nielsen:{
		enabled:       false,
		cid:      'us-300231',
		videoCensusId: 'c02'
	},
	GoogleAnalytics:{
		enabled:    false,
		account:    '',
		reportMode: '' // iframe/direct
	},
	QuantCast:{
		enabled:    false,
		labels:     'MTVN Global Digital Network,MTVN Global Digital Proper,Nickelodeon Kids and Family Global Network,Nickelodeon Kids and Family Proper,Nickelodeon Kids and Family Domestic,Nickelodeon Kids and Family Tribes,Kids and Family Viral,Nickelodeon Kids Digital,Kids and Family Gaming,Kids and Family Paid Products,Nick Network,Nick Site',
		reportMode: '' //direct/ads
	},
	ComScore:{
		enabled:    true,
		c2:	'6036034'
	},
	Meteor:{
		enabled:false,
		applicationId:"",
		multiDomain:false
	},
	ChoiceStream:{
		enabled:false,
		apiKey: "",
		profileId:""
	}
};
mtvn.btg.config.AdSettings={
	DoubleClick:{
		enabled:  true,
		dartSite: 'theslap.nol',
		positionThreshold: 2
	},
	International:{
		enabled:  false,
		dartSite: ''
	},
	QuantCast:{ 
		enabled:  false
	}
};  
mtvn.btg.Controller.init(); 
if (typeof prop4 == 'undefined') {
    mtvn.btg.Controller.sendPageCall( { 
            pageName: 'TheSlap.com'+location.pathname, 
                channel: 'TheSlap.com', 
                hier1: 'TheSlap.com'+location.pathname,
                hier2: 'TheSlap.com'+location.pathname 
                } );
} else {
    mtvn.btg.Controller.sendPageCall( { 
            pageName: 'TheSlap.com'+location.pathname, 
                channel: 'TheSlap.com', 
                prop4: prop4, 
                hier1: 'TheSlap.com'+location.pathname,
                hier2: 'TheSlap.com'+location.pathname 
                } );
}
var zone = location.pathname;
if(zone.indexOf(".html")<0){
	if(zone.charAt(zone.length-1)!="/") zone+="/index.html";
	else zone+="index.html";
}
zone=zone.replace(/[- ]/gi,"_");
var arr = zone.split("/");
if(arr.length==2){
		if(arr[1]=="index.html")
			zone = "/_hp";
}else if(arr.length==3){
		if(arr[2]=="index.html")zone = "/"+arr[1]+"/_mn";
	}
function gamePlay(){
	mtvn.btg.config.ReportSettings.Omniture["pageName"] = 'TheSlap.com'+location.pathname+'-playAgain'; 
	mtvn.btg.Controller.init(); 
	mtvn.btg.Controller.sendPageCall(); 

    	}
/*
	urlAlias: unique page name/identifier
	contentType: game or PDF, or etc.  the content type of material the user is printing	
*/
function printReporting(site,urlAlias,contentType,showID,numberPages){
    try{
        var oldAcct = mtvn.btg.config.ReportSettings.Omniture.account;
        mtvn.btg.config.ReportSettings.Omniture.account = "viakfprint";
        mtvn.btg.Controller.init();
        mtvn.btg.Controller.sendPageCall({
            pageName: site+"-"+contentType+"-"+showID+"-"+urlAlias,
            channel: site,
            hier1: site+"/"+contentType+"/"+showID+"/"+urlAlias,
            hier2: site+"/"+contentType+"/"+showID+"/"+urlAlias,
            prop1: numberPages,
            prop2: site,
            prop3: contentType,
            prop4: showID,
            prop5: urlAlias
        });
        var _printPixel = "https://web.archive.org/web/20110912044651/http://ad.doubleclick.net/ad/nick.nol/hp_printables;adid=230867644;sz=1x1;ord=123;";
        var DCPrint = document.createElement('img');
        DCPrint.setAttribute('src',_printPixel);
        mtvn.btg.config.ReportSettings.Omniture.account = oldAcct;
        mtvn.btg.Controller.init();
    }catch(e){}
}

// do printReporting for links with title 'print-reporting-1', replacing 1 with number of pages
$(function(){
    var prints = $('body.static_page a[title^=print-reporting-]');
    prints.each(function(i){
        prints.eq(i).attr('data-title', prints.eq(i).attr('title') );
        prints.eq(i).removeAttr('title');
    });
    prints.click(function(event){
        r = {
            printReporting: true,
            site: 'TheSlap',
            showID: 'vic',
            contentType: 'Printable Item',
            urlAlias: location.pathname.replace(/@.*|\//, ''),
            numberPages: Math.floor($(this).attr('data-title').split(/reporting-/)[1])
        }
        try{console.log(r)}catch(e){};
        printReporting(r.site, r.urlAlias, r.contentType, r.showID, r.numberPages);
    });
});



$.fn.myIndex = function() {
	var $p = $(this).parent().children();
    return $p.index(this);
};

$.fn.hoverize = function() {
    $(this).hover(function() {
        $(this).addClass('hover');
    }, function() {
        $(this).removeClass('hover');
    });
};

//open external links in new window
$("a.popup, a[rel=external]").live('click', function(event){
  window.open(this.href);
  event.preventDefault();
});

// Returns nth (zero based) child of the given child selector string (string, not selector)
var childAtIndex = function(childSelectorStr, index) {
    return $(childSelectorStr + ":nth-child(" + (index + 1) + ")");
};

// Fetches the resource id from the div id (e.g. id="characters_26" => 26)
$.fn.myObjectId = function() {
    return parseInt($(this)[0].id.split('_')[1]);
};

$(document).ready(function() {
    var setSidebarHeight = function() { // remove delay? TODO
        $sidebar = $("#sidebar_content");
        var vPad = parseInt($sidebar.css('padding-top'));
        var totalEndCapHeight = 54;
        $sidebar.height($("#content_container").outerHeight() - totalEndCapHeight - 2 * vPad);
        // This is needed if using the hidden overflow approach to setting the intial length
        //$("#sidebar").css('padding-bottom', vPad);
        //$sidebar.css('margin-bottom', '0px');
    };
    setSidebarHeight();                // call immediately as it normally works
    setTimeout(setSidebarHeight, 100); // then a hedge call as it seems to fail at times...

    //** ie Hacks **//
    if($.browser.msie) {
        if($.browser.version < 7) {
            // PNG fix for ie 6
            $(document).pngFix();
                    
            // Hover fix for ie 6
            $('#nav .search form button').hover(function() {
                $(this).addClass('hover');
            }, function() {
                $(this).removeClass('hover');
            });
        } 
        if(($.browser.version < 9) && ($.browser.version > 6)) {
            // Rounded corners for ie 8 and ie 7
            $('#content_container').append($("<i class='corner' style='top:0;left:0;background-position:top left''/>"
                +"<i class='corner' style='top:0;   right:0; background-position:top right'/>"
                +"<i class='corner' style='bottom:0; left:0; background-position:bottom left'/>"
                +"<i class='corner' style='bottom:0;right:0; background-position:bottom right'/>"));
        } 
    }
    // { className: 'placeholder'}
    $('input:text').placeholder({ blankSubmit: true });

    // TODO: remove unless we determine an approach like this can actually be used
    // It currently results in a redirect to a page containing just the ad
    // $("#content_ad").append("<script>com.mtvi.ads.AdManager.placeAd({size:'728x90'});</script>");

    // Change Ajaxify's default loading gif location from relative to absolute
    // TODO: remove if we dump Ajaxify
    jQuery.AjaxifyDefaults.loading_img = "/images/loading.gif"

// Turning this off for now, if we have the dataTypes match the server-side format, we should be okay
// If so, delete this
//jQuery.ajaxSetup({
//    'beforeSend': function(xhr) {xhr.setRequestHeader("Accept", "text/javascript")}
//});

});



}
/*
     FILE ARCHIVED ON 04:46:51 Sep 12, 2011 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 17:24:03 Jul 27, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.471
  exclusion.robots: 0.023
  exclusion.robots.policy: 0.014
  esindex: 0.009
  cdx.remote: 24.379
  LoadShardBlock: 616.791 (3)
  PetaboxLoader3.datanode: 493.137 (4)
  PetaboxLoader3.resolve: 204.017 (2)
  load_resource: 142.545
*/