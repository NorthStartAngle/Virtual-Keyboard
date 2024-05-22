export function showPrompt(message) {
    return prompt(message, 'Type anything here');
}

window.JsFunctions = {
    addKeyboardListenerEvent: function (foo) {
        let serializeEvent = function (e) {
            if (e) {
                return {
                    key: e.key,
                    code: e.keyCode.toString(),
                    location: e.location,
                    repeat: e.repeat,
                    ctrlKey: e.ctrlKey,
                    shiftKey: e.shiftKey,
                    altKey: e.altKey,
                    metaKey: e.metaKey,
                    type: e.type
                };
            }
        };

        function getKey(e) {
            var location = e.location;
            var selector;
            if (location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
                selector = ['[data-key="' + e.keyCode + '-R"]']
            } else {
                var code = e.keyCode || e.which;
                selector = [
                    '[data-key="' + code + '"]',
                    '[data-char*="' + encodeURIComponent(String.fromCharCode(code)) + '"]'
                ].join(',');
            }
            return document.querySelector(selector);
        }

        function pressKey(char) {
            var key = document.querySelector('[data-char*="' + char.toUpperCase() + '"]');
            if (!key) {
                return kconsole.warn('No key for', char);
            }
            key.setAttribute('data-pressed', 'on');
            setTimeout(function () {
                key.removeAttribute('data-pressed');
            }, 200);
        }

        var h1 = document.querySelector("h1");
        var originalQueue = h1.innerHTML;
        var queue = h1.innerHTML;

        function next() {
            var c = queue[0];
            queue = queue.slice(1);
            h1.innerHTML = originalQueue.slice(0, originalQueue.length - queue.length);
            pressKey(c);
            if (queue.length) {
                setTimeout(next, Math.random() * 200 + 50);
            }
        }

        h1.innerHTML = "&nbsp;";
        //setTimeout(next, 500);

        document.body.addEventListener('keydown', function (e) {
            var key = getKey(e);
            if (!key) {
                return console.warn('No key for', e.keyCode);
            }

            key.setAttribute('data-pressed', 'on');
        });

        document.body.addEventListener('keyup', function (e) {
            var key = getKey(e);
            key && key.removeAttribute('data-pressed');
        });

        function size() {
            var size = keyboard.parentNode.clientWidth / 90;
            keyboard.style.fontSize = size + 'px';

        }

        var keyboard = document.querySelector('.keyboard');
        window.addEventListener('resize', function (e) {
            size();
        });
        size();

        $(document).ready(function () {
            console.log("document ready");
        });

        $("input").on({
            focusin: (e) => {
                const element = e.currentTarget;
                const id = element.getAttribute("id");
                console.log("Current Element=", id);


                DotNet.invokeMethodAsync('proKeyboard', 'focusin', id).then(str => { console.log(str); });
            }, 
            focusout: (e) => {
                const element = e.currentTarget;
                const id = element.getAttribute("id");
                console.log("Current Element=", id);

                var rect = document.getElementById("vkeyboard").getBoundingClientRect();
                console.log("rect="+ rect+",pos=(" + e.pageX+ "," + e.pageY+")");
                if (e.pageX > rect.left && e.pageX < rect.right && e.pageY < rect.bottom & e.pageY > rect.top) {

                } else {
                    DotNet.invokeMethodAsync('proKeyboard', 'focusout', id).then(str => { console.log(str); });
                }
                
             }

        });

        window.assignDotNetHelper = (element, dotNetHelper) => {
            element.dotNetHelper = dotNetHelper;
            //objRef = DotNetObjectReference.Create(this);
            //await JS.InvokeVoidAsync("assignDotNetHelper", elementRef, objRef);
            //<span  @ref="elementRef"
        };

        window.interopCall = async (element) => {
            await element.dotNetHelper.invokeMethodAsync('UpdateMessage');
            // in razor component, like as onclick="interopCall(this)"
        };

        window.setElementContent = (element, text) => element.innerText = text;

    }
};
