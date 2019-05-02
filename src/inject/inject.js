chrome.extension.sendMessage({}, function (response) {

    var readyStateCheckInterval = setInterval(function () {
        if (document.readyState === "complete" &&
            location.hostname.includes('ci.sys')) {

            if (window.location.pathname == '/dashboard') {
                console.log('dashboard');
                document.getElementById("search-input-field").focus({ preventScroll: true });
            }

            var region = window.location.host.split('.')[2]
            try {
                var x = document.createElement("li");
                x.textContent = region;
                x.style.fontSize = "26px";

                document.querySelector('#top-bar-app > nav > ul.groups').append(x);
            } catch {
                var x = document.createElement("span");
                x.textContent = region;
                x.style.fontSize = "26px";
                x.style.verticalAlign = "top";

                document.querySelector('#elm-app-embed > div > div.module-topbar > div.topbar-logo').append(x);
            }
            clearInterval(readyStateCheckInterval);

            document.onkeyup = function (evt) {

                console.info(evt);
                evt = evt || window.event;


                if (window.location.pathname.includes('/builds/')) {
                    if (evt.key === "ArrowRight") {
                        var current_build = document.querySelector('#builds > li.current');
                        current_build.nextSibling.querySelector('a').click();
                    } else if (evt.key === "ArrowLeft") {
                        var current_build = document.querySelector('#builds > li.current');
                        current_build.previousSibling.querySelector('a').click();
                    } else if (evt.key === "ArrowDown") {
                        document.querySelectorAll('.header').forEach(function (it) { it.click(); });
                    } else if (evt.key == "Enter") {
                        document.querySelectorAll('button.build-action')[0].click();
                    } else if (evt.key == "ArrowUp") {
                        document.querySelectorAll('.nav-item a')[0].click();
                    }
                }

                if (!window.location.pathname.includes('/dashboard') &&
                    !window.location.pathname.includes('/login')) {
                    if (evt.key == 'd') {
                        window.location.pathname = '/dashboard';
                    } else if (evt.key == 'D') {
                        window.location.pathname = '/dashboard/hd';
                    }
                }
            };
        }
    }, 10);
});