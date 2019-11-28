chrome.extension.sendMessage({}, function (response) {

    if (document.title.includes('Concourse')) {
        console.log('🍌');
        var readyStateCheckInterval = setInterval(function () {
            if (document.readyState === "complete") {
                clearInterval(readyStateCheckInterval);

                document.onkeyup = function (evt) {
                    console.info(evt);
                    evt = evt || window.event;

                    if (window.location.pathname.includes('/pipelines/') && !window.location.pathname.includes('/builds/')) {
                        var running_jobs = document.querySelectorAll('.started a');
                        if (running_jobs.length > 0){
                            window.location.pathname = running_jobs[0].href.baseVal
                        }
                    }

                    if (window.location.pathname.includes('/builds/') || window.location.pathname.includes('/resources/')) {
                        if (evt.key === "ArrowRight") {
                            var current_build = document.querySelector('#builds > li.current');
                            current_build.nextSibling.querySelector('a').click();
                        } else if (evt.key === "ArrowLeft") {
                            var current_build = document.querySelector('#builds > li.current');
                            current_build.previousSibling.querySelector('a').click();
                        } else if (evt.key === "ArrowDown") {
                            document.querySelectorAll('.header').forEach(function (it) { it.click(); });
                        } else if (evt.key == "Enter") {
                            if (window.location.pathname.includes('/builds/')) {
                                document.querySelector('button[title="Trigger Build"]').click();
                            } else if (window.location.pathname.includes('/resources/')) {
                                console.log('start resource check');
                                document.querySelector('div.resource-check-status > div:nth-child(1) > div').click();
                            }
                        }
                    }
                };
            }
        }, 10);
    }
});