
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>10 Minute Mail</title>
    <script src="https://cdn.jsdelivr.net/npm/js-cookie@3.0.1/dist/js.cookie.min.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" crossorigin="anonymous">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
    <link href="/assets/css/main.css" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.1.js" integrity="sha256-3zlB5s2uwoUzrXK3BT7AX3FyvojsraNFxCc2vC/7pNI=" crossorigin="anonymous"></script>
    <script src="/assets/js/main.js"></script>
</head>
<body>
    <header>
        <div class="container">
            <div class="row">
                <div class="col">
                    <div class='copied'></div>
                    <div class="copy-to-clipboard">
                        <input readonly type="text" value="Click Me To Copy" id="mailaddress">
                        <span class="material-symbols-outlined">content_copy</span>
                    </div>
                </div>                

                <div class="col-5">
                    <div class="container">
                        <div class="row">
                            <div class="col">
                                <div id="time-left">
                                    <span class="material-symbols-outlined">schedule</span>
                                    <span id="time">loading...</span>
                                </div>
                            </div>
                            <div class="col">
                                <button onclick="deleteAddress()" class="btn btn-secondary btn-danger" style="display:flex;align-items:center;justify-content:center"><span class="material-symbols-outlined" style="padding-right:5px">delete</span>delete now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <main>
        <div class="container">
            <div class="msg-wrapper">
                <div class="msg-list">
                    <div class="msg-list-head" onclick="refreshMailbox()" >
                        <h3>Mailbox</h3>
                        <span class="material-symbols-outlined icon-sync">sync</span>
                    </div>
                    <div id="msg-items">
                        <div id="msg-item"><div class="msg-item"><span class="msg-item-name">spammail@dubdev.io</span><span class="msg-item-subject">Welcome!</span><span class="msg-item-time">now</span></div></div>
                    </div>
                </div>
                <div class="msg-area">
                    select a message from the list (left) to view the content
                </div>
            </div>
        </div>
    </main>
</body>
</html>