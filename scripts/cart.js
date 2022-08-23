$(document).ready(function () {
    console.log('ready')
    var number = localStorage.getItem('number') ? localStorage.getItem('number') : [];
    console.log(number)
    $('.increase').click(function (e) {
        e.preventDefault();
        number++
        localStorage.setItem('number', number)
        console.log(number);
    });
});