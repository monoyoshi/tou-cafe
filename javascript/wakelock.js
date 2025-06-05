
let wlSupport = false; // wakelock support flag

$(document).ready(function() {
    let $wakelocker = $("#wakelocker");
    let $wlCheckbox = $("#wlCheckbox");

    if ("wakeLock" in navigator) {
        $wakelocker.css("user-select", "none");

        let wakeLock = null;

        $wlCheckbox.prop("checked", false);

        // request wake lock
        const requestWakeLock = async () => {
            try {
                wakeLock = await navigator.wakeLock.request("screen");

                wakeLock.onrelease = function(e) {
                    console.log(e);
                };

            } catch (err) {
                // if wake lock request fails
                $wlCheckbox.prop("checked", false);
            };
        };

        // button click
        $wlCheckbox.change(function () {
            // wakelock turn on
            if ($wlCheckbox.prop("checked")) {
                requestWakeLock();
            }
            else {
                // wakelock turn off
                wakeLock.release()
                    .then(() => {
                        wakeLock = null;
                    });
            };
        });
    }
    else $wakelocker.remove();
});