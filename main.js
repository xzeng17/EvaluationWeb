(function() {
    function init() {
        console.log("initialized");
        document.querySelector('#submit-btn').addEventListener('click', submission);
    }

    function submission() {
        console.log("submit clicked");
        showSubmitMessage("Processing!!");

        var section = document.querySelector('#section').value;
        var positiveFB = document.querySelector('#positiveFB').value;
        var negativeFB = document.querySelector('#negativeFB').value;

        if (section === "") {
            showSubmitMessage("Please select your section!");
            return;
        }
        disableSubmitBtn('submit-btn');
        var url = "https://evaluationform.herokuapp.com/submitevaluation";
        var proxy = "https://cors-anywhere.herokuapp.com/";
        var req = JSON.stringify({
            section: section,
            positiveFB: positiveFB,
            negativeFB: negativeFB,
        });

        ajax("POST", proxy+url, req, 
            function(result) {
                console.log(result);
                showSubmitMessage(result);
            },

            function() {
                enableSubmitBtn('submit-btn');
                showSubmitMessage('Request cannot be sent, please contact Xuankun.');
            }
        )  
    }


    function showSubmitMessage(msg) {
        var itemList = document.querySelector('#status-message');
        itemList.innerHTML = msg;
    }

    function enableSubmitBtn(btnid) {
        document.getElementById(btnid).disabled = false;
    }

    function disableSubmitBtn(btnid) {
        document.getElementById(btnid).disabled = true;
    }

    /* AJAX helper
    *   @param method - GET|POST|PUT|DELETE
    *   @param url - API end point
    *   @param data - request payload data
    *   @param successCallback - Successful callback function
    *   @param errorCallback - Error callback function
    */
    function ajax(method, url, data, successCallback, errorCallback) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        // xhr.setRequestHeader("X-Auth-Token","api-key 1234567890");
        // xhr.setRequestHeader('Access-Control-Allow-Origin','*');
        // xhr.setRequestHeader('Access-Control-Allow-Methods', method);
        // xhr.setRequestHeader('Access-Control-Allow-Headers','X-Auth-Token,Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
        // xhr.send();
   
        xhr.onload = function() {
            if (xhr.status === 200) {
                successCallback(xhr.responseText);
            } else {
                errorCallback();
            }
        };

        xhr.onerror = function() {
            console.error("The request couldn't be completed.");
            errorCallback();
        };

        if (data === null) {
            xhr.send();
        } else {
            xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
            xhr.send(data);
        }
    }

    init();
})();