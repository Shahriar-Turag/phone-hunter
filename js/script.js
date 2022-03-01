document.getElementById("spinner").style.display = "none";
document.getElementById("error-message").style.display = "none";
const phoneDetails = document.getElementById("phone-details");
const searchResult = document.getElementById("search-result");
const searchPhone = () => {
    searchResult.textContent = "";
    phoneDetails.textContent = "";
    const searchBar = document.getElementById("search-field");
    // console.log(searchBar);
    const textSearch = searchBar.value;
    // console.log(textSearch);

    //clear data
    searchBar.value = "";

    document.getElementById("error-message").style.display = "none";

    if (textSearch == "") {
    } else {
        //load data
        const url = `https://openapi.programming-hero.com/api/phones?search=${textSearch}`;
        document.getElementById("spinner").style.display = "block";

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                if (data.status == true) {
                    displaySearchResult(data.data);
                } else {
                    displayError();
                }
            });
    }
};
const displayError = () => {
    document.getElementById("error-message").style.display = "block";
};

// display Result Function here

const displaySearchResult = (phones) => {
    // console.log(phones);

    phones.slice(0, 20).forEach((data) => {
        // console.log(data);
        const div = document.createElement("div");
        div.classList.add("col");

        div.innerHTML = `
        
        <div class="card card-secondary text-center">
            <h4 class="card-title text-center">${data.brand}</h4>
            <img src="${data.image}" class="card-img-top w-50 mx-auto" alt="...">
        <div class="card-body">
            <h5 class="card-title">${data.phone_name}</h5>
            <button onclick="loadingPhoneDetail('${data.slug}')" type="button" class="btn btn-success">Show Detail</button>
        </div>
      </div>
        
        
        `;
        // console.log(data.slug);
        document.getElementById("spinner").style.display = "none";
        searchResult.appendChild(div);
    });
};

// show detail function

const loadingPhoneDetail = (id) => {
    console.log(id);

    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayPhoneDetail(data.data));
};

const displayPhoneDetail = (phones) => {
    console.log(phones);

    phoneDetails.textContent = "";
    const div = document.createElement("div");

    div.innerHTML = `
    
    <div class="card">
    <h4 class="text-center text-success pb-4 pt-4">Detail information</h4>
        <img src="${phones.image}" class="card-img-top w-50 mx-auto py-2" >
        <div class="card-body">

            <h4 class="card-title fw-bold">${phones.name}</h4>
            <p class="card-text">${
                phones.releaseDate === ""
                    ? "No release date found"
                    : phones.releaseDate
            }</p>
            <h5>Main Features:-</h5>
        
            <p class="card-text">Storage: ${phones.mainFeatures.storage}</p>
            <p class="card-text">Chip set: ${phones.mainFeatures.chipSet}</p>
            <p>${phones.mainFeatures.memory}</p>
            <p>${phones.mainFeatures.displaySize}</p>
            <h5>Sensor: </h5>
            <p>Sensors: ${phones.mainFeatures.sensors}</p>

            <h5>Others: </h5>
            <p>WLAN: ${
                phones.others?.WLAN === undefined ? "No" : phones.others?.WLAN
            }</p>
            <p>Bluetooth: ${
                phones.others?.Bluetooth === undefined
                    ? "No"
                    : phones.others?.Bluetooth
            }</p>
            <p>GPS: ${
                phones.others?.GPS === undefined ? "No" : phones.others?.GPS
            }</p>
            <p>NFC: ${
                phones.others?.NFC === undefined ? "No" : phones.others?.NFC
            }</p>
            <p>Radio: ${
                phones.others?.Radio === undefined ? "No" : phones.others?.Radio
            }</p>
            <p>USB: ${
                phones.others?.USB === undefined ? "No" : phones.others?.USB
            }</p>
              
        </div>
    </div>
    `;

    phoneDetails.appendChild(div);
    phoneDetails.scrollIntoView({ behavior: "smooth" });
};
