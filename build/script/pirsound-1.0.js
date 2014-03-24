/// <reference path='../jquery.d.ts'/>
var pirsound;
(function (pirsound) {
    var Main = (function () {
        function Main() {
        }
        Main.main = function () {
            jQuery(jQuery.proxy(Main.onDOMLoaded, this));
        };

        Main.onDOMLoaded = function () {
        };
        return Main;
    })();
    pirsound.Main = Main;
})(pirsound || (pirsound = {}));

pirsound.Main.main();
