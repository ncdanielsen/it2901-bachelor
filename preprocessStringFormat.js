function correctDTformat(dateString) {
    var d = dateString.split("T")
    var date = d[0]
    var time = d[1]
    var datefix = date.split("-").reverse().join("-");
    var fixed = datefix +"T"+ time;
    return fixed;
}