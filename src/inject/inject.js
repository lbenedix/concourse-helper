chrome.extension.sendMessage({}, function(response) {
    var readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "complete" &&
            location.hostname.includes('ci.sys')) {

            console.info('Concourse Helper loaded');
            clearInterval(readyStateCheckInterval);

            document.onkeyup = function(evt) {
                evt = evt || window.event;

                var current_build = document.querySelector('#builds > li.current');

                if (evt.key === "ArrowRight") {
                    current_build.nextSibling.querySelector('a').click()
                } else if (evt.key === "ArrowLeft") {
                    current_build.previousSibling.querySelector('a').click()
                } else if (evt.key === "ArrowDown") {
                    document.querySelectorAll('.header').forEach(function(it){ it.click();});
                }
            };
        }
    }, 10);
});