console.log("this is working, bitch");


(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
        const hhsCols = [{
            id: "X",
            dataType: tableau.dataTypeEnum.geometry
        },{
            id: "Y",
            dataType: tableau.dataTypeEnum.geometry
        }, {
            id: "collection_week",
            dataType: tableau.dataTypeEnum.date
        }, {
            id: "hospital_name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "address",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "city",
            dataType: tableau.dataTypeEnum.geometry
        }, {  
            id: "fips_code",
            dataType: tableau.dataTypeEnum.geometry
        }, {
            id: "patients_hospconf_7d_avg",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "patients_hospconf_flu_7d_sum",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "icu_patients_conf_flu_7d_sum",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "hospconf_flucovid_7d_sum",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "prevadmit_adult_conf_7d_sum",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "prevadmit_1819_conf_7d_sum",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "prevadmit_2029_conf_7d_sum",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "prevadmit_3039_conf_7d_sum",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "prevadmit_4049_conf_7d_sum",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "prevadmit_5059_conf_7d_sum",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "prevadmit_6069_conf_7d_sum",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "prevadmit_7079_conf_7d_sum",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "prevadmit_80p_conf_7d_sum",
            dataType: tableau.dataTypeEnum.float
        }, {
           id: "prevday_covidED_visits_7d_sum",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "prevday_totED_visits_7d_sum",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "prevadmit_flu_conf_7d_sum",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "zip_code",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "last_updated",
            dataType: tableau.dataTypeEnum.date
        },
    ];

    let tableSchema = {
        id: "HHS_hospital_capacity",
        columns: hhsCols,
    };

    schemaCallback([tableSchema]);

};
    myConnector.getData = function (table, doneCallback) {
        let tableData = []
        var i = 0

        $.getJSON("https://services5.arcgis.com/qWZ7BaZXaP5isnfT/arcgis/rest/services/Weekly_Hospital_Capacity/FeatureServer/0/query?where=1%3D1&outFields=X,Y,state,hospital_name,address,city,fips_code,patients_hospconf_flu_7d_avg,icu_patients_conf_flu_7d_avg,hospconf_flucovid_7d_avg,patients_hospconf_flu_7d_sum,icu_patients_conf_flu_7d_sum,hospconf_flucovid_7d_sum,prevadmit_adult_conf_7d_sum,prevadmit_1819_conf_7d_sum,prevadmit_2029_conf_7d_sum,prevadmit_3039_conf_7d_sum,prevadmit_4049_conf_7d_sum,prevadmit_5059_conf_7d_sum,prevadmit_6069_conf_7d_sum,prevadmit_7079_conf_7d_sum,prevadmit_80p_conf_7d_sum,prevadmit_conf_unk_7d_sum,prevadmit_pedi_conf_7d_sum,prevday_covidED_visits_7d_sum,prevadmit_flu_conf_7d_sum,zip_code,last_updated,prevday_totED_visits_7d_sum,collection_week&outSR=4326&f=json", 
        function(resp) {
            for (i = 0, len = resp.length; i <len; i++){
                tableData.push({
                    "X": resp[i].geometry,
                    "Y": resp[i].geometry,
                    "collection_week": resp[i].date,
                    "hospital_name": resp[i].string,
                    "address": resp[i].string,
                    "city": resp[i].geometry,
                    "fips_code": resp[i].geometry,
                    "patients_hospconf_7d_avg": resp[i].float,
                    "patients_hospconf_flu_7d_sum": resp[i].float,
                    "icu_patients_conf_flu_7d_sum": resp[i].float,
                    "hospconf_flucovid_7d_sum": resp[i].float,
                    "prevadmit_adult_conf_7d_sum": resp[i].float,
                    "prevadmit_1819_conf_7d_sum": resp[i].float,
                    "prevadmit_2029_conf_7d_sum": resp[i].float,
                    "prevadmit_3039_conf_7d_sum": resp[i].float,
                    "prevadmit_4049_conf_7d_sum": resp[i].float,
                    "prevadmit_5059_conf_7d_sum": resp[i].float,
                    "prevadmit_6069_conf_7d_sum": resp[i].float,
                    "prevadmit_7079_conf_7d_sum": resp[i].float,
                    "prevadmit_80p_conf_7d_sum": resp[i].float,
                    "prevday_covidED_visits_7d_sum": resp[i].float,
                    "prevday_totED_visits_7d_sum": resp[i].float,
                    "prevadmit_flu_conf_7d_sum": resp[i].float,
                    "zip_code": resp[i].string,
                    "last_updated": resp[i].date,
                });
            }
            table.appendRows(tableData);
            doneCallback();
        }
    );
};

    tableau.registerConnector(myConnector);
})();

document.querySelector("#getData").addEventListener('click', getData)

function getData(){
    tableau.connectionName = "CMS LTCF COVID-19 and Influenza Data";
    tableau.submit()
}
