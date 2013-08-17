var urlReplacer = (function(){
	var t, s;

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

			t.elements = Helper.getByClass(s.containerClass, document, false);
			goReplacerGo();
		},

		elements: [],

		t.goReplacerGo: function() {
			for (var i = t.elements.length - 1; i >= 0; i--) {
				t.elements[i].innerText = t.replaceUrls(t.elements[i].innerText);
			};
		},

		stripwww: function( url ) {
			// RegX from: http://stackoverflow.com/questions/3281628/regular-expression-to-check-for-a-urls-protocol
			return url.replace(^(?:(ht|f)tp(s?)\:\/\/)?, '').replace('www.', '');
		},

		insertAnchor: function( match, p1, p2, p3, offset, string ) {
			return '<a href="' + match + '">' + t.stripwww(match) + '</a>';
		},

		replaceUrls: function ( text ){
			// RegX from: http://net.tutsplus.com/tutorials/other/8-regular-expressions-you-should-know/
			var newText = text.replace(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/, t.insertAnchor;
			return newText;
		}
	};
}();