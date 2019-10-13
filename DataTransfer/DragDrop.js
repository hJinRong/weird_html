var DragDrop = function () {

    var dragdrop = new Object();
    var dragging = null,
        diffX = 0,
        diffY = 0;

    function handleEvent(event) {
        //get event and target
        event = window.event || event;
        let target = event.target;

        //determine the type of event
        switch (event.type) {
            case "mousedown":
                if (target.className.indexOf("draggable") > -1) {
                    dragging = target;
                    diffX = event.clientX - target.offsetLeft;
                    diffY = event.clientY - target.offsetTop;
                }
                break;

            case "mousemove":
                if (dragging !== null) {

                    //assign location
                    dragging.style.left = (event.clientX - diffX) + "px";
                    dragging.style.top = (event.clientY - diffY) + "px";
                }
                break;

            case "mouseup":
                dragging = null;
                break;
        }
    }

    //public interface
    dragdrop.addlistener = function () {
        document.addEventListener("mousedown", handleEvent, false);
        document.addEventListener("mousemove", handleEvent, false);
        document.addEventListener("mouseup", handleEvent, false);
    };
    return dragdrop;
}();

DragDrop.addlistener();