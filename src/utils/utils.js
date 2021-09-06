export const getDateOfBirth = (date) => {
    var arrayDOB = date.split("-");
    arrayDOB.splice(2, 1, arrayDOB[2].split("T")[0]);
    return arrayDOB;
};

export const getAddress = (location) => {
    var address = `${location && location.street && location.street.name ? location.street.name : ""}, `;
    address += `${location && location.street && location.street.number ? location.street.number : ""}, `;
    address += `${location && location.city ? location.city : ""}, `;
    address += `${location && location.state ? location.state : ""}, `;
    address += `${location && location.country ? location.country : ""}`;
    return address;
};

export const getParamsId = (params) => {
    return params && params.id ? (params.id.value !== null) ? (params.id.value) : ("*" + params.nat + "-" + params.cell) : "";
};

export const findByName = (data, name) => {
    return data.filter((patient) => {
        var fullName = `${patient.name.first} ${patient.name.last}`.toLowerCase();
        console.log(fullName.includes(name.toLowerCase()) && patient);
        return fullName.includes(name.toLowerCase()) && patient;
    });
};