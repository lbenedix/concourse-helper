chrome.extension.sendMessage({}, function (response) {
    var readyStateCheckInterval = setInterval(function () {
        if (document.readyState === "complete" &&
            location.hostname.includes('ci.sys')) {

            console.info('Concourse Helper loaded');
            clearInterval(readyStateCheckInterval);

            var region = window.location.host.split('.')[2]
            var x = document.createElement("div");
            x.textContent = region;
            x.style.fontSize = "26px";
            x.style.marginRight = "0.5em";
            document.querySelector('.top-bar').insertBefore(x, document.querySelector('.nav-right'));

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

                if (evt.key == 'd') {
                    window.location.pathname = '/dashboard';
                } else if (evt.key == 'D') {
                    window.location.pathname = '/dashboard/hd';
                }
            };
        }
    }, 10);
});