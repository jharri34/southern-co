console.log("hello,world");

var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
});
