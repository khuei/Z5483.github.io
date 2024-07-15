// initialize the counter and the array
var numbernames=0;
var names = new Array();
var namesOrdered = new Array();

function SortNames() {
    // Get the name from the text field
    thename = document.theform.newname.value;
    thename = thename.toUpperCase();

    if (thename === "") {
        return;
    }

    // Add the name to the array
    names[numbernames] = thename;

    // Increment the counter
    numbernames++;

    // Sort the array
    names.sort();


    namesOrdered.length = 0;
    for (let i = 0; i < names.length; ++i) {
        namesOrdered[i] = i + ". " + names[i];
    }

    document.theform.sorted.value = namesOrdered.join("\n");
}

document.theform.setAttribute("onSubmit", "return false");

document.getElementById("input-text").addEventListener(
    "keypress",
    function(event) {
        if (event.key === "Enter" && document.theform.newname.value !== "") {
            event.preventDefault();
            document.getElementById("enter-btn").click();
            document.theform.newname.value = "";
        }
    }
);
