var urlReplacer = (function(document){
	var t, s, h;

	var Helper = function() {};

	/*
	* Cross browser getElementsByClassName, which uses native
	* if it exists. Modified version of Dustin Diaz function:
	* http://www.dustindiaz.com/getelementsbyclass
	*/
	Helper.prototype.getByClass = (function() {
		if (document.getElementsByClassName) {
			return function(searchClass,node,single) {
				if (single) {
					return node.getElementsByClassName(searchClass)[0];
				} else {
					return node.getElementsByClassName(searchClass);
				}
			};
		} else {
			return function(searchClass,node,single) {
				var classElements = [],
					tag = '*';
				if (node == null) {
					node = document;
				}
				var els = node.getElementsByTagName(tag);
				var elsLen = els.length;
				var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
				for (var i = 0, j = 0; i < elsLen; i++) {
					if ( pattern.test(els[i].className) ) {
						if (single) {
							return els[i];
						} else {
							classElements[j] = els[i];
							j++;
						}
					}
				}
				return classElements;
			};
		}
	})();

	return {
		settings: {
			containerClass: 'replace-urls' 
		},

		init: function() {
			t = this;
			s = t.settings;
			h = new Helper;

			t.elements = h.getByClass(s.containerClass, document, false);
			t.goReplacerGo();
		},

		elements: [],

		goReplacerGo: function() {
			for (var i = t.elements.length - 1; i >= 0; i--) {
				t.elements[i].innerHTML = t.replaceUrls(t.elements[i].innerHTML);
			};
		},

		stripwww: function( url ) {
			// RegX from: http://stackoverflow.com/questions/3281628/regular-expression-to-check-for-a-urls-protocol
			return url.replace(/^(?:(ht|f)tp(s?)\:\/\/)?/, '').replace('www.', '');
		},

		insertAnchor: function( match, p1, p2, p3, offset, string ) {
			return '<a href="' + match + '">' + t.stripwww(match) + '</a>';
		},

		replaceUrls: function ( text ){
			// RegX from: http://stackoverflow.com/questions/37684/how-to-replace-plain-urls-with-links
			return text.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, t.insertAnchor);
		}
	};
})(document);