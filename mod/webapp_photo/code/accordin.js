function $(id){
    return document.getElementById(id);
}

function removeClass(el, cls){
    el.className = el.className.replace(cls, '');
}

function findParents(el, parent){
    while(el.tagName.toLowerCase() != parent || el.tagName == 'BODY'){
        el = el.parentNode;
    }
    return el;
}

function bind(dom, method, callback, sync){
    if('addEventListener' in dom){
        dom.addEventListener(method, callback, sync);
    }else{
        dom.attachEvent('on' + method, callback);
    }
}

function mouseover(e){
    var outer = $('subject');
    var list = outer.getElementsByTagName('li');
    var target = findParents(e.target, 'li');

    for(var i = 0; i < list.length; i++){
        removeClass(list[i], 'big');
    }
    
    target.className += 'big';
}

(function(){
    var outer = $('subject');
    var list = outer.getElementsByTagName('li');
    for(var i = 0; i < list.length; i++){
        bind(list[i], 'mouseover', mouseover);
    }
})();