async function getUserHistory(url = "/api/account/table") {
     const Response = await fetch(url);
         //{
    //     method: "GET",
    //     mode: "cors",
    //     cache: "no",
    //     Credentials: "same-origin"
    // }
        //  );

    return Response.json();
}

(function() {
    getUserHistory().then((data) => {
        let tableContainer = document.getElementById("tableContainer");
        let tableDiv = document.createElement("table");
        
        let tableHeader1 = document.createElement("th");
        let tableHeader2 = document.createElement("th");
        let tableHeader3 = document.createElement("th");
        let tableHeader4 = document.createElement("th");

        tableHeader1.innerText = "Filename";
        tableHeader2.innerText  = "Size";
        tableHeader3.innerText = "Started at";
        tableHeader4.innerText = "Finished at";

        let trHeader = document.createElement("tr");
        trHeader.appendChild(tableHeader1,tableHeader2,tableHeader3,tableHeader4);
        tableDiv.appendChild(trHeader);     
        
        data.history_list.forEach(element => {
            if(element.filename) {
                let trElement = document.createElement("tr");
                tableDiv.appendChild( trElement);
                let tdElement1 = document.createElement("td");
                let tdElement2 = document.createElement("td");
                let tdElement3 = document.createElement("td");
                let tdElement4 = document.createElement("td");
                tdElement1.innerHTML = "<b>" + element.filename + "</b>";
                tdElement2.innerHTML = "<b>" + element.size + "</b>";
                tdElement3.innerHTML = "<b>" + element.startedat + "</b>";
                tdElement4.innerHTML = "<b>" + element.finshedat + "</b>";

                trElement.appendChild(tdElement1,tdElement2,tdElement3,tdElement4)
                

            }
        });
        
        tableContainer.appendChild(tableDiv);
    })
        .catch(() => {
            console.log("some error happened")
        })
})();