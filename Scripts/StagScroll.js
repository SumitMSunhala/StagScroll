if (!window["jQuery"]) throw "Please include jquery";

(function($, window, document) {

    // Plugin definition.
    $.fn.stagScroll = function(options) {
        let defaultOptions = {
                uid: (Math.random() + 1).toString(36).substring(2),
                data: [],
                rowTemplate: "",
<<<<<<<< HEAD:src/stagscroll.js
========
                altRowTemplate: "",
>>>>>>>> eaefc90 (Added a clean UI to add rows and jump to specific row/line.):Scripts/StagScroll.js
                ssidField: "",
                element: this,
                height: 400,
                domElementsCount: 200,
                lineNumber: 1,
                goToLine: function(lineNumber) {
                    let that = opts;
                    that.lineNumber = parseInt(lineNumber);
                    if (!that.lineNumber || isNaN(that.lineNumber)) {
                        throw `Invalid Line Number : ${that.lineNumber}`;
                    }
                    if (that.element.find(`[data-ssid=${that.lineNumber}]`).is(`:${isinfullview}`)) {
                        console.log(`line number ${that.lineNumber} already visible in UI`);
                    } else if (that.element.find(`[data-ssid=${that.lineNumber}]`).is(`:${isinpartialtopview}`)) {
                        console.log(`line number ${that.lineNumber} visible partially in top of UI`);
                        let elemToFocus = that.element.find(`[data-ssid=${that.lineNumber}]`),
                            elemToFocusHeight = elemToFocus.height();
                        //elemToFocus.get(0).scrollIntoView({ behavior: "smooth", block: "center" });
                        //that.element.scrollTop(parseInt(that.element.scrollTop() - elemToFocusHeight));
                        that.element.animate({ scrollTop: parseInt(that.element.scrollTop() - elemToFocusHeight) }, 600);
                    } else if (that.element.find(`[data-ssid=${that.lineNumber}]`).is(`:${isinpartialbottomview}`)) {
                        console.log(`line number ${that.lineNumber} visible partially in bottom of UI`);
                        let elemToFocus = that.element.find(`[data-ssid=${that.lineNumber}]`),
                            elemToFocusHeight = elemToFocus.height();
                        //elemToFocus.get(0).scrollIntoView({ behavior: "smooth", block: "center" });
                        //that.element.scrollTop(parseInt(that.element.scrollTop() - elemToFocusHeight));
                        that.element.animate({ scrollTop: parseInt(that.element.scrollTop() + elemToFocusHeight) }, 600);
                    } else{
                        console.log(`line number ${that.lineNumber} not visible in UI`);
                        that.createLines(that.lineNumber);
                    }
                },
                clearLines: function (){
                    let that = opts;
                    that.element.children().remove();
                },
                createLines: function(lineNumber, append) {
<<<<<<<< HEAD:src/stagscroll.js
                    debugger;
========
>>>>>>>> eaefc90 (Added a clean UI to add rows and jump to specific row/line.):Scripts/StagScroll.js
                    console.time("createLines"+lineNumber);
                    let that = opts;
                    let size = that.domElementsCount / 2;
                    let startLineNo = lineNumber - size;
                    let endLineNo = lineNumber + size - 1;
                    let lastLine = that.data[that.data.length - 1];
                    let lastLineNo = lastLine ? lastLine[that.ssidField] : 0;
                    if(startLineNo<1){
                        startLineNo = 1;
                        endLineNo = (2*size);
                    }
                    if(endLineNo>lastLineNo && lastLineNo > 0){
                        endLineNo = lastLineNo;
                        startLineNo = lastLineNo - (2*size) +1;
                    }
                    that.clearLines();
                    console.timeEnd("createLines"+lineNumber);
                    that.displayLines({
                        startLineNo: startLineNo,
                        endLineNo: endLineNo, 
                        append: true,
                        callback: function() {
                            // $(that.element).data("preventScroll", true);
                            let scrollToElem = that.element.find(`[data-ssid=${that.lineNumber}]`);
                            scrollToElem.get(0).scrollIntoView({ behavior: "smooth", block: "center" });
                            // setTimeout(function(){
                            //     $(that.element).data("preventScroll", false);
                            // }, 100);
                        }
                    });
                },
                displayLines: function(displayOptions) {
                    console.log("displayLines called");
                    console.time("displayLines");
                    let startLineNo = displayOptions.startLineNo, 
                        endLineNo = displayOptions.endLineNo, 
                        append = displayOptions.append;
                    let that = opts;
<<<<<<<< HEAD:src/stagscroll.js
                    let linesOnly = that.data.slice(startLineNo-1, endLineNo).map(function(v, i) {
                        let rowTmpl = typeof that.rowTemplate == 'function' ? that.rowTemplate(v) : that.rowTemplate;
========
                    let rowTmplOptions = that.rowTemplate;
                    let altRowTmplOptions = that.altRowTemplate || rowTmplOptions;
                    let linesOnly = that.data.slice(startLineNo-1, endLineNo).map(function(v, i) {
                        let currRowTemplate = parseInt(v[that.ssidField]) % 2 === 1 ? rowTmplOptions: altRowTmplOptions;
                        let rowTmpl = typeof currRowTemplate == 'function' ? currRowTemplate(v) : currRowTemplate;
>>>>>>>> eaefc90 (Added a clean UI to add rows and jump to specific row/line.):Scripts/StagScroll.js
                        let elemsToAdd = $(rowTmpl);
                        elemsToAdd.attr("data-ssid", v[that.ssidField]);
                        return elemsToAdd;
                    });
                    if(append){
                        that.element.append(linesOnly).ready(function() {
                            if(displayOptions.callback) displayOptions.callback();
                        });
                    }else{
                        that.element.prepend(linesOnly).ready(function() {
                            if(displayOptions.callback) displayOptions.callback();
                        });
                    }
                    console.timeEnd("displayLines");
                },
                removeLines: function(removeOptions) {
                    let that = opts,
                        fromTop = removeOptions.fromTop,
                        size = removeOptions.size;
                    if(fromTop){
                        that.element.children(`:lt(${size})`).remove();
                    } else {
                        that.element.children(`:gt(-${size+1})`).remove();
                    }
                }
            },
            opts = $.extend({}, defaultOptions, options),
            isinview = "isinview" + opts.uid,
            isinpartialtopview = "isinpartialtopview" + opts.uid,
            isinpartialbottomview = "isinpartialbottomview" + opts.uid,
            isinfullview = "isinfullview" + opts.uid,
            getPositions = function(el) {
                let currentElem = $(el),
                    viewportElem = opts.element,
                    currentElemHeight = currentElem.height(),
                    currentElemPosition = currentElem.position(),
                    currentElemTop = currentElemPosition.top,
                    currentElemBottom = currentElemTop + currentElemHeight,
                    viewportElemHeight = viewportElem.height(),
                    viewportElemPosition = viewportElem.position(),
                    viewportElemTop = viewportElemPosition.top + parseInt(viewportElem.css('marginTop')),
                    viewportElemBottom = viewportElemTop + viewportElemHeight;
                return {
                    partialTop: currentElemBottom >= viewportElemTop && currentElemTop <= viewportElemTop,
                    partialBottom: currentElemBottom >= viewportElemBottom && currentElemTop <= viewportElemBottom,
                    fullInView: currentElemTop >= viewportElemTop && currentElemBottom <= viewportElemBottom
                };
            },
            jqCustomSelectorsExpressions = $.extend($.expr[':'], {
                [isinview]: function(el) {
                    let positions = getPositions(el);
                    return positions.partialTop || positions.partialBottom || positions.fullInView;
                },
                [isinpartialtopview]: function(el) {
                    let positions = getPositions(el);
                    return positions.partialTop && !positions.fullInView;
                },
                [isinpartialbottomview]: function(el) {
                    let positions = getPositions(el);
                    return positions.partialBottom && !positions.fullInView;
                },
                [isinfullview]: function(el) {
                    let positions = getPositions(el);
                    return positions.fullInView;
                }
<<<<<<<< HEAD:src/stagscroll.js
            });

========
            }),
            stagScrollData = {
                uid: opts.uid,
                total: opts.data.length,
                goToLine: opts.goToLine
            };
        opts.element.data("stagScrollData", stagScrollData);
>>>>>>>> eaefc90 (Added a clean UI to add rows and jump to specific row/line.):Scripts/StagScroll.js
        opts.element.css({
            "height": opts.height + "px",
            "overflow": "auto",
            "display": "inline-block"
        }).unbind("scroll.stagScroll").bind("scroll.stagScroll", function(e) {
            let jsElem = opts.element[0];
            let that = opts;
            let size = that.domElementsCount / 2;
            let isPreventScroll = $(opts.element).data("preventScroll");
            if (isPreventScroll) return;
            if (Math.abs(jsElem.scrollHeight - jsElem.scrollTop - jsElem.clientHeight) < 1) {
<<<<<<<< HEAD:src/stagscroll.js
                debugger;
========
>>>>>>>> eaefc90 (Added a clean UI to add rows and jump to specific row/line.):Scripts/StagScroll.js
                let lastElem = that.element.children(`:${isinview}:last`);
                let lastElemssid = parseInt(lastElem.attr('data-ssid'));
                let nextPageInitNumber = lastElemssid + 1;
                let nextPageLastNumber = lastElemssid + size;
                console.log("to bottom", nextPageInitNumber, nextPageLastNumber, that.data.length);
                if (nextPageInitNumber > that.data.length){
                    console.log("last page");
                }
                else {
                    that.displayLines({
                        startLineNo: nextPageInitNumber,
                        endLineNo: nextPageLastNumber, 
                        append: true,
                        callback: function() {
                            that.removeLines({
                                size: size,
                                fromTop: true
                            });
                        }
                    });
                }
            } else if ($(opts.element).scrollTop() === 0) {
                let firstElem = that.element.children(`:${isinview}:first`);
                let firstElemssid = parseInt(firstElem.attr('data-ssid'));
                let prevPageLastNumber = firstElemssid - 1;
                let prevPageInitNumber = firstElemssid - size;
                if (prevPageInitNumber<1 && prevPageLastNumber>prevPageInitNumber){
                    prevPageInitNumber = 1;
                }
                //console.log("to top", prevPageInitNumber, prevPageLastNumber);
                if (prevPageInitNumber < 1 || prevPageLastNumber < 1){
                    console.log("first page");
                }else{
                    that.displayLines({
                        startLineNo: prevPageInitNumber,
                        endLineNo: prevPageLastNumber,
                        append: false,
                        callback: function() {
                            that.removeLines({
                                size: size,
                                fromTop: false
                            });
                            let firstElemTopPosition = firstElem.position().top;
                            that.element.animate({ scrollTop: parseInt(firstElemTopPosition) }, 10);
                        }
                    });
                }
            }
            
        });
        opts.createLines(opts.lineNumber);
<<<<<<<< HEAD:src/stagscroll.js
        return {
            uid: opts.uid,
            goToLine: opts.goToLine
        };
========
        return stagScrollData;
>>>>>>>> eaefc90 (Added a clean UI to add rows and jump to specific row/line.):Scripts/StagScroll.js
    };
})(jQuery, window, document);
