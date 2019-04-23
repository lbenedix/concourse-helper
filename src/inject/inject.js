chrome.extension.sendMessage({}, function(response) {
    var readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "complete" &&
            location.hostname.includes('ci.sys')) {

            console.info('Concourse Helper loaded');
            clearInterval(readyStateCheckInterval);

            document.onkeyup = function(evt) {

                console.debug('evt');
                evt = evt || window.event;


                if (evt.key === "ArrowRight") {
                    var current_build = document.querySelector('#builds > li.current');
                    current_build.nextSibling.querySelector('a').click()
                } else if (evt.key === "ArrowLeft") {
                    var current_build = document.querySelector('#builds > li.current');
                    current_build.previousSibling.querySelector('a').click()
                } else if (evt.key === "ArrowDown") {
                    document.querySelectorAll('.header').forEach(function(it){ it.click();});
                } else if (evt.key == "ArrowUp") {
                    document.querySelectorAll('.nav-item a')[0].click();
                }
            };
        }
    }, 10);
});